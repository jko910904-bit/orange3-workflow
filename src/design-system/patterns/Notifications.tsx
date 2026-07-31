"use client";

import { useMemo, useState } from "react";
import { Drawer, Switch } from "antd";
import { Button, Table } from "@/design-system/components";
import { AdminShell } from "./admin/AdminShell";
import tableStyles from "./DataTable.module.css";
import styles from "./pattern.module.css";
import mmStyles from "./admin/MemberManagement.module.css";

type NotifType = "시스템" | "결제" | "보안" | "멘션";

type Notif = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const SEED: Notif[] = [
  {
    id: "1",
    type: "시스템",
    title: "쿼터 80% 도달",
    body: "DATA API 잔여 호출이 20%입니다. Analytics에서 확인하세요.",
    time: "10분 전",
    read: false,
  },
  {
    id: "2",
    type: "결제",
    title: "인보이스 발행",
    body: "2025-06 청구서 INV-2041이 준비되었습니다.",
    time: "1시간 전",
    read: false,
  },
  {
    id: "3",
    type: "보안",
    title: "새 기기 로그인",
    body: "서울 · Chrome에서 로그인했습니다. 본인이 아니면 비밀번호를 변경하세요.",
    time: "어제",
    read: true,
  },
  {
    id: "4",
    type: "멘션",
    title: "김영희님이 멘션함",
    body: "공지 N-2041 초안 검토를 요청했습니다.",
    time: "어제",
    read: true,
  },
  {
    id: "5",
    type: "시스템",
    title: "점검 완료",
    body: "예정 점검이 완료되었습니다. 서비스가 정상입니다.",
    time: "2일 전",
    read: true,
  },
];

type ReadFilter = "all" | "unread" | "read";
type TypeFilter = "all" | NotifType;

/**
 * Screen: Notifications center — Filter → List/Table → Drawer.
 * 읽음 = Confirm 불필요; 삭제 = Confirm. Toast와 역할 분리.
 */
export function NotificationsPattern() {
  const [rows, setRows] = useState(SEED);
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [active, setActive] = useState<Notif | null>(null);
  const [emailOn, setEmailOn] = useState(true);
  const [pushOn, setPushOn] = useState(true);
  const [showChannels, setShowChannels] = useState(false);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchRead =
        readFilter === "all" ||
        (readFilter === "unread" ? !r.read : r.read);
      const matchType = typeFilter === "all" || r.type === typeFilter;
      return matchRead && matchType;
    });
  }, [rows, readFilter, typeFilter]);

  const unreadCount = rows.filter((r) => !r.read).length;

  function markAllRead() {
    setRows((prev) => prev.map((r) => ({ ...r, read: true })));
  }

  function openDetail(row: Notif) {
    setActive(row);
    if (!row.read) {
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, read: true } : r)),
      );
    }
  }

  function confirmDelete(id: string) {
    const ok = window.confirm("이 알림을 삭제할까요?");
    if (!ok) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
    if (active?.id === id) setActive(null);
  }

  return (
    <AdminShell
      title="알림"
      breadcrumb="Home / 알림"
      lnbTitle="계정"
      lnbItems={[
        { label: "알림함", active: !showChannels },
        { label: "채널 설정", active: showChannels },
      ]}
      topMenus={["대시보드", "알림", "설정"]}
      showPageHeader={false}
    >
      <section className={styles.pattern} aria-label="Notifications preview">
        <div className={tableStyles.intro}>
          <div>
            <h2 className={styles.title}>알림함</h2>
            <p className={styles.subtitle}>
              Inbox = 조회 Task. 읽지 않음 {unreadCount}건. Toast와 분리.
            </p>
          </div>
          <div className={tableStyles.introActions}>
            <Button
              variant="ghost"
              size="s"
              onClick={() => setShowChannels((v) => !v)}
            >
              {showChannels ? "알림함" : "채널 설정"}
            </Button>
            <Button
              variant="secondary"
              size="s"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              모두 읽음
            </Button>
          </div>
        </div>

        {showChannels ? (
          <div className={styles.crudBody}>
            <label
              className={styles.subtitle}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                border: "1px solid var(--color-grey-300)",
                borderRadius: "var(--radius-8)",
              }}
            >
              <span>이메일 알림</span>
              <Switch checked={emailOn} onChange={setEmailOn} />
            </label>
            <label
              className={styles.subtitle}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                border: "1px solid var(--color-grey-300)",
                borderRadius: "var(--radius-8)",
              }}
            >
              <span>푸시 알림</span>
              <Switch checked={pushOn} onChange={setPushOn} />
            </label>
            <p className={styles.subtitle}>
              채널 on/off는 Settings Task. 저장 Confirm 불필요.
            </p>
          </div>
        ) : (
          <>
            <div
              className={tableStyles.filterBar}
              role="group"
              aria-label="필터"
            >
              <span className={tableStyles.filterLabel}>읽음</span>
              <div className={tableStyles.filterGroup}>
                {(
                  [
                    ["all", "전체"],
                    ["unread", "읽지 않음"],
                    ["read", "읽음"],
                  ] as const
                ).map(([value, label]) => (
                  <Button
                    key={value}
                    variant={readFilter === value ? "secondary" : "ghost"}
                    size="s"
                    aria-pressed={readFilter === value}
                    onClick={() => setReadFilter(value)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <span className={tableStyles.filterLabel}>유형</span>
              <div className={tableStyles.filterGroup}>
                {(
                  [
                    ["all", "전체"],
                    ["시스템", "시스템"],
                    ["결제", "결제"],
                    ["보안", "보안"],
                    ["멘션", "멘션"],
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

            <Table density="dense" className={tableStyles.table}>
              <Table.Toolbar>
                <p className={tableStyles.total}>
                  <strong>{filtered.length}</strong>건
                </p>
              </Table.Toolbar>
              {filtered.length === 0 ? (
                <div className={tableStyles.empty} role="status">
                  <p className={tableStyles.emptyTitle}>알림이 없습니다</p>
                  <p className={tableStyles.emptyDesc}>
                    필터를 조정하거나 채널 설정을 확인하세요.
                  </p>
                  <Button
                    variant="secondary"
                    size="s"
                    onClick={() => {
                      setReadFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    필터 초기화
                  </Button>
                </div>
              ) : (
                <Table.Scroll className={tableStyles.scroll}>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head>상태</Table.Head>
                      <Table.Head>유형</Table.Head>
                      <Table.Head>제목</Table.Head>
                      <Table.Head>시각</Table.Head>
                      <Table.Head align="right">액션</Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filtered.map((row) => (
                      <Table.Row
                        key={row.id}
                        selected={active?.id === row.id}
                      >
                        <Table.Cell>
                          <span
                            className={tableStyles.badge}
                            data-tone={row.read ? "ok" : "warn"}
                          >
                            {row.read ? "읽음" : "새 알림"}
                          </span>
                        </Table.Cell>
                        <Table.Cell>{row.type}</Table.Cell>
                        <Table.Cell>{row.title}</Table.Cell>
                        <Table.Cell>{row.time}</Table.Cell>
                        <Table.Cell align="right">
                          <Button
                            variant="ghost"
                            size="s"
                            onClick={() => openDetail(row)}
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
          </>
        )}

        <Drawer
          title="알림 상세"
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
                <dl className={mmStyles.dl}>
                  <div className={mmStyles.dlRow}>
                    <dt>유형</dt>
                    <dd>{active.type}</dd>
                  </div>
                  <div className={mmStyles.dlRow}>
                    <dt>제목</dt>
                    <dd>{active.title}</dd>
                  </div>
                  <div className={mmStyles.dlRow}>
                    <dt>내용</dt>
                    <dd>{active.body}</dd>
                  </div>
                  <div className={mmStyles.dlRow}>
                    <dt>시각</dt>
                    <dd>{active.time}</dd>
                  </div>
                </dl>
              </div>
              <footer className={mmStyles.stickyFooter}>
                <Button
                  variant="danger"
                  size="s"
                  onClick={() => confirmDelete(active.id)}
                >
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
              </footer>
            </div>
          ) : null}
        </Drawer>
      </section>
    </AdminShell>
  );
}
