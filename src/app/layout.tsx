import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Design System Playground",
  description:
    "Human-inspectable Design Kit with AI Metadata and Prompt Playground",
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
        {children}
      </body>
    </html>
  );
}
