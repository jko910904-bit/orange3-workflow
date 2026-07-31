# Overview

JKO **List** Pattern — 소량 스캔(대략 &lt;20). Card/List row로 조회.

Canonical (밀도 ≥20 승격): [`../data-table/PATTERN.md`](../data-table/PATTERN.md) · satellite [`docs/patterns/list.md`](../../../docs/patterns/list.md) · [`docs/07`](../../../docs/07_UX_DECISION_TREE.md)

> List는 20개 Pattern 확장 목록 밖 보조 메모입니다. 조회 Task의 gold standard는 Data Table `PATTERN.md`입니다.

# Design Philosophy

- 적은 수에서는 Table chrome이 방해 → List/Card.
- 수가 늘면 Data Table로 **같은 Task**를 승격 (Pattern 교체, 발명 아님).

# UX Principles

- Search First 유지 가능; Filter는 필요 시.
- 항목 클릭 → Detail Drawer/Page 동일 Decision Tree.

# Information Architecture

- 제목 · 메타 · 상태 3단 계층 (Toss/Apple hierarchy).

# Navigation

- “더보기”/pagination은 데이터 성장에 대비해 Table 전환 기준과 함께 문서화.

# Layout

- Portal Comfortable에서 카드 허용; Admin은 과한 그림자·콜라주 금지 ([`08`](../../../docs/08_LAYOUT_RULES.md)).

# Components

- Card/List item · Badge · Empty — Kit.

# Patterns

- Notice list · FAQ index · 도구 카탈로그(EBS/KOdata) 후보.
- DATA_DENSITY 분기 상대 = Data Table.

# Interaction

- Hover/focus 행 전체 클릭 영역; 중첩 링크 주의.

# Accessibility

- 리스트 `ul`/`role=list` · 각 항목 접근 이름.

# Best Practices

1. 20 근처에서 Table 전환을 제품 규칙으로 고정.
2. Empty CTA 필수.

# Anti Patterns

- 수백 행 Card 무한 스크롤을 “현대적”이라 유지.
- 카드마다 Primary 버튼.

# What JKO Can Learn

- Density decision tree가 List의 존재 이유다.

# Summary

List는 소량 조회용. 성장하면 Table Stack으로 옮겨 일관성을 지킨다.
