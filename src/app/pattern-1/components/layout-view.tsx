"use client";

import { usePathname, useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { SideNav } from "smarthr-ui";
import { UserStatus } from "./user-status";

export function LayoutView({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="grid h-full" style={{ gridTemplateColumns: "200px 1fr" }}>
      <div className="pt-10 border-r-2">
        <SideNav
          items={[
            {
              id: "timeline",
              title: "タイムライン",
              isSelected: pathname === "/pattern-1/timeline",
            },
            {
              id: "",
              title: "全てのポスト",
              isSelected: pathname === "/pattern-1",
            },
            {
              id: "likes",
              title: "いいねしたポスト",
              isSelected: pathname === "/pattern-1/likes",
            },
            {
              id: "followings",
              title: "フォロー中のユーザー",
              isSelected: pathname === "/pattern-1/followings",
            },
          ]}
          onClick={(_, id) => {
            router.push(`/pattern-1/${id}`);
          }}
        />
      </div>

      <div>
        <div className="py-10 px-2 grid gap-4">
          <UserStatus />

          {children}
        </div>
      </div>
    </div>
  );
}
