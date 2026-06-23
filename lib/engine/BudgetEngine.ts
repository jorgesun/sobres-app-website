import Decimal from "decimal.js";
import { ZERO, dec, max, min, clamp, convertToMXN } from "@/lib/money/decimal";
import {
  addMonths,
  endOfMonthExclusive,
  isMonthBefore,
  isMonthBeforeOrEqual,
  monthKey,
  monthsBetween,
  prevMonth,
  startOfMonth,
  weeksInMonth,
} from "@/lib/date/month";
import {
  type Account,
  type BudgetData,
  type Category,
  type Split,
  type Transaction,
  isCCCategory,
  isTransfer,
} from "@/lib/db/schema";

const MAX_RECURSION = 60; // safety cap (§3.3/§3.4)

export type AvailabilityColor = "green" | "amber" | "red" | "neutral";

export interface GoalProgress {
  monthlyNeeded: Decimal;
  overallFraction: number; // 0..1
  isMet: boolean;
}

/**
 * BudgetEngine — the money-flow engine (§3). Pure, UI- and backend-independent.
 * Memoizes recursive computations by (categoryID, month). Call `invalidate()`
 * after any change to assignments/transactions/rollover/active budget (§15).
 */
export class BudgetEngine {
  private data: BudgetData;

  // indexes
  private accountsById = new Map<string, Account>();
  private categoriesById = new Map<string, Category>();
  private txByCategory = new Map<string, Transaction[]>();
  private txByAccount = new Map<string, Transaction[]>();
  private splitsByCategory = new Map<string, Split[]>();
  private splitsByTx = new Map<string, Split[]>();

  // memo caches
  private availCache = new Map<string, Decimal>();
  private ccCache = new Map<string, Decimal>();
  private startMonthCache = new Map<string, Date>();

  constructor(data: BudgetData) {
    this.data = data;
    this.reindex();
  }

  /** Replace the underlying data and rebuild indexes + clear caches. */
  setData(data: BudgetData): void {
    this.data = data;
    this.reindex();
  }

  /** Clear memo caches (call after any mutation). */
  invalidate(): void {
    this.availCache.clear();
    this.ccCache.clear();
    this.startMonthCache.clear();
  }

  private reindex(): void {
    this.accountsById.clear();
    this.categoriesById.clear();
    this.txByCategory.clear();
    this.txByAccount.clear();
    this.splitsByCategory.clear();
    this.splitsByTx.clear();
    this.invalidate();

    for (const a of this.data.accounts) this.accountsById.set(a.id, a);
    for (const c of this.data.categories) this.categoriesById.set(c.id, c);
    for (const t of this.data.transactions) {
      push(this.txByAccount, t.accountID, t);
      if (t.categoryID) push(this.txByCategory, t.categoryID, t);
    }
    for (const s of this.data.splits) {
      push(this.splitsByTx, s.transactionID, s);
      if (s.categoryID) push(this.splitsByCategory, s.categoryID, s);
    }
  }

  // ---------------------------------------------------------------- helpers

  private accountOf(tx: Transaction): Account | undefined {
    return this.accountsById.get(tx.accountID);
  }

  private txOfSplit(split: Split): Transaction | undefined {
    return this.data.transactions.find((t) => t.id === split.transactionID);
  }

  /** Convert a transaction's raw amount to MXN using its account currency (§3.0). */
  budgetAmount(tx: Transaction): Decimal {
    const acc = this.accountOf(tx);
    return convertToMXN(tx.amount, acc?.currencyCode ?? "MXN", this.data.usdToMxn);
  }

  budgetAmountSplit(split: Split): Decimal {
    const tx = this.txOfSplit(split);
    const acc = tx ? this.accountOf(tx) : undefined;
    return convertToMXN(split.amount, acc?.currencyCode ?? "MXN", this.data.usdToMxn);
  }

  /** assigned for (category, month) from BudgetEntry; 0 if none. */
  assigned(categoryID: string, month: Date): Decimal {
    const m = startOfMonth(month);
    const e = this.data.budgetEntries.find(
      (x) => x.categoryID === categoryID && sameMonth(x.month, m),
    );
    return e ? dec(e.assigned) : ZERO;
  }

  /** overspending adjust (<=0) for (category, month). */
  private overspendingAdjust(categoryID: string, month: Date): Decimal {
    const m = startOfMonth(month);
    const e = this.data.budgetEntries.find(
      (x) => x.categoryID === categoryID && sameMonth(x.month, m),
    );
    return e ? dec(e.overspending) : ZERO;
  }

  // ------------------------------------------------- effectiveStartMonth (§3.1)

  effectiveStartMonth(category: Category): Date {
    const cached = this.startMonthCache.get(category.id);
    if (cached) return cached;

    let earliest = startOfMonth(category.createdAt);
    for (const t of this.txByCategory.get(category.id) ?? []) {
      const m = startOfMonth(t.date);
      if (m < earliest) earliest = m;
    }
    for (const s of this.splitsByCategory.get(category.id) ?? []) {
      const tx = this.txOfSplit(s);
      if (!tx) continue;
      const m = startOfMonth(tx.date);
      if (m < earliest) earliest = m;
    }
    this.startMonthCache.set(category.id, earliest);
    return earliest;
  }

  // ----------------------------------------------------------- activity (§3.3)

  /**
   * Spend activity for a regular category in a month: sum of NEGATIVE direct
   * transactions + NEGATIVE splits pointing to the category, in MXN. Transfers
   * and incomes are excluded. Returns a value <= 0.
   */
  activity(categoryID: string, month: Date): Decimal {
    const m = startOfMonth(month);
    let total = ZERO;
    for (const t of this.txByCategory.get(categoryID) ?? []) {
      if (isTransfer(t)) continue;
      if (!t.amount.isNegative()) continue;
      if (!sameMonth(startOfMonth(t.date), m)) continue;
      total = total.plus(this.budgetAmount(t));
    }
    for (const s of this.splitsByCategory.get(categoryID) ?? []) {
      if (!s.amount.isNegative()) continue;
      const tx = this.txOfSplit(s);
      if (!tx || isTransfer(tx)) continue;
      if (!sameMonth(startOfMonth(tx.date), m)) continue;
      total = total.plus(this.budgetAmountSplit(s));
    }
    return total;
  }

  // -------------------------------------------- regular available (§3.3)

  available(category: Category, month: Date): Decimal {
    if (isCCCategory(category)) return this.ccAvailable(category, month);
    return this.regularAvailable(category, month, 0);
  }

  private regularAvailable(category: Category, month: Date, depth: number): Decimal {
    const m = startOfMonth(month);
    const key = `${category.id}|${monthKey(m)}`;
    const cached = this.availCache.get(key);
    if (cached) return cached;

    const startMonth = this.effectiveStartMonth(category);
    const assigned = this.assigned(category.id, m);
    const activity = this.activity(category.id, m);

    let carryover = ZERO;
    if (depth < MAX_RECURSION && isMonthBefore(startMonth, m)) {
      const prev = this.regularAvailable(category, prevMonth(m), depth + 1);
      carryover = max(ZERO, prev);
    }

    const result = assigned.plus(activity).plus(carryover);
    this.availCache.set(key, result);
    return result;
  }

  // ------------------------------------------------- credit-card available (§3.4)

  ccAvailable(category: Category, month: Date): Decimal {
    return this.ccAvailableRec(category, month, 0);
  }

  private ccAvailableRec(category: Category, month: Date, depth: number): Decimal {
    const m = startOfMonth(month);
    const key = `${category.id}|${monthKey(m)}`;
    const cached = this.ccCache.get(key);
    if (cached) return cached;

    const accountID = category.creditCardAccountID!;
    const startMonth = this.effectiveStartMonth(category);

    let carry = ZERO;
    if (depth < MAX_RECURSION && isMonthBefore(startMonth, m)) {
      carry = max(ZERO, this.ccAvailableRec(category, prevMonth(m), depth + 1));
    }

    const manual = this.assigned(category.id, m);
    const funded = this.fundedForMonth(accountID, m);
    const overspend = this.overspendingAdjust(category.id, m);
    const payments = this.ccPayments(accountID, m);

    const result = carry
      .plus(manual)
      .plus(funded)
      .plus(overspend)
      .minus(payments);

    this.ccCache.set(key, result);
    return result;
  }

  /** Incoming transfers to the CC account in the month (payments), MXN, >= 0. */
  private ccPayments(accountID: string, month: Date): Decimal {
    const m = startOfMonth(month);
    let total = ZERO;
    for (const t of this.txByAccount.get(accountID) ?? []) {
      if (t.transferAccountID == null) continue;
      if (!t.amount.isPositive()) continue;
      if (!sameMonth(startOfMonth(t.date), m)) continue;
      total = total.plus(this.budgetAmount(t));
    }
    return total;
  }

  /** funded(M): portion of CC charges covered by their expense category (§3.4). */
  private fundedForMonth(accountID: string, month: Date): Decimal {
    const m = startOfMonth(month);
    const charges = (this.txByAccount.get(accountID) ?? [])
      .filter(
        (t) =>
          !isTransfer(t) &&
          t.amount.isNegative() &&
          sameMonth(startOfMonth(t.date), m),
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    let funded = ZERO;
    for (const charge of charges) {
      const splits = this.splitsByTx.get(charge.id) ?? [];
      if (splits.length > 0) {
        for (const s of splits) {
          if (!s.amount.isNegative()) continue;
          const cat = s.categoryID
            ? this.categoriesById.get(s.categoryID)
            : undefined;
          funded = funded.plus(
            this.fundedAmount(cat, this.budgetAmountSplit(s), m, {
              splitId: s.id,
            }),
          );
        }
      } else {
        const cat = charge.categoryID
          ? this.categoriesById.get(charge.categoryID)
          : undefined;
        funded = funded.plus(
          this.fundedAmount(cat, this.budgetAmount(charge), m, {
            txId: charge.id,
          }),
        );
      }
    }
    return funded;
  }

  /**
   * fundedAmount (§3.4): how much of a charge is covered by the available of
   * its expense category just before the charge. `amount` is the MXN amount of
   * the charge (negative). Returns a value in [0, |amount|].
   */
  private fundedAmount(
    expCategory: Category | undefined,
    amountMXN: Decimal,
    month: Date,
    exclude: { txId?: string; splitId?: string },
  ): Decimal {
    if (!expCategory) return ZERO;
    if (expCategory.isSystem) return ZERO;
    if (isCCCategory(expCategory)) return ZERO;

    const m = startOfMonth(month);
    const expAssigned = this.assigned(expCategory.id, m);
    // activity of expCategory this month EXCLUDING this specific charge
    const expActivity = this.activity(expCategory.id, m);
    const excluded = this.excludedChargeAmount(expCategory.id, m, exclude);
    const expActivityExcluding = expActivity.minus(excluded);
    const expCarryover = max(
      ZERO,
      this.regularAvailable(expCategory, prevMonth(m), 0),
    );
    const availableBefore = expAssigned
      .plus(expActivityExcluding)
      .plus(expCarryover);
    return clamp(availableBefore, ZERO, amountMXN.abs());
  }

  /** MXN amount (negative) of the specific charge being excluded, if it belongs to the category. */
  private excludedChargeAmount(
    categoryID: string,
    month: Date,
    exclude: { txId?: string; splitId?: string },
  ): Decimal {
    if (exclude.txId) {
      const t = this.data.transactions.find((x) => x.id === exclude.txId);
      if (t && t.categoryID === categoryID && t.amount.isNegative()) {
        return this.budgetAmount(t);
      }
    }
    if (exclude.splitId) {
      const s = this.data.splits.find((x) => x.id === exclude.splitId);
      if (s && s.categoryID === categoryID && s.amount.isNegative()) {
        return this.budgetAmountSplit(s);
      }
    }
    return ZERO;
  }

  // ------------------------------------------------------ To Be Budgeted (§3.2)

  toBeBudgeted(month: Date): Decimal {
    const m = startOfMonth(month);
    const income = this.totalIncomeCumulative(endOfMonthExclusive(m));
    const assigned = this.totalAssignedCumulative(m);
    const overspend = this.realizedCashOverspend(m);
    return income.minus(assigned).plus(overspend);
  }

  /** Sum of all on-budget, non-transfer income (amount>0) with date < endDate, MXN. */
  totalIncomeCumulative(endDate: Date): Decimal {
    let total = ZERO;
    for (const t of this.data.transactions) {
      if (!t.amount.isPositive()) continue;
      if (t.transferAccountID != null) continue;
      const acc = this.accountOf(t);
      if (!acc || !acc.isOnBudget) continue;
      if (!(t.date < endDate)) continue;
      total = total.plus(this.budgetAmount(t));
    }
    return total;
  }

  /** Sum of BudgetEntry.assigned for all months <= monthStart (inclusive). */
  totalAssignedCumulative(monthStart: Date): Decimal {
    const m = startOfMonth(monthStart);
    let total = ZERO;
    for (const e of this.data.budgetEntries) {
      if (isMonthBeforeOrEqual(startOfMonth(e.month), m)) {
        total = total.plus(dec(e.assigned));
      }
    }
    return total;
  }

  /**
   * realizedCashOverspend (§3.2): sum (<= 0) over each REGULAR category and each
   * month M' < monthStart of the negative part of its available. Current month
   * does NOT count. CC categories excluded. Dynamic, never stored.
   */
  realizedCashOverspend(monthStart: Date): Decimal {
    const m = startOfMonth(monthStart);
    let total = ZERO;
    for (const cat of this.data.categories) {
      if (cat.isSystem || isCCCategory(cat)) continue;
      const start = this.effectiveStartMonth(cat);
      let cursor = prevMonth(m);
      let steps = 0;
      while (
        steps < MAX_RECURSION &&
        isMonthBeforeOrEqual(start, cursor) &&
        monthsBetween(m, cursor) <= MAX_RECURSION
      ) {
        const avail = this.regularAvailable(cat, cursor, 0);
        if (avail.isNegative()) total = total.plus(avail);
        cursor = prevMonth(cursor);
        steps++;
      }
    }
    return total;
  }

  // ------------------------------------------------------------- colors (§3.5)

  /** Real debt of a CC account in MXN: max(0, -currentBalance). */
  accountDebtMXN(account: Account): Decimal {
    const bal = this.currentBalance(account);
    const mxn = convertToMXN(bal, account.currencyCode, this.data.usdToMxn);
    return max(ZERO, mxn.negated());
  }

  /** Color of a category's available (regular §3.3 / CC §3.5). */
  availabilityColor(category: Category, month: Date): AvailabilityColor {
    if (isCCCategory(category)) {
      const reserve = this.ccAvailable(category, month);
      const account = this.accountsById.get(category.creditCardAccountID!);
      if (!account) return reserve.isNegative() ? "red" : "green";
      const debt = this.accountDebtMXN(account);
      if (reserve.isNegative()) return "red";
      if (debt.isZero()) return "green";
      if (reserve.greaterThanOrEqualTo(debt)) return "green";
      return "amber";
    }
    const avail = this.regularAvailable(category, month, 0);
    if (avail.isNegative()) return "red";
    if (avail.isPositive()) return "green";
    return "neutral";
  }

  // -------------------------------------------------- balances (derived, §4)

  /** currentBalance = initialBalance + Σ transactions.amount (native currency). */
  currentBalance(account: Account): Decimal {
    let total = dec(account.initialBalance);
    for (const t of this.txByAccount.get(account.id) ?? []) {
      total = total.plus(t.amount);
    }
    return total;
  }

  availableCredit(account: Account): Decimal | null {
    if (account.creditLimit == null) return null;
    return dec(account.creditLimit).plus(this.currentBalance(account));
  }

  // ----------------------------------------------------- rollover (§3.6)

  /**
   * calculateUnfundedCCExpenses(account, prevMonth): the unfunded CC spend that
   * the month close converts into a negative overspendingAdjust. Returns >= 0.
   */
  calculateUnfundedCCExpenses(account: Account, prevMonth: Date): Decimal {
    const m = startOfMonth(prevMonth);
    const charges = (this.txByAccount.get(account.id) ?? [])
      .filter(
        (t) =>
          !isTransfer(t) &&
          t.amount.isNegative() &&
          sameMonth(startOfMonth(t.date), m),
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    let totalSpending = ZERO;
    let funded = ZERO;
    for (const charge of charges) {
      const cat = charge.categoryID
        ? this.categoriesById.get(charge.categoryID)
        : undefined;
      // skip system-category charges
      if (cat?.isSystem) continue;
      // skip uncategorized "Balance Inicial"
      if (charge.categoryID == null) {
        const splits = this.splitsByTx.get(charge.id) ?? [];
        if (splits.length === 0 && charge.payee === "Balance Inicial") continue;
      }
      totalSpending = totalSpending.plus(this.budgetAmount(charge).abs());

      const splits = this.splitsByTx.get(charge.id) ?? [];
      if (splits.length > 0) {
        for (const s of splits) {
          if (!s.amount.isNegative()) continue;
          const sc = s.categoryID
            ? this.categoriesById.get(s.categoryID)
            : undefined;
          funded = funded.plus(
            this.fundedAmount(sc, this.budgetAmountSplit(s), m, { splitId: s.id }),
          );
        }
      } else {
        funded = funded.plus(
          this.fundedAmount(cat, this.budgetAmount(charge), m, { txId: charge.id }),
        );
      }
    }
    return max(ZERO, totalSpending.minus(funded));
  }

  // ----------------------------------------------------- goals (§3.9)

  goalProgress(category: Category, month: Date): GoalProgress | null {
    if (!category.goalType || isCCCategory(category) || category.isSystem) {
      return null;
    }
    const m = startOfMonth(month);
    const goalAmount = dec(category.goalAmount);
    const assigned = this.assigned(category.id, m);
    const available = this.regularAvailable(category, m, 0);

    const frac = (num: Decimal, den: Decimal): number => {
      if (den.lessThanOrEqualTo(0)) return 0;
      const v = num.div(den).toNumber();
      return Math.max(0, Math.min(1, v));
    };

    switch (category.goalType) {
      case "monthlyFunding": {
        const monthlyNeeded = max(ZERO, goalAmount.minus(assigned));
        const overallFraction = frac(assigned, goalAmount);
        return { monthlyNeeded, overallFraction, isMet: monthlyNeeded.isZero() };
      }
      case "weeklyFunding": {
        const weeks = weeksInMonth(m);
        const target = goalAmount.times(weeks);
        const monthlyNeeded = max(ZERO, target.minus(assigned));
        const overallFraction = frac(assigned, target);
        return { monthlyNeeded, overallFraction, isMet: monthlyNeeded.isZero() };
      }
      case "targetAmount": {
        const monthlyNeeded = max(ZERO, goalAmount.minus(available));
        const overallFraction = frac(available, goalAmount);
        return { monthlyNeeded, overallFraction, isMet: monthlyNeeded.isZero() };
      }
      case "targetAmountByDate":
      case "debtPayment": {
        const baseline = available.minus(assigned);
        let monthsRemaining = 1;
        if (category.goalTargetMonth) {
          monthsRemaining = Math.max(
            1,
            monthsBetween(startOfMonth(category.goalTargetMonth), m) + 1,
          );
        }
        const monthlyTarget = max(
          ZERO,
          goalAmount.minus(baseline).div(monthsRemaining),
        );
        const monthlyNeeded = max(ZERO, monthlyTarget.minus(assigned));
        const overallFraction = frac(available, goalAmount);
        return { monthlyNeeded, overallFraction, isMet: monthlyNeeded.isZero() };
      }
    }
  }

  // ----------------------------------------------------- summary helpers

  /** Visible groups (not hidden, not System), ordered; CC group last (§5). */
  visibleGroups() {
    return this.data.groups
      .filter((g) => !g.isHidden && g.name !== "Sistema")
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  visibleCategories(groupID: string): Category[] {
    return this.data.categories
      .filter((c) => c.groupID === groupID && !c.isHidden && !c.isSystem)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  get raw(): BudgetData {
    return this.data;
  }
}

// ---- small utilities ----

function push<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  const arr = map.get(key);
  if (arr) arr.push(value);
  else map.set(key, [value]);
}

function sameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export { addMonths };
