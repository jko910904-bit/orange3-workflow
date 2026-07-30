"use client";

import { Button, Card, Input } from "@/design-system/components";
import styles from "./pattern.module.css";
import cardStyles from "@/design-system/components/card/card.module.css";

export function LoginPattern() {
  return (
    <section className={styles.pattern}>
      <div className={styles.loginShell}>
        <Card shadow="2" radius="8" padding="l">
          <Card.Header>
            <div>
              <h2 className={styles.title}>Login</h2>
              <p className={styles.subtitle}>계정으로 로그인하세요</p>
            </div>
          </Card.Header>
          <Card.Body>
            <Input kind="text" size="m" label="아이디" placeholder="ID" />
            <Input
              kind="password"
              size="m"
              label="비밀번호"
              placeholder="Password"
            />
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" size="m" width="fill">
              로그인
            </Button>
          </Card.Footer>
        </Card>
        <p className={cardStyles.description} style={{ textAlign: "center" }}>
          비밀번호 찾기 · 회원가입
        </p>
      </div>
    </section>
  );
}
