"use client";

import { PortalShell } from "./PortalShell";
import styles from "./portal.module.css";

export type PortalMyPageProps = {
  /** filled (default) matches Real Example with mock data; empty shows zero-state copy */
  variant?: "filled" | "empty";
  userName?: string;
};

const METRICS = [
  { label: "알림함", key: "alerts" },
  { label: "이용현황", key: "usage" },
  { label: "신청현황", key: "apps" },
  { label: "서비스 문의", key: "inquiries" },
  { label: "관심상품", key: "favorites" },
] as const;

const FILLED = {
  metrics: { alerts: 5, usage: 7, apps: 1, inquiries: 1, favorites: 2 },
  alerts: [
    {
      date: "2025-01-31",
      text: "계약호출건수 80% 초과했어요!",
    },
    {
      date: "2025-01-28",
      text: "API 이용계약이 승인되었습니다.",
    },
    {
      date: "2025-01-22",
      text: "서비스 문의에 답변이 등록되었습니다.",
    },
    {
      date: "2025-01-15",
      text: "관심상품으로 등록한 API가 업데이트되었습니다.",
    },
    {
      date: "2025-01-10",
      text: "정기 점검 안내 (01/18 02:00~04:00)",
    },
  ],
  usage: [
    {
      name: "기업신용정보 API",
      period: "2024-06-01 ~ 2025-05-31",
      tag: "호출건수 신청 중",
      tagTone: "blue" as const,
      warn: "호출건수 80% 초과",
    },
    {
      name: "개인신용정보 API",
      period: "2024-09-01 ~ 2025-08-31",
      tag: "이용중",
      tagTone: "green" as const,
    },
    {
      name: "부동산시세 API",
      period: "2024-11-01 ~ 2025-10-31",
      tag: "이용중",
      tagTone: "green" as const,
    },
    {
      name: "휴폐업정보 API",
      period: "2025-01-01 ~ 2025-12-31",
      tag: "이용중",
      tagTone: "green" as const,
    },
  ],
  favorites: [
    { tag: "테마상품", name: "금융·핀테크 API 패키지" },
    { tag: "테마상품", name: "공공데이터 연계 API 패키지" },
  ],
  applications: [
    {
      name: "기업개요정보 API",
      date: "2025-01-20",
      status: "접수중",
      statusTone: "blue" as const,
      action: "바로가기" as const,
    },
    {
      name: "재무정보 API",
      date: "2025-01-12",
      status: "반려",
      statusTone: "red" as const,
      action: "재신청" as const,
    },
  ],
  inquiries: [
    {
      title: "호출 한도 증설 문의",
      date: "2025-01-25",
      status: "답변완료",
      statusTone: "green" as const,
    },
    {
      title: "테스트 키 발급 요청",
      date: "2025-01-29",
      status: "답변대기",
      statusTone: "orange" as const,
    },
  ],
};

function IconChevron() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M4.5 2.5L8 6l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWarn() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1.6 12.6 12H1.4L7 1.6z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M7 5.5v3.2M7 10.2v.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const TAG_CLASS = {
  blue: styles.tag_blue,
  green: styles.tag_green,
  red: styles.tag_red,
  orange: styles.tag_orange,
} as const;

function SectionHead({ title }: { title: string }) {
  return (
    <div className={styles.sectionHead}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <button type="button" className={styles.moreLink}>
        + 더보기
      </button>
    </div>
  );
}

function EmptyBody({ message, action }: { message: string; action?: string }) {
  return (
    <div className={styles.emptyBody}>
      <p className={styles.emptyText}>{message}</p>
      {action ? (
        <button type="button" className={styles.btnOutline}>
          {action}
        </button>
      ) : null}
    </div>
  );
}

/**
 * Portal My Page (Real Example)
 * Shared PortalShell + profile / metrics / section cards
 */
export function PortalMyPagePattern({
  variant = "filled",
  userName = "사업전략부송길동",
}: PortalMyPageProps) {
  const filled = variant === "filled";
  const metrics = filled
    ? FILLED.metrics
    : { alerts: 0, usage: 0, apps: 0, inquiries: 0, favorites: 0 };

  return (
    <PortalShell
      breadcrumb={[
        { label: "Home" },
        { label: "마이페이지", current: true },
      ]}
      title="마이페이지"
      illustration="mypage"
      contentLayout="wide"
    >
      <div className={styles.mainInner}>
        <div className={styles.topRow}>
          <aside className={styles.profileCard}>
            <p className={styles.greeting}>
              안녕하세요!
              <br />
              <strong>{userName}님,</strong>
            </p>
            <button type="button" className={styles.btnMuted}>
              가입정보관리
            </button>
          </aside>

          <div className={styles.metricStrip} role="list">
            {METRICS.map((m) => (
              <button
                key={m.key}
                type="button"
                className={styles.metricItem}
                role="listitem"
              >
                <span className={styles.metricLabel}>
                  {m.label}
                  <IconChevron />
                </span>
                <span className={styles.metricValue}>{metrics[m.key]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          <section className={`${styles.card} ${styles.cardAlerts}`}>
            <SectionHead title="알림함" />
            {filled ? (
              <ul className={styles.list}>
                {FILLED.alerts.map((item) => (
                  <li
                    key={`${item.date}-${item.text}`}
                    className={styles.listItem}
                  >
                    <span className={styles.listDate}>{item.date}</span>
                    <span className={styles.listText}>{item.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyBody message="받은 알림이 없습니다." />
            )}
          </section>

          <section className={`${styles.card} ${styles.cardUsage}`}>
            <SectionHead title="이용현황" />
            {filled ? (
              <>
                <ul className={styles.usageList}>
                  {FILLED.usage.map((item) => (
                    <li key={item.name} className={styles.usageItem}>
                      <div className={styles.usageMain}>
                        <div className={styles.usageTitleRow}>
                          <strong>{item.name}</strong>
                          <span
                            className={`${styles.tag} ${TAG_CLASS[item.tagTone]}`}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <p className={styles.usagePeriod}>{item.period}</p>
                        {item.warn ? (
                          <p className={styles.warnRow}>
                            <IconWarn />
                            {item.warn}
                          </p>
                        ) : null}
                      </div>
                      <button type="button" className={styles.btnGhost}>
                        바로가기
                      </button>
                    </li>
                  ))}
                </ul>
                <div className={styles.cardFooter}>
                  <button type="button" className={styles.btnOutline}>
                    해지계약조회
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.emptyBody}>
                <p className={styles.emptyText}>
                  지금 이용 중인 계약이 없습니다.
                </p>
                <div className={styles.emptyActions}>
                  <button type="button" className={styles.btnOutline}>
                    API 둘러보기
                  </button>
                  <button type="button" className={styles.btnOutlineGray}>
                    해지계약조회
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className={`${styles.card} ${styles.cardFavorites}`}>
            <SectionHead title="관심상품" />
            {filled ? (
              <>
                <ul className={styles.favList}>
                  {FILLED.favorites.map((item) => (
                    <li key={item.name} className={styles.favItem}>
                      <span className={styles.favTag}>[{item.tag}]</span>
                      <span className={styles.favName}>{item.name}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.cardFooter}>
                  <button type="button" className={styles.btnOutline}>
                    관심상품 추가
                  </button>
                </div>
              </>
            ) : (
              <EmptyBody
                message="등록된 관심상품이 없습니다."
                action="관심상품 추가"
              />
            )}
          </section>

          <section className={`${styles.card} ${styles.cardApps}`}>
            <SectionHead title="신청현황" />
            {filled ? (
              <ul className={styles.appList}>
                {FILLED.applications.map((item) => (
                  <li key={item.name} className={styles.appItem}>
                    <div className={styles.appMain}>
                      <div className={styles.usageTitleRow}>
                        <strong>{item.name}</strong>
                        <span
                          className={`${styles.tag} ${TAG_CLASS[item.statusTone]}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className={styles.usagePeriod}>{item.date}</p>
                    </div>
                    <button type="button" className={styles.btnGhost}>
                      {item.action}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyBody message="신청 중인 서비스가 없습니다." />
            )}
          </section>

          <section className={`${styles.card} ${styles.cardInquiry}`}>
            <SectionHead title="서비스 문의" />
            {filled ? (
              <>
                <ul className={styles.appList}>
                  {FILLED.inquiries.map((item) => (
                    <li key={item.title} className={styles.appItem}>
                      <div className={styles.appMain}>
                        <div className={styles.usageTitleRow}>
                          <strong>{item.title}</strong>
                          <span
                            className={`${styles.tag} ${TAG_CLASS[item.statusTone]}`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className={styles.usagePeriod}>{item.date}</p>
                      </div>
                      <button type="button" className={styles.btnGhost}>
                        바로가기
                      </button>
                    </li>
                  ))}
                </ul>
                <div className={styles.cardFooter}>
                  <button type="button" className={styles.btnPrimary}>
                    서비스 문의하기
                  </button>
                </div>
              </>
            ) : (
              <EmptyBody
                message="빠르고 친절한 상담을 약속드립니다."
                action="서비스 문의하기"
              />
            )}
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
