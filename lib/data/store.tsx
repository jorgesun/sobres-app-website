"use client";

import Decimal from "decimal.js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BudgetEngine } from "@/lib/engine/BudgetEngine";
import {
  bootstrap,
  loadBudgetData,
  saveAccount,
  saveCategory,
  saveEntry,
  saveTransaction,
  saveTransactions,
  saveSplits,
  deleteSplitsFor,
  setUsdToMxn,
} from "@/lib/db/repository";
import { db } from "@/lib/db/dexie";
import type { BudgetData, Account, Category, Split } from "@/lib/db/schema";
import { CC_GROUP_NAME, CC_GROUP_SORT } from "@/lib/db/schema";
import {
  assignMoney as assignMut,
  moveMoney as moveMut,
  uuid,
} from "@/lib/data/mutations";
import { startOfMonth } from "@/lib/date/month";

interface NewTransactionInput {
  accountID: string;
  categoryID: string | null;
  date: Date;
  amount: Decimal; // signed
  payee?: string;
  memo?: string;
  isCleared: boolean;
  transferAccountID?: string | null;
  splits?: { categoryID: string | null; amount: Decimal; memo?: string }[];
}

interface NewAccountInput {
  name: string;
  type: Account["type"];
  institution?: string;
  initialBalance: Decimal;
  isOnBudget: boolean;
  currencyCode: "MXN" | "USD";
  creditLimit?: Decimal | null;
  colorHex?: string;
}

interface StoreValue {
  loading: boolean;
  data: BudgetData | null;
  engine: BudgetEngine | null;
  budgetID: string | null;
  month: Date;
  setMonth: (m: Date) => void;
  reload: () => Promise<void>;
  assign: (categoryID: string, amount: Decimal) => Promise<void>;
  move: (fromID: string, toID: string, amount: Decimal) => Promise<void>;
  addTransaction: (input: NewTransactionInput) => Promise<void>;
  addAccount: (input: NewAccountInput) => Promise<void>;
  updateRate: (rate: Decimal) => Promise<void>;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BudgetData | null>(null);
  const [budgetID, setBudgetID] = useState<string | null>(null);
  const [month, setMonthState] = useState<Date>(startOfMonth(new Date()));

  const engine = useMemo(() => (data ? new BudgetEngine(data) : null), [data]);

  const reload = useCallback(async () => {
    if (!budgetID) return;
    const fresh = await loadBudgetData(budgetID);
    setData(fresh);
  }, [budgetID]);

  useEffect(() => {
    let active = true;
    (async () => {
      const id = await bootstrap();
      if (!active) return;
      setBudgetID(id);
      const fresh = await loadBudgetData(id);
      if (!active) return;
      setData(fresh);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const setMonth = useCallback((m: Date) => setMonthState(startOfMonth(m)), []);

  const assign = useCallback(
    async (categoryID: string, amount: Decimal) => {
      if (!data) return;
      const entry = assignMut(data, categoryID, amount, month);
      await saveEntry(entry);
      await reload();
    },
    [data, month, reload],
  );

  const move = useCallback(
    async (fromID: string, toID: string, amount: Decimal) => {
      if (!data) return;
      const { from, to } = moveMut(data, fromID, toID, amount, month);
      await saveEntry(from);
      await saveEntry(to);
      await reload();
    },
    [data, month, reload],
  );

  const addTransaction = useCallback(
    async (input: NewTransactionInput) => {
      if (!data || !budgetID) return;
      const now = new Date();
      const isSplit = (input.splits?.length ?? 0) > 0;
      const txId = uuid();

      if (input.transferAccountID) {
        // Two linked transactions (§2)
        const destAcc = data.accounts.find(
          (a) => a.id === input.transferAccountID,
        );
        const amt = input.amount.abs();
        const out = {
          id: txId,
          budgetID,
          accountID: input.accountID,
          categoryID: null as string | null,
          date: input.date,
          amount: amt.negated(),
          payee: input.payee,
          memo: input.memo,
          isCleared: input.isCleared,
          isReconciled: false,
          transferAccountID: input.transferAccountID,
          createdAt: now,
          updatedAt: now,
        };
        const inn = {
          ...out,
          id: uuid(),
          accountID: input.transferAccountID,
          amount: amt,
          transferAccountID: input.accountID,
        };
        await saveTransactions([out, inn]);
        void destAcc;
      } else {
        const tx = {
          id: txId,
          budgetID,
          accountID: input.accountID,
          categoryID: isSplit ? null : input.categoryID,
          date: input.date,
          amount: input.amount,
          payee: input.payee,
          memo: input.memo,
          isCleared: input.isCleared,
          isReconciled: false,
          transferAccountID: null,
          createdAt: now,
          updatedAt: now,
        };
        await saveTransaction(tx);
        if (isSplit) {
          await deleteSplitsFor(txId);
          const splits: Split[] = input.splits!.map((s) => ({
            id: uuid(),
            transactionID: txId,
            categoryID: s.categoryID,
            amount: s.amount,
            memo: s.memo,
          }));
          await saveSplits(splits);
        }
      }
      await reload();
    },
    [data, budgetID, reload],
  );

  const addAccount = useCallback(
    async (input: NewAccountInput) => {
      if (!data || !budgetID) return;
      const now = new Date();
      const accId = uuid();
      const account: Account = {
        id: accId,
        budgetID,
        name: input.name,
        type: input.type,
        institution: input.institution,
        initialBalance: input.initialBalance,
        isOnBudget: input.type === "investment" ? false : input.isOnBudget,
        isClosed: false,
        sortOrder: data.accounts.length,
        currencyCode: input.currencyCode,
        creditLimit: input.creditLimit ?? null,
        colorHex: input.colorHex,
        createdAt: now,
        updatedAt: now,
      };
      await saveAccount(account);

      // Initial balance => a transaction so currentBalance reflects it and the
      // engine can treat it as income/Balance Inicial.
      if (!input.initialBalance.isZero()) {
        await saveTransaction({
          id: uuid(),
          budgetID,
          accountID: accId,
          categoryID: null,
          date: now,
          amount: input.initialBalance,
          payee: "Balance Inicial",
          isCleared: true,
          isReconciled: false,
          transferAccountID: null,
          createdAt: now,
          updatedAt: now,
        });
        // initialBalance is already represented by the transaction; keep the
        // account.initialBalance at 0 to avoid double counting.
        account.initialBalance = new Decimal(0);
        await saveAccount(account);
      }

      // Auto-create the 1:1 CC category in the "Tarjetas de Crédito" group (§5).
      if (input.type === "creditCard") {
        let ccGroup = data.groups.find((g) => g.name === CC_GROUP_NAME);
        let ccGroupId = ccGroup?.id;
        if (!ccGroupId) {
          ccGroupId = uuid();
          await db().groups.add({
            id: ccGroupId,
            budgetID,
            name: CC_GROUP_NAME,
            sortOrder: CC_GROUP_SORT,
            isHidden: false,
            createdAt: now,
          });
        }
        const cat: Category = {
          id: uuid(),
          budgetID,
          groupID: ccGroupId,
          name: input.name,
          sortOrder: 0,
          isHidden: false,
          isSystem: false,
          creditCardAccountID: accId,
          createdAt: now,
        };
        await saveCategory(cat);
      }
      await reload();
    },
    [data, budgetID, reload],
  );

  const updateRate = useCallback(
    async (rate: Decimal) => {
      await setUsdToMxn(rate);
      await reload();
    },
    [reload],
  );

  const value: StoreValue = {
    loading,
    data,
    engine,
    budgetID,
    month,
    setMonth,
    reload,
    assign,
    move,
    addTransaction,
    addAccount,
    updateRate,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
