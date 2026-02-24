// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Section Heading                                       ┃
   ┃ File   : src/components/SectionHeading.tsx                            ┃
   ┃ Role   : Consistent section titles + eyebrow + optional right action  ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import * as React from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  right,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      id={id}
      className={[
        "flex flex-col gap-5",
        right ? "md:flex-row md:items-end md:justify-between" : "",
        isCenter ? "items-center text-center" : "",
        className,
      ].join(" ")}
    >
      <div className={isCenter ? "max-w-3xl" : ""}>
        {eyebrow ? <div className="mr-eyebrow">{eyebrow}</div> : null}

        <h2
          className={[
            "mt-3 font-extrabold tracking-[-0.02em] text-[28px] leading-[1.1] md:text-[38px]",
            isCenter ? "text-center" : "",
          ].join(" ")}
        >
          {title}
        </h2>

        {subtitle ? (
          <p
            className={[
              "mt-3 text-sm leading-7 text-[rgba(244,241,234,0.74)] md:text-base",
              isCenter ? "mx-auto" : "",
            ].join(" ")}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {right ? (
        <div className={isCenter ? "mt-2" : ""}>
          <div className="flex items-center gap-3">{right}</div>
        </div>
      ) : null}
    </div>
  );
}