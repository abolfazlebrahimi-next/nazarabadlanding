import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { normalizePhone, isValidIranianMobile } from "@/lib/phone";

const ROLES = new Set(["customer", "owner", "courier"]);

/**
 * POST /api/waitlist — registers a waitlist entry (customer / store owner / courier).
 * Responses: 201 created · 400 validation error · 409 duplicate phone · 500 server error.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json", message: "داده‌ی ارسالی معتبر نیست." },
      { status: 400 },
    );
  }

  const {
    fullName,
    first_name,
    last_name,
    phone,
    role: rawRole,
  } = (body ?? {}) as {
    fullName?: unknown;
    first_name?: unknown;
    last_name?: unknown;
    phone?: unknown;
    role?: unknown;
  };

  // Dual contract: the production PHP backend posts first_name+last_name
  // and the canonical role "seller"; the legacy single-field shape
  // (fullName, "owner") stays accepted so this built-in route keeps
  // working unchanged for local preview without external infrastructure.
  const joinedName = [first_name, last_name]
    .filter((part): part is string => typeof part === "string")
    .join(" ")
    .trim();
  const name = (typeof fullName === "string" ? fullName : joinedName).trim();
  const role = rawRole === "seller" ? "owner" : rawRole;
  if (name.length < 3 || name.length > 80) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_name",
        message: "لطفاً نام و نام خانوادگی را کامل وارد کنید.",
      },
      { status: 400 },
    );
  }

  if (typeof phone !== "string" || !isValidIranianMobile(phone)) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_phone",
        message: "شماره موبایل معتبر نیست؛ نمونه: ۰۹۱۲۳۴۵۶۷۸۹",
      },
      { status: 400 },
    );
  }

  if (typeof role !== "string" || !ROLES.has(role)) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_role",
        message: "نوع کاربر انتخاب‌شده معتبر نیست.",
      },
      { status: 400 },
    );
  }

  try {
    await db.waitlistEntry.create({
      data: { fullName: name, phone: normalizePhone(phone), role },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    // Prisma unique-constraint violation → this phone is already registered.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "duplicate",
          message: "این شماره موبایل قبلاً ثبت شده است.",
        },
        { status: 409 },
      );
    }
    console.error("[waitlist] create failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "server_error",
        message: "خطای سرور؛ لطفاً چند لحظه‌ی دیگر دوباره تلاش کنید.",
      },
      { status: 500 },
    );
  }
}
