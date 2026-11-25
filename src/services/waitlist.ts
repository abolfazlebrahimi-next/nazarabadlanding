import { normalizePhone } from "@/lib/phone";

export type UserRole = "customer" | "owner" | "courier";

export interface WaitlistEntry {
  fullName: string;
  phone: string;
  role: UserRole;
}

export type WaitlistResult =
  | { status: "ok" }
  | { status: "duplicate" }
  | { status: "error"; message: string };

export interface WaitlistApi {
  submit(entry: WaitlistEntry): Promise<WaitlistResult>;
}

/* ──────────────────────────────────────────────────────────────────────────
 * API base URL — centralized configuration.
 *
 * Production (cPanel PHP backend): set ONE of these build-time variables:
 *   • Vite landing build:            VITE_API_BASE_URL=https://api.example.com
 *   • Next.js landing build:         NEXT_PUBLIC_API_BASE_URL=https://api.example.com
 *
 * The value must match an origin listed in the backend's
 * CORS_ALLOWED_ORIGINS (no trailing slash, exact scheme + host + port).
 *
 * When no base URL is configured (local preview / sandbox), submissions
 * fall back to the built-in Next.js route (/api/waitlist) so the form
 * keeps working without external infrastructure.
 * ──────────────────────────────────────────────────────────────────────── */

type EnvLike = { env?: Record<string, string | undefined> };

function resolveApiBase(): string {
  let raw: string | undefined;
  try {
    raw = (import.meta as unknown as EnvLike | undefined)?.env?.VITE_API_BASE_URL;
  } catch {
    raw = undefined; // import.meta.env is not available in this bundle target
  }
  if (typeof raw !== "string" || raw === "") {
    // NOTE: the literal `process.env.NEXT_PUBLIC_*` access is required —
    // bundlers (Turbopack/webpack) inline NEXT_PUBLIC_* only when they can
    // statically see the expression. An indirect lookup would silently
    // resolve to undefined in the browser.
    try {
      raw = process.env.NEXT_PUBLIC_API_BASE_URL;
    } catch {
      raw = undefined; // process is not defined in this bundle target
    }
  }
  return typeof raw === "string" ? raw.trim().replace(/\/+$/, "") : "";
}

const API_BASE = resolveApiBase();

/** Backend contract: POST {base}/api/v1/waitlist/register (PHP/MySQL). */
const REGISTER_ENDPOINT = API_BASE
  ? `${API_BASE}/api/v1/waitlist/register`
  : "/api/waitlist";

/** UI role ids → backend canonical roles (PHP config: ROLES). */
const ROLE_TO_BACKEND: Record<UserRole, string> = {
  customer: "customer",
  owner: "seller", // «صاحب فروشگاه» در فرم = seller در بک‌اند
  courier: "courier",
};

/** "علی رضایی" → { first_name: "علی", last_name: "رضایی" }. */
function splitFullName(fullName: string): { first_name: string; last_name: string } {
  const parts = fullName.trim().split(/\s+/u);
  const first = parts[0] ?? "";
  const last = parts.slice(1).join(" ") || first;

  return { first_name: first, last_name: last };
}

interface ApiErrorShape {
  error?: { code?: string; message?: string; fields?: Record<string, string> };
  message?: string;
}

async function readErrorMessage(res: Response): Promise<string | undefined> {
  try {
    const data = (await res.json()) as ApiErrorShape;
    return data?.error?.message ?? data?.message ?? undefined;
  } catch {
    return undefined;
  }
}

const DEFAULT_ERRORS = {
  invalid: "خطا در پردازش اطلاعات؛ لطفاً موارد وارد‌شده را بررسی و دوباره تلاش کنید.",
  rateLimit: "درخواست‌های شما بیش از حد مجاز است؛ چند دقیقه‌ی دیگر دوباره تلاش کنید.",
  server: "خطای سرور؛ لطفاً چند لحظه‌ی دیگر دوباره تلاش کنید.",
  network: "ارتباط با سرور برقرار نشد؛ اتصال اینترنت را بررسی کنید.",
};

/**
 * Production implementation — POSTs the registration to the REST backend.
 * Contract: 201 → ok, 409 → duplicate, 422/429/5xx → error (server
 * Persian messages are shown as-is; the server is the single source).
 */
export class RestWaitlistApi implements WaitlistApi {
  constructor(private readonly endpoint: string) {}

  async submit(entry: WaitlistEntry): Promise<WaitlistResult> {
    const name = splitFullName(entry.fullName);

    const payload = {
      first_name: name.first_name,
      last_name: name.last_name,
      phone: normalizePhone(entry.phone),
      role: ROLE_TO_BACKEND[entry.role],
    };

    try {
      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) return { status: "ok" };
      if (res.status === 409) return { status: "duplicate" };

      const message = await readErrorMessage(res);
      if (res.status === 429) {
        return { status: "error", message: message ?? DEFAULT_ERRORS.rateLimit };
      }
      if (res.status === 422) {
        return { status: "error", message: message ?? DEFAULT_ERRORS.invalid };
      }

      return { status: "error", message: message ?? DEFAULT_ERRORS.server };
    } catch {
      return { status: "error", message: DEFAULT_ERRORS.network };
    }
  }
}

/**
 * Active service — real backend integration.
 * The endpoint is isolated here; swapping the backend later only
 * requires changing the API base configuration above.
 */
export const waitlistApi: WaitlistApi = new RestWaitlistApi(REGISTER_ENDPOINT);
