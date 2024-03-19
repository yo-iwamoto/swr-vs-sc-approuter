import type { PropsWithChildren } from "react";
import { RootProviders } from "./components/root-providers";
import { AuthGuard } from "./components/auth-guard";
import { SignIn } from "./components/sign-in";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RootProviders>
      <AuthGuard WhenUnauthenticated={SignIn}>{children}</AuthGuard>
    </RootProviders>
  );
}
