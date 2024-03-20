"use client";

import { ThemeProvider, createTheme } from "@/components/client-ui";
import type { PropsWithChildren } from "react";
import { StyledComponentsRegistry } from "./styled-registry";

export function RootProviders({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
