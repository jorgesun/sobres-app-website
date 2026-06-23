import type { SupabaseClient } from "@supabase/supabase-js";
import { db } from "@/lib/db/dexie";
import { supabase } from "./client";

// Local-first LWW sync (§9). Each local Dexie table maps to a remote Postgres
// table with snake_case columns. Conflicts resolve by latest updated_at.
// Deletes propagate via the tombstones table.

type Json = Record<string, unknown>;

interface TableSpec {
  local: keyof ReturnType<typeof db> | string;
  remote: string;
  /** local key -> remote column */
  fields: Record<string, string>;
  /** local keys that hold Date values */
  dateKeys: string[];
}

const SPECS: TableSpec[] = [
  {
    local: "budgets",
    remote: "budgets",
    fields: {
      id: "id",
      name: "name",
      currencyCode: "currency_code",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    dateKeys: ["createdAt", "updatedAt"],
  },
  {
    local: "accounts",
    remote: "accounts",
    fields: {
      id: "id",
      budgetID: "budget_id",
      name: "name",
      type: "type",
      institution: "institution",
      initialBalance: "initial_balance",
      isOnBudget: "is_on_budget",
      isClosed: "is_closed",
      sortOrder: "sort_order",
      colorHex: "color_hex",
      iconName: "icon_name",
      creditLimit: "credit_limit",
      currencyCode: "currency_code",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    dateKeys: ["createdAt", "updatedAt"],
  },
  {
    local: "groups",
    remote: "category_groups",
    fields: {
      id: "id",
      budgetID: "budget_id",
      name: "name",
      sortOrder: "sort_order",
      isHidden: "is_hidden",
      createdAt: "created_at",
    },
    dateKeys: ["createdAt"],
  },
  {
    local: "categories",
    remote: "categories",
    fields: {
      id: "id",
      budgetID: "budget_id",
      groupID: "group_id",
      name: "name",
      emoji: "emoji",
      colorHex: "color_hex",
      sortOrder: "sort_order",
      isHidden: "is_hidden",
      isSystem: "is_system",
      creditCardAccountID: "credit_card_account_id",
      goalType: "goal_type",
      goalAmount: "goal_amount",
      goalTargetMonth: "goal_target_month",
      createdAt: "created_at",
    },
    dateKeys: ["goalTargetMonth", "createdAt"],
  },
  {
    local: "transactions",
    remote: "transactions",
    fields: {
      id: "id",
      budgetID: "budget_id",
      accountID: "account_id",
      categoryID: "category_id",
      date: "date",
      amount: "amount",
      memo: "memo",
      payee: "payee",
      isCleared: "is_cleared",
      isReconciled: "is_reconciled",
      transferAccountID: "transfer_account_id",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    dateKeys: ["date", "createdAt", "updatedAt"],
  },
  {
    local: "splits",
    remote: "splits",
    fields: {
      id: "id",
      transactionID: "transaction_id",
      categoryID: "category_id",
      amount: "amount",
      memo: "memo",
    },
    dateKeys: [],
  },
  {
    local: "budgetEntries",
    remote: "budget_entries",
    fields: {
      id: "id",
      budgetID: "budget_id",
      categoryID: "category_id",
      month: "month",
      assigned: "assigned",
      overspending: "overspending",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    dateKeys: ["month", "createdAt", "updatedAt"],
  },
  {
    local: "rolloverStates",
    remote: "rollover_states",
    fields: {
      id: "id",
      budgetID: "budget_id",
      month: "month",
    },
    dateKeys: ["month"],
  },
  {
    local: "scheduledPayments",
    remote: "scheduled_payments",
    fields: {
      id: "id",
      budgetID: "budget_id",
      accountID: "account_id",
      categoryID: "category_id",
      name: "name",
      amount: "amount",
      payee: "payee",
      memo: "memo",
      frequency: "frequency",
      nextDueDate: "next_due_date",
      isActive: "is_active",
      transactionType: "transaction_type",
      destinationAccountID: "destination_account_id",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    dateKeys: ["nextDueDate", "createdAt", "updatedAt"],
  },
];

const CURSOR_KEY = "syncCursor";

function toRemote(row: Json, spec: TableSpec, ownerId: string): Json {
  const out: Json = { owner_id: ownerId };
  for (const [localKey, remoteCol] of Object.entries(spec.fields)) {
    let v = row[localKey];
    if (v instanceof Date) v = v.toISOString();
    if (v === undefined) v = null;
    out[remoteCol] = v;
  }
  return out;
}

function fromRemote(obj: Json, spec: TableSpec): Json {
  const out: Json = {};
  const reverse = Object.entries(spec.fields);
  for (const [localKey, remoteCol] of reverse) {
    let v = obj[remoteCol];
    if (spec.dateKeys.includes(localKey) && typeof v === "string") {
      v = new Date(v);
    }
    if (v !== null && v !== undefined) out[localKey] = v;
    else if (v === null) out[localKey] = undefined;
  }
  return out;
}

async function getCursor(): Promise<string | null> {
  const row = await db().meta.get(CURSOR_KEY);
  return row?.value ?? null;
}
async function setCursor(iso: string): Promise<void> {
  await db().meta.put({ key: CURSOR_KEY, value: iso });
}

/** Push every local row for the budget (upsert). Idempotent. */
export async function push(ownerId: string): Promise<void> {
  const sb = supabase();
  if (!sb) return;
  for (const spec of SPECS) {
    const table = (db() as unknown as Record<string, { toArray: () => Promise<Json[]> }>)[
      spec.local as string
    ];
    const rows = await table.toArray();
    if (rows.length === 0) continue;
    const payload = rows.map((r) => toRemote(r, spec, ownerId));
    const { error } = await sb.from(spec.remote).upsert(payload);
    if (error) throw new Error(`push ${spec.remote}: ${error.message}`);
  }
  // propagate local tombstones
  const tombs = await db().tombstones.toArray();
  if (tombs.length > 0) {
    await sb.from("tombstones").upsert(
      tombs.map((t) => ({
        id: t.id,
        owner_id: ownerId,
        table_name: t.tableName,
        deleted_at: t.deletedAt.toISOString(),
      })),
    );
  }
}

/** Pull remote changes since the cursor and merge LWW into Dexie. */
export async function pull(): Promise<void> {
  const sb = supabase();
  if (!sb) return;
  const cursor = await getCursor();
  let newest = cursor ?? "1970-01-01T00:00:00.000Z";

  for (const spec of SPECS) {
    let query = sb.from(spec.remote).select("*");
    if (spec.dateKeys.includes("updatedAt") && cursor) {
      query = query.gt("updated_at", cursor);
    }
    const { data, error } = await query;
    if (error) throw new Error(`pull ${spec.remote}: ${error.message}`);
    if (!data) continue;

    const table = (db() as unknown as Record<
      string,
      { get: (id: string) => Promise<Json | undefined>; put: (v: Json) => Promise<unknown> }
    >)[spec.local as string];

    for (const remote of data as Json[]) {
      const local = fromRemote(remote, spec);
      const existing = await table.get(local.id as string);
      // LWW: keep newer updated_at; rows without updated_at always overwrite.
      const remoteUpdated = remote["updated_at"] as string | undefined;
      const localUpdated =
        existing && existing.updatedAt instanceof Date
          ? existing.updatedAt.toISOString()
          : undefined;
      if (!remoteUpdated || !localUpdated || remoteUpdated >= localUpdated) {
        await table.put(local);
      }
      if (remoteUpdated && remoteUpdated > newest) newest = remoteUpdated;
    }
  }

  // apply remote tombstones (deletes)
  const { data: tombs } = await sb
    .from("tombstones")
    .select("*")
    .gt("deleted_at", cursor ?? "1970-01-01T00:00:00.000Z");
  for (const t of (tombs ?? []) as Json[]) {
    const tableName = t["table_name"] as string;
    const localTable = SPECS.find((s) => s.remote === tableName)?.local;
    if (!localTable) continue;
    const table = (db() as unknown as Record<string, { delete: (id: string) => Promise<void> }>)[
      localTable as string
    ];
    await table.delete(t["id"] as string);
  }

  await setCursor(newest);
}

/** Full two-way sync pass. */
export async function syncNow(client: SupabaseClient): Promise<void> {
  const { data } = await client.auth.getUser();
  const ownerId = data.user?.id;
  if (!ownerId) return;
  await push(ownerId);
  await pull();
}
