"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { statusLabel, type ComponentDocEntry } from "@/playground/catalog";
import { DocDisclosure } from "@/playground/DocDisclosure";
import {
  DETAIL_SECTION_IDS,
  DETAIL_SECTION_LABELS,
  type PropDef,
  type RelatedPatternLink,
  type TokenEntry,
} from "./types";
import { CopyCode } from "./CopyCode";
import styles from "./ComponentDetail.module.css";

export type ComponentDetailLayoutProps = {
  doc: ComponentDocEntry;
  /** Interactive live preview — rendered first / sticky */
  preview: ReactNode;
  /** Property controls that drive the live preview */
  controls: ReactNode;
  /** Optional note under preview */
  previewNote?: ReactNode;
  /** Stretch preview stage (tables) */
  previewWide?: boolean;
  variants: ReactNode;
  variantsBlurb?: string;
  /** Optional sizes — folded under Variants when provided */
  sizes?: ReactNode;
  sizesBlurb?: string;
  states: ReactNode;
  statesBlurb?: string;
  props: PropDef[];
  tokens?: TokenEntry[];
  tokensBlurb?: string;
  code: string;
  accessibility?: string[];
  bestPractices: string[];
  related: RelatedPatternLink[];
  /** Extra content inside Decision Rule disclosure (callouts) */
  decisionRule?: ReactNode;
  /** Extra content inside Definition disclosure */
  definition?: ReactNode;
};

export function ComponentDetailLayout({
  doc,
  preview,
  controls,
  previewNote,
  previewWide,
  variants,
  variantsBlurb,
  sizes,
  sizesBlurb,
  states,
  statesBlurb,
  props,
  tokens,
  tokensBlurb,
  code,
  accessibility,
  bestPractices,
  related,
  decisionRule,
  definition,
}: ComponentDetailLayoutProps) {
  return (
    <main className={styles.page}>
      <p className={styles.breadcrumb}>
        <Link href="/components">Components</Link>
        <span>/</span>
        <span>{doc.name}</span>
      </p>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{doc.name}</h1>
        </div>
        <span className={styles.status} data-status={doc.status}>
          {statusLabel(doc.status)}
        </span>
      </header>

      <nav className={styles.toc} aria-label="On this page">
        {DETAIL_SECTION_IDS.map((id) => (
          <a key={id} href={`#${id}`}>
            {DETAIL_SECTION_LABELS[id]}
          </a>
        ))}
      </nav>

      {/* 1. Live Preview */}
      <section
        id="preview"
        className={styles.previewSticky}
        aria-labelledby="preview-heading"
      >
        <div>
          <p id="preview-heading" className={styles.previewLabel}>
            Live Preview
          </p>
          <div
            className={
              previewWide
                ? `${styles.previewStage} ${styles.previewStageWide}`
                : styles.previewStage
            }
          >
            {preview}
          </div>
          {previewNote ? (
            <p className={styles.controlHint} style={{ marginTop: 12 }}>
              {previewNote}
            </p>
          ) : null}
        </div>
        <aside className={styles.controls} aria-label="Preview properties">
          <p className={styles.previewLabel}>Properties</p>
          {controls}
        </aside>
      </section>

      {/* 2. Variants (+ Sizes) */}
      <Section id="variants" title="Variants" blurb={variantsBlurb}>
        <div className={styles.panel}>{variants}</div>
        {sizes ? (
          <div className={styles.sizesBlock}>
            <h3 className={styles.subSectionTitle}>Sizes</h3>
            {sizesBlurb ? (
              <p className={styles.sectionBlurb}>{sizesBlurb}</p>
            ) : null}
            <div className={styles.panel}>{sizes}</div>
          </div>
        ) : null}
      </Section>

      {/* 3. States */}
      <Section id="states" title="States" blurb={statesBlurb}>
        <div className={styles.panel}>{states}</div>
      </Section>

      {/* 4. Properties */}
      <Section id="properties" title="Properties">
        <div className={styles.panel} style={{ overflowX: "auto" }}>
          <PropTable props={props} />
        </div>
      </Section>

      {/* 5. Code */}
      <Section id="code" title="Code">
        <div className={styles.panel}>
          <CopyCode code={code} />
        </div>
      </Section>

      {/* 6–8. Collapsed docs */}
      <div className={styles.docStack}>
        <DocDisclosure id="definition" title="정의">
          {definition ?? (
            <>
              <p>{doc.summary}</p>
              {accessibility && accessibility.length > 0 ? (
                <>
                  <p>
                    <strong>Accessibility</strong>
                  </p>
                  <ul>
                    {accessibility.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {tokens && tokens.length > 0 ? (
                <>
                  <p>
                    <strong>Design Token</strong>
                    {tokensBlurb ? ` — ${tokensBlurb}` : null}
                  </p>
                  <ul>
                    {tokens.map((t) => (
                      <li key={t.name}>
                        <code>{t.name}</code> — {t.role}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </>
          )}
        </DocDisclosure>

        <DocDisclosure id="best-practice" title="Best Practice">
          <ul>
            {bestPractices.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </DocDisclosure>

        <DocDisclosure id="decision-rule" title="Decision Rule">
          {decisionRule}
          {related.length > 0 ? (
            <div className={styles.relatedInDisclosure}>
              <p>
                <strong>Related Pattern</strong>
              </p>
              <ul>
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={r.href}>{r.name}</Link>
                    {r.note ? ` — ${r.note}` : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </DocDisclosure>
      </div>
    </main>
  );
}

function Section({
  id,
  title,
  blurb,
  children,
}: {
  id: string;
  title: string;
  blurb?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.sectionTitle}>
        {title}
      </h2>
      {blurb ? <p className={styles.sectionBlurb}>{blurb}</p> : null}
      {children}
    </section>
  );
}

function PropTable({ props }: { props: PropDef[] }) {
  return (
    <table className={styles.propTable}>
      <thead>
        <tr>
          <th scope="col">Prop</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((p) => (
          <tr key={p.name}>
            <td className={styles.propName}>{p.name}</td>
            <td className={styles.propType}>{p.type}</td>
            <td className={styles.propDefault}>{p.defaultValue ?? "—"}</td>
            <td>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
