"use client";

import { useMemo, useState } from "react";
import { Button, Input } from "@/design-system/components";
import styles from "./Search.module.css";

const CATALOG = [
  { id: "1", label: "홍길동", meta: "hong@example.com" },
  { id: "2", label: "김영희", meta: "kim@example.com" },
  { id: "3", label: "이철수", meta: "lee@example.com" },
  { id: "4", label: "박민수", meta: "park@example.com" },
  { id: "5", label: "최유진", meta: "choi@example.com" },
  { id: "6", label: "데이터 테이블", meta: "패턴" },
  { id: "7", label: "회원관리", meta: "화면" },
];

const SEED_RECENT = ["홍길동", "회원", "활성"];

/**
 * Search Pattern live preview
 * BP: 검색창 좌측 · 검색 버튼 우측 · Enter 지원 · 최근 검색
 */
export function SearchPattern() {
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState("");
  const [recent, setRecent] = useState<string[]>(SEED_RECENT);

  const results = useMemo(() => {
    const q = applied.trim();
    if (!q) return [];
    return CATALOG.filter(
      (row) => row.label.includes(q) || row.meta.includes(q),
    );
  }, [applied]);

  function runSearch(next = query) {
    const trimmed = next.trim();
    setQuery(next);
    setApplied(trimmed);
    if (!trimmed) return;
    setRecent((prev) => {
      const without = prev.filter((r) => r !== trimmed);
      return [trimmed, ...without].slice(0, 6);
    });
  }

  return (
    <section className={styles.root} aria-label="Search Pattern preview">
      <div className={styles.intro}>
        <h2 className={styles.title}>Search — Compose</h2>
        <p className={styles.subtitle}>
          검색창 좌측 · 검색 버튼 우측 · Enter · 최근 검색
        </p>
      </div>

      <div className={styles.searchBar} role="search">
        <div className={styles.searchField}>
          <Input
            kind="search"
            size="s"
            label="검색"
            placeholder="이름 / 키워드"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
          />
        </div>
        <div className={styles.searchActions}>
          <Button
            variant="primary"
            size="s"
            onClick={() => runSearch()}
            data-primary-cta="true"
          >
            검색
          </Button>
        </div>
      </div>

      <div className={styles.recent} aria-label="최근 검색">
        <p className={styles.recentLabel}>최근 검색</p>
        <ul className={styles.recentList}>
          {recent.map((term) => (
            <li key={term}>
              <button
                type="button"
                className={styles.recentChip}
                aria-pressed={applied === term}
                onClick={() => runSearch(term)}
              >
                {term}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {applied ? (
        <div className={styles.results} aria-live="polite">
          <p className={styles.resultsTitle}>
            “{applied}” 결과 {results.length}건
          </p>
          {results.length === 0 ? (
            <p className={styles.empty}>
              검색 결과가 없습니다. Empty State Pattern으로 연결하세요.
            </p>
          ) : (
            <ul className={styles.resultsList}>
              {results.map((row) => (
                <li key={row.id} className={styles.resultsItem}>
                  {row.label}
                  <span className={styles.resultsMeta}>{row.meta}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}
