"use client";

import { DensityProvider, useDensity } from "@/design-system/DensityProvider";
import { Button } from "@/design-system/components";
import { getTokenCatalog, listCategories } from "@/design-system/tokens";

function FoundationsInner() {
  const { surface, setSurface, label } = useDensity();
  const catalog = getTokenCatalog();
  const categories = listCategories();

  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Foundations
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Design Tokens
        </h1>
        <p className="ds-muted text-sm">
          Color · Typography · Spacing · Radius · Elevation · Motion · Density
          — Generator는 id만 참조합니다. ({label})
        </p>
      </header>

      <div className="ds-row">
        <Button
          size="s"
          variant={surface === "admin" ? "primary" : "ghost"}
          onClick={() => setSurface("admin")}
        >
          Dense / Admin
        </Button>
        <Button
          size="s"
          variant={surface === "portal" ? "primary" : "ghost"}
          onClick={() => setSurface("portal")}
        >
          Comfortable / Portal
        </Button>
      </div>

      {categories.map((category) => {
        const tokens = catalog.tokens.filter((t) => t.category === category);
        return (
          <section key={category} className="ds-panel ds-stack">
            <h2 className="text-lg font-semibold capitalize">{category}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr>
                    <th className="border-b p-2">id</th>
                    <th className="border-b p-2">value</th>
                    <th className="border-b p-2">cssVar</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.slice(0, 24).map((t) => (
                    <tr key={t.id}>
                      <td className="border-b border-zinc-100 p-2 font-mono text-xs">
                        {t.id}
                      </td>
                      <td className="border-b border-zinc-100 p-2">
                        <span className="inline-flex items-center gap-2">
                          {category === "color" ? (
                            <span
                              className="inline-block h-4 w-4 rounded border border-zinc-200"
                              style={{ background: t.value }}
                            />
                          ) : null}
                          {t.value}
                        </span>
                      </td>
                      <td className="border-b border-zinc-100 p-2 font-mono text-xs text-zinc-500">
                        {t.cssVar}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {tokens.length > 24 ? (
              <p className="text-xs text-zinc-500">
                Showing 24 / {tokens.length} — full catalog in Registry Viewer
              </p>
            ) : null}
          </section>
        );
      })}
    </main>
  );
}

export default function FoundationsPage() {
  return (
    <DensityProvider defaultSurface="admin">
      <FoundationsInner />
    </DensityProvider>
  );
}
