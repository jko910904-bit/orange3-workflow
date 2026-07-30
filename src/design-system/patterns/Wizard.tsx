"use client";

import { useState } from "react";
import { Button, Card } from "@/design-system/components";
import styles from "./pattern.module.css";
import cardStyles from "@/design-system/components/card/card.module.css";

const STEPS = [
  { label: "STEP 1", title: "API 선택", desc: "필요 API 선택하기" },
  { label: "STEP 2", title: "서비스 신청", desc: "이용자 정보 입력" },
  { label: "STEP 3", title: "상담 및 계약", desc: "담당자 상담 후 계약" },
  { label: "STEP 4", title: "API 연동", desc: "시스템에 API 연결" },
];

export function WizardPattern() {
  const [step, setStep] = useState(0);

  return (
    <section className={styles.pattern}>
      <div>
        <h2 className={styles.title}>Wizard</h2>
        <p className={styles.subtitle}>절차형 스텝 UI</p>
      </div>
      <div className={styles.steps}>
        {STEPS.map((s, i) => (
          <Card
            key={s.label}
            interactive
            state={i === step ? "selected" : "default"}
            shadow="1"
            radius="8"
            padding="m"
            onClick={() => setStep(i)}
          >
            <Card.Body>
              <p className={styles.stepLabel}>{s.label}</p>
              <h3 className={cardStyles.title}>{s.title}</h3>
              <p className={styles.subtitle}>{s.desc}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Card shadow="1" radius="8" padding="l">
        <Card.Header>
          <h3 className={cardStyles.title}>
            {STEPS[step].label} · {STEPS[step].title}
          </h3>
        </Card.Header>
        <Card.Body>
          <p className={styles.subtitle}>{STEPS[step].desc}</p>
        </Card.Body>
        <Card.Footer>
          <div className={styles.actions} style={{ width: "100%" }}>
            <Button
              variant="ghost"
              size="m"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              이전
            </Button>
            <Button
              variant="primary"
              size="m"
              onClick={() =>
                setStep((s) => Math.min(STEPS.length - 1, s + 1))
              }
            >
              {step === STEPS.length - 1 ? "완료" : "다음"}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </section>
  );
}
