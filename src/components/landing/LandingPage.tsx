import { Navbar } from "@/components/landing/sections/Navbar";
import { Hero } from "@/components/landing/sections/Hero";
import { Benefits } from "@/components/landing/sections/Benefits";
import { HowItWorks } from "@/components/landing/sections/HowItWorks";
import { FeaturedProducts } from "@/components/landing/sections/FeaturedProducts";
import { WhyNazarabad } from "@/components/landing/sections/WhyNazarabad";
import { Partners } from "@/components/landing/sections/Partners";
import { Faq } from "@/components/landing/sections/Faq";
import { FinalCta } from "@/components/landing/sections/FinalCta";
import { Footer } from "@/components/landing/sections/Footer";

/**
 * Nazarabad Shop landing page — final 9-section architecture:
 * 1 Header+Hero · 2 Benefits · 3 HowItWorks · 4 Products · 5 Why
 * 6 Partners · 7 FAQ · 8 Waitlist CTA · 9 Footer
 */
export function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#waitlist">
        رفتن به فرم عضویت
      </a>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <FeaturedProducts />
        <WhyNazarabad />
        <Partners />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
