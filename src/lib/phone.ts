const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** Convert Latin digits to Persian digits (for display). */
export function toFaDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/** Convert Persian/Arabic digits back to Latin (for input normalization). */
export function toEnDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)));
}

/** Normalize an Iranian mobile number to the canonical 09xxxxxxxxx form. */
export function normalizePhone(raw: string): string {
  let v = toEnDigits(raw).replace(/[\s\-()‌]/g, "");
  if (v.startsWith("+98")) v = `0${v.slice(3)}`;
  else if (v.startsWith("0098")) v = `0${v.slice(4)}`;
  else if (v.startsWith("98") && v.length === 12) v = `0${v.slice(2)}`;
  else if (v.startsWith("9") && v.length === 10) v = `0${v}`;
  return v;
}

/** Iranian mobile: 09 + 9 digits (accepts 0, +98, 0098, 98, Persian digits…). */
export function isValidIranianMobile(raw: string): boolean {
  return /^09\d{9}$/.test(normalizePhone(raw));
}

/** Format a number with Persian digits and Persian thousands separator (٬). */
export function formatToman(value: number): string {
  return toFaDigits(value.toLocaleString("en-US")).replace(/,/g, "٬");
}
