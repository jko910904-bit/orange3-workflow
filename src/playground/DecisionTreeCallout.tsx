import Link from "next/link";
import { UX_DECISION_TREE } from "@/playground/decision-tree";
import styles from "@/app/(playground)/home.module.css";

export type DecisionTreeCalloutProps = {
  note?: string;
  primary?: boolean;
  showSource?: boolean;
};

/**
 * UX Decision Tree — visual question → path sections.
 */
export function DecisionTreeCallout({
  note,
  primary = false,
  showSource = true,
}: DecisionTreeCalloutProps) {
  const tree = UX_DECISION_TREE;

  return (
    <section
      className={
        primary
          ? `${styles.progressSection} ${styles.navRulePrimary}`
          : styles.progressSection
      }
      aria-labelledby="decision-tree-title"
    >
      <div className={styles.progressHeader}>
        <h2 id="decision-tree-title" className={styles.sectionTitle}>
          {tree.title}
        </h2>
        {showSource ? (
          <Link href="/principles/decision-tree" className={styles.badge}>
            Full tree →
          </Link>
        ) : (
          <Link href="/principles#never-always" className={styles.badge}>
            Never / Always →
          </Link>
        )}
      </div>
      <p className={styles.sub} style={{ maxWidth: "none", marginBottom: 12 }}>
        {tree.summary}{" "}
        <Link href="/principles#never-always">Never / Always</Link>
        {" · "}
        <Link href="/principles#drawer-vs-page">Drawer vs Page</Link>
        {" · "}
        <Link href="/principles#button-rules">Button</Link>
        {" · "}
        <Link href="/principles#overlay-rules">Overlay</Link>.
      </p>
      <div className={styles.decisionTreeList}>
        {tree.nodes.map((node) => (
          <article key={node.id} className={styles.decisionNode}>
            <h3 className={styles.decisionQuestion}>{node.question}</h3>
            {node.nested ? (
              <div className={styles.decisionNested}>
                <p className={styles.navRuleNote}>
                  YES → {node.nested.question}
                </p>
                <div className={styles.decisionBranchRow}>
                  <div className={styles.decisionBranch} data-when="YES">
                    <p className={styles.decisionWhen}>
                      <span className={styles.decisionWhenBadge}>YES</span>
                    </p>
                    <ol className={styles.decisionChain}>
                      {node.nested.yes.path.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className={styles.decisionBranch} data-when="NO">
                    <p className={styles.decisionWhen}>
                      <span className={styles.decisionWhenBadge}>NO</span>
                    </p>
                    <ol className={styles.decisionChain}>
                      {node.nested.no.path.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.decisionBranchRow}>
                {node.yes ? (
                  <div className={styles.decisionBranch} data-when="YES">
                    <p className={styles.decisionWhen}>
                      <span className={styles.decisionWhenBadge}>YES</span>
                    </p>
                    <ol className={styles.decisionChain}>
                      {node.yes.path.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ) : null}
                {node.no ? (
                  <div className={styles.decisionBranch} data-when="NO">
                    <p className={styles.decisionWhen}>
                      <span className={styles.decisionWhenBadge}>NO</span>
                    </p>
                    <ol className={styles.decisionChain}>
                      {node.no.path.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </div>
            )}
          </article>
        ))}
      </div>
      <div className={styles.decisionCheat}>
        <p className={styles.navRuleWhen}>Surface cheat sheet</p>
        <ul className={styles.decisionCheatList}>
          <li>수정 + 목록 유지 → Drawer</li>
          <li>빠른 확인 → Drawer</li>
          <li>빠른 작업 → Modal</li>
          <li>삭제 → Confirm Dialog</li>
          <li>Primary = 1 · Search once on top · Design Kit only</li>
        </ul>
      </div>
      {note ? (
        <p className={styles.navRuleNote} style={{ marginTop: 12 }}>
          {note}
        </p>
      ) : null}
    </section>
  );
}
