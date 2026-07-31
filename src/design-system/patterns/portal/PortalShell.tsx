"use client";

import type { ReactNode } from "react";
import styles from "./portal.module.css";

export const PORTAL_NAV = [
  "API 상품",
  "개발가이드",
  "이용안내",
  "서비스소개",
] as const;

export type PortalBreadcrumbItem = {
  label: string;
  current?: boolean;
};

export type PortalIllustration =
  | "notice"
  | "faq"
  | "mypage"
  | "login"
  | "none";

export type PortalShellProps = {
  breadcrumb: PortalBreadcrumbItem[];
  title: string;
  illustration?: PortalIllustration | ReactNode;
  /** Online inquiry bar above footer (default true) */
  showInquiry?: boolean;
  /** Use wide content column vs login-centered main */
  contentLayout?: "wide" | "centered";
  children: ReactNode;
};

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

function IconBookmark() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5.5 3.5h9v13l-4.5-3-4.5 3v-13z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBell() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2.75a4.5 4.5 0 0 1 4.5 4.5v2.1c0 .5.17.98.48 1.37l.72.9a1 1 0 0 1-.78 1.63H5.08a1 1 0 0 1-.78-1.63l.72-.9c.31-.39.48-.87.48-1.37v-2.1A4.5 4.5 0 0 1 10 2.75z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.2 16.25a1.9 1.9 0 0 0 3.6 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.5 16.25c1.4-2.2 3.2-3.25 5.5-3.25s4.1 1.05 5.5 3.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BannerIcon({ children }: { children: ReactNode }) {
  return (
    <div className={styles.bannerIcon} aria-hidden>
      {children}
    </div>
  );
}

function NoticeIllustration() {
  return (
    <BannerIcon>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M7 3.5h7.5L19 8v12.5H7V3.5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 3.5V8H19"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M10 12h6M10 15.5h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </BannerIcon>
  );
}

function FaqIllustration() {
  return (
    <BannerIcon>
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M9.6 9.2a2.5 2.5 0 0 1 4.8.9c0 1.5-1.5 2.1-2.2 2.6-.5.35-.7.7-.7 1.3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    </BannerIcon>
  );
}

function MyPageIllustration() {
  return (
    <BannerIcon>
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5.5 19c1.6-2.8 3.8-4.2 6.5-4.2s4.9 1.4 6.5 4.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </BannerIcon>
  );
}

function LoginIllustration() {
  return (
    <BannerIcon>
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5.5 19c1.6-2.8 3.8-4.2 6.5-4.2s4.9 1.4 6.5 4.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </BannerIcon>
  );
}

function renderIllustration(illustration: PortalShellProps["illustration"]) {
  if (illustration == null || illustration === "none") return null;
  if (typeof illustration !== "string") return illustration;
  if (illustration === "notice") return <NoticeIllustration />;
  if (illustration === "faq") return <FaqIllustration />;
  if (illustration === "mypage") return <MyPageIllustration />;
  if (illustration === "login") return <LoginIllustration />;
  return null;
}

/**
 * Shared portal chrome: GNB + page banner + inquiry bar + footer.
 * Used by My Page, Notice, FAQ, and Login portal screens.
 */
export function PortalShell({
  breadcrumb,
  title,
  illustration = "notice",
  showInquiry = true,
  contentLayout = "wide",
  children,
}: PortalShellProps) {
  const mainClass =
    contentLayout === "centered" ? styles.main : styles.mainWide;

  return (
    <div className={styles.shell} data-surface="portal">
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>로고</div>
          <nav className={styles.nav} aria-label="주요 메뉴">
            {PORTAL_NAV.map((item) => (
              <button key={item} type="button" className={styles.navLink}>
                {item}
              </button>
            ))}
          </nav>
          <div className={styles.headerRight}>
            <div className={styles.authLinks}>
              <a className={styles.authLink} href="#login">
                로그인
              </a>
              <span className={styles.authSep} aria-hidden>
                |
              </span>
              <a className={styles.authLink} href="#signup">
                회원가입
              </a>
            </div>
            <div className={styles.utilIcons} aria-label="유틸리티">
              <button type="button" className={styles.iconBtn} aria-label="검색">
                <IconSearch />
              </button>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="북마크"
              >
                <IconBookmark />
                <span className={styles.badge}>99+</span>
              </button>
              <button type="button" className={styles.iconBtn} aria-label="알림">
                <IconBell />
              </button>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="내 정보"
              >
                <IconUser />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.banner} aria-label="페이지 배너">
        <div className={styles.bannerContent}>
          <p className={styles.breadcrumb}>
            {breadcrumb.map((item, index) => (
              <span key={`${item.label}-${index}`}>
                {index > 0 ? " / " : null}
                <span
                  className={
                    item.current ? styles.breadcrumbCurrent : undefined
                  }
                >
                  {item.label}
                </span>
              </span>
            ))}
          </p>
          <h1 className={styles.bannerTitle}>{title}</h1>
        </div>
        <div className={styles.bannerGraphicSlot}>
          {renderIllustration(illustration)}
        </div>
      </section>

      <main className={mainClass}>{children}</main>

      <footer className={styles.footer}>
        {showInquiry ? (
          <div className={styles.inquiryBar}>
            <p className={styles.inquiryTitle}>온라인 문의</p>
            <div className={styles.inquiryActions}>
              <button type="button" className={styles.outlineBtn}>
                자주하는 질문
              </button>
              <button type="button" className={styles.outlineBtn}>
                서비스문의
              </button>
            </div>
          </div>
        ) : null}

        <div className={styles.footerBody}>
          <div>
            <p className={styles.footerLogo}>로고</p>
            <ul className={styles.companyLines}>
              <li>서울특별시 영등포구 여의대로 24, 전경련회관</li>
              <li>TEL 1811-8883 · FAX 02-3215-2673</li>
              <li>
                Copyright © 2017 회사명. All Rights Reserved.
              </li>
            </ul>
          </div>

          <div>
            <p className={styles.consultTitle}>상담안내번호</p>
            <ul className={styles.consultList}>
              <li>
                <strong>금융</strong>02-3771-1001
              </li>
              <li>
                <strong>공공</strong>02-3771-1002
              </li>
              <li>
                <strong>일반/기타</strong>02-3771-1003
              </li>
            </ul>
          </div>

          <div className={styles.footerAside}>
            <div className={styles.waMark} aria-label="웹 접근성 인증">
              WA
            </div>
            <div className={styles.familySelects}>
              <select className={styles.familySelect} defaultValue="site" aria-label="관련 사이트">
                <option value="site">관련 사이트</option>
              </select>
              <select
                className={styles.familySelect}
                defaultValue="family"
                aria-label="Family Site"
              >
                <option value="family">Family Site</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <ul className={styles.legalLinks}>
            <li>
              <a href="#about">회사소개</a>
            </li>
            <li>
              <a href="#terms">이용약관</a>
            </li>
            <li>
              <a href="#privacy">
                <strong>개인정보처리방침</strong>
              </a>
            </li>
            <li>
              <a href="#email">이메일무단수집거부</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
