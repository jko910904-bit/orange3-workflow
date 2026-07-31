"use client";

import { useMemo, useState } from "react";
import { Drawer } from "antd";
import { Button, Card } from "@/design-system/components";
import cardStyles from "@/design-system/components/card/card.module.css";
import { AdminShell } from "./admin/AdminShell";
import tableStyles from "./DataTable.module.css";
import dashStyles from "./Dashboard.module.css";
import styles from "./pattern.module.css";
import mmStyles from "./admin/MemberManagement.module.css";

type ActivityType = "시스템" | "회원" | "계약" | "알림";

type Activity = {
  id: string;
  time: string;
  type: ActivityType;
  text: string;
  detail: string;
};

const SEED: Activity[] = [
  {
    id: "1",
    time: "오늘 09:42",
    type: "시스템",
    text: "쿼터 80% 도달 — DATA API",
    detail: "잔여 2,000 호출. 알림 규칙 #quota-80이 트리거되었습니다.",
  },
  {
    id: "2",
    time: "오늘 08:15",
    type: "알림",
    text: "서비스 점검 안내 게시",
    detail: "공지 ID N-2041 · Portal 노출 중.",
  },
  {
    id: "3",
    time: "어제 17:20",
    type: "회원",
    text: "신규 API 키 발급 · 글로벌사업부",
    detail: "발급자: 이철수 · 키 prefix sk_live_…a3f2",
  },
  {
    id: "4",
    time: "어제 11:05",
    type: "시스템",
    text: "오류율 알림 해제 — 신용조회",
    detail: "오류율 0.4%로 회복. 자동 해제.",
  },
  {
    id: "5",
    time: "2일 전",
    type: "계약",
    text: "월간 이용 리포트 생성",
    detail: "리포트 R-2025-06 · Export 가능.",
  },
  {
    id: "6",
    time: "3일 전",
    type: "회원",
    text: "권한 변경 — 김영희 → 관리자",
    detail: "변경자: 홍길동 · Confirm 로그 #ACL-882",
  },
];

type TypeFilter = "all" | ActivityType;

/**
 * Screen: Timeline — Dashboard Recent Activity를 전용 면으로 확장.
 * Filter → Timeline list → Detail Drawer. Audit는 삭제 없음.
 */
export function TimelinePattern() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [active, setActive] = useState<Activity | null>(null);

  const filtered = useMemo(() => {
    if (typeFilter === "all") return SEED;
    return SEED.filter((a) => a.type === typeFilter);
  }, [typeFilter]);

  return (
    <AdminShell
      title="활동 타임라인"
      breadcrumb="Home / 운영 / 활동"
      lnbTitle="운영"
      lnbItems={[
        { label: "운영현황" },
        { label: "활동 타임라인", active: true },
        { label: "지표 리포트" },
      ]}
      topMenus={["대시보드", "회원", "계약", "설정"]}
      showPageHeader={false}
    >
      <section className={styles.pattern} aria-label="Timeline Screen preview">
        <div>
          <h2 className={styles.title}>활동 타임라인</h2>
          <p className={styles.subtitle}>
            Timeline = 이력축. Dashboard Activity와 동일 모델. Filter → list →
            Detail Drawer.
          </p>
        </div>

        <div className={tableStyles.filterBar} role="group" aria-label="필터">
          <span className={tableStyles.filterLabel}>유형</span>
          <div className={tableStyles.filterGroup}>
            {(
              [
                ["all", "전체"],
                ["시스템", "시스템"],
                ["회원", "회원"],
                ["계약", "계약"],
                ["알림", "알림"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                variant={typeFilter === value ? "secondary" : "ghost"}
                size="s"
                aria-pressed={typeFilter === value}
                onClick={() => setTypeFilter(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <Card shadow="1" radius="8" padding="m">
          <Card.Header>
            <h3 className={cardStyles.title}>
              이벤트 · {filtered.length}건
            </h3>
          </Card.Header>
          <Card.Body>
            {filtered.length === 0 ? (
              <div className={tableStyles.empty} role="status">
                <p className={tableStyles.emptyTitle}>활동이 없습니다</p>
                <p className={tableStyles.emptyDesc}>
                  유형 필터를 조정하세요.
                </p>
                <Button
                  variant="secondary"
                  size="s"
                  onClick={() => setTypeFilter("all")}
                >
                  전체 보기
                </Button>
              </div>
            ) : (
              <ol className={dashStyles.activityList}>
                {filtered.map((a) => (
                  <li key={a.id} className={dashStyles.activityItem}>
                    <time className={dashStyles.activityTime}>{a.time}</time>
                    <span className={dashStyles.activityText}>
                      <span
                        className={tableStyles.badge}
                        data-tone="ok"
                        style={{ marginRight: 8 }}
                      >
                        {a.type}
                      </span>
                      {a.text}{" "}
                      <Button
                        variant="ghost"
                        size="s"
                        onClick={() => setActive(a)}
                      >
                        상세
                      </Button>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </Card.Body>
        </Card>

        <Drawer
          title="이벤트 상세"
          open={active != null}
          onClose={() => setActive(null)}
          size={400}
          destroyOnHidden
        >
          {active ? (
            <div className={mmStyles.form}>
              <dl className={mmStyles.dl}>
                <div className={mmStyles.dlRow}>
                  <dt>시각</dt>
                  <dd>{active.time}</dd>
                </div>
                <div className={mmStyles.dlRow}>
                  <dt>유형</dt>
                  <dd>{active.type}</dd>
                </div>
                <div className={mmStyles.dlRow}>
                  <dt>요약</dt>
                  <dd>{active.text}</dd>
                </div>
                <div className={mmStyles.dlRow}>
                  <dt>상세</dt>
                  <dd>{active.detail}</dd>
                </div>
              </dl>
              <p className={styles.subtitle}>
                Audit 이력은 삭제하지 않습니다. 관리자 purge만 Confirm.
              </p>
            </div>
          ) : null}
        </Drawer>
      </section>
    </AdminShell>
  );
}
