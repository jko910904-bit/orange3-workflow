"use client";

import {
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import styles from "./card.module.css";

export type CardState = "default" | "selected";
export type CardShadow = "none" | "1" | "2" | "3" | "4";
export type CardRadius = "4" | "8" | "16";
export type CardPadding = "s" | "m" | "l";

type CardContextValue = {
  padding: CardPadding;
};

const CardContext = createContext<CardContextValue>({ padding: "m" });

export type CardProps = {
  /** Default | Selected — Hover is CSS :hover when interactive */
  state?: CardState;
  shadow?: CardShadow;
  radius?: CardRadius;
  padding?: CardPadding;
  /** Enables hover elevation/border transition */
  interactive?: boolean;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

/**
 * Design System Card
 *
 * State: Default | Selected | Hover
 * Slots: Header | Body | Footer
 * Tokens: Shadow (elevation) | Radius | Padding
 */
export function Card({
  state = "default",
  shadow = "1",
  radius = "8",
  padding = "m",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <CardContext.Provider value={{ padding }}>
      <div
        data-state={state}
        data-shadow={shadow}
        data-radius={radius}
        data-padding={padding}
        data-interactive={interactive || undefined}
        className={cn(
          styles.root,
          styles[`shadow${shadow === "none" ? "None" : shadow}`],
          styles[`radius${radius}`],
          styles[`padding${padding.toUpperCase()}`],
          interactive && styles.interactive,
          state === "selected" && styles.selected,
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}

type SlotProps = {
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function CardHeader({ children, className, ...rest }: SlotProps) {
  return (
    <div className={cn(styles.header, className)} {...rest}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...rest }: SlotProps) {
  return (
    <div className={cn(styles.body, className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...rest }: SlotProps) {
  return (
    <div className={cn(styles.footer, className)} {...rest}>
      {children}
    </div>
  );
}

/** Optional hook for nested pattern components */
export function useCardContext() {
  return useContext(CardContext);
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
