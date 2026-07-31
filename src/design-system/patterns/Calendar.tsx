"use client";

import { useMemo, useState } from "react";
import { Drawer } from "antd";
import { Button, Card, Input } from "@/design-system/components";
import cardStyles from "@/design-system/components/card/card.module.css";
import { AdminShell } from "./admin/AdminShell";
import tableStyles from "./DataTable.module.css";
import styles from "./pattern.module.css";
import mmStyles from "./admin/MemberManagement.module.css";
import calStyles from "./Calendar.module.css";

type EventItem = {
  id: string;
  day: number;
  title: string;
  owner: string;
  status: "확정" | "임시" | "취소";
};

const EVENTS: EventItem[] = [
  { id: "1", day: 3, title: "킥오프", owner: "홍길동", status: "확정" },
  { id: "2", day: 8, title: "점검 창", owner: "시스템", status: "확정" },
  { id: "3", day: 12, title: "계약 리뷰", owner: "김영희", status: "임시" },
  { id: "4", day: 15, title: "온보딩", owner: "이철수", status: "확정" },
  { id: "5", day: 22, title: "월간 회고", owner: "박민수", status: "확정" },
  { id: "6", day: 28, title: "청구 마감", owner: "재무", status: "임시" },
];

type OwnerFilter = "all" | string;

/**
 * Screen: Calendar — 날짜축 스캔 · Filter · Drawer 상세.
 * 빠른 생성 = Modal stub. DnD 없음.
 */
export function CalendarPattern() {
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>("all");
  const [active, setActive] = useState<EventItem | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  const owners = useMemo(
    () => Array.from(new Set(EVENTS.map((e) => e.owner))),
    [],
  );

  const visible = useMemo(() => {
    if (ownerFilter === "all") return EVENTS;
    return EVENTS.filter((e) => e.owner === ownerFilter);
  }, [ownerFilter]);

  const byDay = useMemo(() => {
    const map = new Map<number, EventItem[]>();
    for (const e of visible) {
      const list = map.get(e.day) ?? [];
      list.push(e);
      map.set(e.day, list);
    }
    return map;
  }, [visible]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  function openEvent(e: EventItem) {
    setActive(e);
    setDraftTitle(e.title);
  }

  function saveEvent() {
    window.alert(`「${draftTitle}」저장 (미리보기 stub)`);
    setActive(null);
  }

  function confirmCancel() {
    if (!active) return;
    const ok = window.confirm(`「${active.title}」일정을 취소할까요?`);
    if (!ok) return;
    setActive(null);
    window.alert("일정이 취소되었습니다 (미리보기 stub).");
  }

  return (
    <AdminShell
      title="일정"
      breadcrumb="Home / 워크플로 / 캘린더"
      lnbTitle="워크플로"
      lnbItems={[
        { label: "캘린더", active: true },
        { label: "칸반" },
        { label: "타임라인" },
      ]}
      topMenus={["대시보드", "일정", "설정"]}
      showPageHeader={false}
    >
      <section className={styles.pattern} aria-label="Calendar Screen preview">
        <div className={tableStyles.intro}>
          <div>
            <h2 className={styles.title}>캘린더 · 2025년 7월</h2>
            <p className={styles.subtitle}>
              Calendar = 날짜축 Task. 상세 = Drawer · 빠른 생성 = Modal · 취소 =
              Confirm.
            </p>
          </div>
          <div className={tableStyles.introActions}>
            <Button
              variant="primary"
              size="s"
              data-primary-cta="true"
              onClick={() =>
                window.alert("일정 생성 Modal (미리보기 stub)")
              }
            >
              일정 생성
            </Button>
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

        <Card shadow="1" radius="8" padding="m">
          <Card.Header>
            <h3 className={cardStyles.title}>월간 보기</h3>
          </Card.Header>
          <Card.Body>
            <div className={calStyles.weekdays} aria-hidden>
              {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                <span key={d} className={calStyles.weekday}>
                  {d}
                </span>
              ))}
            </div>
            <div className={calStyles.grid} role="grid" aria-label="7월 달력">
              {/* Jul 2025 starts Tuesday — pad 2 empty cells (Sun=0) */}
              <div className={calStyles.pad} />
              <div className={calStyles.pad} />
              {days.map((day) => {
                const events = byDay.get(day) ?? [];
                return (
                  <div key={day} className={calStyles.cell} role="gridcell">
                    <span className={calStyles.dayNum}>{day}</span>
                    <div className={calStyles.eventList}>
                      {events.map((e) => (
                        <button
                          key={e.id}
                          type="button"
                          className={calStyles.event}
                          data-status={e.status}
                          onClick={() => openEvent(e)}
                        >
                          {e.title}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card.Body>
        </Card>

        <Drawer
          title="일정 상세"
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
                      <dt>일</dt>
                      <dd>7월 {active.day}일</dd>
                    </div>
                    <div className={mmStyles.dlRow}>
                      <dt>담당</dt>
                      <dd>{active.owner}</dd>
                    </div>
                    <div className={mmStyles.dlRow}>
                      <dt>상태</dt>
                      <dd>{active.status}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <footer className={mmStyles.stickyFooter}>
                <Button variant="danger" size="s" onClick={confirmCancel}>
                  취소
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
                  onClick={saveEvent}
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
