import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdProvider } from "@/design-system/antd";
import { TokenStyles } from "@/design-system/TokenStyles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JKO Design System",
  description:
    "JKO v2.0 Design System Platform — Compose ≠ Generate. Foundation → Components → UX Patterns → Screens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TokenStyles />
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
