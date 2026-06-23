import Dexie, { type EntityTable } from "dexie";
import Decimal from "decimal.js";
import type {
  Account,
  Budget,
  BudgetData,
  BudgetEntry,
  Category,
  CategoryGroup,
  RolloverState,
  ScheduledPayment,
  Split,
  Tombstone,
  Transaction,
} from "./schema";

// Persisted "row" shapes: money is stored as string, dates as Date.
// Dexie stores Date natively; Decimal is serialized to string to stay exact.

type Money = string;

interface BudgetRow {
  id: string;
  name: string;
  currencyCode: "MXN";
  createdAt: Date;
  updatedAt: Date;
}

interface AccountRow {
  id: string;
  budgetID: string;
  name: string;
  type: Account["type"];
  institution?: string;
  initialBalance: Money;
  isOnBudget: boolean;
  isClosed: boolean;
  sortOrder: number;
  colorHex?: string;
  iconName?: string;
  creditLimit?: Money | null;
  currencyCode: Account["currencyCode"];
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryGroupRow {
  id: string;
  budgetID: string;
  name: string;
  sortOrder: number;
  isHidden: boolean;
  createdAt: Date;
}

interface CategoryRow {
  id: string;
  budgetID: string;
  groupID: string;
  name: string;
  emoji?: string | null;
  colorHex?: string;
  sortOrder: number;
  isHidden: boolean;
  isSystem: boolean;
  creditCardAccountID?: string | null;
  goalType?: Category["goalType"];
  goalAmount?: Money | null;
  goalTargetMonth?: Date | null;
  createdAt: Date;
}

interface TransactionRow {
  id: string;
  budgetID: string;
  accountID: string;
  categoryID: string | null;
  date: Date;
  amount: Money;
  memo?: string;
  payee?: string;
  isCleared: boolean;
  isReconciled: boolean;
  transferAccountID?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SplitRow {
  id: string;
  transactionID: string;
  categoryID: string | null;
  amount: Money;
  memo?: string;
}

interface BudgetEntryRow {
  id: string;
  budgetID: string;
  categoryID: string;
  month: Date;
  assigned: Money;
  overspending: Money;
  createdAt: Date;
  updatedAt: Date;
}

interface RolloverStateRow {
  id: string;
  budgetID: string;
  month: Date;
}

interface ScheduledPaymentRow {
  id: string;
  budgetID: string;
  accountID: string;
  categoryID: string | null;
  name: string;
  amount: Money;
  payee?: string;
  memo?: string;
  frequency: ScheduledPayment["frequency"];
  nextDueDate: Date;
  isActive: boolean;
  transactionType?: ScheduledPayment["transactionType"];
  destinationAccountID?: string | null;
  createdAt: Date;
  updatedAt?: Date;
}

interface MetaRow {
  key: string;
  value: string;
}

export class SobresDB extends Dexie {
  budgets!: EntityTable<BudgetRow, "id">;
  accounts!: EntityTable<AccountRow, "id">;
  groups!: EntityTable<CategoryGroupRow, "id">;
  categories!: EntityTable<CategoryRow, "id">;
  transactions!: EntityTable<TransactionRow, "id">;
  splits!: EntityTable<SplitRow, "id">;
  budgetEntries!: EntityTable<BudgetEntryRow, "id">;
  rolloverStates!: EntityTable<RolloverStateRow, "id">;
  scheduledPayments!: EntityTable<ScheduledPaymentRow, "id">;
  tombstones!: EntityTable<Tombstone, "id">;
  meta!: EntityTable<MetaRow, "key">;

  constructor() {
    super("sobres");
    this.version(1).stores({
      budgets: "id, name",
      accounts: "id, budgetID, type, sortOrder",
      groups: "id, budgetID, sortOrder",
      categories: "id, budgetID, groupID, creditCardAccountID, sortOrder",
      transactions: "id, budgetID, accountID, categoryID, date, transferAccountID",
      splits: "id, transactionID, categoryID",
      budgetEntries: "id, budgetID, categoryID, month, [categoryID+month]",
      rolloverStates: "id, budgetID, month, [budgetID+month]",
      scheduledPayments: "id, budgetID, accountID, nextDueDate",
      tombstones: "id, tableName",
      meta: "key",
    });
  }
}

let _db: SobresDB | null = null;
export function db(): SobresDB {
  if (!_db) _db = new SobresDB();
  return _db;
}

// ---- Hydration: rows -> in-memory model (Decimal) ----

const D = (v: Money | null | undefined): Decimal => new Decimal(v ?? "0");
const Dn = (v: Money | null | undefined): Decimal | null =>
  v == null ? null : new Decimal(v);
const S = (d: Decimal | null | undefined): Money | null =>
  d == null ? null : d.toString();

export function hydrate(rows: {
  budget: BudgetRow;
  accounts: AccountRow[];
  groups: CategoryGroupRow[];
  categories: CategoryRow[];
  transactions: TransactionRow[];
  splits: SplitRow[];
  budgetEntries: BudgetEntryRow[];
  rolloverStates: RolloverStateRow[];
  scheduledPayments: ScheduledPaymentRow[];
  usdToMxn: Decimal;
}): BudgetData {
  return {
    budget: rows.budget as Budget,
    usdToMxn: rows.usdToMxn,
    accounts: rows.accounts.map((a) => ({
      ...a,
      initialBalance: D(a.initialBalance),
      creditLimit: Dn(a.creditLimit),
    })) as Account[],
    groups: rows.groups as CategoryGroup[],
    categories: rows.categories.map((c) => ({
      ...c,
      goalAmount: Dn(c.goalAmount),
    })) as Category[],
    transactions: rows.transactions.map((t) => ({
      ...t,
      amount: D(t.amount),
    })) as Transaction[],
    splits: rows.splits.map((s) => ({ ...s, amount: D(s.amount) })) as Split[],
    budgetEntries: rows.budgetEntries.map((e) => ({
      ...e,
      assigned: D(e.assigned),
      overspending: D(e.overspending),
    })) as BudgetEntry[],
    rolloverStates: rows.rolloverStates as RolloverState[],
    scheduledPayments: rows.scheduledPayments.map((p) => ({
      ...p,
      amount: D(p.amount),
    })) as ScheduledPayment[],
  };
}

// ---- Dehydration helpers: model -> row (for writes) ----

export const toAccountRow = (a: Account): AccountRow => ({
  ...a,
  initialBalance: a.initialBalance.toString(),
  creditLimit: S(a.creditLimit ?? null),
});

export const toCategoryRow = (c: Category): CategoryRow => ({
  ...c,
  goalAmount: S(c.goalAmount ?? null),
});

export const toTransactionRow = (t: Transaction): TransactionRow => ({
  ...t,
  amount: t.amount.toString(),
});

export const toSplitRow = (s: Split): SplitRow => ({
  ...s,
  amount: s.amount.toString(),
});

export const toBudgetEntryRow = (e: BudgetEntry): BudgetEntryRow => ({
  ...e,
  assigned: e.assigned.toString(),
  overspending: e.overspending.toString(),
});

export const toScheduledPaymentRow = (p: ScheduledPayment): ScheduledPaymentRow => ({
  ...p,
  amount: p.amount.toString(),
});

export type {
  BudgetRow,
  AccountRow,
  CategoryGroupRow,
  CategoryRow,
  TransactionRow,
  SplitRow,
  BudgetEntryRow,
  RolloverStateRow,
  ScheduledPaymentRow,
  MetaRow,
};
