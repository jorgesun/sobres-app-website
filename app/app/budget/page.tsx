"use client";

import { useState } from "react";
import Decimal from "decimal.js";
import { useStore } from "@/lib/data/store";
import { MonthNav } from "@/components/MonthNav";
import { AssignCell } from "@/components/budget/AssignCell";
import { MoveMoneyModal } from "@/components/budget/MoveMoneyModal";
import { Money, colorClass } from "@/components/money";
import { formatMoney, ZERO } from "@/lib/money/decimal";
import type { Category } from "@/lib/db/schema";
import { isCCCategory, CC_GROUP_NAME } from "@/lib/db/schema";

export default function BudgetPage() {
  const { engine, month } = useStore();
  const [moveTarget, setMoveTarget] = useState<Category | null>(null);
  const [privacy, setPrivacy] = useState(false);

  if (!engine) return null;

  const tbb = engine.toBeBudgeted(month);
  const tbbColor = tbb.isPositive()
    ? "text-green"
    : tbb.isNegative()
      ? "text-[#E5484D]"
      : "text-muted";

  // visible groups, CC group last (§5)
  const groups = [...engine.visibleGroups()].sort((a, b) => {
    const aCC = a.name === CC_GROUP_NAME ? 1 : 0;
    const bCC = b.name === CC_GROUP_NAME ? 1 : 0;
    return aCC - bCC || a.sortOrder - b.sortOrder;
  });

  return (
    <div className="space-y-6">
      {/* Hero card */}
      <div className="rounded-card bg-gradient-to-br from-deep2 to-deep p-6 text-white">
        <MonthNavLight />
        <div className="mt-4 text-center">
          <div className="text-sub text-white/70">Sin asignar</div>
          <div className={`text-balance font-bold ${tbbColorOnDark(tbb)}`}>
            {privacy ? "••••" : formatMoney(tbb)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-title font-bold text-ink">Presupuesto</h1>
        <button
          onClick={() => setPrivacy((p) => !p)}
          className="rounded-pill border border-line px-3 py-1.5 text-label text-muted hover:bg-field"
        >
          {privacy ? "Mostrar montos" : "Modo privacidad"}
        </button>
      </div>

      {/* Column headers */}
      <div className="flex items-center px-4 text-label text-muted">
        <div className="flex-1">Categoría</div>
        <div className="w-28 text-right">Asignado</div>
        <div className="w-28 text-right">Disponible</div>
      </div>

      <div className="space-y-5">
        {groups.map((g) => {
          const cats = engine.visibleCategories(g.id);
          if (cats.length === 0) return null;
          const isCCGroup = g.name === CC_GROUP_NAME;
          const groupTotal = cats.reduce(
            (acc, c) => acc.plus(engine.available(c, month)),
            ZERO,
          );
          const overspentCount = isCCGroup
            ? 0
            : cats.filter((c) =>
                engine.available(c, month).isNegative(),
              ).length;

          return (
            <div
              key={g.id}
              className="overflow-hidden rounded-card border border-line"
            >
              <div className="flex items-center bg-band px-4 py-2.5">
                <div className="flex-1 text-label font-semibold uppercase tracking-wide text-muted">
                  {g.name}
                  {overspentCount > 0 && (
                    <span className="ml-2 rounded-pill bg-[#E5484D]/10 px-2 py-0.5 text-[11px] text-[#E5484D]">
                      {overspentCount} sobregastada
                      {overspentCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div className="w-28" />
                <div className="w-28 text-right text-label font-semibold text-muted tabular-nums">
                  {privacy ? "••••" : formatMoney(groupTotal)}
                </div>
              </div>

              <ul className="divide-y divide-line">
                {cats.map((cat) => (
                  <CategoryRow
                    key={cat.id}
                    category={cat}
                    privacy={privacy}
                    onMove={() => setMoveTarget(cat)}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {moveTarget && (
        <MoveMoneyModal
          category={moveTarget}
          onClose={() => setMoveTarget(null)}
        />
      )}
    </div>
  );
}

function tbbColorOnDark(tbb: Decimal): string {
  if (tbb.isPositive()) return "text-[#5BE49B]";
  if (tbb.isNegative()) return "text-[#FF8A8A]";
  return "text-white";
}

function MonthNavLight() {
  // MonthNav uses dark text; on the hero we wrap it in a light pill row.
  return (
    <div className="rounded-pill bg-white/10 py-1">
      <div className="[&_*]:text-white [&_button]:border-white/30">
        <MonthNav />
      </div>
    </div>
  );
}

function CategoryRow({
  category,
  privacy,
  onMove,
}: {
  category: Category;
  privacy: boolean;
  onMove: () => void;
}) {
  const { engine, month } = useStore();
  const assigned = engine!.assigned(category.id, month);
  const available = engine!.available(category, month);
  const color = engine!.availabilityColor(category, month);
  const cc = isCCCategory(category);
  const overspent = !cc && available.isNegative();

  // progress (§6.2): spent = (assigned − available) / assigned
  let bar: { pct: number; cls: string } | null = null;
  if (!cc && assigned.isPositive()) {
    const spent = assigned.minus(available).div(assigned).toNumber();
    const pct = Math.max(0, Math.min(1, spent)) * 100;
    const cls = overspent
      ? "bg-[#E5484D]"
      : spent > 0.85
        ? "bg-orange"
        : "bg-blue";
    bar = { pct, cls };
  }

  return (
    <li className="flex items-center px-4 py-2.5">
      <div className="flex-1">
        <button
          onClick={onMove}
          className="flex items-center gap-2 text-left text-body text-ink hover:text-blue"
          title="Mover dinero"
        >
          {overspent && <span className="text-[#E5484D]">▲</span>}
          <span>{category.emoji ? `${category.emoji} ` : ""}{category.name}</span>
        </button>
        {bar && (
          <div className="mt-1.5 h-1.5 w-full max-w-[220px] overflow-hidden rounded-pill bg-line">
            <div
              className={`h-full rounded-pill ${bar.cls}`}
              style={{ width: `${bar.pct}%` }}
            />
          </div>
        )}
      </div>
      <div className="w-28 text-right">
        {cc ? (
          <span className="px-2 py-1 text-right tabular-nums text-faint">
            {privacy ? "••••" : formatMoney(assigned)}
          </span>
        ) : (
          <AssignCell categoryID={category.id} assigned={assigned} />
        )}
      </div>
      <div className="w-28 text-right">
        <Money
          value={available}
          privacy={privacy}
          className={`font-semibold ${colorClass(color)}`}
        />
      </div>
    </li>
  );
}
