"use client";

import type { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export function RootProviders({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
