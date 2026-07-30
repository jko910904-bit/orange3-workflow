"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Input,
  Table,
  type SortDirection,
  type TableDensity,
} from "@/design-system/components";
import { DensityProvider, useDensity } from "@/design-system/DensityProvider";

type Row = {
  id: string;
  name: string;
  status: string;
  count: number;
  error?: boolean;
};

const ALL_ROWS: Row[] = [
  { id: "1", name: "회원관리", status: "사용중", count: 120 },
  { id: "2", name: "상품목록", status: "대기", count: 45 },
  { id: "3", name: "정산내역", status: "오류", count: 8, error: true },
  { id: "4", name: "API 모니터링", status: "사용중", count: 980 },
  { id: "5", name: "권한설정", status: "사용중", count: 12 },
  { id: "6", name: "공지사항", status: "대기", count: 3 },
];

function cycleSort(current: SortDirection): SortDirection {
  if (current === "none") return "asc";
  if (current === "asc") return "desc";
  return "none";
}

function TableDemo() {
  const { surface, setSurface, label, density: providerDensity } = useDensity();
  const [density, setDensity] = useState<TableDensity>(providerDensity);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "count" | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("none");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    let rows = ALL_ROWS.filter(
      (r) =>
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q),
    );
    if (sortKey && sortDir !== "none") {
      rows = [...rows].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp =
          typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv), "ko");
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [filter, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allPageSelected =
    pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));
  const somePageSelected = pageRows.some((r) => selected.has(r.id));

  function toggleSort(key: "name" | "count") {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      return;
    }
    const next = cycleSort(sortDir);
    setSortDir(next);
    if (next === "none") setSortKey(null);
  }

  function toggleAll(checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      pageRows.forEach((r) => {
        if (checked) next.add(r.id);
        else next.delete(r.id);
      });
      return next;
    });
  }

  return (
    <main className="ds-stack mx-auto max-w-5xl px-6 py-12">
      <header className="ds-stack" style={{ gap: "0.5rem" }}>
        <p className="ds-muted text-sm font-medium tracking-wide uppercase">
          Components · Table
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Dense / Comfortable · Header / Row / Cell
        </h1>
        <p className="ds-muted text-sm">
          Sorting · Filter · Checkbox · Pagination · {label}
        </p>
      </header>

      <div className="ds-row">
        <Button
          variant={surface === "admin" ? "primary" : "ghost"}
          size="s"
          onClick={() => {
            setSurface("admin");
            setDensity("dense");
          }}
        >
          Dense (Admin)
        </Button>
        <Button
          variant={surface === "portal" ? "primary" : "ghost"}
          size="s"
          onClick={() => {
            setSurface("portal");
            setDensity("comfortable");
          }}
        >
          Comfortable (Portal)
        </Button>
      </div>

      <section className="ds-panel ds-stack">
        <Table density={density}>
          <Table.Toolbar>
            <div style={{ flex: 1, minWidth: 200 }}>
              <Input
                kind="search"
                size="s"
                label="Filter"
                placeholder="이름 / 상태 검색"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <Button variant="primary" size="s">
              조회
            </Button>
            <Button variant="ghost" size="s">
              선택 {selected.size}
            </Button>
          </Table.Toolbar>

          <Table.Scroll>
            <Table.Header>
              <Table.Row>
                <Table.Head align="center" style={{ width: 48 }}>
                  <Table.Checkbox
                    aria-label="Select all on page"
                    checked={allPageSelected}
                    indeterminate={somePageSelected && !allPageSelected}
                    onChange={toggleAll}
                  />
                </Table.Head>
                <Table.Head
                  sortable
                  sortDirection={sortKey === "name" ? sortDir : "none"}
                  onSort={() => toggleSort("name")}
                >
                  화면명
                </Table.Head>
                <Table.Head align="center">상태</Table.Head>
                <Table.Head
                  align="right"
                  sortable
                  sortDirection={sortKey === "count" ? sortDir : "none"}
                  onSort={() => toggleSort("count")}
                >
                  건수
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {pageRows.map((row) => (
                <Table.Row
                  key={row.id}
                  selected={selected.has(row.id)}
                  error={row.error}
                >
                  <Table.Cell align="center">
                    <Table.Checkbox
                      aria-label={`Select ${row.name}`}
                      checked={selected.has(row.id)}
                      onChange={(checked) => {
                        setSelected((prev) => {
                          const next = new Set(prev);
                          if (checked) next.add(row.id);
                          else next.delete(row.id);
                          return next;
                        });
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell align="center">{row.status}</Table.Cell>
                  <Table.Cell align="right">{row.count}</Table.Cell>
                </Table.Row>
              ))}
              {pageRows.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} align="center">
                    검색 결과가 없습니다.
                  </Table.Cell>
                </Table.Row>
              ) : null}
            </Table.Body>
          </Table.Scroll>

          <Table.Pagination
            page={Math.min(page, pageCount)}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </Table>
      </section>
    </main>
  );
}

export default function TablePreviewPage() {
  return (
    <DensityProvider defaultSurface="admin">
      <TableDemo />
    </DensityProvider>
  );
}
