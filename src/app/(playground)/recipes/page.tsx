import Link from "next/link";
import { listRecipes } from "@/catalog";
import styles from "../home.module.css";

export default function RecipesPage() {
  const recipes = listRecipes();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Recipes</p>
        <h1 className={styles.title}>Reusable UI blocks</h1>
        <p className={styles.sub}>
          Pattern보다 작은 단위입니다. AI가 화면을 생성할 때 가장 자주 고르는
          Component 조합입니다.
        </p>
      </header>

      <div className={styles.cardGrid}>
        {recipes.map((r) => (
          <Link
            key={r.id}
            href={`/recipes/${r.id}`}
            className={styles.card}
          >
            <div className={styles.cardTop}>
              <h3>{r.name}</h3>
              <span className={styles.status} data-status={r.status}>
                {r.status}
              </span>
            </div>
            <p>{r.description}</p>
            <p className={styles.sub} style={{ marginTop: 8 }}>
              {r.components.join(" + ")}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
