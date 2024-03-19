"use client";

import type { PropsWithChildren } from "react";
import { Loader } from "smarthr-ui";
import { useMeQuery } from "../queries/me";

type Props = PropsWithChildren<{
  WhenUnauthenticated: () => JSX.Element;
}>;

export function AuthGuard({ children, WhenUnauthenticated }: Props) {
  const query = useMeQuery();

  if (query.error !== undefined) return <WhenUnauthenticated />;

  if (query.data === undefined) {
    return (
      <div className="h-80 grid place-items-center">
        <Loader />
      </div>
    );
  }

  return children;
}
