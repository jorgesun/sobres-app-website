"use client";

import { useMemo, useState } from "react";
import Decimal from "decimal.js";
import { useStore } from "@/lib/data/store";
import { formatMoney } from "@/lib/money/decimal";
import type { TransactionType } from "@/lib/db/schema";
import { isCCCategory } from "@/lib/db/schema";
import { Overlay, Field, inputCls } from "./NewAccountModal";

interface SplitLine {
  categoryID: string;
  amount: string;
}

export function NewTransactionModal({
  accountID,
  onClose,
}: {
  accountID: string;
  onClose: () => void;
}) {
  const { engine, addTransaction } = useStore();
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [destID, setDestID] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [memo, setMemo] = useState("");
  const [cleared, setCleared] = useState(false);
  const [useSplit, setUseSplit] = useState(false);
  const [splits, setSplits] = useState<SplitLine[]>([{ categoryID: "", amount: "" }]);
  const [saving, setSaving] = useState(false);

  const categories = useMemo(
    () =>
      (engine?.raw.categories ?? [])
        .filter((c) => !c.isSystem && !c.isHidden && !isCCCategory(c))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [engine],
  );
  const otherAccounts = useMemo(
    () => (engine?.raw.accounts ?? []).filter((a) => a.id !== accountID && !a.isClosed),
    [engine, accountID],
  );

  const total = new Decimal(amount || "0");
  const splitSum = splits.reduce(
    (acc, s) => acc.plus(new Decimal(s.amount || "0")),
    new Decimal(0),
  );
  const splitsBalanced = !useSplit || splitSum.abs().equals(total.abs());

  const valid =
    total.greaterThan(0) &&
    splitsBalanced &&
    (type === "transfer"
      ? !!destID
      : useSplit
        ? splits.every((s) => s.categoryID && s.amount)
        : type === "income" || !!categoryID);

  async function submit() {
    if (!valid || saving) return;
    setSaving(true);
    const signed = type === "income" ? total.abs() : total.abs().negated();
    await addTransaction({
      accountID,
      categoryID: type === "transfer" ? null : useSplit ? null : categoryID || null,
      date: new Date(date + "T12:00:00"),
      amount: signed,
      payee: payee.trim() || undefined,
      memo: memo.trim() || undefined,
      isCleared: cleared,
      transferAccountID: type === "transfer" ? destID : null,
      splits:
        type !== "transfer" && useSplit
          ? splits.map((s) => ({
              categoryID: s.categoryID,
              amount: new Decimal(s.amount || "0").abs().negated(),
            }))
          : undefined,
    });
    onClose();
  }

  return (
    <Overlay title="Nueva transacción" onClose={onClose}>
      {/* Type selector (§10 yellow active) */}
      <div className="flex gap-2">
        {(
          [
            ["expense", "Egreso"],
            ["income", "Ingreso"],
            ["transfer", "Transferencia"],
          ] as [TransactionType, string][]
        ).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setType(v)}
            className={`flex-1 rounded-button py-2 text-sub font-semibold ${
              type === v
                ? "bg-[rgb(250,214,102)] text-[rgb(64,51,13)]"
                : "bg-field text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Field label="Monto">
        <input
          autoFocus
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputCls}
          placeholder="0.00"
        />
      </Field>

      <Field label="Beneficiario / Payee">
        <input value={payee} onChange={(e) => setPayee(e.target.value)} className={inputCls} />
      </Field>

      {type === "transfer" ? (
        <Field label="Cuenta destino">
          <select value={destID} onChange={(e) => setDestID(e.target.value)} className={inputCls}>
            <option value="">Selecciona…</option>
            {otherAccounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </Field>
      ) : type === "expense" ? (
        <>
          <label className="flex items-center gap-2 text-sub text-ink">
            <input
              type="checkbox"
              checked={useSplit}
              onChange={(e) => setUseSplit(e.target.checked)}
            />
            Dividir entre varias categorías
          </label>
          {!useSplit ? (
            <Field label="Categoría">
              <select
                value={categoryID}
                onChange={(e) => setCategoryID(e.target.value)}
                className={inputCls}
              >
                <option value="">Selecciona…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.emoji ? `${c.emoji} ` : ""}
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          ) : (
            <div className="space-y-2">
              {splits.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <select
                    value={s.categoryID}
                    onChange={(e) => {
                      const copy = [...splits];
                      copy[i] = { ...copy[i], categoryID: e.target.value };
                      setSplits(copy);
                    }}
                    className={`${inputCls} flex-1`}
                  >
                    <option value="">Categoría…</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={s.amount}
                    onChange={(e) => {
                      const copy = [...splits];
                      copy[i] = { ...copy[i], amount: e.target.value };
                      setSplits(copy);
                    }}
                    className={`${inputCls} w-24`}
                    placeholder="0.00"
                  />
                </div>
              ))}
              <button
                onClick={() => setSplits([...splits, { categoryID: "", amount: "" }])}
                className="text-label text-blue"
              >
                + Agregar línea
              </button>
              <div
                className={`text-label ${splitsBalanced ? "text-green" : "text-[#E5484D]"}`}
              >
                Suma: {formatMoney(splitSum)} / {formatMoney(total)}
              </div>
            </div>
          )}
        </>
      ) : (
        <Field label="Categoría (opcional)">
          <select
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            className={inputCls}
          >
            <option value="">Sin categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      )}

      <div className="flex gap-3">
        <Field label="Fecha" className="flex-1">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Memo (opcional)">
        <input value={memo} onChange={(e) => setMemo(e.target.value)} className={inputCls} />
      </Field>

      <label className="flex items-center gap-2 text-sub text-ink">
        <input type="checkbox" checked={cleared} onChange={(e) => setCleared(e.target.checked)} />
        Liquidada (cleared)
      </label>

      <button
        onClick={submit}
        disabled={!valid || saving}
        className="mt-2 w-full rounded-button bg-blue py-3 text-button text-white disabled:opacity-40"
      >
        Guardar
      </button>
    </Overlay>
  );
}
