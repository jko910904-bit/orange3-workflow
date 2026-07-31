"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/design-system/components/button/Button";
import { Input } from "@/design-system/components/input/Input";
import {
  KIND_LABELS,
  KNOWLEDGE_ENTRIES,
  countByKind,
  searchKnowledge,
  type KnowledgeEntry,
  type KnowledgeKind,
  type KnowledgeKindFilter,
} from "@/playground/knowledge-index";
import styles from "./KnowledgeExplorer.module.css";

const FILTERS: { id: KnowledgeKindFilter; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "pattern", label: "Pattern" },
  { id: "component", label: "Component" },
  { id: "recipe", label: "Recipe" },
  { id: "decision-rule", label: "Decision Rule" },
];

function kindBadgeClass(kind: KnowledgeKind): string {
  switch (kind) {
    case "pattern":
      return styles.badgePattern;
    case "component":
      return styles.badgeComponent;
    case "recipe":
      return styles.badgeRecipe;
    case "decision-rule":
      return styles.badgeRule;
  }
}

export function KnowledgeExplorer() {
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<KnowledgeKindFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const totals = useMemo(() => countByKind(KNOWLEDGE_ENTRIES), []);

  const results = useMemo(
    () => searchKnowledge(query, kindFilter),
    [query, kindFilter],
  );

  const selected: KnowledgeEntry | null = useMemo(() => {
    if (selectedId) {
      const match = results.find((e) => e.id === selectedId);
      if (match) return match;
    }
    return results[0] ?? null;
  }, [selectedId, results]);

  function clearSearch() {
    setQuery("");
    setKindFilter("all");
    setSelectedId(null);
  }

  function filterCount(id: KnowledgeKindFilter): number {
    if (id === "all") {
      return query.trim() ? searchKnowledge(query, "all").length : totals.all;
    }
    return query.trim() ? searchKnowledge(query, id).length : totals[id];
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Knowledge Explorer · 보조 검색</p>
        <h1 className={styles.title}>JKO Knowledge</h1>
        <p className={styles.sub}>
          Pattern · Component · Recipe · Decision Rule를 검색합니다. 업무 화면
          탐색은 Recipes가 주 경로입니다.
        </p>
        <div className={styles.detailActions}>
          <Link href="/recipes" className={styles.openLink}>
            Browse Recipes →
          </Link>
        </div>
      </header>

      <div className={styles.searchBlock}>
        <Input
          kind="search"
          label="Knowledge 검색"
          placeholder="Pattern, Component, Recipe, Decision Rule…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Knowledge 검색"
        />
      </div>

      <div
        className={styles.filters}
        role="tablist"
        aria-label="카테고리 필터"
      >
        {FILTERS.map((f) => {
          const active = kindFilter === f.id;
          const count = filterCount(f.id);
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={styles.filterChip}
              data-active={active ? "true" : undefined}
              onClick={() => setKindFilter(f.id)}
            >
              {f.label}
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {results.length === 0 ? (
        <section className={styles.empty} aria-live="polite">
          <h2 className={styles.emptyTitle}>검색 결과가 없습니다</h2>
          <p className={styles.emptyBody}>
            다른 키워드를 입력하거나 필터를 전체로 되돌리세요.
          </p>
          <div className={styles.emptyActions}>
            <Button variant="primary" size="m" onClick={clearSearch}>
              검색 초기화 · 전체 보기
            </Button>
          </div>
        </section>
      ) : (
        <div className={styles.split}>
          <section className={styles.listPane} aria-label="검색 결과">
            <p className={styles.resultMeta}>
              {results.length}건
              {query.trim() ? ` · “${query.trim()}”` : ""}
            </p>
            <ul className={styles.resultList}>
              {results.map((entry) => {
                const isActive = selected?.id === entry.id;
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      className={styles.resultItem}
                      data-active={isActive ? "true" : undefined}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setSelectedId(entry.id)}
                    >
                      <span
                        className={`${styles.kindBadge} ${kindBadgeClass(entry.kind)}`}
                      >
                        {KIND_LABELS[entry.kind]}
                      </span>
                      <span className={styles.resultTitle}>{entry.title}</span>
                      <span className={styles.resultSummary}>
                        {entry.summary}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <aside className={styles.detailPane} aria-label="상세">
            {selected ? (
              <DetailPanel entry={selected} />
            ) : (
              <p className={styles.detailHint}>
                결과를 선택하면 요약이 표시됩니다.
              </p>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}

function DetailPanel({ entry }: { entry: KnowledgeEntry }) {
  const isRecipe = entry.kind === "recipe";
  const liveScreen = entry.meta?.liveScreen;
  const openLabel = isRecipe
    ? "Recipe Browser 열기"
    : "Design Kit에서 열기";

  return (
    <div className={styles.detail}>
      <span className={`${styles.kindBadge} ${kindBadgeClass(entry.kind)}`}>
        {KIND_LABELS[entry.kind]}
      </span>
      <h2 className={styles.detailTitle}>{entry.title}</h2>
      <p className={styles.detailSummary}>{entry.summary}</p>

      {entry.meta ? (
        <dl className={styles.metaList}>
          {Object.entries(entry.meta).map(([key, value]) => (
            <div key={key} className={styles.metaRow}>
              <dt>{metaLabel(key)}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {entry.tags && entry.tags.length > 0 ? (
        <div className={styles.tagRow}>
          {entry.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div className={styles.detailActions}>
        {entry.href ? (
          <Link href={entry.href} className={styles.openLink}>
            {openLabel} →
          </Link>
        ) : null}
        {isRecipe && liveScreen ? (
          <Link href={liveScreen} className={styles.openLink}>
            Live Screen 열기 →
          </Link>
        ) : null}
        {isRecipe && !entry.href ? (
          <span className={styles.noLink}>Recipe 상세 없음</span>
        ) : null}
      </div>
    </div>
  );
}

function metaLabel(key: string): string {
  const map: Record<string, string> = {
    group: "Group",
    useCase: "Use case",
    status: "Status",
    registryName: "Registry",
    slug: "Slug",
    category: "Category",
    patternChain: "Pattern chain",
    knowledgePath: "Knowledge path",
    liveScreen: "Live screen",
    phaseNote: "Note",
    key: "Key",
    side: "Side",
    nodeId: "Node",
    variant: "Variant",
    kind: "Kind",
  };
  return map[key] ?? key;
}
