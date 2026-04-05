import type { Metadata } from "next";
import { Baloo_2, DM_Sans } from "next/font/google";

import "@/app/globals.css";

const headingFont = Baloo_2({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"]
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "SOMA | Sip Your Daily Ritual",
  description:
    "Cold-pressed juices, vegan smoothies, vegan ice cream, and add-ons from SOMA. Scan, browse today's menu, and order with ease."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
