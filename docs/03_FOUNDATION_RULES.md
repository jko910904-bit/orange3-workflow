# 03 — Foundation Rules

## Purpose

Foundation 토큰은 **Compose / AI가 발명할 수 없는 불변 계층**입니다.  
화면마다 Color·Radius·Typography를 새로 만들지 않습니다.

Code: `src/design-system/tokens/` · Layout: `src/playground/layout-admin.ts`  
Live: `/foundations`

---

## Immutable rule

| Actor | May | Must not |
| --- | --- | --- |
| **Compose / AI / Screen** | 기존 토큰만 참조 | 새 Color · Typography · Radius · Shadow · Spacing scale |
| **Foundation owner (Admin)** | 토큰 추가·변경 (의도적 릴리스) | Playground 실험으로 Kit 오염 |

변경 전파 방향만 허용:

```
Foundation → Components → Patterns → Screens
```

---

## Token categories

| Category | Role | Compose rule |
| --- | --- | --- |
| **Color** | Brand · Neutral · Semantic (success/warn/danger) | hex/rgb 하드코딩 금지 · semantic만 |
| **Typography** | Scale · Weight · Line-height | 새 font-size/weight 스케일 금지 |
| **Radius** | 모서리 토큰 | `border-radius: 13px` 같은 일회성 값 금지 |
| **Spacing** | 4/8 기반 간격 | magic margin 금지 |
| **Shadow** | Elevation | 새 multi-layer glow 금지 |
| **Grid** | Admin 12-col · Portal centered | 아래 Admin frame 준수 |
| **Motion** | Duration · Easing | 장식용 과도한 motion 금지 |
| **Icons** | Kit icon set | 의미 없는 이모지·미등록 아이콘 남발 금지 |

---

## Admin layout tokens (canonical)

```
Admin · 12 Grid · Desktop 1440 · Sidebar 240 · Content Fluid
```

| Token / var | Value | Meaning |
| --- | --- | --- |
| `--admin-canvas` | `1440px` | Desktop max frame |
| `--admin-sidebar` | `240px` | Fixed LNB |
| `--admin-columns` | `12` | Content area columns |
| `--admin-content` | `minmax(0, 1fr)` | Fluid content track |

Shell: `240px | fluid`  
Content: `repeat(12, minmax(0, 1fr))`

Density: Admin = **Dense**, Portal = **Comfortable** (DensityProvider).

---

## Never invent tokens

Never list와 동일 계열:

- 새로운 Color 생성
- 새로운 Radius 생성
- 새로운 Typography 생성
- (확장) 새로운 Shadow / Spacing step 임의 추가

Always: **기존 Design Kit / Foundation 사용**

---

## Examples

**맞음**

```css
color: var(--color-text-primary);
border-radius: var(--radius-md);
padding: var(--space-4);
```

**틀림**

```css
color: #7C3AED;           /* 새 brand purple */
border-radius: 14px;      /* 미등록 radius */
font-size: 15.5px;        /* 미등록 type */
box-shadow: 0 0 24px …;   /* glow invent */
```

---

## Related docs

- [01_PRODUCT_PHILOSOPHY](./01_PRODUCT_PHILOSOPHY.md) — Design Structure
- [04_COMPONENT_RULES](./04_COMPONENT_RULES.md) — Components on Foundation
- [08_LAYOUT_RULES](./08_LAYOUT_RULES.md) — Admin / Portal layout
- [09_ACCESSIBILITY](./09_ACCESSIBILITY.md) — Contrast via tokens
- [11_ANTI_PATTERNS](./11_ANTI_PATTERNS.md)
- Detail: `docs/foundation/README.md`
