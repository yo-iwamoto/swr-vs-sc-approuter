import type { PropsWithChildren } from "react";
import { LayoutViewSideNav } from "./layout-view-nav";
import { UserStatus } from "./user-status";

export function LayoutView({ children }: PropsWithChildren) {
  return (
    <div className="grid h-full" style={{ gridTemplateColumns: "200px 1fr" }}>
      <div className="pt-10 border-r-2">
        <LayoutViewSideNav />
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
