"use client";

import { SideNav } from "@/components/client-ui";
import { usePathname, useRouter } from "next/navigation";

export function LayoutViewSideNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SideNav
      items={[
        {
          id: "timeline",
          title: "タイムライン",
          isSelected: pathname === "/pattern-2/timeline",
        },
        {
          id: "",
          title: "全てのポスト",
          isSelected: pathname === "/pattern-2",
        },
        {
          id: "likes",
          title: "いいねしたポスト",
          isSelected: pathname === "/pattern-2/likes",
        },
        {
          id: "followings",
          title: "フォロー中のユーザー",
          isSelected: pathname === "/pattern-2/followings",
        },
      ]}
      onClick={(_, id) => {
        router.push(`/pattern-2/${id}`);
      }}
    />
  );
}
