"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import { antdTheme } from "./theme";

type AntdProviderProps = {
  children: React.ReactNode;
};

/**
 * Supplemental UI provider (theme + App context for modal/message).
 * Does not replace own Design System components.
 */
export function AntdProvider({ children }: AntdProviderProps) {
  return (
    <AntdRegistry>
      <ConfigProvider locale={koKR} theme={antdTheme}>
        <App>{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
