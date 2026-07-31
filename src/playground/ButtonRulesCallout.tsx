import Link from "next/link";
import { BUTTON_RULES } from "@/playground/decision-rules";
import styles from "@/app/(playground)/home.module.css";

export type ButtonRulesCalloutProps = {
  note?: string;
  primary?: boolean;
  showSource?: boolean;
};

/**
 * Button variant decision rules (Primary / Secondary / Danger / Ghost).
 */
export function ButtonRulesCallout({
  note,
  primary = false,
  showSource = true,
}: ButtonRulesCalloutProps) {
  const rule = BUTTON_RULES;

  return (
    <section
      className={
        primary
          ? `${styles.progressSection} ${styles.navRulePrimary}`
          : styles.progressSection
      }
      aria-labelledby="button-rules-title"
    >
      <div className={styles.progressHeader}>
        <h2 id="button-rules-title" className={styles.sectionTitle}>
          {rule.title}
        </h2>
        {showSource ? (
          <Link href="/principles#button-rules" className={styles.badge}>
            Principles →
          </Link>
        ) : null}
      </div>
      <p className={styles.sub} style={{ maxWidth: "none", marginBottom: 12 }}>
        {rule.summary}
      </p>
      <div className={styles.navRuleGrid}>
        {rule.variants.map((v) => (
          <div
            key={v.variant}
            className={styles.navRuleCol}
            data-outcome={v.variant}
          >
            <p className={styles.navRuleWhen}>{v.when}</p>
            <ul className={styles.navRuleIf}>
              {v.conditions.map((c) => (
                <li key={c}>
                  <span className={styles.navRuleIfLabel}>if</span> {c}
                </li>
              ))}
            </ul>
            <p className={styles.navRuleThen}>
              → <strong>{v.variant}</strong>
            </p>
            {v.note ? (
              <p className={styles.navRuleNote} style={{ marginTop: 8 }}>
                {v.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      {note ? (
        <p className={styles.navRuleNote} style={{ marginTop: 12 }}>
          {note}
        </p>
      ) : null}
    </section>
  );
}
