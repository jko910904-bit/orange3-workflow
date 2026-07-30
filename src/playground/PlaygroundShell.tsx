"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLAYGROUND_NAV } from "@/playground/catalog";
import styles from "./PlaygroundShell.module.css";

export function PlaygroundShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <p className={styles.brandEyebrow}>Design Kit</p>
          <h1 className={styles.brandTitle}>Playground</h1>
          <p className={styles.brandSub}>
            Humans inspect · AI learns Metadata
          </p>
        </div>
        <nav className={styles.nav} aria-label="Playground">
          {PLAYGROUND_NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.navActive : styles.navLink}
              >
                <span className={styles.navLabel}>{item.label}</span>
                <span className={styles.navDesc}>{item.description}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className={styles.main}>
        <header className={styles.topbar}>
          <p className={styles.pipeline}>
            Tokens → Components → Patterns → Templates → Generator
          </p>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
