import Link from "next/link";
import { SCREEN_DOCS, statusLabel } from "@/playground/catalog";
import styles from "../home.module.css";

export default function ScreensPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Screens</p>
        <h1 className={styles.title}>Pattern combinations</h1>
        <p className={styles.sub}>
          Screen은 named UX Pattern(Task 단위)을 조합한 정적 화면 문서입니다.
          Pattern Before Screen — Compose UI이며 AI 생성이 아닙니다.
        </p>
      </header>

      <div className={styles.cardGrid}>
        {SCREEN_DOCS.map((t) => (
          <Link key={t.id} href={`/screens/${t.id}`} className={styles.card}>
            <div className={styles.cardTop}>
              <h3>{t.name}</h3>
              <span className={styles.status} data-status={t.status}>
                {statusLabel(t.status)}
              </span>
            </div>
            <p>{t.description}</p>
            {t.uxFlow && t.uxFlow.length > 0 ? (
              <p className={styles.sub} style={{ maxWidth: "none" }}>
                UX Flow: {t.uxFlow.map((s) => s.label).join(" → ")}
              </p>
            ) : (
              <p className={styles.sub} style={{ maxWidth: "none" }}>
                {t.patterns.join(" · ")}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
