"use client";

import { useMemo, useState } from "react";
import { Button } from "@/design-system/components";
import {
  exportComponentCatalogJson,
  getComponent,
  matchComponentRules,
  searchComponentsByAlias,
} from "@/design-system/registry";

const PROMPT_SAMPLES = [
  "저장 버튼 추가해줘",
  "delete this permanently",
  "cancel and go back",
  "learn more documentation",
];

export default function AiMetadataPreviewPage() {
  const [prompt, setPrompt] = useState(PROMPT_SAMPLES[0]);
  const [aliasQuery, setAliasQuery] = useState("CTA");
  const button = getComponent("Button");
  const catalogJson = useMemo(() => exportComponentCatalogJson(true), []);
  const ruleHits = useMemo(() => matchComponentRules(prompt), [prompt]);
  const aliasHits = useMemo(
    () => searchComponentsByAlias(aliasQuery),
    [aliasQuery],
  );

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          AI Metadata · Component Registry
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Button metadata (reference)
        </h1>
        <p className="text-sm text-zinc-600">
          Tokens → AI Metadata → Registry → Parser → Renderer. 동일 패턴으로
          Input/Card/Table 확장 예정.
        </p>
      </header>

      {button ? (
        <section className="ds-panel ds-stack">
          <h2 className="text-lg font-semibold">{button.component}</h2>
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-zinc-500">Purpose</dt>
              <dd>{button.purpose}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Category / Priority / Confidence</dt>
              <dd>
                {button.category} · {button.priority} · {button.confidence}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-500">Variants</dt>
              <dd>{button.variants.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Sizes / States</dt>
              <dd>
                {button.sizes.join(", ")} / {button.states.join(", ")}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">Aliases</dt>
              <dd>{button.aliases.join(" · ")}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">Usage</dt>
              <dd>{button.usage.join(" · ")}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">Avoid</dt>
              <dd>{button.avoid.join(" · ")}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">Dependencies</dt>
              <dd>{button.dependencies.join(", ")}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">Accessibility</dt>
              <dd>{button.accessibility.join(" · ")}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">compatibleWith</dt>
              <dd>{button.compatibleWith.join(", ")}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-zinc-500">Figma Mapping (sample)</dt>
              <dd className="font-mono text-xs">
                {button.figmaMapping.slice(0, 4).join(" · ")} …
              </dd>
            </div>
          </dl>
        </section>
      ) : null}

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">AI Rules matcher</h2>
        <div className="ds-row flex-wrap">
          {PROMPT_SAMPLES.map((sample) => (
            <Button
              key={sample}
              size="s"
              variant={prompt === sample ? "primary" : "ghost"}
              onClick={() => setPrompt(sample)}
            >
              {sample}
            </Button>
          ))}
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm"
        />
        <ul className="space-y-2 text-sm">
          {ruleHits.length === 0 ? (
            <li className="text-zinc-500">No rule matched.</li>
          ) : (
            ruleHits.map((hit) => (
              <li
                key={hit.rule.id}
                className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2"
              >
                <span className="font-mono text-xs text-zinc-400">
                  {hit.rule.id}
                </span>
                <div>
                  → {hit.rule.then.component}.
                  {hit.rule.then.variant ?? "*"}
                </div>
                <div className="text-zinc-600">{hit.rule.reason}</div>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">Alias search (RAG-ready)</h2>
        <input
          value={aliasQuery}
          onChange={(e) => setAliasQuery(e.target.value)}
          className="rounded-md border border-zinc-200 px-3 py-2 text-sm"
          placeholder="CTA, Submit, 저장…"
        />
        <p className="text-sm text-zinc-600">
          Hits:{" "}
          {aliasHits.map((c) => c.component).join(", ") || "none"}
        </p>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-lg font-semibold">JSON Export</h2>
        <pre className="max-h-96 overflow-auto rounded-md bg-zinc-900 p-4 text-xs text-zinc-100">
          {catalogJson}
        </pre>
      </section>
    </main>
  );
}
