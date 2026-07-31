"use client";

import { Button, Checkbox, Input } from "@/design-system/components";
import { PortalShell } from "./PortalShell";
import styles from "./portal.module.css";

export type PortalLoginProps = {
  /** Show sample credential error (matches Real Example) */
  showError?: boolean;
};

/**
 * Portal Login (Real Example)
 * Shared PortalShell + centered ID/password form
 */
export function PortalLoginPattern({ showError = true }: PortalLoginProps) {
  return (
    <PortalShell
      breadcrumb={[
        { label: "Home" },
        { label: "로그인", current: true },
      ]}
      title="로그인"
      illustration="login"
      contentLayout="centered"
    >
      <form
        className={styles.loginForm}
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        <div className={styles.fieldStack}>
          <Input
            kind="text"
            size="m"
            label="아이디"
            placeholder="5~16자리(영문 대문자+숫자)"
            autoComplete="username"
          />
          <Input
            kind="password"
            size="m"
            label="비밀번호"
            placeholder="8~20자리(영문+특수문자+숫자 조합)"
            autoComplete="current-password"
          />
        </div>

        <div className={styles.rememberRow}>
          <Checkbox label="아이디 저장" defaultChecked />
        </div>

        {showError ? (
          <p className={styles.errorText} role="alert">
            아이디(로그인 전화번호, 로그인 전용 아이디) 또는 비밀번호가 잘못
            되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          size="l"
          width="fill"
          className={styles.submitBtn}
        >
          로그인
        </Button>

        <div className={styles.recoveryRow}>
          <a className={styles.recoveryLink} href="#find-id">
            아이디 찾기
          </a>
          <span className={styles.recoverySep} aria-hidden />
          <a className={styles.recoveryLink} href="#reset-pw">
            비밀번호 재설정
          </a>
        </div>

        <p className={styles.signupHint}>
          아직 회원이 아니시라면
          <a className={styles.signupLink} href="#signup">
            회원가입
          </a>
        </p>
      </form>
    </PortalShell>
  );
}
