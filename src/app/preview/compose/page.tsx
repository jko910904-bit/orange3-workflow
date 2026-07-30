"use client";

import { useMemo, useState } from "react";
import { Button } from "@/design-system/components";
import {
  CompositionRenderer,
  parsePromptToComposition,
} from "@/generator";

const SAMPLES = [
  "로그인 화면 만들어줘",
  "login page please",
  "대시보드 만들어줘",
];

export default function ComposePreviewPage() {
  const [prompt, setPrompt] = useState(SAMPLES[0]);
  const composition = useMemo(
    () => parsePromptToComposition(prompt),
    [prompt],
  );

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          Prompt → Composition → React UI
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Auto UI from natural language
        </h1>
        <p className="text-sm text-zinc-600">
          Parser가 Component Registry 메타를 기준으로 recipe를 만들고,
          Renderer가 Design System 컴포넌트로 화면을 조립합니다.
        </p>
      </header>

      <label className="flex flex-col gap-2 text-sm text-zinc-700">
        Prompt
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-blue-500"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((sample) => (
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

      <section className="ds-panel ds-stack">
        <h2 className="text-sm font-medium text-zinc-500">Recipe</h2>
        <ol className="list-decimal space-y-1 pl-5 font-mono text-sm text-blue-600">
          {composition.nodes.map((node, index) => (
            <li key={node.id}>
              {index + 1}. {node.component}.{node.variant ?? "Default"}
            </li>
          ))}
        </ol>
        <pre className="overflow-auto rounded-md bg-zinc-900 p-3 text-xs text-zinc-100">
          {JSON.stringify(
            {
              intent: composition.intent,
              surface: composition.surface,
              recipe: composition.recipe,
              nodes: composition.nodes.map((n) => ({
                id: n.id,
                component: n.component,
                variant: n.variant,
              })),
            },
            null,
            2,
          )}
        </pre>
      </section>

      <section className="ds-panel">
        <CompositionRenderer composition={composition} />
      </section>
    </main>
  );
}
