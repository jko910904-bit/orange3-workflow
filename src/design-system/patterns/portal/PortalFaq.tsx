"use client";

import { useState } from "react";
import { PortalShell } from "./PortalShell";
import styles from "./portal.module.css";

const CATEGORIES = ["전체", "상품", "계약", "개발"] as const;

const FAQ_ANSWER =
  "본 서비스는 연중무휴 제공을 원칙으로 하며, 안정적인 서비스 운영을 위해 정기·비정기 점검이 시행될 수 있습니다. 점검 시에는 일부 API 호출이 일시적으로 중단되거나 지연될 수 있으며, 점검 일정은 공지사항을 통해 사전 안내드립니다. 긴급 장애 발생 시에는 고객센터 및 서비스 문의 채널로 신속히 접수해 주시면 확인 후 안내드리겠습니다. 상품별 개발가이드는 API 상품 상세 화면 또는 개발가이드 메뉴에서 다운로드하실 수 있습니다.";

const FAQ_ROWS = Array.from({ length: 12 }, (_, i) => ({
  no: 80 - i,
  type: "상품" as const,
  question: "Q. 상품 개발가이드를 다운로드 받고 싶어요.",
}));

function IconSearch() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13.5 13.5L17 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={open ? styles.chevronOpen : styles.chevron}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Portal 자주하는 질문 (Real Example)
 */
export function PortalFaqPattern() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("전체");
  const [openNo, setOpenNo] = useState<number | null>(FAQ_ROWS[0]?.no ?? null);

  return (
    <PortalShell
      breadcrumb={[
        { label: "Home" },
        { label: "서비스소개" },
        { label: "자주하는 질문", current: true },
      ]}
      title="자주하는 질문"
      illustration="faq"
    >
      <div className={styles.contentInner}>
        <div className={`${styles.searchWrap} ${styles.searchWrapSoft}`}>
          <div className={styles.searchField}>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="찾으시는 답변이 없다면 문의를 이용해 주세요"
              readOnly
              aria-label="FAQ 검색"
            />
            <button type="button" className={styles.searchBtn} aria-label="검색">
              <IconSearch />
            </button>
          </div>
        </div>

        <div className={styles.categoryTabs} role="tablist" aria-label="질문 유형">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={
                activeCategory === cat
                  ? `${styles.categoryTab} ${styles.categoryTabActive}`
                  : styles.categoryTab
              }
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className={styles.resultCount}>
          검색결과 <strong>80</strong>건
        </p>

        <div className={styles.portalTable}>
          <div className={`${styles.portalTableHead} ${styles.faqHead}`}>
            <span className={styles.colNo}>번호</span>
            <span className={styles.colType}>질문유형</span>
            <span className={styles.colQuestion}>질문내용</span>
            <span className={styles.colChevron} />
          </div>
          <ul className={styles.portalTableBody}>
            {FAQ_ROWS.map((row) => {
              const open = openNo === row.no;
              return (
                <li key={row.no} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqQuestionRow}
                    aria-expanded={open}
                    onClick={() => setOpenNo(open ? null : row.no)}
                  >
                    <span className={styles.colNo}>{row.no}</span>
                    <span className={styles.colType}>{row.type}</span>
                    <span className={styles.colQuestion}>
                      <span className={styles.qMark}>Q.</span>
                      {row.question.replace(/^Q\.\s*/, "")}
                    </span>
                    <span className={styles.colChevron}>
                      <Chevron open={open} />
                    </span>
                  </button>
                  {open ? (
                    <div className={styles.faqAnswer}>
                      <span className={styles.aMark}>A.</span>
                      <p className={styles.faqAnswerText}>{FAQ_ANSWER}</p>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <nav className={styles.pagination} aria-label="페이지">
          <button type="button" className={styles.pageNav} aria-label="처음">
            |&lt;
          </button>
          <button type="button" className={styles.pageNav} aria-label="이전">
            &lt;
          </button>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={
                n === 1 ? `${styles.pageNum} ${styles.pageNumActive}` : styles.pageNum
              }
            >
              {n}
            </button>
          ))}
          <button type="button" className={styles.pageNav} aria-label="다음">
            &gt;
          </button>
          <button type="button" className={styles.pageNav} aria-label="마지막">
            &gt;|
          </button>
        </nav>
      </div>
    </PortalShell>
  );
}
