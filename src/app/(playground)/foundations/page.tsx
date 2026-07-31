"use client";

import { DensityProvider, useDensity } from "@/design-system/DensityProvider";
import { Button } from "@/design-system/components";
import { getTokenCatalog } from "@/design-system/tokens";
import type { TokenCategory } from "@/design-system/tokens";
import { FOUNDATION_SECTIONS } from "@/playground/catalog";

function TokenTable({
  category,
  extraCategories = [],
}: {
  category: TokenCategory;
  extraCategories?: TokenCategory[];
}) {
  const catalog = getTokenCatalog();
  const cats = [category, ...extraCategories];
  const tokens = catalog.tokens.filter((t) => cats.includes(t.category));

  if (tokens.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        이 섹션의 토큰은 아직 등록되지 않았습니다.
      </p>
    );
  }

  return (
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
          {tokens.slice(0, 32).map((t) => (
            <tr key={t.id}>
              <td className="border-b border-zinc-100 p-2 font-mono text-xs">
                {t.id}
              </td>
              <td className="border-b border-zinc-100 p-2">
                <span className="inline-flex items-center gap-2">
                  {t.category === "color" ? (
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
      {tokens.length > 32 ? (
        <p className="mt-2 text-xs text-zinc-500">
          Showing 32 / {tokens.length} — full catalog in Playground → Registry
        </p>
      ) : null}
    </div>
  );
}

function GridStub() {
  const catalog = getTokenCatalog();
  const layoutTokens = catalog.tokens.filter((t) => t.category === "layout");

  return (
    <div className="ds-stack" style={{ gap: "1rem" }}>
      <div className="ds-stack" style={{ gap: "0.5rem" }}>
        <h3 className="text-sm font-semibold">Admin layout grid</h3>
        <p className="text-sm text-zinc-600">
          Desktop canvas <code>1440px</code> · Sidebar (LNB) fixed{" "}
          <code>240px</code> · Content <strong>fluid</strong> (fills remaining
          width) · Content area uses a <strong>12-column</strong> grid + gutters.
          Source: <code>src/playground/layout-admin.ts</code> · tokens{" "}
          <code>admin.*</code>.
        </p>
        <ul className="list-disc pl-5 text-sm text-zinc-600">
          <li>
            <code>--admin-canvas: 1440px</code> — max frame
          </li>
          <li>
            <code>--admin-sidebar: 240px</code> — fixed LNB
          </li>
          <li>
            <code>--admin-columns: 12</code> — content columns
          </li>
          <li>
            <code>--admin-content: fluid</code> —{" "}
            <code>minmax(0, 1fr)</code> /{" "}
            <code>calc(100% - 240px)</code>
          </li>
        </ul>
      </div>

      {layoutTokens.length > 0 ? (
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="border-b p-2">id</th>
              <th className="border-b p-2">value</th>
              <th className="border-b p-2">cssVar</th>
            </tr>
          </thead>
          <tbody>
            {layoutTokens.map((t) => (
              <tr key={t.id}>
                <td className="border-b border-zinc-100 p-2 font-mono text-xs">
                  {t.id}
                </td>
                <td className="border-b border-zinc-100 p-2">{t.value}</td>
                <td className="border-b border-zinc-100 p-2 font-mono text-xs text-zinc-500">
                  {t.cssVar}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <div
        style={{
          maxWidth: "var(--admin-canvas, 1440px)",
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "var(--admin-sidebar, 240px) minmax(0, 1fr)",
          border: "1px solid var(--color-grey-300)",
          borderRadius: "var(--radius-8)",
          overflow: "hidden",
          minHeight: 120,
        }}
      >
        <div
          style={{
            background: "var(--color-grey-100)",
            padding: "0.75rem",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          LNB 240
        </div>
        <div style={{ padding: "0.75rem", minWidth: 0 }}>
          <p
            className="text-xs text-zinc-500"
            style={{ margin: "0 0 0.5rem" }}
          >
            Content fluid · 12 columns
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(var(--admin-columns, 12), minmax(0, 1fr))",
              gap: "var(--spacing-8)",
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                style={{
                  height: 36,
                  borderRadius: "var(--radius-4)",
                  background: "var(--color-primary-100)",
                  border: "1px solid var(--color-primary-300)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-zinc-500">
        관리자만 Foundation Grid 규칙을 수정할 수 있습니다. AI는 새 canvas /
        sidebar / column 값을 발명하지 않습니다.
      </p>
    </div>
  );
}

function IconStyleStub() {
  return (
    <div className="ds-stack" style={{ gap: "0.5rem" }}>
      <p className="text-sm text-zinc-600">
        Icon Style은 Foundation에서만 정의합니다. AI는 새 아이콘 스타일(스트로크
        두께·코너·사이즈)을 발명하지 않습니다.
      </p>
      <ul className="list-disc pl-5 text-sm text-zinc-600">
        <li>기본 사이즈: 16 / 20 / 24 (Spacing 스케일과 정렬)</li>
        <li>스트로크: 1.5px 기준 (문서 확정 예정)</li>
        <li>정렬: 텍스트 캡 하이트와 optical center 맞춤</li>
      </ul>
      <p className="text-xs text-zinc-500">준비 중 — 토큰·에셋 카탈로그 연결 예정</p>
    </div>
  );
}

function FoundationsInner() {
  const { surface, setSurface, label } = useDensity();

  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Foundation
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Design once · AI does not invent tokens
        </h1>
        <p className="ds-muted text-sm" style={{ maxWidth: "40rem" }}>
          Color · Typography · Radius · Spacing · Shadow · Grid · Icon Style ·
          Motion — 컴포넌트와 AI는 이 토큰만 참조합니다.{" "}
          <strong>Foundation은 관리자만 수정</strong>할 수 있습니다. AI는
          Color/Typography/Radius를 발명하지 않습니다. Pattern Before Screen —
          화면은 이 Foundation 위에서만 조립됩니다. ({label})
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

      <nav className="ds-row" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
        {FOUNDATION_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-xs font-medium text-blue-700 no-underline hover:underline"
          >
            {s.title}
          </a>
        ))}
      </nav>

      {FOUNDATION_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="ds-panel ds-stack"
          style={{ scrollMarginTop: 80 }}
        >
          <div className="ds-stack" style={{ gap: "0.25rem" }}>
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="text-sm text-zinc-600">{section.blurb}</p>
          </div>
          {section.kind === "tokens" ? (
            <TokenTable
              category={section.tokenCategory}
              extraCategories={
                section.id === "shadow" ? ["elevation"] : undefined
              }
            />
          ) : null}
          {section.id === "grid" ? <GridStub /> : null}
          {section.id === "icon-style" ? <IconStyleStub /> : null}
        </section>
      ))}
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
