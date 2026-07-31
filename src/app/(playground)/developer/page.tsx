import Link from "next/link";
import {
  COMPONENT_DOCS,
  PATTERN_DOCS,
  PRIMARY_NAV,
  SCREEN_DOCS,
  statusLabel,
} from "@/playground/catalog";
import { listScreenRecipes } from "@/playground/recipe-catalog";
import { listRecipes, listCatalogComponents } from "@/catalog";
import styles from "../home.module.css";

export default function DeveloperHomePage() {
  const recipes = listRecipes();
  const screenRecipes = listScreenRecipes();
  const registryCount = listCatalogComponents().length;
  const ready = COMPONENT_DOCS.filter((c) => c.status === "ready").length;
  const partial = COMPONENT_DOCS.filter((c) => c.status === "partial").length;
  const recent = [...COMPONENT_DOCS].reverse().slice(0, 4);

  const progress = [
    { label: "Components", value: COMPONENT_DOCS.length, href: "/components" },
    {
      label: "Screen Recipes",
      value: screenRecipes.length,
      href: "/recipes",
    },
    { label: "Kit Recipes", value: recipes.length, href: "/registry" },
    { label: "UX Patterns", value: PATTERN_DOCS.length, href: "/patterns" },
    { label: "Screens", value: SCREEN_DOCS.length, href: "/screens" },
    { label: "Registry", value: registryCount, href: "/registry" },
    { label: "AI Metadata", value: registryCount, href: "/ai-metadata" },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Playground · Developer</p>
        <h1 className={styles.title}>Internal structure explorer</h1>
        <p className={styles.sub}>
          Pattern · Recipe · Component Registry · JSON · AI Metadata를 확인하는
          실험 공간입니다. Design Kit은 변경하지 않습니다.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/" className={styles.ctaPrimary}>
            JKO Home
          </Link>
          <Link href="/playground" className={styles.ctaGhost}>
            Playground
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
                  {statusLabel(c.status)}
                </span>
              </div>
              <p>{c.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Primary IA</h2>
        <div className={styles.cardGrid}>
          {PRIMARY_NAV.filter((n) => n.href !== "/").map((item) => (
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
