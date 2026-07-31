"use client";

import Link from "next/link";
import {
  RECIPE_CATEGORY_LABELS,
  patternChainSteps,
  type RecipeCatalogEntry,
} from "@/playground/recipe-catalog";
import { DocDisclosure } from "@/playground/DocDisclosure";
import {
  ScreenLivePreview,
  hasScreenLivePreview,
  screenIdFromLiveHref,
} from "@/playground/ScreenLivePreview";
import styles from "./RecipeBrowser.module.css";

function categoryChipClass(category: RecipeCatalogEntry["category"]): string {
  switch (category) {
    case "admin":
      return styles.chipAdmin;
    case "saas":
      return styles.chipSaas;
    case "ai":
      return styles.chipAi;
    case "workflow":
      return styles.chipWorkflow;
  }
}

export function RecipeDetail({ recipe }: { recipe: RecipeCatalogEntry }) {
  const steps = patternChainSteps(recipe.patternChain);
  const screenId = recipe.liveHref
    ? screenIdFromLiveHref(recipe.liveHref)
    : null;
  const canCompose =
    screenId !== null && hasScreenLivePreview(screenId);

  return (
    <main className={styles.detailPage}>
      <p className={styles.crumb}>
        <Link href="/recipes">Recipes</Link>
        {" / "}
        {recipe.title}
      </p>

      <header className={styles.detailHeader}>
        <div className={styles.detailMeta}>
          <span
            className={`${styles.categoryChip} ${categoryChipClass(recipe.category)}`}
          >
            {RECIPE_CATEGORY_LABELS[recipe.category]}
          </span>
          {recipe.eyebrow ? (
            <span className={styles.linkSummary}>{recipe.eyebrow}</span>
          ) : null}
          {recipe.liveHref ? (
            <span className={styles.liveBadge}>Live</span>
          ) : null}
        </div>
        <h1 className={styles.title}>{recipe.title}</h1>
      </header>

      {/* 1. Screen Preview */}
      <section className={styles.section} aria-labelledby="preview-title">
        <h2 id="preview-title" className={styles.sectionTitle}>
          화면 Preview
        </h2>
        {canCompose && screenId ? (
          <div className={styles.livePreview}>
            <div className={styles.livePreviewBar}>
              <span className={styles.liveBadge}>Live</span>
              {recipe.liveHref ? (
                <Link href={recipe.liveHref} className={styles.primaryLink}>
                  전체 화면 열기
                </Link>
              ) : null}
            </div>
            <div className={styles.liveCompose}>
              <ScreenLivePreview screenId={screenId} />
            </div>
          </div>
        ) : recipe.liveHref ? (
          <div className={styles.previewEmpty}>
            <p className={styles.previewEmptyTitle}>Live screen</p>
            <p className={styles.sectionBody}>
              인페이지 Preview 매핑이 없습니다. 전체 화면에서 확인하세요.
            </p>
            <Link href={recipe.liveHref} className={styles.primaryLink}>
              Live screen 열기
            </Link>
          </div>
        ) : (
          <div className={styles.previewEmpty}>
            <p className={styles.previewEmptyTitle}>Preview 준비 중</p>
            <p className={styles.sectionBody}>
              Live screen이 아직 없습니다. Pattern 흐름과 관련 Pattern을 먼저
              탐색하세요.
            </p>
            {recipe.patterns[0]?.href ? (
              <Link
                href={recipe.patterns[0].href}
                className={styles.primaryLink}
              >
                관련 Pattern 보기
              </Link>
            ) : (
              <Link href="/patterns" className={styles.primaryLink}>
                Patterns 탐색
              </Link>
            )}
          </div>
        )}
      </section>

      {/* 2. Pattern 흐름 */}
      <section className={styles.section} aria-labelledby="chain-title">
        <h2 id="chain-title" className={styles.sectionTitle}>
          Pattern 흐름
        </h2>
        <ol className={styles.chain} aria-label="Pattern 순서">
          {steps.map((step, i) => (
            <li key={`${step}-${i}`} style={{ display: "contents" }}>
              {i > 0 ? (
                <span className={styles.chainArrow} aria-hidden>
                  →
                </span>
              ) : null}
              <span className={styles.chainStep}>
                {i + 1}. {step}
              </span>
            </li>
          ))}
        </ol>
        <ul className={styles.linkList}>
          {recipe.patterns.map((p) => (
            <li key={p.id} className={styles.linkItem}>
              {p.href ? (
                <Link href={p.href}>{p.name}</Link>
              ) : (
                <span className={styles.linkMuted}>{p.name}</span>
              )}
              <p className={styles.linkSummary}>{p.id}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. 사용된 Component */}
      <section className={styles.section} aria-labelledby="components-title">
        <h2 id="components-title" className={styles.sectionTitle}>
          사용된 Component
        </h2>
        <ul className={styles.componentChips} aria-label="Kit components">
          {recipe.components.map((c) => (
            <li key={c.slug ?? c.name}>
              {c.href ? (
                <Link href={c.href} className={styles.componentChip}>
                  {c.name}
                </Link>
              ) : (
                <span className={styles.componentChipMuted}>{c.name}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Why */}
      <section className={styles.section} aria-labelledby="why-title">
        <h2 id="why-title" className={styles.sectionTitle}>
          Why
        </h2>
        <p className={styles.sectionBody}>{recipe.why}</p>
      </section>

      {/* 5. Collapsed Definition */}
      <DocDisclosure title="정의">
        <p>
          <strong>UX Goal</strong> — {recipe.goal}
        </p>
        {recipe.userTasks.length > 0 ? (
          <>
            <p>
              <strong>User Tasks</strong>
            </p>
            <ul>
              {recipe.userTasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </>
        ) : null}
        {recipe.decisionRules.length > 0 ? (
          <>
            <p>
              <strong>Decision Rule</strong>
            </p>
            <ul>
              {recipe.decisionRules.map((r) => (
                <li key={r.id}>
                  {r.href ? <Link href={r.href}>{r.title}</Link> : r.title}
                  {r.summary ? ` — ${r.summary}` : null}
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {recipe.knowledgePath ? (
          <p className={styles.knowledgePath}>{recipe.knowledgePath}</p>
        ) : null}
      </DocDisclosure>
    </main>
  );
}
