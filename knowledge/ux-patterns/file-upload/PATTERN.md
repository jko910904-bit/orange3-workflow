# Overview

**File Upload**는 파일을 **선택·전송·검증·완료**하는 Task Pattern이다.  
진행률·오류·제한(용량/형식)을 Kit으로 compose하며, 업로드 ≠ 파일 보관소 전체([File Manager](../file-manager/PATTERN.md)).

Canonical: [`docs/05`](../../../docs/05_PATTERN_LIBRARY.md) · (Live: file flows often under `/patterns/file-manager` · CRUD 첨부)

# UX Goal

사용자가 올바른 파일을 **실패 없이** 올리고, 진행/실패를 이해한 뒤 폼·상세에 첨부 상태로 남긴다.

# User Problems

- 제한(용량·확장자)을 제출 후에야 안다
- 진행률 없이 화면이 멈춘 것처럼 보인다
- 다중 업로드 실패가 한 줄로만 뭉뚱그려진다
- Drag-drop만 있고 키보드/버튼 대안이 없다

# User Tasks

- 파일 선택 (picker / drag-drop)
- 업로드 · 진행 확인
- 실패 시 재시도 · 제거
- 메타(이름·크기) 확인 후 폼 제출

# When to Use

- CRUD 첨부 · 프로필 이미지 · 증빙 업로드
- Import 시작 단계 (CSV 등) — 이후 Wizard/Page로 이어질 수 있음

# When NOT to Use

- 이미 올라간 파일의 탐색·이동·권한 → File Manager
- 삭제 확인 없는 즉시 서버 파일 삭제 (Confirm 필요)
- 토큰/컴포넌트를 AI가 즉석 생성하며 “업로드 UI 발명”

# UX Flow

```
Trigger(버튼/드롭존)
→ 클라이언트 검증 (type/size)
→ 업로드 Progress
→ 성공: 목록/칩에 추가 + Notification
→ 실패: Error + Retry · 항목 단위 메시지
→ (폼) 저장 시 첨부 ID 포함
```

# Layout Structure

```
Label
[ Dropzone / Button “파일 선택” ]
[ File list: name · size · Progress/Status · Remove ]
Helper: 허용 형식 · 최대 용량
```

Drawer/Page 폼 섹션 안에 배치. Admin grid 컬럼 규칙 준수.

# Required Components

Button · Input[file] · Progress · List/Chip · Alert · Notification · (Remove → 필요 시 Confirm)

# Responsive Rules

- Dropzone 높이 과다 금지; 모바일은 버튼 우선
- 진행 목록 세로 스택

# Accessibility

- Dropzone은 키보드로 동일 동작 (파일 선택 버튼)
- Progress `aria-valuenow`
- 오류는 항목별 텍스트

# Best Practices

1. 제한을 **선택 전** Helper로 고지
2. 다중 파일은 항목 단위 상태
3. 업로드 중 폼 Submit 가드
4. 성공은 Notification · 치명 실패는 인라인 Error
5. Ant/Material 업로드 패턴을 Kit 경계 안에서 재해석

# Anti Patterns

- Form 안에 미니 File Manager 전체 복제
- Modal 안 Modal (바이러스 스캔 결과 등)
- Primary 3개 (선택·업로드·저장 모두 filled) — 저장만 Primary인 표면 유지
- 새 업로드 브랜드 컬러

# Examples

- CRUD 첨부: [`/patterns/crud`](/patterns/crud)
- 보관·이동: [`/patterns/file-manager`](/patterns/file-manager)
- Screen 예: 회원/상품 상세 Drawer 첨부 섹션

# Related Patterns

- [File Manager](../file-manager/PATTERN.md)
- [CRUD Form](../crud-form/PATTERN.md) · [Detail Drawer](../detail-drawer/PATTERN.md)
- [Loading](../loading/PATTERN.md) · [Error](../error/PATTERN.md) · [Notification](../notification/PATTERN.md)
- [Confirm Dialog](../confirm-dialog/PATTERN.md) — 첨부 삭제
- [Empty State](../empty-state/PATTERN.md) — 첨부 없음 CTA “파일 추가”
