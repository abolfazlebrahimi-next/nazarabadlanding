import { ArrowLeft } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/ui/Reveal";
import { SectionHead } from "@/components/landing/ui/SectionHead";
import { PRODUCTS } from "@/data/content";
import { formatToman } from "@/lib/phone";
import { trackEvent } from "@/lib/analytics";
import prodMilk from "@/assets/landing/prod-milk.webp";
import prodEggs from "@/assets/landing/prod-eggs.webp";
import prodOil from "@/assets/landing/prod-oil.webp";
import prodRice from "@/assets/landing/prod-rice.webp";

/** The single product showcase — 4 daily essentials with owner-approved prices. */
const SHOWCASE = [
  { name: "شیر کم‌چرب", meta: "بطری ۱ لیتری", price: 70_000, image: prodMilk, alt: "بطری شیر کم‌چرب" },
  { name: "تخم‌مرغ", meta: "بسته ۱۰ عددی", price: 200_000, image: prodEggs, alt: "شانه تخم‌مرغ" },
  { name: "روغن مایع", meta: "بطری ۱.۶ لیتری", price: 300_000, image: prodOil, alt: "بطری روغن مایع سرخ‌کردنی" },
  { name: "برنج", meta: "بسته ۵ کیلویی", price: 2_500_000, image: prodRice, alt: "بسته برنج" },
];

/** ONE high-quality product showcase (grid: 4 → 2 → 2 columns). */
export function FeaturedProducts() {
  return (
    <section id="products" className="section products" aria-label="محصولات موردنیاز روزانه">
      <div className="container">
        <SectionHead title={PRODUCTS.title} desc={PRODUCTS.desc} center />

        <RevealGroup className="products__grid" stagger={0.1} margin="-70px">
          {SHOWCASE.map((product) => (
            <RevealItem key={product.name} className="products__cell" y={26}>
              <a
                className="product-card"
                href="#waitlist"
                aria-label={`${product.name} — عضویت در لیست انتظار برای خرید`}
                onClick={() => trackEvent("product_card_click", { product: product.name })}
              >
                <div className="product-card__media">
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 34vw, 250px"
                    className="product-card__img"
                  />
                  <span className="product-card__demo">{PRODUCTS.demoLabel}</span>
                </div>
                <div className="product-card__body">
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__meta">{product.meta}</p>
                  <div className="product-card__foot">
                    <span className="product-card__price" dir="ltr">
                      <span className="product-card__price-num">
                        {formatToman(product.price)}
                      </span>
                      <span className="product-card__price-unit">تومان</span>
                    </span>
                    <span className="product-card__go" aria-hidden="true">
                      <ArrowLeft />
                    </span>
                  </div>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
