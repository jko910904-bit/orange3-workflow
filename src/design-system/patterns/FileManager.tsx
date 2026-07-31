"use client";

import { useMemo, useState } from "react";
import { Drawer } from "antd";
import { Button, Input, Table } from "@/design-system/components";
import { AdminShell } from "./admin/AdminShell";
import tableStyles from "./DataTable.module.css";
import styles from "./pattern.module.css";
import mmStyles from "./admin/MemberManagement.module.css";

type FileType = "문서" | "이미지" | "데이터" | "기타";

type FileRow = {
  id: string;
  name: string;
  type: FileType;
  size: string;
  updatedAt: string;
  owner: string;
};

const SEED: FileRow[] = [
  {
    id: "1",
    name: "월간_리포트_2025-06.pdf",
    type: "문서",
    size: "2.4 MB",
    updatedAt: "2025-06-28",
    owner: "홍길동",
  },
  {
    id: "2",
    name: "portal-hero.png",
    type: "이미지",
    size: "840 KB",
    updatedAt: "2025-06-20",
    owner: "김영희",
  },
  {
    id: "3",
    name: "members_export.csv",
    type: "데이터",
    size: "120 KB",
    updatedAt: "2025-06-18",
    owner: "이철수",
  },
  {
    id: "4",
    name: "계약서_초안.docx",
    type: "문서",
    size: "1.1 MB",
    updatedAt: "2025-06-12",
    owner: "박민수",
  },
  {
    id: "5",
    name: "api-spec.json",
    type: "데이터",
    size: "48 KB",
    updatedAt: "2025-06-05",
    owner: "최유진",
  },
];

type TypeFilter = "all" | FileType;

/**
 * Screen: File manager — Search → Filter → Table → Drawer → Confirm delete.
 * Upload = Modal stub (빠른 작업).
 */
export function FileManagerPattern() {
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [rows, setRows] = useState(SEED);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<FileRow | null>(null);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const q = applied.trim();
      const matchQ = !q || r.name.includes(q) || r.owner.includes(q);
      const matchType = typeFilter === "all" || r.type === typeFilter;
      return matchQ && matchType;
    });
  }, [rows, applied, typeFilter]);

  const selectedCount = selected.size;

  function confirmDeleteSelected() {
    if (!selectedCount) return;
    const ok = window.confirm(
      `선택한 ${selectedCount}개 파일을 삭제할까요? 되돌릴 수 없습니다.`,
    );
    if (!ok) return;
    setRows((prev) => prev.filter((r) => !selected.has(r.id)));
    setSelected(new Set());
    if (active && selected.has(active.id)) setActive(null);
  }

  return (
    <AdminShell
      title="파일 관리"
      breadcrumb="Home / 시스템관리 / 파일"
      lnbTitle="시스템관리"
      lnbItems={[
        { label: "파일 관리", active: true },
        { label: "보관함" },
      ]}
      topMenus={["대시보드", "회원", "파일", "설정"]}
      showPageHeader={false}
    >
      <section className={styles.pattern} aria-label="File manager preview">
        <div className={tableStyles.intro}>
          <div>
            <h2 className={styles.title}>파일 관리</h2>
            <p className={styles.subtitle}>
              Search First · Upload → Manager. 삭제 = Confirm.
            </p>
          </div>
          <div className={tableStyles.introActions}>
            <Button
              variant="primary"
              size="s"
              data-primary-cta="true"
              onClick={() =>
                window.alert("업로드 Modal (미리보기 stub)")
              }
            >
              업로드
            </Button>
          </div>
        </div>

        <div className={tableStyles.searchBar} role="search">
          <div className={tableStyles.searchField}>
            <Input
              kind="search"
              size="s"
              label="검색"
              placeholder="파일명 / 소유자"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setApplied(query);
              }}
            />
          </div>
          <div className={tableStyles.searchActions}>
            <Button
              variant="secondary"
              size="s"
              onClick={() => setApplied(query)}
            >
              조회
            </Button>
            <Button
              variant="ghost"
              size="s"
              onClick={() => {
                setQuery("");
                setApplied("");
                setTypeFilter("all");
              }}
            >
              초기화
            </Button>
          </div>
        </div>

        <div className={tableStyles.filterBar} role="group" aria-label="필터">
          <span className={tableStyles.filterLabel}>유형</span>
          <div className={tableStyles.filterGroup}>
            {(
              [
                ["all", "전체"],
                ["문서", "문서"],
                ["이미지", "이미지"],
                ["데이터", "데이터"],
                ["기타", "기타"],
              ] as const
            ).map(([value, label]) => (
              <Button
                key={value}
                variant={typeFilter === value ? "secondary" : "ghost"}
                size="s"
                aria-pressed={typeFilter === value}
                onClick={() => setTypeFilter(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div
          className={tableStyles.bulkBar}
          role="toolbar"
          data-empty={!selectedCount || undefined}
        >
          <span className={tableStyles.bulkLabel}>
            {selectedCount ? (
              <>
                <strong>{selectedCount}</strong>건 선택
              </>
            ) : (
              "항목을 선택하세요"
            )}
          </span>
          <div className={tableStyles.bulkActions}>
            <Button
              variant="danger"
              size="s"
              disabled={!selectedCount}
              onClick={confirmDeleteSelected}
            >
              삭제
            </Button>
          </div>
        </div>

        <Table density="dense" className={tableStyles.table}>
          <Table.Toolbar>
            <p className={tableStyles.total}>
              총 <strong>{filtered.length}</strong>건
            </p>
          </Table.Toolbar>
          {filtered.length === 0 ? (
            <div className={tableStyles.empty} role="status">
              <p className={tableStyles.emptyTitle}>파일이 없습니다</p>
              <p className={tableStyles.emptyDesc}>
                업로드하거나 검색·필터를 조정하세요.
              </p>
              <Button
                variant="secondary"
                size="s"
                onClick={() =>
                  window.alert("업로드 Modal (미리보기 stub)")
                }
              >
                업로드
              </Button>
            </div>
          ) : (
            <Table.Scroll className={tableStyles.scroll}>
              <Table.Header>
                <Table.Row>
                  <Table.Head>
                    <Table.Checkbox
                      checked={
                        filtered.length > 0 &&
                        filtered.every((r) => selected.has(r.id))
                      }
                      indeterminate={
                        filtered.some((r) => selected.has(r.id)) &&
                        !filtered.every((r) => selected.has(r.id))
                      }
                      onChange={(checked) => {
                        setSelected((prev) => {
                          const next = new Set(prev);
                          for (const r of filtered) {
                            if (checked) next.add(r.id);
                            else next.delete(r.id);
                          }
                          return next;
                        });
                      }}
                      aria-label="전체 선택"
                    />
                  </Table.Head>
                  <Table.Head>이름</Table.Head>
                  <Table.Head>유형</Table.Head>
                  <Table.Head>크기</Table.Head>
                  <Table.Head>소유자</Table.Head>
                  <Table.Head>수정일</Table.Head>
                  <Table.Head align="right">액션</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filtered.map((row) => (
                  <Table.Row
                    key={row.id}
                    selected={selected.has(row.id) || active?.id === row.id}
                  >
                    <Table.Cell>
                      <Table.Checkbox
                        checked={selected.has(row.id)}
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
                    <Table.Cell>{row.type}</Table.Cell>
                    <Table.Cell>{row.size}</Table.Cell>
                    <Table.Cell>{row.owner}</Table.Cell>
                    <Table.Cell>{row.updatedAt}</Table.Cell>
                    <Table.Cell align="right">
                      <Button
                        variant="ghost"
                        size="s"
                        onClick={() => setActive(row)}
                      >
                        상세
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Scroll>
          )}
        </Table>

        <Drawer
          title="파일 상세"
          open={active != null}
          onClose={() => setActive(null)}
          size={400}
          destroyOnHidden
        >
          {active ? (
            <dl className={mmStyles.dl}>
              <div className={mmStyles.dlRow}>
                <dt>이름</dt>
                <dd>{active.name}</dd>
              </div>
              <div className={mmStyles.dlRow}>
                <dt>유형</dt>
                <dd>{active.type}</dd>
              </div>
              <div className={mmStyles.dlRow}>
                <dt>크기</dt>
                <dd>{active.size}</dd>
              </div>
              <div className={mmStyles.dlRow}>
                <dt>소유자</dt>
                <dd>{active.owner}</dd>
              </div>
              <div className={mmStyles.dlRow}>
                <dt>수정일</dt>
                <dd>{active.updatedAt}</dd>
              </div>
            </dl>
          ) : null}
        </Drawer>
      </section>
    </AdminShell>
  );
}
