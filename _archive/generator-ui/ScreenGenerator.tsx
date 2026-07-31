"use client";

import Link from "next/link";
import { Drawer, Tabs } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CompositionRenderer,
  DESIGN_GRID_COLUMNS,
  DESIGN_PAGE_SIZES,
  DEFAULT_PAGE_SIZE,
  buildDesignContract,
  designContractCssVariables,
  generateFromPrompt,
  suggestSurfaceFromPrompt,
  type DesignContract,
  type DesignPageSize,
  type DesignResolutionId,
  type DesignSurface,
} from "@/generator";
import type { GenerateResult } from "@/types/recipe";
import {
  ColorPicker,
  DEFAULT_HSVA,
  colorPairFromHsva,
  type ColorPair,
  type HsvaColor,
} from "./ColorPicker";
import styles from "./generator.module.css";

const EXAMPLES = [
  "회원 관리 화면 만들어줘",
  "마이페이지 만들어줘",
  "로그인 화면 만들어줘",
  "공지사항 화면 만들어줘",
  "공지사항 상세 만들어줘",
  "자주하는 질문 만들어줘",
  "상품 목록 페이지 만들어줘",
];

/** Desktop-only — top 3 common desktop widths (no mobile/tablet). */
const RESOLUTIONS = [
  { id: "fhd", label: "FHD", width: 1920, height: 1080, hint: "1920 × 1080" },
  { id: "qhd", label: "QHD", width: 2560, height: 1440, hint: "2560 × 1440" },
  {
    id: "laptop",
    label: "Laptop",
    width: 1440,
    height: 900,
    hint: "1440 × 900",
  },
] as const;

/** Fixed 12-column grid (Bootstrap standard). Centered; user only sets width + gutter. */
const GRID = { label: "12컬럼", columns: DESIGN_GRID_COLUMNS } as const;

/** Content max-width (px). Default 1200 — common desktop content width. */
const CONTENT_WIDTHS = [
  { id: "960", px: 960, label: "960px" },
  { id: "1200", px: 1200, label: "1200px" },
  { id: "1440", px: 1440, label: "1440px" },
] as const;

const DEFAULT_CONTENT_WIDTH = 1200;

/** Grid gutter (px). Default 24 — common desktop spacing. */
const GRID_GAPS = [
  { id: "16", px: 16, label: "16px" },
  { id: "24", px: 24, label: "24px" },
  { id: "32", px: 32, label: "32px" },
] as const;

const DEFAULT_GRID_GAP = 24;

const SURFACES = [
  {
    id: "admin",
    label: "Admin",
    hint: "밀도 높음 · 관리자",
  },
  {
    id: "portal",
    label: "Portal",
    hint: "여유 있는 · 포털",
  },
] as const;

const RADIUS_OPTIONS = [
  { value: 0 as const, label: "0" },
  { value: 4 as const, label: "4" },
  { value: 8 as const, label: "8" },
  { value: 12 as const, label: "12" },
] as const;

type RadiusValue = (typeof RADIUS_OPTIONS)[number]["value"];

/**
 * Style Inspector font choices (preview only).
 * Loaded in `(generator)/layout.tsx` + `fonts.css`; default = Pretendard
 * (common product UI). Stacks include Korean-safe fallbacks.
 */
const FONT_OPTIONS = [
  {
    id: "noto" as const,
    label: "노토산스",
    hint: "Noto Sans KR",
    stack: '"Noto Sans KR", "Noto Sans", sans-serif',
  },
  {
    id: "nanum" as const,
    label: "나눔고딕",
    hint: "Nanum Gothic",
    stack: '"Nanum Gothic", "Noto Sans KR", sans-serif',
  },
  {
    id: "pretendard" as const,
    label: "프리텐다드",
    hint: "Pretendard",
    stack: '"Pretendard", "Noto Sans KR", sans-serif',
  },
] as const;

type FontId = (typeof FONT_OPTIONS)[number]["id"];

function radiusCssVariables(radius: RadiusValue): Record<string, string> {
  const control = `${radius}px`;
  const card = `${Math.min(radius + 4, 16)}px`;
  const lg = `${Math.min(radius + 8, 20)}px`;
  return {
    "--preview-radius-control": control,
    "--preview-radius-card": card,
    "--radius-4": control,
    "--radius-8": card,
    "--radius-16": lg,
    "--radius-sm": control,
    "--radius-md": card,
    "--radius-lg": lg,
    "--radius-control": control,
  };
}

function fontCssVariables(fontId: FontId): Record<string, string> {
  const option =
    FONT_OPTIONS.find((f) => f.id === fontId) ?? FONT_OPTIONS[0];
  return {
    "--typography-fontFamily-sans": option.stack,
    "--preview-font-family": option.stack,
    fontFamily: option.stack,
  };
}

const SETUP_STEPS = [
  { id: "resolution", label: "해상도" },
  { id: "grid", label: "그리드" },
  { id: "settings", label: "설정" },
  { id: "generate", label: "화면 생성" },
] as const;

type Phase = "compose" | "setup" | "result";
type SetupStepId = (typeof SETUP_STEPS)[number]["id"];
type ResolutionId = DesignResolutionId;
type SurfaceId = DesignSurface;

/** UI setup state — single source of truth before/during generate. */
type DesignSetup = {
  resolution: ResolutionId;
  /** Content max-width (px) of the centered 12-col container. */
  width: number;
  /** Grid gutter / column gap (px). */
  gap: number;
  /** Primary color (HSV + alpha %). Secondary is derived darker. */
  color: HsvaColor;
  surface: SurfaceId;
  /** Locked to default — soft/apple preset removed (radius is independent). */
  theme: "default";
  /** Border radius for controls/cards (px). */
  radius: RadiusValue;
  /** Preview font stack id. */
  font: FontId;
  /** Visible list/grid items per page. */
  pageSize: DesignPageSize;
};

const DEFAULT_SETUP: DesignSetup = {
  resolution: "fhd",
  width: DEFAULT_CONTENT_WIDTH,
  gap: DEFAULT_GRID_GAP,
  color: DEFAULT_HSVA,
  surface: "admin",
  theme: "default",
  radius: 4,
  font: "pretendard",
  pageSize: DEFAULT_PAGE_SIZE,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ArrowUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 19V5M6 11l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PromptComposer({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  placeholder,
  textareaRef,
  compact,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  compact?: boolean;
}) {
  const canSend = value.trim().length > 0;

  return (
    <form
      className={compact ? styles.composerCompact : styles.composer}
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSend) return;
        onSubmit();
      }}
    >
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label="프롬프트"
      />
      <button
        type="submit"
        className={styles.sendBtn}
        aria-label="생성하기"
      >
        <ArrowUpIcon />
      </button>
    </form>
  );
}

function SetupProgress({ current }: { current: SetupStepId }) {
  const currentIndex = SETUP_STEPS.findIndex((s) => s.id === current);

  return (
    <ol className={styles.setupProgress} aria-label="디자인 설정 단계">
      {SETUP_STEPS.map((step, index) => {
        const state =
          index < currentIndex
            ? "done"
            : index === currentIndex
              ? "current"
              : "todo";
        return (
          <li
            key={step.id}
            className={styles.setupProgressItem}
            data-state={state}
          >
            <span className={styles.setupProgressDot} aria-hidden />
            <span className={styles.setupProgressLabel}>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

type SourceTab = "composition" | "meta";

function SourceViewDrawer({
  open,
  onClose,
  result,
  designContract,
}: {
  open: boolean;
  onClose: () => void;
  result: GenerateResult;
  designContract: DesignContract | null;
}) {
  const [tab, setTab] = useState<SourceTab>("composition");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      setTab("composition");
      setCopied(false);
      if (copyTimer.current != null) {
        window.clearTimeout(copyTimer.current);
        copyTimer.current = null;
      }
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (copyTimer.current != null) window.clearTimeout(copyTimer.current);
    };
  }, []);

  const compositionText = useMemo(() => {
    const payload = designContract
      ? { ...result.composition, designContract }
      : result.composition;
    return JSON.stringify(payload, null, 2);
  }, [result.composition, designContract]);
  const metaText = useMemo(() => {
    const payload = designContract
      ? { ...result.json, designContract }
      : result.json;
    return JSON.stringify(payload, null, 2);
  }, [result.json, designContract]);
  const visibleText = tab === "composition" ? compositionText : metaText;

  const isComposed = result.composition.mode === "composed";

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(visibleText);
      setCopied(true);
      if (copyTimer.current != null) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Drawer
      title="소스 보기"
      open={open}
      onClose={onClose}
      width={Math.min(640, typeof window !== "undefined" ? window.innerWidth - 24 : 640)}
      destroyOnHidden
      extra={
        <button
          type="button"
          className={styles.sourceCopyBtn}
          onClick={() => void onCopy()}
        >
          {copied ? "복사됨" : "복사"}
        </button>
      }
      styles={{ body: { paddingTop: 8 } }}
    >
      <Tabs
        activeKey={tab}
        onChange={(key) => setTab(key as SourceTab)}
        items={[
          { key: "composition", label: "Composition" },
          { key: "meta", label: "메타데이터" },
        ]}
      />
      {isComposed && tab === "composition" ? (
        <p className={styles.sourceNote}>
          Materials → Compose 경로입니다
          {result.composition.archetype ? (
            <>
              {" "}
              · archetype <code>{result.composition.archetype}</code>
            </>
          ) : null}
          {result.pattern?.id ? (
            <>
              {" "}
              · <code>{result.pattern.id}</code>
            </>
          ) : null}
          . designContract(width/gap/theme/primary)가 레이아웃에 반영됩니다.
        </p>
      ) : null}
      <pre className={styles.sourcePre}>{visibleText}</pre>
    </Drawer>
  );
}

function StyleInspector({
  setup,
  colorPair,
  onChange,
  onOpenSource,
}: {
  setup: DesignSetup;
  colorPair: ColorPair;
  onChange: (patch: Partial<DesignSetup>) => void;
  onOpenSource: () => void;
}) {
  return (
    <aside className={styles.inspector} aria-label="스타일 조정">
      <header className={styles.inspectorHeader}>
        <h2 className={styles.inspectorTitle}>스타일</h2>
        <p className={styles.inspectorHint}>미리보기에 바로 반영됩니다</p>
      </header>

      <div className={styles.inspectorSection}>
        <p className={styles.inspectorLabel}>한 화면 개수</p>
        <div className={styles.inspectorChips} role="radiogroup">
          {DESIGN_PAGE_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={setup.pageSize === size}
              className={styles.inspectorChipCompact}
              data-selected={setup.pageSize === size}
              onClick={() => onChange({ pageSize: size })}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.inspectorSection}>
        <p className={styles.inspectorLabel}>래디우스</p>
        <div className={styles.inspectorChips} role="radiogroup">
          {RADIUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={setup.radius === option.value}
              className={styles.inspectorChipCompact}
              data-selected={setup.radius === option.value}
              onClick={() => onChange({ radius: option.value })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.inspectorSection}>
        <p className={styles.inspectorLabel}>폰트</p>
        <div className={styles.inspectorStack} role="radiogroup">
          {FONT_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={setup.font === option.id}
              className={styles.inspectorOption}
              data-selected={setup.font === option.id}
              style={{ fontFamily: option.stack }}
              onClick={() => onChange({ font: option.id })}
            >
              <span className={styles.inspectorOptionLabel}>
                {option.label}
              </span>
              <span className={styles.inspectorOptionHint}>{option.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.inspectorSection}>
        <p className={styles.inspectorLabel}>색상</p>
        <ColorPicker
          value={setup.color}
          onChange={(color) => onChange({ color })}
        />
        <p className={styles.inspectorColorMeta}>
          {colorPair.primary}
          <span
            className={styles.colorPairDot}
            style={{ background: colorPair.secondary }}
            aria-hidden
          />
          세컨더리 자동
        </p>
      </div>

      <div className={styles.inspectorFooter}>
        <button
          type="button"
          className={styles.inspectorSourceBtn}
          onClick={onOpenSource}
        >
          소스 보기
        </button>
      </div>
    </aside>
  );
}

export function ScreenGenerator() {
  const [draft, setDraft] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("compose");
  const [setupStep, setSetupStep] = useState<SetupStepId>("resolution");
  const [setup, setSetup] = useState<DesignSetup>(DEFAULT_SETUP);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sourceOpen, setSourceOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const generateToken = useRef(0);

  const resolution = useMemo(
    () => RESOLUTIONS.find((r) => r.id === setup.resolution) ?? RESOLUTIONS[0],
    [setup.resolution],
  );
  const colorPair = useMemo(
    () => colorPairFromHsva(setup.color),
    [setup.color],
  );

  /** Live contract from current setup (preview + 소스 보기). */
  const designContract = useMemo(
    () =>
      buildDesignContract({
        resolution: setup.resolution,
        width: setup.width,
        gap: setup.gap,
        primary: colorPair.primary,
        secondary: colorPair.secondary,
        theme: setup.theme,
        surface: setup.surface,
        pageSize: setup.pageSize,
      }),
    [setup, colorPair],
  );

  const previewThemeStyle = useMemo(() => {
    const contractVars = designContractCssVariables(designContract);
    const radiusVars = radiusCssVariables(setup.radius);
    const fontVars = fontCssVariables(setup.font);
    return {
      ...contractVars,
      ...radiusVars,
      ...fontVars,
    } as React.CSSProperties;
  }, [designContract, setup.radius, setup.font]);

  useEffect(() => {
    if (phase !== "compose" || draft.trim()) return;
    const id = window.setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % EXAMPLES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [phase, draft]);

  useEffect(() => {
    if (phase === "compose") textareaRef.current?.focus();
  }, [phase]);

  async function finishGenerate(prompt: string, nextSetup: DesignSetup) {
    const token = ++generateToken.current;
    setSetupStep("generate");

    await sleep(520);
    if (token !== generateToken.current) return;

    try {
      const colors = colorPairFromHsva(nextSetup.color);
      const next = await generateFromPrompt(prompt, "mock", {
        setup: {
          resolution: nextSetup.resolution,
          width: nextSetup.width,
          gap: nextSetup.gap,
          primary: colors.primary,
          secondary: colors.secondary,
          theme: nextSetup.theme,
          surface: nextSetup.surface,
          pageSize: nextSetup.pageSize,
        },
      });
      if (token !== generateToken.current) return;

      setResult(next);
      setPhase("result");
      if (!next.pattern) {
        setError(
          "아직 지원하지 않는 요청입니다. 아래 예시처럼 다시 시도해보세요.",
        );
      }
    } catch (e) {
      if (token !== generateToken.current) return;
      setError(e instanceof Error ? e.message : "생성에 실패했습니다.");
      setPhase("compose");
      setSetupStep("resolution");
    }
  }

  function beginSetup(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    generateToken.current += 1;
    setError(null);
    setDraft(trimmed);
    setResult(null);
    setSourceOpen(false);
    setSetup({
      ...DEFAULT_SETUP,
      surface: suggestSurfaceFromPrompt(trimmed),
    });
    setSetupStep("resolution");
    setPhase("setup");
  }

  function goNextFromResolution() {
    setSetupStep("grid");
  }

  function goNextFromGrid() {
    setSetupStep("settings");
  }

  function goNextFromSettings() {
    void finishGenerate(draft.trim(), setup);
  }

  function patchSetup(patch: Partial<DesignSetup>) {
    const nextSetup = { ...setup, ...patch };
    setSetup(nextSetup);

    if (patch.pageSize === undefined) return;
    if (phase !== "result" || !draft.trim()) return;

    void (async () => {
      const token = ++generateToken.current;
      try {
        const colors = colorPairFromHsva(nextSetup.color);
        const next = await generateFromPrompt(draft.trim(), "mock", {
          setup: {
            resolution: nextSetup.resolution,
            width: nextSetup.width,
            gap: nextSetup.gap,
            primary: colors.primary,
            secondary: colors.secondary,
            theme: nextSetup.theme,
            surface: nextSetup.surface,
            pageSize: nextSetup.pageSize,
          },
        });
        if (token !== generateToken.current) return;
        setResult(next);
      } catch (e) {
        if (token !== generateToken.current) return;
        setError(e instanceof Error ? e.message : "재구성에 실패했습니다.");
      }
    })();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (phase === "compose") beginSetup(draft);
      else if (phase === "result") beginSetup(draft);
    }
  }

  function resetHome() {
    generateToken.current += 1;
    setPhase("compose");
    setSetupStep("resolution");
    setSetup(DEFAULT_SETUP);
    setResult(null);
    setError(null);
    setSourceOpen(false);
    setDraft("");
  }

  /** Prefer live designContract so inspector tweaks update the preview. */
  const previewComposition = result
    ? {
        ...result.composition,
        surface: setup.surface,
        designContract,
      }
    : null;

  return (
    <div className={styles.root} data-phase={phase}>
      <header className={styles.top}>
        <button type="button" className={styles.brand} onClick={resetHome}>
          AI Screen Generator
        </button>
      </header>

      {phase === "compose" ? (
        <main className={styles.compose}>
          <div className={styles.composeInner}>
            <h1 className={styles.title}>어떤 화면을 만들고 싶나요?</h1>

            <PromptComposer
              value={draft}
              onChange={setDraft}
              onSubmit={() => beginSetup(draft)}
              onKeyDown={onKeyDown}
              placeholder={EXAMPLES[placeholderIndex]}
              textareaRef={textareaRef}
            />

            <div className={styles.examples} aria-label="예시">
              {EXAMPLES.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  className={styles.example}
                  onClick={() => beginSetup(sample)}
                >
                  {sample}
                </button>
              ))}
            </div>

            {error ? <p className={styles.error}>{error}</p> : null}
          </div>
        </main>
      ) : null}

      {phase === "setup" ? (
        <main className={styles.setup} aria-live="polite">
          <div className={styles.setupInner}>
            <p className={styles.setupPrompt}>{draft.trim()}</p>
            <SetupProgress current={setupStep} />

            {setupStep === "resolution" ? (
              <section className={styles.setupPanel} aria-label="해상도 선택">
                <h2 className={styles.setupTitle}>해상도를 선택하세요</h2>
                <p className={styles.setupHint}>
                  데스크탑에서 가장 많이 쓰는 해상도 3가지입니다.
                </p>
                <div className={styles.setupOptions} role="radiogroup">
                  {RESOLUTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={setup.resolution === option.id}
                      className={styles.setupOption}
                      data-selected={setup.resolution === option.id}
                      onClick={() =>
                        setSetup((prev) => ({
                          ...prev,
                          resolution: option.id,
                        }))
                      }
                    >
                      <span className={styles.setupOptionLabel}>
                        {option.label}
                      </span>
                      <span className={styles.setupOptionHint}>
                        {option.hint}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={goNextFromResolution}
                >
                  다음 · 그리드
                </button>
              </section>
            ) : null}

            {setupStep === "grid" ? (
              <section className={styles.setupPanel} aria-label="그리드 설정">
                <h2 className={styles.setupTitle}>그리드 시스템을 적용하세요</h2>
                <p className={styles.setupHint}>
                  12컬럼 · 센터 고정입니다. 콘텐츠 너비와 거터만 조절하세요.
                  기본은 1200px · 24px입니다.
                </p>
                <div
                  className={styles.gridStage}
                  style={{
                    ["--cols" as string]: String(GRID.columns),
                    ["--gap" as string]: `${setup.gap}px`,
                    ["--content-width" as string]: `${setup.width}px`,
                  }}
                  aria-hidden
                >
                  <div className={styles.gridStageInner}>
                    <span className={styles.gridPreview} />
                  </div>
                </div>
                <div className={styles.gapField}>
                  <p className={styles.gapLabel}>콘텐츠 너비 (위드)</p>
                  <div className={styles.gapOptions} role="radiogroup">
                    {CONTENT_WIDTHS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={setup.width === option.px}
                        className={styles.gapOption}
                        data-selected={setup.width === option.px}
                        onClick={() =>
                          setSetup((prev) => ({ ...prev, width: option.px }))
                        }
                      >
                        {option.label}
                        {option.px === DEFAULT_CONTENT_WIDTH ? (
                          <span className={styles.gapDefault}>기본</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.gapField}>
                  <p className={styles.gapLabel}>그리드 간격 (거터)</p>
                  <div className={styles.gapOptions} role="radiogroup">
                    {GRID_GAPS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={setup.gap === option.px}
                        className={styles.gapOption}
                        data-selected={setup.gap === option.px}
                        onClick={() =>
                          setSetup((prev) => ({ ...prev, gap: option.px }))
                        }
                      >
                        {option.label}
                        {option.px === DEFAULT_GRID_GAP ? (
                          <span className={styles.gapDefault}>기본</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.setupActions}>
                  <button
                    type="button"
                    className={styles.secondaryAction}
                    onClick={() => setSetupStep("resolution")}
                  >
                    이전
                  </button>
                  <button
                    type="button"
                    className={styles.primaryAction}
                    onClick={goNextFromGrid}
                  >
                    다음 · 설정
                  </button>
                </div>
              </section>
            ) : null}

            {setupStep === "settings" ? (
              <section className={styles.setupPanel} aria-label="설정 선택">
                <h2 className={styles.setupTitle}>화면 설정을 확인하세요</h2>
                <p className={styles.setupHint}>
                  Surface만 고릅니다. 색·폰트·래디우스는 생성 후 오른쪽
                  패널에서 조정하세요.
                </p>
                <div className={styles.setupOptions} role="radiogroup">
                  {SURFACES.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={setup.surface === option.id}
                      className={styles.setupOption}
                      data-selected={setup.surface === option.id}
                      onClick={() =>
                        setSetup((prev) => ({ ...prev, surface: option.id }))
                      }
                    >
                      <span className={styles.setupOptionLabel}>
                        {option.label}
                      </span>
                      <span className={styles.setupOptionHint}>
                        {option.hint}
                      </span>
                    </button>
                  ))}
                </div>
                <ul className={styles.setupSummary}>
                  <li>
                    해상도 · {resolution.label} {resolution.hint}
                  </li>
                  <li>
                    그리드 · {GRID.label} · 센터 · {setup.width}px · 간격{" "}
                    {setup.gap}px
                  </li>
                  <li>
                    Surface · {setup.surface === "admin" ? "Admin" : "Portal"}
                  </li>
                </ul>
                <div className={styles.setupActions}>
                  <button
                    type="button"
                    className={styles.secondaryAction}
                    onClick={() => setSetupStep("grid")}
                  >
                    이전
                  </button>
                  <button
                    type="button"
                    className={styles.primaryAction}
                    onClick={goNextFromSettings}
                  >
                    화면 생성
                  </button>
                </div>
              </section>
            ) : null}

            {setupStep === "generate" ? (
              <section
                className={styles.setupGenerating}
                aria-busy="true"
                aria-label="화면 생성 중"
              >
                <div className={styles.loadingMark} />
                <p className={styles.loadingStage}>화면을 생성하는 중...</p>
                <p className={styles.loadingPrompt}>
                  {resolution.label} · {GRID.label} · {setup.width}px ·{" "}
                  {setup.gap}px ·{" "}
                  {setup.surface === "admin" ? "Admin" : "Portal"}
                </p>
              </section>
            ) : null}
          </div>
        </main>
      ) : null}

      {phase === "result" && result && previewComposition ? (
        <main className={styles.result}>
          <div className={styles.resultBody}>
            <div className={styles.resultMain}>
              <div className={styles.resultScroll}>
                <p className={styles.userBubble}>{draft.trim()}</p>
                {error ? <p className={styles.error}>{error}</p> : null}

                <div className={styles.previewMeta}>
                  <span>
                    {resolution.label} {resolution.hint}
                  </span>
                  <span aria-hidden>·</span>
                  <span>
                    {GRID.label} · 센터 · {setup.width}px · {setup.gap}px
                  </span>
                  <span aria-hidden>·</span>
                  <span className={styles.previewMetaColor}>
                    <span
                      className={styles.colorPairDot}
                      style={{ background: colorPair.primary }}
                      aria-hidden
                    />
                    {colorPair.primary}
                  </span>
                  <span aria-hidden>·</span>
                  <span>
                    {setup.surface === "admin" ? "Admin" : "Portal"}
                  </span>
                </div>

                <div className={styles.previewStage}>
                  <section
                    className={styles.previewFrame}
                    style={{
                      width: `min(100%, ${resolution.width}px)`,
                      ...previewThemeStyle,
                    }}
                    data-device={resolution.id}
                    data-theme={setup.theme}
                    data-density={designContract.density}
                    data-density-tight={
                      designContract.densityTight ? "true" : undefined
                    }
                    data-content-width={setup.width}
                    data-filter-cols={designContract.columnHints.filterCols}
                    data-card-cols={designContract.columnHints.cardCols}
                    aria-label="생성된 화면"
                  >
                    <div className={styles.preview}>
                      <div
                        className={styles.previewGrid}
                        style={{
                          ["--cols" as string]: String(GRID.columns),
                          ["--gap" as string]: `${setup.gap}px`,
                          ["--content-width" as string]: `${setup.width}px`,
                        }}
                        aria-hidden
                      />
                      {/*
                        Shell chrome (Admin LNB / Portal header·footer) stays full-bleed
                        of the frame. Page content inside patterns binds to
                        max-width: var(--preview-width) + gap padding.
                      */}
                      <div className={styles.previewContent}>
                        <CompositionRenderer
                          composition={previewComposition}
                          showChrome={false}
                        />
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className={styles.bottomWrap}>
                <PromptComposer
                  compact
                  value={draft}
                  onChange={setDraft}
                  onSubmit={() => beginSetup(draft)}
                  onKeyDown={onKeyDown}
                  placeholder="다른 화면도 만들어볼까요?"
                />
              </div>
            </div>

            <StyleInspector
              setup={setup}
              colorPair={colorPair}
              onChange={patchSetup}
              onOpenSource={() => setSourceOpen(true)}
            />
          </div>

          <SourceViewDrawer
            open={sourceOpen}
            onClose={() => setSourceOpen(false)}
            result={result}
            designContract={designContract}
          />
        </main>
      ) : null}

      <footer className={styles.foot}>
        <Link href="/developer" className={styles.footLink}>
          개발자 플레이그라운드
        </Link>
      </footer>
    </div>
  );
}
