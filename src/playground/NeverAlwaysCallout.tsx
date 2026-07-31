import Link from "next/link";
import { NEVER_ALWAYS } from "@/playground/never-always";
import styles from "@/app/(playground)/home.module.css";

export type NeverAlwaysCalloutProps = {
  note?: string;
  primary?: boolean;
  showSource?: boolean;
  /** Compact hub strip — Never list + Always only */
  brief?: boolean;
};

/**
 * Never / Always hard constraints callout.
 */
export function NeverAlwaysCallout({
  note,
  primary = false,
  showSource = true,
  brief = false,
}: NeverAlwaysCalloutProps) {
  const rule = NEVER_ALWAYS;

  return (
    <section
      className={
        primary
          ? `${styles.progressSection} ${styles.navRulePrimary}`
          : styles.progressSection
      }
      aria-labelledby="never-always-title"
      id={brief ? undefined : "never-always"}
    >
      <div className={styles.progressHeader}>
        <h2 id="never-always-title" className={styles.sectionTitle}>
          {rule.title}
        </h2>
        {showSource ? (
          <Link href="/principles#never-always" className={styles.badge}>
            Principles →
          </Link>
        ) : null}
      </div>
      <p className={styles.sub} style={{ maxWidth: "none", marginBottom: 12 }}>
        {rule.summary}
      </p>
      <div className={styles.navRuleGrid}>
        <div className={styles.navRuleCol} data-outcome="never">
          <p className={styles.navRuleWhen}>Never</p>
          <ul className={styles.navRuleIf}>
            {(brief ? rule.never.slice(0, 4) : rule.never).map((item) => (
              <li key={item.id}>
                <span className={styles.neverBadge}>Never</span> {item.statement}
              </li>
            ))}
            {brief && rule.never.length > 4 ? (
              <li>
                <Link href="/principles#never-always">+ 나머지 보기</Link>
              </li>
            ) : null}
          </ul>
        </div>
        <div className={styles.navRuleCol} data-outcome="always">
          <p className={styles.navRuleWhen}>Always</p>
          <ul className={styles.navRuleIf}>
            {rule.always.map((item) => (
              <li key={item.id}>
                <span className={styles.alwaysBadge}>Always</span>{" "}
                {item.statement}
              </li>
            ))}
          </ul>
          <p className={styles.navRuleThen}>
            → <strong>Foundation → Components → Patterns → Screens</strong>
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
