"use client";

import { useMemo, useState } from "react";
import { Button, Input, Table } from "@/design-system/components";
import styles from "./pattern.module.css";
import searchStyles from "./DataTable.module.css";

const ROWS = [
  { id: "1", name: "홍길동", email: "hong@example.com", status: "활성" },
  { id: "2", name: "김영희", email: "kim@example.com", status: "대기" },
  { id: "3", name: "이철수", email: "lee@example.com", status: "활성" },
  { id: "4", name: "박민수", email: "park@example.com", status: "중지" },
  { id: "5", name: "최유진", email: "choi@example.com", status: "활성" },
];

export function SearchFilterTablePattern() {
  const [q, setQ] = useState("");
  const [applied, setApplied] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(
    () =>
      ROWS.filter(
        (r) =>
          !applied ||
          r.name.includes(applied) ||
          r.email.includes(applied) ||
          r.status.includes(applied),
      ),
    [applied],
  );
  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function runSearch() {
    setApplied(q.trim());
    setPage(1);
  }

  function reset() {
    setQ("");
    setApplied("");
    setPage(1);
  }

  return (
    <section className={styles.pattern}>
      <div>
        <h2 className={styles.title}>Search + Filter + Table</h2>
        <p className={styles.subtitle}>회원 / 목록 검색 패턴</p>
      </div>
      <div className={searchStyles.searchBar} role="search">
        <div className={searchStyles.searchField}>
          <Input
            kind="search"
            size="s"
            label="검색"
            placeholder="이름 / 이메일 / 상태"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
          />
        </div>
        <div className={searchStyles.searchActions}>
          <Button variant="primary" size="s" onClick={runSearch}>
            조회
          </Button>
          <Button variant="ghost" size="s" onClick={reset}>
            초기화
          </Button>
        </div>
      </div>
      <Table density="dense">
        <Table.Scroll>
          <Table.Header>
            <Table.Row>
              <Table.Head>이름</Table.Head>
              <Table.Head>이메일</Table.Head>
              <Table.Head align="center">상태</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.email}</Table.Cell>
                <Table.Cell align="center">{row.status}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Scroll>
        <Table.Pagination
          page={Math.min(page, pageCount)}
          pageCount={pageCount}
          onPageChange={setPage}
        />
      </Table>
    </section>
  );
}
