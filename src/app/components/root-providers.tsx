"use client";

import type { PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "smarthr-ui";
import { StyledComponentsRegistry } from "./styled-registry";

export function RootProviders({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
