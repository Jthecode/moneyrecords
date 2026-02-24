// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Nav Bar                                               ┃
   ┃ File   : src/components/NavBar.tsx                                    ┃
   ┃ Role   : Sticky top navigation (crest + links + CTAs)                 ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";

type NavLink = { label: string; href: string };

type NavBarProps = {
  links?: NavLink[];
  ctaPrimaryHref?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryHref?: string;
  ctaSecondaryLabel?: string;
};

export default function NavBar({
  links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Ranked", href: "#ranked" },
    { label: "Contact", href: "#contact" },
  ],
  ctaPrimaryHref = "#packages",
  ctaPrimaryLabel = "Get Started",
  ctaSecondaryHref = "#contact",
  ctaSecondaryLabel = "Inquire",
}: NavBarProps) {
  return (
    <header className="mr-topbar sticky top-0 z-50">
      <Container className="flex items-center justify-between py-4">
        {/* Left: Brand */}
        <a href="#home" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/15 bg-white/5">
            <Image
              src="/brand/mr-crest.png"
              alt="Money Records"
              fill
              className="object-contain p-1"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-[0.22em] uppercase">
              Money Records LLC
            </div>
            <div className="text-xs text-[rgba(244,241,234,0.70)] tracking-[0.16em] uppercase">
              Record Label • Global Distribution
            </div>
          </div>
        </a>

        {/* Center: Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} className="mr-navlink" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-3">
          <Button variant="secondary" href={ctaSecondaryHref}>
            {ctaSecondaryLabel}
          </Button>
          <Button variant="primary" href={ctaPrimaryHref}>
            {ctaPrimaryLabel}
          </Button>
        </div>
      </Container>
    </header>
  );
}