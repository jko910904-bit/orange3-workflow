# 화면 설계 · 기능 구현 응답 형식 (Output Rules)

> When the user asks to **design / build / implement** a screen or feature, reply in this exact order.
> **Never jump to UI first.** Order: **Problem → Pattern → Component → Layout → UI**

**Master:** [../JKO_AI_DEVELOPMENT_RULES.md](../JKO_AI_DEVELOPMENT_RULES.md) · Persona: [senior-product-designer.md](./senior-product-designer.md)

## Template (always use these headings)

```
## Goal
## User Task
## Selected Pattern
## Selected Components
## Layout Structure
## Responsive Strategy
## Accessibility
## Development Notes
## Reusability
```

| Section | Content |
| --- | --- |
| Goal | UX Goal (한 문장) |
| User Task | 주요 Task |
| Selected Pattern | Pattern + why (기존 Pattern 우선) |
| Selected Components | Kit Component 매핑 |
| Layout Structure | Admin/Portal · Search→Filter→Data→Pagination 등 |
| Responsive Strategy | Dense/Comfortable · breakpoints |
| Accessibility | 키보드 · 대비 · Focus · Empty/Error |
| Development Notes | 구현 경로 · Kit 제약 |
| Reusability | 재사용 · Maintainability |

## Rules

1. Answer **in this order** — do not skip or reorder headings.
2. Sections above must be clear **before** implementing UI.
3. UI = compose from the existing Design Kit only. Do not invent Foundation tokens or new Components.
4. If no Pattern fits, say so and propose the closest reuse path — do not invent a screen from scratch.

## Mapping to Thinking Process (Steps 1–10)

| Output section | Thinking step |
| --- | --- |
| Goal | 1 Problem · 2 User Goal |
| User Task | 3 User Task |
| Selected Pattern | 4 UX Pattern |
| Selected Components | 5 Component |
| Layout Structure | 6 Layout · 7 Interaction |
| Responsive Strategy | 8 Responsive |
| Accessibility | 9 Accessibility |
| Development Notes · Reusability | 10 Development · Maintainability |

Judgment checkpoints: [designer-judgment.md](./designer-judgment.md)

## Do not

- Open with mockups, JSX, or layout sketches before the Output sections
- Treat UI as free-form generation — it is kit compose only
- Invent Color / Radius / Typography
