import { getPattern } from "@/generator/registry";
import type { PatternRef } from "@/types";

type ScreenRendererProps = {
  patterns: PatternRef[];
};

export function ScreenRenderer({ patterns }: ScreenRendererProps) {
  if (patterns.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-zinc-300 p-6 text-zinc-500">
        No patterns selected.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {patterns.map((ref) => {
        const pattern = getPattern(ref.id);
        if (!pattern) {
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
          <div
            key={pattern.id}
            className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
              Pattern
            </p>
            <h2 className="mt-1 text-lg font-semibold text-zinc-900">
              {pattern.name}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">{pattern.description}</p>
            <p className="mt-3 font-mono text-xs text-zinc-400">id: {pattern.id}</p>
          </div>
        );
      })}
    </div>
  );
}
