"use client";

import { useState } from "react";
import { Button } from "@/design-system/components";
import { listPatterns } from "@/generator";
import { ScreenRenderer } from "@/generator/renderer/ScreenRenderer";
import type { PatternId } from "@/types";

export default function PatternsPage() {
  const patterns = listPatterns();
  const [selected, setSelected] = useState<PatternId>(patterns[0]?.id);

  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Patterns
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Pattern gallery
        </h1>
        <p className="ds-muted text-sm">
          Component 조합으로 구성된 업무 블록입니다. Generator Registry와
          동일한 id를 사용합니다.
        </p>
      </header>

      <div className="ds-row flex-wrap">
        {patterns.map((p) => (
          <Button
            key={p.id}
            size="s"
            variant={selected === p.id ? "primary" : "ghost"}
            onClick={() => setSelected(p.id)}
          >
            {p.name}
          </Button>
        ))}
      </div>

      <section className="ds-panel ds-stack">
        <p className="font-mono text-xs text-zinc-400">{selected}</p>
        <p className="text-sm text-zinc-600">
          {patterns.find((p) => p.id === selected)?.description}
        </p>
      </section>

      <ScreenRenderer patterns={[{ id: selected }]} surface="admin" />
    </main>
  );
}
