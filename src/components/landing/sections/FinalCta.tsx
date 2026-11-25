"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  User,
  UsersRound,
  Store,
  Bike,
  CheckCircle2,
  CircleAlert,
  TriangleAlert,
  RotateCcw,
} from "lucide-react";
import { Reveal } from "@/components/landing/ui/Reveal";
import { Curve } from "@/components/landing/ui/Decor";
import { WAITLIST, ROLE_OPTIONS } from "@/data/content";
import { waitlistApi, type WaitlistResult } from "@/services/waitlist";
import { isValidIranianMobile } from "@/lib/phone";
import { trackEvent } from "@/lib/analytics";
import { useWaitlistRole } from "@/store/waitlist-role";
import { EASE } from "@/lib/motion";
import Image from "next/image";
import customerImage from "@/assets/landing/char-customer.webp";

type FormStatus = "idle" | "loading" | "success";
type SubmitError = { kind: "duplicate" } | { kind: "error"; message: string };

const ROLE_ICONS = { customer: User, owner: Store, courier: Bike } as const;

/**
 * Section 08 — Final registration. One headline, one short explanation,
 * one clear form (role + name + phone — the minimum the real backend
 * requires), one supporting illustration, one primary CTA.
 */
export function FinalCta() {
  const role = useWaitlistRole((s) => s.role);
  const setRole = useWaitlistRole((s) => s.setRole);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState(false);
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);
  const [successName, setSuccessName] = useState("");
  const reduce = useReducedMotion();

  /* Errors appear only after the user presses submit — never on blur.
     The backend API stores first/last name separately, so the full name
     must contain at least two words (e.g. «علی احمدی»). */
  const nameWords = fullName.trim().split(/\s+/u).filter(Boolean);
  const nameInvalid = touched && (nameWords.length < 2 || fullName.trim().length < 3);
  const phoneInvalid = touched && !isValidIranianMobile(phone);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    setSubmitError(null);

    if (status === "loading") return; // duplicate-submission prevention
    if (nameWords.length < 2 || fullName.trim().length < 3 || !isValidIranianMobile(phone)) return;

    setStatus("loading");
    trackEvent("registration_form_submit", { role });

    let result: WaitlistResult;
    try {
      result = await waitlistApi.submit({ fullName: fullName.trim(), phone, role });
    } catch {
      result = { status: "error", message: "خطای غیرمنتظره؛ لطفاً دوباره تلاش کنید." };
    }

    if (result.status === "ok") {
      setSuccessName(fullName.trim());
      setStatus("success");
      trackEvent("registration_form_success", { role });
    } else if (result.status === "duplicate") {
      setSubmitError({ kind: "duplicate" });
      setStatus("idle");
    } else {
      setSubmitError({ kind: "error", message: result.message });
      setStatus("idle");
    }
  };

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setTouched(false);
    setSubmitError(null);
    setStatus("idle");
  };

  const roleLabel = ROLE_OPTIONS.find((option) => option.id === role)?.successLabel ?? "";

  return (
    <section id="waitlist" className="section waitlist" aria-label="ثبت‌نام نظرآباد شاپ">
      <Curve fill="#FFF8EE" flip className="curve--top" />

      <div className="container waitlist__inner">
        {/* Info + character */}
        <div className="waitlist__col-info">
          <Reveal>
            <span className="waitlist__eyebrow">{WAITLIST.eyebrow}</span>
            <h2 className="waitlist__title">{WAITLIST.title}</h2>
            <p className="waitlist__desc">{WAITLIST.desc}</p>
          </Reveal>

          <Reveal delay={0.12} className="waitlist__figure">
            <Image
              src={customerImage}
              alt="مشتری خوشحال نظرآباد شاپ با کیف‌های خرید"
              loading="lazy"
              placeholder="blur"
              sizes="(max-width: 900px) 60vw, 280px"
            />
          </Reveal>
        </div>

        {/* Form card */}
        <Reveal delay={0.2} className="waitlist__col-form">
          <div className="waitlist-card">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="waitlist-success"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  role="status"
                  aria-live="polite"
                >
                  <motion.span
                    className="waitlist-success__badge"
                    initial={reduce ? {} : { scale: 0.4, rotate: -18 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                  >
                    <CheckCircle2 aria-hidden="true" />
                  </motion.span>
                  <h3 className="waitlist-success__title">{WAITLIST.success.title}</h3>
                  <p className="waitlist-success__text">
                    {successName} عزیز، ثبت‌نامت به‌عنوان «{roleLabel}» انجام شد. {WAITLIST.success.text}
                  </p>
                  <button className="btn btn--outline waitlist-success__again" onClick={resetForm}>
                    <RotateCcw aria-hidden="true" />
                    {WAITLIST.success.again}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="waitlist-card__title">{WAITLIST.cardTitle}</h3>

                  {submitError && (
                    <motion.div
                      className={`form-banner ${
                        submitError.kind === "duplicate" ? "form-banner--duplicate" : "form-banner--error"
                      }`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                    >
                      <TriangleAlert aria-hidden="true" />
                      {submitError.kind === "duplicate" ? WAITLIST.errors.duplicate : submitError.message}
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    {/* Role selector — toggle-button group (Tab + Enter/Space) */}
                    <div className="field">
                      <span className="field__caption" id="role-label">
                        {WAITLIST.roleField}
                      </span>
                      <div className="role-grid" role="group" aria-labelledby="role-label">
                        {ROLE_OPTIONS.map((option) => {
                          const Icon = ROLE_ICONS[option.id];
                          const active = role === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              className={`role-pill${active ? " role-pill--active" : ""}`}
                              aria-pressed={active}
                              onClick={() => setRole(option.id)}
                            >
                              <Icon aria-hidden="true" />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Full name — floating label */}
                    <div className="field field--float">
                      <div className="field__box">
                        <input
                          id="waitlist-name"
                          className={`field__input${nameInvalid ? " field__input--invalid" : ""}`}
                          type="text"
                          autoComplete="name"
                          placeholder=" "
                          value={fullName}
                          aria-invalid={nameInvalid}
                          aria-describedby={nameInvalid ? "waitlist-name-error" : undefined}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <label className="field__float" htmlFor="waitlist-name">
                          {WAITLIST.nameField}
                        </label>
                      </div>
                      {nameInvalid && (
                        <p className="field__error" id="waitlist-name-error">
                          <CircleAlert aria-hidden="true" />
                          {WAITLIST.errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone — floating label */}
                    <div className="field field--float">
                      <div className="field__box">
                        <input
                          id="waitlist-phone"
                          className={`field__input${phoneInvalid ? " field__input--invalid" : ""}`}
                          type="tel"
                          inputMode="numeric"
                          dir="ltr"
                          style={{ textAlign: "left" }}
                          autoComplete="tel"
                          placeholder=" "
                          value={phone}
                          aria-invalid={phoneInvalid}
                          aria-describedby={phoneInvalid ? "waitlist-phone-error" : undefined}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <label className="field__float" htmlFor="waitlist-phone">
                          {WAITLIST.phoneField}
                        </label>
                      </div>
                      {phoneInvalid && (
                        <p className="field__error" id="waitlist-phone-error">
                          <CircleAlert aria-hidden="true" />
                          {WAITLIST.errors.phone}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn--primary btn--lg waitlist-card__submit"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <span className="spinner" aria-hidden="true" />
                          {WAITLIST.submitting}
                        </>
                      ) : (
                        <>
                          <CheckCircle2 aria-hidden="true" />
                          {WAITLIST.submit}
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
