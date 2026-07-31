"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { DensityProvider } from "@/design-system/DensityProvider";
import {
  DashboardPattern,
  DataTablePattern,
  FormPattern,
  SearchPattern,
} from "@/design-system/patterns";
import { ScreenRenderer } from "@/generator/renderer/ScreenRenderer";
import {
  PATTERN_DESIGN_STATES,
  getUxPattern,
  statusLabel,
  UX_PATTERN_BY_ID,
} from "@/playground/catalog";
import { ButtonRulesCallout } from "@/playground/ButtonRulesCallout";
import { BUTTON_RULES, OVERLAY_RULES } from "@/playground/decision-rules";
import { DocDisclosure } from "@/playground/DocDisclosure";
import { DrawerVsPageCallout } from "@/playground/DrawerVsPageCallout";
import { DRAWER_VS_PAGE } from "@/playground/navigation-rules";
import { OverlayRulesCallout } from "@/playground/OverlayRulesCallout";
import {
  CRUD_UX_PRINCIPLE_IDS,
  DASHBOARD_UX_PRINCIPLE_IDS,
  DATA_TABLE_UX_PRINCIPLE_IDS,
  JKO_UX_PRINCIPLE_BY_ID,
} from "@/playground/ux-principles";
import styles from "./PatternDetail.module.css";

export default function PatternDetailPage() {
  const params = useParams<{ id: string }>();
  const doc = getUxPattern(params.id);

  if (!doc) {
    return <p>Pattern not found</p>;
  }

  const showCompose =
    doc.composePreview === "DataTable" ||
    doc.composePreview === "Search" ||
    doc.composePreview === "Dashboard" ||
    doc.composePreview === "Form";
  const showRegistry =
    !showCompose && Boolean(doc.registryId) && doc.status !== "planned";
  const hasLivePreview = showCompose || showRegistry;
  const isDataTable = doc.id === "data-table";
  const isDashboard = doc.id === "dashboard";
  const isSearch = doc.id === "search";
  const isDetail = doc.id === "detail";
  const isCrud = doc.id === "crud";
  const isWizard = doc.id === "wizard";
  const isDialog = doc.id === "dialog";
  const verticalStack = isDataTable || isDashboard || isCrud;

  const navNote = isDetail
    ? DRAWER_VS_PAGE.apply.detail
    : isCrud
      ? DRAWER_VS_PAGE.apply.crud
      : isWizard
        ? DRAWER_VS_PAGE.apply.wizard
        : isDataTable
          ? DRAWER_VS_PAGE.apply.dataTable
          : undefined;

  const flowSteps =
    doc.userTasks.length > 0
      ? doc.userTasks
      : doc.parts.length > 0
        ? doc.parts
        : doc.includedComponents;

  const screenRecipes = doc.recipes;

  return (
    <main className={styles.page}>
      <p className={styles.crumb}>
        <Link href="/patterns">UX Patterns</Link>
        {" / "}
        {doc.name}
      </p>

      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>{doc.name}</h1>
          <span className={styles.status} data-status={doc.status}>
            {statusLabel(doc.status)}
          </span>
        </div>
      </header>

      {/* 1. Pattern Preview */}
      <section className={styles.section} aria-labelledby="preview-title">
        <h2 id="preview-title" className={styles.sectionTitle}>
          Pattern Preview
        </h2>
        <div
          className={styles.previewStage}
          data-live={hasLivePreview ? "true" : "false"}
        >
          {showCompose ? (
            <DensityProvider defaultSurface={doc.surface ?? "admin"}>
              {doc.composePreview === "Search" ? (
                <SearchPattern />
              ) : doc.composePreview === "Dashboard" ? (
                <DashboardPattern />
              ) : doc.composePreview === "Form" ? (
                <FormPattern />
              ) : (
                <DataTablePattern />
              )}
            </DensityProvider>
          ) : showRegistry && doc.registryId ? (
            <ScreenRenderer
              patterns={[{ id: doc.registryId }]}
              surface={doc.surface ?? "admin"}
            />
          ) : (
            <div className={styles.previewPlaceholder}>
              <p className={styles.placeholderTitle}>Preview 준비 중</p>
              <p className={styles.placeholderBody}>
                스펙·메타데이터는 확정되어 있습니다. Kit 컴포넌트로 Compose할
                예정입니다 — Generate하지 않습니다.
              </p>
              {doc.includedComponents.length > 0 ? (
                <p className={styles.placeholderMeta}>
                  Components: {doc.includedComponents.join(" · ")}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {/* 2. UX Flow */}
      <section className={styles.section} aria-labelledby="flow-title">
        <h2 id="flow-title" className={styles.sectionTitle}>
          UX Flow
        </h2>
        <ol className={styles.flow} aria-label="UX 흐름">
          {flowSteps.map((step, i) => (
            <li key={`${step}-${i}`} className={styles.flowItem}>
              <span className={styles.flowIndex}>{i + 1}</span>
              <span className={styles.flowLabel}>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. Layout */}
      <section className={styles.section} aria-labelledby="layout-title">
        <h2 id="layout-title" className={styles.sectionTitle}>
          Layout
        </h2>
        <div
          className={styles.layoutSketch}
          aria-label="레이아웃 구조"
          data-order={verticalStack ? "stack" : "inline"}
        >
          {doc.includedComponents.map((c, i) => (
            <div key={c} className={styles.layoutBlock}>
              <span className={styles.layoutIndex}>{i + 1}</span>
              <span className={styles.layoutName}>{c}</span>
            </div>
          ))}
        </div>
        {doc.parts.length > 0 ? (
          <div className={styles.partChips} aria-label="Included parts">
            {doc.parts.map((part) => (
              <span key={part} className={styles.partChip}>
                {part}
              </span>
            ))}
          </div>
        ) : null}
      </section>

      {/* 4. Screen Example */}
      <section className={styles.section} aria-labelledby="screen-title">
        <h2 id="screen-title" className={styles.sectionTitle}>
          Screen Example
        </h2>
        {screenRecipes.length > 0 ? (
          <ul className={styles.screenList}>
            {screenRecipes.map((r) => (
              <li key={r}>
                <Link
                  href={`/registry?recipe=${r}`}
                  className={styles.screenCard}
                >
                  <span className={styles.screenName}>{r}</span>
                  <span className={styles.screenHint}>Registry recipe</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.previewPlaceholder}>
            <p className={styles.placeholderBody}>
              연결된 Screen Recipe가 아직 없습니다.{" "}
              <Link href="/recipes">Recipes</Link>에서 업무 화면을 탐색하세요.
            </p>
          </div>
        )}
        {doc.relatedPatterns.length > 0 ? (
          <div className={styles.relatedRow}>
            {doc.relatedPatterns.map((id) => {
              const related = UX_PATTERN_BY_ID[id];
              return related ? (
                <Link
                  key={id}
                  href={`/patterns/${related.id}`}
                  className={styles.relatedChip}
                >
                  {related.name}
                </Link>
              ) : null;
            })}
          </div>
        ) : null}
      </section>

      {/* 5–6. Collapsed docs */}
      <div className={styles.docStack}>
        <DocDisclosure title="정의">
          <p>{doc.description}</p>
          <p>
            <strong>Use Case</strong> — {doc.useCase}
          </p>
          <p>
            <strong>UX Goal</strong> — {doc.uxGoal}
          </p>
          {doc.goals.length > 0 ? (
            <>
              <p>
                <strong>Goal</strong>
              </p>
              <ul>
                {doc.goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </>
          ) : null}
          <p>
            <strong>Responsive</strong> — {doc.responsiveRule}
          </p>
          <p>
            <strong>Accessibility</strong> — {doc.accessibilityRule}
          </p>
        </DocDisclosure>

        <DocDisclosure title="Rule / Best Practice / Decision">
          <DecisionRulesBlock
            isDataTable={isDataTable}
            isDashboard={isDashboard}
            isCrud={isCrud}
            isDialog={isDialog}
            isDetail={isDetail}
            isSearch={isSearch}
            navNote={navNote}
            showNavRule={isDetail || isCrud || isWizard || isDataTable}
            bestPractice={doc.bestPractice}
            bestPractices={doc.bestPractices}
          />
        </DocDisclosure>
      </div>
    </main>
  );
}

function DecisionRulesBlock({
  isDataTable,
  isDashboard,
  isCrud,
  isDialog,
  isDetail,
  isSearch,
  navNote,
  showNavRule,
  bestPractice,
  bestPractices,
}: {
  isDataTable: boolean;
  isDashboard: boolean;
  isCrud: boolean;
  isDialog: boolean;
  isDetail: boolean;
  isSearch: boolean;
  navNote?: string;
  showNavRule: boolean;
  bestPractice: string;
  bestPractices?: string[];
}) {
  return (
    <div className={styles.rulesBody}>
      {showNavRule ? (
        <DrawerVsPageCallout primary={isDetail} note={navNote} />
      ) : null}

      {isDataTable ? (
        <>
          <PrincipleIds ids={DATA_TABLE_UX_PRINCIPLE_IDS} label="JKO UX Rules" />
          <ButtonRulesCallout note={BUTTON_RULES.apply.dataTable} />
        </>
      ) : null}

      {isDashboard ? (
        <PrincipleIds
          ids={DASHBOARD_UX_PRINCIPLE_IDS}
          label="JKO UX Rules"
        />
      ) : null}

      {isCrud ? (
        <>
          <PrincipleIds ids={CRUD_UX_PRINCIPLE_IDS} label="JKO UX Rules" />
          <ButtonRulesCallout note={BUTTON_RULES.apply.stickyFooter} />
        </>
      ) : null}

      {isDialog ? (
        <OverlayRulesCallout
          emphasize="Modal"
          note={`${OVERLAY_RULES.apply.dialog} Bottom Sheet: ${OVERLAY_RULES.bottomSheet.conditions.join(" · ")}`}
        />
      ) : null}

      {isDetail ? (
        <>
          <DrawerVsPageCallout note={OVERLAY_RULES.apply.detail} />
          <OverlayRulesCallout
            emphasize="Drawer"
            note={OVERLAY_RULES.apply.adminDesktop}
          />
        </>
      ) : null}

      <p>
        <strong>Pattern Design States</strong>
      </p>
      <div className={styles.stateChips}>
        {PATTERN_DESIGN_STATES.map((state) => (
          <span key={state} className={styles.stateChip}>
            {state}
          </span>
        ))}
      </div>

      <p>
        <strong>Best Practice{isSearch ? "s" : ""}</strong>
      </p>
      {bestPractices && bestPractices.length > 0 ? (
        <ul>
          {bestPractices.map((bp) => (
            <li key={bp}>{bp}</li>
          ))}
        </ul>
      ) : null}
      <p>{bestPractice}</p>

      <p>
        <Link href="/principles">Principles</Link>
        {" · "}
        <Link href="/principles/decision-tree">Decision Tree</Link>
      </p>
    </div>
  );
}

function PrincipleIds({
  ids,
  label,
}: {
  ids: readonly number[];
  label: string;
}): ReactNode {
  return (
    <div>
      <p>
        <strong>{label}</strong>
      </p>
      <ul>
        {ids.map((id) => {
          const p = JKO_UX_PRINCIPLE_BY_ID[id];
          if (!p) return null;
          return (
            <li key={p.id}>
              {p.id}. {p.statement} (<code>{p.key}</code>)
            </li>
          );
        })}
      </ul>
    </div>
  );
}
