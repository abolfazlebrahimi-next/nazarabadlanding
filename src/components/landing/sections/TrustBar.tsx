import {
  Store,
  ShoppingBag,
  PackageCheck,
  Bike,
  BadgeCheck,
  Headset,
  Phone,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/ui/Reveal";
import { SectionHead } from "@/components/landing/ui/SectionHead";
import { TRUST, SUPPORT } from "@/data/content";

const TRUST_ICONS: LucideIcon[] = [Store, ShoppingBag, PackageCheck, Bike];

/** Compact trust/value bar right after the hero: 4 supported capabilities + honest support card. */
export function TrustBar() {
  return (
    <section className="section trust" aria-label="چرا نظرآباد شاپ">
      <div className="container">
        <SectionHead
          eyebrow={TRUST.eyebrow}
          icon={BadgeCheck}
          title={TRUST.title}
          center
        />

        <RevealGroup className="trust__grid" stagger={0.09}>
          {TRUST.items.map((item, index) => {
            const Icon = TRUST_ICONS[index] ?? Store;
            return (
              <RevealItem key={item.title} className="trust__cell">
                <article className="trust-card">
                  <span className="trust-card__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className="trust-card__title">{item.title}</h3>
                  <p className="trust-card__desc">{item.desc}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* honest support reassurance — only verified channels */}
        <Reveal delay={0.15} className="trust__support">
          <div className="trust-support">
            <span className="trust-support__icon" aria-hidden="true">
              <Headset />
            </span>
            <div className="trust-support__body">
              <h3 className="trust-support__title">{SUPPORT.title}</h3>
              <p className="trust-support__desc">{SUPPORT.desc}</p>
            </div>
            <div className="trust-support__links">
              {SUPPORT.phones.map(({ display, tel }) => (
                <a key={tel} className="trust-support__link" href={`tel:${tel}`} dir="ltr">
                  <Phone aria-hidden="true" />
                  {display}
                </a>
              ))}
              <a className="trust-support__link" href={`mailto:${SUPPORT.email}`}>
                <Mail aria-hidden="true" />
                <span dir="ltr">{SUPPORT.email}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
