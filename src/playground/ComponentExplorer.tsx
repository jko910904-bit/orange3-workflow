"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Table,
} from "@/design-system/components";
import { getComponent } from "@/design-system/registry";
import type { ComponentAiMetadata } from "@/types/ai-metadata";
import type { ComponentDocEntry } from "@/playground/catalog";

type Tab = "variants" | "size" | "state" | "code" | "metadata";

const TABS: { id: Tab; label: string }[] = [
  { id: "variants", label: "Variant" },
  { id: "size", label: "Size" },
  { id: "state", label: "State" },
  { id: "code", label: "Code" },
  { id: "metadata", label: "AI Metadata" },
];

export function ComponentExplorer({
  doc,
}: {
  doc: ComponentDocEntry;
}) {
  const [tab, setTab] = useState<Tab>("variants");
  const meta = getComponent(doc.registryName);

  return (
    <main className="ds-stack" style={{ gap: "var(--spacing-20)" }}>
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Components · {doc.name}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{doc.name}</h1>
        <p className="ds-muted text-sm">{doc.summary}</p>
      </header>

      <div className="ds-row flex-wrap">
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

      <section className="ds-panel ds-stack">
        {tab === "variants" && <VariantsPane slug={doc.slug} meta={meta} />}
        {tab === "size" && <SizePane slug={doc.slug} meta={meta} />}
        {tab === "state" && <StatePane slug={doc.slug} meta={meta} />}
        {tab === "code" && <CodePane slug={doc.slug} />}
        {tab === "metadata" && <MetadataPane meta={meta} />}
      </section>
    </main>
  );
}

function VariantsPane({
  slug,
  meta,
}: {
  slug: string;
  meta?: ComponentAiMetadata;
}) {
  if (slug === "button") {
    return (
      <div className="ds-row flex-wrap">
        {(["primary", "secondary", "tertiary", "ghost", "danger"] as const).map(
          (v) => (
            <Button key={v} variant={v} size="m">
              {v}
            </Button>
          ),
        )}
      </div>
    );
  }
  if (slug === "input") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {(["text", "email", "password", "search", "number"] as const).map(
          (k) => (
            <Input key={k} kind={k} size="m" label={k} placeholder={k} />
          ),
        )}
      </div>
    );
  }
  if (slug === "checkbox") {
    return <Checkbox label="Remember me" defaultChecked />;
  }
  if (slug === "card") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Card state="default" interactive shadow="1" padding="m">
          <Card.Body>Default</Card.Body>
        </Card>
        <Card state="selected" interactive shadow="2" padding="m">
          <Card.Body>Selected</Card.Body>
        </Card>
      </div>
    );
  }
  if (slug === "table") {
    return (
      <Table density="dense">
        <Table.Scroll>
          <Table.Header>
            <Table.Row>
              <Table.Head>Name</Table.Head>
              <Table.Head align="right">Value</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Dense</Table.Cell>
              <Table.Cell align="right">40px</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Scroll>
      </Table>
    );
  }
  return <p className="text-sm text-zinc-500">{meta?.variants.join(", ")}</p>;
}

function SizePane({
  slug,
  meta,
}: {
  slug: string;
  meta?: ComponentAiMetadata;
}) {
  if (slug === "button") {
    return (
      <div className="ds-row items-end flex-wrap">
        {(["s", "m", "l"] as const).map((s) => (
          <Button key={s} size={s} variant="primary">
            Size {s.toUpperCase()}
          </Button>
        ))}
      </div>
    );
  }
  if (slug === "input") {
    return (
      <div className="grid gap-3">
        {(["s", "m", "l"] as const).map((s) => (
          <Input key={s} size={s} label={`Size ${s.toUpperCase()}`} />
        ))}
      </div>
    );
  }
  return (
    <p className="text-sm text-zinc-600">
      Sizes: {meta?.sizes.join(", ") || "—"}
    </p>
  );
}

function StatePane({
  slug,
  meta,
}: {
  slug: string;
  meta?: ComponentAiMetadata;
}) {
  if (slug === "button") {
    return (
      <div className="ds-row flex-wrap">
        <Button variant="primary">Default / Hover me</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
        <Button variant="primary" loading>
          Loading
        </Button>
      </div>
    );
  }
  if (slug === "input") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <Input label="Default" placeholder="Focus me" />
        <Input label="Error" state="error" helperText="Required" />
        <Input label="Disabled" disabled defaultValue="Locked" />
      </div>
    );
  }
  return (
    <p className="text-sm text-zinc-600">
      States: {meta?.states.join(", ") || "—"}
    </p>
  );
}

function CodePane({ slug }: { slug: string }) {
  const samples: Record<string, string> = {
    button: `<Button variant="primary" size="m">Save</Button>`,
    input: `<Input kind="email" size="m" label="Email" />`,
    checkbox: `<Checkbox label="로그인 유지" />`,
    card: `<Card shadow="1" radius="8" padding="m">
  <Card.Header>…</Card.Header>
  <Card.Body>…</Card.Body>
  <Card.Footer>…</Card.Footer>
</Card>`,
    table: `<Table density="dense">
  <Table.Toolbar>…</Table.Toolbar>
  <Table.Scroll>…</Table.Scroll>
  <Table.Pagination page={1} pageCount={3} onPageChange={…} />
</Table>`,
  };

  return (
    <pre className="overflow-auto rounded-md bg-zinc-900 p-4 text-xs text-zinc-100">
      {samples[slug] ?? "// Coming soon"}
    </pre>
  );
}

function MetadataPane({ meta }: { meta?: ComponentAiMetadata }) {
  const json = useMemo(
    () => (meta ? JSON.stringify(meta, null, 2) : null),
    [meta],
  );

  if (!meta || !json) {
    return (
      <p className="text-sm text-zinc-500">
        AI Metadata not registered yet for this component. Add `*.meta.ts` and
        register in Component Registry.
      </p>
    );
  }

  return (
    <div className="ds-stack">
      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-zinc-500">Purpose</dt>
          <dd>{meta.purpose}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Category / Priority</dt>
          <dd>
            {meta.category} · {meta.priority} · conf {meta.confidence}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-zinc-500">Aliases</dt>
          <dd>{meta.aliases.join(" · ")}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-zinc-500">AI Rules</dt>
          <dd>{meta.aiRules.map((r) => r.id).join(", ")}</dd>
        </div>
      </dl>
      <pre className="max-h-80 overflow-auto rounded-md bg-zinc-900 p-4 text-xs text-zinc-100">
        {json}
      </pre>
    </div>
  );
}
