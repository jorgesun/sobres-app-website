import Decimal from "decimal.js";
import {
  db,
  hydrate,
  toAccountRow,
  toBudgetEntryRow,
  toCategoryRow,
  toScheduledPaymentRow,
  toSplitRow,
  toTransactionRow,
  type BudgetRow,
} from "./dexie";
import type {
  Account,
  BudgetData,
  BudgetEntry,
  Category,
  Split,
  Transaction,
  ScheduledPayment,
} from "./schema";
import {
  CC_GROUP_NAME,
  CC_GROUP_SORT,
  READY_TO_ASSIGN_NAME,
  SYSTEM_GROUP_NAME,
  SYSTEM_GROUP_SORT,
} from "./schema";
import { uuid } from "@/lib/data/mutations";
import { buildSeed } from "@/lib/seed";

const RATE_KEY = "usdToMxn";

export async function getUsdToMxn(): Promise<Decimal> {
  const row = await db().meta.get(RATE_KEY);
  return new Decimal(row?.value ?? "0");
}

export async function setUsdToMxn(rate: Decimal): Promise<void> {
  await db().meta.put({ key: RATE_KEY, value: rate.toString() });
}

/** Pick the active budget id (first budget), or null if none. */
export async function activeBudgetId(): Promise<string | null> {
  const first = await db().budgets.orderBy("name").first();
  return first?.id ?? null;
}

/**
 * Idempotent bootstrap (§11/§12): ensure a budget, the System group +
 * "Listo para asignar", a CC category per credit account, and seed demo data
 * on first run.
 */
export async function bootstrap(): Promise<string> {
  const d = db();
  let budget = await d.budgets.orderBy("name").first();

  if (!budget) {
    const now = new Date();
    const newBudget: BudgetRow = {
      id: uuid(),
      name: "Mi Presupuesto",
      currencyCode: "MXN",
      createdAt: now,
      updatedAt: now,
    };
    await d.budgets.add(newBudget);
    budget = newBudget;
  }
  const budgetID = budget.id;

  // Seed demo data only if there are no category groups at all (first run).
  const groupCount = await d.groups.where("budgetID").equals(budgetID).count();
  if (groupCount === 0) {
    const seed = buildSeed(budgetID);
    await d.transaction(
      "rw",
      d.groups,
      d.categories,
      d.accounts,
      d.transactions,
      async () => {
        await d.groups.bulkAdd(seed.groups);
        await d.categories.bulkAdd(seed.categories);
        await d.accounts.bulkAdd(seed.accounts);
        await d.transactions.bulkAdd(seed.transactions);
      },
    );
  }

  // Guarantee System group + "Listo para asignar".
  let systemGroup = await d.groups
    .where("budgetID")
    .equals(budgetID)
    .filter((g) => g.name === SYSTEM_GROUP_NAME)
    .first();
  if (!systemGroup) {
    systemGroup = {
      id: uuid(),
      budgetID,
      name: SYSTEM_GROUP_NAME,
      sortOrder: SYSTEM_GROUP_SORT,
      isHidden: true,
      createdAt: new Date(),
    };
    await d.groups.add(systemGroup);
  }
  const hasReady = await d.categories
    .where("budgetID")
    .equals(budgetID)
    .filter((c) => c.isSystem && c.name === READY_TO_ASSIGN_NAME)
    .count();
  if (hasReady === 0) {
    await d.categories.add({
      id: uuid(),
      budgetID,
      groupID: systemGroup.id,
      name: READY_TO_ASSIGN_NAME,
      sortOrder: 0,
      isHidden: true,
      isSystem: true,
      createdAt: new Date(),
    });
  }

  // Guarantee CC group + a 1:1 CC category per credit account.
  const creditAccounts = await d.accounts
    .where("budgetID")
    .equals(budgetID)
    .filter((a) => a.type === "creditCard")
    .toArray();
  if (creditAccounts.length > 0) {
    let ccGroup = await d.groups
      .where("budgetID")
      .equals(budgetID)
      .filter((g) => g.name === CC_GROUP_NAME)
      .first();
    if (!ccGroup) {
      ccGroup = {
        id: uuid(),
        budgetID,
        name: CC_GROUP_NAME,
        sortOrder: CC_GROUP_SORT,
        isHidden: false,
        createdAt: new Date(),
      };
      await d.groups.add(ccGroup);
    }
    for (const acc of creditAccounts) {
      const exists = await d.categories
        .where("creditCardAccountID")
        .equals(acc.id)
        .count();
      if (exists === 0) {
        await d.categories.add({
          id: uuid(),
          budgetID,
          groupID: ccGroup.id,
          name: acc.name,
          sortOrder: 0,
          isHidden: false,
          isSystem: false,
          creditCardAccountID: acc.id,
          createdAt: new Date(),
        });
      }
    }
  }

  return budgetID;
}

/** Load the full in-memory BudgetData snapshot for a budget. */
export async function loadBudgetData(budgetID: string): Promise<BudgetData> {
  const d = db();
  const [
    budget,
    accounts,
    groups,
    categories,
    transactions,
    budgetEntries,
    rolloverStates,
    scheduledPayments,
    usdToMxn,
  ] = await Promise.all([
    d.budgets.get(budgetID),
    d.accounts.where("budgetID").equals(budgetID).toArray(),
    d.groups.where("budgetID").equals(budgetID).toArray(),
    d.categories.where("budgetID").equals(budgetID).toArray(),
    d.transactions.where("budgetID").equals(budgetID).toArray(),
    d.budgetEntries.where("budgetID").equals(budgetID).toArray(),
    d.rolloverStates.where("budgetID").equals(budgetID).toArray(),
    d.scheduledPayments.where("budgetID").equals(budgetID).toArray(),
    getUsdToMxn(),
  ]);
  if (!budget) throw new Error("Budget not found");

  // splits for these transactions
  const txIds = transactions.map((t) => t.id);
  const splits = await d.splits
    .where("transactionID")
    .anyOf(txIds)
    .toArray();

  return hydrate({
    budget,
    accounts,
    groups,
    categories,
    transactions,
    splits,
    budgetEntries,
    rolloverStates,
    scheduledPayments,
    usdToMxn,
  });
}

// ---- persistence helpers (model -> rows) ----

export async function saveEntry(e: BudgetEntry): Promise<void> {
  await db().budgetEntries.put(toBudgetEntryRow(e));
}
export async function saveAccount(a: Account): Promise<void> {
  await db().accounts.put(toAccountRow(a));
}
export async function saveCategory(c: Category): Promise<void> {
  await db().categories.put(toCategoryRow(c));
}
export async function saveTransaction(t: Transaction): Promise<void> {
  await db().transactions.put(toTransactionRow(t));
}
export async function saveTransactions(txs: Transaction[]): Promise<void> {
  await db().transactions.bulkPut(txs.map(toTransactionRow));
}
export async function saveSplits(splits: Split[]): Promise<void> {
  await db().splits.bulkPut(splits.map(toSplitRow));
}
export async function deleteSplitsFor(transactionID: string): Promise<void> {
  await db().splits.where("transactionID").equals(transactionID).delete();
}
export async function saveScheduledPayment(p: ScheduledPayment): Promise<void> {
  await db().scheduledPayments.put(toScheduledPaymentRow(p));
}
export async function deleteTransaction(id: string): Promise<void> {
  const d = db();
  await d.splits.where("transactionID").equals(id).delete();
  await d.transactions.delete(id);
}
export async function markRolledOver(
  budgetID: string,
  month: Date,
): Promise<void> {
  await db().rolloverStates.put({ id: uuid(), budgetID, month });
}
