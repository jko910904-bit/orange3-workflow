import Link from "next/link";
import styles from "../home.module.css";

export default function SettingsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Settings</p>
        <h1 className={styles.title}>Design Kit admin</h1>
        <p className={styles.sub}>
          Design Kit 관리 설정 자리표시자입니다.{" "}
          <strong>Foundation은 관리자만 수정</strong>할 수 있습니다.
        </p>
      </header>

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>준비 중</h2>
        <ul className={styles.sub} style={{ maxWidth: "none" }}>
          <li>Foundation 토큰 편집 권한 (admin-only)</li>
          <li>Component / UX Pattern 카탈로그 게시 워크플로</li>
          <li>Surface density 기본값 (Admin Dense / Portal Comfortable)</li>
        </ul>
        <div className={styles.ctaRow}>
          <Link href="/foundations" className={styles.ctaPrimary}>
            View Foundation
          </Link>
          <Link href="/" className={styles.ctaGhost}>
            ← Home
          </Link>
        </div>
      </section>

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>Developer</h2>
        <p className={styles.sub} style={{ maxWidth: "none" }}>
          Knowledge Explorer는 기본 탐색 경로가 아닙니다. 딥링크·검색용으로만
          유지합니다.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/knowledge" className={styles.ctaGhost}>
            Knowledge (dev)
          </Link>
        </div>
      </section>
    </main>
  );
}
