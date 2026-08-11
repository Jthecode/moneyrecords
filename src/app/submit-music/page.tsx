// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Submit Music Page                                    ┃
   ┃ File   : src/app/submit-music/page.tsx                               ┃
   ┃ Role   : Premium artist and music submission destination             ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import MusicSubmissionForm from "@/components/MusicSubmissionForm";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic = "force-static";

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

const CONTACT_EMAIL =
  "info@moneyrecords.io";

const INSTAGRAM_URL =
  "https://instagram.com/kingpharaohreal";

const INSTAGRAM_HANDLE =
  "@kingpharaohreal";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Submit Music",

  description:
    "Submit your music to Money Records for label consideration, artist development, music distribution, release strategy, marketing, press, VEVO, radio, branding, and other music-industry opportunities.",

  keywords: [
    "submit music to Money Records",
    "Money Records submissions",
    "record label submissions",
    "submit music to record label",
    "artist submission",
    "music submission",
    "artist development",
    "music distribution",
    "music marketing",
    "Spotify promotion",
    "Apple Music promotion",
    "VEVO submission",
    "music PR",
    "radio promotion",
    "artist branding",
    "independent artist",
    "record deal submission",
  ],

  alternates: {
    canonical: "/submit-music",
  },

  openGraph: {
    type: "website",

    title:
      "Submit Your Music | Money Records",

    description:
      "Send Money Records your strongest music, artist information, release details, official links, and creative direction.",

    url:
      "/submit-music",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Submit Your Music | Money Records",

    description:
      "Submit your music for review by the Money Records team.",
  },
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function ArrowIcon(): ReactNode {
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

function MusicIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M9 18V7L18 5V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="6.5"
        cy="18"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="15.5"
        cy="16"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ArtistIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <circle
        cx="12"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5.5 20C6.2 16.8 8.6 15 12 15C15.4 15 17.8 16.8 18.5 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TargetIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
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

function GlobeIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M3.8 12H20.2M12 3.5C14.3 5.9 15.5 8.7 15.5 12C15.5 15.3 14.3 18.1 12 20.5C9.7 18.1 8.5 15.3 8.5 12C8.5 8.7 9.7 5.9 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
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

function CheckIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="13"
      height="13"
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

function MailIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5 8L12 13L19 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="17.2"
        cy="6.8"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Opportunity Card                                                       */
/* --------------------------------------------------------------------- */

function OpportunityCard({
  icon,
  number,
  title,
  description,
}: {
  icon: ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[rgba(227,179,77,0.055)] blur-[90px]"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-5">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
            {icon}
          </span>

          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/22">
            {number}
          </span>
        </div>

        <h3 className="mt-5 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)] transition group-hover:text-[var(--mr-gold-100)]">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-white/43">
          {description}
        </p>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Review Step                                                            */
/* --------------------------------------------------------------------- */

function ReviewStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[9px] font-black text-[var(--mr-gold-200)]">
        {number}
      </span>

      <h3 className="mt-5 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-6 text-white/42">
        {description}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Requirements Card                                                      */
/* --------------------------------------------------------------------- */

function SubmissionRequirements() {
  const requirements = [
    "A working music link the team can access",
    "Your official artist or group name",
    "Release title and current release status",
    "Primary genre and creative direction",
    "Artist story and current goals",
    "Rights confirmation for submitted material",
  ];

  return (
    <Card
      padding="lg"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[rgba(227,179,77,0.065)] blur-[100px]"
      />

      <div className="relative">
        <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
          Before You Submit
        </p>

        <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
          Have These Ready
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/44">
          Complete submissions are easier for the Money Records team to
          evaluate.
        </p>

        <div className="mt-6 grid gap-3">
          {requirements.map((requirement) => (
            <div
              key={requirement}
              className="flex items-start gap-3"
            >
              <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]"
              >
                <CheckIcon />
              </span>

              <p className="m-0 text-xs leading-6 text-white/43">
                {requirement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Submission Standards                                                   */
/* --------------------------------------------------------------------- */

function SubmissionStandards() {
  return (
    <Card
      padding="lg"
      className="relative overflow-hidden"
    >
      <div className="relative">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
            <ShieldIcon />
          </span>

          <div>
            <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
              Submission Standards
            </p>

            <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
              Send Music You Control
            </h3>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-white/44">
          Only submit recordings, artwork, artist information, and related
          material you have the authority to submit for professional review.
        </p>

        <div className="mt-5 rounded-[20px] border border-[rgba(227,179,77,0.14)] bg-[rgba(211,154,46,0.035)] p-4">
          <p className="text-xs leading-6 text-white/40">
            Do not send passwords, banking information, payment-card numbers,
            Social Security numbers, private account credentials, or other
            highly sensitive information through this form.
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Direct Contact                                                         */
/* --------------------------------------------------------------------- */

function DirectContactCard() {
  return (
    <Card
      padding="lg"
      className="relative overflow-hidden"
    >
      <div className="relative">
        <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
          Need Something Else?
        </p>

        <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
          Contact Money Records
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/44">
          Use the general contact route for business questions, campaign
          inquiries, partnerships, or support that does not require a music
          submission.
        </p>

        <div className="mt-6 grid gap-3">
          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            rightIcon={<ArrowIcon />}
            fullWidth
          >
            General Contact
          </Button>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group flex min-h-12 items-center justify-between gap-4 rounded-[18px] border border-white/[0.065] bg-white/[0.022] px-4 transition hover:border-[rgba(227,179,77,0.2)]"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="text-[var(--mr-gold-200)]">
                <MailIcon />
              </span>

              <span className="truncate text-xs font-black text-white/58">
                {CONTACT_EMAIL}
              </span>
            </span>

            <span className="text-[var(--mr-gold-200)] transition group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-12 items-center justify-between gap-4 rounded-[18px] border border-white/[0.065] bg-white/[0.022] px-4 transition hover:border-[rgba(227,179,77,0.2)]"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="text-[var(--mr-gold-200)]">
                <InstagramIcon />
              </span>

              <span className="truncate text-xs font-black text-white/58">
                {INSTAGRAM_HANDLE}
              </span>
            </span>

            <span className="text-[var(--mr-gold-200)] transition group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Submit Music Page                                                      */
/* --------------------------------------------------------------------- */

export default function SubmitMusicPage() {
  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* --------------------------------------------------------------- */}
      {/* Background Atmosphere                                           */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1150px] w-[1600px] max-w-[132vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.05)] blur-[220px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.15] [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:28px_28px]"
      />

      <Container size="wide">
        <div className="py-8 md:py-12">
          {/* ----------------------------------------------------------- */}
          {/* Hero                                                        */}
          {/* ----------------------------------------------------------- */}

          <header className="relative overflow-hidden rounded-[34px] border border-[rgba(227,179,77,0.22)] bg-[linear-gradient(145deg,rgba(18,17,15,0.98),rgba(6,6,7,0.99))] p-6 shadow-[0_36px_140px_rgba(0,0,0,0.6)] sm:p-8 lg:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-48 -top-56 h-[660px] w-[660px] rounded-full bg-[rgba(227,179,77,0.16)] blur-[170px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-56 -left-44 h-[500px] w-[500px] rounded-full bg-[rgba(227,179,77,0.05)] blur-[150px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.82),transparent)]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
              {/* Left */}

              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex min-h-8 items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Money Records Artist Submissions
                  </span>

                  <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 text-[8px] font-black uppercase tracking-[0.16em] text-white/45">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]"
                    />

                    Submissions Open
                  </span>
                </div>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.92] tracking-[-0.07em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl"
                >
                  Submit Your Music.{" "}
                  <span className="mr-text-gradient">
                    Show Us the Vision.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/74 sm:text-xl"
                >
                  Send Money Records your strongest record, artist story,
                  release details, official links, current momentum, and the
                  direction you want to take your career.
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base"
                >
                  Submissions can be reviewed for label consideration, artist
                  development, release strategy, distribution, marketing,
                  press, VEVO, radio, branding, and other relevant Money
                  Records opportunities.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href="#music-submission-form"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="w-full sm:w-auto"
                  >
                    Start Your Submission
                  </Button>

                  <Button
                    href="/artists"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Explore Our Artists
                  </Button>

                  <Button
                    href="/releases"
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Explore Releases
                  </Button>
                </div>
              </div>

              {/* Right */}

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.1)] blur-[110px]"
                />

                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="grid h-13 w-13 place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]"
                    >
                      <MusicIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                        What to Submit
                      </p>

                      <h2 className="mt-1 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                        Your Strongest Record
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/45">
                    Quality matters more than quantity. Submit the music that
                    best represents your sound, identity, potential, and
                    direction.
                  </p>

                  <Divider
                    className="my-6"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    {[
                      "Working private or public music link",
                      "Artist and release information",
                      "Official social or streaming links",
                      "Your goals and creative direction",
                      "Rights and ownership confirmation",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]"
                        >
                          <CheckIcon />
                        </span>

                        <p className="m-0 text-xs leading-6 text-white/43">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[20px] border border-[rgba(227,179,77,0.16)] bg-[rgba(211,154,46,0.035)] p-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
                      Important
                    </p>

                    <p className="mt-2 text-xs leading-6 text-white/39">
                      A music submission is an opportunity for review. It is
                      not a guarantee of signing, representation,
                      distribution, marketing acceptance, or any specific
                      result.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Opportunity Overview                                        */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="submission-opportunities-heading"
            className="py-14 md:py-20"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Why Submit
                </p>

                <h2
                  id="submission-opportunities-heading"
                  className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl lg:text-5xl"
                >
                  More Than a{" "}
                  <span className="mr-text-gradient">
                    Demo Inbox.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  Your submission helps the team understand both the music and
                  the business direction behind the artist.
                </p>
              </div>

              <Button
                href="/services"
                variant="secondary"
                size="lg"
                rightIcon={<ArrowIcon />}
                className="w-full md:w-auto"
              >
                Explore Services
              </Button>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <OpportunityCard
                number="01"
                icon={<ArtistIcon />}
                title="Label Consideration"
                description="Introduce the artist, music, brand, story, and current momentum to the Money Records team."
              />

              <OpportunityCard
                number="02"
                icon={<TargetIcon />}
                title="Artist Development"
                description="Explore positioning, branding, creative direction, rollout strategy, and long-term artist growth."
              />

              <OpportunityCard
                number="03"
                icon={<GlobeIcon />}
                title="Distribution & Releases"
                description="Present upcoming or existing music for potential distribution and release-support opportunities."
              />

              <OpportunityCard
                number="04"
                icon={<MusicIcon />}
                title="Marketing & Promotion"
                description="Explore platform-specific campaigns, press, VEVO, radio, social media, and release-marketing support."
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Review Process                                               */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              variant="featured"
              padding="lg"
              topLine
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.09)] blur-[145px]"
              />

              <div className="relative">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Submission Process
                </p>

                <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                >
                  What Happens{" "}
                  <span className="mr-text-gradient">
                    After You Submit.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  The submission system gathers the information the team needs
                  to understand your music, artist identity, release, audience,
                  and current goals.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <ReviewStep
                    number="01"
                    title="Submission Received"
                    description="Your form, music link, artist information, and selected goals are received by the Money Records system."
                  />

                  <ReviewStep
                    number="02"
                    title="Music Reviewed"
                    description="The team can review your music along with the context you provide about the artist and release."
                  />

                  <ReviewStep
                    number="03"
                    title="Opportunity Evaluated"
                    description="Money Records can determine whether there is a relevant label, development, distribution, or service opportunity."
                  />

                  <ReviewStep
                    number="04"
                    title="Follow-Up if Relevant"
                    description="If there is a reason to continue the conversation, the team may contact you using your submitted information."
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Main Submission Form                                         */}
          {/* ----------------------------------------------------------- */}

          <section
            id="music-submission-form"
            aria-labelledby="music-submission-heading"
            className="scroll-mt-28 pb-14 md:pb-20"
          >
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_370px] xl:items-start">
              {/* Form */}

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-44 -top-48 h-[540px] w-[540px] rounded-full bg-[rgba(227,179,77,0.075)] blur-[150px]"
                />

                <div className="relative">
                  <div className="sr-only">
                    <h2 id="music-submission-heading">
                      Money Records Music Submission Form
                    </h2>
                  </div>

                  <MusicSubmissionForm
                    endpoint="/api/submissions"
                    submitLabel="Submit Music"
                    showHeader
                  />
                </div>
              </Card>

              {/* Sidebar */}

              <aside className="grid gap-5 xl:sticky xl:top-28">
                <SubmissionRequirements />

                <SubmissionStandards />

                <DirectContactCard />
              </aside>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Final Disclaimer                                             */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              padding="lg"
              className="relative overflow-hidden"
            >
              <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <ShieldIcon />
                  </span>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                    Submission Notice
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
                    Review Does Not Mean Acceptance.
                  </h2>
                </div>

                <div>
                  <p className="text-sm leading-7 text-white/45">
                    Sending music to Money Records does not create an artist
                    agreement, management agreement, distribution agreement,
                    marketing agreement, agency relationship, partnership, or
                    other contractual relationship.
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/45">
                    Do not rely on a submission as a guarantee of signing,
                    funding, representation, playlist placement, streaming
                    results, social growth, press coverage, VEVO acceptance,
                    radio play, distribution, or campaign performance.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Final CTA                                                    */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-16">
            <Card
              variant="featured"
              padding="lg"
              topLine
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-36 -top-40 h-[500px] w-[500px] rounded-full bg-[rgba(227,179,77,0.11)] blur-[145px]"
              />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Already Released?
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                  >
                    Your Next Move Could Be{" "}
                    <span className="mr-text-gradient">
                      the Campaign.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/47 sm:text-base">
                    If your music is already released and you are primarily
                    looking for promotion, explore the Money Records marketing
                    storefront for platform-specific campaign options.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <Button
                    href="/services"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="w-full lg:w-auto"
                  >
                    Explore Marketing
                  </Button>

                  <Button
                    href="/contact"
                    variant="secondary"
                    size="lg"
                    className="w-full lg:w-auto"
                  >
                    Contact the Team
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </Container>
    </div>
  );
}