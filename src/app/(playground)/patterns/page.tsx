import Link from "next/link";
import { PATTERN_DOCS } from "@/playground/catalog";
import styles from "../home.module.css";

export default function PatternsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Patterns</p>
        <h1 className={styles.title}>Screen patterns</h1>
        <p className={styles.sub}>
          Recipe와 Component를 조립한 화면 단위입니다. 클릭하면 Preview · JSON ·
          Generate로 이동합니다.
        </p>
      </header>

      <div className={styles.cardGrid}>
        {PATTERN_DOCS.map((p) => (
          <Link key={p.id} href={`/patterns/${p.id}`} className={styles.card}>
            <div className={styles.cardTop}>
              <h3>{p.name}</h3>
              <span className={styles.status} data-status={p.status}>
                {p.status}
              </span>
            </div>
            <p>{p.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
