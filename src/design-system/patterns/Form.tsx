"use client";

import { useState } from "react";
import { Drawer } from "antd";
import { Button, Card, Input } from "@/design-system/components";
import cardStyles from "@/design-system/components/card/card.module.css";
import styles from "./pattern.module.css";

type ContextMode = "page" | "drawer";

/**
 * CRUD Pattern — Compose preview (Kit components only).
 * Components: Form · Validation · Submit · Cancel
 * Drawer context: Sticky Footer for Submit (BUTTON_RULES / sticky-footer-save)
 */
export function FormPattern() {
  const [mode, setMode] = useState<ContextMode>("drawer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("invalid-email");
  const [showValidation, setShowValidation] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const emailInvalid =
    showValidation && (!email.includes("@") || email.startsWith("invalid"));

  function onSubmit() {
    setShowValidation(true);
    if (!name.trim() || emailInvalid) return;
    window.alert("저장되었습니다 (미리보기 stub).");
  }

  function onCancel() {
    if (mode === "drawer") setDrawerOpen(false);
    else {
      setName("");
      setEmail("");
      setShowValidation(false);
    }
  }

  const formBody = (
    <div className={styles.crudBody}>
      <Card shadow="1" radius="8" padding="l">
        <Card.Header>
          <h3 className={cardStyles.title}>기본 정보</h3>
        </Card.Header>
        <Card.Body>
          <div className={styles.grid2}>
            <Input
              kind="text"
              size="m"
              label="이름"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className={styles.fieldWithError}>
              <Input
                kind="email"
                size="m"
                label="이메일"
                placeholder="email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                state={emailInvalid ? "error" : "default"}
                helperText={
                  emailInvalid
                    ? "올바른 이메일 형식을 입력하세요. (Validation stub)"
                    : undefined
                }
              />
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card shadow="1" radius="8" padding="l">
        <Card.Header>
          <h3 className={cardStyles.title}>소속 정보</h3>
        </Card.Header>
        <Card.Body>
          <div className={styles.grid2}>
            <Input kind="text" size="m" label="부서" placeholder="공공사업부" />
            <Input kind="text" size="m" label="역할" placeholder="운영" />
          </div>
        </Card.Body>
      </Card>

      {mode === "page" ? (
        <div className={styles.actions}>
          <Button variant="secondary" size="m" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="m"
            onClick={onSubmit}
            data-primary-cta="true"
          >
            Submit
          </Button>
        </div>
      ) : null}
    </div>
  );

  const stickyFooter = (
    <footer className={styles.stickyFooter}>
      <Button variant="secondary" size="s" onClick={onCancel}>
        Cancel
      </Button>
      <div className={styles.footerSpacer} />
      <Button
        variant="primary"
        size="s"
        onClick={onSubmit}
        data-primary-cta="true"
      >
        Submit
      </Button>
    </footer>
  );

  return (
    <section className={styles.pattern} aria-label="CRUD Pattern preview">
      <div className={styles.crudIntro}>
        <div>
          <h2 className={styles.title}>CRUD — Compose</h2>
          <p className={styles.subtitle}>
            Form · Validation · Submit(Primary) · Cancel(Secondary). Drawer =
            Sticky Footer Submit.
          </p>
        </div>
        <div className={styles.crudToggles}>
          <Button
            variant={mode === "page" ? "secondary" : "ghost"}
            size="s"
            aria-pressed={mode === "page"}
            onClick={() => {
              setMode("page");
              setDrawerOpen(false);
            }}
          >
            Page (생성)
          </Button>
          <Button
            variant={mode === "drawer" ? "secondary" : "ghost"}
            size="s"
            aria-pressed={mode === "drawer"}
            onClick={() => {
              setMode("drawer");
              setDrawerOpen(true);
            }}
          >
            Drawer (수정)
          </Button>
          <Button
            variant="ghost"
            size="s"
            onClick={() => setShowValidation((v) => !v)}
          >
            {showValidation ? "Validation 숨김" : "Validation stub"}
          </Button>
        </div>
      </div>

      {mode === "page" ? formBody : null}

      {mode === "drawer" && !drawerOpen ? (
        <div className={styles.crudDrawerClosed}>
          <p className={styles.subtitle}>
            Drawer 닫힘 — 「Drawer (수정)」으로 다시 엽니다.
          </p>
          <Button
            variant="secondary"
            size="s"
            onClick={() => setDrawerOpen(true)}
          >
            Drawer 열기
          </Button>
        </div>
      ) : null}

      <Drawer
        title="회원 수정"
        open={mode === "drawer" && drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size={440}
        destroyOnHidden={false}
        styles={{ body: { paddingBottom: 0 } }}
      >
        <div className={styles.crudDrawerInner}>
          {formBody}
          {stickyFooter}
        </div>
      </Drawer>
    </section>
  );
}
