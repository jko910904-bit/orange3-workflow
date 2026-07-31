# Modal vs Drawer vs Bottom Sheet

Source: `src/playground/decision-rules.ts` (`OVERLAY_RULES`)  
Related UX Rules: **#4 `detail-drawer`**, **#5 `delete-confirm`**  
Parent tree: [ux-decision-tree.md](./ux-decision-tree.md) · Drawer vs Page: [drawer-vs-page.md](./drawer-vs-page.md)

## Summary

짧은 결정·포커스 차단·**빠른 작업** → **Modal**. 수정·**빠른 확인**·목록 유지 → **Drawer**. 모바일 선택/필터/액션 → **Bottom Sheet**.

## Modal

- Confirm / Warning / Delete / Success 등 결정이 필요한 짧은 대화
- **빠른 작업** (Decision Tree: 빠른 작업인가? → YES → Modal)
- 포커스를 가두고 배경 맥락을 잠시 차단해야 할 때
- 삭제는 Confirm Dialog(Modal) — UX Rule #5

## Drawer

- 수정 (+ 목록 유지)
- 빠른 확인 (상세 스캔 — ≠ 빠른 작업)
- 목록 유지

See also [drawer-vs-page.md](./drawer-vs-page.md).

## Bottom Sheet

- 모바일에서 선택지·필터·짧은 액션 시트
- 엄지 영역 우선, 부분 높이 오버레이
- 데스크톱 Admin에서는 Drawer/Modal 우선 — Bottom Sheet는 반응형 대안

## Do not contradict

| Intent | Outcome |
| --- | --- |
| 수정 + 목록 유지 | **Drawer** |
| 빠른 **확인** | **Drawer** |
| 빠른 **작업** | **Modal** |
| 삭제 | **Confirm Dialog** |

## Apply

| Context | Rule |
| --- | --- |
| Dialog Pattern | Modal. Confirm·Warning·Delete·Success. Danger 확정 + 안전 액션 기본 포커스. |
| Detail Pattern | Drawer. 모바일에서는 풀스크린/Bottom Sheet 전환 가능. |
| Delete | 항상 Confirm Dialog(Modal). Drawer 안에서 바로 삭제하지 않는다. |
| Admin desktop | Drawer / Modal 우선. Bottom Sheet는 좁은 폭·모바일 대응용. |

Live: `/principles#overlay-rules` · `/principles/decision-tree`
