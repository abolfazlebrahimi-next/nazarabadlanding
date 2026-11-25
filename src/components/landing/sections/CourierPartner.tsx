"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Bike, PackageCheck, Route, UserRoundCheck, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/landing/ui/Reveal";
import { SectionHead } from "@/components/landing/ui/SectionHead";
import { COURIER } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { useWaitlistRole } from "@/store/waitlist-role";
import { EASE } from "@/lib/motion";
import courierImage from "@/assets/landing/char-courier.webp";

const POINT_ICONS = [PackageCheck, Route, UserRoundCheck];

/** Courier partnership: dedicated character + concise benefits + orange CTA. */
export function CourierPartner() {
  const reduce = useReducedMotion();
  const presetRole = useWaitlistRole((s) => s.presetRole);

  return (
    <section id="couriers" className="section courier" aria-label="همکاری پیک‌های موتوری">
      <div className="container">
        <div className="courier__grid">
          {/* Visual */}
          <motion.div
            className="courier__visual"
            initial={{ opacity: 0, y: reduce ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="courier__ring" aria-hidden="true" />
            <div className="courier__figure">
              <Image
                src={courierImage}
                alt="پیک موتوری نظرآباد شاپ با کلاه‌کاسه‌ی سبز و جعبه‌ی تحویل"
                loading="lazy"
                placeholder="blur"
                sizes="(max-width: 1024px) 78vw, 400px"
              />
            </div>
            <motion.span
              className="courier__chip courier__chip--one"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
              aria-hidden="true"
            >
              <Bike />
              آماده‌ی ارسال
            </motion.span>
            <motion.span
              className="courier__chip courier__chip--two"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
              aria-hidden="true"
            >
              <PackageCheck />
              تحویل درب منزل
            </motion.span>
          </motion.div>

          {/* Copy */}
          <div className="courier__copy">
            <SectionHead
              eyebrow={COURIER.eyebrow}
              icon={Bike}
              title={COURIER.title}
              desc={COURIER.desc}
              side
            />

            <Reveal delay={0.1}>
              <ul className="courier__points">
                {COURIER.points.map((point, index) => {
                  const Icon = POINT_ICONS[index] ?? Bike;
                  return (
                    <li key={point} className="point-item point-item--green">
                      <span className="point-item__icon" aria-hidden="true">
                        <Icon />
                      </span>
                      {point}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <button
                type="button"
                className="btn btn--primary btn--lg"
                onClick={() => {
                  trackEvent("courier_partner_cta_click");
                  presetRole("courier");
                }}
              >
                {COURIER.cta}
                <ArrowLeft aria-hidden="true" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
