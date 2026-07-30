"use client";

import { Button } from "@/design-system/components";
import {
  Input,
  type InputKind,
  type InputSize,
} from "@/design-system/components";
import { DensityProvider, useDensity } from "@/design-system/DensityProvider";

const KINDS: InputKind[] = ["text", "password", "search", "number"];
const SIZES: InputSize[] = ["s", "m", "l"];

function InputMatrix() {
  const { surface, setSurface, label } = useDensity();

  return (
    <main className="ds-stack mx-auto max-w-5xl px-6 py-12">
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Components · Input
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Kind · State · Size
        </h1>
        <p className="ds-muted text-sm">
          Text / Password / Search / Number · Default / Focus / Error / Disabled
          · S / M / L · {label}
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
        <h2 className="text-lg font-semibold">Kind × Size (Default)</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {KINDS.map((kind) => (
            <div key={kind} className="ds-stack">
              <p className="text-sm font-medium capitalize">{kind}</p>
              {SIZES.map((size) => (
                <Input
                  key={`${kind}-${size}`}
                  kind={kind}
                  size={size}
                  label={`${kind.toUpperCase()} · ${size.toUpperCase()}`}
                  placeholder={
                    kind === "search" ? "Search…" : `Enter ${kind}`
                  }
                  defaultValue={kind === "number" ? "100" : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">State</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            kind="text"
            size="m"
            label="Default"
            placeholder="Click to focus"
            helperText="Helper / info text"
          />
          <Input
            kind="text"
            size="m"
            label="Error"
            state="error"
            defaultValue="Invalid value"
            helperText="Error message"
          />
          <Input
            kind="text"
            size="m"
            label="Disabled"
            disabled
            defaultValue="Read only value"
            helperText="Disabled field"
          />
          <Input
            kind="search"
            size="m"
            label="Search · Focus"
            placeholder="Focus this field"
            helperText="Focus ring uses primary token"
          />
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Input + Button (gap 4)</h2>
        <div
          className="ds-row"
          style={{ gap: "var(--spacing-4)", alignItems: "flex-end" }}
        >
          <div style={{ flex: 1 }}>
            <Input kind="search" size="s" label="Search" placeholder="Keyword" />
          </div>
          <Button variant="primary" size="s">
            조회
          </Button>
        </div>
      </section>
    </main>
  );
}

export default function InputPreviewPage() {
  return (
    <DensityProvider defaultSurface="admin">
      <InputMatrix />
    </DensityProvider>
  );
}
