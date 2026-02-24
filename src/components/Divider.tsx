// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Divider                                               ┃
   ┃ File   : src/components/Divider.tsx                                   ┃
   ┃ Role   : Gold hairline divider (section separators)                   ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import * as React from "react";

type DividerProps = {
  className?: string;
  label?: string;
};

export default function Divider({ className = "", label }: DividerProps) {
  return (
    <div className={["relative", className].join(" ")}>
      <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(214,179,90,0.55),transparent)]" />
      {label ? (
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <span className="rounded-full border border-[rgba(214,179,90,0.22)] bg-[rgba(10,10,10,0.80)] px-3 py-1 text-[11px] font-extrabold tracking-[0.28em] uppercase text-[rgba(246,226,169,0.92)]">
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}