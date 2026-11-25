import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleHelp, Plus } from "lucide-react";
import { Reveal } from "@/components/landing/ui/Reveal";
import { SectionHead } from "@/components/landing/ui/SectionHead";
import { FAQ, FAQ_ITEMS } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { EASE } from "@/lib/motion";

/**
 * Section 07 — FAQ. Flat list of the 8 highest-value questions in a compact
 * accordion on a softly-lit cream stage. One question open by default;
 * animated height without layout jumps; no tabs, no support cards.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="section faq" aria-label="سوالات متداول">
      <div className="container faq__inner">
        <SectionHead eyebrow="پاسخ سوال‌هایت" icon={CircleHelp} title={FAQ.title} desc={FAQ.desc} center />

        <Reveal delay={0.08}>
          <div className="faq__list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              return (
                <div key={item.question} className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
                  <button
                    className="faq-item__btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => {
                      setOpenIndex(isOpen ? null : index);
                      if (!isOpen) trackEvent("faq_open", { question: item.question });
                    }}
                  >
                    {item.question}
                    <span className="faq-item__icon" aria-hidden="true">
                      <Plus />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        className="faq-item__panel"
                        role="region"
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <p className="faq-item__answer">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
