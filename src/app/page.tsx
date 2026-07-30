import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Kit",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-zinc-900">
      <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
        AI Screen Generator
      </p>
      <h1 className="text-center text-3xl font-semibold tracking-tight">
        Restructure Ready
      </h1>
      <p className="max-w-md text-center text-zinc-600">
        Prompt → Pattern → Layout → React Screen. Source lives under{" "}
        <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm">src/</code>.
      </p>
    </main>
  );
}
