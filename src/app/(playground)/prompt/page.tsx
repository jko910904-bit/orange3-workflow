"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/design-system/components";
import { CompositionRenderer, generateFromPrompt } from "@/generator";
import { getRecipe } from "@/catalog";
import type { GenerateResult } from "@/types/recipe";
import styles from "./prompt.module.css";

const SAMPLES = [
  "회원 관리 화면 만들어줘",
  "로그인 화면 만들어줘",
  "대시보드 만들어줘",
  "온보딩 절차 위자드",
];

function PromptPlaygroundInner() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") || SAMPLES[0];
  const [draft, setDraft] = useState(initial);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setDraft(q);
  }, [searchParams]);

  async function onGenerate() {
    setBusy(true);
    try {
      const next = await generateFromPrompt(draft, "mock");
      setResult(next);
    } finally {
      setBusy(false);
    }
  }

  const recipeDetails = useMemo(
    () =>
      result?.recipes
        .map((id) => getRecipe(id))
        .filter(Boolean)
        .map((r) => r!.name) ?? [],
    [result],
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Prompt Playground</p>
        <h1 className={styles.title}>AI Screen Generator (Mock)</h1>
        <p className={styles.sub}>
          Prompt → Parser → Recipe → Pattern → Components → JSON → React Preview
        </p>
      </header>

      <section className={styles.panel}>
        <label className={styles.label}>
          Prompt
          <textarea
            className={styles.textarea}
            rows={4}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="예: 회원 관리 화면 만들어줘"
          />
        </label>
        <div className={styles.row}>
          {SAMPLES.map((s) => (
            <Button
              key={s}
              size="s"
              variant={draft === s ? "primary" : "ghost"}
              onClick={() => setDraft(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <Button variant="primary" size="m" loading={busy} onClick={onGenerate}>
          Generate
        </Button>
      </section>

      {!result ? (
        <section className={styles.empty}>
          Generate를 누르면 Pattern / Components / JSON / Preview가 채워집니다.
        </section>
      ) : (
        <>
          <div className={styles.grid2}>
            <section className={styles.panel}>
              <h2 className={styles.sectionTitle}>Selected Pattern</h2>
              {result.pattern ? (
                <div className={styles.chip}>
                  <strong>{result.pattern.name}</strong>
                  <span className={styles.muted}>
                    {result.pattern.reason ?? result.pattern.id}
                  </span>
                </div>
              ) : (
                <p className={styles.muted}>No pattern matched</p>
              )}
              {recipeDetails.length > 0 ? (
                <div className={styles.block}>
                  <h3 className={styles.smallTitle}>Recipes</h3>
                  <ul className={styles.list}>
                    {recipeDetails.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>

            <section className={styles.panel}>
              <h2 className={styles.sectionTitle}>Selected Components</h2>
              <ul className={styles.list}>
                {result.components.map((c) => (
                  <li key={c} className={styles.mono}>
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className={styles.panel}>
            <h2 className={styles.sectionTitle}>Generated JSON</h2>
            <pre className={styles.code}>
              {JSON.stringify(result.json, null, 2)}
            </pre>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.sectionTitle}>React Preview</h2>
            <CompositionRenderer composition={result.composition} />
          </section>
        </>
      )}
    </main>
  );
}

export default function PromptPlaygroundPage() {
  return (
    <Suspense fallback={<p>Loading playground…</p>}>
      <PromptPlaygroundInner />
    </Suspense>
  );
}
