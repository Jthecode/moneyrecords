// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Home Page                                             ┃
   ┃ File   : src/app/page.tsx                                             ┃
   ┃ Role   : Homepage shell (nav + section composition)                   ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Hero from "@/sections/Hero";
import WhyChoose from "@/sections/WhyChoose";
import TopRank from "@/sections/TopRank";
import CTA from "@/sections/CTA";

import NavBar from "@/components/NavBar";
import Container from "@/components/Container";
import Card from "@/components/Card";
import Divider from "@/components/Divider";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top Bar / Nav */}
      <NavBar />

      {/* Page */}
      <main id="top">
        {/* HERO */}
        <section aria-label="Money Records hero">
          <Container>
            <Hero />
          </Container>
        </section>

        {/* WHY CHOOSE (Services) */}
        <section id="services" aria-label="Services" className="mt-12">
          <WhyChoose />
        </section>

        {/* TOP 2% (Rank Badge Section) */}
        <section id="rank" aria-label="Ranked" className="mt-12">
          <TopRank />
        </section>

        {/* CTA (Contact) */}
        <CTA />

        {/* Footer */}
        <footer className="mt-16 pb-16">
          <Container>
            <Card className="p-6 md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-xs tracking-[0.20em] uppercase text-[rgba(244,241,234,0.65)]">
                  © {new Date().getFullYear()} Money Records LLC. All rights
                  reserved.
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <a className="mr-navlink" href="#top">
                    Back to top
                  </a>
                  <span className="text-white/20">•</span>
                  <a className="mr-navlink" href="#services">
                    Services
                  </a>
                  <span className="text-white/20">•</span>
                  <a className="mr-navlink" href="#rank">
                    Ranked
                  </a>
                  <span className="text-white/20">•</span>
                  <a className="mr-navlink" href="#contact">
                    Contact
                  </a>
                </div>
              </div>

              <Divider className="mt-6" />
              <div className="mt-6 flex flex-col gap-2 text-xs text-[rgba(244,241,234,0.55)] md:flex-row md:items-center md:justify-between">
                <div className="tracking-[0.18em] uppercase">
                  Global Distribution • Marketing • PR • VEVO Options
                </div>
                <div className="tracking-[0.18em] uppercase">
                  Ranked Top 2% Worldwide
                </div>
              </div>
            </Card>
          </Container>
        </footer>
      </main>
    </div>
  );
}