"use client";

import { useMemo, useState } from "react";
import { Button } from "@/design-system/components";
import {
  exportComponentCatalogJson,
  listComponents,
  matchComponentRules,
  searchComponentsByAlias,
} from "@/design-system/registry";

const SAMPLES = [
  "저장 버튼 추가해줘",
  "delete permanently",
  "cancel and go back",
  "learn more documentation",
];

export default function AiMetadataPage() {
  const components = listComponents();
  const [selected, setSelected] = useState(components[0]?.component ?? "Button");
  const [prompt, setPrompt] = useState(SAMPLES[0]);
  const [alias, setAlias] = useState("CTA");
  const meta = components.find((c) => c.component === selected);
  const hits = useMemo(() => matchComponentRules(prompt), [prompt]);
  const aliasHits = useMemo(() => searchComponentsByAlias(alias), [alias]);
  const catalog = useMemo(() => exportComponentCatalogJson(true), []);

  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          AI Metadata
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Metadata for learning & selection
        </h1>
        <p className="ds-muted text-sm">
          Purpose · Usage · Avoid · Aliases · AI Rules · Figma Mapping —
          LLM/MCP/RAG가 검색할 수 있는 계약입니다.
        </p>
      </header>

      <div className="ds-row flex-wrap">
        {components.map((c) => (
          <Button
            key={c.component}
            size="s"
            variant={selected === c.component ? "primary" : "ghost"}
            onClick={() => setSelected(c.component)}
          >
            {c.component}
          </Button>
        ))}
      </div>

      {meta ? (
        <section className="ds-panel ds-stack">
          <h2 className="text-lg font-semibold">{meta.component}</h2>
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-zinc-500">Purpose</dt>
              <dd>{meta.purpose}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">confidence / priority</dt>
              <dd>
                {meta.confidence} / {meta.priority}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">Aliases</dt>
              <dd>{meta.aliases.join(" · ")}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">Usage</dt>
              <dd>{meta.usage.join(" · ")}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">Avoid</dt>
              <dd>{meta.avoid.join(" · ")}</dd>
            </div>
          </dl>
        </section>
      ) : null}

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Rule matcher</h2>
        <div className="ds-row flex-wrap">
          {SAMPLES.map((s) => (
            <Button
              key={s}
              size="s"
              variant={prompt === s ? "primary" : "ghost"}
              onClick={() => setPrompt(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <textarea
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm"
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <ul className="space-y-2 text-sm">
          {hits.map((h) => (
            <li
              key={h.rule.id}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2"
            >
              <span className="font-mono text-xs text-zinc-400">
                {h.rule.id}
              </span>
              <div>
                → {h.rule.then.component}.{h.rule.then.variant ?? "*"}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Alias search</h2>
        <input
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <p className="text-sm text-zinc-600">
          Hits: {aliasHits.map((c) => c.component).join(", ") || "none"}
        </p>
        <pre className="max-h-64 overflow-auto rounded-md bg-zinc-900 p-4 text-xs text-zinc-100">
          {catalog}
        </pre>
      </section>
    </main>
  );
}
