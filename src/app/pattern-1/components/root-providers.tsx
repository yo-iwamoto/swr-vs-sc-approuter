"use client";

import type { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
import { createTheme, ThemeProvider } from "smarthr-ui";

export function RootProviders({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
    </SWRConfig>
  );
}
