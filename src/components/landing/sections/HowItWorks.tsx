"use client";

import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/landing/ui/Reveal";
import { SectionHead } from "@/components/landing/ui/SectionHead";
import { HOW } from "@/data/content";
import { toFaDigits } from "@/lib/phone";
import { EASE } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import step1 from "@/assets/landing/step-2-products.webp";
import step2 from "@/assets/landing/step-3-prepare.webp";
import step3 from "@/assets/landing/step-4-delivery.webp";

const STEPS = [
  {
    title: "انتخاب محصولات",
    desc: "فروشگاه‌های شهر را ببین، کالاهای مورد نیازت را انتخاب کن و سفارشت را ثبت کن.",
    image: step1,
    alt: "افزودن محصولات روزمره به سبد خرید",
  },
  {
    title: "آماده‌سازی سفارش",
    desc: "فروشگاه انتخابی، سفارشت را دریافت، آماده و بسته‌بندی می‌کند.",
    image: step2,
    alt: "بسته‌بندی سفارش توسط فروشنده",
  },
  {
    title: "تحویل درب منزل",
    desc: "پیک، سفارش آماده‌شده را تحویل می‌گیرد و درب منزل به دستت می‌رساند.",
    image: step3,
    alt: "تحویل سفارش درب منزل توسط پیک",
  },
];

/** Three visually connected steps from order to doorstep delivery. */
export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="section how" aria-label="نحوه کار نظرآباد شاپ">
      <div className="container">
        <SectionHead title={HOW.title} desc={HOW.desc} center />

        <RevealGroup className="how__grid" stagger={0.14} margin="-80px">
          {STEPS.map((step, index) => (
            <RevealItem key={step.title} className="how__cell" y={30}>
              <article className="step-card">
                <div className="step-card__media">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                    placeholder="blur"
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 40vw, 300px"
                    className="step-card__img"
                  />
                  <motion.span
                    className="step-card__num"
                    aria-hidden="true"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -12 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + index * 0.14, duration: 0.5, ease: EASE }}
                  >
                    {toFaDigits(index + 1)}
                  </motion.span>
                </div>
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__desc">{step.desc}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
