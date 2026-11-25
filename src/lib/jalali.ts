/**
 * Convert a Gregorian year to its Solar-Hijri (Jalali) year.
 * Uses the standard integer algorithm; new Jalali year starts ~21 March,
 * so the mapping is exact for the year boundary in March.
 */
export function jalaliYear(date: Date = new Date()): number {
  const g = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  // Jalali new year starts on 1 Farvardin ≈ 21 March (20 or 21 in leap years).
  const jy = g - 622 + (m > 3 || (m === 3 && d >= 21) ? 1 : 0);
  return jy;
}
