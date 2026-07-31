"use client";

import type { ReactNode } from "react";
import styles from "./DocDisclosure.module.css";

export type DocDisclosureProps = {
  /** Visible summary label — e.g. 정의, Best Practice */
  title: string;
  children: ReactNode;
  /** Default closed — docs are opt-in */
  open?: boolean;
  id?: string;
};

/**
 * Collapsed-by-default doc section (“필요할 때 펼침”).
 * Token-only CSS · native &lt;details&gt; for a11y.
 */
export function DocDisclosure({
  title,
  children,
  open = false,
  id,
}: DocDisclosureProps) {
  return (
    <details id={id} className={styles.root} {...(open ? { open: true } : {})}>
      <summary className={styles.summary}>
        <span className={styles.title}>{title}</span>
        <span className={styles.hint}>필요할 때 펼침</span>
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
