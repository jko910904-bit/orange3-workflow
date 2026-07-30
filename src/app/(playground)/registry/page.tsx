"use client";

import { useMemo, useState } from "react";
import { Button } from "@/design-system/components";
import {
  getCatalogComponent,
  listCatalogComponentIds,
} from "@/catalog";
import styles from "./registry.module.css";

export default function RegistryViewerPage() {
  const ids = listCatalogComponentIds();
  const [selected, setSelected] = useState(ids[0] ?? "button");
  const data = getCatalogComponent(selected);
  const json = useMemo(
    () => (data ? JSON.stringify(data, null, 2) : "{}"),
    [data],
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Registry Viewer</p>
        <h1 className={styles.title}>JSON component registry</h1>
        <p className={styles.sub}>
          `src/catalog/components/*.json` — Purpose · Aliases · AI Rules · Figma
          Mapping
        </p>
      </header>

      <div className={styles.row}>
        {ids.map((id) => (
          <Button
            key={id}
            size="s"
            variant={selected === id ? "primary" : "ghost"}
            onClick={() => setSelected(id)}
          >
            {id}.json
          </Button>
        ))}
        <Button
          size="s"
          variant="secondary"
          onClick={() => navigator.clipboard.writeText(json)}
        >
          Copy JSON
        </Button>
      </div>

      {data ? (
        <div className={styles.metaGrid}>
          {(
            [
              ["Purpose", data.purpose],
              ["Aliases", data.aliases.join(", ")],
              ["Dependencies", data.dependencies.join(", ")],
              ["Variants", data.variants.join(", ")],
              ["States", data.states.join(", ")],
              ["Accessibility", data.accessibility.join(" · ")],
              [
                "AI Rules",
                data.aiRules.map((r) => r.id).join(", "),
              ],
              ["Figma Mapping", data.figmaMapping.join(" · ")],
            ] as const
          ).map(([label, value]) => (
            <article key={label} className={styles.metaCard}>
              <h2>{label}</h2>
              <p>{value}</p>
            </article>
          ))}
        </div>
      ) : null}

      <section className={styles.codePanel}>
        <h2 className={styles.sectionTitle}>{selected}.json</h2>
        <pre className={styles.code}>{json}</pre>
      </section>
    </main>
  );
}
