import Link from "next/link";
import styles from "./home.module.css";

const EXPLORE = [
  {
    href: "/recipes",
    label: "Recipes · 업무 화면",
    description:
      "회원관리 · Dashboard · AI Chat… — Preview로 보고 Pattern chain으로 Compose합니다.",
  },
  {
    href: "/screens",
    label: "Screens",
    description: "Live compose 화면. Recipe에서 고른 업무 화면을 바로 확인합니다.",
  },
  {
    href: "/components",
    label: "Components",
    description:
      "Live Preview · Variants · States — Button · Input · Select · Table 등 Kit만.",
  },
  {
    href: "/patterns",
    label: "UX Patterns",
    description:
      "Pattern Preview · UX Flow · Layout — Search · Data Table · Dashboard …",
  },
  {
    href: "/foundations",
    label: "Foundation",
    description: "토큰 참조. AI는 Color · Type · Radius를 발명하지 않습니다.",
  },
  {
    href: "/principles",
    label: "Principles",
    description: "JKO UX Rules — 필요할 때 펼칩니다.",
  },
  {
    href: "/playground",
    label: "Playground",
    description: "AI 실험 전용. Design Kit을 변경하지 않습니다.",
  },
  {
    href: "/settings",
    label: "Settings",
    description: "Design Kit 관리 · Knowledge(dev) 링크.",
  },
] as const;

export default function DesignSystemHomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>JKO v2.0 · Design System Platform</p>
        <h1 className={styles.title}>See · Explore · Compose</h1>
        <p className={styles.mission}>
          Preview-first · Compose ≠ Generate
        </p>
        <p className={styles.sub} style={{ marginTop: 0 }}>
          문서를 읽기 전에 화면을 봅니다. Recipes · Screens · Components ·
          Patterns로 탐색하고 Kit만 Compose합니다.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/recipes" className={styles.ctaPrimary}>
            업무 화면 탐색
          </Link>
          <Link href="/components/button" className={styles.ctaGhost}>
            Component Preview
          </Link>
        </div>
      </header>

      <section className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>Explore</h2>
        <div className={styles.cardGrid}>
          {EXPLORE.map((area) => (
            <Link key={area.href} href={area.href} className={styles.card}>
              <div className={styles.cardTop}>
                <h3>{area.label}</h3>
              </div>
              <p>{area.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
