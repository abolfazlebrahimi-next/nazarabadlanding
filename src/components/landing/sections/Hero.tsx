import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowLeft, Sparkles } from "lucide-react";
import { Countdown } from "./Countdown";
import { Curve, LeafSVG, TomatoSVG, FloatDecor } from "@/components/landing/ui/Decor";
import { HERO } from "@/data/content";
import { PLATFORM_STATUS } from "@/lib/launch";
import { trackEvent } from "@/lib/analytics";
import { EASE } from "@/lib/motion";
import heroImage from "@/assets/landing/hero-main.webp";

/**
 * Deep-green hero: Persian headline (start side), illustration (end side),
 * real launch countdown. Asymmetric, art-directed composition.
 * The launch date lives once — inside the countdown panel.
 * Floating chips were removed in the final polish: they duplicated the
 * benefits / how-it-works messaging and crowded the illustration.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const decorY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 130]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  const primaryHref = "#waitlist";
  const primaryLabel = PLATFORM_STATUS === "live" ? HERO.launchedCta : HERO.primaryCta;

  return (
    <section id="home" ref={ref} className="hero" aria-label="معرفی نظرآباد شاپ">
      {/* soft parallax decor layer */}
      <motion.div className="hero__decor" style={{ y: decorY }} aria-hidden="true">
        <span
          className="blob blob--mint"
          style={{ width: "34rem", height: "34rem", top: "-14rem", insetInlineStart: "-10rem" }}
        />
        <span
          className="blob blob--orange"
          style={{ width: "30rem", height: "30rem", bottom: "2rem", insetInlineEnd: "-9rem" }}
        />
        <FloatDecor duration={7}>
          <LeafSVG className="hero__decor-leaf" />
        </FloatDecor>
        <FloatDecor duration={8} delay={1.2}>
          <TomatoSVG className="hero__decor-tomato" />
        </FloatDecor>
      </motion.div>

      <div className="container hero__inner">
        {/* Text column */}
        <div className="hero__copy">
          <motion.span
            className="hero__badge"
            initial={{ opacity: 0, y: reduce ? 0 : -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
          >
            <Sparkles aria-hidden="true" />
            {HERO.badge}
          </motion.span>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75, ease: EASE }}
          >
            <span className="hero__accent">
              {HERO.titleAccent}
              <motion.svg
                className="hero__swash"
                viewBox="0 0 240 22"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M6 15 C 70 5, 170 5, 234 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.05, duration: 0.75, ease: "easeOut" }}
                />
              </motion.svg>
            </span>{" "}
            <span className="hero__rest">{HERO.titleRest}</span>
          </motion.h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7, ease: EASE }}
          >
            {HERO.lead}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
          >
            <a
              className="btn btn--primary btn--lg"
              href={primaryHref}
              onClick={() => trackEvent("hero_primary_cta_click")}
            >
              {primaryLabel}
              <ArrowLeft aria-hidden="true" />
            </a>
            <a
              className="btn btn--ghost btn--lg"
              href="#how"
              onClick={() => trackEvent("hero_secondary_cta_click")}
            >
              {HERO.secondaryCta}
              <ArrowDown aria-hidden="true" />
            </a>
          </motion.div>

          <Countdown />
        </div>

        {/* Visual column */}
        <motion.div className="hero__visual" style={{ y: visualY }}>
          <motion.span
            className="hero__blob"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            aria-hidden="true"
          />
          {/* idle float wrapper — entrance runs on the inner element */}
          <motion.div
            className="hero__float"
            animate={reduce ? {} : { y: [0, -9, 0] }}
            transition={{ delay: 2.2, duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="hero__figure"
              initial={{ opacity: 0, y: reduce ? 0 : 48, scale: 0.96 }}
              animate={
                reduce
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, y: [48, 0, 0], scale: [0.96, 1, 1] }
              }
              transition={
                reduce
                  ? { delay: 0.5, duration: 0.8 }
                  : { delay: 0.5, duration: 1.1, times: [0, 0.55, 1], ease: EASE }
              }
            >
              <img
                src={heroImage}
                alt="مشتری نظرآباد شاپ با کیف‌های خرید، فروشگاه شهر و پیک موتوری روی موتور نارنجی"
                width={768}
                height={1344}
                fetchPriority="high"
                sizes="(max-width: 1024px) 92vw, 460px"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <Curve fill="#FFF8EE" />
    </section>
  );
}
