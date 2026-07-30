"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Table,
} from "@/design-system/components";
import { getCatalogComponent } from "@/catalog";
import type { ComponentDocEntry } from "@/playground/catalog";
import styles from "./ComponentExplorer.module.css";

type Tab =
  | "preview"
  | "variants"
  | "sizes"
  | "states"
  | "accessibility"
  | "code"
  | "metadata"
  | "json"
  | "prompts";

const TABS: { id: Tab; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "variants", label: "Variants" },
  { id: "sizes", label: "Sizes" },
  { id: "states", label: "States" },
  { id: "accessibility", label: "Accessibility" },
  { id: "code", label: "Code Example" },
  { id: "metadata", label: "AI Metadata" },
  { id: "json", label: "JSON Preview" },
  { id: "prompts", label: "Prompt Examples" },
];

export function ComponentExplorer({ doc }: { doc: ComponentDocEntry }) {
  const [tab, setTab] = useState<Tab>("preview");
  const meta = getCatalogComponent(doc.slug);
  const json = useMemo(
    () => (meta ? JSON.stringify(meta, null, 2) : null),
    [meta],
  );

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
          <p className={styles.sub}>{doc.summary}</p>
        </div>
        <span className={styles.status} data-status={doc.status}>
          {doc.status}
        </span>
      </header>

      <div className={styles.tabs}>
        {TABS.map((t) => (
          <Button
            key={t.id}
            size="s"
            variant={tab === t.id ? "primary" : "ghost"}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      <section className={styles.panel}>
        {tab === "preview" && <Preview slug={doc.slug} />}
        {tab === "variants" && <Variants slug={doc.slug} />}
        {tab === "sizes" && <Sizes slug={doc.slug} />}
        {tab === "states" && <States slug={doc.slug} />}
        {tab === "accessibility" && (
          <ul className={styles.list}>
            {meta?.accessibility.map((a) => (
              <li key={a}>{a}</li>
            )) ?? <li>No accessibility metadata</li>}
          </ul>
        )}
        {tab === "code" && (
          <pre className={styles.code}>{codeSample(doc.slug)}</pre>
        )}
        {tab === "metadata" && meta && (
          <dl className={styles.dl}>
            <div>
              <dt>Purpose</dt>
              <dd>{meta.purpose}</dd>
            </div>
            <div>
              <dt>Aliases</dt>
              <dd>{meta.aliases.join(" · ")}</dd>
            </div>
            <div>
              <dt>Dependencies</dt>
              <dd>{meta.dependencies.join(", ")}</dd>
            </div>
            <div>
              <dt>AI Rules</dt>
              <dd>{meta.aiRules.map((r) => r.id).join(", ")}</dd>
            </div>
            <div>
              <dt>Figma Mapping</dt>
              <dd>{meta.figmaMapping.join(" · ")}</dd>
            </div>
          </dl>
        )}
        {tab === "json" && <pre className={styles.code}>{json}</pre>}
        {tab === "prompts" && (
          <ul className={styles.list}>
            {meta?.promptExamples.map((p) => (
              <li key={p}>
                <Link href={`/prompt?q=${encodeURIComponent(p)}`}>{p}</Link>
              </li>
            )) ?? <li>No prompt examples</li>}
          </ul>
        )}
      </section>
    </main>
  );
}

function Preview({ slug }: { slug: string }) {
  if (slug === "button") {
    return (
      <div className={styles.row}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
      </div>
    );
  }
  if (slug === "input") {
    return <Input kind="email" label="Email" placeholder="name@company.com" />;
  }
  if (slug === "checkbox") {
    return <Checkbox label="로그인 유지" defaultChecked />;
  }
  if (slug === "card") {
    return (
      <Card shadow="1" padding="m" radius="8">
        <Card.Header>Card</Card.Header>
        <Card.Body>Preview surface</Card.Body>
      </Card>
    );
  }
  return (
    <Table density="dense">
      <Table.Scroll>
        <Table.Header>
          <Table.Row>
            <Table.Head>Col</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Row</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Scroll>
    </Table>
  );
}

function Variants({ slug }: { slug: string }) {
  if (slug === "button") {
    return (
      <div className={styles.row}>
        {(["primary", "secondary", "tertiary", "ghost", "danger"] as const).map(
          (v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ),
        )}
      </div>
    );
  }
  if (slug === "input") {
    return (
      <div className={styles.grid}>
        {(["text", "email", "password", "search", "number"] as const).map(
          (k) => (
            <Input key={k} kind={k} label={k} />
          ),
        )}
      </div>
    );
  }
  return <Preview slug={slug} />;
}

function Sizes({ slug }: { slug: string }) {
  if (slug === "button") {
    return (
      <div className={styles.row}>
        {(["s", "m", "l"] as const).map((s) => (
          <Button key={s} size={s}>
            {s.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }
  if (slug === "input") {
    return (
      <div className={styles.grid}>
        {(["s", "m", "l"] as const).map((s) => (
          <Input key={s} size={s} label={s.toUpperCase()} />
        ))}
      </div>
    );
  }
  return <p className={styles.sub}>See JSON for size tokens.</p>;
}

function States({ slug }: { slug: string }) {
  if (slug === "button") {
    return (
      <div className={styles.row}>
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    );
  }
  if (slug === "input") {
    return (
      <div className={styles.grid}>
        <Input label="Default" />
        <Input label="Error" state="error" helperText="Required" />
        <Input label="Disabled" disabled />
      </div>
    );
  }
  return <p className={styles.sub}>Interactive states via CSS / props.</p>;
}

function codeSample(slug: string) {
  const map: Record<string, string> = {
    button: `<Button variant="primary" size="m">Save</Button>`,
    input: `<Input kind="email" size="m" label="Email" />`,
    checkbox: `<Checkbox label="로그인 유지" />`,
    card: `<Card shadow="1" radius="8" padding="m">…</Card>`,
    table: `<Table density="dense">…</Table>`,
  };
  return map[slug] ?? "// coming soon";
}
