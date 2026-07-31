import Link from "next/link";
import {
  PATTERN_GROUPS,
  UX_PATTERNS,
  statusLabel,
} from "@/playground/catalog";
import { patternsByGroup } from "@/playground/ux-patterns";
import styles from "../home.module.css";

export default function PatternsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>UX Patterns</p>
        <h1 className={styles.title}>Preview · Flow · Layout</h1>
        <p className={styles.sub}>
          {UX_PATTERNS.length} patterns · Pattern을 보고 Compose합니다. Definition은
          상세에서 필요할 때 펼칩니다.
        </p>
      </header>

      {PATTERN_GROUPS.map((group) => {
        const items = patternsByGroup(group.id);
        return (
          <section key={group.id} className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <h2 className={styles.sectionTitle}>{group.label}</h2>
              <p className={styles.badge}>{items.length}</p>
            </div>
            <div className={styles.cardGrid}>
              {items.map((p) => (
                <Link
                  key={p.id}
                  href={`/patterns/${p.id}`}
                  className={styles.card}
                >
                  <div className={styles.cardTop}>
                    <h3>{p.name}</h3>
                    <span className={styles.status} data-status={p.status}>
                      {statusLabel(p.status)}
                    </span>
                  </div>
                  {p.composePreview || p.registryId ? (
                    <p className={styles.badge} style={{ alignSelf: "flex-start" }}>
                      Preview
                    </p>
                  ) : (
                    <p style={{ margin: 0, color: "var(--color-grey-500)", fontSize: "var(--typography-caption2-fontSize)" }}>
                      Preview 준비 중
                    </p>
                  )}
                  {p.parts.length > 0 ? (
                    <p className={styles.sub} style={{ maxWidth: "none" }}>
                      {p.parts.slice(0, 4).join(" · ")}
                      {p.parts.length > 4 ? "…" : ""}
                    </p>
                  ) : (
                    <p className={styles.sub} style={{ maxWidth: "none" }}>
                      {p.userTasks.slice(0, 3).join(" · ") || p.includedComponents.slice(0, 3).join(" · ")}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
