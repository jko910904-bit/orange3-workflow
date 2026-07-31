import Link from "next/link";
import { COMPONENT_DOCS, statusLabel } from "@/playground/catalog";

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
        <p className="ds-muted text-sm" style={{ maxWidth: "40rem" }}>
          키트에 정의된 컴포넌트만 사용합니다.{" "}
          <strong>AI는 새 컴포넌트를 만들지 않습니다</strong> — Compose ≠
          Generate. Pattern Before Screen; 미구현 항목은 목록에 포함되며 상세는
          준비 중입니다.
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
                {statusLabel(c.status)}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-600">{c.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
