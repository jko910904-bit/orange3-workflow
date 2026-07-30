import Link from "next/link";
import { COMPONENT_DOCS, PATTERN_DOCS, PLAYGROUND_NAV } from "@/playground/catalog";
import { listRecipes } from "@/catalog";
import { listCatalogComponents } from "@/catalog";
import styles from "./home.module.css";

export default function PlaygroundHomePage() {
  const recipes = listRecipes();
  const registryCount = listCatalogComponents().length;
  const ready = COMPONENT_DOCS.filter((c) => c.status === "ready").length;
  const partial = COMPONENT_DOCS.filter((c) => c.status === "partial").length;
  const recent = [...COMPONENT_DOCS].reverse().slice(0, 4);

  const progress = [
    { label: "Components", value: COMPONENT_DOCS.length, href: "/components" },
    { label: "Recipes", value: recipes.length, href: "/recipes" },
    { label: "Patterns", value: PATTERN_DOCS.length, href: "/patterns" },
    { label: "Templates", value: 5, href: "/templates" },
    { label: "Registry", value: registryCount, href: "/registry" },
    { label: "AI Metadata", value: registryCount, href: "/ai-metadata" },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Home · AI Screen Generator</p>
        <h1 className={styles.title}>Design System Playground</h1>
        <p className={styles.sub}>
          자연어 Prompt → Pattern/Recipe/Component 선택 → React UI. 사람과 AI가
          같은 Registry를 봅니다.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/prompt" className={styles.ctaPrimary}>
            Open Prompt Playground
          </Link>
          <Link href="/components/button" className={styles.ctaGhost}>
            Button docs
          </Link>
        </div>
      </header>

      <section className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <h2 className={styles.sectionTitle}>Progress</h2>
          <p className={styles.badge}>
            Components {ready} ready · {partial} partial
          </p>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${Math.round(
                (ready / Math.max(COMPONENT_DOCS.length, 1)) * 100,
              )}%`,
            }}
          />
        </div>
        <div className={styles.statGrid}>
          {progress.map((p) => (
            <Link key={p.label} href={p.href} className={styles.statCard}>
              <span className={styles.statValue}>{p.value}</span>
              <span className={styles.statLabel}>{p.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Recent components</h2>
        <div className={styles.cardGrid}>
          {recent.map((c) => (
            <Link
              key={c.slug}
              href={`/components/${c.slug}`}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <h3>{c.name}</h3>
                <span className={styles.status} data-status={c.status}>
                  {c.status}
                </span>
              </div>
              <p>{c.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Explore</h2>
        <div className={styles.cardGrid}>
          {PLAYGROUND_NAV.filter((n) => n.href !== "/").map((item) => (
            <Link key={item.href} href={item.href} className={styles.card}>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
