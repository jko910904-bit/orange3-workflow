import Link from "next/link";
import { DecisionTreeCallout } from "@/playground/DecisionTreeCallout";
import styles from "../../home.module.css";

export default function DecisionTreePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Design Kit · Principles</p>
        <h1 className={styles.title}>UX Decision Tree</h1>
        <p className={styles.sub}>
          Compose 시 목록·수정·삭제·밀도·Wizard·레이아웃·빠른 작업을 결정하는
          캐노니컬 트리입니다. Canonical text is Korean.
        </p>
        <p className={styles.sub}>
          Docs: <code>docs/principles/ux-decision-tree.md</code> · Code:{" "}
          <code>src/playground/decision-tree.ts</code> ·{" "}
          <Link href="/principles">Principles hub</Link>
          {" · "}
          <Link href="/principles#drawer-vs-page">Drawer vs Page</Link>
          {" · "}
          <Link href="/principles#overlay-rules">Overlay</Link>
          {" · "}
          <Link href="/principles#button-rules">Button</Link>
        </p>
      </header>

      <DecisionTreeCallout
        primary
        showSource={false}
        note="수정+목록 유지=Drawer · 빠른 확인=Drawer · 빠른 작업=Modal · 삭제=Confirm — OVERLAY / DRAWER_VS_PAGE와 모순되지 않게 적용."
      />
    </main>
  );
}
