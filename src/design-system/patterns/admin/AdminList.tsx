"use client";

import type { CSSProperties } from "react";
import { DatePicker, Select } from "antd";
import { Input, Table } from "@/design-system/components";
import { ADMIN_LAYOUT_CSS_VARS } from "@/playground/layout-admin";
import styles from "./admin.module.css";

export type AdminListProps = {
  /** Page title — defaults to 신청계약조회 */
  title?: string;
  description?: string;
};

type Row = {
  company: string;
  badge?: string;
  category: string;
  customerId: string;
  contractNo: string;
  dept: string;
  status: string;
  appliedAt: string;
  liveAt: string;
};

const ROWS: Row[] = [
  {
    company: "A사",
    badge: "재정산",
    category: "대기업",
    customerId: "CUST-2024-00182",
    contractNo: "CT-20240512-0182",
    dept: "공공사업부",
    status: "운영반영",
    appliedAt: "2025-05-12",
    liveAt: "2025-05-20",
  },
  {
    company: "B사",
    category: "공공",
    customerId: "CUST-2024-00191",
    contractNo: "CT-20240518-0191",
    dept: "금융사업부",
    status: "작성중",
    appliedAt: "2025-05-18",
    liveAt: "-",
  },
  {
    company: "C사",
    category: "대기업",
    customerId: "CUST-2024-00203",
    contractNo: "CT-20240521-0203",
    dept: "공공사업부",
    status: "운영반영",
    appliedAt: "2025-05-21",
    liveAt: "2025-05-28",
  },
  {
    company: "D사",
    badge: "재정산",
    category: "중견",
    customerId: "CUST-2024-00211",
    contractNo: "CT-20240524-0211",
    dept: "글로벌사업부",
    status: "접수대기",
    appliedAt: "2025-05-24",
    liveAt: "-",
  },
  {
    company: "E사",
    category: "대기업",
    customerId: "CUST-2024-00228",
    contractNo: "CT-20240527-0228",
    dept: "금융사업부",
    status: "운영반영",
    appliedAt: "2025-05-27",
    liveAt: "2025-06-02",
  },
  {
    company: "F사",
    category: "공공",
    customerId: "CUST-2024-00235",
    contractNo: "CT-20240530-0235",
    dept: "공공사업부",
    status: "작성중",
    appliedAt: "2025-05-30",
    liveAt: "-",
  },
  {
    company: "G사",
    category: "대기업",
    customerId: "CUST-2024-00244",
    contractNo: "CT-20250601-0244",
    dept: "글로벌사업부",
    status: "운영반영",
    appliedAt: "2025-06-01",
    liveAt: "2025-06-08",
  },
  {
    company: "H사",
    category: "중견",
    customerId: "CUST-2024-00251",
    contractNo: "CT-20250603-0251",
    dept: "금융사업부",
    status: "접수대기",
    appliedAt: "2025-06-03",
    liveAt: "-",
  },
];

const TOP_MENUS = [
  "계약관리",
  "고객관리",
  "상품관리",
  "포털사이트 관리",
  "시스템관리",
  "프레임관리",
];

const LNB_ITEMS = [
  { label: "신청계약조회", active: true },
  { label: "등록계약조회" },
  { label: "이용계약조회" },
  { label: "해지계약조회", children: ["3depth name", "3depth name", "3depth name"] },
  { label: "테스트현황조회" },
];

/** Matches Input SearchIcon: 16×16, stroke 1.5, currentColor */
function RefreshIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13 8a5 5 0 1 1-1.27-3.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 3.25v3.5h-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Admin List (Real Example)
 * White header · LNB · Tabs · Filter grid · Dense table
 */
export function AdminListPattern({
  title = "신청계약조회",
}: AdminListProps) {
  return (
    <div
      className={styles.shell}
      style={ADMIN_LAYOUT_CSS_VARS as CSSProperties}
      data-admin-layout="12-grid"
    >
      <header className={styles.topbar}>
        <div className={styles.logo}>로고</div>
        <nav className={styles.topNav} aria-label="상단 메뉴">
          {TOP_MENUS.map((item, i) => (
            <span
              key={item}
              className={
                i === 0
                  ? `${styles.topLink} ${styles.topLinkActive}`
                  : styles.topLink
              }
            >
              {item}
            </span>
          ))}
        </nav>
        <div className={styles.topRight}>
          <span>글로벌사업부 홍길동님</span>
          <span className={styles.logout}>로그아웃</span>
        </div>
      </header>

      <aside className={styles.lnb} aria-label="좌측 메뉴">
        <p className={styles.lnbTitle}>계약관리</p>
        {LNB_ITEMS.map((item) => (
          <div key={item.label}>
            <div
              className={
                item.active
                  ? `${styles.lnbItem} ${styles.lnbItemActive}`
                  : styles.lnbItem
              }
            >
              {item.label}
            </div>
            {item.children?.map((child, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className={`${styles.lnbItem} ${styles.lnbChild}`}
              >
                {child}
              </div>
            ))}
          </div>
        ))}
      </aside>

      <div className={styles.main}>
        <div className={styles.tabs} aria-label="열린 탭">
          <div className={`${styles.tab} ${styles.tabActive}`}>
            {title}
            <span className={styles.tabClose}>×</span>
          </div>
          <div className={styles.tab}>
            신청계약조회
            <span className={styles.tabClose}>×</span>
          </div>
          <div className={styles.tab}>
            신청계약조회
            <span className={styles.tabClose}>×</span>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.breadcrumb}>Home / API 상품 / 테마상품</p>
          <h1 className={styles.pageTitle}>{title}</h1>

          <section className={styles.filterPanel} aria-label="검색 조건">
            <div className={styles.filterGrid}>
              <div className={styles.field}>
                <Input size="s" label="기업명" placeholder="" />
              </div>
              <div className={styles.field}>
                <Input size="s" label="사업자번호" placeholder="" />
              </div>
              <div className={styles.field}>
                <Input size="s" label="고객ID" placeholder="" />
              </div>
              <div className={styles.field}>
                <label htmlFor="cust-type">고객구분</label>
                <Select
                  id="cust-type"
                  size="middle"
                  defaultValue="all"
                  style={{ width: "100%" }}
                  options={[
                    { value: "all", label: "전체" },
                    { value: "large", label: "대기업" },
                    { value: "public", label: "공공" },
                    { value: "mid", label: "중견" },
                  ]}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="status">상태구분</label>
                <Select
                  id="status"
                  size="middle"
                  defaultValue="all"
                  style={{ width: "100%" }}
                  options={[
                    { value: "all", label: "전체" },
                    { value: "live", label: "운영반영" },
                    { value: "draft", label: "작성중" },
                    { value: "wait", label: "접수대기" },
                  ]}
                />
              </div>
              <div className={styles.field}>
                <Input size="s" label="부서구분" placeholder="부서 검색" />
              </div>
              <div className={styles.field}>
                <label>접수일자</label>
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  size="middle"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="contract-no">계약관리번호</label>
                <Select
                  id="contract-no"
                  size="middle"
                  defaultValue="all"
                  style={{ width: "100%" }}
                  options={[
                    { value: "all", label: "전체" },
                    { value: "ct", label: "CT-" },
                  ]}
                />
              </div>
              <div className={styles.filterActions}>
                <button
                  type="button"
                  className={styles.searchBtn}
                  data-primary-cta="true"
                >
                  조회
                </button>
                <button type="button" className={styles.iconBtn} aria-label="초기화">
                  <RefreshIcon />
                </button>
              </div>
            </div>
          </section>

          <div className={styles.tableBlock}>
            <p className={styles.total}>
              총 <strong>190</strong>건
            </p>

            <Table density="dense" className={styles.tableRoot}>
              <Table.Scroll className={styles.tableScroll}>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>기업명</Table.Head>
                    <Table.Head>고객구분</Table.Head>
                    <Table.Head>고객ID</Table.Head>
                    <Table.Head>계약관리번호</Table.Head>
                    <Table.Head>관리부서</Table.Head>
                    <Table.Head>처리현황</Table.Head>
                    <Table.Head>접수등록일자</Table.Head>
                    <Table.Head>운영반영일자</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {ROWS.map((row) => (
                    <Table.Row key={row.contractNo}>
                      <Table.Cell>
                        {row.company}
                        {row.badge ? (
                          <span className={styles.badge}>{row.badge}</span>
                        ) : null}
                      </Table.Cell>
                      <Table.Cell>{row.category}</Table.Cell>
                      <Table.Cell>{row.customerId}</Table.Cell>
                      <Table.Cell>{row.contractNo}</Table.Cell>
                      <Table.Cell>{row.dept}</Table.Cell>
                      <Table.Cell>{row.status}</Table.Cell>
                      <Table.Cell>{row.appliedAt}</Table.Cell>
                      <Table.Cell>{row.liveAt}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Scroll>
            </Table>

            <div className={styles.pager}>
              <Table.Pagination
                page={1}
                pageCount={10}
                onPageChange={() => undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
