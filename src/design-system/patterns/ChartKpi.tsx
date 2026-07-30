import { Card } from "@/design-system/components";
import styles from "./pattern.module.css";
import cardStyles from "@/design-system/components/card/card.module.css";

const KPIS = [
  { label: "금월 호출", value: "12,480" },
  { label: "오류율", value: "1.2%" },
  { label: "잔여 쿼터", value: "80%" },
  { label: "활성 API", value: "24" },
];

const BARS = [40, 70, 55, 90, 65, 80];

export function ChartKpiPattern() {
  return (
    <section className={styles.pattern}>
      <div>
        <h2 className={styles.title}>Chart + KPI</h2>
        <p className={styles.subtitle}>지표 카드와 요약 차트</p>
      </div>
      <div className={styles.grid4}>
        {KPIS.map((kpi) => (
          <Card key={kpi.label} shadow="1" radius="8" padding="m">
            <Card.Body>
              <p className={styles.subtitle}>{kpi.label}</p>
              <p className={styles.kpiValue}>{kpi.value}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className={styles.grid2}>
        <Card shadow="1" radius="8" padding="m">
          <Card.Header>
            <h3 className={cardStyles.title}>이용계약정보</h3>
          </Card.Header>
          <Card.Body>
            <div className={styles.chartBlock}>
              <div className={styles.donut} aria-hidden />
              <p className={styles.subtitle} style={{ textAlign: "center" }}>
                8,000 / 10,000 사용
              </p>
            </div>
          </Card.Body>
        </Card>
        <Card shadow="1" radius="8" padding="m">
          <Card.Header>
            <h3 className={cardStyles.title}>최근 6개월 이용 통계</h3>
          </Card.Header>
          <Card.Body>
            <div className={styles.chartBlock}>
              <div className={styles.bars} aria-hidden>
                {BARS.map((h, i) => (
                  <div
                    key={i}
                    className={styles.bar}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}
