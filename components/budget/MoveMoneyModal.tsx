"use client";

import { useMemo, useState } from "react";
import Decimal from "decimal.js";
import { useStore } from "@/lib/data/store";
import { formatMoney } from "@/lib/money/decimal";
import type { Category } from "@/lib/db/schema";
import { isCCCategory } from "@/lib/db/schema";

export function MoveMoneyModal({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  const { engine, move, month } = useStore();
  const available = engine!.available(category, month);

  // Default direction (§6.3): if source is overspent, default to RECEIVING.
  const [receiving, setReceiving] = useState(available.isNegative());
  const [otherID, setOtherID] = useState<string>("");
  const [amountText, setAmountText] = useState("");

  const others = useMemo(() => {
    return engine!.raw.categories
      .filter(
        (c) =>
          c.id !== category.id &&
          !c.isSystem &&
          !c.isHidden &&
          !isCCCategory(c),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [engine, category.id]);

  const amount = new Decimal(amountText || "0");
  const other = others.find((c) => c.id === otherID);
  // The donor is the side that gives money away.
  const donor = receiving ? other : category;
  const donorAvail = donor ? engine!.available(donor, month) : new Decimal(0);
  const valid =
    !!other &&
    amount.greaterThan(0) &&
    amount.lessThanOrEqualTo(donorAvail);

  const maxAmount = donorAvail.greaterThan(0) ? donorAvail : new Decimal(0);

  async function submit() {
    if (!valid || !other) return;
    if (receiving) {
      await move(other.id, category.id, amount); // from other -> this
    } else {
      await move(category.id, other.id, amount); // from this -> other
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-0 sm:items-center sm:p-4">
      <div className="w-full max-w-md rounded-t-card bg-white p-6 sm:rounded-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-title font-bold text-ink">Mover dinero</h2>
          <button onClick={onClose} className="text-2xl text-muted">
            ×
          </button>
        </div>

        <div className="mb-4 rounded-cardSm bg-field p-4">
          <div className="text-label text-muted">
            {category.emoji} {category.name}
          </div>
          <div className="text-balance font-bold text-ink">
            {formatMoney(available)}
          </div>
        </div>

        <div className="mb-4 flex rounded-pill bg-field p-1">
          <button
            onClick={() => setReceiving(false)}
            className={`flex-1 rounded-pill py-2 text-sub font-semibold ${
              !receiving ? "bg-white text-ink shadow" : "text-muted"
            }`}
          >
            Mover desde
          </button>
          <button
            onClick={() => setReceiving(true)}
            className={`flex-1 rounded-pill py-2 text-sub font-semibold ${
              receiving ? "bg-white text-ink shadow" : "text-muted"
            }`}
          >
            Mover hacia
          </button>
        </div>

        <label className="mb-1 block text-label text-muted">
          {receiving ? "Origen" : "Destino"}
        </label>
        <select
          value={otherID}
          onChange={(e) => setOtherID(e.target.value)}
          className="mb-4 w-full rounded-field border border-line bg-white px-3 py-2 text-input"
        >
          <option value="">Selecciona una categoría…</option>
          {others.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji ? `${c.emoji} ` : ""}
              {c.name} — {formatMoney(engine!.available(c, month))}
            </option>
          ))}
        </select>

        <label className="mb-1 block text-label text-muted">Monto</label>
        <input
          type="number"
          inputMode="decimal"
          value={amountText}
          onChange={(e) => setAmountText(e.target.value)}
          placeholder="0.00"
          className="mb-2 w-full rounded-field border border-line bg-white px-3 py-2 text-input"
        />
        <button
          onClick={() => setAmountText(maxAmount.toFixed(2))}
          className="mb-4 text-label text-blue"
        >
          Máximo: {formatMoney(maxAmount)}
        </button>

        <button
          onClick={submit}
          disabled={!valid}
          className="w-full rounded-button bg-blue py-3 text-button text-white disabled:opacity-40"
        >
          Mover
        </button>
      </div>
    </div>
  );
}
