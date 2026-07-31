"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/playground/catalog";
import { getScreenRecipe } from "@/playground/recipe-catalog";
import styles from "./PlaygroundShell.module.css";

function breadcrumbFromPath(pathname: string) {
  if (pathname === "/") return ["JKO"];
  const parts = pathname.split("/").filter(Boolean);
  const pretty: Record<string, string> = {
    recipes: "Recipes",
    foundations: "Foundation",
    components: "Components",
    patterns: "UX Patterns",
    knowledge: "Knowledge",
    principles: "Principles",
    screens: "Screens",
    templates: "Screens",
    playground: "Playground",
    settings: "Settings",
  };
  return [
    "JKO",
    ...parts.map((p, i) => {
      if (pretty[p]) return pretty[p];
      if (parts[0] === "recipes" && i === 1) {
        return getScreenRecipe(p)?.title ?? decodeURIComponent(p);
      }
      return decodeURIComponent(p);
    }),
  ];
}

export function PlaygroundShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const crumbs = breadcrumbFromPath(pathname);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <p className={styles.brandEyebrow}>Design System</p>
          <Link href="/" className={styles.brandTitleLink}>
            <h1 className={styles.brandTitle}>JKO</h1>
          </Link>
          <p className={styles.brandSub}>Design System Platform</p>
        </div>
        <nav className={styles.nav} aria-label="JKO Design System">
          {NAV_GROUPS.map((group, groupIndex) => (
            <div key={group.id} className={styles.navGroup}>
              {groupIndex > 0 ? (
                <div className={styles.navDivider} role="separator" />
              ) : null}
              {group.label ? (
                <p className={styles.navGroupLabel}>{group.label}</p>
              ) : null}
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
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
            </div>
          ))}
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
          <p className={styles.pipeline}>Compose ≠ Generate</p>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
