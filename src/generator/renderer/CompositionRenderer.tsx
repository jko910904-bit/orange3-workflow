"use client";

import { Button, Checkbox, Input } from "@/design-system/components";
import { Card } from "@/design-system/components";
import { DensityProvider } from "@/design-system/DensityProvider";
import type {
  CompositionNode,
  ScreenComposition,
} from "@/types/screen-composition";
import styles from "./composition.module.css";

function renderNode(node: CompositionNode) {
  const variant = (node.variant ?? "Default").toLowerCase();
  const size = (node.size ?? "M").toLowerCase() as "s" | "m" | "l";
  const props = node.props ?? {};

  switch (node.component) {
    case "Button": {
      const buttonVariant = (
        ["primary", "secondary", "tertiary", "ghost", "danger"].includes(
          variant,
        )
          ? variant
          : "primary"
      ) as "primary" | "secondary" | "tertiary" | "ghost" | "danger";
      return (
        <Button
          key={node.id}
          variant={buttonVariant}
          size={size}
          width={(props.width as "hug" | "fill") ?? "hug"}
          type={(props.type as "button" | "submit") ?? "button"}
        >
          {String(props.children ?? "Button")}
        </Button>
      );
    }
    case "Input": {
      const kind = (
        ["email", "password", "search", "number", "text"].includes(variant)
          ? variant
          : "text"
      ) as "text" | "email" | "password" | "search" | "number";
      return (
        <Input
          key={node.id}
          kind={kind}
          size={size}
          label={props.label as string | undefined}
          placeholder={props.placeholder as string | undefined}
          autoComplete={props.autoComplete as string | undefined}
        />
      );
    }
    case "Checkbox":
      return (
        <Checkbox
          key={node.id}
          label={props.label as string | undefined}
          defaultChecked={Boolean(props.defaultChecked)}
        />
      );
    default:
      return (
        <div key={node.id} className={styles.unknown}>
          Unknown component: {node.component}.{node.variant}
        </div>
      );
  }
}

type CompositionRendererProps = {
  composition: ScreenComposition;
};

/**
 * ScreenComposition → React UI (token-based design-system components only)
 */
export function CompositionRenderer({
  composition,
}: CompositionRendererProps) {
  const isLogin = composition.intent === "login";

  return (
    <DensityProvider defaultSurface={composition.surface}>
      <div className={styles.root}>
        <div className={styles.meta}>
          <p className={styles.eyebrow}>Prompt → Composition → React</p>
          <h2 className={styles.title}>
            {isLogin ? "Login Screen" : composition.intent}
          </h2>
          <p className={styles.recipe}>
            {composition.recipe.join(" → ")}
          </p>
        </div>

        {isLogin ? (
          <Card shadow="2" radius="8" padding="l" className={styles.loginCard}>
            <Card.Body>
              <form
                className={styles.stack}
                onSubmit={(e) => e.preventDefault()}
              >
                {composition.nodes.map(renderNode)}
              </form>
            </Card.Body>
          </Card>
        ) : (
          <div className={styles.stack}>
            {composition.nodes.map(renderNode)}
          </div>
        )}
      </div>
    </DensityProvider>
  );
}
