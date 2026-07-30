import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import styles from "./button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "danger";

export type ButtonSize = "s" | "m" | "l";

export type ButtonIconPlacement = "left" | "right" | "only";

export type ButtonWidth = "hug" | "fill";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ButtonWidth;
  /** Visual state helpers — CSS covers hover/pressed/focus; these are explicit props */
  loading?: boolean;
  icon?: ReactNode;
  iconPlacement?: ButtonIconPlacement;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

/**
 * Design System Button
 *
 * Variant: Primary | Secondary | Tertiary | Ghost | Danger
 * Size: S | M | L
 * State: Default | Hover | Pressed | Focus | Disabled | Loading (CSS + props)
 * Icon: Left | Right | Only
 * Width: Hug | Fill
 *
 * Styles resolve from Design Token CSS variables only.
 */
export function Button({
  variant = "primary",
  size = "m",
  width = "hug",
  loading = false,
  icon,
  iconPlacement = "left",
  className,
  type = "button",
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const isIconOnly = iconPlacement === "only" || (!children && !!icon);
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      data-width={width}
      data-icon={isIconOnly ? "only" : icon ? iconPlacement : undefined}
      data-loading={loading || undefined}
      className={cn(
        styles.root,
        styles[variant],
        styles[size],
        styles[width],
        isIconOnly && styles.iconOnly,
        loading && styles.loading,
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden />
      ) : (
        icon &&
        (isIconOnly || iconPlacement === "left") && (
          <span className={styles.icon}>{icon}</span>
        )
      )}
      {!isIconOnly && children != null && (
        <span className={styles.label}>{children}</span>
      )}
      {!loading && icon && !isIconOnly && iconPlacement === "right" && (
        <span className={styles.icon}>{icon}</span>
      )}
    </button>
  );
}
