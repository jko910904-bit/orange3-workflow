"use client";

import { useMemo, useState } from "react";
import { Button } from "@/design-system/components";
import {
  CompositionRenderer,
  parsePrompt,
  parsePromptToComposition,
} from "@/generator";
import { matchComponentRules } from "@/design-system/registry";

const SAMPLES = [
  "로그인 화면 만들어줘",
  "회원관리 검색 테이블",
  "대시보드 만들어줘",
  "저장 버튼과 삭제 버튼",
];

export default function PromptPlaygroundPage() {
  const [prompt, setPrompt] = useState(SAMPLES[0]);
  const composition = useMemo(
    () => parsePromptToComposition(prompt),
    [prompt],
  );
  const patterns = useMemo(() => parsePrompt(prompt), [prompt]);
  const componentHits = useMemo(
    () => matchComponentRules(prompt),
    [prompt],
  );

  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Prompt Playground
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Simulate component selection
        </h1>
        <p className="ds-muted text-sm">
          자연어 Prompt → Pattern 매칭 + Component recipe + React 미리보기
        </p>
      </header>

      <label className="ds-stack text-sm">
        Prompt
        <textarea
          rows={3}
          className="rounded-md border border-zinc-200 px-3 py-2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>

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

      <section className="grid gap-3 lg:grid-cols-2">
        <div className="ds-panel ds-stack">
          <h2 className="text-sm font-semibold text-zinc-500">
            Pattern selection
          </h2>
          <ul className="space-y-1 font-mono text-sm">
            {patterns.patterns.map((p) => (
              <li key={p.id}>{p.id}</li>
            ))}
          </ul>
        </div>
        <div className="ds-panel ds-stack">
          <h2 className="text-sm font-semibold text-zinc-500">
            Component rules
          </h2>
          <ul className="space-y-1 text-sm">
            {componentHits.length === 0 ? (
              <li className="text-zinc-500">No rule hit</li>
            ) : (
              componentHits.map((h) => (
                <li key={h.rule.id}>
                  {h.rule.then.component}.{h.rule.then.variant ?? "Default"}
                </li>
              ))
            )}
          </ul>
        </div>
      </section>

      <section className="ds-panel ds-stack">
        <h2 className="text-sm font-semibold text-zinc-500">
          Composition recipe
        </h2>
        <ol className="list-decimal space-y-1 pl-5 font-mono text-sm text-blue-600">
          {composition.nodes.map((n) => (
            <li key={n.id}>
              {n.component}.{n.variant ?? "Default"}
            </li>
          ))}
        </ol>
      </section>

      <section className="ds-panel">
        <CompositionRenderer composition={composition} />
      </section>
    </main>
  );
}
