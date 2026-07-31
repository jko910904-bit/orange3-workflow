"use client";

import { useMemo, useState } from "react";
import { Button } from "@/design-system/components";
import {
  getCatalogComponent,
  listCatalogComponents,
} from "@/catalog";
import styles from "./ai-metadata.module.css";

export default function AiMetadataPage() {
  const all = listCatalogComponents();
  const [selected, setSelected] = useState(all[0]?.id ?? "button");
  const data = getCatalogComponent(selected);
  const json = useMemo(
    () => (data ? JSON.stringify(data, null, 2) : "{}"),
    [data],
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>AI Metadata</p>
        <h1 className={styles.title}>Human + AI documentation</h1>
        <p className={styles.sub}>
          카드형 문서로 Purpose / Aliases / Rules / Prompt Examples를 읽습니다.
        </p>
      </header>

      <div className={styles.row}>
        {all.map((c) => (
          <Button
            key={c.id}
            size="s"
            variant={selected === c.id ? "primary" : "ghost"}
            onClick={() => setSelected(c.id)}
          >
            {c.name}
          </Button>
        ))}
      </div>

      {data ? (
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h2>Purpose</h2>
            <p>{data.purpose}</p>
          </article>
          <article className={styles.card}>
            <h2>Aliases</h2>
            <div className={styles.tags}>
              {data.aliases.map((a) => (
                <span key={a} className={styles.tag}>
                  {a}
                </span>
              ))}
            </div>
          </article>
          <article className={styles.card}>
            <h2>Dependencies</h2>
            <p>{data.dependencies.join(" · ")}</p>
          </article>
          <article className={styles.card}>
            <h2>Accessibility</h2>
            <ul>
              {data.accessibility.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </article>
          <article className={`${styles.card} ${styles.wide}`}>
            <h2>AI Rules</h2>
            <ul className={styles.rules}>
              {data.aiRules.map((r) => (
                <li key={r.id}>
                  <code>{r.id}</code>
                  <span>
                    → {r.then.component}.{r.then.variant ?? "Default"}
                  </span>
                </li>
              ))}
            </ul>
          </article>
          <article className={`${styles.card} ${styles.wide}`}>
            <h2>Prompt Examples</h2>
            <ul>
              {(data.promptExamples ?? []).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
          <article className={`${styles.card} ${styles.wide}`}>
            <h2>JSON Preview</h2>
            <pre className={styles.code}>{json}</pre>
          </article>
        </div>
      ) : null}
    </main>
  );
}
