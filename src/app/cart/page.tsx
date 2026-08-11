"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Shopping Cart                                         ┃
   ┃ File   : src/app/cart/page.tsx                                        ┃
   ┃ Role   : Complete campaign-service cart and order review page          ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import CartItemCard from "@/components/CartItemCard";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/components/CartProvider";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

import { formatCartPrice } from "@/lib/cart";

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M19 12H5M10 7L5 12L10 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
    >
      <path
        d="M4 5H6L8.1 14.2H17.7L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="17"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
    >
      <path
        d="M6 12.5L10 16.5L18 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M12 3.5L19 6.2V11.4C19 15.6 16.4 18.8 12 20.5C7.6 18.8 5 15.6 5 11.4V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M8.8 12L11 14.2L15.5 9.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M6 4.5H15L18 7.5V19.5H6V4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M15 4.5V8H18M9 11H15M9 14.5H15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="12"
        cy="12"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="12"
        cy="12"
        r="1.2"
        fill="currentColor"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function getServiceLabel(count: number): string {
  return count === 1 ? "service" : "services";
}

/* --------------------------------------------------------------------- */
/* Summary Metric                                                         */
/* --------------------------------------------------------------------- */

function CartMetric({
  icon,
  label,
  value,
  description,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group"
    >
      <div className="flex h-full items-start gap-4">
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
            {label}
          </p>

          <p className="mt-2 text-lg font-black leading-6 tracking-[-0.03em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-white/42">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Loading State                                                          */
/* --------------------------------------------------------------------- */

function CartLoadingState() {
  return (
    <div
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]"
      aria-label="Loading cart"
      aria-busy="true"
    >
      <div className="grid gap-5">
        {[1, 2].map((item) => (
          <Card
            key={item}
            as="article"
            padding="lg"
          >
            <div className="animate-pulse">
              <div className="flex items-start gap-5">
                <div className="h-16 w-16 flex-[0_0_64px] rounded-[20px] bg-white/[0.065]" />

                <div className="flex-1">
                  <div className="h-3 w-24 rounded-full bg-white/[0.065]" />
                  <div className="mt-4 h-7 w-2/3 rounded-xl bg-white/[0.065]" />
                  <div className="mt-3 h-4 w-36 rounded-full bg-white/[0.04]" />
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="h-24 rounded-2xl bg-white/[0.04]" />
                <div className="h-24 rounded-2xl bg-white/[0.04]" />
                <div className="h-24 rounded-2xl bg-white/[0.04]" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card
        as="aside"
        variant="featured"
        padding="lg"
        topLine
      >
        <div className="animate-pulse">
          <div className="h-3 w-28 rounded-full bg-white/[0.07]" />
          <div className="mt-4 h-8 w-48 rounded-xl bg-white/[0.07]" />
          <div className="mt-3 h-4 w-full rounded-full bg-white/[0.045]" />

          <Divider
            className="my-7"
            variant="soft"
          />

          <div className="grid gap-4">
            <div className="h-12 rounded-2xl bg-white/[0.045]" />
            <div className="h-12 rounded-2xl bg-white/[0.045]" />
            <div className="h-20 rounded-2xl bg-white/[0.055]" />
          </div>

          <div className="mt-7 h-12 rounded-full bg-white/[0.07]" />
        </div>
      </Card>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Empty Cart                                                             */
/* --------------------------------------------------------------------- */

function EmptyCartState() {
  return (
    <Card
      as="section"
      variant="featured"
      padding="lg"
      topLine
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.12)] blur-[120px]"
      />

      <div className="relative mx-auto max-w-2xl py-8 text-center sm:py-12">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)] shadow-[0_20px_60px_rgba(0,0,0,0.38)]">
          <CartIcon />
        </span>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
          Money Records Marketing Store
        </p>

        <h2 className="mt-3 text-balance text-3xl font-black leading-[1.04] tracking-[-0.045em] text-[var(--mr-text)] sm:text-4xl">
          Your Campaign Cart Is Empty.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/48 sm:text-base">
          Explore the Money Records platform storefront, compare individual
          campaign services, and add the option that best fits your release.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            href="/services"
            variant="primary"
            size="lg"
            rightIcon={<ArrowIcon />}
            className="w-full sm:w-auto"
          >
            Explore Marketing Services
          </Button>

          <Button
            href="/"
            variant="secondary"
            size="lg"
            leftIcon={<BackIcon />}
            className="w-full sm:w-auto"
          >
            Return Home
          </Button>
        </div>

        <div className="mt-9 grid gap-3 text-left sm:grid-cols-3">
          {[
            "Choose a platform",
            "Compare campaign levels",
            "Review before checkout",
          ].map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
            >
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
                0{index + 1}
              </p>

              <p className="mt-2 text-xs font-bold leading-5 text-white/52">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Cart Page                                                              */
/* --------------------------------------------------------------------- */

export default function CartPage() {
  const {
    items,
    itemCount,
    uniqueItemCount,
    subtotalCents,
    currency,
    isHydrated,
    isEmpty,
  } = useCart();

  const subtotalLabel =
    formatCartPrice(
      subtotalCents,
      currency,
    );

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* Decorative background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[760px] w-[1180px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.055)] blur-[175px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
      />

      <Container size="wide">
        {/* ------------------------------------------------------------- */}
        {/* Breadcrumb                                                    */}
        {/* ------------------------------------------------------------- */}

        <nav
          aria-label="Cart breadcrumb"
          className="pt-8 md:pt-10"
        >
          <Button
            href="/services"
            variant="ghost"
            size="sm"
            leftIcon={<BackIcon />}
          >
            Continue Shopping
          </Button>
        </nav>

        {/* ------------------------------------------------------------- */}
        {/* Hero                                                          */}
        {/* ------------------------------------------------------------- */}

        <header className="relative mt-5 overflow-hidden rounded-[30px] border border-[rgba(227,179,77,0.2)] bg-[linear-gradient(145deg,rgba(18,18,20,0.95),rgba(7,7,8,0.98))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.52)] sm:p-8 lg:p-11">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-44 h-[500px] w-[500px] rounded-full bg-[rgba(211,154,46,0.18)] blur-[140px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[rgba(184,124,32,0.06)] blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.75),transparent)]"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 flex-[0_0_56px] place-items-center rounded-[18px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                  <CartIcon />
                </span>

                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Campaign Selection
                  </p>

                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.13em] text-white/30">
                    Money Records Marketing Store
                  </p>
                </div>
              </div>

              <h1 className="mt-7 text-balance text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[var(--mr-text)] sm:text-5xl lg:text-6xl">
                Review Your{" "}
                <span className="mr-text-gradient">
                  Campaign Cart.
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/52 sm:text-lg">
                Confirm each selected platform service, campaign target, and
                one-time price before continuing to campaign intake and secure
                checkout.
              </p>
            </div>

            {isHydrated && !isEmpty ? (
              <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[360px]">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                    Selected Services
                  </p>

                  <p className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                    {itemCount}{" "}
                    {getServiceLabel(itemCount)}
                  </p>
                </div>

                <div className="rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] p-4">
                  <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                    Current Subtotal
                  </p>

                  <p className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                    {subtotalLabel}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* Cart Metrics                                                  */}
        {/* ------------------------------------------------------------- */}

        {isHydrated && !isEmpty ? (
          <section
            aria-label="Cart overview"
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <CartMetric
              icon={<CartIcon />}
              label="Selected Services"
              value={`${itemCount}`}
              description={`Your cart contains ${itemCount} selected ${getServiceLabel(
                itemCount,
              )}.`}
            />

            <CartMetric
              icon={<TargetIcon />}
              label="Unique Campaigns"
              value={`${uniqueItemCount}`}
              description="Duplicate campaign quantities are not permitted."
            />

            <CartMetric
              icon={<LockIcon />}
              label="Campaign Pricing"
              value={subtotalLabel}
              description="Every campaign uses trusted catalog pricing."
            />

            <CartMetric
              icon={<ShieldIcon />}
              label="Checkout Standard"
              value="Server Verified"
              description="Campaign availability and pricing will be checked again."
            />
          </section>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Main Cart Content                                              */}
        {/* ------------------------------------------------------------- */}

        <main className="py-12 md:py-16">
          {!isHydrated ? (
            <CartLoadingState />
          ) : isEmpty ? (
            <EmptyCartState />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
              {/* ------------------------------------------------------- */}
              {/* Selected Campaigns                                      */}
              {/* ------------------------------------------------------- */}

              <section
                aria-labelledby="selected-campaigns-heading"
                className="min-w-0"
              >
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                      Selected Campaigns
                    </p>

                    <h2
                      id="selected-campaigns-heading"
                      className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl"
                    >
                      Your Marketing Services
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-white/46">
                      Review or remove any campaign before continuing.
                    </p>
                  </div>

                  <Button
                    href="/services"
                    variant="secondary"
                    size="sm"
                    rightIcon={<ArrowIcon />}
                  >
                    Add Another Service
                  </Button>
                </div>

                <div className="grid gap-5">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.sku}
                      item={item}
                      showDetails
                      showRemove
                    />
                  ))}
                </div>

                {/* Cart workflow */}

                <Card
                  as="aside"
                  padding="lg"
                  className="relative mt-6 overflow-hidden"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[rgba(211,154,46,0.08)] blur-[85px]"
                  />

                  <div className="relative">
                    <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                      What Happens Next
                    </p>

                    <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-[var(--mr-text)]">
                      Campaign Intake and Secure Checkout
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/48">
                      The next step will collect the artist, release, song,
                      audience, artwork, and campaign details needed to prepare
                      your selected services.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        {
                          number: "01",
                          title: "Confirm Services",
                          description:
                            "Review each campaign and its one-time price.",
                        },
                        {
                          number: "02",
                          title: "Submit Release Details",
                          description:
                            "Provide the information required for fulfillment.",
                        },
                        {
                          number: "03",
                          title: "Complete Payment",
                          description:
                            "Continue through the secure checkout process.",
                        },
                      ].map((step) => (
                        <div
                          key={step.number}
                          className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
                        >
                          <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
                            {step.number}
                          </p>

                          <p className="mt-2 text-sm font-black text-[var(--mr-text)]">
                            {step.title}
                          </p>

                          <p className="mt-2 text-xs leading-5 text-white/42">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </section>

              {/* ------------------------------------------------------- */}
              {/* Order Summary                                           */}
              {/* ------------------------------------------------------- */}

              <CartSummary
                checkoutHref="/checkout"
                checkoutLabel="Continue to Checkout"
                continueShoppingHref="/services"
                continueShoppingLabel="Explore More Services"
                showClearCart
                showStandards
                sticky
              />
            </div>
          )}
        </main>

        {/* ------------------------------------------------------------- */}
        {/* Trust and Campaign Standards                                  */}
        {/* ------------------------------------------------------------- */}

        <section
          aria-label="Campaign checkout standards"
          className="pb-16"
        >
          <Divider
            label="Campaign Checkout Standards"
            variant="strong"
            spacing="lg"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: <LockIcon />,
                title: "Trusted Catalog Pricing",
                description:
                  "The server will verify each campaign SKU, price, and availability before payment.",
              },
              {
                icon: <DocumentIcon />,
                title: "Campaign Intake Required",
                description:
                  "Fulfillment begins after the required release information and assets are reviewed.",
              },
              {
                icon: <ShieldIcon />,
                title: "No Guaranteed Results",
                description:
                  "Campaign targets are estimates and do not guarantee streams, placements, revenue, or outcomes.",
              },
            ].map((standard) => (
              <Card
                key={standard.title}
                as="article"
                padding="md"
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                  {standard.icon}
                </span>

                <h2 className="mt-5 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
                  {standard.title}
                </h2>

                <p className="mt-3 text-xs leading-6 text-white/44">
                  {standard.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.045)] p-5">
            <span className="mt-0.5 text-[var(--mr-gold-200)]">
              <CheckIcon />
            </span>

            <p className="m-0 text-xs leading-6 text-white/42">
              Your cart is saved in this browser. Campaign prices,
              availability, deliverables, and requirements remain subject to
              verification before checkout and fulfillment.
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}