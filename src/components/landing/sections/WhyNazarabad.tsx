"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { SectionHead } from "@/components/landing/ui/SectionHead";
import { Curve } from "@/components/landing/ui/Decor";
import { WHY, WHY_ITEMS } from "@/data/content";
import benefitsImage from "@/assets/landing/benefits-group.webp";

/**
 * Section 05 — Why Nazarabad Shop. Dark, brand-storytelling composition:
 * one headline, one short paragraph, four concise points, one illustration.
 * No flow strip, no repeated CTAs, no decorative extras.
 */
export function WhyNazarabad() {
  const reduce = useReducedMotion();

  return (
    <section id="why" className="section why" aria-label="چرا نظرآباد شاپ">
      <Curve fill="#FFF8EE" flip className="curve--top" />
      <div className="container">
        <div className="why__panel">
          <motion.div
            className="why__visual"
            initial={{ opacity: 0, x: reduce ? 0 : -40, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="why__figure">
              <Image
                src={benefitsImage}
                alt={WHY.imageAlt}
                loading="lazy"
                placeholder="blur"
                sizes="(max-width: 1024px) 92vw, 560px"
              />
            </div>
          </motion.div>

          <div className="why__content">
            <SectionHead eyebrow="چرا نظرآباد شاپ؟" icon={BadgeCheck} title={WHY.title} desc={WHY.desc} dark />

            <motion.ol
              className="why__list"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
            >
              {WHY_ITEMS.map((benefit) => (
                <motion.li
                  key={benefit.title}
                  className="why-item"
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <span className="why-item__dot" aria-hidden="true" />
                  <div>
                    <h3 className="why-item__title">{benefit.title}</h3>
                    <p className="why-item__desc">{benefit.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>
      <Curve fill="#FFF8EE" className="curve--bottom" />
    </section>
  );
}
