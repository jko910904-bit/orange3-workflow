"use client";

import { useState } from "react";
import { Button, Card, Checkbox, Input } from "@/design-system/components";
import styles from "./pattern.module.css";
import cardStyles from "@/design-system/components/card/card.module.css";

const STEPS = [
  {
    label: "STEP 1",
    title: "조직",
    desc: "워크스페이스 · 조직 정보",
  },
  {
    label: "STEP 2",
    title: "프로필",
    desc: "관리자 계정 · 표시 이름",
  },
  {
    label: "STEP 3",
    title: "초대",
    desc: "팀 멤버 이메일 초대 (선택)",
  },
  {
    label: "STEP 4",
    title: "완료",
    desc: "첫 성공 상태 · Dashboard로",
  },
] as const;

/**
 * Screen: Onboarding — Wizard Pattern compose (Page surface).
 * Primary = 다음/완료 하나; Skip = Secondary. Drawer에 강제하지 않음.
 */
export function OnboardingPattern() {
  const [step, setStep] = useState(0);
  const [orgName, setOrgName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const isLast = step === STEPS.length - 1;

  function next() {
    if (step === 0 && !orgName.trim()) {
      window.alert("조직명을 입력하세요.");
      return;
    }
    if (step === 1 && !displayName.trim()) {
      window.alert("표시 이름을 입력하세요.");
      return;
    }
    if (isLast) {
      if (!acceptTerms) {
        window.alert("이용 약관에 동의해 주세요.");
        return;
      }
      window.alert("온보딩 완료 (미리보기 stub) — Dashboard로 이동합니다.");
      return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  return (
    <section className={styles.pattern} aria-label="Onboarding Screen preview">
      <div>
        <h2 className={styles.title}>워크스페이스 시작하기</h2>
        <p className={styles.subtitle}>
          Wizard = Page CRUD surface. Stack: 조직 → 프로필 → 초대 → 완료. Single
          Primary = 다음/완료.
        </p>
      </div>

      <div className={styles.steps} role="list">
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
          {step === 0 ? (
            <div className={styles.grid2}>
              <Input
                kind="text"
                size="m"
                label="조직명"
                placeholder="JKO 운영팀"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
              <Input
                kind="text"
                size="m"
                label="업종 (선택)"
                placeholder="공공 · SaaS · 금융"
              />
            </div>
          ) : null}
          {step === 1 ? (
            <div className={styles.grid2}>
              <Input
                kind="text"
                size="m"
                label="표시 이름"
                placeholder="홍길동"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
              <Input
                kind="email"
                size="m"
                label="업무 이메일"
                placeholder="ops@company.com"
              />
            </div>
          ) : null}
          {step === 2 ? (
            <div className={styles.section}>
              <Input
                kind="email"
                size="m"
                label="초대 이메일"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                helperText="여러 명은 쉼표로 구분. 건너뛰면 나중에 Team permissions에서 초대."
              />
            </div>
          ) : null}
          {step === 3 ? (
            <div className={styles.section}>
              <p className={styles.subtitle}>
                설정이 준비되었습니다. 완료 후 Dashboard Empty CTA가 해소됩니다.
              </p>
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                label="서비스 이용 약관 및 개인정보 처리에 동의합니다"
              />
            </div>
          ) : null}
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
            <div className={styles.footerSpacer} />
            {step === 2 ? (
              <Button
                variant="secondary"
                size="m"
                onClick={() => setStep(3)}
              >
                건너뛰기
              </Button>
            ) : null}
            <Button
              variant="primary"
              size="m"
              onClick={next}
              data-primary-cta="true"
            >
              {isLast ? "완료" : "다음"}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </section>
  );
}
