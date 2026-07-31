# Screens

**Screen = Pattern compose** — static combinations of registered Patterns only.

Do not invent Screens from scratch. Reuse Patterns (and Components) first.

## Examples

| Screen | Notes |
| --- | --- |
| 회원관리 | Search → Filter → Data → Pagination; Detail/Edit → Drawer; Create → Page |
| 상품관리 | Data Table + Filter + Detail |
| 공지 / FAQ | Portal patterns |
| Dashboard | KPI + summary |

Live: [`/screens`](http://localhost:3000/screens)  
Catalog: `src/playground/catalog.ts` (`SCREEN_DOCS`)

See [../UX_RULES.md](../UX_RULES.md) · [../patterns/README.md](../patterns/README.md)
