"use client";

import { Button, Card, Input, Table } from "@/design-system/components";
import { DensityProvider } from "@/design-system/DensityProvider";
import {
  AdminListPattern,
  PortalFaqPattern,
  PortalLoginPattern,
  PortalMyPagePattern,
  PortalNoticeDetailPattern,
  PortalNoticeListPattern,
} from "@/design-system/patterns";
import { designContractCssVariables } from "@/generator/designContract";
import type {
  CompositionNode,
  ScreenComposition,
} from "@/types/screen-composition";
import { ComposedScreen } from "./ComposedScreen";
import styles from "./composition.module.css";
import preview from "./previewBlocks.module.css";

function titleFromPrompt(prompt: string) {
  if (prompt.includes("상품")) return "상품목록조회";
  if (prompt.includes("회원")) return "회원관리";
  if (prompt.includes("계약") || prompt.includes("신청")) return "신청계약조회";
  if (prompt.includes("주문")) return "주문관리";
  if (prompt.includes("관리") || prompt.includes("목록")) return "신청계약조회";
  return "신청계약조회";
}

function isPortalMyPagePrompt(prompt: string) {
  const lower = prompt.toLowerCase();
  if (
    lower.includes("공지") ||
    lower.includes("notice") ||
    lower.includes("faq") ||
    lower.includes("자주하는") ||
    lower.includes("로그인") ||
    lower.includes("login")
  ) {
    return false;
  }
  return (
    lower.includes("마이페이지") ||
    lower.includes("mypage") ||
    lower.includes("my page") ||
    lower.includes("대시보드") ||
    lower.includes("dashboard")
  );
}

function previewTitle(intent: string) {
  switch (intent) {
    case "login":
    case "auth":
      return "Login";
    case "crud":
    case "list-inquiry":
      return "List Inquiry";
    case "product-catalog":
      return "Product Catalog";
    case "dashboard":
    case "dashboard-hub":
      return "My Page Hub";
    case "notice-list":
    case "content-list":
      return "Notice List";
    case "notice-detail":
    case "content-detail":
      return "Notice Detail";
    case "faq":
    case "faq-accordion":
      return "FAQ";
    default:
      return intent;
  }
}

function KpiCards() {
  const items = [
    { label: "활성 회원", value: "1,284", delta: "+4.2%" },
    { label: "금월 가입", value: "96", delta: "+12" },
    { label: "이탈률", value: "2.1%", delta: "-0.3%" },
    { label: "NPS", value: "62", delta: "+3" },
  ];
  return (
    <div className={preview.kpiGrid}>
      {items.map((item) => (
        <Card key={item.label} shadow="1" radius="8" padding="m">
          <Card.Body>
            <p className={preview.kpiLabel}>{item.label}</p>
            <p className={preview.kpiValue}>{item.value}</p>
            <p className={preview.kpiDelta}>{item.delta}</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

function ChartBlock() {
  const bars = [40, 65, 50, 80, 55, 70, 62, 74];
  return (
    <Card shadow="1" radius="8" padding="m">
      <Card.Header>
        <strong>주간 활성 사용자</strong>
      </Card.Header>
      <Card.Body>
        <div className={preview.bars} aria-hidden>
          {bars.map((h, i) => (
            <div key={i} className={preview.bar} style={{ height: `${h}%` }} />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

function DemoTable({ density }: { density: "dense" | "comfortable" }) {
  return (
    <Table density={density}>
      <Table.Scroll>
        <Table.Header>
          <Table.Row>
            <Table.Head>항목</Table.Head>
            <Table.Head>상태</Table.Head>
            <Table.Head align="right">수치</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>캠페인 A</Table.Cell>
            <Table.Cell>진행</Table.Cell>
            <Table.Cell align="right">12</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>캠페인 B</Table.Cell>
            <Table.Cell>대기</Table.Cell>
            <Table.Cell align="right">3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Scroll>
    </Table>
  );
}

function renderNode(node: CompositionNode) {
  const variant = (node.variant ?? "Default").toLowerCase();
  const size = (node.size ?? "M").toLowerCase() as "s" | "m" | "l";
  const props = node.props ?? {};

  switch (node.component) {
    case "Button": {
      const buttonVariant = (
        ["primary", "secondary", "tertiary", "ghost", "danger"].includes(
          variant,
        )
          ? variant
          : "primary"
      ) as "primary" | "secondary" | "tertiary" | "ghost" | "danger";
      return (
        <Button
          key={node.id}
          variant={buttonVariant}
          size={size}
          width={(props.width as "hug" | "fill") ?? "hug"}
          type={(props.type as "button" | "submit") ?? "button"}
        >
          {String(props.children ?? "Button")}
        </Button>
      );
    }
    case "Input": {
      const kind = (
        ["email", "password", "search", "number", "text"].includes(variant)
          ? variant
          : "text"
      ) as "text" | "email" | "password" | "search" | "number";
      return (
        <Input
          key={node.id}
          kind={kind}
          size={size}
          label={props.label as string | undefined}
          placeholder={props.placeholder as string | undefined}
          autoComplete={props.autoComplete as string | undefined}
        />
      );
    }
    case "Table":
      return (
        <DemoTable
          key={node.id}
          density={variant === "comfortable" ? "comfortable" : "dense"}
        />
      );
    case "Pagination":
    case "PageHeader":
    case "MemberTable":
      return null;
    case "KpiCards":
      return <KpiCards key={node.id} />;
    case "Chart":
      return <ChartBlock key={node.id} />;
    default:
      return (
        <div key={node.id} className={styles.unknown}>
          Unknown component: {node.component}.{node.variant}
        </div>
      );
  }
}

/** Optional Real Example path — only when mode === "reference". */
function ReferencePattern({ composition }: { composition: ScreenComposition }) {
  const usePortalMyPage =
    composition.intent === "dashboard" ||
    isPortalMyPagePrompt(composition.prompt);

  if (composition.intent === "login") return <PortalLoginPattern />;
  if (composition.intent === "crud") {
    return <AdminListPattern title={titleFromPrompt(composition.prompt)} />;
  }
  if (composition.intent === "notice-list") return <PortalNoticeListPattern />;
  if (composition.intent === "notice-detail") {
    return <PortalNoticeDetailPattern />;
  }
  if (composition.intent === "faq") return <PortalFaqPattern />;
  if (usePortalMyPage) return <PortalMyPagePattern variant="filled" />;
  return (
    <div className={styles.stack}>
      {composition.nodes.map(renderNode)}
    </div>
  );
}

type CompositionRendererProps = {
  composition: ScreenComposition;
  showChrome?: boolean;
};

/**
 * ScreenComposition → React Preview
 * Default: materials-composed ComposedScreen
 * mode=reference: Real Example short-circuit (catalog demos)
 */
export function CompositionRenderer({
  composition,
  showChrome = true,
}: CompositionRendererProps) {
  const title = previewTitle(composition.intent);
  const contract = composition.designContract;
  const preferComposed =
    composition.mode !== "reference" &&
    (composition.mode === "composed" ||
      Boolean(composition.sections?.length) ||
      [
        "list-inquiry",
        "product-catalog",
        "auth",
        "dashboard-hub",
        "content-list",
        "content-detail",
        "faq-accordion",
      ].includes(composition.intent));

  if (composition.intent === "unsupported") {
    return (
      <div className={styles.root}>
        <p className={styles.recipe}>
          {showChrome
            ? "지원 Prompt: 로그인 / 회원 관리 / 마이페이지 / 공지사항 / 공지사항 상세 / 자주하는 질문 / 상품 목록"
            : "아직 이 요청으로는 화면을 만들지 못했어요. 다른 표현으로 다시 시도해보세요."}
        </p>
      </div>
    );
  }

  const densityOverrides = contract
    ? designContractCssVariables(contract)
    : undefined;

  return (
    <DensityProvider
      defaultSurface={composition.surface}
      density={contract?.density}
      cssVariableOverrides={densityOverrides}
    >
      <div className={styles.root}>
        {showChrome ? (
          <div className={styles.meta}>
            <p className={styles.eyebrow}>
              Prompt → Materials → Compose → React
            </p>
            <h2 className={styles.title}>{title} Preview</h2>
          </div>
        ) : null}

        {preferComposed ? (
          <ComposedScreen composition={composition} />
        ) : (
          <ReferencePattern composition={composition} />
        )}
      </div>
    </DensityProvider>
  );
}
