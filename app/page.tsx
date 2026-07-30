import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Kit",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-zinc-900">
      <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
        Design Kit
      </p>
      <h1 className="text-center text-3xl font-semibold tracking-tight">
        MVP Step 1 — Scaffold Ready
      </h1>
      <p className="max-w-md text-center text-zinc-600">
        Next.js App Router + TypeScript + Tailwind is running. Design tokens,
        catalogs, and AI generation come in later MVP steps.
      </p>
    </main>
  );
}
