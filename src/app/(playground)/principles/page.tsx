import Link from "next/link";
import { ButtonRulesCallout } from "@/playground/ButtonRulesCallout";
import { DecisionTreeCallout } from "@/playground/DecisionTreeCallout";
import { DESIGNER_JUDGMENT } from "@/playground/designer-judgment";
import { DrawerVsPageCallout } from "@/playground/DrawerVsPageCallout";
import { NeverAlwaysCallout } from "@/playground/NeverAlwaysCallout";
import { OverlayRulesCallout } from "@/playground/OverlayRulesCallout";
import { JKO_UX_RULES } from "@/playground/ux-principles";
import styles from "../home.module.css";

export default function PrinciplesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Design Kit · Principles</p>
        <h1 className={styles.title}>JKO UX Rules</h1>
        <p className={styles.sub}>
          운영 Admin/Portal 화면의 공통 UX 규칙(8)입니다. Pattern·Screen Compose
          전 <strong>판단 순서</strong> → Never/Always → Decision Tree. Canonical
          text is Korean.
        </p>
        <p className={styles.sub}>
          Knowledge Base: <code>docs/README.md</code> (01–12) ·{" "}
          <code>docs/UX_RULES.md</code> ·{" "}
          <code>docs/principles/designer-judgment.md</code> ·{" "}
          <Link href="/principles/decision-tree">Decision Tree</Link>
          {" · "}
          <Link href="/patterns">UX Patterns</Link>
        </p>
      </header>

      <section
        id="designer-judgment"
        className={`${styles.progressSection} ${styles.navRulePrimary}`}
        aria-labelledby="designer-judgment-title"
      >
        <div className={styles.progressHeader}>
          <h2 id="designer-judgment-title" className={styles.sectionTitle}>
            판단 순서 · {DESIGNER_JUDGMENT.title}
          </h2>
        </div>
        <p className={styles.sub} style={{ maxWidth: "none", marginBottom: 12 }}>
          {DESIGNER_JUDGMENT.summary} Source:{" "}
          <code>docs/principles/designer-judgment.md</code> ·{" "}
          <code>src/playground/designer-judgment.ts</code>
        </p>
        <ol className={styles.principleList}>
          {DESIGNER_JUDGMENT.steps.map((step) => (
            <li key={step.id} className={styles.principleListItem}>
              <span className={styles.principleId}>{step.id}</span>
              <div>
                <p className={styles.principleStatement}>{step.question}</p>
                <p className={styles.principleKey}>
                  <code>{step.key}</code>
                </p>
              </div>
            </li>
          ))}
        </ol>
        <ul className={styles.navRuleIf} style={{ marginTop: 12 }}>
          {DESIGNER_JUDGMENT.hardConstraints.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <NeverAlwaysCallout
        primary
        showSource={false}
        note="Source: NEVER_ALWAYS · docs/principles/never-always.md · Primary=1 · Search once on top · no inventing tokens"
      />

      <div id="decision-tree">
        <DecisionTreeCallout
          primary
          note="Canonical tree: docs/principles/ux-decision-tree.md · /principles/decision-tree"
        />
      </div>

      <div id="drawer-vs-page">
        <DrawerVsPageCallout
          primary
          showSource={false}
          note="Source: DRAWER_VS_PAGE · 수정+목록 유지=Drawer. 빠른 확인=Drawer (≠ 빠른 작업=Modal). See Decision Tree."
        />
      </div>

      <div id="button-rules">
        <ButtonRulesCallout
          primary
          showSource={false}
          note="Source: BUTTON_RULES · src/playground/decision-rules.ts · See also /components/button · 삭제=Danger+Confirm"
        />
      </div>

      <div id="overlay-rules">
        <OverlayRulesCallout
          primary
          showSource={false}
          note="Source: OVERLAY_RULES · 빠른 작업=Modal · 수정/빠른 확인/목록 유지=Drawer · 삭제=Confirm Dialog · Never: Modal 안에 Modal"
        />
      </div>

      <ol className={styles.principleList}>
        {JKO_UX_RULES.map((p) => (
          <li key={p.id} className={styles.principleListItem}>
            <span className={styles.principleId}>{p.id}</span>
            <div>
              <p className={styles.principleStatement}>{p.statement}</p>
              <p className={styles.principleKey}>
                <code>{p.key}</code>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
