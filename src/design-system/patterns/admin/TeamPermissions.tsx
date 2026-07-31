"use client";

import { useMemo, useState } from "react";
import { Drawer } from "antd";
import { Button, Input, Table } from "@/design-system/components";
import tableStyles from "../DataTable.module.css";
import { AdminShell } from "./AdminShell";
import styles from "./MemberManagement.module.css";

type Role = "소유자" | "관리자" | "편집" | "조회";

type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "활성" | "초대중";
  joinedAt: string;
};

const SEED: Member[] = [
  {
    id: "1",
    name: "홍길동",
    email: "hong@example.com",
    role: "소유자",
    status: "활성",
    joinedAt: "2025-01-12",
  },
  {
    id: "2",
    name: "김영희",
    email: "kim@example.com",
    role: "관리자",
    status: "활성",
    joinedAt: "2025-02-03",
  },
  {
    id: "3",
    name: "이철수",
    email: "lee@example.com",
    role: "편집",
    status: "활성",
    joinedAt: "2025-03-18",
  },
  {
    id: "4",
    name: "박민수",
    email: "park@example.com",
    role: "조회",
    status: "초대중",
    joinedAt: "2025-06-01",
  },
  {
    id: "5",
    name: "최유진",
    email: "choi@example.com",
    role: "편집",
    status: "활성",
    joinedAt: "2025-05-22",
  },
];

type RoleFilter = "all" | Role;

const PAGE_SIZE = 5;

/**
 * Screen: Team permissions — Admin stack 재사용.
 * Search → Filter → Table → Drawer(역할 변경) → Confirm(제거).
 */
export function TeamPermissionsPattern() {
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(SEED);
  const [active, setActive] = useState<Member | null>(null);
  const [draftRole, setDraftRole] = useState<Role>("조회");

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const q = appliedQuery.trim();
      const matchQ =
        !q || r.name.includes(q) || r.email.includes(q) || r.role.includes(q);
      const matchRole = roleFilter === "all" || r.role === roleFilter;
      return matchQ && matchRole;
    });
  }, [rows, appliedQuery, roleFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function runSearch() {
    setAppliedQuery(query);
    setPage(1);
  }

  function resetFilters() {
    setQuery("");
    setAppliedQuery("");
    setRoleFilter("all");
    setPage(1);
  }

  function openDrawer(row: Member) {
    setActive(row);
    setDraftRole(row.role);
  }

  function closeDrawer() {
    setActive(null);
  }

  function saveRole() {
    if (!active) return;
    if (draftRole !== active.role) {
      const ok = window.confirm(
        `${active.name}의 역할을 「${active.role}」→「${draftRole}」으로 변경할까요?`,
      );
      if (!ok) return;
    }
    setRows((prev) =>
      prev.map((r) => (r.id === active.id ? { ...r, role: draftRole } : r)),
    );
    closeDrawer();
  }

  function confirmRemove() {
    if (!active) return;
    if (active.role === "소유자") {
      window.alert("소유자는 제거할 수 없습니다. 소유권을 이전한 뒤 진행하세요.");
      return;
    }
    const ok = window.confirm(
      `${active.name}을(를) 팀에서 제거할까요? 접근 권한이 즉시 회수됩니다.`,
    );
    if (!ok) return;
    setRows((prev) => prev.filter((r) => r.id !== active.id));
    closeDrawer();
  }

  return (
    <AdminShell
      title="팀 권한"
      breadcrumb="Home / 설정 / 팀 권한"
      lnbTitle="설정"
      lnbItems={[
        { label: "일반" },
        { label: "팀 권한", active: true },
        { label: "결제" },
      ]}
      topMenus={["대시보드", "멤버", "설정"]}
      showPageHeader={false}
    >
      <section className={styles.root} aria-label="Team permissions preview">
        <div className={tableStyles.intro}>
          <div>
            <h2 className={tableStyles.title}>팀 권한</h2>
            <p className={tableStyles.subtitle}>
              멤버 초대 · 역할 부여 · 제거. Admin stack 재사용. 역할 변경·제거 =
              Confirm.
            </p>
          </div>
          <div className={tableStyles.introActions}>
            <Button
              variant="primary"
              size="s"
              data-primary-cta="true"
              onClick={() =>
                window.alert("초대 모달 (미리보기 stub) — 빠른 작업 = Modal")
              }
            >
              멤버 초대
            </Button>
          </div>
        </div>

        <div className={tableStyles.searchBar} role="search">
          <div className={tableStyles.searchField}>
            <Input
              kind="search"
              size="s"
              label="검색"
              placeholder="이름 / 이메일 / 역할"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runSearch();
              }}
            />
          </div>
          <div className={tableStyles.searchActions}>
            <Button variant="secondary" size="s" onClick={runSearch}>
              조회
            </Button>
            <Button variant="ghost" size="s" onClick={resetFilters}>
              초기화
            </Button>
          </div>
        </div>

        <div className={tableStyles.filterBar} role="group" aria-label="필터">
          <span className={tableStyles.filterLabel}>역할</span>
          <div className={tableStyles.filterGroup}>
            {(
              [
                ["all", "전체"],
                ["소유자", "소유자"],
                ["관리자", "관리자"],
                ["편집", "편집"],
                ["조회", "조회"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                variant={roleFilter === value ? "secondary" : "ghost"}
                size="s"
                aria-pressed={roleFilter === value}
                onClick={() => {
                  setRoleFilter(value);
                  setPage(1);
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <Table density="dense" className={tableStyles.table}>
          <Table.Toolbar>
            <p className={tableStyles.total}>
              총 <strong>{filtered.length}</strong>건 · 「역할」변경은 Drawer
            </p>
          </Table.Toolbar>

          {filtered.length === 0 ? (
            <div className={tableStyles.empty} role="status">
              <p className={tableStyles.emptyTitle}>멤버가 없습니다</p>
              <p className={tableStyles.emptyDesc}>
                초대하거나 필터를 초기화하세요.
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
                    <Table.Head>이름</Table.Head>
                    <Table.Head>이메일</Table.Head>
                    <Table.Head>역할</Table.Head>
                    <Table.Head align="center">상태</Table.Head>
                    <Table.Head>가입일</Table.Head>
                    <Table.Head align="right">액션</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {pageRows.map((row) => (
                    <Table.Row
                      key={row.id}
                      selected={active?.id === row.id}
                    >
                      <Table.Cell>{row.name}</Table.Cell>
                      <Table.Cell>{row.email}</Table.Cell>
                      <Table.Cell>{row.role}</Table.Cell>
                      <Table.Cell align="center">
                        <span
                          className={tableStyles.badge}
                          data-tone={row.status === "활성" ? "ok" : "warn"}
                        >
                          {row.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{row.joinedAt}</Table.Cell>
                      <Table.Cell align="right">
                        <Button
                          variant="ghost"
                          size="s"
                          onClick={() => openDrawer(row)}
                        >
                          역할
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
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
          title="역할 · 권한"
          open={active != null}
          onClose={closeDrawer}
          size={400}
          destroyOnHidden
          styles={{
            body: {
              display: "flex",
              flexDirection: "column",
              paddingBottom: 0,
            },
          }}
        >
          {active ? (
            <div className={styles.drawerBody}>
              <div className={styles.drawerScroll}>
                <dl className={styles.dl}>
                  <div className={styles.dlRow}>
                    <dt>이름</dt>
                    <dd>{active.name}</dd>
                  </div>
                  <div className={styles.dlRow}>
                    <dt>이메일</dt>
                    <dd>{active.email}</dd>
                  </div>
                </dl>
                <div className={styles.form} style={{ marginTop: 16 }}>
                  <label className={styles.selectLabel}>
                    역할
                    <select
                      className={styles.select}
                      value={draftRole}
                      disabled={active.role === "소유자"}
                      onChange={(e) => setDraftRole(e.target.value as Role)}
                    >
                      <option value="소유자">소유자</option>
                      <option value="관리자">관리자</option>
                      <option value="편집">편집</option>
                      <option value="조회">조회</option>
                    </select>
                  </label>
                  {active.role === "소유자" ? (
                    <p className={tableStyles.subtitle}>
                      소유자 역할은 이전 후에만 변경할 수 있습니다.
                    </p>
                  ) : null}
                </div>
              </div>
              <footer className={styles.stickyFooter}>
                <Button variant="danger" size="s" onClick={confirmRemove}>
                  팀에서 제거
                </Button>
                <div className={styles.footerSpacer} />
                <Button variant="secondary" size="s" onClick={closeDrawer}>
                  취소
                </Button>
                <Button
                  variant="primary"
                  size="s"
                  onClick={saveRole}
                  data-primary-cta="true"
                  disabled={active.role === "소유자"}
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
