"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  App,
  Button as AntButton,
  DatePicker,
  Drawer,
  Dropdown,
  Modal,
  Space,
  Switch,
  Tabs,
  Tooltip,
} from "antd";
import type { MenuProps } from "antd";
import { Button, Card, Checkbox } from "@/design-system/components";
import { getCatalogComponent } from "@/catalog";
import {
  statusLabel,
  type ComponentDocEntry,
} from "@/playground/catalog";
import { OverlayRulesCallout } from "@/playground/OverlayRulesCallout";
import { OVERLAY_RULES } from "@/playground/decision-rules";
import {
  ButtonDetail,
  InputDetail,
  SelectDetail,
  TableDetail,
  isRichComponentSlug,
} from "@/playground/component-detail";
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

const OWN_SLUGS = new Set(["checkbox", "card"]);

/**
 * Component detail router.
 * Priority kit components (button · input · select · table) use rich
 * Preview-first pages. Other kit entries keep the lighter tab explorer.
 */
export function ComponentExplorer({ doc }: { doc: ComponentDocEntry }) {
  if (isRichComponentSlug(doc.slug)) {
    switch (doc.slug) {
      case "button":
        return <ButtonDetail doc={doc} />;
      case "input":
        return <InputDetail doc={doc} />;
      case "select":
        return <SelectDetail doc={doc} />;
      case "table":
        return <TableDetail doc={doc} />;
    }
  }

  return <LegacyComponentExplorer doc={doc} />;
}

function LegacyComponentExplorer({ doc }: { doc: ComponentDocEntry }) {
  const [tab, setTab] = useState<Tab>("preview");
  const meta = getCatalogComponent(doc.slug);
  const json = useMemo(
    () => (meta ? JSON.stringify(meta, null, 2) : null),
    [meta],
  );
  const isOwn = OWN_SLUGS.has(doc.slug);

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
          {statusLabel(doc.status)}
        </span>
      </header>

      {doc.status === "planned" ? (
        <section className={styles.panel}>
          <p className={styles.sub}>
            준비 중 — 이 컴포넌트는 키트 목록에 등록되어 있으나 구현 전입니다. AI는
            새 컴포넌트를 만들지 않으며, 기존 Kit 컴포넌트만 Compose합니다.
          </p>
        </section>
      ) : null}

      {doc.slug === "modal" ? (
        <OverlayRulesCallout
          emphasize="Modal"
          note={`${OVERLAY_RULES.apply.dialog} ${OVERLAY_RULES.apply.delete}`}
        />
      ) : null}

      <div className={styles.tabs}>
        {TABS.filter((t) => {
          if (doc.status === "planned") return t.id === "preview" || t.id === "code";
          if (isOwn) return true;
          return t.id === "preview" || t.id === "code";
        }).map((t) => (
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
            {meta?.promptExamples?.map((p) => (
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
  return <SupplementPreview slug={slug} />;
}

function SupplementPreview({ slug }: { slug: string }) {
  const { message, notification } = App.useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems: MenuProps["items"] = [
    { key: "1", label: "내보내기" },
    { key: "2", label: "복제" },
    { key: "3", label: "삭제", danger: true },
  ];

  if (slug === "modal") {
    return (
      <div className={styles.row}>
        <AntButton type="primary" onClick={() => setModalOpen(true)}>
          Modal 열기
        </AntButton>
        <Modal
          title="확인"
          open={modalOpen}
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
          okText="확인"
          cancelText="취소"
        >
          <p>확인이 필요한 작업에 사용하는 대화상자입니다.</p>
        </Modal>
      </div>
    );
  }

  if (slug === "drawer") {
    return (
      <div className={styles.row}>
        <AntButton onClick={() => setDrawerOpen(true)}>Drawer 열기</AntButton>
        <Drawer
          title="상세"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          size={360}
        >
          <p>측면 패널로 상세 정보를 표시합니다.</p>
        </Drawer>
      </div>
    );
  }

  if (slug === "date-picker") {
    return <DatePicker placeholder="날짜 선택" />;
  }

  if (slug === "switch") {
    return (
      <Space>
        <span>알림</span>
        <Switch defaultChecked />
      </Space>
    );
  }

  if (slug === "tabs") {
    return (
      <Tabs
        style={{ width: "100%" }}
        items={[
          { key: "1", label: "기본", children: "Tab content A" },
          { key: "2", label: "상세", children: "Tab content B" },
          { key: "3", label: "이력", children: "Tab content C" },
        ]}
      />
    );
  }

  if (slug === "dropdown") {
    return (
      <Dropdown menu={{ items: menuItems }}>
        <AntButton>메뉴</AntButton>
      </Dropdown>
    );
  }

  if (slug === "tooltip") {
    return (
      <Space>
        <Tooltip title="짧은 도움말">
          <AntButton>Tooltip</AntButton>
        </Tooltip>
        <AntButton onClick={() => message.success("저장되었습니다")}>
          Message
        </AntButton>
        <AntButton
          onClick={() =>
            notification.info({
              message: "알림",
              description: "작업이 완료되었습니다.",
            })
          }
        >
          Notification
        </AntButton>
      </Space>
    );
  }

  if (slug === "badge") {
    return (
      <Space>
        <span
          style={{
            display: "inline-flex",
            padding: "2px 8px",
            borderRadius: "var(--radius-4)",
            background: "var(--color-primary-100)",
            color: "var(--color-primary-700)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Active
        </span>
        <span
          style={{
            display: "inline-flex",
            padding: "2px 8px",
            borderRadius: "var(--radius-4)",
            background: "var(--color-grey-200)",
            color: "var(--color-grey-700)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Draft
        </span>
      </Space>
    );
  }

  if (slug === "pagination") {
    return (
      <Space>
        <AntButton size="small">이전</AntButton>
        <AntButton size="small" type="primary">
          1
        </AntButton>
        <AntButton size="small">2</AntButton>
        <AntButton size="small">3</AntButton>
        <AntButton size="small">다음</AntButton>
      </Space>
    );
  }

  if (
    slug === "radio" ||
    slug === "chip" ||
    slug === "avatar" ||
    slug === "toast" ||
    slug === "upload" ||
    slug === "breadcrumb"
  ) {
    return (
      <p className={styles.sub}>
        준비 중 — {slug}는 키트 목록에만 등록되어 있습니다. AI는 새 컴포넌트를
        만들지 않으며, Compose 시 기존 Kit 컴포넌트를 사용하세요.
      </p>
    );
  }

  return <p className={styles.sub}>Preview coming soon.</p>;
}

function Variants({ slug }: { slug: string }) {
  if (slug === "checkbox") {
    return (
      <div className={styles.row}>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
      </div>
    );
  }
  if (slug === "card") {
    return (
      <div className={styles.row}>
        <Card shadow="none" padding="m" radius="8">
          <Card.Body>shadow none</Card.Body>
        </Card>
        <Card shadow="1" padding="m" radius="8">
          <Card.Body>shadow 1</Card.Body>
        </Card>
      </div>
    );
  }
  return <Preview slug={slug} />;
}

function Sizes({ slug }: { slug: string }) {
  if (slug === "card") {
    return (
      <div className={styles.row}>
        {(["s", "m", "l"] as const).map((p) => (
          <Card key={p} shadow="1" padding={p} radius="8">
            <Card.Body>padding {p}</Card.Body>
          </Card>
        ))}
      </div>
    );
  }
  return <p className={styles.sub}>See JSON for size tokens.</p>;
}

function States({ slug }: { slug: string }) {
  if (slug === "checkbox") {
    return (
      <div className={styles.row}>
        <Checkbox label="Default" />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled checked" disabled defaultChecked />
      </div>
    );
  }
  if (slug === "card") {
    return (
      <div className={styles.row}>
        <Card shadow="1" padding="m" radius="8" state="default">
          <Card.Body>Default</Card.Body>
        </Card>
        <Card shadow="1" padding="m" radius="8" state="selected">
          <Card.Body>Selected</Card.Body>
        </Card>
      </div>
    );
  }
  return <p className={styles.sub}>Interactive states via CSS / props.</p>;
}

function codeSample(slug: string) {
  const map: Record<string, string> = {
    checkbox: `<Checkbox label="로그인 유지" />`,
    card: `<Card shadow="1" radius="8" padding="m">…</Card>`,
    modal: `<Modal title="확인" open={open} onOk={…} onCancel={…}>…</Modal>`,
    drawer: `<Drawer title="상세" open={open} onClose={…}>…</Drawer>`,
    "date-picker": `<DatePicker placeholder="날짜 선택" />`,
    switch: `<Switch defaultChecked />`,
    tabs: `<Tabs items={[…]} />`,
    dropdown: `<Dropdown menu={{ items }}>…</Dropdown>`,
    tooltip: `<Tooltip title="도움말">…</Tooltip>`,
    badge: `<!-- Badge: status label using color / radius tokens -->`,
    pagination: `<!-- Pagination: list page navigation -->`,
    radio: `<!-- Radio: 준비 중 — use kit Select/Checkbox until ready -->`,
    chip: `<!-- Chip: 준비 중 -->`,
    avatar: `<!-- Avatar: 준비 중 -->`,
    toast: `<!-- Toast: 준비 중 -->`,
    upload: `<!-- Upload: 준비 중 -->`,
    breadcrumb: `<!-- Breadcrumb: 준비 중 -->`,
  };
  return map[slug] ?? "// 준비 중 — kit stub";
}
