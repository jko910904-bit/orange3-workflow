"use client";

import { useState } from "react";
import { Select } from "antd";
import type { ComponentDocEntry } from "@/playground/catalog";
import { ComponentDetailLayout } from "../ComponentDetailLayout";
import type { PropDef, RelatedPatternLink, TokenEntry } from "../types";
import styles from "../ComponentDetail.module.css";

const STATUS_OPTIONS = [
  { value: "active", label: "활성" },
  { value: "pending", label: "대기" },
  { value: "closed", label: "종료" },
];

const PROPS: PropDef[] = [
  {
    name: "options",
    type: "{ value, label }[]",
    description: "Selectable items.",
  },
  {
    name: "value / defaultValue",
    type: "string | string[]",
    description: "Controlled or uncontrolled value (array when mode=multiple).",
  },
  {
    name: "mode",
    type: '"multiple" | "tags" | undefined',
    defaultValue: "undefined",
    description: "Single select by default; multiple for multi-select filters.",
  },
  {
    name: "size",
    type: '"small" | "middle" | "large"',
    defaultValue: '"middle"',
    description: "Aligned to AntdProvider control heights (32 / 40).",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Shown when empty — pair with a visible field label in forms.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables interaction.",
  },
  {
    name: "allowClear",
    type: "boolean",
    defaultValue: "false",
    description: "Shows clear control when a value is set.",
  },
  {
    name: "status",
    type: '"error" | "warning"',
    description: "Validation visual state.",
  },
  {
    name: "onChange",
    type: "(value) => void",
    description: "Fires when selection changes.",
  },
];

const TOKENS: TokenEntry[] = [
  {
    name: "--color-primary-500 (via Antd colorPrimary)",
    role: "Focus · selected · primary accent (AntdProvider theme)",
  },
  {
    name: "--radius-4 (theme borderRadius: 4)",
    role: "Control corner radius — kit radius token",
  },
  {
    name: "controlHeight 32 / 40",
    role: "Middle / large — matches kit Input M / L heights",
  },
  {
    name: "--typography-fontFamily-sans (theme fontFamily)",
    role: "Shared sans stack with Design Kit",
  },
  {
    name: "--color-semantic-danger (theme colorError)",
    role: "status=\"error\" border",
  },
  {
    name: "ANTD_SUPPLEMENTS · Select",
    role: "Supplemental kit component — not a separate primitive to invent",
  },
];

const RELATED: RelatedPatternLink[] = [
  {
    id: "filter",
    name: "Filter Pattern",
    href: "/patterns/filter",
    note: "Status · category selects below Search.",
  },
  {
    id: "data-table",
    name: "Data Table Pattern",
    href: "/patterns/data-table",
    note: "Filter bar → Table stack (Admin).",
  },
  {
    id: "dashboard",
    name: "Dashboard Pattern",
    href: "/patterns/dashboard",
    note: "Period / segment filters for KPI views.",
  },
  {
    id: "settings",
    name: "Settings Pattern",
    href: "/patterns/settings",
    note: "Preference selects in settings forms.",
  },
];

const CODE = `import { Select } from "antd";

// Filter Pattern — below Search, not a second Search
<label>
  상태
  <Select
    allowClear
    placeholder="상태 선택"
    style={{ width: 200 }}
    options={[
      { value: "active", label: "활성" },
      { value: "pending", label: "대기" },
      { value: "closed", label: "종료" },
    ]}
    onChange={(value) => setStatus(value)}
  />
</label>

// Multi-select filter
<Select
  mode="multiple"
  placeholder="태그"
  options={tagOptions}
  style={{ minWidth: 240 }}
/>`;

export function SelectDetail({ doc }: { doc: ComponentDocEntry }) {
  const [size, setSize] = useState<"small" | "middle" | "large">("middle");
  const [mode, setMode] = useState<"single" | "multiple">("single");
  const [disabled, setDisabled] = useState(false);
  const [allowClear, setAllowClear] = useState(true);
  const [status, setStatus] = useState<"default" | "error">("default");
  const [placeholder, setPlaceholder] = useState("상태 선택");
  const [value, setValue] = useState<string | string[] | undefined>(undefined);

  return (
    <ComponentDetailLayout
      doc={doc}
      preview={
        <div style={{ width: "100%", maxWidth: 280 }}>
          <label className={styles.controlRow}>
            <span className={styles.controlLabel}>상태</span>
            <Select
              size={size}
              mode={mode === "multiple" ? "multiple" : undefined}
              disabled={disabled}
              allowClear={allowClear}
              status={status === "error" ? "error" : undefined}
              placeholder={placeholder}
              options={STATUS_OPTIONS}
              value={value}
              onChange={(v) => setValue(v)}
              style={{ width: "100%" }}
              aria-label="상태"
            />
          </label>
        </div>
      }
      previewNote="Select is an Antd supplement themed via AntdProvider to kit tokens (OWN_DS remains Button/Input/Table/Card)."
      controls={
        <>
          <ControlSelect
            label="size"
            value={size}
            options={["small", "middle", "large"]}
            onChange={(v) =>
              setSize(v as "small" | "middle" | "large")
            }
          />
          <ControlSelect
            label="mode"
            value={mode}
            options={["single", "multiple"]}
            onChange={(v) => {
              setMode(v as "single" | "multiple");
              setValue(undefined);
            }}
          />
          <ControlSelect
            label="status"
            value={status}
            options={["default", "error"]}
            onChange={(v) => setStatus(v as "default" | "error")}
          />
          <label className={styles.controlRow}>
            <span className={styles.controlLabel}>placeholder</span>
            <input
              className={styles.controlInput}
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </label>
          <label className={styles.controlCheck}>
            <input
              type="checkbox"
              checked={allowClear}
              onChange={(e) => setAllowClear(e.target.checked)}
            />
            allowClear
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
      variantsBlurb="Single vs multiple — both used in Filter Pattern."
      variants={
        <div className={styles.grid}>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Single</span>
            <Select
              placeholder="단일 선택"
              options={STATUS_OPTIONS}
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Multiple</span>
            <Select
              mode="multiple"
              placeholder="다중 선택"
              options={STATUS_OPTIONS}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      }
      sizesBlurb="Antd small / middle / large — middle≈32px kit M."
      sizes={
        <div className={styles.grid}>
          {(["small", "middle", "large"] as const).map((s) => (
            <div key={s} className={styles.specimen}>
              <span className={styles.specimenLabel}>{s}</span>
              <Select
                size={s}
                placeholder={s}
                options={STATUS_OPTIONS}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>
      }
      statesBlurb="Open / hover are Antd. Error & Disabled via props."
      states={
        <div className={styles.grid}>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Default</span>
            <Select
              placeholder="Default"
              options={STATUS_OPTIONS}
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Error</span>
            <Select
              status="error"
              placeholder="Error"
              options={STATUS_OPTIONS}
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Disabled</span>
            <Select
              disabled
              defaultValue="active"
              options={STATUS_OPTIONS}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      }
      props={PROPS}
      tokens={TOKENS}
      tokensBlurb="Select is themed in src/design-system/antd/theme.ts — map to existing kit tokens; do not invent new palette values."
      code={CODE}
      accessibility={[
        "Combobox pattern — Arrow keys open/navigate; Enter selects; Escape closes.",
        "Provide a visible field label (or aria-label) — placeholder is not enough.",
        "status=\"error\" should be paired with helper/error text in the form pattern.",
        "Disabled options are skipped in keyboard navigation.",
        "Multi-select announces selected tags; ensure clear affordance (allowClear).",
      ]}
      bestPractices={[
        "Filter Before Data — Select는 Search 아래 Filter 영역에 배치 (Rule #2).",
        "Search 아래 또 Search를 만들지 말고, 상태·카테고리는 Select로.",
        "옵션이 매우 많으면 Searchable Select (showSearch)를 검토.",
        "폼에서는 label + Select + helper/error를 한 필드로 묶기.",
        "Kit gap이 증명되기 전 새 Select primitive를 만들지 않음 — Antd supplement 재사용.",
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
