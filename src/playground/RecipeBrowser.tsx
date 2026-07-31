"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/design-system/components/button/Button";
import { Input } from "@/design-system/components/input/Input";
import {
  RECIPE_CATEGORY_LABELS,
  RECIPE_CATALOG,
  countRecipesByCategory,
  searchScreenRecipes,
  type RecipeBrowseCategory,
  type RecipeCatalogEntry,
  type RecipeCategoryFilter,
} from "@/playground/recipe-catalog";
import styles from "./RecipeBrowser.module.css";

const FILTERS: { id: RecipeCategoryFilter; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "admin", label: "관리" },
  { id: "saas", label: "SaaS" },
  { id: "ai", label: "AI" },
  { id: "workflow", label: "Workflow" },
];

function categoryChipClass(category: RecipeBrowseCategory): string {
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

export function RecipeBrowser() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<RecipeCategoryFilter>("all");

  const totals = useMemo(() => countRecipesByCategory(RECIPE_CATALOG), []);

  const results = useMemo(
    () => searchScreenRecipes(query, categoryFilter),
    [query, categoryFilter],
  );

  function clearSearch() {
    setQuery("");
    setCategoryFilter("all");
  }

  function filterCount(id: RecipeCategoryFilter): number {
    if (id === "all") {
      return query.trim()
        ? searchScreenRecipes(query, "all").length
        : totals.all;
    }
    return query.trim()
      ? searchScreenRecipes(query, id).length
      : totals[id];
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>업무 화면 · Screen Recipes</p>
        <h1 className={styles.title}>Recipes</h1>
        <p className={styles.sub}>
          업무 화면을 보고 · 고르고 · Compose합니다. Preview와 Pattern chain이
          먼저입니다.
        </p>
      </header>

      <div className={styles.searchBlock}>
        <Input
          kind="search"
          label="Recipe 검색"
          placeholder="화면명, Goal, Task, Pattern…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Recipe 검색"
        />
      </div>

      <div
        className={styles.filters}
        role="tablist"
        aria-label="업무 화면 그룹"
      >
        {FILTERS.map((f) => {
          const active = categoryFilter === f.id;
          const count = filterCount(f.id);
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={styles.filterChip}
              data-active={active ? "true" : undefined}
              onClick={() => setCategoryFilter(f.id)}
            >
              {f.label}
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {results.length === 0 ? (
        <section className={styles.empty} aria-live="polite">
          <h2 className={styles.emptyTitle}>맞는 업무 화면이 없습니다</h2>
          <p className={styles.emptyBody}>
            다른 키워드를 쓰거나 필터를 전체로 되돌리세요. Patterns에서 관련
            작업 단위를 탐색할 수 있습니다.
          </p>
          <div className={styles.emptyActions}>
            <Button variant="primary" size="m" onClick={clearSearch}>
              검색 초기화 · 전체 보기
            </Button>
            <Link href="/patterns" className={styles.emptySecondary}>
              Patterns 탐색
            </Link>
          </div>
        </section>
      ) : (
        <>
          <p className={styles.resultMeta}>
            {results.length}개 화면
            {query.trim() ? ` · “${query.trim()}”` : ""}
          </p>
          <ul className={styles.cardList}>
            {results.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

function RecipeCard({ recipe }: { recipe: RecipeCatalogEntry }) {
  const steps = recipe.patternChain
    .split("→")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  return (
    <Link href={`/recipes/${recipe.id}`} className={styles.card}>
      <div
        className={styles.cardThumb}
        data-live={recipe.liveHref ? "true" : "false"}
      >
        {recipe.liveHref ? (
          <span className={styles.thumbLabel}>Live Preview</span>
        ) : (
          <span className={styles.thumbLabel}>Preview 준비 중</span>
        )}
      </div>
      <div className={styles.cardTop}>
        <span
          className={`${styles.categoryChip} ${categoryChipClass(recipe.category)}`}
        >
          {RECIPE_CATEGORY_LABELS[recipe.category]}
        </span>
        {recipe.liveHref ? (
          <span className={styles.liveBadge}>Live</span>
        ) : null}
      </div>
      <h2 className={styles.cardTitle}>{recipe.title}</h2>
      <div className={styles.cardChips}>
        {steps.map((step) => (
          <span key={step} className={styles.chainChip}>
            {step.replace(/^\d+\.\s*/, "").replace(/^\(+|\)+$/g, "")}
          </span>
        ))}
      </div>
    </Link>
  );
}
