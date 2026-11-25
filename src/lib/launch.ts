/**
 * Launch configuration — the ONLY place where the launch date lives.
 * Launch date: ۲۳ آذر ۱۴۰۵ = 14 December 2026, midnight Asia/Tehran.
 * Iran has been UTC+03:30 (no DST) since 1401 / 2022.
 */
export const LAUNCH_DATE = new Date("2026-12-14T00:00:00+03:30");

export const LAUNCH_DATE_FA = "۲۳ آذر ۱۴۰۵";
export const LAUNCH_DATE_GREG = "۱۴ دسامبر ۲۰۲۶";

/**
 * Platform status. `pre-launch` shows the waitlist CTA + real countdown;
 * switch to `live` once ordering is available to show «شروع خرید».
 */
export const PLATFORM_STATUS: "pre-launch" | "live" = "pre-launch";
