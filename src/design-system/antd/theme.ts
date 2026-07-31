import type { ThemeConfig } from "antd";
import { APPLE_FONT_STACK } from "../tokens/themes/apple";

/**
 * Kit-aligned theme for supplemental UI components
 * (Modal, Select, DatePicker, …). Own DS remains primary for
 * Button / Input / Table / Card.
 */
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: "#2C6EF2",
    colorInfo: "#2C6EF2",
    colorSuccess: "#00C853",
    colorWarning: "#F9A825",
    colorError: "#EB5D5D",
    colorTextBase: "#1A1A1A",
    colorBgBase: "#FFFFFF",
    borderRadius: 4,
    borderRadiusLG: 8,
    fontFamily:
      'var(--font-geist-sans), "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
    controlHeight: 32,
    controlHeightLG: 40,
  },
  components: {
    Button: {
      borderRadius: 4,
      controlHeight: 32,
    },
    Select: {
      borderRadius: 4,
      controlHeight: 32,
    },
    DatePicker: {
      borderRadius: 4,
      controlHeight: 32,
    },
    Modal: {
      borderRadiusLG: 8,
    },
    Drawer: {
      borderRadiusLG: 8,
    },
  },
};

/**
 * Preview-only Antd theme for Apple-inspired generator frames.
 * Wrap the preview subtree with ConfigProvider — do not replace global AntdProvider.
 */
export function applePreviewAntdTheme(colorPrimary: string): ThemeConfig {
  return {
    ...antdTheme,
    token: {
      ...antdTheme.token,
      colorPrimary,
      colorInfo: colorPrimary,
      borderRadius: 10,
      borderRadiusLG: 12,
      fontFamily: APPLE_FONT_STACK,
      controlHeight: 34,
      controlHeightLG: 42,
    },
    components: {
      ...antdTheme.components,
      Button: {
        ...antdTheme.components?.Button,
        borderRadius: 10,
        controlHeight: 34,
      },
      Select: {
        ...antdTheme.components?.Select,
        borderRadius: 10,
        controlHeight: 34,
      },
      DatePicker: {
        ...antdTheme.components?.DatePicker,
        borderRadius: 10,
        controlHeight: 34,
      },
      Modal: {
        ...antdTheme.components?.Modal,
        borderRadiusLG: 12,
      },
      Drawer: {
        ...antdTheme.components?.Drawer,
        borderRadiusLG: 12,
      },
    },
  };
}

/** Prefer own DS for these; use antd for the rest */
export const OWN_DS_COMPONENTS = [
  "Button",
  "Input",
  "Checkbox",
  "Table",
  "Card",
] as const;

export const ANTD_SUPPLEMENTS = [
  "Modal",
  "Drawer",
  "Select",
  "DatePicker",
  "Switch",
  "Tabs",
  "Dropdown",
  "Tooltip",
  "Message",
  "Notification",
] as const;
