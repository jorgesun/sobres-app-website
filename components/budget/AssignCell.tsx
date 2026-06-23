"use client";

import { useState } from "react";
import Decimal from "decimal.js";
import { useStore } from "@/lib/data/store";
import { formatMoney } from "@/lib/money/decimal";

/**
 * Inline "Assigned" editor (§6.2). Supports chained operators: if the text
 * starts with + or -, the value is computed as base ± operand; otherwise it is
 * an absolute SET. Shows the base minimized above the operand while editing.
 */
export function AssignCell({
  categoryID,
  assigned,
}: {
  categoryID: string;
  assigned: Decimal;
}) {
  const { assign } = useStore();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const isChained = /^[+-]/.test(text.trim());

  function start() {
    setText("");
    setEditing(true);
  }

  function compute(): Decimal {
    const t = text.trim();
    if (t === "") return assigned;
    if (isChained) {
      const operand = new Decimal(t.replace(/^\+/, "") || "0");
      return assigned.plus(operand);
    }
    try {
      return new Decimal(t);
    } catch {
      return assigned;
    }
  }

  async function commit() {
    const next = compute();
    setEditing(false);
    if (!next.equals(assigned)) {
      await assign(categoryID, next);
    }
  }

  if (!editing) {
    return (
      <button
        onClick={start}
        className="w-28 rounded-field px-2 py-1 text-right tabular-nums text-ink hover:bg-field"
      >
        {formatMoney(assigned)}
      </button>
    );
  }

  return (
    <div className="relative w-28">
      {isChained && (
        <div className="absolute -top-4 right-2 text-[11px] text-faint tabular-nums">
          {formatMoney(assigned)}
        </div>
      )}
      <input
        autoFocus
        type="text"
        inputMode="decimal"
        value={text}
        placeholder={assigned.toFixed(2)}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") setEditing(false);
        }}
        className="w-28 rounded-field border border-blue bg-white px-2 py-1 text-right tabular-nums text-ink outline-none"
      />
    </div>
  );
}
