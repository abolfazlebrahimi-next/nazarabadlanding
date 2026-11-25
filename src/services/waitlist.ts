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
 * VITE_API_BASE_URL is the PHP API root, WITHOUT the trailing /api/v1 part:
 *   production:  https://nazarabadshop.ir/api        (.env.production)
 *   development: /api                                (proxied by vite.config.ts)
 *
 * When unset, the default is the same-origin path "/api", which matches the
 * production layout (frontend and API both served from nazarabadshop.ir).
 *
 * Final endpoint = `${API_BASE}/v1/waitlist/register`, e.g.
 *   https://nazarabadshop.ir/api/v1/waitlist/register
 * ──────────────────────────────────────────────────────────────────────── */

const DEFAULT_API_BASE = "/api";

function resolveApiBase(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  const value = typeof raw === "string" ? raw.trim().replace(/\/+$/, "") : "";
  // Accept a mistakenly configured value that already ends with /api or /api/v1
  // so the path never ends up as /api/api/v1/...
  return value.replace(/\/api(\/v1)?$/, "/api") || DEFAULT_API_BASE;
}

const API_BASE = resolveApiBase();

/** Backend contract: POST {API_BASE}/v1/waitlist/register (PHP/MySQL). */
const REGISTER_ENDPOINT = `${API_BASE}/v1/waitlist/register`;

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
  notFound: "سرویس ثبت‌نام در دسترس نیست؛ لطفاً چند دقیقه‌ی دیگر دوباره تلاش کنید.",
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

      if (res.status === 200 || res.status === 201) return { status: "ok" };
      if (res.status === 409) return { status: "duplicate" };

      const message = await readErrorMessage(res);
      if (import.meta.env.DEV) {
        console.debug(`[waitlist] HTTP ${res.status} from ${this.endpoint}`, message);
      }

      if (res.status === 404) {
        return { status: "error", message: DEFAULT_ERRORS.notFound };
      }
      if (res.status === 429) {
        return { status: "error", message: message ?? DEFAULT_ERRORS.rateLimit };
      }
      if (res.status === 422) {
        return { status: "error", message: message ?? DEFAULT_ERRORS.invalid };
      }

      return { status: "error", message: message ?? DEFAULT_ERRORS.server };
    } catch (error) {
      if (import.meta.env.DEV) console.debug("[waitlist] network error", error);
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
