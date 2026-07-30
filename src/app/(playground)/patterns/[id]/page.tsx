"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/design-system/components";
import { ScreenRenderer } from "@/generator/renderer/ScreenRenderer";
import { PATTERN_DOCS } from "@/playground/catalog";
import type { PatternId } from "@/types";
import styles from "../../home.module.css";

export default function PatternDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const doc = PATTERN_DOCS.find((p) => p.id === params.id);

  if (!doc) {
    return <p>Pattern not found</p>;
  }

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>
        <Link href="/patterns">Patterns</Link> / {doc.name}
      </p>
      <header className={styles.header}>
        <h1 className={styles.title}>{doc.name}</h1>
        <p className={styles.sub}>{doc.description}</p>
        <div className={styles.ctaRow}>
          <Button
            variant="primary"
            size="m"
            onClick={() =>
              router.push(
                `/prompt?q=${encodeURIComponent(`${doc.name} 화면 만들어줘`)}`,
              )
            }
          >
            Generate
          </Button>
        </div>
      </header>

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>Preview</h2>
        <ScreenRenderer
          patterns={[{ id: doc.registryId as PatternId }]}
          surface="admin"
        />
      </section>

      <div className={styles.cardGrid}>
        <section className={styles.progressSection}>
          <h2 className={styles.sectionTitle}>Used Components</h2>
          <ul>
            {doc.components.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
        <section className={styles.progressSection}>
          <h2 className={styles.sectionTitle}>Used Recipes</h2>
          <ul>
            {doc.recipes.length === 0 ? (
              <li>—</li>
            ) : (
              doc.recipes.map((r) => (
                <li key={r}>
                  <Link href={`/recipes/${r}`}>{r}</Link>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

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
          {JSON.stringify(doc, null, 2)}
        </pre>
      </section>
    </main>
  );
}
