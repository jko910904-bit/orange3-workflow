"use client";

import {
  Button,
  type ButtonSize,
  type ButtonVariant,
} from "@/design-system/components";
import { DensityProvider, useDensity } from "@/design-system/DensityProvider";
import { getToken } from "@/design-system/tokens";

const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
];
const SIZES: ButtonSize[] = ["s", "m", "l"];

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ButtonMatrix() {
  const { surface, setSurface, label } = useDensity();

  return (
    <main className="ds-stack mx-auto max-w-5xl px-6 py-12">
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Components · Button
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Variant · Size · State · Icon · Width
        </h1>
        <p className="ds-muted text-sm">
          Token-only · primary {getToken("color.primary.500")?.value} · danger{" "}
          {getToken("color.semantic.danger")?.value} · {label}
        </p>
      </header>

      <div className="ds-row">
        <Button
          variant={surface === "admin" ? "primary" : "ghost"}
          size="s"
          onClick={() => setSurface("admin")}
        >
          Admin / Compact
        </Button>
        <Button
          variant={surface === "portal" ? "primary" : "ghost"}
          size="s"
          onClick={() => setSurface("portal")}
        >
          Portal / Comfortable
        </Button>
      </div>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Variant × Size (Default)</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="border-b border-zinc-200 p-2 font-medium">Size</th>
                {VARIANTS.map((v) => (
                  <th
                    key={v}
                    className="border-b border-zinc-200 p-2 font-medium capitalize"
                  >
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map((size) => (
                <tr key={size}>
                  <td className="border-b border-zinc-100 p-2 font-mono text-xs uppercase">
                    {size}
                  </td>
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
        <p className="ds-muted text-sm">
          Hover / Pressed / Focus는 CSS 상태(:hover, :active, :focus-visible)로
          확인하세요.
        </p>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">State · Disabled / Loading</h2>
        <div className="ds-row">
          {VARIANTS.map((variant) => (
            <Button key={`d-${variant}`} variant={variant} size="m" disabled>
              Disabled
            </Button>
          ))}
        </div>
        <div className="ds-row">
          {VARIANTS.map((variant) => (
            <Button key={`l-${variant}`} variant={variant} size="m" loading>
              Loading
            </Button>
          ))}
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Icon · Left / Right / Only</h2>
        <div className="ds-row">
          <Button variant="primary" size="m" icon={<PlusIcon />} iconPlacement="left">
            Left
          </Button>
          <Button
            variant="secondary"
            size="m"
            icon={<PlusIcon />}
            iconPlacement="right"
          >
            Right
          </Button>
          <Button
            variant="tertiary"
            size="m"
            icon={<PlusIcon />}
            iconPlacement="only"
            aria-label="Add"
          />
          <Button
            variant="ghost"
            size="s"
            icon={<PlusIcon />}
            iconPlacement="only"
            aria-label="Add small"
          />
          <Button
            variant="danger"
            size="l"
            icon={<PlusIcon />}
            iconPlacement="only"
            aria-label="Add large"
          />
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Width · Hug / Fill</h2>
        <div className="ds-row">
          <Button variant="primary" size="m" width="hug">
            Hug
          </Button>
        </div>
        <div style={{ maxWidth: 360 }}>
          <Button variant="primary" size="m" width="fill">
            Fill
          </Button>
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
