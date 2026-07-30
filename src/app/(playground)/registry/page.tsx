"use client";

import { useMemo, useState } from "react";
import { Button } from "@/design-system/components";
import { exportComponentCatalogJson } from "@/design-system/registry";
import { listPatterns } from "@/generator";
import { getTokenCatalog } from "@/design-system/tokens";

type View = "components" | "patterns" | "tokens";

export default function RegistryViewerPage() {
  const [view, setView] = useState<View>("components");
  const componentJson = useMemo(() => exportComponentCatalogJson(true), []);
  const patternJson = useMemo(
    () => JSON.stringify(listPatterns(), null, 2),
    [],
  );
  const tokenJson = useMemo(
    () => JSON.stringify(getTokenCatalog(), null, 2),
    [],
  );

  const body =
    view === "components"
      ? componentJson
      : view === "patterns"
        ? patternJson
        : tokenJson;

  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Registry Viewer
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          JSON registries
        </h1>
        <p className="ds-muted text-sm">
          MCP · RAG · Agent가 ingest할 수 있는 JSON Export입니다.
        </p>
      </header>

      <div className="ds-row">
        {(
          [
            ["components", "Components"],
            ["patterns", "Patterns"],
            ["tokens", "Tokens"],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            size="s"
            variant={view === id ? "primary" : "ghost"}
            onClick={() => setView(id)}
          >
            {label}
          </Button>
        ))}
        <Button
          size="s"
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(body)}
        >
          Copy JSON
        </Button>
      </div>

      <section className="ds-panel">
        <pre className="max-h-[70vh] overflow-auto rounded-md bg-zinc-900 p-4 text-xs text-zinc-100">
          {body}
        </pre>
      </section>
    </main>
  );
}
