import type { ReactNode } from "react";
import {
  ChevronLeft,
  Heart,
  Instagram,
  Send,
  Store,
  Bike,
  MapPin,
  Mail,
  Phone,
  ShoppingBasket,
} from "lucide-react";
import { Logo } from "@/components/landing/ui/Logo";
import { BaleIcon, CitySkyline } from "@/components/landing/ui/Decor";
import { NAV_LINKS, FOOTER } from "@/data/content";
import { useWaitlistRole } from "@/store/waitlist-role";

/* Social channels — live on Instagram, Telegram and Bale under one handle. */
const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "اینستاگرام نظرآباد شاپ",
    href: "https://instagram.com/nazarabadshop_ir",
    icon: <Instagram aria-hidden="true" />,
  },
  {
    label: "تلگرام نظرآباد شاپ",
    href: "https://t.me/nazarabadshop_ir",
    icon: <Send aria-hidden="true" />,
  },
  {
    label: "بله — نظرآباد شاپ",
    href: "https://ble.ir/nazarabadshop_ir",
    icon: <BaleIcon aria-hidden="true" />,
  },
];

function SocialLinks() {
  return (
    <div className="footer__socials">
      {SOCIALS.map(({ label, href, icon }) => (
        <a
          key={label}
          className="footer__social"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}

function QuickLinks() {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <a key={link.id} className="footer__link" href={`#${link.id}`}>
          <ChevronLeft aria-hidden="true" />
          {link.label}
        </a>
      ))}
    </>
  );
}

function JoinLinks() {
  const presetRole = useWaitlistRole((s) => s.presetRole);
  return (
    <>
      <button className="footer__link" onClick={() => presetRole("owner")}>
        <Store aria-hidden="true" />
        {FOOTER.sellerLink}
      </button>
      <button className="footer__link" onClick={() => presetRole("courier")}>
        <Bike aria-hidden="true" />
        {FOOTER.courierLink}
      </button>
    </>
  );
}

function ContactLinks({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <span className="footer__contact-item">
        <MapPin aria-hidden="true" />
        {FOOTER.contactCity}
      </span>
      {FOOTER.phones.map(({ display, tel }) => (
        <a
          key={tel}
          className="footer__contact-item footer__contact-link"
          href={`tel:${tel}`}
          dir="ltr"
        >
          <Phone aria-hidden="true" />
          <span>{display}</span>
        </a>
      ))}
      <a className="footer__contact-item footer__contact-link" href={`mailto:${FOOTER.contactEmail}`}>
        <Mail aria-hidden="true" />
        <span dir="ltr">{FOOTER.contactEmail}</span>
      </a>
      {!compact && (
        <a className="footer__contact-item footer__contact-link" href="#faq">
          <ShoppingBasket aria-hidden="true" />
          سوالات متداول
        </a>
      )}
    </>
  );
}

/**
 * Section 09 — Footer.
 * Desktop: four logical groups (brand / quick links / cooperation / contact).
 * Mobile: deliberately compact — logo+tagline, one social row, contact info
 * shown directly (no accordions, no extra link groups), then the shared
 * copyright bar.
 */
export function Footer() {
  return (
    <footer className="footer" aria-label="پابرگ سایت">
      <svg
        className="curve"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        style={{ transform: "scaleY(-1)", top: "auto", bottom: "100%" }}
        aria-hidden="true"
      >
        <path
          d="M0,64 C220,112 470,108 720,84 C970,60 1210,22 1440,54 L1440,110 L0,110 Z"
          fill="#073F39"
        />
      </svg>

      <div className="container">
        {/* ── Desktop grid ─────────────────────────── */}
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo tone="light" />
            <p className="footer__brand-tagline">{FOOTER.tagline}</p>
            <SocialLinks />
            <p className="footer__socials-note" dir="ltr">
              {FOOTER.socialHandle}
            </p>
          </div>

          <nav aria-label={FOOTER.quickTitle}>
            <h3 className="footer__col-title">{FOOTER.quickTitle}</h3>
            <div className="footer__links">
              <QuickLinks />
            </div>
          </nav>

          <nav aria-label={FOOTER.joinTitle}>
            <h3 className="footer__col-title">{FOOTER.joinTitle}</h3>
            <div className="footer__links">
              <JoinLinks />
            </div>
          </nav>

          <div>
            <h3 className="footer__col-title">{FOOTER.contactTitle}</h3>
            <div className="footer__links">
              <ContactLinks />
            </div>
          </div>
        </div>

        {/* ── Mobile compact footer ────────────────── */}
        <div className="footer__m">
          <div className="footer__m-brand">
            <Logo tone="light" showTag={false} />
            <p className="footer__m-tagline">{FOOTER.tagline}</p>
          </div>

          <div className="footer__m-socials">
            <SocialLinks />
            <span className="footer__m-handle" dir="ltr">
              {FOOTER.socialHandle}
            </span>
          </div>

          <div className="footer__m-contact footer__links">
            <ContactLinks compact />
          </div>
        </div>

        {/* subtle city skyline — desktop only */}
        <CitySkyline className="footer__skyline" />

        <div className="footer__bottom">
          <span>تمامی حقوق برای نظرآباد شاپ محفوظ است</span>
          <span className="footer__bottom-heart">
            {FOOTER.madeWith}
            <Heart aria-hidden="true" fill="currentColor" />
          </span>
        </div>
      </div>
    </footer>
  );
}
