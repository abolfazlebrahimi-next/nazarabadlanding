import { Store, ShoppingBag, PackageCheck, Bike, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/landing/ui/Reveal";
import { BENEFITS } from "@/data/content";

const BENEFIT_ICONS: LucideIcon[] = [Store, ShoppingBag, PackageCheck, Bike];

/**
 * Section 02 — Main benefits. Compact and minimal: four real service
 * characteristics, one line each. No cards, no badges, no support content
 * (support lives in the footer as a communication channel, not a trust proof).
 */
export function Benefits() {
  return (
    <section id="benefits" className="section benefits" aria-label="مزیت‌های نظرآباد شاپ">
      <div className="container">
        <RevealGroup className="benefits__grid" stagger={0.08}>
          {BENEFITS.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index] ?? Store;
            return (
              <RevealItem key={benefit.title} className="benefits__cell">
                <article className="benefit">
                  <span className="benefit__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className="benefit__title">{benefit.title}</h3>
                  <p className="benefit__desc">{benefit.desc}</p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
