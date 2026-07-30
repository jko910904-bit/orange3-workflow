import Link from "next/link";
import { COMPONENT_DOCS } from "@/playground/catalog";

export default function ComponentsIndexPage() {
  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Component library
        </h1>
        <p className="ds-muted text-sm">
          각 컴포넌트에서 Variant · Size · State · Code · AI Metadata를
          확인하세요.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {COMPONENT_DOCS.map((c) => (
          <Link
            key={c.slug}
            href={`/components/${c.slug}`}
            className="ds-panel block no-underline hover:border-blue-400"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-zinc-900">{c.name}</h2>
              <span className="text-xs uppercase tracking-wide text-zinc-400">
                {c.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-600">{c.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
