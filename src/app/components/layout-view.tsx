"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { AppNavi } from "smarthr-ui";

export function LayoutView({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <AppNavi
        label="App Router Example"
        buttons={[
          { children: "ホーム", href: "/", current: pathname === "/" },
          {
            children: "Pattern 1 (SWR)",
            href: "/pattern-1",
            current: pathname === "/pattern-1",
          },
          {
            children: "Pattern 2 (SC)",
            href: "/pattern-2",
            current: pathname === "/pattern-2",
          },
        ]}
      />
      {children}
    </>
  );
}
