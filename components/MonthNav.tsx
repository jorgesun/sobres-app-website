"use client";

import { useStore } from "@/lib/data/store";
import { addMonths, startOfMonth } from "@/lib/date/month";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function formatMonth(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function MonthNav() {
  const { month, setMonth, data } = useStore();

  // Bound: [oldest month with data, currentMonth + 2] (§6)
  const now = startOfMonth(new Date());
  const upper = addMonths(now, 2);
  let lower = now;
  if (data) {
    for (const t of data.transactions) {
      const m = startOfMonth(t.date);
      if (m < lower) lower = m;
    }
    for (const e of data.budgetEntries) {
      const m = startOfMonth(e.month);
      if (m < lower) lower = m;
    }
  }

  const canPrev = month > lower;
  const canNext = month < upper;

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => canPrev && setMonth(addMonths(month, -1))}
        disabled={!canPrev}
        className="h-9 w-9 rounded-pill border border-line text-ink disabled:opacity-30 hover:bg-field"
        aria-label="Mes anterior"
      >
        ‹
      </button>
      <span className="min-w-[150px] text-center text-sub font-semibold text-ink">
        {formatMonth(month)}
      </span>
      <button
        onClick={() => canNext && setMonth(addMonths(month, 1))}
        disabled={!canNext}
        className="h-9 w-9 rounded-pill border border-line text-ink disabled:opacity-30 hover:bg-field"
        aria-label="Mes siguiente"
      >
        ›
      </button>
    </div>
  );
}
