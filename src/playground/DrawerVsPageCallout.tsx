import Link from "next/link";
import { DRAWER_VS_PAGE } from "@/playground/navigation-rules";
import styles from "@/app/(playground)/home.module.css";

export type DrawerVsPageCalloutProps = {
  /** Extra note under the two columns (pattern/screen-specific) */
  note?: string;
  /** Emphasize as primary decision callout */
  primary?: boolean;
  /** Show compact link to principles */
  showSource?: boolean;
};

/**
 * Concise two-column Drawer vs Page decision rules.
 */
export function DrawerVsPageCallout({
  note,
  primary = false,
  showSource = true,
}: DrawerVsPageCalloutProps) {
  const rule = DRAWER_VS_PAGE;

  return (
    <section
      className={
        primary
          ? `${styles.progressSection} ${styles.navRulePrimary}`
          : styles.progressSection
      }
      aria-labelledby="drawer-vs-page-title"
    >
      <div className={styles.progressHeader}>
        <h2 id="drawer-vs-page-title" className={styles.sectionTitle}>
          {rule.title}
        </h2>
        {showSource ? (
          <Link href="/principles#drawer-vs-page" className={styles.badge}>
            Principles →
          </Link>
        ) : null}
      </div>
      <p className={styles.sub} style={{ maxWidth: "none", marginBottom: 12 }}>
        {rule.summary}
      </p>
      <div className={styles.navRuleGrid}>
        <div className={styles.navRuleCol} data-outcome="drawer">
          <p className={styles.navRuleWhen}>{rule.drawer.when}</p>
          <ul className={styles.navRuleIf}>
            {rule.drawer.conditions.map((c) => (
              <li key={c}>
                <span className={styles.navRuleIfLabel}>if</span> {c}
              </li>
            ))}
          </ul>
          <p className={styles.navRuleThen}>
            → <strong>{rule.drawer.outcome}</strong>
          </p>
        </div>
        <div className={styles.navRuleCol} data-outcome="page">
          <p className={styles.navRuleWhen}>{rule.page.when}</p>
          <ul className={styles.navRuleIf}>
            {rule.page.conditions.map((c) => (
              <li key={c}>
                <span className={styles.navRuleIfLabel}>if</span> {c}
              </li>
            ))}
          </ul>
          <p className={styles.navRuleThen}>
            → <strong>{rule.page.outcome}</strong>
          </p>
        </div>
      </div>
      {note ? (
        <p className={styles.navRuleNote} style={{ marginTop: 12 }}>
          {note}
        </p>
      ) : null}
    </section>
  );
}
