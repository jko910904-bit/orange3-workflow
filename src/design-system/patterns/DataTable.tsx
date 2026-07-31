"use client";

import { useMemo, useState } from "react";
import { Drawer } from "antd";
import { Button, Input, Table } from "@/design-system/components";
import { AdminShell } from "./admin/AdminShell";
import styles from "./DataTable.module.css";

type Status = "활성" | "대기" | "중지";

type Row = {
  id: string;
  name: string;
  email: string;
  role: string;
  dept: string;
  status: Status;
  updatedAt: string;
};

const ALL_ROWS: Row[] = [
  {
    id: "1",
    name: "홍길동",
    email: "hong@example.com",
    role: "관리자",
    dept: "공공사업부",
    status: "활성",
    updatedAt: "2025-06-12",
  },
  {
    id: "2",
    name: "김영희",
    email: "kim@example.com",
    role: "운영",
    dept: "금융사업부",
    status: "대기",
    updatedAt: "2025-06-10",
  },
  {
    id: "3",
    name: "이철수",
    email: "lee@example.com",
    role: "조회",
    dept: "글로벌사업부",
    status: "활성",
    updatedAt: "2025-06-08",
  },
  {
    id: "4",
    name: "박민수",
    email: "park@example.com",
    role: "운영",
    dept: "공공사업부",
    status: "중지",
    updatedAt: "2025-06-05",
  },
  {
    id: "5",
    name: "최유진",
    email: "choi@example.com",
    role: "관리자",
    dept: "금융사업부",
    status: "활성",
    updatedAt: "2025-06-03",
  },
  {
    id: "6",
    name: "정수진",
    email: "jung@example.com",
    role: "조회",
    dept: "글로벌사업부",
    status: "대기",
    updatedAt: "2025-06-01",
  },
  {
    id: "7",
    name: "한지민",
    email: "han@example.com",
    role: "운영",
    dept: "공공사업부",
    status: "활성",
    updatedAt: "2025-05-28",
  },
  {
    id: "8",
    name: "오세훈",
    email: "oh@example.com",
    role: "조회",
    dept: "금융사업부",
    status: "중지",
    updatedAt: "2025-05-22",
  },
];

type SortKey = "name" | "updatedAt" | "status";
type StatusFilter = "all" | Status;

const PAGE_SIZE = 5;

function statusTone(status: Status): "ok" | "warn" | "danger" {
  if (status === "활성") return "ok";
  if (status === "대기") return "warn";
  return "danger";
}

/**
 * Data Table Pattern — Compose preview (Kit components only).
 * Stack: Search → Filter → Bulk Action → Table → Pagination
 * States: Empty · Loading (preview-togglable)
 */
export function DataTablePattern() {
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc" | "none">("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [forceEmpty, setForceEmpty] = useState(false);
  const [forceLoading, setForceLoading] = useState(false);
  const [rows, setRows] = useState(ALL_ROWS);
  const [drawerRow, setDrawerRow] = useState<Row | null>(null);

  const filtered = useMemo(() => {
    if (forceEmpty || forceLoading) return [];
    let next = rows.filter((r) => {
      const q = appliedQuery.trim();
      const matchQ =
        !q ||
        r.name.includes(q) ||
        r.email.includes(q) ||
        r.dept.includes(q) ||
        r.role.includes(q);
      const matchStatus =
        statusFilter === "all" || r.status === statusFilter;
      return matchQ && matchStatus;
    });
    if (sortDir !== "none") {
      next = [...next].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        const cmp = String(av).localeCompare(String(bv), "ko");
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return next;
  }, [rows, appliedQuery, statusFilter, sortKey, sortDir, forceEmpty, forceLoading]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const pageIds = pageRows.map((r) => r.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const somePageSelected =
    pageIds.some((id) => selected.has(id)) && !allPageSelected;

  const selectedCount = selected.size;
  const hasSelection = selectedCount > 0;

  function toggleSort(key: SortKey) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      return;
    }
    setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? "none" : "asc"));
  }

  function toggleAllPage(checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const id of pageIds) {
        if (checked) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }

  function toggleRow(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function runSearch() {
    setAppliedQuery(query);
    setPage(1);
    setSelected(new Set());
  }

  function resetFilters() {
    setQuery("");
    setAppliedQuery("");
    setStatusFilter("all");
    setPage(1);
    setForceEmpty(false);
    setForceLoading(false);
    setSelected(new Set());
  }

  function confirmDelete() {
    if (!hasSelection) return;
    const ok = window.confirm(
      `선택한 ${selectedCount}건을 삭제할까요? 이 작업은 되돌릴 수 없습니다.`,
    );
    if (!ok) return;
    setRows((prev) => prev.filter((r) => !selected.has(r.id)));
    setSelected(new Set());
    setPage(1);
  }

  return (
    <AdminShell
      title="Data Table"
      breadcrumb="Home / UX Patterns / Data Table"
      lnbTitle="목록관리"
      lnbItems={[
        { label: "데이터 테이블", active: true },
        { label: "필터 설정" },
        { label: "내보내기" },
      ]}
      showPageHeader={false}
    >
    <section className={styles.root} aria-label="Data Table Pattern preview">
      <div className={styles.intro}>
        <div>
          <h2 className={styles.title}>Data Table — Compose</h2>
          <p className={styles.subtitle}>
            Stack: Search → Filter → Bulk → Table → Pagination. Empty · Loading
            토글. 「상세」= Drawer. BUTTON_RULES: Primary=조회 · Danger=삭제 ·
            Secondary=초기화.
          </p>
        </div>
        <div className={styles.introActions}>
          <Button
            variant="ghost"
            size="s"
            onClick={() => {
              setForceEmpty((v) => !v);
              setForceLoading(false);
              setPage(1);
              setSelected(new Set());
            }}
          >
            {forceEmpty ? "데이터 보기" : "Empty 상태"}
          </Button>
          <Button
            variant="ghost"
            size="s"
            onClick={() => {
              setForceLoading((v) => !v);
              setForceEmpty(false);
              setPage(1);
              setSelected(new Set());
            }}
          >
            {forceLoading ? "데이터 보기" : "Loading 상태"}
          </Button>
        </div>
      </div>

      {/* 1. Search */}
      <div className={styles.searchBar} role="search">
        <div className={styles.searchField}>
          <Input
            kind="search"
            size="s"
            label="검색"
            placeholder="이름 / 이메일 / 부서"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
          />
        </div>
        <div className={styles.searchActions}>
          <Button
            variant="primary"
            size="s"
            onClick={runSearch}
            data-primary-cta="true"
          >
            조회
          </Button>
          <Button variant="secondary" size="s" onClick={resetFilters}>
            초기화
          </Button>
        </div>
      </div>

      {/* 2. Filter */}
      <div className={styles.filterBar} role="group" aria-label="필터">
        <span className={styles.filterLabel}>상태</span>
        <div className={styles.filterGroup}>
          {(
            [
              ["all", "전체"],
              ["활성", "활성"],
              ["대기", "대기"],
              ["중지", "중지"],
            ] as const
          ).map(([value, label]) => (
            <Button
              key={value}
              variant={statusFilter === value ? "secondary" : "ghost"}
              size="s"
              aria-pressed={statusFilter === value}
              onClick={() => {
                setStatusFilter(value);
                setPage(1);
                setSelected(new Set());
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* 3. Bulk Action */}
      <div
        className={styles.bulkBar}
        role="toolbar"
        aria-label="Bulk Action"
        data-empty={!hasSelection || undefined}
      >
        <span className={styles.bulkLabel}>
          {hasSelection ? (
            <>
              <strong>{selectedCount}</strong>건 선택됨
            </>
          ) : (
            "항목을 선택하세요"
          )}
        </span>
        <div className={styles.bulkActions}>
          <Button
            variant="danger"
            size="s"
            disabled={!hasSelection}
            onClick={confirmDelete}
          >
            삭제
          </Button>
          <Button
            variant="tertiary"
            size="s"
            disabled={!hasSelection || filtered.length === 0}
          >
            내보내기
          </Button>
          <Button
            variant="ghost"
            size="s"
            disabled={!hasSelection}
            onClick={() => setSelected(new Set())}
          >
            선택 해제
          </Button>
        </div>
      </div>

      {/* 4–5. Table + Pagination */}
      <Table density="dense" className={styles.table}>
        <Table.Toolbar>
          <p className={styles.total}>
            총 <strong>{forceLoading ? "—" : filtered.length}</strong>건
            {forceEmpty ? " · Empty State" : null}
            {forceLoading ? " · Loading State" : null}
          </p>
        </Table.Toolbar>

        {forceLoading ? (
          <div
            className={styles.loading}
            role="status"
            aria-busy="true"
            aria-label="로딩 중"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={styles.skeletonRow} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty} role="status">
            <p className={styles.emptyTitle}>표시할 데이터가 없습니다</p>
            <p className={styles.emptyDesc}>
              검색어·필터를 조정하거나 초기화한 뒤 다시 조회하세요.
            </p>
            <Button variant="secondary" size="s" onClick={resetFilters}>
              필터 초기화
            </Button>
          </div>
        ) : (
          <>
            <Table.Scroll className={styles.scroll}>
              <Table.Header>
                <Table.Row>
                  <Table.Head>
                    <Table.Checkbox
                      checked={allPageSelected}
                      indeterminate={somePageSelected}
                      onChange={toggleAllPage}
                      aria-label="현재 페이지 전체 선택"
                    />
                  </Table.Head>
                  <Table.Head
                    sortable
                    sortDirection={sortKey === "name" ? sortDir : "none"}
                    onSort={() => toggleSort("name")}
                  >
                    이름
                  </Table.Head>
                  <Table.Head>이메일</Table.Head>
                  <Table.Head>역할</Table.Head>
                  <Table.Head>부서</Table.Head>
                  <Table.Head
                    align="center"
                    sortable
                    sortDirection={sortKey === "status" ? sortDir : "none"}
                    onSort={() => toggleSort("status")}
                  >
                    상태
                  </Table.Head>
                  <Table.Head
                    sortable
                    sortDirection={sortKey === "updatedAt" ? sortDir : "none"}
                    onSort={() => toggleSort("updatedAt")}
                  >
                    수정일
                  </Table.Head>
                  <Table.Head align="right">액션</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pageRows.map((row) => {
                  const isSelected = selected.has(row.id);
                  return (
                    <Table.Row key={row.id} selected={isSelected}>
                      <Table.Cell>
                        <Table.Checkbox
                          checked={isSelected}
                          onChange={(checked) => toggleRow(row.id, checked)}
                          aria-label={`${row.name} 선택`}
                        />
                      </Table.Cell>
                      <Table.Cell>{row.name}</Table.Cell>
                      <Table.Cell>{row.email}</Table.Cell>
                      <Table.Cell>{row.role}</Table.Cell>
                      <Table.Cell>{row.dept}</Table.Cell>
                      <Table.Cell align="center">
                        <span
                          className={styles.badge}
                          data-tone={statusTone(row.status)}
                        >
                          {row.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{row.updatedAt}</Table.Cell>
                      <Table.Cell align="right">
                        <Button
                          variant="ghost"
                          size="s"
                          onClick={() => setDrawerRow(row)}
                          aria-label={`${row.name} 상세 (Drawer)`}
                        >
                          상세
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Scroll>
            <Table.Pagination
              page={safePage}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </>
        )}
      </Table>

      <Drawer
        title="회원 상세"
        open={drawerRow != null}
        onClose={() => setDrawerRow(null)}
        size={400}
      >
        {drawerRow ? (
          <dl className={styles.drawerDl}>
            {(
              [
                ["이름", drawerRow.name],
                ["이메일", drawerRow.email],
                ["역할", drawerRow.role],
                ["부서", drawerRow.dept],
                ["상태", drawerRow.status],
                ["수정일", drawerRow.updatedAt],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className={styles.drawerRow}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <p className={styles.drawerHint}>
          DRAWER_VS_PAGE: 빠른 확인·목록 유지 → Drawer (풀페이지 아님)
        </p>
      </Drawer>
    </section>
    </AdminShell>
  );
}
