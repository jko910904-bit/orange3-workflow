"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPONENT_DOCS, PLAYGROUND_NAV } from "@/playground/catalog";
import { listRecipes } from "@/catalog";
import styles from "./PlaygroundShell.module.css";

function breadcrumbFromPath(pathname: string) {
  if (pathname === "/") return ["Home"];
  const parts = pathname.split("/").filter(Boolean);
  return ["Home", ...parts.map((p) => decodeURIComponent(p))];
}

export function PlaygroundShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const crumbs = breadcrumbFromPath(pathname);
  const componentCount = COMPONENT_DOCS.length;
  const recipeCount = listRecipes().length;

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <p className={styles.brandEyebrow}>AI Screen Generator</p>
          <h1 className={styles.brandTitle}>Playground</h1>
          <p className={styles.brandSub}>
            {componentCount} components · {recipeCount} recipes
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
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={`${c}-${i}`} className={styles.crumb}>
                {i === 0 ? <Link href="/">{c}</Link> : c}
                {i < crumbs.length - 1 ? (
                  <span className={styles.sep}>/</span>
                ) : null}
              </span>
            ))}
          </nav>
          <p className={styles.pipeline}>
            Prompt → Parser → Recipe → Pattern → Registry → Renderer
          </p>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
