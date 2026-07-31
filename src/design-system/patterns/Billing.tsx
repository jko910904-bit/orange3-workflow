"use client";

import { useState } from "react";
import { Button, Card, Input, Table } from "@/design-system/components";
import cardStyles from "@/design-system/components/card/card.module.css";
import { AdminShell } from "./admin/AdminShell";
import tableStyles from "./DataTable.module.css";
import dashStyles from "./Dashboard.module.css";
import styles from "./pattern.module.css";

const INVOICES = [
  {
    id: "INV-2041",
    period: "2025-06",
    amount: "₩1,200,000",
    status: "발행",
  },
  {
    id: "INV-2038",
    period: "2025-05",
    amount: "₩1,200,000",
    status: "결제완료",
  },
  {
    id: "INV-2032",
    period: "2025-04",
    amount: "₩980,000",
    status: "결제완료",
  },
];

/**
 * Screen: Billing settings — Settings Task + Confirm for danger.
 * 사용량 위젯 = 읽기 compose; 인보이스 = 축소 Admin stack.
 */
export function BillingPattern() {
  const [cardLast4, setCardLast4] = useState("4242");
  const [taxId, setTaxId] = useState("123-45-67890");

  function savePayment() {
    window.alert("결제 정보가 저장되었습니다 (미리보기 stub).");
  }

  function confirmDowngrade() {
    const ok = window.confirm(
      "Pro → Starter로 다운그레이드할까요? 일부 기능이 제한됩니다.",
    );
    if (!ok) return;
    window.alert("다운그레이드 요청이 접수되었습니다 (Notification stub).");
  }

  function confirmCancel() {
    const ok = window.confirm(
      "구독을 해지할까요? 현재 기간 종료 후 접근이 중단됩니다. 이 작업은 Confirm이 필요합니다.",
    );
    if (!ok) return;
    window.alert("해지 예약됨 (미리보기 stub).");
  }

  return (
    <AdminShell
      title="결제 · 청구"
      breadcrumb="Home / 설정 / 결제"
      lnbTitle="설정"
      lnbItems={[
        { label: "일반" },
        { label: "팀 권한" },
        { label: "결제", active: true },
      ]}
      topMenus={["대시보드", "멤버", "설정"]}
      showPageHeader={false}
    >
      <section className={dashStyles.stack} aria-label="Billing Screen preview">
        <div>
          <h2 className={styles.title}>Billing</h2>
          <p className={styles.subtitle}>
            Settings Task. 위험 변경(다운그레이드·해지)만 Confirm. Primary =
            결제 정보 저장.
          </p>
        </div>

        <section className={dashStyles.kpiRow} aria-label="현재 플랜">
          <Card shadow="1" radius="8" padding="m">
            <Card.Body>
              <p className={dashStyles.kpiLabel}>현재 플랜</p>
              <p className={dashStyles.kpiValue}>Pro</p>
              <p className={dashStyles.kpiHint}>연간 · 다음 갱신 2025-08-01</p>
            </Card.Body>
          </Card>
          <Card shadow="1" radius="8" padding="m">
            <Card.Body>
              <p className={dashStyles.kpiLabel}>좌석</p>
              <p className={dashStyles.kpiValue}>12 / 20</p>
              <p className={dashStyles.kpiHint}>사용 중 / 포함</p>
            </Card.Body>
          </Card>
          <Card shadow="1" radius="8" padding="m">
            <Card.Body>
              <p className={dashStyles.kpiLabel}>호출 쿼터</p>
              <p className={dashStyles.kpiValue}>80%</p>
              <p className={dashStyles.kpiHint}>8,000 / 10,000</p>
            </Card.Body>
          </Card>
          <Card shadow="1" radius="8" padding="m">
            <Card.Body>
              <p className={dashStyles.kpiLabel}>미결제</p>
              <p className={dashStyles.kpiValue}>₩0</p>
              <p className={dashStyles.kpiHint}>정상</p>
            </Card.Body>
          </Card>
        </section>

        <Card shadow="1" radius="8" padding="l">
          <Card.Header>
            <h3 className={cardStyles.title}>결제 수단 · 세금</h3>
          </Card.Header>
          <Card.Body>
            <div className={styles.grid2}>
              <Input
                kind="text"
                size="m"
                label="카드 끝 4자리"
                value={cardLast4}
                onChange={(e) => setCardLast4(e.target.value)}
              />
              <Input
                kind="text"
                size="m"
                label="사업자등록번호"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
              />
            </div>
          </Card.Body>
          <Card.Footer>
            <div className={styles.actions} style={{ width: "100%" }}>
              <Button
                variant="primary"
                size="m"
                onClick={savePayment}
                data-primary-cta="true"
              >
                저장
              </Button>
            </div>
          </Card.Footer>
        </Card>

        <Card shadow="1" radius="8" padding="m">
          <Card.Header>
            <h3 className={cardStyles.title}>플랜 변경</h3>
          </Card.Header>
          <Card.Body>
            <div className={dashStyles.quickActions}>
              <Button variant="secondary" size="s" onClick={confirmDowngrade}>
                다운그레이드
              </Button>
              <Button variant="danger" size="s" onClick={confirmCancel}>
                구독 해지
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Table density="dense" className={tableStyles.table}>
          <Table.Toolbar>
            <p className={tableStyles.total}>인보이스</p>
          </Table.Toolbar>
          <Table.Scroll className={tableStyles.scroll}>
            <Table.Header>
              <Table.Row>
                <Table.Head>번호</Table.Head>
                <Table.Head>기간</Table.Head>
                <Table.Head align="right">금액</Table.Head>
                <Table.Head align="center">상태</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {INVOICES.map((inv) => (
                <Table.Row key={inv.id}>
                  <Table.Cell>{inv.id}</Table.Cell>
                  <Table.Cell>{inv.period}</Table.Cell>
                  <Table.Cell align="right">{inv.amount}</Table.Cell>
                  <Table.Cell align="center">
                    <span
                      className={tableStyles.badge}
                      data-tone={inv.status === "결제완료" ? "ok" : "warn"}
                    >
                      {inv.status}
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Scroll>
        </Table>
      </section>
    </AdminShell>
  );
}
