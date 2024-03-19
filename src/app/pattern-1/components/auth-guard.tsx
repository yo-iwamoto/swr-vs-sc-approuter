"use client";

import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import type { PropsWithChildren } from "react";
import useSWR from "swr";

type Props = PropsWithChildren<{
  WhenUnauthenticated: () => JSX.Element;
}>;

export function AuthGuard({ children, WhenUnauthenticated }: Props) {
  console.log("=");
  const query = useSWR("me", () => api.auth.me.$get().then(resolveResponse));

  console.log(query.error);
  if (query.error !== undefined) {
    console.log("=====");
    return <WhenUnauthenticated />;
  }

  if (query.data === undefined) {
    return <p>Loading...</p>;
  }

  return children;
}
