"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import styles from "./checkbox.module.css";

export type CheckboxProps = {
  label?: ReactNode;
  indeterminate?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size">;

/**
 * Design System Checkbox — token-styled, AI Metadata: Checkbox
 */
export function Checkbox({
  label,
  className,
  id,
  indeterminate,
  disabled,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      className={cn(styles.root, disabled && styles.disabled, className)}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        ref={(el) => {
          if (el) el.indeterminate = Boolean(indeterminate);
        }}
        {...rest}
      />
      {label != null ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
}
