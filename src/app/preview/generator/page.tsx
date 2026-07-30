"use client";

import { useMemo, useState } from "react";
import { Button } from "@/design-system/components";
import { listPatterns, parsePrompt, ScreenRenderer } from "@/generator";

const SAMPLES = [
  "회원관리 검색 테이블",
  "차트 KPI 통계",
  "로그인 화면",
  "대시보드 만들어줘",
  "상품 상세",
  "서비스 신청 폼",
  "온보딩 절차 위자드",
];

export default function GeneratorPreviewPage() {
  const [prompt, setPrompt] = useState(SAMPLES[0]);
  const [surface, setSurface] = useState<"admin" | "portal">("admin");
  const result = useMemo(() => parsePrompt(prompt), [prompt]);
  const catalog = listPatterns();

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">
          Generator Preview
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Prompt → Pattern → React Screen
        </h1>
        <p className="text-sm text-zinc-600">
          Mock parser가 Registry에서 Pattern을 고르고, Renderer가 DS 컴포넌트로
          화면을 조립합니다.
        </p>
      </header>

      <div className="ds-row">
        <Button
          variant={surface === "admin" ? "primary" : "ghost"}
          size="s"
          onClick={() => setSurface("admin")}
        >
          Admin / Dense
        </Button>
        <Button
          variant={surface === "portal" ? "primary" : "ghost"}
          size="s"
          onClick={() => setSurface("portal")}
        >
          Portal / Comfortable
        </Button>
      </div>

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

      <section className="ds-panel ds-stack">
        <h2 className="text-sm font-medium text-zinc-500">
          Pattern Registry ({catalog.length})
        </h2>
        <ul className="grid gap-2 text-sm text-zinc-700 sm:grid-cols-2">
          {catalog.map((p) => (
            <li key={p.id}>
              <span className="font-mono text-xs text-zinc-400">{p.id}</span>
              {" — "}
              {p.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-zinc-500">
          Selected ({result.patterns.map((p) => p.id).join(", ") || "none"})
        </h2>
        <ScreenRenderer patterns={result.patterns} surface={surface} />
      </section>
    </main>
  );
}
