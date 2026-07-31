# Drawer vs Page

Source: `src/playground/navigation-rules.ts` (`DRAWER_VS_PAGE`)  
Related UX Rule: **#4 `detail-drawer`** — Detail은 새로운 페이지보다 Drawer를 우선 사용한다.  
Parent tree: [ux-decision-tree.md](./ux-decision-tree.md) · Overlay: [overlay-modal-drawer-sheet.md](./overlay-modal-drawer-sheet.md)

## Summary

수정·빠른 확인·목록 유지 → **Drawer**. 많은 정보·Wizard·생성 → **Page**.

Decision Tree branch: **데이터를 수정하는가?** → 목록 유지 **YES** = Drawer · **NO** = Page.

## When Drawer

- 수정 (+ 목록 유지)
- 빠른 확인 (상세 스캔 — list context kept)
- 목록 유지

## When Page

- 많은 정보
- Wizard
- 생성
- 수정이지만 목록을 유지하지 않을 때

## Do not contradict

| Intent | Outcome |
| --- | --- |
| 수정 + 목록 유지 | **Drawer** |
| 빠른 **확인** | **Drawer** |
| 빠른 **작업** (짧은 결정) | **Modal** — see Overlay / Decision Tree, not this page |
| 삭제 | **Confirm Dialog** — not Drawer alone |

## Apply

| Context | Rule |
| --- | --- |
| Detail | 상세·빠른 확인·수정 = Drawer (목록 유지). 풀페이지 Detail은 예외. |
| CRUD | 생성 → Page. 수정·빠른 확인 → Drawer. |
| Wizard | Wizard → Page. |
| 회원관리 | 상세·수정 = Drawer (목록 유지). 회원 생성 = Page. |
| Data Table | 행 「상세」는 Drawer로 연다. 전체 페이지로 이동하지 않는다. |

Live: `/principles#drawer-vs-page` · `/principles/decision-tree`
