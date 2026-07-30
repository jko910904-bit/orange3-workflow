const TEMPLATES = [
  {
    id: "Dashboard",
    name: "Dashboard",
    description: "KPI + widgets + notice panels (Portal / Admin density).",
    status: "pattern-backed",
  },
  {
    id: "List",
    name: "List / SearchFilterTable",
    description: "Filter + Table + Pagination for management screens.",
    status: "pattern-backed",
  },
  {
    id: "Detail",
    name: "Detail",
    description: "Overview + info table + sticky CTA sidebar.",
    status: "pattern-backed",
  },
  {
    id: "Form",
    name: "Form",
    description: "Multi-section labeled form with submit actions.",
    status: "pattern-backed",
  },
  {
    id: "Chart",
    name: "Chart",
    description: "Chart + KPI template — full layout pending Template stage.",
    status: "planned",
  },
];

export default function TemplatesPage() {
  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Templates
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Screen templates
        </h1>
        <p className="ds-muted text-sm">
          Templates는 Pattern을 조립한 화면 골격입니다. 현재 MVP는 Pattern
          레벨까지 렌더되며, Template 레이어는 다음 단계에서 확장합니다.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {TEMPLATES.map((t) => (
          <article key={t.id} className="ds-panel ds-stack">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">{t.name}</h2>
              <span className="text-xs uppercase text-zinc-400">
                {t.status}
              </span>
            </div>
            <p className="text-sm text-zinc-600">{t.description}</p>
            <p className="font-mono text-xs text-zinc-400">id: {t.id}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
