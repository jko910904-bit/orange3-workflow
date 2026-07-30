"use client";

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import styles from "./input.module.css";

export type InputKind = "text" | "password" | "search" | "number";
export type InputSize = "s" | "m" | "l";
export type InputState = "default" | "error";

export type InputProps = {
  kind?: InputKind;
  size?: InputSize;
  /** Explicit visual state — Focus/Disabled come from native :focus / disabled */
  state?: InputState;
  label?: string;
  helperText?: string;
  /** Leading adornment (overrides Search default icon when kind=search if provided) */
  startIcon?: ReactNode;
  /** Trailing adornment */
  endIcon?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">;

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.5 10.5L14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 2l12 12M6.1 6.2A2 2 0 009.8 9.9M4.2 4.5C2.7 5.6 1.5 8 1.5 8s2.5 4.5 6.5 4.5c1.2 0 2.3-.3 3.2-.8M11.5 11C13 10 14.5 8 14.5 8s-1.2-2.1-3-3.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Design System Input
 *
 * Kind: Text | Password | Search | Number
 * State: Default | Focus | Error | Disabled
 * Size: S | M | L
 *
 * Token-only styles.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    kind = "text",
    size = "m",
    state = "default",
    label,
    helperText,
    startIcon,
    endIcon,
    className,
    disabled,
    id,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = `${inputId}-helper`;
  const [revealed, setRevealed] = useState(false);

  const isError = state === "error";
  const htmlType =
    kind === "password" ? (revealed ? "text" : "password") : kind;

  const leading =
    startIcon ?? (kind === "search" ? <SearchIcon /> : undefined);

  const trailing =
    endIcon ??
    (kind === "password" ? (
      <button
        type="button"
        className={styles.iconButton}
        tabIndex={-1}
        disabled={disabled}
        aria-label={revealed ? "Hide password" : "Show password"}
        onClick={() => setRevealed((v) => !v)}
      >
        <EyeIcon open={revealed} />
      </button>
    ) : undefined);

  return (
    <div
      className={cn(styles.field, styles[size], className)}
      data-state={isError ? "error" : "default"}
      data-disabled={disabled || undefined}
      data-kind={kind}
    >
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}

      <div className={styles.control}>
        {leading ? <span className={styles.affix}>{leading}</span> : null}
        <input
          ref={ref}
          id={inputId}
          type={htmlType}
          disabled={disabled}
          aria-invalid={isError || undefined}
          aria-describedby={helperText ? helperId : undefined}
          className={styles.input}
          {...rest}
        />
        {trailing ? <span className={styles.affix}>{trailing}</span> : null}
      </div>

      {helperText ? (
        <p id={helperId} className={styles.helper}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
