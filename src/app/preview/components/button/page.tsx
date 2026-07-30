"use client";

import { Button, type ButtonSize, type ButtonVariant } from "@/design-system/components";
import { DensityProvider, useDensity } from "@/design-system/DensityProvider";
import { getToken } from "@/design-system/tokens";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "tertiary", "ghost"];
const SIZES: ButtonSize[] = ["xsmall", "small", "medium", "large"];

function ButtonMatrix() {
  const { surface, setSurface, label } = useDensity();

  return (
    <main className="ds-stack mx-auto max-w-4xl px-6 py-12">
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Components · Button
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          COMPONENTS_01 matrix
        </h1>
        <p className="ds-muted text-sm">
          Token-only styles · radius.4 · primary{" "}
          {getToken("color.primary.500")?.value} · {label}
        </p>
      </header>

      <div className="ds-row">
        <Button
          variant={surface === "admin" ? "primary" : "ghost"}
          size="small"
          onClick={() => setSurface("admin")}
        >
          Admin / Compact
        </Button>
        <Button
          variant={surface === "portal" ? "primary" : "ghost"}
          size="small"
          onClick={() => setSurface("portal")}
        >
          Portal / Comfortable
        </Button>
      </div>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Default × size × type</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="border-b border-zinc-200 p-2 font-medium">Size</th>
                {VARIANTS.map((v) => (
                  <th key={v} className="border-b border-zinc-200 p-2 font-medium capitalize">
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map((size) => (
                <tr key={size}>
                  <td className="border-b border-zinc-100 p-2 font-mono text-xs">{size}</td>
                  {VARIANTS.map((variant) => (
                    <td key={variant} className="border-b border-zinc-100 p-2">
                      <Button variant={variant} size={size}>
                        Button
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <div className="ds-row">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} size="medium" disabled>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Hover (CSS :hover + motion.duration.fast)</h2>
        <p className="ds-muted text-sm">
          Hover each control — colors resolve from token CSS vars only.
        </p>
        <div className="ds-row" style={{ gap: "var(--spacing-8)" }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} size="large">
              Hover me
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ButtonPreviewPage() {
  return (
    <DensityProvider defaultSurface="admin">
      <ButtonMatrix />
    </DensityProvider>
  );
}
