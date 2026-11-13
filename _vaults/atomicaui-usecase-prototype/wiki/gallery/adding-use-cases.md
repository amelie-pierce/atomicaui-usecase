---
title: Adding use cases
description: How the self-contained usecase-gallery folder discovers use cases and how to add one.
date: 2026-11-13
---

# Adding use cases

Updated 2026-11-13: replaced the old single `registry.tsx` with the portable `src/usecase-gallery/` folder. Its own `README.md` is the how-to; this note holds the non-obvious facts.

- Discovery is `import.meta.glob` in `src/usecase-gallery/catalog/catalog.ts`; the rules and validation (id pattern, prefix match, duplicates) are in `src/usecase-gallery/catalog/build-catalog.ts`. A use case is a folder with `example.tsx` and `usecase.ts`; a component is `<component>.meta.ts`. No registry edit.
- Preview and code come from one file: `example.tsx` is rendered (lazy) and read with `?raw`; `src/usecase-gallery/catalog/snippet.ts` strips the kit import and the `Example` wrapper. It expects `return` to be the last statement of the component.
- `src/usecase-gallery/kit.ts` is the only file that imports the vendored kit (`src/vendor/atomic-aui`, read-only).
- Selection is the URL hash (`#Button-001`); unknown hash falls back to the first use case (`src/usecase-gallery/hooks/use-hash-selection.ts`).
- Layout: `Panels` (kit, wraps react-resizable-panels) above 840px, one stacked column below (`src/usecase-gallery/layout/layouts.tsx`, `usecase-gallery.tsx`).
- `vite.config.ts` enables `@vitejs/plugin-react`; without it JSX compiles with the classic transform and the page fails at runtime with "React is not defined" even though `npm run build` passes.
- Kit `Card` paints over bare children: put content in `Card.Body` / `Card.Content` (`src/usecase-gallery/ui/docs-pane.tsx`, `code-pane.tsx`), otherwise text is invisible.
- `Panels.Panel` styles land on RRP's nested inner div, which is a flex row by default; pane wrappers need `flex-direction: column` (`src/usecase-gallery/styles/gallery.scss`).
- The kit's `Icon` needs the FontAwesome web font, which this app does not load, so glyphs (e.g. the Collapsible chevron) render blank. No icon-only controls are used for that reason.
- Button props: only `aui` (`color`, `paint`, `scale`, `shape`), native `disabled`, and `Button.Icon` / `Button.Spinner` parts (`src/vendor/atomic-aui/lib/button/button.tsx`). There is no `loading` prop.
- All four panes share `PaneCard` (`src/usecase-gallery/ui/pane-card.tsx`, kit Card + Card.Header/Title/Action + Card.Content); typography is kit `Type` roles only, no font values in `gallery.scss`. `Card.Title` pins role `l3` by default.
