import type { Metadata, Viewport } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Neon Finance",
  description: "Track recurring payments, monthly income, and debt balances.",
};

export const viewport: Viewport = {
  themeColor: "#100807",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-canvas text-ink">{children}</body>
    </html>
  );
}
