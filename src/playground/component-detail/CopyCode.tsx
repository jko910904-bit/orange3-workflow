"use client";

import { useState } from "react";
import { Button } from "@/design-system/components/button/Button";
import styles from "./ComponentDetail.module.css";

export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.codeBlock}>
      <Button
        className={styles.copyBtn}
        size="s"
        variant="ghost"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? "Copied" : "Copy"}
      </Button>
      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
