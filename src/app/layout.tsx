import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { LayoutView } from "./components/layout-view";
import { RootProviders } from "./components/root-providers";
import "@/styles/global.css";
import "smarthr-ui/smarthr-ui.css";

export const metadata = {
  title: "App Router Example",
} satisfies Metadata;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <RootProviders>
        <body>
          <LayoutView>{children}</LayoutView>
        </body>
      </RootProviders>
    </html>
  );
}
