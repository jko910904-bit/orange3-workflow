"use client";

import { useMemo, useState } from "react";
import { Drawer } from "antd";
import { Button, Input, Table } from "@/design-system/components";
import tableStyles from "../DataTable.module.css";
import { AdminShell } from "./AdminShell";
import styles from "./MemberManagement.module.css";

type Status = "활성" | "대기" | "중지";

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  dept: string;
  status: Status;
  updatedAt: string;
};

const SEED: Member[] = [
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
];

type StatusFilter = "all" | Status;

const PAGE_SIZE = 5;

function statusTone(status: Status): "ok" | "warn" | "danger" {
  if (status === "활성") return "ok";
  if (status === "대기") return "warn";
  return "danger";
}

/**
 * Screen: 회원관리 — live Compose preview
 * DRAWER_VS_PAGE: 상세·수정 = Drawer(목록 유지); 생성 = Page
 * Stack (JKO Rule #8): Search → Filter → Data → Pagination
 * Bulk sits with Data; Detail/Edit → Drawer (sticky 저장)
 */
export function MemberManagementPattern() {
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(SEED);

  const [active, setActive] = useState<Member | null>(null);
  const [draft, setDraft] = useState<Member | null>(null);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
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
  }, [rows, appliedQuery, statusFilter]);

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
    setSelected(new Set());
  }

  function openDrawer(row: Member) {
    setActive(row);
    setDraft({ ...row });
  }

  function closeDrawer() {
    setActive(null);
    setDraft(null);
  }

  function saveMember() {
    if (!draft) return;
    setRows((prev) =>
      prev.map((r) => (r.id === draft.id ? { ...draft } : r)),
    );
    setActive({ ...draft });
    closeDrawer();
  }

  function confirmDeleteSelected() {
    if (!hasSelection) return;
    const ok = window.confirm(
      `선택한 ${selectedCount}건을 삭제할까요? 이 작업은 되돌릴 수 없습니다.`,
    );
    if (!ok) return;
    setRows((prev) => prev.filter((r) => !selected.has(r.id)));
    setSelected(new Set());
    setPage(1);
    if (active && selected.has(active.id)) closeDrawer();
  }

  function confirmDeleteActive() {
    if (!active) return;
    const ok = window.confirm(
      `${active.name} 회원을 삭제할까요? 이 작업은 되돌릴 수 없습니다.`,
    );
    if (!ok) return;
    setRows((prev) => prev.filter((r) => r.id !== active.id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(active.id);
      return next;
    });
    closeDrawer();
  }

  return (
    <AdminShell
      title="회원관리"
      breadcrumb="Home / 시스템관리 / 회원관리"
      lnbTitle="시스템관리"
      lnbItems={[
        { label: "회원관리", active: true },
        { label: "권한관리" },
        { label: "접속이력" },
      ]}
      showPageHeader={false}
    >
    <section
      className={styles.root}
      aria-label="회원관리 Screen preview"
    >
      <div className={tableStyles.intro}>
        <div>
          <h2 className={tableStyles.title}>회원관리</h2>
          <p className={tableStyles.subtitle}>
            Admin 12-grid (canvas 1440 · sidebar 240 · content fluid). Rule #8:
            Search → Filter → Data → Pagination → Drawer. BUTTON_RULES:
            Primary=조회/저장 · Danger=삭제 · Secondary=취소/초기화. 생성=Page.
          </p>
        </div>
        <div className={tableStyles.introActions}>
          <Button
            variant="secondary"
            size="s"
            title="DRAWER_VS_PAGE: 생성 → Page"
          >
            회원 생성 (Page)
          </Button>
        </div>
      </div>

      {/* 조회 / 검색 — Search BP: input left · button right · Enter */}
      <div className={tableStyles.searchBar} role="search">
        <div className={tableStyles.searchField}>
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
        <div className={tableStyles.searchActions}>
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

      {/* 필터 */}
      <div className={tableStyles.filterBar} role="group" aria-label="필터">
        <span className={tableStyles.filterLabel}>상태</span>
        <div className={tableStyles.filterGroup}>
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

      {/* Bulk optional */}
      <div
        className={tableStyles.bulkBar}
        role="toolbar"
        aria-label="Bulk Action (part of Data)"
        data-empty={!hasSelection || undefined}
      >
        <span className={tableStyles.bulkLabel}>
          {hasSelection ? (
            <>
              <strong>{selectedCount}</strong>건 선택됨
            </>
          ) : (
            "항목을 선택하세요"
          )}
        </span>
        <div className={tableStyles.bulkActions}>
          <Button
            variant="danger"
            size="s"
            disabled={!hasSelection}
            onClick={confirmDeleteSelected}
          >
            삭제
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

      {/* 테이블 */}
      <Table density="dense" className={tableStyles.table}>
        <Table.Toolbar>
          <p className={tableStyles.total}>
            총 <strong>{filtered.length}</strong>건 · 「상세」는 Drawer (풀페이지
            아님)
          </p>
        </Table.Toolbar>

        {filtered.length === 0 ? (
          <div className={tableStyles.empty} role="status">
            <p className={tableStyles.emptyTitle}>표시할 회원이 없습니다</p>
            <p className={tableStyles.emptyDesc}>
              검색어·필터를 조정하거나 초기화한 뒤 다시 조회하세요.
            </p>
            <Button variant="secondary" size="s" onClick={resetFilters}>
              필터 초기화
            </Button>
          </div>
        ) : (
          <>
            <Table.Scroll className={tableStyles.scroll}>
              <Table.Header>
                <Table.Row>
                  <Table.Head>
                    <Table.Checkbox
                      checked={allPageSelected}
                      indeterminate={somePageSelected}
                      onChange={(checked) => {
                        setSelected((prev) => {
                          const next = new Set(prev);
                          for (const id of pageIds) {
                            if (checked) next.add(id);
                            else next.delete(id);
                          }
                          return next;
                        });
                      }}
                      aria-label="현재 페이지 전체 선택"
                    />
                  </Table.Head>
                  <Table.Head>이름</Table.Head>
                  <Table.Head>이메일</Table.Head>
                  <Table.Head>역할</Table.Head>
                  <Table.Head>부서</Table.Head>
                  <Table.Head align="center">상태</Table.Head>
                  <Table.Head>수정일</Table.Head>
                  <Table.Head align="right">액션</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pageRows.map((row) => {
                  const isSelected = selected.has(row.id);
                  return (
                    <Table.Row
                      key={row.id}
                      selected={isSelected || active?.id === row.id}
                    >
                      <Table.Cell>
                        <Table.Checkbox
                          checked={isSelected}
                          onChange={(checked) => {
                            setSelected((prev) => {
                              const next = new Set(prev);
                              if (checked) next.add(row.id);
                              else next.delete(row.id);
                              return next;
                            });
                          }}
                          aria-label={`${row.name} 선택`}
                        />
                      </Table.Cell>
                      <Table.Cell>{row.name}</Table.Cell>
                      <Table.Cell>{row.email}</Table.Cell>
                      <Table.Cell>{row.role}</Table.Cell>
                      <Table.Cell>{row.dept}</Table.Cell>
                      <Table.Cell align="center">
                        <span
                          className={tableStyles.badge}
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
                          onClick={() => openDrawer(row)}
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

      {/* Drawer = 상세·수정 (목록 유지); 생성 = Page; 저장 = Sticky Footer */}
      <Drawer
        title="회원 상세"
        open={active != null}
        onClose={closeDrawer}
        size={420}
        destroyOnHidden
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
            paddingBottom: 0,
          },
        }}
      >
        {active && draft ? (
          <div className={styles.drawerBody}>
            <div className={styles.drawerScroll}>
              <div className={styles.form}>
                <Input
                  size="s"
                  label="이름"
                  value={draft.name}
                  onChange={(e) =>
                    setDraft({ ...draft, name: e.target.value })
                  }
                />
                <Input
                  size="s"
                  label="이메일"
                  value={draft.email}
                  onChange={(e) =>
                    setDraft({ ...draft, email: e.target.value })
                  }
                />
                <Input
                  size="s"
                  label="역할"
                  value={draft.role}
                  onChange={(e) =>
                    setDraft({ ...draft, role: e.target.value })
                  }
                />
                <Input
                  size="s"
                  label="부서"
                  value={draft.dept}
                  onChange={(e) =>
                    setDraft({ ...draft, dept: e.target.value })
                  }
                />
                <label className={styles.selectLabel}>
                  상태
                  <select
                    className={styles.select}
                    value={draft.status}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        status: e.target.value as Status,
                      })
                    }
                  >
                    <option value="활성">활성</option>
                    <option value="대기">대기</option>
                    <option value="중지">중지</option>
                  </select>
                </label>
              </div>
            </div>

            <footer className={styles.stickyFooter}>
              <Button
                variant="danger"
                size="s"
                onClick={confirmDeleteActive}
              >
                삭제
              </Button>
              <div className={styles.footerSpacer} />
              <Button variant="secondary" size="s" onClick={closeDrawer}>
                닫기
              </Button>
              <Button
                variant="primary"
                size="s"
                onClick={saveMember}
                data-primary-cta="true"
              >
                저장
              </Button>
            </footer>
          </div>
        ) : null}
      </Drawer>
    </section>
    </AdminShell>
  );
}
