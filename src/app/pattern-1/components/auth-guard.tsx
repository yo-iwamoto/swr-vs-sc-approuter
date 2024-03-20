"use client";

import { LoadingUi } from "@/app/components/loading-ui";
import { useMeQuery } from "@/app/pattern-1/queries/use-me-query";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  WhenUnauthenticated: () => JSX.Element;
}>;

export function AuthGuard({ children, WhenUnauthenticated }: Props) {
  const meQuery = useMeQuery();

  if (meQuery.error !== undefined) return <WhenUnauthenticated />;

  if (meQuery.data === undefined) {
    return <LoadingUi />;
  }

  return children;
}
