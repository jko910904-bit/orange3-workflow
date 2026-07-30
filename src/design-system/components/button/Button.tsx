import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import styles from "./button.module.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
export type ButtonSize = "xsmall" | "small" | "medium" | "large";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/**
 * Kit COMPONENTS_01 Button — token-only colors/radius/motion/spacing.
 * Size table is kit-fixed (not density-scaled).
 */
export function Button({
  variant = "primary",
  size = "medium",
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.root, styles[variant], styles[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
