"use client";

import { useMemo, useState } from "react";
import {
  Button,
  type ButtonIconPlacement,
  type ButtonSize,
  type ButtonVariant,
  type ButtonWidth,
} from "@/design-system/components/button/Button";
import { ButtonRulesCallout } from "@/playground/ButtonRulesCallout";
import { BUTTON_RULES } from "@/playground/decision-rules";
import type { ComponentDocEntry } from "@/playground/catalog";
import { ComponentDetailLayout } from "../ComponentDetailLayout";
import type { PropDef, RelatedPatternLink, TokenEntry } from "../types";
import styles from "../ComponentDetail.module.css";

const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
];
const SIZES: ButtonSize[] = ["s", "m", "l"];

const PROPS: PropDef[] = [
  {
    name: "variant",
    type: '"primary" | "secondary" | "tertiary" | "ghost" | "danger"',
    defaultValue: '"primary"',
    description: "Visual emphasis. Primary = one per surface (Rule #3).",
  },
  {
    name: "size",
    type: '"s" | "m" | "l"',
    defaultValue: '"m"',
    description: "Control height & type scale.",
  },
  {
    name: "width",
    type: '"hug" | "fill"',
    defaultValue: '"hug"',
    description: "Hug content or fill parent width.",
  },
  {
    name: "loading",
    type: "boolean",
    defaultValue: "false",
    description: "Shows spinner; sets aria-busy and disables the button.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Native disabled. Also true while loading.",
  },
  {
    name: "icon",
    type: "ReactNode",
    description: "Optional leading/trailing/only icon.",
  },
  {
    name: "iconPlacement",
    type: '"left" | "right" | "only"',
    defaultValue: '"left"',
    description: "Icon position. only = icon-only button (provide aria-label).",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Label text. Omit when iconPlacement is only.",
  },
  {
    name: "type",
    type: '"button" | "submit" | "reset"',
    defaultValue: '"button"',
    description: "Native button type.",
  },
];

const TOKENS: TokenEntry[] = [
  { name: "--color-primary-500", role: "Primary fill / focus ring" },
  { name: "--color-primary-700", role: "Primary hover" },
  { name: "--color-primary-900", role: "Primary pressed" },
  { name: "--color-primary-100", role: "Tertiary surface" },
  { name: "--color-secondary-500", role: "Secondary fill" },
  { name: "--color-semantic-danger", role: "Danger fill / focus" },
  { name: "--color-semantic-dangerHover", role: "Danger hover/pressed" },
  { name: "--color-grey-0", role: "Label on filled variants" },
  { name: "--color-grey-200 / 300 / 400 / 600 / 900", role: "Ghost · disabled · borders" },
  { name: "--radius-4", role: "Corner radius" },
  { name: "--spacing-4 / 16 / 18 / 20", role: "Icon gap · horizontal padding" },
  { name: "--typography-caption1 / body2 / body3", role: "Size S / L / M type" },
  { name: "--typography-fontWeight-semibold", role: "Label weight" },
  { name: "--typography-fontFamily-sans", role: "Font family" },
  { name: "--elevation-0 / 1", role: "Default · danger pressed" },
  { name: "--motion-duration-fast / normal", role: "Hover · spinner" },
  { name: "--motion-easing-standard", role: "Transitions" },
];

const RELATED: RelatedPatternLink[] = [
  {
    id: "dialog",
    name: "Dialog Pattern",
    href: "/patterns/dialog",
    note: "Danger + Confirm Dialog for delete.",
  },
  {
    id: "crud",
    name: "CRUD Pattern",
    href: "/patterns/crud",
    note: "Sticky Footer — Primary save · Secondary cancel.",
  },
  {
    id: "search",
    name: "Search Pattern",
    href: "/patterns/search",
    note: "Primary = 조회 only (with Input.Search).",
  },
  {
    id: "data-table",
    name: "Data Table Pattern",
    href: "/patterns/data-table",
    note: "Toolbar Primary = 조회 · Danger = bulk delete.",
  },
];

const CODE = `import { Button } from "@/design-system/components";

// Single Primary per surface (JKO Rule #3)
function StickyFooter() {
  return (
    <>
      <Button variant="secondary" onClick={onCancel}>
        취소
      </Button>
      <Button variant="primary" type="submit">
        저장
      </Button>
    </>
  );
}

// Destructive — pair with Confirm Dialog
<Button variant="danger" onClick={openConfirm}>
  삭제
</Button>`;

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 2v10M2 7h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ButtonDetail({ doc }: { doc: ComponentDocEntry }) {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [size, setSize] = useState<ButtonSize>("m");
  const [width, setWidth] = useState<ButtonWidth>("hug");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [iconPlacement, setIconPlacement] =
    useState<ButtonIconPlacement>("left");
  const [showIcon, setShowIcon] = useState(false);
  const [label, setLabel] = useState("저장");

  const withIcon = showIcon || iconPlacement === "only";
  const icon = withIcon ? <PlusIcon /> : undefined;

  const codeSnippet = useMemo(() => {
    const parts = [
      `variant="${variant}"`,
      size !== "m" ? `size="${size}"` : null,
      width !== "hug" ? `width="${width}"` : null,
      loading ? "loading" : null,
      disabled ? "disabled" : null,
      withIcon && iconPlacement !== "left"
        ? `iconPlacement="${iconPlacement}"`
        : null,
    ].filter(Boolean);
    const attrs = parts.length ? ` ${parts.join(" ")}` : "";
    if (iconPlacement === "only") {
      return `<Button${attrs} icon={…} aria-label="${label}" />`;
    }
    return `<Button${attrs}${withIcon ? " icon={…}" : ""}>${label}</Button>`;
  }, [
    variant,
    size,
    width,
    loading,
    disabled,
    iconPlacement,
    withIcon,
    label,
  ]);

  return (
    <ComponentDetailLayout
      doc={doc}
      decisionRule={
        <ButtonRulesCallout
          note={`Apply: ${BUTTON_RULES.apply.member} ${BUTTON_RULES.apply.dataTable}`}
        />
      }
      preview={
        <div
          style={
            width === "fill"
              ? { width: "100%", maxWidth: 280 }
              : undefined
          }
        >
          <Button
            variant={variant}
            size={size}
            width={width}
            loading={loading}
            disabled={disabled}
            icon={icon}
            iconPlacement={iconPlacement}
            aria-label={iconPlacement === "only" ? label : undefined}
          >
            {iconPlacement === "only" ? undefined : label}
          </Button>
        </div>
      }
      previewNote="Live Preview shows one button — avoid placing multiple Primaries in one recommended row (Rule #3 · single-primary)."
      controls={
        <>
          <ControlSelect
            label="variant"
            value={variant}
            options={VARIANTS}
            onChange={(v) => setVariant(v as ButtonVariant)}
          />
          <ControlSelect
            label="size"
            value={size}
            options={SIZES}
            onChange={(v) => setSize(v as ButtonSize)}
          />
          <ControlSelect
            label="width"
            value={width}
            options={["hug", "fill"]}
            onChange={(v) => setWidth(v as ButtonWidth)}
          />
          <ControlSelect
            label="iconPlacement"
            value={iconPlacement}
            options={["left", "right", "only"]}
            onChange={(v) => {
              const next = v as ButtonIconPlacement;
              setIconPlacement(next);
              if (next === "only") setShowIcon(true);
            }}
          />
          <label className={styles.controlRow}>
            <span className={styles.controlLabel}>label</span>
            <input
              className={styles.controlInput}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </label>
          <label className={styles.controlCheck}>
            <input
              type="checkbox"
              checked={showIcon || iconPlacement === "only"}
              disabled={iconPlacement === "only"}
              onChange={(e) => setShowIcon(e.target.checked)}
            />
            icon
          </label>
          <label className={styles.controlCheck}>
            <input
              type="checkbox"
              checked={loading}
              onChange={(e) => setLoading(e.target.checked)}
            />
            loading
          </label>
          <label className={styles.controlCheck}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            disabled
          </label>
          <p className={styles.controlHint}>
            Syncs preview: {codeSnippet}
          </p>
        </>
      }
      variantsBlurb="Catalog of variants — one specimen each. On a real screen, use a single Primary."
      variants={
        <div className={styles.grid}>
          {VARIANTS.map((v) => (
            <div key={v} className={styles.specimen}>
              <span className={styles.specimenLabel}>{v}</span>
              <Button variant={v}>{v}</Button>
            </div>
          ))}
        </div>
      }
      sizesBlurb="S · M · L map to caption1 / body3 / body2 type tokens."
      sizes={
        <div className={styles.row}>
          {SIZES.map((s) => (
            <div key={s} className={styles.specimen}>
              <span className={styles.specimenLabel}>{s.toUpperCase()}</span>
              <Button size={s} variant="secondary">
                Size {s.toUpperCase()}
              </Button>
            </div>
          ))}
        </div>
      }
      statesBlurb="Hover / Pressed / Focus are CSS. Disabled & Loading are props."
      states={
        <div className={styles.row}>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Default</span>
            <Button variant="secondary">Default</Button>
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Disabled</span>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Loading</span>
            <Button variant="secondary" loading>
              Loading
            </Button>
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Icon only</span>
            <Button
              variant="ghost"
              icon={<PlusIcon />}
              iconPlacement="only"
              aria-label="추가"
            />
          </div>
        </div>
      }
      props={PROPS}
      tokens={TOKENS}
      code={CODE}
      accessibility={[
        "Native <button> — keyboard Enter/Space activates.",
        "Focus ring via :focus-visible (primary / danger outline tokens).",
        "loading sets aria-busy and disables the control.",
        "Icon-only buttons must provide an accessible name (aria-label).",
        "Minimum touch target via size tokens (prefer M+ on touch).",
        "Contrast AA for filled Primary / Danger on kit colors.",
      ]}
      bestPractices={[
        "화면(또는 표면)당 Primary Button 1개 (single-primary · Rule #3).",
        "Primary = 조회 · 저장 · 다음 · 확인. Secondary = 취소 · 초기화 · 닫기.",
        "Danger = 삭제/해지 — 항상 Confirm Dialog와 함께 (Dialog Pattern).",
        "행 액션·툴바 보조는 Ghost / Tertiary — Primary와 경쟁하지 않음.",
        "Loading 중에는 중복 제출을 막고 레이블을 유지하거나 Spinner만 표시.",
        "Do not invent new button colors — use kit variants only.",
      ]}
      related={RELATED}
    />
  );
}

function ControlSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className={styles.controlRow}>
      <span className={styles.controlLabel}>{label}</span>
      <select
        className={styles.controlSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
