"use client";

import { DensityProvider, useDensity } from "@/design-system/DensityProvider";
import { densityTokens } from "@/design-system/tokens";

function TokenPreview() {
  const { surface, density, setSurface } = useDensity();
  const meta = densityTokens[density];

  return (
    <div className="ds-stack mx-auto max-w-2xl px-6 py-12">
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Design Tokens Preview
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin vs Portal Density
        </h1>
        <p className="ds-muted">
          Same components — density only. Current: {meta.label} (base{" "}
          {meta.fontSizeBase}).
        </p>
      </header>

      <div className="ds-row">
        <button
          type="button"
          className={`ds-control ${surface === "admin" ? "ds-control-primary" : ""}`}
          onClick={() => setSurface("admin")}
        >
          Admin (dense)
        </button>
        <button
          type="button"
          className={`ds-control ${surface === "portal" ? "ds-control-primary" : ""}`}
          onClick={() => setSurface("portal")}
        >
          Portal (comfortable)
        </button>
      </div>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Sample panel</h2>
        <p>
          Typography and spacing follow CSS variables driven by{" "}
          <code>data-density=&quot;{density}&quot;</code>.
        </p>
        <div className="ds-row">
          <button type="button" className="ds-control ds-control-primary">
            Primary action
          </button>
          <button type="button" className="ds-control">
            Secondary
          </button>
        </div>
        <dl
          className="ds-muted grid gap-2 text-sm"
          style={{
            gridTemplateColumns: "auto 1fr",
            columnGap: "1rem",
          }}
        >
          <dt>font-size-base</dt>
          <dd>{meta.fontSizeBase}</dd>
          <dt>control-height</dt>
          <dd>{meta.controlHeight}</dd>
          <dt>section-gap</dt>
          <dd>{meta.sectionGap}</dd>
          <dt>space-unit</dt>
          <dd>{meta.spaceUnit}</dd>
        </dl>
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
