import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipe, listRecipes } from "@/catalog";
import type { RecipeId } from "@/types/recipe";
import styles from "../../home.module.css";

export function generateStaticParams() {
  return listRecipes().map((r) => ({ id: r.id }));
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = getRecipe(id as RecipeId);
  if (!recipe) notFound();

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>
        <Link href="/recipes">Recipes</Link> / {recipe.id}
      </p>
      <header className={styles.header}>
        <h1 className={styles.title}>{recipe.name}</h1>
        <p className={styles.sub}>{recipe.description}</p>
      </header>

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>Components</h2>
        <ul>
          {recipe.components.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>JSON</h2>
        <pre
          style={{
            overflow: "auto",
            background: "#111",
            color: "#f5f5f5",
            padding: 12,
            borderRadius: 4,
            fontSize: 12,
          }}
        >
          {JSON.stringify(recipe, null, 2)}
        </pre>
      </section>

      <Link href="/prompt" className={styles.ctaPrimary}>
        Try in Prompt Playground
      </Link>
    </main>
  );
}
