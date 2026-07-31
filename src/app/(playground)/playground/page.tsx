import Link from "next/link";
import styles from "../home.module.css";

const EXPERIMENTS = [
  {
    href: "/recipes",
    label: "Recipes · 업무 화면",
    description:
      "Phase 2 — 회원관리 · Dashboard · AI Chat · Workflow 화면 Recipe Browser.",
    status: "ready",
  },
  {
    href: "/knowledge",
    label: "Knowledge Explorer",
    description:
      "보조 검색 — Pattern · Component · Recipe · Decision Rule.",
    status: "ready",
  },
  {
    href: "/playground/composer",
    label: "AI Composer",
    description:
      "준비 중 — Future AI Composer는 recommend/compose only (Kit 불변).",
    status: "준비 중",
  },
  {
    href: "/developer",
    label: "Developer Home",
    description: "Progress · Registry counts · Recent components.",
    status: "experimental",
  },
  {
    href: "/registry",
    label: "Registry Viewer",
    description: "Components · Kit Recipes · Patterns · JSON.",
    status: "experimental",
  },
  {
    href: "/ai-metadata",
    label: "AI Metadata",
    description: "Purpose · Aliases · Rules · Prompt examples.",
    status: "experimental",
  },
  {
    href: "/prompt",
    label: "Prompt Lab",
    description: "Legacy prompt → composition lab (does not mutate kit).",
    status: "experimental",
  },
  {
    href: "/antd",
    label: "Ant Design Bridge",
    description: "Antd theme mapping against design tokens.",
    status: "experimental",
  },
] as const;

export default function PlaygroundIndexPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Playground</p>
        <h1 className={styles.title}>AI experiment only</h1>
        <p className={styles.sub}>
          Playground는 AI·프롬프트 실험 공간입니다. Design Kit(토큰·컴포넌트·UX
          Pattern·Screens)을 변경하지 않습니다. Future AI Composer는
          recommend/compose only — 발명이 아닙니다.
        </p>
      </header>

      <div className={styles.cardGrid}>
        {EXPERIMENTS.map((item) => (
          <Link key={item.href} href={item.href} className={styles.card}>
            <div className={styles.cardTop}>
              <h3>{item.label}</h3>
              <span
                className={styles.status}
                data-status={
                  item.status === "ready"
                    ? "ready"
                    : item.status === "준비 중"
                      ? "partial"
                      : "partial"
                }
              >
                {item.status}
              </span>
            </div>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
