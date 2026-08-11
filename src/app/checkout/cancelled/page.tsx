// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Checkout Cancelled Page                               ┃
   ┃ File   : src/app/checkout/cancelled/page.tsx                          ┃
   ┃ Role   : Payment-cancellation recovery and campaign-cart navigation   ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                   */
/* --------------------------------------------------------------------- */

export const dynamic = "force-static";

/* --------------------------------------------------------------------- */
/* Metadata                                                              */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Checkout Cancelled",
  description:
    "Your Money Records checkout was cancelled and no payment was completed.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

/* --------------------------------------------------------------------- */
/* Icons                                                                 */
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

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
    >
      <path
        d="M7 7L17 17M17 7L7 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
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

function RefreshIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M19 8V4M19 4H15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M18.2 7.1A7.5 7.5 0 1 0 19.1 14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <rect
        x="3.5"
        y="6"
        width="17"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M3.5 10H20.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M7 14.5H10.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M5 12A7 7 0 0 1 19 12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M5 12V16.5C5 17.3 5.7 18 6.5 18H8V12H5ZM19 12V16.5C19 17.3 18.3 18 17.5 18H16V12H19Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M16 18C15.5 19.4 14.2 20 12 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
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

/* --------------------------------------------------------------------- */
/* Status Metric                                                         */
/* --------------------------------------------------------------------- */

function StatusMetric({
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
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
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
/* Recovery Step                                                         */
/* --------------------------------------------------------------------- */

function RecoveryStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-5">
      <span className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[9px] font-black text-[var(--mr-gold-200)]">
        {number}
      </span>

      <h3 className="mt-4 text-sm font-black text-[var(--mr-text)]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-white/42">
        {description}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Checkout Cancelled Page                                               */
/* --------------------------------------------------------------------- */

export default function CheckoutCancelledPage() {
  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* Page atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[850px] w-[1240px] max-w-[122vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.045)] blur-[190px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 [background-image:radial-gradient(rgba(227,179,77,0.1)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
      />

      <Container size="wide">
        <main className="py-10 md:py-14">
          {/* ----------------------------------------------------------- */}
          {/* Cancelled Hero                                              */}
          {/* ----------------------------------------------------------- */}

          <header className="relative overflow-hidden rounded-[32px] border border-[rgba(227,179,77,0.2)] bg-[linear-gradient(145deg,rgba(19,18,16,0.97),rgba(7,7,8,0.99))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.56)] sm:p-8 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.1)] blur-[145px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-44 -left-36 h-[420px] w-[420px] rounded-full bg-red-300/[0.025] blur-[130px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.72),transparent)]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 flex-[0_0_64px] place-items-center rounded-[20px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)] shadow-[0_18px_55px_rgba(0,0,0,0.38)]">
                    <CloseIcon />
                  </span>

                  <div>
                    <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                      Checkout Cancelled
                    </p>

                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.13em] text-white/30">
                      No Payment Completed
                    </p>
                  </div>
                </div>

                <h1 className="mt-8 text-balance text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[var(--mr-text)] sm:text-5xl lg:text-6xl">
                  Your Campaign Order{" "}
                  <span className="mr-text-gradient">
                    Was Not Submitted.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/52 sm:text-lg">
                  You left Stripe Checkout before completing payment. No
                  campaign payment was confirmed, and your selected services
                  should remain saved in your Money Records cart.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <span className="mr-badge mr-badge-dark">
                    Payment Not Completed
                  </span>

                  <span className="mr-badge mr-badge-dark">
                    Cart Preserved
                  </span>

                  <span className="mr-badge mr-badge-dark">
                    Safe to Retry
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href="/checkout"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="w-full sm:w-auto"
                  >
                    Return to Checkout
                  </Button>

                  <Button
                    href="/cart"
                    variant="secondary"
                    size="lg"
                    leftIcon={<CartIcon />}
                    className="w-full sm:w-auto"
                  >
                    Review Campaign Cart
                  </Button>
                </div>
              </div>

              {/* Cancellation status */}

              <Card
                as="aside"
                padding="lg"
                className="border-[rgba(227,179,77,0.16)] bg-black/25"
              >
                <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  Checkout Status
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                  Payment Cancelled
                </h2>

                <Divider
                  className="my-6"
                  variant="soft"
                />

                <div className="grid gap-4">
                  {[
                    {
                      label: "Payment",
                      value: "Not Completed",
                    },
                    {
                      label: "Campaign Order",
                      value: "Not Activated",
                    },
                    {
                      label: "Campaign Cart",
                      value: "Preserved",
                    },
                    {
                      label: "Next Action",
                      value: "Retry or Edit Cart",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-5 border-b border-white/[0.055] pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/35">
                        {item.label}
                      </span>

                      <span className="max-w-[60%] text-right text-sm font-black text-[var(--mr-text)]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.045)] p-4">
                  <span className="mt-0.5 text-[var(--mr-gold-200)]">
                    <ShieldIcon />
                  </span>

                  <p className="m-0 text-xs leading-5 text-white/42">
                    Cancelling Stripe Checkout does not activate campaign
                    fulfillment or confirm a payment.
                  </p>
                </div>
              </Card>
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Status Metrics                                              */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Cancelled checkout status"
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <StatusMetric
              icon={<PaymentIcon />}
              label="Payment Status"
              value="Not Completed"
              description="Stripe did not return a completed payment confirmation."
            />

            <StatusMetric
              icon={<CartIcon />}
              label="Campaign Cart"
              value="Still Available"
              description="Your selected services remain stored in this browser."
            />

            <StatusMetric
              icon={<RefreshIcon />}
              label="Checkout"
              value="Ready to Retry"
              description="Return to checkout whenever you are ready to continue."
            />

            <StatusMetric
              icon={<LockIcon />}
              label="Payment Security"
              value="Stripe Hosted"
              description="Payment information is entered securely through Stripe."
            />
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Recovery Content                                            */}
          {/* ----------------------------------------------------------- */}

          <div className="grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start md:py-16">
            <section
              aria-labelledby="checkout-recovery-heading"
              className="min-w-0"
            >
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Resume Your Order
              </p>

              <h2
                id="checkout-recovery-heading"
                className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl"
              >
                Continue When You Are Ready
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/46">
                Review your selected services, update campaign details if
                necessary, and restart Stripe Checkout when you are ready to
                complete payment.
              </p>

              <Card
                as="section"
                variant="featured"
                padding="lg"
                topLine
                className="relative mt-7 overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.075)] blur-[100px]"
                />

                <div className="relative">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                    Recommended Next Steps
                  </p>

                  <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-[var(--mr-text)] sm:text-2xl">
                    Review, Confirm, and Retry
                  </h3>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/48">
                    No campaign work begins until Stripe confirms successful
                    payment.
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-3">
                    <RecoveryStep
                      number="01"
                      title="Review Your Cart"
                      description="Confirm each campaign service and one-time price."
                    />

                    <RecoveryStep
                      number="02"
                      title="Check Intake Details"
                      description="Review the artist, release, campaign, and asset information."
                    />

                    <RecoveryStep
                      number="03"
                      title="Restart Payment"
                      description="Return to Stripe Checkout and complete secure payment."
                    />
                  </div>
                </div>
              </Card>

              {/* Common cancellation reasons */}

              <Card
                as="section"
                padding="lg"
                className="relative mt-6 overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[rgba(227,179,77,0.055)] blur-[85px]"
                />

                <div className="relative">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                    Before Retrying
                  </p>

                  <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-[var(--mr-text)]">
                    Confirm These Details
                  </h3>

                  <div className="mt-6 grid gap-3">
                    {[
                      "Your selected campaign services and totals are correct.",
                      "Your contact email and phone number are accurate.",
                      "Your artist, release, and campaign links are complete.",
                      "Your payment method is available for the full order total.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
                      >
                        <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                          <CheckIcon />
                        </span>

                        <p className="m-0 text-xs leading-6 text-white/46">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            {/* Action sidebar */}

            <aside className="lg:sticky lg:top-28">
              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
                aria-labelledby="cancelled-checkout-actions-heading"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.09)] blur-[100px]"
                />

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                      <RefreshIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                        Resume Checkout
                      </p>

                      <h2
                        id="cancelled-checkout-actions-heading"
                        className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]"
                      >
                        Choose Your Next Step
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/46">
                    Your cart should remain available so you can continue
                    without rebuilding your campaign selection.
                  </p>

                  <Divider
                    className="my-7"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    <Button
                      href="/checkout"
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowIcon />}
                      fullWidth
                    >
                      Retry Secure Checkout
                    </Button>

                    <Button
                      href="/cart"
                      variant="secondary"
                      size="lg"
                      leftIcon={<CartIcon />}
                      fullWidth
                    >
                      Review Campaign Cart
                    </Button>

                    <Button
                      href="/services"
                      variant="secondary"
                      size="sm"
                      fullWidth
                    >
                      Explore More Services
                    </Button>

                    <Button
                      href="/"
                      variant="ghost"
                      size="sm"
                      leftIcon={<BackIcon />}
                      fullWidth
                    >
                      Return to Money Records
                    </Button>
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
                    <span className="mt-0.5 text-[var(--mr-gold-200)]">
                      <SupportIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[10px] font-black uppercase tracking-[0.14em] text-white/45">
                        Need Assistance?
                      </p>

                      <p className="mt-2 text-xs leading-5 text-white/42">
                        Contact Money Records if you experienced a checkout
                        problem or need help selecting the correct campaign.
                      </p>

                      <a
                        href="mailto:info@moneyrecords.io"
                        className="mt-3 inline-flex text-xs font-black text-[var(--mr-gold-200)] hover:underline"
                      >
                        info@moneyrecords.io
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </aside>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Checkout Standards                                         */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Cancelled checkout standards"
            className="pb-16"
          >
            <Divider
              label="Checkout Protection"
              variant="strong"
              spacing="lg"
            />

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: <PaymentIcon />,
                  title: "No Confirmed Payment",
                  description:
                    "A cancelled Checkout Session does not count as a completed campaign payment.",
                },
                {
                  icon: <CartIcon />,
                  title: "Campaign Cart Preserved",
                  description:
                    "Your campaign selections remain stored locally unless you remove or clear them.",
                },
                {
                  icon: <ShieldIcon />,
                  title: "Safe Server Verification",
                  description:
                    "Campaign prices and availability will be verified again when you retry checkout.",
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
                <ShieldIcon />
              </span>

              <p className="m-0 text-xs leading-6 text-white/42">
                Campaign fulfillment begins only after Stripe confirms
                successful payment and Money Records reviews the submitted
                campaign intake. Campaign targets remain estimates and do not
                guarantee streams, followers, placements, revenue, chart
                position, virality, or other specific results.
              </p>
            </div>
          </section>
        </main>
      </Container>
    </div>
  );
}