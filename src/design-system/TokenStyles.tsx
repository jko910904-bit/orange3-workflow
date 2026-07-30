import { rootCssVariablesAsString } from "@/design-system/tokens";

/** Injects TokenRegistry values as :root CSS variables (single source of truth). */
export function TokenStyles() {
  const css = `:root {\n${rootCssVariablesAsString()}\n}`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
