"use client";

import { DensityProvider, useDensity } from "@/design-system/DensityProvider";
import {
  getToken,
  getTokenCatalog,
  getTokensByCategory,
  listCategories,
} from "@/design-system/tokens";

function TokenPreview() {
  const { surface, density, kitName, label, setSurface } = useDensity();
  const catalog = getTokenCatalog();
  const primary = getToken("color.primary.500");
  const colors = getTokensByCategory("color").filter((t) =>
    t.id.startsWith("color.primary") ||
    t.id.startsWith("color.semantic") ||
    t.id === "color.grey.900" ||
    t.id === "color.grey.400" ||
    t.id === "color.grey.100",
  );

  return (
    <div className="ds-stack mx-auto max-w-3xl px-6 py-12">
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Token Registry Preview
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Kit tokens + Generator catalog
        </h1>
        <p className="ds-muted">
          {label} · kitName={kitName} · density={density} · catalog{" "}
          {catalog.tokens.length} tokens / {listCategories().length} categories
        </p>
      </header>

      <div className="ds-row">
        <button
          type="button"
          className={`ds-control ${surface === "admin" ? "ds-control-primary" : ""}`}
          onClick={() => setSurface("admin")}
        >
          Admin / Compact
        </button>
        <button
          type="button"
          className={`ds-control ${surface === "portal" ? "ds-control-primary" : ""}`}
          onClick={() => setSurface("portal")}
        >
          Portal / Comfortable
        </button>
      </div>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Primary & semantic (registry)</h2>
        <div className="ds-row">
          {colors.map((token) => (
            <div key={token.id} className="flex flex-col items-center gap-1">
              <div
                className="ds-swatch"
                style={{ background: `var(${token.cssVar})` }}
                title={token.id}
              />
              <span className="font-mono text-[10px] text-zinc-500">
                {token.id.replace("color.", "")}
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm">
          Lookup:{" "}
          <code className="rounded bg-zinc-100 px-1">
            getToken(&quot;color.primary.500&quot;)
          </code>{" "}
          → {primary?.value}
        </p>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Density-driven sample</h2>
        <p style={{ fontSize: "var(--font-size-base)" }}>
          Body text uses --font-size-base (
          {surface === "admin" ? "14px Compact" : "16px Comfortable"}).
        </p>
        <div className="ds-row">
          <button type="button" className="ds-control ds-control-primary">
            Primary ({primary?.value})
          </button>
          <button type="button" className="ds-control">
            Secondary
          </button>
        </div>
        <dl
          className="ds-muted grid gap-2 text-sm"
          style={{ gridTemplateColumns: "auto 1fr", columnGap: "1rem" }}
        >
          <dt>table-row-height</dt>
          <dd style={{ fontFamily: "var(--typography-fontFamily-mono)" }}>
            var(--table-row-height)
          </dd>
          <dt>radius.4</dt>
          <dd>{getToken("radius.4")?.value}</dd>
          <dt>spacing.md</dt>
          <dd>{getToken("spacing.md")?.value}</dd>
          <dt>shadow.1</dt>
          <dd className="truncate">{getToken("shadow.1")?.value}</dd>
        </dl>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Catalog digest (AI-ready)</h2>
        <pre className="max-h-64 overflow-auto rounded bg-zinc-900 p-3 text-xs text-zinc-100">
          {JSON.stringify(
            {
              version: catalog.version,
              categories: catalog.categories,
              sample: catalog.tokens.slice(0, 6),
              total: catalog.tokens.length,
            },
            null,
            2,
          )}
        </pre>
      </section>
    </div>
  );
}

export default function TokensPreviewPage() {
  return (
    <DensityProvider defaultSurface="admin">
      <TokenPreview />
    </DensityProvider>
  );
}
