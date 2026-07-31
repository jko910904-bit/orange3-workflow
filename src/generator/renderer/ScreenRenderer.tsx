"use client";

import type { ComponentType } from "react";
import {
  ChartKpiPattern,
  DashboardPattern,
  DetailPattern,
  FormPattern,
  LoginPattern,
  AdminListPattern,
  SearchFilterTablePattern,
  WizardPattern,
} from "@/design-system/patterns";
import { getPattern } from "@/generator/registry";
import type { PatternId, PatternRef } from "@/types";
import { DensityProvider } from "@/design-system/DensityProvider";

const PATTERN_VIEWS: Record<PatternId, ComponentType> = {
  SearchFilterTable: SearchFilterTablePattern,
  ChartKpi: ChartKpiPattern,
  Login: LoginPattern,
  CRUD: AdminListPattern,
  Dashboard: DashboardPattern,
  Detail: DetailPattern,
  Form: FormPattern,
  Wizard: WizardPattern,
};

type ScreenRendererProps = {
  patterns: PatternRef[];
  /** admin → dense, portal → comfortable */
  surface?: "admin" | "portal";
};

export function ScreenRenderer({
  patterns,
  surface = "admin",
}: ScreenRendererProps) {
  if (patterns.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-zinc-300 p-6 text-zinc-500">
        No patterns selected.
      </div>
    );
  }

  return (
    <DensityProvider defaultSurface={surface}>
      <div className="flex flex-col gap-8">
        {patterns.map((ref) => {
          const meta = getPattern(ref.id);
          const View = PATTERN_VIEWS[ref.id];

          if (!meta || !View) {
            return (
              <div
                key={ref.id}
                className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700"
              >
                Unknown pattern: {ref.id}
              </div>
            );
          }

          return (
            <div key={ref.id} className="ds-panel">
              <p className="mb-4 text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Pattern · {meta.id}
              </p>
              <View />
            </div>
          );
        })}
      </div>
    </DensityProvider>
  );
}
