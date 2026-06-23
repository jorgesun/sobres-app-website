import Decimal from "decimal.js";
import { ZERO, dec } from "@/lib/money/decimal";
import { addMonths, startOfMonth } from "@/lib/date/month";
import {
  type BudgetData,
  type BudgetEntry,
  type ScheduledPayment,
  type Transaction,
  type PaymentFrequency,
} from "@/lib/db/schema";

export function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function sameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Find or create a BudgetEntry for (category, month). Mutates data. */
export function ensureEntry(
  data: BudgetData,
  categoryID: string,
  month: Date,
): BudgetEntry {
  const m = startOfMonth(month);
  let entry = data.budgetEntries.find(
    (e) => e.categoryID === categoryID && sameMonth(e.month, m),
  );
  if (!entry) {
    const now = new Date();
    entry = {
      id: uuid(),
      budgetID: data.budget.id,
      categoryID,
      month: m,
      assigned: ZERO,
      overspending: ZERO,
      createdAt: now,
      updatedAt: now,
    };
    data.budgetEntries.push(entry);
  }
  return entry;
}

/**
 * assignMoney (§3.7): SET the assigned amount (absolute, not a delta).
 * Returns the affected entry so callers can persist it.
 */
export function assignMoney(
  data: BudgetData,
  categoryID: string,
  amount: Decimal,
  month: Date,
): BudgetEntry {
  const entry = ensureEntry(data, categoryID, month);
  entry.assigned = dec(amount);
  entry.updatedAt = new Date();
  return entry;
}

/**
 * moveMoney (§3.8): raise assigned of `toCategoryID` and lower `fromCategoryID`
 * by the same amount, same month. Returns both affected entries.
 */
export function moveMoney(
  data: BudgetData,
  fromCategoryID: string,
  toCategoryID: string,
  amount: Decimal,
  month: Date,
): { from: BudgetEntry; to: BudgetEntry } {
  const amt = dec(amount);
  const from = ensureEntry(data, fromCategoryID, month);
  const to = ensureEntry(data, toCategoryID, month);
  from.assigned = from.assigned.minus(amt);
  to.assigned = to.assigned.plus(amt);
  const now = new Date();
  from.updatedAt = now;
  to.updatedAt = now;
  return { from, to };
}

// ---- ScheduledPayment cycle (§4 / §7) ----

export function nextDate(from: Date, frequency: PaymentFrequency): Date {
  const d = new Date(from);
  switch (frequency) {
    case "weekly":
      d.setDate(d.getDate() + 7);
      break;
    case "biweekly":
      d.setDate(d.getDate() + 14);
      break;
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      break;
    case "bimonthly":
      d.setMonth(d.getMonth() + 2);
      break;
    case "quarterly":
      d.setMonth(d.getMonth() + 3);
      break;
    case "yearly":
      d.setFullYear(d.getFullYear() + 1);
      break;
  }
  return d;
}

export interface MaterializeResult {
  ok: boolean;
  transactions: Transaction[];
}

/**
 * materialize(payment, date) (§4): the single point that creates transactions.
 * - expense  -> 1 negative transaction
 * - income   -> 1 positive transaction; if category not system, ADD |amount| to
 *               that month's BudgetEntry.assigned (no double count; activity
 *               ignores positives).
 * - transfer -> 2 linked transactions (source −, dest +). If dest account was
 *               deleted, returns ok=false and does NOT advance the date.
 * Mutates `data`. Returns the created transactions (already pushed).
 */
export function materialize(
  data: BudgetData,
  payment: ScheduledPayment,
  date: Date,
): MaterializeResult {
  const type = payment.transactionType ?? "expense";
  const now = new Date();
  const amt = payment.amount.abs();
  const created: Transaction[] = [];

  const baseTx = (over: Partial<Transaction>): Transaction => ({
    id: uuid(),
    budgetID: data.budget.id,
    accountID: payment.accountID,
    categoryID: payment.categoryID,
    date,
    amount: ZERO,
    memo: payment.memo,
    payee: payment.payee,
    isCleared: false,
    isReconciled: false,
    transferAccountID: null,
    createdAt: now,
    updatedAt: now,
    ...over,
  });

  if (type === "expense") {
    const tx = baseTx({ amount: amt.negated() });
    data.transactions.push(tx);
    created.push(tx);
    return { ok: true, transactions: created };
  }

  if (type === "income") {
    const tx = baseTx({ amount: amt });
    data.transactions.push(tx);
    created.push(tx);
    if (payment.categoryID) {
      const cat = data.categories.find((c) => c.id === payment.categoryID);
      if (cat && !cat.isSystem) {
        const entry = ensureEntry(data, payment.categoryID, date);
        entry.assigned = entry.assigned.plus(amt);
        entry.updatedAt = now;
      }
    }
    return { ok: true, transactions: created };
  }

  // transfer
  const destID = payment.destinationAccountID;
  const dest = destID
    ? data.accounts.find((a) => a.id === destID && !a.isClosed)
    : undefined;
  if (!dest) return { ok: false, transactions: [] };

  const out = baseTx({
    amount: amt.negated(),
    categoryID: null,
    transferAccountID: dest.id,
  });
  const inn = baseTx({
    accountID: dest.id,
    amount: amt,
    categoryID: null,
    transferAccountID: payment.accountID,
  });
  data.transactions.push(out, inn);
  created.push(out, inn);
  return { ok: true, transactions: created };
}

/** Advance the payment's nextDueDate to the next cycle (call after success). */
export function advanceDueDate(payment: ScheduledPayment): void {
  payment.nextDueDate = nextDate(payment.nextDueDate, payment.frequency);
}

export { addMonths };
