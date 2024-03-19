"use client";

import type { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

export function RootProviders({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        errorRetryCount: 3,
      }}
    >
      {children}
    </SWRConfig>
  );
}
