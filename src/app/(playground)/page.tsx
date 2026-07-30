import Link from "next/link";
import { COMPONENT_DOCS, PLAYGROUND_NAV } from "@/playground/catalog";

export default function PlaygroundHomePage() {
  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Home
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Design System Playground
        </h1>
        <p className="ds-muted max-w-2xl text-sm">
          사람이 컴포넌트를 확인하고, AI가 Metadata·Registry를 학습할 수 있는
          데모 사이트입니다. Prompt → Component Recipe → React UI 흐름을
          그대로 검증합니다.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {PLAYGROUND_NAV.filter((n) => n.href !== "/").map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="ds-panel block no-underline transition hover:border-blue-400"
          >
            <h2 className="text-base font-semibold text-zinc-900">
              {item.label}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">{item.description}</p>
          </Link>
        ))}
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Ready components</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {COMPONENT_DOCS.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/components/${c.slug}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                {c.name}
              </Link>
              <span className="ml-2 text-xs uppercase text-zinc-400">
                {c.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
