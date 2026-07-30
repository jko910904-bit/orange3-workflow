"use client";

import { Button, Card, Input } from "@/design-system/components";
import styles from "./pattern.module.css";
import cardStyles from "@/design-system/components/card/card.module.css";

export function FormPattern() {
  return (
    <section className={styles.pattern}>
      <div>
        <h2 className={styles.title}>Form</h2>
        <p className={styles.subtitle}>서비스 신청 멀티 섹션 폼</p>
      </div>
      <Card shadow="1" radius="8" padding="l">
        <Card.Header>
          <h3 className={cardStyles.title}>이용기관 정보</h3>
        </Card.Header>
        <Card.Body>
          <div className={styles.grid2}>
            <Input kind="text" size="m" label="기관명" placeholder="기관명" />
            <Input kind="text" size="m" label="사업자번호" placeholder="000-00-00000" />
            <Input kind="text" size="m" label="담당자" placeholder="이름" />
            <Input kind="text" size="m" label="이메일" placeholder="email@company.com" />
          </div>
        </Card.Body>
      </Card>
      <Card shadow="1" radius="8" padding="l">
        <Card.Header>
          <h3 className={cardStyles.title}>계약 담당자 정보</h3>
        </Card.Header>
        <Card.Body>
          <div className={styles.grid2}>
            <Input kind="text" size="m" label="부서" placeholder="부서" />
            <Input kind="text" size="m" label="직책" placeholder="직책" />
            <Input kind="text" size="m" label="연락처" placeholder="010-0000-0000" />
            <Input kind="number" size="m" label="신청 수량" defaultValue={1} />
          </div>
        </Card.Body>
      </Card>
      <div className={styles.actions} style={{ justifyContent: "center" }}>
        <Button variant="ghost" size="m">
          취소
        </Button>
        <Button variant="primary" size="m">
          신청하기
        </Button>
      </div>
    </section>
  );
}
