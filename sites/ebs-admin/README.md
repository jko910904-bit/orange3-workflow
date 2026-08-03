# AI 실습 도구 관리 포털 — Dashboard (standalone)

IA aligned with `ebs-admin-dashboard.html`. Visuals use **Design Kit Foundation** tokens (not source purple).

## Goal
AI 실습도구 서비스 운영 현황을 한눈에 확인한다.

## User Task
현황 확인 (KPI) · 추세/이용시간 스캔 · 위젯·템플릿 순위 · 개발자 도구 상태

## Selected Pattern
Dashboard + Analytics widgets  
`KPI → Charts (세션 추이 · 히트맵) → Stats (위젯 · 템플릿 · 개발자 도구)`

## Information Architecture (source-matched)

```
Header: EBS | AI 실습 도구 관리 포털
        · AI 실습 도구 바로가기 (Primary)
        · 알림 · 김교육(admin) · 로그아웃

LNB MENU
  · 대시보드 (current)
  · 위젯 관리
  · 서비스 설정
  · 운영 모니터링

Main
  Page: 대시보드 + 기간(오늘/7일/30일) + 새로고침
  1. KPI×5 — 세션 수 · 최대 동시접속 · 평균 사용시간 · 종료 세션 · 위젯 실행 수
  2. Analytics — 세션 추이 | 이용 시간 분석(히트맵)
  3. Stats — 위젯 사용 현황 | 워크플로우 템플릿 | 개발자 도구
```

## Run (isolated from Playground :3000)

```bash
npx --yes serve sites/ebs-admin -l 4173 --no-clipboard
# http://127.0.0.1:4173/
```
