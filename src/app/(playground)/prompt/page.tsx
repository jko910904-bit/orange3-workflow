"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/design-system/components";
import { CompositionRenderer, generateFromPrompt } from "@/generator";
import { getRecipe } from "@/catalog";
import type { GenerateResult } from "@/types/recipe";
import styles from "./prompt.module.css";

const SAMPLES = [
  "로그인 화면 만들어줘",
  "회원 관리 화면 만들어줘",
  "대시보드 만들어줘",
  "상품 목록 페이지 만들어줘",
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

  async function onCompose() {
    setBusy(true);
    try {
      const next = await generateFromPrompt(draft.trim(), "mock");
      setResult(next);
    } finally {
      setBusy(false);
    }
  }

  const recipeNames = useMemo(
    () =>
      result?.recipes
        .map((id) => getRecipe(id)?.name ?? id)
        .filter(Boolean) ?? [],
    [result],
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Playground · Prompt Lab</p>
        <h1 className={styles.title}>Prompt → Registry Inspector</h1>
        <p className={styles.sub}>
          실험용 프롬프트 랩입니다. Design Kit을 변경하지 않으며, 제품 CTA가
          아닙니다. 정적 화면은{" "}
          <Link href="/screens">Screens</Link>를 확인하세요.
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
            placeholder="로그인 화면 만들어줘"
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
        <Button variant="primary" size="m" loading={busy} onClick={onCompose}>
          Compose
        </Button>
      </section>

      {!result ? (
        <section className={styles.empty}>
          Compose를 누르면 Pattern / Recipe / Components / JSON / Preview가
          표시됩니다. (실험용 — Kit을 변경하지 않습니다)
        </section>
      ) : (
        <>
          <div className={styles.grid2}>
            <section className={styles.panel}>
              <h2 className={styles.sectionTitle}>Selected Pattern</h2>
              {result.pattern ? (
                <div className={styles.chip}>
                  <strong>{result.pattern.name}</strong>
                  {result.pattern.reason ? (
                    <span className={styles.muted}>{result.pattern.reason}</span>
                  ) : null}
                </div>
              ) : (
                <p className={styles.muted}>지원하지 않는 Prompt입니다.</p>
              )}
            </section>

            <section className={styles.panel}>
              <h2 className={styles.sectionTitle}>Selected Recipe</h2>
              {recipeNames.length > 0 ? (
                <ul className={styles.list}>
                  {recipeNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.muted}>—</p>
              )}
            </section>
          </div>

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

          <section className={styles.panel}>
            <h2 className={styles.sectionTitle}>Composed JSON</h2>
            <pre className={styles.code}>
              {JSON.stringify(result.json, null, 2)}
            </pre>
          </section>

          <section className={styles.panel}>
            <h2 className={styles.sectionTitle}>AI Metadata</h2>
            <p className={styles.muted}>
              Registry-backed mock parser · provider={result.provider}
            </p>
            <pre className={styles.code}>
              {JSON.stringify(
                {
                  pattern: result.pattern,
                  recipes: result.recipes,
                  components: result.components,
                },
                null,
                2,
              )}
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
