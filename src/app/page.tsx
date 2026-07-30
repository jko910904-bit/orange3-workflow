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
        Components Ready
      </h1>
      <p className="max-w-md text-center text-zinc-600">
        Button · Input · Card · Table · Patterns — Prompt → Screen MVP.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/preview/tokens"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Tokens
        </Link>
        <Link
          href="/preview/components/button"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Button
        </Link>
        <Link
          href="/preview/components/input"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Input
        </Link>
        <Link
          href="/preview/components/card"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Card
        </Link>
        <Link
          href="/preview/components/table"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Table
        </Link>
        <Link
          href="/preview/generator"
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900"
        >
          Generator
        </Link>
        <Link
          href="/preview/ai-metadata"
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900"
        >
          AI Metadata
        </Link>
      </div>
    </main>
  );
}
