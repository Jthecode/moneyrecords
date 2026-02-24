// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services Page                                         ┃
   ┃ File   : src/app/services/page.tsx                                    ┃
   ┃ Role   : Services landing (platforms + packages + CTA)                ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import NavBar from "@/components/NavBar";
import ServicesHero from "@/sections/ServicesHero";
import ServicesPlatforms from "@/sections/ServicesPlatforms";
import ServicesPackages from "@/sections/ServicesPackages";
import ServicesFAQ from "@/sections/ServicesFAQ";
import ServicesCTA from "@/sections/ServicesCTA";

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="mr-container">
        <ServicesHero />

        <section id="platforms" className="mt-12">
          <ServicesPlatforms />
        </section>

        <section id="packages" className="mt-12">
          <ServicesPackages />
        </section>

        <section id="faq" className="mt-12">
          <ServicesFAQ />
        </section>

        <ServicesCTA />

        <footer className="mt-16 pb-16">
          <div className="mr-card p-6 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-xs tracking-[0.20em] uppercase text-[rgba(244,241,234,0.65)]">
                © {new Date().getFullYear()} Money Records LLC. All rights
                reserved.
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <a className="mr-navlink" href="/#top">
                  Home
                </a>
                <span className="text-white/20">•</span>
                <a className="mr-navlink" href="#platforms">
                  Platforms
                </a>
                <span className="text-white/20">•</span>
                <a className="mr-navlink" href="#packages">
                  Packages
                </a>
                <span className="text-white/20">•</span>
                <a className="mr-navlink" href="#faq">
                  FAQ
                </a>
                <span className="text-white/20">•</span>
                <a className="mr-navlink" href="#contact">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}