"use client";

import { PortalShell } from "./PortalShell";
import styles from "./portal.module.css";

const NOTICES = [
  {
    no: 190,
    title: "서비스 신규 개편 관련 매뉴얼 서비스 신규 개편 관련 매뉴얼",
    date: "2025-12-31",
    isNew: true,
  },
  {
    no: 189,
    title: "'작업대출탐지 패키지' 신규API상품이 출시되었습니다.",
    date: "2025-12-31",
    isNew: true,
  },
  {
    no: 188,
    title: "서비스 정기 점검 안내 (01/18 02:00~04:00)",
    date: "2025-12-28",
    isNew: true,
  },
  {
    no: 187,
    title: "API 이용약관 개정 안내",
    date: "2025-12-20",
    isNew: false,
  },
  {
    no: 186,
    title: "개발가이드 v2.4 업데이트 배포 안내",
    date: "2025-12-15",
    isNew: false,
  },
  {
    no: 185,
    title: "연말 고객센터 운영시간 변경 안내",
    date: "2025-12-10",
    isNew: false,
  },
  {
    no: 184,
    title: "기업신용정보 API 응답 필드 추가 안내",
    date: "2025-12-05",
    isNew: false,
  },
  {
    no: 183,
    title: "테스트 키 발급 절차 변경 안내",
    date: "2025-11-28",
    isNew: false,
  },
  {
    no: 182,
    title: "공공데이터 연계 API 패키지 오픈",
    date: "2025-11-20",
    isNew: false,
  },
  {
    no: 181,
    title: "개인정보 처리방침 개정 사전 고지",
    date: "2025-11-12",
    isNew: false,
  },
];

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

/**
 * Portal 공지사항 목록 (Real Example)
 */
export function PortalNoticeListPattern() {
  return (
    <PortalShell
      breadcrumb={[
        { label: "Home" },
        { label: "서비스소개" },
        { label: "공지사항", current: true },
      ]}
      title="공지사항"
      illustration="notice"
    >
      <div className={styles.contentInner}>
        <div className={styles.searchWrap}>
          <div className={styles.searchField}>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="공지사항 검색해주세요"
              readOnly
              aria-label="공지사항 검색"
            />
            <button type="button" className={styles.searchBtn} aria-label="검색">
              <IconSearch />
            </button>
          </div>
        </div>

        <p className={styles.resultCount}>
          검색결과 <strong>190</strong>건
        </p>

        <div className={styles.portalTable}>
          <div className={styles.portalTableHead}>
            <span className={styles.colNo}>번호</span>
            <span className={styles.colTitle}>제목</span>
            <span className={styles.colDate}>등록일자</span>
          </div>
          <ul className={styles.portalTableBody}>
            {NOTICES.map((row) => (
              <li key={row.no} className={styles.portalTableRow}>
                <span className={styles.colNo}>{row.no}</span>
                <span className={styles.colTitle}>
                  <span className={styles.rowTitleText}>{row.title}</span>
                  {row.isNew ? (
                    <span className={styles.newBadge} aria-label="신규">
                      N
                    </span>
                  ) : null}
                </span>
                <span className={styles.colDate}>{row.date}</span>
              </li>
            ))}
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
