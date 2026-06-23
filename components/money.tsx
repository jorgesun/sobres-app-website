import Decimal from "decimal.js";
import { formatMoney } from "@/lib/money/decimal";
import type { AvailabilityColor } from "@/lib/engine/BudgetEngine";

export function colorClass(c: AvailabilityColor): string {
  switch (c) {
    case "green":
      return "text-green";
    case "amber":
      return "text-amber";
    case "red":
      return "text-[#E5484D]";
    default:
      return "text-muted";
  }
}

export function Money({
  value,
  className = "",
  privacy = false,
}: {
  value: Decimal;
  className?: string;
  privacy?: boolean;
}) {
  return (
    <span className={`tabular-nums ${className}`}>
      {privacy ? "••••" : formatMoney(value)}
    </span>
  );
}
