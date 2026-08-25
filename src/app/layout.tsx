import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Simplified Startup — Everything your startup needs. One partner, every step.",
  description:
    "Everything your startup needs, from one trusted partner. Strategy, brand, product, engineering, and growth — your startup team without building one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${instrumentSans.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
