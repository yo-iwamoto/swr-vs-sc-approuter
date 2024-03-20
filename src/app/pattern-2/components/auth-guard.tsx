import type { PropsWithChildren } from "react";
import { getIsSignedIn } from "../server/auth";

type Props = PropsWithChildren<{
  WhenUnauthenticated: () => JSX.Element;
}>;

export async function AuthGuard({ WhenUnauthenticated, children }: Props) {
  const isSignedIn = await getIsSignedIn();

  if (!isSignedIn) return <WhenUnauthenticated />;

  return <>{children}</>;
}
