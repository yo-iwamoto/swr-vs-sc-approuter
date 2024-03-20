import type { PropsWithChildren } from "react";
import { AuthGuard } from "./components/auth-guard";
import { LayoutView } from "./components/layout-view";
import { RootProviders } from "./components/root-providers";
import { SignIn } from "./components/sign-in";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RootProviders>
      <AuthGuard WhenUnauthenticated={SignIn}>
        <LayoutView>{children}</LayoutView>
      </AuthGuard>
    </RootProviders>
  );
}
