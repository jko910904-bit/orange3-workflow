"use client";

import { Button, Card } from "@/design-system/components";
import cardStyles from "@/design-system/components/card/card.module.css";
import { AdminShell } from "./admin/AdminShell";
import styles from "./Dashboard.module.css";

const KPIS = [
  { label: "금월 호출", value: "12,480", hint: "전월 대비 +8%" },
  { label: "오류율", value: "1.2%", hint: "목표 2% 이하" },
  { label: "잔여 쿼터", value: "80%", hint: "8,000 / 10,000" },
  { label: "활성 API", value: "24", hint: "신규 2" },
];

const BARS = [
  { label: "1월", h: 40 },
  { label: "2월", h: 70 },
  { label: "3월", h: 55 },
  { label: "4월", h: 90 },
  { label: "5월", h: 65 },
  { label: "6월", h: 80 },
];

const ACTIVITIES = [
  { time: "09:42", text: "쿼터 80% 도달 — DATA API" },
  { time: "08:15", text: "서비스 점검 안내 게시" },
  { time: "어제", text: "신규 API 키 발급 · 글로벌사업부" },
  { time: "어제", text: "오류율 알림 해제 — 신용조회" },
  { time: "2일 전", text: "월간 이용 리포트 생성" },
];

const QUICK_ACTIONS = [
  { label: "회원 등록", primary: true },
  { label: "리포트 내보내기", primary: false },
  { label: "알림 설정", primary: false },
] as const;

/**
 * Dashboard Pattern — Compose preview (Kit components only).
 * Stack: KPI → Charts → Recent Activity → Quick Action
 * Title = optional page chrome (AdminShell), not a required Component.
 */
export function DashboardPattern() {
  return (
    <AdminShell
      title="운영 현황"
      breadcrumb="Home / 운영 / 대시보드"
      lnbTitle="운영"
      lnbItems={[
        { label: "운영현황", active: true },
        { label: "지표 리포트" },
        { label: "알림·활동" },
      ]}
      topMenus={["대시보드", "회원", "계약", "상품", "설정"]}
      showPageHeader
    >
      <section className={styles.stack} aria-label="Dashboard Pattern preview">
        <p className={styles.titleHint}>
          Stack: KPI → Charts → Recent Activity → Quick Action (Title =
          page chrome)
        </p>

        {/* 1. KPI */}
        <section className={styles.kpiRow} aria-label="KPI">
          {KPIS.map((kpi) => (
            <Card key={kpi.label} shadow="1" radius="8" padding="m">
              <Card.Body>
                <p className={styles.kpiLabel}>{kpi.label}</p>
                <p className={styles.kpiValue}>{kpi.value}</p>
                <p className={styles.kpiHint}>{kpi.hint}</p>
              </Card.Body>
            </Card>
          ))}
        </section>

        {/* 2. Charts */}
        <section aria-label="Charts">
          <Card shadow="1" radius="8" padding="m">
            <Card.Header>
              <h2 className={cardStyles.title}>최근 6개월 호출량</h2>
            </Card.Header>
            <Card.Body>
              <p className={styles.chartSummary}>
                6개월 호출 요약: 최고 4월(90), 최저 1월(40). 단위: 상대 지수.
              </p>
              <div className={styles.chartBlock}>
                <div className={styles.bars} role="img" aria-hidden>
                  {BARS.map((b) => (
                    <div key={b.label} className={styles.barCol}>
                      <div
                        className={styles.bar}
                        style={{ height: `${b.h}%` }}
                      />
                      <span className={styles.barLabel}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* 3. Recent Activity */}
        <section aria-label="Recent Activity">
          <Card shadow="1" radius="8" padding="m">
            <Card.Header>
              <h2 className={cardStyles.title}>Recent Activity</h2>
            </Card.Header>
            <Card.Body>
              <ol className={styles.activityList}>
                {ACTIVITIES.map((a) => (
                  <li
                    key={`${a.time}-${a.text}`}
                    className={styles.activityItem}
                  >
                    <time className={styles.activityTime}>{a.time}</time>
                    <span className={styles.activityText}>{a.text}</span>
                  </li>
                ))}
              </ol>
            </Card.Body>
          </Card>
        </section>

        {/* 4. Quick Action */}
        <section aria-label="Quick Action">
          <Card shadow="1" radius="8" padding="m">
            <Card.Header>
              <h2 className={cardStyles.title}>Quick Action</h2>
            </Card.Header>
            <Card.Body>
              <div className={styles.quickActions}>
                {QUICK_ACTIONS.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.primary ? "primary" : "secondary"}
                    size="s"
                    data-primary-cta={action.primary ? "true" : undefined}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </section>
      </section>
    </AdminShell>
  );
}
