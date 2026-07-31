"use client";

import { useMemo, useState } from "react";
import {
  Table,
  type SortDirection,
  type TableDensity,
} from "@/design-system/components/table/Table";
import type { ComponentDocEntry } from "@/playground/catalog";
import { ComponentDetailLayout } from "../ComponentDetailLayout";
import type { PropDef, RelatedPatternLink, TokenEntry } from "../types";
import styles from "../ComponentDetail.module.css";

type DemoRow = {
  id: string;
  name: string;
  email: string;
  status: string;
};

const ROWS: DemoRow[] = [
  { id: "1", name: "김민수", email: "minsu@example.com", status: "활성" },
  { id: "2", name: "이서연", email: "seoyeon@example.com", status: "대기" },
  { id: "3", name: "박준호", email: "junho@example.com", status: "활성" },
  { id: "4", name: "최유진", email: "yujin@example.com", status: "종료" },
];

const PROPS: PropDef[] = [
  {
    name: "density",
    type: '"dense" | "comfortable"',
    defaultValue: '"dense"',
    description: "Admin dense (40px) vs Portal comfortable (48px) row height.",
  },
  {
    name: "Table.Scroll",
    type: "compound",
    description: "Wraps native <table> with horizontal scroll.",
  },
  {
    name: "Table.Header / Body / Row",
    type: "compound",
    description: "Semantic thead / tbody / tr. Row supports selected · error.",
  },
  {
    name: "Table.Head",
    type: "align · sortable · sortDirection · onSort",
    description: "Header cell with optional sort button + aria-sort.",
  },
  {
    name: "Table.Cell",
    type: "align?: left | center | right",
    description: "Body cell alignment.",
  },
  {
    name: "Table.Checkbox",
    type: "checked · indeterminate · onChange · aria-label",
    description: "Row / select-all checkbox.",
  },
  {
    name: "Table.Pagination",
    type: "page · pageCount · onPageChange",
    description: "nav[aria-label=Pagination] with first/prev/next/last.",
  },
  {
    name: "Table.Toolbar",
    type: "compound",
    description: "Optional toolbar slot above the scroll region.",
  },
];

const TOKENS: TokenEntry[] = [
  { name: "--density-dense-tableRowHeight (40px)", role: "Dense row height" },
  { name: "--density-comfortable-tableRowHeight (48px)", role: "Comfortable row height" },
  { name: "--density-*-tableHeaderFontSize / BodyFontSize", role: "Header · body type" },
  { name: "--color-grey-0 / 50 / 300 / 500 / 700 / 900", role: "Surface · borders · text" },
  { name: "--color-surface-rowHover", role: "Hover · selected row" },
  { name: "--color-surface-rowError", role: "Error row" },
  { name: "--color-primary-500 / 700", role: "Sort accent · page active" },
  { name: "--spacing-4 / 8 / 12", role: "Gaps · cell padding" },
  { name: "--radius / --preview-radius-control", role: "Scroll · page button radius" },
  { name: "--typography-caption1-fontSize", role: "Pagination buttons" },
  { name: "--typography-fontFamily-sans", role: "Font family" },
  { name: "--typography-fontWeight-medium", role: "Page button weight" },
  { name: "--motion-duration-fast", role: "Row hover transition" },
  { name: "--motion-easing-standard", role: "Easing" },
];

const RELATED: RelatedPatternLink[] = [
  {
    id: "data-table",
    name: "Data Table Pattern",
    href: "/patterns/data-table",
    note: "Search → Filter → Bulk → Table → Pagination.",
  },
  {
    id: "search",
    name: "Search Pattern",
    href: "/patterns/search",
    note: "Search First above the table stack.",
  },
  {
    id: "filter",
    name: "Filter Pattern",
    href: "/patterns/filter",
    note: "Filter below Search, above Data.",
  },
  {
    id: "detail",
    name: "Detail Pattern",
    href: "/patterns/detail",
    note: "Row 「상세」→ Drawer (목록 유지).",
  },
  {
    id: "dialog",
    name: "Dialog Pattern",
    href: "/patterns/dialog",
    note: "Bulk / row delete → Confirm.",
  },
];

const CODE = `import { Table } from "@/design-system/components";

<Table density="dense">
  <Table.Scroll>
    <Table.Header>
      <Table.Row>
        <Table.Head>
          <Table.Checkbox
            aria-label="전체 선택"
            checked={allSelected}
            indeterminate={someSelected}
            onChange={toggleAll}
          />
        </Table.Head>
        <Table.Head sortable sortDirection={dir} onSort={toggleSort}>
          이름
        </Table.Head>
        <Table.Head>이메일</Table.Head>
        <Table.Head>상태</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {rows.map((row) => (
        <Table.Row key={row.id} selected={selected.has(row.id)}>
          <Table.Cell>
            <Table.Checkbox
              aria-label={\`\${row.name} 선택\`}
              checked={selected.has(row.id)}
              onChange={() => toggle(row.id)}
            />
          </Table.Cell>
          <Table.Cell>{row.name}</Table.Cell>
          <Table.Cell>{row.email}</Table.Cell>
          <Table.Cell>{row.status}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Scroll>
  <Table.Pagination page={page} pageCount={3} onPageChange={setPage} />
</Table>`;

export function TableDetail({ doc }: { doc: ComponentDocEntry }) {
  const [density, setDensity] = useState<TableDensity>("dense");
  const [sortDir, setSortDir] = useState<SortDirection>("none");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [showErrorRow, setShowErrorRow] = useState(false);

  const sorted = useMemo(() => {
    if (sortDir === "none") return ROWS;
    const copy = [...ROWS];
    copy.sort((a, b) =>
      sortDir === "asc"
        ? a.name.localeCompare(b.name, "ko")
        : b.name.localeCompare(a.name, "ko"),
    );
    return copy;
  }, [sortDir]);

  const ids = sorted.map((r) => r.id);
  const allSelected = ids.length > 0 && ids.every((id) => selected.has(id));
  const someSelected =
    ids.some((id) => selected.has(id)) && !allSelected;

  function toggleSort() {
    setSortDir((d) =>
      d === "none" ? "asc" : d === "asc" ? "desc" : "none",
    );
  }

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(ids) : new Set());
  }

  function toggleOne(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  const previewTable = (
    <Table density={density}>
      <Table.Toolbar>
        <span
          style={{
            fontSize: "var(--typography-caption1-fontSize)",
            color: "var(--color-grey-600)",
          }}
        >
          {selected.size > 0
            ? `${selected.size}건 선택됨`
            : `Density: ${density}`}
        </span>
      </Table.Toolbar>
      <Table.Scroll>
        <Table.Header>
          <Table.Row>
            <Table.Head>
              <Table.Checkbox
                aria-label="전체 선택"
                checked={allSelected}
                indeterminate={someSelected}
                onChange={toggleAll}
              />
            </Table.Head>
            <Table.Head
              sortable
              sortDirection={sortDir}
              onSort={toggleSort}
            >
              이름
            </Table.Head>
            <Table.Head>이메일</Table.Head>
            <Table.Head>상태</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sorted.map((row, i) => (
            <Table.Row
              key={row.id}
              selected={selected.has(row.id)}
              error={showErrorRow && i === 0}
            >
              <Table.Cell>
                <Table.Checkbox
                  aria-label={`${row.name} 선택`}
                  checked={selected.has(row.id)}
                  onChange={(c) => toggleOne(row.id, c)}
                />
              </Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell>{row.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Scroll>
      <Table.Pagination
        page={page}
        pageCount={3}
        onPageChange={setPage}
      />
    </Table>
  );

  return (
    <ComponentDetailLayout
      doc={doc}
      previewWide
      preview={previewTable}
      previewNote="Compound Table API — use with Data Table Pattern (Search → Filter → Data → Pagination)."
      controls={
        <>
          <ControlSelect
            label="density"
            value={density}
            options={["dense", "comfortable"]}
            onChange={(v) => setDensity(v as TableDensity)}
          />
          <label className={styles.controlCheck}>
            <input
              type="checkbox"
              checked={showErrorRow}
              onChange={(e) => setShowErrorRow(e.target.checked)}
            />
            demo error row
          </label>
          <p className={styles.controlHint}>
            Click column header to sort · checkboxes for selection · pagination below.
          </p>
        </>
      }
      variantsBlurb="Density variants — Dense (Admin) · Comfortable (Portal)."
      variants={
        <div className={styles.grid}>
          {(["dense", "comfortable"] as const).map((d) => (
            <div key={d} className={styles.specimen}>
              <span className={styles.specimenLabel}>{d}</span>
              <MiniTable density={d} />
            </div>
          ))}
        </div>
      }
      sizesBlurb="Row height comes from density tokens (40 / 48), not a separate size prop."
      sizes={
        <div className={styles.panel} style={{ padding: 0, border: "none", boxShadow: "none" }}>
          <ul className={styles.list}>
            <li>
              <strong>dense</strong> —{" "}
              <code>--density-dense-tableRowHeight</code> (40px) · Admin lists
            </li>
            <li>
              <strong>comfortable</strong> —{" "}
              <code>--density-comfortable-tableRowHeight</code> (48px) · Portal
            </li>
            <li>
              DATA_DENSITY: item count ≥ 20 → Table; &lt; 20 → Card/List first.
            </li>
          </ul>
        </div>
      }
      statesBlurb="Hover (CSS) · Selected · Error on Table.Row."
      states={
        <div className={styles.grid}>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Default</span>
            <MiniTable density="dense" />
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Selected</span>
            <MiniTable density="dense" selected />
          </div>
          <div className={styles.specimen}>
            <span className={styles.specimenLabel}>Error</span>
            <MiniTable density="dense" error />
          </div>
        </div>
      }
      props={PROPS}
      tokens={TOKENS}
      code={CODE}
      accessibility={[
        "Native <table> / <th> / <td> semantics inside Table.Scroll.",
        "Sortable headers: button + aria-sort (ascending | descending | none).",
        "Table.Checkbox requires aria-label (row name or 전체 선택).",
        "Pagination is <nav aria-label=\"Pagination\"> with labeled controls.",
        "Selected / error rows use data attributes + background tokens — not color alone for meaning when paired with checkbox/state.",
        "Keyboard: Tab to sort buttons · checkboxes · pagination.",
      ]}
      bestPractices={[
        "Admin stack: Search → Filter → (Bulk) → Table → Pagination (Rule #8).",
        "상세·수정은 Drawer 우선 — 목록 컨텍스트 유지 (detail-drawer).",
        "삭제는 Confirm Dialog + Danger Button (delete-confirm).",
        "Bulk Action은 선택과 함께 — 선택 없을 때 Destructive 비활성.",
        "Loading은 Skeleton · Empty는 CTA 필수 (Empty Pattern).",
        "Form 안에 Table 금지 — 편집은 Drawer/Page Form.",
      ]}
      related={RELATED}
    />
  );
}

function MiniTable({
  density,
  selected,
  error,
}: {
  density: TableDensity;
  selected?: boolean;
  error?: boolean;
}) {
  return (
    <Table density={density}>
      <Table.Scroll>
        <Table.Header>
          <Table.Row>
            <Table.Head>Col</Table.Head>
            <Table.Head>Value</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row selected={selected} error={error}>
            <Table.Cell>A</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>B</Table.Cell>
            <Table.Cell>2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Scroll>
    </Table>
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
