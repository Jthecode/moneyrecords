// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Card                                                  ┃
   ┃ File   : src/components/Card.tsx                                      ┃
   ┃ Role   : Elite glass/gold surface wrapper (matches mockup)            ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import * as React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export default function Card({ children, className = "", as = "div" }: CardProps) {
  const Tag = as;

  return (
    <Tag
      className={[
        "mr-card",
        // subtle inner border like the mockup
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:rounded-[16px]",
        "before:border before:border-[rgba(255,255,255,0.06)]",
        "before:pointer-events-none",
        // soft gold sheen sweep (very subtle)
        "after:absolute after:inset-0 after:pointer-events-none",
        "after:bg-[radial-gradient(700px_240px_at_20%_0%,rgba(214,179,90,0.14),transparent_60%)]",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}