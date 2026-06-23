// Month normalization (§2): everything "per month" uses the 1st of the month
// at LOCAL midnight. Compare months by year+month equality, never by exact
// timestamp.

/** First day of the month at local midnight. */
export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

/** True if both dates fall in the same calendar year+month. */
export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Month at local midnight on the 1st, offset by `delta` months. */
export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1, 0, 0, 0, 0);
}

/** Previous month (1st, local midnight). */
export function prevMonth(date: Date): Date {
  return addMonths(date, -1);
}

/** Next month (1st, local midnight). */
export function nextMonth(date: Date): Date {
  return addMonths(date, 1);
}

/** Whole-month difference a - b (a later than b => positive). */
export function monthsBetween(a: Date, b: Date): number {
  return (
    (a.getFullYear() - b.getFullYear()) * 12 + (a.getMonth() - b.getMonth())
  );
}

/** a < b at month granularity. */
export function isMonthBefore(a: Date, b: Date): boolean {
  return monthsBetween(a, b) < 0;
}

/** a <= b at month granularity. */
export function isMonthBeforeOrEqual(a: Date, b: Date): boolean {
  return monthsBetween(a, b) <= 0;
}

/** Exclusive end of the month (1st of next month, local midnight). */
export function endOfMonthExclusive(date: Date): Date {
  return nextMonth(startOfMonth(date));
}

/**
 * Number of "weeks of the month" = how many times the first day of the week
 * (Sunday by default) falls within the month (§3.9). Normally 4–5.
 */
export function weeksInMonth(date: Date, weekStartsOn = 0): number {
  const start = startOfMonth(date);
  const end = endOfMonthExclusive(date);
  let count = 0;
  const d = new Date(start);
  while (d < end) {
    if (d.getDay() === weekStartsOn) count++;
    d.setDate(d.getDate() + 1);
  }
  return Math.max(1, count);
}

/** Stable key for memoization / map lookups by month. */
export function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
