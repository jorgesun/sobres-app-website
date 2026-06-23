import Decimal from "decimal.js";
import type { CurrencyCode } from "@/lib/money/decimal";

// Data model (§4). Money fields are stored as strings in IndexedDB/Postgres and
// hydrated into Decimal in memory. The TS types below describe the IN-MEMORY
// shape the engine consumes (Decimal for money, Date for dates).

export type UUID = string;

export type AccountType =
  | "checkings"
  | "savings"
  | "creditCard"
  | "cash"
  | "investment";

export type GoalType =
  | "monthlyFunding"
  | "weeklyFunding"
  | "targetAmount"
  | "targetAmountByDate"
  | "debtPayment";

export type TransactionType = "expense" | "income" | "transfer";

export type PaymentFrequency =
  | "weekly"
  | "biweekly"
  | "monthly"
  | "bimonthly"
  | "quarterly"
  | "yearly";

export const SYSTEM_GROUP_NAME = "Sistema";
export const CC_GROUP_NAME = "Tarjetas de Crédito";
export const READY_TO_ASSIGN_NAME = "Listo para asignar";
export const SYSTEM_GROUP_SORT = 999;
export const CC_GROUP_SORT = -1;

export interface Budget {
  id: UUID;
  name: string;
  currencyCode: "MXN";
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: UUID;
  budgetID: UUID;
  name: string;
  type: AccountType;
  institution?: string;
  initialBalance: Decimal;
  isOnBudget: boolean;
  isClosed: boolean;
  sortOrder: number;
  colorHex?: string;
  iconName?: string;
  creditLimit?: Decimal | null;
  currencyCode: CurrencyCode;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryGroup {
  id: UUID;
  budgetID: UUID;
  name: string;
  sortOrder: number;
  isHidden: boolean;
  createdAt: Date;
}

export interface Category {
  id: UUID;
  budgetID: UUID;
  groupID: UUID;
  name: string;
  emoji?: string | null;
  colorHex?: string;
  sortOrder: number;
  isHidden: boolean;
  isSystem: boolean;
  creditCardAccountID?: UUID | null;
  goalType?: GoalType | null;
  goalAmount?: Decimal | null;
  goalTargetMonth?: Date | null;
  createdAt: Date;
}

export interface Split {
  id: UUID;
  transactionID: UUID;
  categoryID: UUID | null;
  amount: Decimal; // ± ; negative = expense
  memo?: string;
}

export interface Transaction {
  id: UUID;
  budgetID: UUID;
  accountID: UUID;
  categoryID: UUID | null; // null when split
  date: Date;
  amount: Decimal; // ± ; negative = expense, positive = income
  memo?: string;
  payee?: string;
  isCleared: boolean;
  isReconciled: boolean;
  transferAccountID?: UUID | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetEntry {
  id: UUID;
  budgetID: UUID;
  categoryID: UUID;
  month: Date; // 1st of month
  assigned: Decimal; // MXN, never converted
  overspending: Decimal; // <= 0 ; CC unfunded debt written by rollover
  createdAt: Date;
  updatedAt: Date;
}

export interface RolloverState {
  id: UUID;
  budgetID: UUID;
  month: Date;
}

export interface ScheduledPayment {
  id: UUID;
  budgetID: UUID;
  accountID: UUID;
  categoryID: UUID | null;
  name: string;
  amount: Decimal;
  payee?: string;
  memo?: string;
  frequency: PaymentFrequency;
  nextDueDate: Date;
  isActive: boolean;
  transactionType?: TransactionType | null;
  destinationAccountID?: UUID | null;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Tombstone {
  id: UUID; // = recordID
  tableName: string;
  deletedAt: Date;
}

// In-memory snapshot consumed by the BudgetEngine. Keeping this as a plain
// interface keeps the engine independent of Dexie/Supabase (§15).
export interface BudgetData {
  budget: Budget;
  accounts: Account[];
  groups: CategoryGroup[];
  categories: Category[];
  transactions: Transaction[];
  splits: Split[];
  budgetEntries: BudgetEntry[];
  rolloverStates: RolloverState[];
  scheduledPayments: ScheduledPayment[];
  /** Pesos per 1 USD. Decimal(0) => no rate, no conversion. */
  usdToMxn: Decimal;
}

// ---- Derived helpers (pure) ----

export function isIncome(tx: Transaction): boolean {
  return tx.amount.greaterThan(0);
}

export function isTransfer(tx: Transaction): boolean {
  return tx.transferAccountID != null;
}

export function isCCCategory(cat: Category): boolean {
  return cat.creditCardAccountID != null;
}
