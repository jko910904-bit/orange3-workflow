"use client";

import { useMemo, useState } from "react";
import { parsePrompt, ScreenRenderer } from "@/generator";

const SAMPLES = [
  "대시보드 만들어줘",
  "주문 목록 검색 테이블",
  "로그인 화면",
  "상품 상세 페이지",
];

export default function GeneratorPreviewPage() {
  const [prompt, setPrompt] = useState(SAMPLES[0]);
  const result = useMemo(() => parsePrompt(prompt), [prompt]);

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          Generator Preview
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Mock parser → Pattern registry → Renderer
        </h1>
        <p className="text-sm text-zinc-600">
          AI는 아직 없습니다. 키워드 기반 mock이 registry에서 pattern을
          고릅니다.
        </p>
      </header>

      <label className="flex flex-col gap-2 text-sm text-zinc-700">
        Prompt
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          rows={3}
          className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-blue-500"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => setPrompt(sample)}
            className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            {sample}
          </button>
        ))}
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-zinc-500">
          Selected patterns ({result.patterns.length})
        </h2>
        <ScreenRenderer patterns={result.patterns} />
      </section>
    </main>
  );
}
