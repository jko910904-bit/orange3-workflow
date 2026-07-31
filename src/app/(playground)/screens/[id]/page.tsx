"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getScreenDoc,
  PATTERN_HREF,
  statusLabel,
  type ScreenFlowStep,
} from "@/playground/catalog";
import { ButtonRulesCallout } from "@/playground/ButtonRulesCallout";
import { DrawerVsPageCallout } from "@/playground/DrawerVsPageCallout";
import { OverlayRulesCallout } from "@/playground/OverlayRulesCallout";
import { BUTTON_RULES, OVERLAY_RULES } from "@/playground/decision-rules";
import { DRAWER_VS_PAGE } from "@/playground/navigation-rules";
import { ADMIN_LAYOUT } from "@/playground/layout-admin";
import { ScreenLivePreview } from "@/playground/ScreenLivePreview";
import styles from "../../home.module.css";

function ScreenPreview({ id }: { id: string }) {
  return <ScreenLivePreview screenId={id} />;
}

function UxFlowDiagram({
  screenName,
  steps,
}: {
  screenName: string;
  steps: ScreenFlowStep[];
}) {
  return (
    <section className={styles.flowSection} aria-label="UX Flow">
      <h2 className={styles.sectionTitle}>UX Flow</h2>
      <p className={styles.sub} style={{ maxWidth: "none", marginBottom: 16 }}>
        Screen의 1차 구조입니다. Pattern 목록보다 이 흐름을 우선합니다.
      </p>
      <ol className={styles.uxFlow}>
        <li className={styles.uxFlowScreen}>{screenName}</li>
        {steps.map((step) => (
          <li key={step.id} className={styles.uxFlowStep}>
            <span className={styles.uxFlowArrow} aria-hidden>
              ↓
            </span>
            <div className={styles.uxFlowCard}>
              <strong className={styles.uxFlowLabel}>{step.label}</strong>
              <p className={styles.uxFlowMapping}>{step.mapping}</p>
              <ul className={styles.uxFlowPatterns}>
                {step.patterns.map((p) => (
                  <li key={`${step.id}-${p}`}>
                    <Link href={PATTERN_HREF[p] ?? "/patterns"}>{p}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ScreenDetailPage() {
  const params = useParams<{ id: string }>();
  const doc = getScreenDoc(params.id);

  if (!doc) {
    return <p>Screen not found</p>;
  }

  const isMember = doc.id === "member-management";

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>
        <Link href="/screens">Screens</Link> / {doc.name}
      </p>
      <header className={styles.header}>
        <div className={styles.cardTop} style={{ alignItems: "flex-start" }}>
          <h1 className={styles.title}>{doc.name}</h1>
          <span className={styles.status} data-status={doc.status}>
            {statusLabel(doc.status)}
          </span>
        </div>
        <p className={styles.sub}>{doc.description}</p>
        <p className={styles.sub}>
          Screen = named Pattern 조합 문서입니다. Pattern Before Screen —
          Compose UI이며 생성(Generate)이 아닙니다.
        </p>
      </header>

      {isMember ? (
        <>
          <p className={styles.sub} style={{ maxWidth: "none" }}>
            Layout: Admin {ADMIN_LAYOUT.columns}-grid · Desktop{" "}
            {ADMIN_LAYOUT.canvas} · Sidebar {ADMIN_LAYOUT.sidebar} · Content{" "}
            {ADMIN_LAYOUT.content}. See{" "}
            <Link href="/foundations#grid">/foundations#grid</Link> ·{" "}
            <Link href="/principles#admin-layout">/principles#admin-layout</Link>
            .
          </p>
          <DrawerVsPageCallout note={DRAWER_VS_PAGE.apply.member} />
          <ButtonRulesCallout note={BUTTON_RULES.apply.member} />
          <OverlayRulesCallout
            emphasize="Drawer"
            note={`${OVERLAY_RULES.apply.detail} ${OVERLAY_RULES.apply.delete}`}
          />
        </>
      ) : null}

      {doc.uxFlow && doc.uxFlow.length > 0 ? (
        <UxFlowDiagram screenName={doc.name} steps={doc.uxFlow} />
      ) : null}

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>Composed patterns</h2>
        <p className={styles.sub} style={{ maxWidth: "none", marginBottom: 12 }}>
          흐름에 따라 Compose되는 Pattern 요약입니다.
        </p>
        <ul>
          {doc.patterns.map((p) => (
            <li key={p}>
              <Link href={PATTERN_HREF[p] ?? "/patterns"}>{p}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>Live preview</h2>
        <ScreenPreview id={doc.id} />
      </section>
    </main>
  );
}
