import type { PropsWithChildren } from "react";
import { RootProviders } from "./components/root-providers";
import "smarthr-ui/smarthr-ui.css";
import { AuthGuard } from "./components/auth-guard";
import { SignIn } from "./components/sign-in";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RootProviders>
      <AuthGuard WhenUnauthenticated={SignIn}>{children}</AuthGuard>
    </RootProviders>
  );
}
