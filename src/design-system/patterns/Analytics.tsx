"use client";

import { useMemo, useState } from "react";
import { Button, Card, Table } from "@/design-system/components";
import cardStyles from "@/design-system/components/card/card.module.css";
import { AdminShell } from "./admin/AdminShell";
import tableStyles from "./DataTable.module.css";
import dashStyles from "./Dashboard.module.css";
import styles from "./pattern.module.css";

type Period = "7d" | "30d" | "90d";
type Segment = "all" | "공공" | "금융" | "글로벌";

type DrillRow = {
  id: string;
  api: string;
  segment: Exclude<Segment, "all">;
  calls: number;
  errors: string;
  quota: string;
};

const KPIS = [
  { label: "총 호출", value: "48,210", hint: "선택 기간" },
  { label: "평균 오류율", value: "1.1%", hint: "목표 2% 이하" },
  { label: "피크 QPS", value: "312", hint: "화 14:00" },
  { label: "Export 대기", value: "2", hint: "리포트 큐" },
];

const BARS = [
  { label: "D-6", h: 45 },
  { label: "D-5", h: 62 },
  { label: "D-4", h: 58 },
  { label: "D-3", h: 80 },
  { label: "D-2", h: 70 },
  { label: "D-1", h: 88 },
  { label: "오늘", h: 75 },
];

const DRILL: DrillRow[] = [
  {
    id: "1",
    api: "DATA API",
    segment: "공공",
    calls: 12480,
    errors: "0.8%",
    quota: "80%",
  },
  {
    id: "2",
    api: "신용조회",
    segment: "금융",
    calls: 9320,
    errors: "1.4%",
    quota: "62%",
  },
  {
    id: "3",
    api: "GEO",
    segment: "글로벌",
    calls: 7100,
    errors: "0.5%",
    quota: "45%",
  },
  {
    id: "4",
    api: "IMAGE",
    segment: "공공",
    calls: 5400,
    errors: "2.1%",
    quota: "91%",
  },
  {
    id: "5",
    api: "TEXT",
    segment: "금융",
    calls: 3910,
    errors: "1.0%",
    quota: "33%",
  },
];

/**
 * Screen: Analytics — Filter → Chart/KPI → Table drill → Export.
 * Dashboard 심층; Filter Before Data.
 */
export function AnalyticsPattern() {
  const [period, setPeriod] = useState<Period>("30d");
  const [segment, setSegment] = useState<Segment>("all");

  const rows = useMemo(() => {
    if (segment === "all") return DRILL;
    return DRILL.filter((r) => r.segment === segment);
  }, [segment]);

  function exportReport() {
    window.alert(
      `리포트 Export 예약됨 (기간 ${period} · 세그먼트 ${segment === "all" ? "전체" : segment}). 완료 시 Notification.`,
    );
  }

  return (
    <AdminShell
      title="지표 리포트"
      breadcrumb="Home / 운영 / 지표 리포트"
      lnbTitle="운영"
      lnbItems={[
        { label: "운영현황" },
        { label: "지표 리포트", active: true },
        { label: "활동 타임라인" },
      ]}
      topMenus={["대시보드", "회원", "계약", "설정"]}
      showPageHeader={false}
    >
      <section
        className={dashStyles.stack}
        aria-label="Analytics Screen preview"
      >
        <div className={tableStyles.intro}>
          <div>
            <h2 className={styles.title}>Analytics</h2>
            <p className={styles.subtitle}>
              Filter → KPI/Charts → Table drill → Export. Dashboard의 심층
              리포트 면.
            </p>
          </div>
          <div className={tableStyles.introActions}>
            <Button
              variant="primary"
              size="s"
              onClick={exportReport}
              data-primary-cta="true"
            >
              Export
            </Button>
          </div>
        </div>

        <div className={tableStyles.filterBar} role="group" aria-label="필터">
          <span className={tableStyles.filterLabel}>기간</span>
          <div className={tableStyles.filterGroup}>
            {(
              [
                ["7d", "7일"],
                ["30d", "30일"],
                ["90d", "90일"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                variant={period === value ? "secondary" : "ghost"}
                size="s"
                aria-pressed={period === value}
                onClick={() => setPeriod(value)}
              >
                {label}
              </Button>
            ))}
          </div>
          <span className={tableStyles.filterLabel}>세그먼트</span>
          <div className={tableStyles.filterGroup}>
            {(
              [
                ["all", "전체"],
                ["공공", "공공"],
                ["금융", "금융"],
                ["글로벌", "글로벌"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                variant={segment === value ? "secondary" : "ghost"}
                size="s"
                aria-pressed={segment === value}
                onClick={() => setSegment(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <section className={dashStyles.kpiRow} aria-label="KPI">
          {KPIS.map((kpi) => (
            <Card key={kpi.label} shadow="1" radius="8" padding="m">
              <Card.Body>
                <p className={dashStyles.kpiLabel}>{kpi.label}</p>
                <p className={dashStyles.kpiValue}>{kpi.value}</p>
                <p className={dashStyles.kpiHint}>{kpi.hint}</p>
              </Card.Body>
            </Card>
          ))}
        </section>

        <Card shadow="1" radius="8" padding="m">
          <Card.Header>
            <h3 className={cardStyles.title}>호출량 추이 ({period})</h3>
          </Card.Header>
          <Card.Body>
            <p className={dashStyles.chartSummary}>
              상대 지수. 텍스트 대안: 최고 D-1(88), 최저 D-6(45).
            </p>
            <div className={dashStyles.chartBlock}>
              <div className={dashStyles.bars} role="img" aria-hidden>
                {BARS.map((b) => (
                  <div key={b.label} className={dashStyles.barCol}>
                    <div
                      className={dashStyles.bar}
                      style={{ height: `${b.h}%` }}
                    />
                    <span className={dashStyles.barLabel}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>

        <Table density="dense" className={tableStyles.table}>
          <Table.Toolbar>
            <p className={tableStyles.total}>
              Drill · <strong>{rows.length}</strong>건 API
            </p>
          </Table.Toolbar>
          <Table.Scroll className={tableStyles.scroll}>
            <Table.Header>
              <Table.Row>
                <Table.Head>API</Table.Head>
                <Table.Head>세그먼트</Table.Head>
                <Table.Head align="right">호출</Table.Head>
                <Table.Head align="center">오류율</Table.Head>
                <Table.Head align="center">쿼터</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row) => (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.api}</Table.Cell>
                  <Table.Cell>{row.segment}</Table.Cell>
                  <Table.Cell align="right">
                    {row.calls.toLocaleString()}
                  </Table.Cell>
                  <Table.Cell align="center">{row.errors}</Table.Cell>
                  <Table.Cell align="center">{row.quota}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Scroll>
        </Table>
      </section>
    </AdminShell>
  );
}
