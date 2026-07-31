# CRUD Pattern

Goal: **등록 및 수정**.

## Components

Form · Validation · Submit · Cancel

## Navigation

- **생성** → Page
- **수정** → Drawer (목록 유지)
- Drawer context: **Sticky Footer** for Submit (Primary) + Cancel (Secondary)

## Compose notes

- Form sections (multi-card / multi-block)
- Validation message stub on invalid fields
- Submit = Primary (one); Cancel = Secondary
- Dangerous changes → Confirm Dialog

Live: `/patterns/crud` · code: `src/design-system/patterns/Form.tsx` · `composePreview: Form`

See [drawer-vs-page.md](../principles/drawer-vs-page.md) · [button-variants.md](../principles/button-variants.md) · [README.md](./README.md)
