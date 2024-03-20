"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { AppNavi } from "smarthr-ui";
import { NotificationBarArea } from "./notification-bar-area";

export function LayoutView({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen">
      <header className="px-4 py-3">
        <p className="font-bold">App Router Example</p>
      </header>

      <AppNavi
        className="border-t-2"
        buttons={[
          { children: "ホーム", href: "/", current: pathname === "/" },
          {
            children: "SWR",
            href: "/pattern-1/timeline",
            current: pathname.startsWith("/pattern-1"),
          },
          {
            children: "Server Components",
            href: "/pattern-2",
            current: pathname.startsWith("/pattern-2"),
          },
        ]}
      />
      <div className="bg-[#f8f7f6] grow">
        <NotificationBarArea>{children}</NotificationBarArea>
      </div>
    </div>
  );
}
