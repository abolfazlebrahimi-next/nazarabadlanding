"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Menu, ShoppingCart, X } from "lucide-react";
import { Logo } from "@/components/landing/ui/Logo";
import { NAV_LINKS } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { EASE } from "@/lib/motion";

/** Fixed top navigation: transparent over hero, deep-green card after scroll. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#home" aria-label="نظرآباد شاپ — صفحه اصلی" onClick={closeMenu}>
          <Logo tone={scrolled ? "dark" : "light"} showTag />
        </a>

        <nav className="nav__links" aria-label="ناوبری اصلی">
          {NAV_LINKS.map((link) => (
            <a key={link.id} className="nav__link" href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="btn btn--primary btn--sm nav__cta"
            href="#waitlist"
            onClick={() => trackEvent("nav_cta_click", { from: "desktop" })}
          >
            <ShoppingCart aria-hidden="true" />
            عضویت
          </a>
          <button
            className="nav__burger"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="nav__mobile container"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="nav__mobile-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  className="nav__mobile-link"
                  href={`#${link.id}`}
                  onClick={closeMenu}
                >
                  {link.label}
                  <ChevronLeft aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="nav__mobile-cta">
              <a
                className="btn btn--primary"
                href="#waitlist"
                style={{ width: "100%" }}
                onClick={() => {
                  closeMenu();
                  trackEvent("nav_cta_click", { from: "mobile" });
                }}
              >
                <ShoppingCart aria-hidden="true" />
                عضویت در لیست انتظار
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
