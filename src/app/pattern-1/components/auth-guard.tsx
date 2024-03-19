"use client";

import type { PropsWithChildren } from "react";
import { Loader } from "smarthr-ui";
import { useMeQuery } from "@/app/pattern-1/queries/use-me-query";

type Props = PropsWithChildren<{
  WhenUnauthenticated: () => JSX.Element;
}>;

export function AuthGuard({ children, WhenUnauthenticated }: Props) {
  const meQuery = useMeQuery();

  if (meQuery.error !== undefined) return <WhenUnauthenticated />;

  if (meQuery.data === undefined) {
    return (
      <div className="h-80 grid place-items-center">
        <Loader />
      </div>
    );
  }

  return children;
}
