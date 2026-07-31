"use client";

import { useState } from "react";
import { Switch } from "antd";
import { Button, Card, Input } from "@/design-system/components";
import cardStyles from "@/design-system/components/card/card.module.css";
import { AdminShell } from "./AdminShell";
import styles from "../pattern.module.css";
import dashStyles from "../Dashboard.module.css";

type Tab = "general" | "security" | "roles";

/**
 * Screen: Settings + Permissions — Form sections + Confirm for danger.
 * Sticky Footer Primary 하나; 위험 변경만 Confirm.
 */
export function SettingsPermissionsPattern() {
  const [tab, setTab] = useState<Tab>("general");
  const [workspaceName, setWorkspaceName] = useState("JKO 운영 워크스페이스");
  const [timezone, setTimezone] = useState("Asia/Seoul");
  const [mfaRequired, setMfaRequired] = useState(true);
  const [sessionDays, setSessionDays] = useState("14");
  const [publicSignup, setPublicSignup] = useState(false);

  function saveGeneral() {
    window.alert("설정이 저장되었습니다 (미리보기 stub).");
  }

  function saveSecurity() {
    if (!mfaRequired) {
      const ok = window.confirm(
        "MFA 필수를 끄면 보안 위험이 커집니다. 계속할까요?",
      );
      if (!ok) return;
    }
    window.alert("보안 설정이 저장되었습니다 (미리보기 stub).");
  }

  function confirmPublicSignup(next: boolean) {
    if (next) {
      const ok = window.confirm(
        "공개 가입을 켜면 누구나 워크스페이스에 참여할 수 있습니다. 계속할까요?",
      );
      if (!ok) return;
    }
    setPublicSignup(next);
  }

  return (
    <AdminShell
      title="설정"
      breadcrumb="Home / 시스템관리 / 설정"
      lnbTitle="시스템관리"
      lnbItems={[
        { label: "일반 설정", active: tab === "general" },
        { label: "보안", active: tab === "security" },
        { label: "역할 · ACL", active: tab === "roles" },
      ]}
      topMenus={["대시보드", "회원", "설정"]}
      showPageHeader={false}
    >
      <section className={styles.pattern} aria-label="Settings Screen preview">
        <div className={styles.crudIntro}>
          <div>
            <h2 className={styles.title}>설정 · 권한</h2>
            <p className={styles.subtitle}>
              Settings = 환경 · Permission = 접근 통제. 위험 변경만 Confirm.
              Primary = 저장 하나.
            </p>
          </div>
          <div className={styles.crudToggles}>
            {(
              [
                ["general", "일반"],
                ["security", "보안"],
                ["roles", "역할 · ACL"],
              ] as const
            ).map(([id, label]) => (
              <Button
                key={id}
                variant={tab === id ? "secondary" : "ghost"}
                size="s"
                aria-pressed={tab === id}
                onClick={() => setTab(id)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {tab === "general" ? (
          <div className={styles.crudBody}>
            <Card shadow="1" radius="8" padding="l">
              <Card.Header>
                <h3 className={cardStyles.title}>워크스페이스</h3>
              </Card.Header>
              <Card.Body>
                <div className={styles.grid2}>
                  <Input
                    kind="text"
                    size="m"
                    label="이름"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                  />
                  <Input
                    kind="text"
                    size="m"
                    label="타임존"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  />
                </div>
              </Card.Body>
            </Card>
            <div className={styles.actions}>
              <Button
                variant="primary"
                size="m"
                onClick={saveGeneral}
                data-primary-cta="true"
              >
                저장
              </Button>
            </div>
          </div>
        ) : null}

        {tab === "security" ? (
          <div className={styles.crudBody}>
            <Card shadow="1" radius="8" padding="l">
              <Card.Header>
                <h3 className={cardStyles.title}>보안 정책</h3>
              </Card.Header>
              <Card.Body>
                <div className={styles.section}>
                  <label
                    className={styles.subtitle}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <span>MFA 필수</span>
                    <Switch
                      checked={mfaRequired}
                      onChange={setMfaRequired}
                      aria-label="MFA 필수"
                    />
                  </label>
                  <label
                    className={styles.subtitle}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <span>공개 가입 허용</span>
                    <Switch
                      checked={publicSignup}
                      onChange={confirmPublicSignup}
                      aria-label="공개 가입 허용"
                    />
                  </label>
                  <Input
                    kind="text"
                    size="m"
                    label="세션 유지 (일)"
                    value={sessionDays}
                    onChange={(e) => setSessionDays(e.target.value)}
                  />
                </div>
              </Card.Body>
            </Card>
            <div className={styles.actions}>
              <Button
                variant="primary"
                size="m"
                onClick={saveSecurity}
                data-primary-cta="true"
              >
                저장
              </Button>
            </div>
          </div>
        ) : null}

        {tab === "roles" ? (
          <div className={styles.crudBody}>
            <Card shadow="1" radius="8" padding="l">
              <Card.Header>
                <h3 className={cardStyles.title}>역할 · ACL 매트릭스 (읽기)</h3>
              </Card.Header>
              <Card.Body>
                <p className={styles.subtitle}>
                  역할 할당·멤버 제거는 Team permissions Recipe에서 운영합니다.
                  여기선 정책 요약만 표시합니다.
                </p>
                <ul className={dashStyles.activityList}>
                  <li className={dashStyles.activityItem}>
                    <span className={dashStyles.activityTime}>소유자</span>
                    <span className={dashStyles.activityText}>
                      빌링 · 삭제 · 역할 이전 · 전체 ACL
                    </span>
                  </li>
                  <li className={dashStyles.activityItem}>
                    <span className={dashStyles.activityTime}>관리자</span>
                    <span className={dashStyles.activityText}>
                      멤버 초대 · 설정 · 콘텐츠 CRUD
                    </span>
                  </li>
                  <li className={dashStyles.activityItem}>
                    <span className={dashStyles.activityTime}>편집</span>
                    <span className={dashStyles.activityText}>
                      콘텐츠 생성·수정 · 설정 조회
                    </span>
                  </li>
                  <li className={dashStyles.activityItem}>
                    <span className={dashStyles.activityTime}>조회</span>
                    <span className={dashStyles.activityText}>
                      읽기 전용 · Export 제한
                    </span>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        ) : null}
      </section>
    </AdminShell>
  );
}
