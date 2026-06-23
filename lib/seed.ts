import { uuid } from "@/lib/data/mutations";
import { startOfMonth } from "@/lib/date/month";
import type {
  AccountRow,
  CategoryGroupRow,
  CategoryRow,
  TransactionRow,
} from "@/lib/db/dexie";

export interface SeedResult {
  groups: CategoryGroupRow[];
  categories: CategoryRow[];
  accounts: AccountRow[];
  transactions: TransactionRow[];
}

/**
 * First-run seed data (§11). Not applied if any CategoryGroup already exists.
 */
export function buildSeed(budgetID: string): SeedResult {
  const now = new Date();
  const month = startOfMonth(now);

  const mkGroup = (
    name: string,
    sortOrder: number,
  ): CategoryGroupRow => ({
    id: uuid(),
    budgetID,
    name,
    sortOrder,
    isHidden: false,
    createdAt: now,
  });

  const gFijos = mkGroup("Gastos Fijos", 0);
  const gVar = mkGroup("Gastos Variables", 1);
  const gAhorro = mkGroup("Ahorros & Metas", 2);

  let order = 0;
  const mkCat = (
    groupID: string,
    name: string,
    emoji: string,
  ): CategoryRow => ({
    id: uuid(),
    budgetID,
    groupID,
    name,
    emoji,
    sortOrder: order++,
    isHidden: false,
    isSystem: false,
    createdAt: now,
  });

  const categories: CategoryRow[] = [
    mkCat(gFijos.id, "Renta/Hipoteca", "🏠"),
    mkCat(gFijos.id, "Servicios", "💡"),
    mkCat(gFijos.id, "Internet & Celular", "📱"),
    mkCat(gVar.id, "Súper", "🛒"),
    mkCat(gVar.id, "Restaurantes", "🍽️"),
    mkCat(gVar.id, "Gasolina", "⛽️"),
    mkCat(gVar.id, "Entretenimiento", "🎮"),
    mkCat(gAhorro.id, "Fondo de Emergencia", "🆘"),
    mkCat(gAhorro.id, "Vacaciones", "✈️"),
  ];

  const checking: AccountRow = {
    id: uuid(),
    budgetID,
    name: "Cuenta de Cheques",
    type: "checkings",
    institution: "Banco",
    initialBalance: "0",
    isOnBudget: true,
    isClosed: false,
    sortOrder: 0,
    currencyCode: "MXN",
    createdAt: now,
    updatedAt: now,
  };

  const superCat = categories.find((c) => c.name === "Súper")!;
  const transactions: TransactionRow[] = [
    {
      id: uuid(),
      budgetID,
      accountID: checking.id,
      categoryID: null,
      date: new Date(month.getFullYear(), month.getMonth(), 1),
      amount: "20000",
      payee: "Nómina",
      isCleared: true,
      isReconciled: false,
      transferAccountID: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: uuid(),
      budgetID,
      accountID: checking.id,
      categoryID: superCat.id,
      date: new Date(month.getFullYear(), month.getMonth(), 3),
      amount: "-850",
      payee: "Supermercado",
      isCleared: true,
      isReconciled: false,
      transferAccountID: null,
      createdAt: now,
      updatedAt: now,
    },
  ];

  return {
    groups: [gFijos, gVar, gAhorro],
    categories,
    accounts: [checking],
    transactions,
  };
}
