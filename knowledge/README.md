# JKO External Knowledge (`knowledge/`)

> **Analyze UX decisions. Do not copy visuals or branding.**  
> Canonical product rules live in [`docs/`](../docs/README.md) (01–12). This tree is **inspiration analysis** only.

```
knowledge/
├── ai/               # AI Decision Engine — Tree · Rules · Selectors · Composer
├── design-systems/   # HIG / DS 규범 — 상태·내비·밀도 의사결정
├── case-studies/     # 제품·서비스 UX — 운영/교육/협업 시나리오
└── ux-patterns/      # JKO Pattern · RELATIONSHIPS · recipes/ → docs/05·06
```

충돌 시 **`docs/`가 항상 우선**합니다.

화면 Compose **전**에 [`ai/AI_DECISION_ENGINE.md`](./ai/AI_DECISION_ENGINE.md)를 본다  
(순서: Problem → User Goal → Task → Pattern → Recipe → Component → Layout → Validation → Result).

---

## Three buckets

| Bucket | What belongs | What does not |
| --- | --- | --- |
| **design-systems/** | Apple HIG, Material, Ant Design처럼 “시스템 규범” | 특정 제품 랜딩·브랜드 룩 |
| **case-studies/** | Stripe, Linear, Toss, Figma, GitHub, Notion, EBS, KOdata 등 **제품 UX** | 도구 사용법 튜토리얼(“Figma로 그리는 법”) |
| **ux-patterns/** | Search · Table · CRUD 등 JKO Pattern에 맞춘 분석·체크리스트 | 새 Pattern 발명·Foundation 변경 |

---

## Index

### ai/ — Decision Engine (design-time)

| Doc | Role |
| --- | --- |
| [ai/README.md](./ai/README.md) | Index · pipeline overview |
| [AI_DECISION_ENGINE.md](./ai/AI_DECISION_ENGINE.md) | Master · 8 questions · judgment order |
| [RULE_ENGINE.md](./ai/RULE_ENGINE.md) | IF/THEN · priority · Never · gates |
| [DECISION_TREE.md](./ai/DECISION_TREE.md) | Branching Q&A → Pattern/Surface |
| [PATTERN_SELECTOR.md](./ai/PATTERN_SELECTOR.md) | Goal/Task/Domain → pattern ids |
| [COMPONENT_SELECTOR.md](./ai/COMPONENT_SELECTOR.md) | Pattern → Kit components only |
| [SCREEN_COMPOSER.md](./ai/SCREEN_COMPOSER.md) | Recipe → Screen Compose · checklist |

Compose ≠ Generate. Types stub: `src/playground/ai-decision-engine.ts`.

### design-systems/

| Source | Learn (one line) | Doc |
| --- | --- | --- |
| [apple](./design-systems/apple/UX_ANALYSIS.md) | Hierarchy · type roles · space · motion restraint |
| [material](./design-systems/material/UX_ANALYSIS.md) | States · a11y · adaptive nav · responsive |
| [ant-design](./design-systems/ant-design/UX_ANALYSIS.md) | Enterprise table/form · admin density |

### case-studies/

| Source | Learn (one line) | Doc |
| --- | --- | --- |
| [stripe](./case-studies/stripe/UX_ANALYSIS.md) | Form/error clarity · dashboard → task |
| [linear](./case-studies/linear/UX_ANALYSIS.md) | Speed · dense list · keyboard |
| [toss](./case-studies/toss/UX_ANALYSIS.md) | Info hierarchy · single CTA · short flows |
| [figma](./case-studies/figma/UX_ANALYSIS.md) | Multiplayer IA · inspector · library ≈ Kit |
| [github](./case-studies/github/UX_ANALYSIS.md) | Dense data + nav · progressive disclosure |
| [notion](./case-studies/notion/UX_ANALYSIS.md) | Flexible blocks vs JKO Pattern-locked (contrast) |
| [ebs](./case-studies/ebs/UX_ANALYSIS.md) | Education portal · guided practice · comfort density |
| [kodata](./case-studies/kodata/UX_ANALYSIS.md) | Open-data admin/portal · API catalog · notice/FAQ |

### ux-patterns/

| Doc | Links to |
| --- | --- |
| [ux-patterns/README.md](./ux-patterns/README.md) | 20 Pattern index · philosophy → [`docs/05`](../docs/05_PATTERN_LIBRARY.md) |
| [RELATIONSHIPS.md](./ux-patterns/RELATIONSHIPS.md) | Pattern upstream/downstream · satellites · overlay graph |
| [recipes/](./ux-patterns/recipes/README.md) | Screen Recipes (Admin / SaaS / AI) → [`docs/06`](../docs/06_SCREEN_RECIPES.md) |
| `*/PATTERN.md` | Canonical Pattern 본문 (Search … AI Chat) |
| `*/UX_ANALYSIS.md` | 레거시 포인터 → `PATTERN.md` |

공식 매핑 요약: [`docs/12_REFERENCES.md`](../docs/12_REFERENCES.md)

---

## How to use

1. Read [`docs/README.md`](../docs/README.md) first (01–12).
2. Composing a screen? Open [`ai/AI_DECISION_ENGINE.md`](./ai/AI_DECISION_ENGINE.md) and walk judgment order.
3. Pick a leaf under design-systems / case-studies / ux-patterns when a decision is stuck.
4. Take **What JKO Can Learn** / **Anti Patterns** only.
5. Never copy Color · Typography · Radius · Logo · marketing layout into the Design Kit ([`docs/03_FOUNDATION_RULES.md`](../docs/03_FOUNDATION_RULES.md)).

## For agents

- **Before composing screens:** read [`ai/AI_DECISION_ENGINE.md`](./ai/AI_DECISION_ENGINE.md).
- Consult `knowledge/` design-systems · case-studies · ux-patterns for **inspiration analysis only** — never copy.
- Output still follows Thinking Steps + Output Rules (`.cursor/rules/jko-design-system.mdc`).
- Do not touch `orange3-workflow` unless explicitly asked.

Legacy path: [`references/README.md`](../references/README.md) → redirects here.
