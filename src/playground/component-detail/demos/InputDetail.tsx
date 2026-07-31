"use client";

import { useState } from "react";
import {
  Input,
  type InputKind,
  type InputSize,
  type InputState,
} from "@/design-system/components/input/Input";
import type { ComponentDocEntry } from "@/playground/catalog";
import { ComponentDetailLayout } from "../ComponentDetailLayout";
import type { PropDef, RelatedPatternLink, TokenEntry } from "../types";
import styles from "../ComponentDetail.module.css";

const KINDS: InputKind[] = ["text", "email", "password", "search", "number"];
const SIZES: InputSize[] = ["s", "m", "l"];

const PROPS: PropDef[] = [
  {
    name: "kind",
    type: '"text" | "email" | "password" | "search" | "number"',
    defaultValue: '"text"',
    description: "Maps to native input type (+ password reveal / search icon).",
  },
  {
    name: "size",
    type: '"s" | "m" | "l"',
    defaultValue: '"m"',
    description: "Control height & type scale.",
  },
  {
    name: "state",
    type: '"default" | "error"',
    defaultValue: '"default"',
    description: "Error sets aria-invalid and danger border tokens.",
  },
  {
    name: "label",
    type: "string",
    description: "Visible label associated via htmlFor / id.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Hint or error message; wired with aria-describedby.",
  },
  {
    name: "startIcon / endIcon",
    type: "ReactNode",
    description: "Affixes. Search defaults a leading icon; password a reveal toggle.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Native disabled on the input.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Native placeholder (do not replace a visible label).",
  },
];

const TOKENS: TokenEntry[] = [
  { name: "--color-grey-0 / 100 / 300 / 400 / 500 / 600 / 900", role: "Surface · border · text · placeholder" },
  { name: "--color-primary-500 / 100", role: "Focus border · focus ring soft" },
  { name: "--color-semantic-danger / dangerSoft", role: "Error border · ring" },
  { name: "--color-semantic-info", role: "Helper text (default)" },
  { name: "--radius-4", role: "Control radius" },
  { name: "--spacing-4 / 8 / 12 / 16", role: "Field gap · affix · padding" },
  { name: "--typography-caption1 / caption2 / body2 / body3", role: "Label · helper · sizes" },
  { name: "--typography-fontWeight-medium", role: "Label / input weight" },
  { name: "--typography-fontFamily-sans", role: "Font family" },
  { name: "--motion-duration-fast", role: "Border / focus transition" },
  { name: "--motion-easing-standard", role: "Easing" },
];

const RELATED: RelatedPatternLink[] = [
  {
    id: "search",
    name: "Search Pattern",
    href: "/patterns/search",
    note: "kind=\"search\" + Button Primary 조회 (Search First).",
  },
  {
    id: "filter",
    name: "Filter Pattern",
    href: "/patterns/filter",
    note: "Filter fields below Search — not a second Search.",
  },
  {
    id: "crud",
    name: "CRUD / Form Pattern",
    href: "/patterns/crud",
    note: "Email + Password kinds for auth & edit forms.",
  },
];

const CODE = `import { Input } from "@/design-system/components";

// Search First — Input left, Primary Button right (Search Pattern)
<Input
  kind="search"
  size="m"
  label="검색"
  placeholder="이름 · 이메일"
/>

// Validation
<Input
  kind="email"
  label="이메일"
  state="error"
  helperText="올바른 이메일 형식을 입력하세요"
/>

// Password with built-in reveal
<Input kind="password" label="비밀번호" autoComplete="current-password" />`;

export function InputDetail({ doc }: { doc: ComponentDocEntry }) {
  const [kind, setKind] = useState<InputKind>("text");
  const [size, setSize] = useState<InputSize>("m");
  const [state, setState] = useState<InputState>("default");
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("이메일");
  const [helperText, setHelperText] = useState("");
  const [placeholder, setPlaceholder] = useState("name@company.com");

  return (
    <ComponentDetailLayout
      doc={doc}
      preview={
        <div style={{ width: "100%", maxWidth: 360 }}>
          <Input
            kind={kind}
            size={size}
            state={state}
            disabled={disabled}
            label={label}
            helperText={
              helperText ||
              (state === "error" ? "필수 입력 항목입니다" : undefined)
            }
            placeholder={placeholder}
          />
        </div>
      }
      previewNote="Label is required for accessibility — placeholder alone is not a label."
      controls={
        <>
          <ControlSelect
            label="kind"
            value={kind}
            options={KINDS}
            onChange={(v) => setKind(v as InputKind)}
          />
          <ControlSelect
            label="size"
            value={size}
            options={SIZES}
            onChange={(v) => setSize(v as InputSize)}
          />
          <ControlSelect
            label="state"
            value={state}
            options={["default", "error"]}
            onChange={(v) => setState(v as InputState)}
          />
          <label className={styles.controlRow}>
            <span className={styles.controlLabel}>label</span>
            <input
              className={styles.controlInput}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </label>
          <label className={styles.controlRow}>
            <span className={styles.controlLabel}>placeholder</span>
            <input
              className={styles.controlInput}
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </label>
          <label className={styles.controlRow}>
            <span className={styles.controlLabel}>helperText</span>
            <input
              className={styles.controlInput}
              value={helperText}
              onChange={(e) => setHelperText(e.target.value)}
              placeholder="optional"
            />
          </label>
          <label className={styles.controlCheck}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            disabled
          </label>
        </>
      }
      variantsBlurb="Kind = field purpose (text · email · password · search · number)."
      variants={
        <div className={`${styles.grid} ${styles.gridWide}`}>
          {KINDS.map((k) => (
            <div key={k} className={styles.specimen}>
              <span className={styles.specimenLabel}>{k}</span>
              <Input kind={k} label={k} size="m" placeholder={k} />
            </div>
          ))}
        </div>
      }
      sizesBlurb="S · M · L — caption1 / body3 / body2."
      sizes={
        <div className={`${styles.grid} ${styles.gridWide}`}>
          {SIZES.map((s) => (
            <div key={s} className={styles.specimen}>
              <span className={styles.specimenLabel}>{s.toUpperCase()}</span>
              <Input size={s} label={`Size ${s.toUpperCase()}`} />
            </div>
          ))}
        </div>
      }
      statesBlurb="Focus is :focus-within. Error & Disabled are props / native."
      states={
        <div className={`${styles.grid} ${styles.gridWide}`}>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Default</span>
            <Input label="Default" placeholder="입력" />
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Error</span>
            <Input
              label="Error"
              state="error"
              helperText="Required"
              defaultValue=""
            />
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Disabled</span>
            <Input label="Disabled" disabled defaultValue="읽기 전용" />
          </div>
        </div>
      }
      props={PROPS}
      tokens={TOKENS}
      code={CODE}
      accessibility={[
        "Visible <label htmlFor> linked to input id (useId fallback).",
        "helperText connected via aria-describedby.",
        "state=\"error\" sets aria-invalid.",
        "Password reveal control has aria-label (Show/Hide password).",
        "Keyboard: Tab to focus · native typing · Search type supports clear on some browsers.",
        "Do not rely on placeholder as the only accessible name.",
      ]}
      bestPractices={[
        "Search First — Search Input은 화면 최상단 (Rule #1).",
        "Search 아래 또 Search를 두지 않음 (Never · filter-below-search).",
        "에러는 state=\"error\" + helperText로 원인 제시.",
        "폼 안 Table 금지 — 입력은 Form / CRUD Pattern에서 구성.",
        "kind에 맞는 autocomplete 속성 사용 (email, current-password 등).",
        "Kit Input만 사용 — 새 텍스트 필드 스타일을 발명하지 않음.",
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
