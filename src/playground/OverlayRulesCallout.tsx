import Link from "next/link";
import { OVERLAY_RULES } from "@/playground/decision-rules";
import styles from "@/app/(playground)/home.module.css";

export type OverlayRulesCalloutProps = {
  note?: string;
  primary?: boolean;
  showSource?: boolean;
  /** Highlight one overlay kind (e.g. on Dialog / Detail pages) */
  emphasize?: "Modal" | "Drawer" | "Bottom Sheet";
};

/**
 * Modal vs Drawer vs Bottom Sheet decision rules.
 */
export function OverlayRulesCallout({
  note,
  primary = false,
  showSource = true,
  emphasize,
}: OverlayRulesCalloutProps) {
  const rule = OVERLAY_RULES;
  const sides = [rule.modal, rule.drawer, rule.bottomSheet];

  return (
    <section
      className={
        primary
          ? `${styles.progressSection} ${styles.navRulePrimary}`
          : styles.progressSection
      }
      aria-labelledby="overlay-rules-title"
    >
      <div className={styles.progressHeader}>
        <h2 id="overlay-rules-title" className={styles.sectionTitle}>
          {rule.title}
        </h2>
        {showSource ? (
          <Link href="/principles#overlay-rules" className={styles.badge}>
            Principles →
          </Link>
        ) : null}
      </div>
      <p className={styles.sub} style={{ maxWidth: "none", marginBottom: 12 }}>
        {rule.summary}
      </p>
      <div className={styles.navRuleGrid3}>
        {sides.map((side) => (
          <div
            key={side.kind}
            className={
              emphasize === side.kind
                ? `${styles.navRuleCol} ${styles.navRuleColEmphasized}`
                : styles.navRuleCol
            }
            data-outcome={side.kind.toLowerCase().replace(/\s+/g, "-")}
          >
            <p className={styles.navRuleWhen}>{side.when}</p>
            <ul className={styles.navRuleIf}>
              {side.conditions.map((c) => (
                <li key={c}>
                  <span className={styles.navRuleIfLabel}>if</span> {c}
                </li>
              ))}
            </ul>
            <p className={styles.navRuleThen}>
              → <strong>{side.kind}</strong>
            </p>
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
