import { Button, Card } from "@/design-system/components";
import styles from "./pattern.module.css";
import cardStyles from "@/design-system/components/card/card.module.css";

const WIDGETS = [
  { title: "알림현황", items: ["서비스 점검 안내", "쿼터 80% 도달", "신규 API 출시"] },
  { title: "이용현황", items: ["DATA API · 사용중", "신용조회 · 대기", "기업정보 · 사용중"] },
  { title: "서비스 공지", items: ["5/22 정기점검", "약관 개정 안내", "가이드 업데이트"] },
];

export function DashboardPattern() {
  return (
    <section className={styles.pattern}>
      <div>
        <h2 className={styles.title}>Dashboard</h2>
        <p className={styles.subtitle}>마이페이지 요약 레이아웃</p>
      </div>
      <div className={styles.grid4}>
        {["진행중", "신청", "문의", "관심"].map((label, i) => (
          <Card key={label} shadow="1" radius="8" padding="m">
            <Card.Body>
              <p className={styles.subtitle}>{label}</p>
              <p className={styles.kpiValue}>{[3, 12, 1, 5][i]}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className={styles.grid2}>
        {WIDGETS.map((w) => (
          <Card key={w.title} shadow="1" radius="8" padding="m">
            <Card.Header>
              <h3 className={cardStyles.title}>{w.title}</h3>
              <Button variant="ghost" size="s">
                더보기
              </Button>
            </Card.Header>
            <Card.Body>
              <ul className={styles.mutedList}>
                {w.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
}
