"use client";

import {
  createContext,
  useContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";
import type { Density } from "@/design-system/tokens";
import styles from "./table.module.css";

export type TableDensity = Density; // dense | comfortable
export type SortDirection = "asc" | "desc" | "none";
export type CellAlign = "left" | "center" | "right";

type TableContextValue = {
  density: TableDensity;
};

const TableContext = createContext<TableContextValue>({
  density: "dense",
});

export type TableProps = {
  /** Dense (Admin) | Comfortable (Portal) — defaults to surrounding DensityProvider via data-density, override here */
  density?: TableDensity;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Design System Table
 *
 * Density: Dense | Comfortable
 * Structure: Header | Row | Cell
 * Features: Sorting | Filter | Checkbox | Pagination
 */
export function Table({
  density = "dense",
  className,
  children,
  ...rest
}: TableProps) {
  return (
    <TableContext.Provider value={{ density }}>
      <div
        className={cn(styles.root, className)}
        data-density={density}
        data-table-density={density}
        {...rest}
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

export function TableToolbar({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.toolbar, className)} {...rest}>
      {children}
    </div>
  );
}

export function TableScroll({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(styles.scroll, className)} {...rest}>
      <table className={styles.table}>{children}</table>
    </div>
  );
}

export function TableHeader({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn(styles.thead, className)} {...rest}>
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn(styles.tbody, className)} {...rest}>
      {children}
    </tbody>
  );
}

export type TableRowProps = {
  selected?: boolean;
  error?: boolean;
  children?: ReactNode;
} & HTMLAttributes<HTMLTableRowElement>;

export function TableRow({
  selected,
  error,
  className,
  children,
  ...rest
}: TableRowProps) {
  return (
    <tr
      className={cn(
        styles.row,
        selected && styles.rowSelected,
        error && styles.rowError,
        className,
      )}
      data-selected={selected || undefined}
      data-error={error || undefined}
      {...rest}
    >
      {children}
    </tr>
  );
}

export type TableHeadProps = {
  align?: CellAlign;
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
  children?: ReactNode;
} & Omit<ThHTMLAttributes<HTMLTableCellElement>, "align">;

export function TableHead({
  align = "left",
  sortable,
  sortDirection = "none",
  onSort,
  className,
  children,
  ...rest
}: TableHeadProps) {
  const content = (
    <>
      <span className={styles.headLabel}>{children}</span>
      {sortable ? (
        <span className={styles.sortIcon} aria-hidden>
          {sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "↕"}
        </span>
      ) : null}
    </>
  );

  return (
    <th
      className={cn(
        styles.cell,
        styles.head,
        styles[`align${align[0].toUpperCase()}${align.slice(1)}`],
        sortable && styles.sortable,
        className,
      )}
      aria-sort={
        sortable
          ? sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
              ? "descending"
              : "none"
          : undefined
      }
      {...rest}
    >
      {sortable ? (
        <button type="button" className={styles.sortButton} onClick={onSort}>
          {content}
        </button>
      ) : (
        content
      )}
    </th>
  );
}

export type TableCellProps = {
  align?: CellAlign;
  children?: ReactNode;
} & Omit<TdHTMLAttributes<HTMLTableCellElement>, "align">;

export function TableCell({
  align = "left",
  className,
  children,
  ...rest
}: TableCellProps) {
  return (
    <td
      className={cn(
        styles.cell,
        styles[`align${align[0].toUpperCase()}${align.slice(1)}`],
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  );
}

export type TableCheckboxProps = {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  "aria-label"?: string;
  disabled?: boolean;
};

export function TableCheckbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled,
  "aria-label": ariaLabel = "Select row",
}: TableCheckboxProps) {
  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      checked={checked}
      disabled={disabled}
      aria-label={ariaLabel}
      ref={(el) => {
        if (el) el.indeterminate = indeterminate;
      }}
      onChange={(e) => onChange?.(e.target.checked)}
    />
  );
}

export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav className={cn(styles.pagination, className)} aria-label="Pagination">
      <PaginationButton
        aria-label="First page"
        disabled={page <= 1}
        onClick={() => onPageChange(1)}
      >
        |&lt;
      </PaginationButton>
      <PaginationButton
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        &lt;
      </PaginationButton>
      {pages.map((p) => (
        <PaginationButton
          key={p}
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
          active={p === page}
          onClick={() => onPageChange(p)}
        >
          {p}
        </PaginationButton>
      ))}
      <PaginationButton
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        &gt;
      </PaginationButton>
      <PaginationButton
        aria-label="Last page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(pageCount)}
      >
        &gt;|
      </PaginationButton>
    </nav>
  );
}

function PaginationButton({
  active,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(styles.pageButton, active && styles.pageActive, className)}
      {...rest}
    />
  );
}

export function useTableContext() {
  return useContext(TableContext);
}

Table.Toolbar = TableToolbar;
Table.Scroll = TableScroll;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Checkbox = TableCheckbox;
Table.Pagination = Pagination;
