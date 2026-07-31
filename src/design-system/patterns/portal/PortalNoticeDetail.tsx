"use client";

import { PortalShell } from "./PortalShell";
import styles from "./portal.module.css";

/**
 * Portal 공지사항 상세 (Real Example)
 */
export function PortalNoticeDetailPattern() {
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
        <article className={styles.noticeArticle}>
          <header className={styles.noticeHead}>
            <h2 className={styles.noticeSubject}>
              &apos;작업대출탐지 패키지&apos; 신규API상품이 출시되었습니다.
            </h2>
            <p className={styles.noticeMeta}>
              <span>2025-12-31</span>
              <span className={styles.noticeMetaSep} aria-hidden>
                |
              </span>
              <span>관리자</span>
            </p>
          </header>

          <div className={styles.noticeBody}>
            <p>안녕하세요.</p>
            <p>
              금융기관·핀테크 기업의 비대면 대출 심사 과정에서 발생할 수 있는
              이상·허위 신청을 신속히 탐지할 수 있도록{" "}
              <strong>작업대출방지 패키지</strong> 신규 API 상품을 출시하였습니다.
            </p>

            <h3 className={styles.noticeSubhead}>작업대출방지 패키지란?</h3>
            <ul className={styles.noticeList}>
              <li>
                동일·유사 신청 패턴, 비정상 접속 이력, 서류 위변조 징후 등을
                종합적으로 분석하여 작업대출 위험을 조기에 탐지합니다.
              </li>
              <li>
                기존 신용·기업정보 API와 조합하여 심사 워크플로에 바로 연동할 수
                있는 패키지형 상품입니다.
              </li>
              <li>
                실시간 호출형 API로 제공되며, 테스트 키로 사전 검증 후 운영
                계약이 가능합니다.
              </li>
            </ul>

            <h3 className={styles.noticeSubhead}>이용대상?</h3>
            <ul className={styles.noticeList}>
              <li>은행·저축은행·카드·캐피탈 등 여신 취급 금융기관</li>
              <li>비대면 대출·중개 서비스를 운영하는 핀테크 사업자</li>
              <li>자체 심사 시스템에 API 연동이 필요한 플랫폼 사업자</li>
            </ul>

            <p>
              상품 상세 스펙과 연동 가이드는 개발가이드 및 API 상품 페이지에서
              확인하실 수 있습니다.
            </p>

            <p>
              <a className={styles.noticeCta} href="#package">
                작업대출방지 패키지 바로가기 &gt;
              </a>
            </p>
          </div>
        </article>

        <div className={styles.postNav}>
          <div className={styles.postNavRow}>
            <span className={styles.postNavLabel}>이전글</span>
            <span className={styles.postNavTitleMuted}>이전글이 없습니다.</span>
            <span className={styles.postNavDate} />
          </div>
          <div className={styles.postNavRow}>
            <span className={styles.postNavLabel}>다음글</span>
            <span className={styles.postNavTitle}>
              서비스 신규 개편 관련 매뉴얼
            </span>
            <span className={styles.postNavDate}>2025-12-31</span>
          </div>
        </div>

        <div className={styles.listBtnWrap}>
          <button type="button" className={styles.listBtn}>
            목록
          </button>
        </div>
      </div>
    </PortalShell>
  );
}
