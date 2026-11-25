"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { Reveal } from "@/components/landing/ui/Reveal";
import { PARTNERS, SELLER, COURIER } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { useWaitlistRole } from "@/store/waitlist-role";
import { EASE } from "@/lib/motion";
import ownerImage from "@/assets/landing/char-owner.webp";
import courierImage from "@/assets/landing/char-courier.webp";

interface PartnerCardProps {
  id: string;
  eyebrow: string;
  title: string;
  desc: string;
  points: string[];
  cta: string;
  image: StaticImageData;
  imageAlt: string;
  tone: "light" | "green";
  mirrored?: boolean;
  onCta: () => void;
}

/**
 * One partnership card: one headline, one description, three benefits,
 * one illustration, one CTA. Desktop: split composition; mobile: clean
 * vertical stack. `mirrored` flips the image side for visual rhythm.
 */
function PartnerCard({
  id,
  eyebrow,
  title,
  desc,
  points,
  cta,
  image,
  imageAlt,
  tone,
  mirrored = false,
  onCta,
}: PartnerCardProps) {
  return (
    <Reveal className="partner-card-wrap">
      <article className={`partner-card partner-card--${tone}${mirrored ? " partner-card--mirror" : ""}`}>
        <div className="partner-card__body">
          <span className="partner-card__eyebrow">{eyebrow}</span>
          <h3 className="partner-card__title" id={id}>
            {title}
          </h3>
          <p className="partner-card__desc">{desc}</p>
          <ul className="partner-card__points">
            {points.map((point) => (
              <li key={point} className="partner-card__point">
                <CircleCheck aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn--primary btn--lg partner-card__cta" onClick={onCta}>
            {cta}
            <ArrowLeft aria-hidden="true" />
          </button>
        </div>
        <div className="partner-card__figure">
          <Image
            src={image}
            alt={imageAlt}
            loading="lazy"
            placeholder="blur"
            sizes="(max-width: 900px) 52vw, 210px"
          />
        </div>
      </article>
    </Reveal>
  );
}

/** Section 06 — Store & courier partnerships: two compact, independent cards. */
export function Partners() {
  const presetRole = useWaitlistRole((s) => s.presetRole);

  return (
    <section id="partners" className="section partners" aria-label="همکاری با ما">
      <div className="container">
        <Reveal className="partners__head">
          <h2 className="partners__title">{PARTNERS.title}</h2>
          <p className="partners__desc">{PARTNERS.desc}</p>
        </Reveal>

        <div className="partners__grid">
          <PartnerCard
            id="partner-seller-title"
            eyebrow={SELLER.eyebrow}
            title={SELLER.title}
            desc={SELLER.desc}
            points={SELLER.points}
            cta={SELLER.cta}
            image={ownerImage}
            imageAlt="فروشنده‌ی نظرآباد شاپ با روپوش سبز در فروشگاه"
            tone="light"
            onCta={() => {
              trackEvent("store_partner_cta_click");
              presetRole("owner");
            }}
          />
          <PartnerCard
            id="partner-courier-title"
            eyebrow={COURIER.eyebrow}
            title={COURIER.title}
            desc={COURIER.desc}
            points={COURIER.points}
            cta={COURIER.cta}
            image={courierImage}
            imageAlt="پیک موتوری نظرآباد شاپ با جعبه‌ی تحویل روی موتور"
            tone="green"
            mirrored
            onCta={() => {
              trackEvent("courier_partner_cta_click");
              presetRole("courier");
            }}
          />
        </div>
      </div>
    </section>
  );
}
