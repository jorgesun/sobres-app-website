import Decimal from "decimal.js";
import {
  type Account,
  type Budget,
  type BudgetData,
  type BudgetEntry,
  type Category,
  type CategoryGroup,
  type Split,
  type Transaction,
} from "@/lib/db/schema";
import { startOfMonth } from "@/lib/date/month";
import { uuid } from "@/lib/data/mutations";

const D = (v: Decimal.Value) => new Decimal(v);

export function makeData(over: Partial<BudgetData> = {}): BudgetData {
  const budget: Budget = {
    id: "budget-1",
    name: "Test",
    currencyCode: "MXN",
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
  };
  return {
    budget,
    accounts: [],
    groups: [],
    categories: [],
    transactions: [],
    splits: [],
    budgetEntries: [],
    rolloverStates: [],
    scheduledPayments: [],
    usdToMxn: D(0),
    ...over,
  };
}

export function account(over: Partial<Account> = {}): Account {
  return {
    id: over.id ?? uuid(),
    budgetID: "budget-1",
    name: "Cuenta",
    type: "checkings",
    initialBalance: D(0),
    isOnBudget: true,
    isClosed: false,
    sortOrder: 0,
    currencyCode: "MXN",
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    ...over,
  };
}

export function group(over: Partial<CategoryGroup> = {}): CategoryGroup {
  return {
    id: over.id ?? uuid(),
    budgetID: "budget-1",
    name: "Grupo",
    sortOrder: 0,
    isHidden: false,
    createdAt: new Date(2024, 0, 1),
    ...over,
  };
}

export function category(over: Partial<Category> = {}): Category {
  return {
    id: over.id ?? uuid(),
    budgetID: "budget-1",
    groupID: "group-1",
    name: "Categoría",
    sortOrder: 0,
    isHidden: false,
    isSystem: false,
    createdAt: new Date(2024, 0, 1),
    ...over,
  };
}

export function tx(over: Partial<Transaction> = {}): Transaction {
  return {
    id: over.id ?? uuid(),
    budgetID: "budget-1",
    accountID: "acc-1",
    categoryID: null,
    date: new Date(2024, 0, 15),
    amount: D(0),
    isCleared: false,
    isReconciled: false,
    transferAccountID: null,
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 15),
    ...over,
  };
}

export function split(over: Partial<Split> = {}): Split {
  return {
    id: over.id ?? uuid(),
    transactionID: "tx-1",
    categoryID: null,
    amount: D(0),
    ...over,
  };
}

export function entry(over: Partial<BudgetEntry> = {}): BudgetEntry {
  return {
    id: over.id ?? uuid(),
    budgetID: "budget-1",
    categoryID: "cat-1",
    month: startOfMonth(over.month ?? new Date(2024, 0, 1)),
    assigned: D(0),
    overspending: D(0),
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    ...over,
  };
}

export { D };
