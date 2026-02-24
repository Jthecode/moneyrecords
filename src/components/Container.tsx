// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Container                                             ┃
   ┃ File   : src/components/Container.tsx                                 ┃
   ┃ Role   : Consistent max-width + horizontal padding wrapper            ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import * as React from "react";

type ContainerProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function Container<T extends React.ElementType = "div">(
  props: ContainerProps<T>
) {
  const { as, className = "", children, ...rest } = props;
  const Comp = (as ?? "div") as React.ElementType;

  return (
    <Comp
      className={[
        "mx-auto w-full max-w-[1200px] px-6 md:px-10",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </Comp>
  );
}