"use client";

import type { CSSProperties, ReactNode } from "react";
import { ADMIN_LAYOUT_CSS_VARS } from "@/playground/layout-admin";
import styles from "./admin.module.css";

export type AdminShellLnbItem = {
  label: string;
  active?: boolean;
  children?: string[];
};

export type AdminShellProps = {
  /** Page / tab title */
  title: string;
  breadcrumb?: string;
  lnbTitle?: string;
  lnbItems?: AdminShellLnbItem[];
  topMenus?: string[];
  /** Extra tabs (inactive) shown beside the active title tab */
  extraTabs?: string[];
  /** Main content — rendered inside fluid content area */
  children: ReactNode;
  /** Optional page chrome above children (title already optional via showPageHeader) */
  showPageHeader?: boolean;
  className?: string;
};

const DEFAULT_TOP = [
  "계약관리",
  "고객관리",
  "상품관리",
  "포털사이트 관리",
  "시스템관리",
  "프레임관리",
];

const DEFAULT_LNB: AdminShellLnbItem[] = [
  { label: "목록 조회", active: true },
  { label: "등록" },
  { label: "설정" },
];

/**
 * Admin shell — Desktop 1440 · Sidebar 240 · Content fluid · 12-col content grid.
 * Uses `--admin-canvas` / `--admin-sidebar` / `--admin-columns` from layout tokens.
 */
export function AdminShell({
  title,
  breadcrumb = "Home / Admin",
  lnbTitle = "메뉴",
  lnbItems = DEFAULT_LNB,
  topMenus = DEFAULT_TOP,
  extraTabs = [],
  children,
  showPageHeader = true,
  className,
}: AdminShellProps) {
  return (
    <div
      className={className ? `${styles.shell} ${className}` : styles.shell}
      style={ADMIN_LAYOUT_CSS_VARS as CSSProperties}
      data-admin-layout="12-grid"
    >
      <header className={styles.topbar}>
        <div className={styles.logo}>로고</div>
        <nav className={styles.topNav} aria-label="상단 메뉴">
          {topMenus.map((item, i) => (
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
        <p className={styles.lnbTitle}>{lnbTitle}</p>
        {lnbItems.map((item) => (
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
          {extraTabs.map((t) => (
            <div key={t} className={styles.tab}>
              {t}
              <span className={styles.tabClose}>×</span>
            </div>
          ))}
        </div>

        <div className={styles.content}>
          {showPageHeader ? (
            <>
              <p className={styles.breadcrumb}>{breadcrumb}</p>
              <h1 className={styles.pageTitle}>{title}</h1>
            </>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
