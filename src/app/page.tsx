import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Screen Generator",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-zinc-900">
      <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
        AI Screen Generator
      </p>
      <h1 className="text-center text-3xl font-semibold tracking-tight">
        Design Tokens Ready
      </h1>
      <p className="max-w-md text-center text-zinc-600">
        Prompt → Pattern → Layout → React Screen. Token density preview is
        available.
      </p>
      <Link
        href="/preview/tokens"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
      >
        Open token preview
      </Link>
    </main>
  );
}
