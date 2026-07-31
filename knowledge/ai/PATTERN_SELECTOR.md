# Pattern Selector

> Goal · Task · Domain → **pattern ids** (Kit Pattern Library만).  
> Master: [`AI_DECISION_ENGINE.md`](./AI_DECISION_ENGINE.md) · Bodies: [`knowledge/ux-patterns/*/PATTERN.md`](../ux-patterns/README.md)

Judgment order: Problem → User Goal → Task → **Pattern** → Recipe → Component → Layout → Validation → Result

답하는 질문: **Q2 — 어떤 UX Pattern을 선택해야 하는가?**

---

## Inputs

| Input | Required | Notes |
| --- | --- | --- |
| `userGoal` | YES | Q1 Outcome 한 문장 |
| `userTask` | YES | 조회 / 수정 / 삭제 / 생성 / 현황 / 온보딩 … |
| `domain` | YES | `admin` \| `saas` \| `ai` |
| `treeOutcomes` | YES | [`DECISION_TREE`](./DECISION_TREE.md) path |
| `facts` | optional | 건수≥20 · 목록유지 · 단계 · 관리자 등 |
| `constraints` | optional | Never hits from Rule Engine |

---

## Outputs

```ts
{
  patternIds: string[];       // ordered chain (upstream → downstream)
  overlays: ("drawer" | "modal" | "confirm")[];
  confidence: "high" | "medium" | "low";
  fallbacks: string[];        // next candidates if When mismatch
  rationale: string;          // 한 줄 — Task 기준
  refs: string[];             // PATTERN.md paths
}
```

`patternIds` 순서는 [`RELATIONSHIPS.md`](../ux-patterns/RELATIONSHIPS.md)를 위반하면 안 된다 (예: Filter before Search 금지).

---

## Selection algorithm

```
1. Start from treeOutcomes path (ordered)
2. Apply Rule Engine THEN pattern actions (higher priority first)
3. For each candidate id → open knowledge/ux-patterns/<id>/PATTERN.md
4. Verify When / Anti against userGoal · userTask · facts
5. Attach satellites: loading · empty-state · error · notification as needed
6. Attach overlays from surface rules (drawer / modal / confirm)
7. Score confidence; if low → fallbacks + 재질문
8. Hand off ordered patternIds to Screen Composer (Recipe match)
```

---

## Task → Pattern seeds

| User Task | Seed chain | Typical domain |
| --- | --- | --- |
| 목록 조회 | `search` → `filter` → `data-table` | admin |
| 행 상세 / 짧은 수정 | … → `detail-drawer` | admin / saas |
| 삭제 / Bulk 삭제 | … → `confirm-dialog` | all |
| 생성 (긴 폼) | `crud-form` (Page) | admin / saas |
| 현황 | `dashboard` (+ `analytics`) | admin / saas |
| 설정 · 권한 | `settings` → `permission` → `confirm-dialog` | saas / admin |
| 파일 | `file-manager` · `file-upload` | admin |
| 일정 | `calendar` → `detail-drawer` / modal | saas |
| 보드 | `kanban` → `detail-drawer` | saas |
| 이력 | `timeline` | saas / ai |
| AI 대화 · Apply | `ai-chat` → `confirm-dialog` · `notification` | ai |

위성 규칙: 데이터 영역이 있으면 `loading`(Skeleton) · 0건이면 `empty-state`(CTA) · 실패면 `error`(Retry).

---

## Pattern id inventory (canonical folders)

| id | Folder |
| --- | --- |
| search | [`search/PATTERN.md`](../ux-patterns/search/PATTERN.md) |
| filter | [`filter/PATTERN.md`](../ux-patterns/filter/PATTERN.md) |
| data-table | [`data-table/PATTERN.md`](../ux-patterns/data-table/PATTERN.md) |
| detail-drawer | [`detail-drawer/PATTERN.md`](../ux-patterns/detail-drawer/PATTERN.md) |
| confirm-dialog | [`confirm-dialog/PATTERN.md`](../ux-patterns/confirm-dialog/PATTERN.md) |
| crud-form | [`crud-form/PATTERN.md`](../ux-patterns/crud-form/PATTERN.md) |
| dashboard | [`dashboard/PATTERN.md`](../ux-patterns/dashboard/PATTERN.md) |
| analytics | [`analytics/PATTERN.md`](../ux-patterns/analytics/PATTERN.md) |
| empty-state | [`empty-state/PATTERN.md`](../ux-patterns/empty-state/PATTERN.md) |
| loading | [`loading/PATTERN.md`](../ux-patterns/loading/PATTERN.md) |
| error | [`error/PATTERN.md`](../ux-patterns/error/PATTERN.md) |
| notification | [`notification/PATTERN.md`](../ux-patterns/notification/PATTERN.md) |
| settings | [`settings/PATTERN.md`](../ux-patterns/settings/PATTERN.md) |
| permission | [`permission/PATTERN.md`](../ux-patterns/permission/PATTERN.md) |
| file-manager | [`file-manager/PATTERN.md`](../ux-patterns/file-manager/PATTERN.md) |
| file-upload | [`file-upload/PATTERN.md`](../ux-patterns/file-upload/PATTERN.md) |
| calendar | [`calendar/PATTERN.md`](../ux-patterns/calendar/PATTERN.md) |
| kanban | [`kanban/PATTERN.md`](../ux-patterns/kanban/PATTERN.md) |
| timeline | [`timeline/PATTERN.md`](../ux-patterns/timeline/PATTERN.md) |
| ai-chat | [`ai-chat/PATTERN.md`](../ux-patterns/ai-chat/PATTERN.md) |

새 Pattern id는 이 Selector에서 **발명하지 않는다**. Gap이면 [`docs/05`](../../docs/05_PATTERN_LIBRARY.md) 절차.

---

## Confidence

| Level | When | Action |
| --- | --- | --- |
| **high** | Tree YES 명확 · PATTERN When 일치 · Rules 무충돌 | Recipe 매칭 진행 |
| **medium** | Task 복합 · Overlay 애매 | Rules로 surface 재확정 · fallbacks 기록 |
| **low** | When 불일치 · 여러 Pattern 경쟁 | Goal/Task 재질문 · fallbacks만 제시 · Result 금지 |

### Fallbacks (examples)

| Primary | Fallback |
| --- | --- |
| `data-table` | `empty-state` only (0건) · Card list if <20 (`R-CARD-LT-20`) |
| `detail-drawer` | `crud-form` Page (목록 미유지 · 긴 수정) |
| `modal` quick action | `detail-drawer` if 실체는 “빠른 확인” |
| `dashboard` | `analytics` + table drill |

---

## Forbidden

- Pattern 없이 Component/Screen으로 점프
- RELATIONSHIPS 역순 chain (Filter → Search 등)
- knowledge 외부 DS에서 Pattern “복사”
- UI Generate용 ad-hoc pattern 이름

---

## Hand-off

```
patternIds (ordered) + overlays + confidence
        → SCREEN_COMPOSER (Q4/Q5 Recipe)
        → COMPONENT_SELECTOR (Q3)
```

Index: [`docs/05_PATTERN_LIBRARY.md`](../../docs/05_PATTERN_LIBRARY.md) · [`ux-patterns/README.md`](../ux-patterns/README.md)
