import Link from "next/link";
import styles from "../../home.module.css";

export default function ComposerStubPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Playground · AI Composer</p>
        <h1 className={styles.title}>준비 중</h1>
        <p className={styles.sub}>
          Future AI Composer는 Design Kit 리소스만{" "}
          <strong>recommend / compose</strong>합니다. Color · Typography ·
          Radius · Components를 발명하지 않으며, 이 실험 페이지는 Kit을
          변경하지 않습니다.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/playground" className={styles.ctaGhost}>
            ← Playground
          </Link>
          <Link href="/screens" className={styles.ctaPrimary}>
            Browse Screens
          </Link>
        </div>
      </header>

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>Planned flow</h2>
        <p className={styles.sub} style={{ maxWidth: "none" }}>
          Prompt → UX Pattern / Screen 추천 → Kit 토큰·컴포넌트만으로 Compose →
          Preview. Generate CTA는 제품에 없으며, 현재는 정적 Screens로 화면을
          확인하세요.
        </p>
      </section>
    </main>
  );
}
