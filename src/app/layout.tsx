import type { Metadata } from "next";
import "./globals.css";
import { FloatingDock } from "@/components/layout/FloatingDock";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CommandPalette } from "@/components/layout/CommandPalette";

export const metadata: Metadata = {
  title: "Blueprint AI Builder",
  description: "A deterministic blueprint-first AI website and app builder foundation."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <CommandPalette />
        <FloatingDock />
      </body>
    </html>
  );
}
