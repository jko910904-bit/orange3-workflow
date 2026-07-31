# Button variants

Source: `src/playground/decision-rules.ts` (`BUTTON_RULES`)  
Related UX Rule: **#3 `single-primary`** — Primary Button은 화면당 하나만 존재한다.

## Summary

화면당 Primary 1개. Primary = 핵심 진행(조회·저장·다음·확인). Secondary = 보조(취소·초기화·닫기). Danger = 파괴적(삭제).

## Variants

### Primary

- 화면의 핵심 다음 행동 1개 (조회, 저장, 다음, 확인의 긍정 진행)
- Sticky Footer 저장, Search의 검색/조회 버튼
- 화면당 Primary는 원칙적으로 1개

### Secondary

- 보조 행동 (취소, 초기화, 닫기, 더보기, 내보내기 등)
- Primary와 함께 있을 때 시각적으로 경쟁하지 않음

### Danger

- 파괴적·되돌리기 어려운 행동 (삭제, 해지, 영구 제거)
- Confirm Dialog의 삭제 확정 버튼

### Ghost / Tertiary (선택)

- Ghost: 덜 강조된 보조 액션, 툴바·선택 해제 등
- Tertiary: 테이블 행 액션·아웃라인 보조 (선택)
- 행 단위 액션은 Ghost/Tertiary를 우선하고 Primary와 경쟁시키지 않는다.

## Apply

| Surface | Mapping |
| --- | --- |
| 회원관리 | Primary = 조회·저장만. Danger = 삭제. Secondary = 취소·초기화·닫기. |
| Data Table | Primary = 조회만. Danger = 삭제(Confirm). Secondary = 초기화. 내보내기 = Tertiary/Secondary. |
| Sticky Footer | Primary = 저장 하나. 취소는 Secondary. 삭제는 Danger(+ Confirm Dialog). |

Live: `/principles#button-rules` · `/components/button`
