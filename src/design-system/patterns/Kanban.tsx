"use client";

import { useMemo, useState } from "react";
import { Drawer } from "antd";
import { Button, Card, Input } from "@/design-system/components";
import cardStyles from "@/design-system/components/card/card.module.css";
import { AdminShell } from "./admin/AdminShell";
import tableStyles from "./DataTable.module.css";
import styles from "./pattern.module.css";
import mmStyles from "./admin/MemberManagement.module.css";
import kanbanStyles from "./Kanban.module.css";

type ColumnId = "todo" | "doing" | "review" | "done";

type CardItem = {
  id: string;
  title: string;
  owner: string;
  column: ColumnId;
  priority: "높음" | "보통" | "낮음";
};

const COLUMNS: { id: ColumnId; label: string }[] = [
  { id: "todo", label: "할 일" },
  { id: "doing", label: "진행" },
  { id: "review", label: "검토" },
  { id: "done", label: "완료" },
];

const SEED: CardItem[] = [
  {
    id: "1",
    title: "공지 초안 검토",
    owner: "김영희",
    column: "todo",
    priority: "높음",
  },
  {
    id: "2",
    title: "FAQ 카테고리 정리",
    owner: "이철수",
    column: "todo",
    priority: "보통",
  },
  {
    id: "3",
    title: "회원 권한 매트릭스",
    owner: "홍길동",
    column: "doing",
    priority: "높음",
  },
  {
    id: "4",
    title: "Billing 인보이스 QA",
    owner: "박민수",
    column: "doing",
    priority: "보통",
  },
  {
    id: "5",
    title: "온보딩 카피 검수",
    owner: "최유진",
    column: "review",
    priority: "낮음",
  },
  {
    id: "6",
    title: "대시보드 KPI 확정",
    owner: "홍길동",
    column: "done",
    priority: "보통",
  },
];

/**
 * Screen: Kanban — 상태 열 compose (버튼으로 이동; Phase 3 DnD 없음).
 * Filter → Board → Detail Drawer → Confirm delete.
 */
export function KanbanPattern() {
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [cards, setCards] = useState(SEED);
  const [active, setActive] = useState<CardItem | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  const owners = useMemo(
    () => Array.from(new Set(SEED.map((c) => c.owner))),
    [],
  );

  const visible = useMemo(() => {
    if (ownerFilter === "all") return cards;
    return cards.filter((c) => c.owner === ownerFilter);
  }, [cards, ownerFilter]);

  function openCard(c: CardItem) {
    setActive(c);
    setDraftTitle(c.title);
  }

  function moveCard(id: string, column: ColumnId) {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, column } : c)),
    );
    if (active?.id === id) setActive({ ...active, column });
  }

  function saveCard() {
    if (!active) return;
    setCards((prev) =>
      prev.map((c) =>
        c.id === active.id ? { ...c, title: draftTitle } : c,
      ),
    );
    setActive(null);
  }

  function confirmDelete() {
    if (!active) return;
    const ok = window.confirm(`「${active.title}」카드를 삭제할까요?`);
    if (!ok) return;
    setCards((prev) => prev.filter((c) => c.id !== active.id));
    setActive(null);
  }

  return (
    <AdminShell
      title="칸반"
      breadcrumb="Home / 워크플로 / 칸반"
      lnbTitle="워크플로"
      lnbItems={[
        { label: "캘린더" },
        { label: "칸반", active: true },
        { label: "타임라인" },
      ]}
      topMenus={["대시보드", "일정", "설정"]}
      showPageHeader={false}
    >
      <section className={styles.pattern} aria-label="Kanban Screen preview">
        <div className={tableStyles.intro}>
          <div>
            <h2 className={styles.title}>칸반 보드</h2>
            <p className={styles.subtitle}>
              상태 열 Task. 이동 = 가역(Confirm 불필요) · 삭제 = Confirm · 상세 =
              Drawer. DnD는 Phase 3.
            </p>
          </div>
        </div>

        <div className={tableStyles.filterBar} role="group" aria-label="필터">
          <span className={tableStyles.filterLabel}>담당</span>
          <div className={tableStyles.filterGroup}>
            <Button
              variant={ownerFilter === "all" ? "secondary" : "ghost"}
              size="s"
              aria-pressed={ownerFilter === "all"}
              onClick={() => setOwnerFilter("all")}
            >
              전체
            </Button>
            {owners.map((o) => (
              <Button
                key={o}
                variant={ownerFilter === o ? "secondary" : "ghost"}
                size="s"
                aria-pressed={ownerFilter === o}
                onClick={() => setOwnerFilter(o)}
              >
                {o}
              </Button>
            ))}
          </div>
        </div>

        <div className={kanbanStyles.board}>
          {COLUMNS.map((col) => {
            const colCards = visible.filter((c) => c.column === col.id);
            return (
              <div key={col.id} className={kanbanStyles.column}>
                <div className={kanbanStyles.columnHead}>
                  <h3 className={kanbanStyles.columnTitle}>{col.label}</h3>
                  <span className={kanbanStyles.count}>{colCards.length}</span>
                </div>
                <div className={kanbanStyles.cards}>
                  {colCards.length === 0 ? (
                    <p className={styles.subtitle}>카드 없음</p>
                  ) : (
                    colCards.map((c) => (
                      <Card
                        key={c.id}
                        shadow="1"
                        radius="8"
                        padding="m"
                        interactive
                        onClick={() => openCard(c)}
                      >
                        <Card.Body>
                          <p className={cardStyles.title}>{c.title}</p>
                          <p className={styles.subtitle}>
                            {c.owner} · {c.priority}
                          </p>
                          <div className={kanbanStyles.moveRow}>
                            {COLUMNS.filter((x) => x.id !== c.column).map(
                              (target) => (
                                <Button
                                  key={target.id}
                                  variant="ghost"
                                  size="s"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveCard(c.id, target.id);
                                  }}
                                >
                                  → {target.label}
                                </Button>
                              ),
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Drawer
          title="카드 상세"
          open={active != null}
          onClose={() => setActive(null)}
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
            <div className={mmStyles.drawerBody}>
              <div className={mmStyles.drawerScroll}>
                <div className={mmStyles.form}>
                  <Input
                    size="s"
                    label="제목"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                  />
                  <dl className={mmStyles.dl}>
                    <div className={mmStyles.dlRow}>
                      <dt>담당</dt>
                      <dd>{active.owner}</dd>
                    </div>
                    <div className={mmStyles.dlRow}>
                      <dt>우선순위</dt>
                      <dd>{active.priority}</dd>
                    </div>
                    <div className={mmStyles.dlRow}>
                      <dt>열</dt>
                      <dd>
                        {COLUMNS.find((c) => c.id === active.column)?.label}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <footer className={mmStyles.stickyFooter}>
                <Button variant="danger" size="s" onClick={confirmDelete}>
                  삭제
                </Button>
                <div className={mmStyles.footerSpacer} />
                <Button
                  variant="secondary"
                  size="s"
                  onClick={() => setActive(null)}
                >
                  닫기
                </Button>
                <Button
                  variant="primary"
                  size="s"
                  onClick={saveCard}
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
