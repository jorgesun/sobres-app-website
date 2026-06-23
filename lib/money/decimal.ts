import Decimal from "decimal.js";

// Money is ALWAYS Decimal. Never use number/float for money (§15).
// Configure for currency precision.
Decimal.set({ precision: 30, rounding: Decimal.ROUND_HALF_UP });

export type CurrencyCode = "MXN" | "USD";

export const ZERO = new Decimal(0);

export function dec(value: Decimal.Value | null | undefined): Decimal {
  if (value === null || value === undefined) return new Decimal(0);
  return new Decimal(value);
}

export function max(a: Decimal, b: Decimal): Decimal {
  return a.greaterThan(b) ? a : b;
}

export function min(a: Decimal, b: Decimal): Decimal {
  return a.lessThan(b) ? a : b;
}

export function clamp(value: Decimal, lo: Decimal, hi: Decimal): Decimal {
  return min(max(value, lo), hi);
}

export function sum(values: Decimal[]): Decimal {
  return values.reduce((acc, v) => acc.plus(v), new Decimal(0));
}

/**
 * Convert any raw amount to the budget base currency (MXN) (§3.0).
 * MXN passes through unchanged; USD is multiplied by usdToMxn when a rate
 * is available. If there is no rate, no conversion happens (assume MXN).
 */
export function convertToMXN(
  amount: Decimal.Value,
  currency: CurrencyCode | string | null | undefined,
  usdToMxn: Decimal.Value,
): Decimal {
  const a = dec(amount);
  const rate = dec(usdToMxn);
  if (currency === "USD" && rate.greaterThan(0)) {
    return a.times(rate);
  }
  return a;
}

/**
 * Currency formatting: "$" symbol, ALWAYS 2 decimals (min and max) (§6.2).
 * e.g. $1,200.00
 */
export function formatMoney(value: Decimal.Value): string {
  const d = dec(value);
  const negative = d.isNegative();
  const abs = d.abs().toFixed(2);
  const [intPart, decPart] = abs.split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${negative ? "-" : ""}$${grouped}.${decPart}`;
}

export { Decimal };
