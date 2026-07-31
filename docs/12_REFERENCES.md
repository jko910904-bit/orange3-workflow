# 12 — References

## Purpose

외부 Design System · 제품 UX · JKO Pattern 분석을 **어디에 두고 어떻게 쓰는지** 고정합니다.  
**복사(copy)가 아니라 영감(inspired) → 운영 중심 JKO Pattern**입니다.

상세 본문은 repo root **`knowledge/`** 트리에 있습니다.  
이 문서는 인덱스 · stance · JKO 매핑입니다.

---

## Canonical tree

```
knowledge/
├── design-systems/   # Apple · Material · Ant Design (HIG / DS)
├── case-studies/     # Stripe · Linear · Toss · Figma · GitHub · Notion · EBS · KOdata
└── ux-patterns/      # Search · Table · CRUD … → docs/05
```

진입점: [`knowledge/README.md`](../knowledge/README.md)

Legacy stub: [`references/README.md`](../references/README.md) → `knowledge/`로 리다이렉트.

---

## Stance

| We take | We do not take |
| --- | --- |
| Hierarchy · 상태 · 접근성 · 밀도 · IA 의사결정 | 브랜드 비주얼 · 카피 · 컴포넌트 API 통째 복제 |
| 검증된 interaction (drawer, confirm, density) | 마케팅 랜딩을 Admin에 이식 |
| “시스템·Pattern으로 일관성” | “매 화면 새로 디자인” / Notion식 자유 블록 |

JKO 최적화 축: **운영 Admin/Portal · Compose · Pattern · 개발 생산성**

---

## design-systems/ → JKO

| Source | Take | JKO difference |
| --- | --- | --- |
| [Apple](../knowledge/design-systems/apple/UX_ANALYSIS.md) | Clarity · deference · motion restraint | Admin Dense · Search First · Foundation type만 |
| [Material](../knowledge/design-systems/material/UX_ANALYSIS.md) | States · a11y · adaptive nav | Token은 JKO Foundation · FAB≠추가 Primary |
| [Ant Design](../knowledge/design-systems/ant-design/UX_ANALYSIS.md) | Enterprise table/form density | Kit wrap + Pattern · Ant 테마 불이식 |

---

## case-studies/ → JKO

| Source | Take | JKO difference |
| --- | --- | --- |
| [Linear](../knowledge/case-studies/linear/UX_ANALYSIS.md) | Speed · dense · keyboard | Search/Filter 생략 금지 · Drawer first |
| [Stripe](../knowledge/case-studies/stripe/UX_ANALYSIS.md) | Form/error · KPI→task | Empty CTA Rule · Dashboard Recipe |
| [Toss](../knowledge/case-studies/toss/UX_ANALYSIS.md) | Info hierarchy · single CTA | Admin은 Dense 유지 · 브랜드 불이식 |
| [Figma](../knowledge/case-studies/figma/UX_ANALYSIS.md) | Library · inspect · publish | = Kit metaphor · detach=anti-pattern |
| [GitHub](../knowledge/case-studies/github/UX_ANALYSIS.md) | Dense list · progressive disclosure | Admin Stack · 삼중 Search 금지 |
| [Notion](../knowledge/case-studies/notion/UX_ANALYSIS.md) | **Contrast** — flexible blocks | JKO = Pattern-locked |
| [EBS](../knowledge/case-studies/ebs/UX_ANALYSIS.md) | Guided education Portal | Comfortable + Recipe · 캐릭터 불이식 |
| [KOdata](../knowledge/case-studies/kodata/UX_ANALYSIS.md) | Admin↔Portal · API catalog | Shared Kit · split shells |

---

## ux-patterns/

JKO-facing notes: [`knowledge/ux-patterns/README.md`](../knowledge/ux-patterns/README.md)  
Source of truth for Pattern definitions: [`05_PATTERN_LIBRARY.md`](./05_PATTERN_LIBRARY.md)

---

## Mapping to JKO artifacts

| External idea | JKO home |
| --- | --- |
| Scaffold / App layout | [08_LAYOUT_RULES](./08_LAYOUT_RULES.md) |
| States / a11y | [09_ACCESSIBILITY](./09_ACCESSIBILITY.md) |
| Tables / forms / overlays | [05](./05_PATTERN_LIBRARY.md) · [07](./07_UX_DECISION_TREE.md) |
| Design tokens | [03_FOUNDATION_RULES](./03_FOUNDATION_RULES.md) |
| “Don’t invent” | [11_ANTI_PATTERNS](./11_ANTI_PATTERNS.md) |

---

## Examples

**Inspired** — Material table density → JKO `≥20 → Table` Decision  
**Not copied** — Material 3 tonal palette → CSS 변수 이식  

**Inspired** — Stripe dashboard narrative → KPI→Charts→Activity Recipe  
**Not copied** — Stripe 마케팅 일러스트·그라데이션  

**Inspired** — Notion template gallery → limited Screen Recipes  
**Not copied** — Empty page + slash blocks as Admin compose  

---

## Related docs

- [01_PRODUCT_PHILOSOPHY](./01_PRODUCT_PHILOSOPHY.md)
- [02_UX_PRINCIPLES](./02_UX_PRINCIPLES.md)
- [05_PATTERN_LIBRARY](./05_PATTERN_LIBRARY.md)
- [07_UX_DECISION_TREE](./07_UX_DECISION_TREE.md)
- [09_ACCESSIBILITY](./09_ACCESSIBILITY.md)
- Master: [`JKO_AI_DEVELOPMENT_RULES.md`](./JKO_AI_DEVELOPMENT_RULES.md)
- Tree: [`knowledge/README.md`](../knowledge/README.md)
