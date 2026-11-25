import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardList,
  PackageSearch,
  ListChecks,
  Eye,
  ArrowLeft,
  Store,
} from "lucide-react";
import { Reveal } from "@/components/landing/ui/Reveal";
import { SectionHead } from "@/components/landing/ui/SectionHead";
import { DottedArc } from "@/components/landing/ui/Decor";
import { SELLER } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { useWaitlistRole } from "@/store/waitlist-role";
import { EASE } from "@/lib/motion";
import ownerImage from "@/assets/landing/char-owner.webp";

const POINT_ICONS = [ClipboardList, PackageSearch, ListChecks, Eye];

/** Store-owner partnership: benefits + clearly-illustrative seller workflow panel. */
export function StorePartner() {
  const reduce = useReducedMotion();
  const presetRole = useWaitlistRole((s) => s.presetRole);

  return (
    <section id="stores" className="section store" aria-label="همکاری فروشگاه‌ها">
      <div className="container">
        <div className="store__grid">
          {/* Copy */}
          <div className="store__copy">
            <SectionHead
              eyebrow={SELLER.eyebrow}
              icon={Store}
              title={SELLER.title}
              desc={SELLER.desc}
              side
            />

            <Reveal delay={0.1}>
              <ul className="store__points">
                {SELLER.points.map((point, index) => {
                  const Icon = POINT_ICONS[index] ?? ClipboardList;
                  return (
                    <li key={point} className="point-item">
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
                  trackEvent("store_partner_cta_click");
                  presetRole("owner");
                }}
              >
                {SELLER.cta}
                <ArrowLeft aria-hidden="true" />
              </button>
            </Reveal>
          </div>

          {/* Illustrative seller panel + character */}
          <motion.div
            className="store__visual"
            initial={{ opacity: 0, y: reduce ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <DottedArc className="store__dots" />
            <div className="store__panel" role="img" aria-label={SELLER.cardNote}>
              <div className="store__panel-head">
                <span className="store__panel-dot" aria-hidden="true" />
                <span className="store__panel-dot" aria-hidden="true" />
                <span className="store__panel-dot" aria-hidden="true" />
                <span className="store__panel-title">{SELLER.cardTitle}</span>
              </div>
              <div className="store__panel-body">
                {SELLER.cardRows.map((row) => (
                  <div key={row.label} className="store__row">
                    <span className="store__row-label">{row.label}</span>
                    <span className="store__row-value">{row.value}</span>
                  </div>
                ))}
              </div>
              <span className="store__panel-note">{SELLER.cardNote}</span>
            </div>

            <div className="store__figure">
              <img
                src={ownerImage}
                alt="فروشنده‌ی نظرآباد شاپ با روپوش سبز در فروشگاه"
                loading="lazy"
                sizes="(max-width: 1024px) 60vw, 300px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
