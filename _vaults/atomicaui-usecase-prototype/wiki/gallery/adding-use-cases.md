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
- Kit `Card` paints over bare children: put content in `Card.Body` / `Card.Content` (`src/usecase-gallery/ui/pane-card.tsx`), otherwise text is invisible.
- `Panels.Panel` styles land on RRP's nested inner div, which is a flex row by default; pane wrappers need `flex-direction: column` (`src/usecase-gallery/styles/gallery.scss`).
- The kit's `Icon` needs the FontAwesome web font, which this app does not load, so glyphs render blank; the kit resolves to FA 7 Pro Duotone (licensed, not installed). Button use cases with icons (including `IconButton`) therefore preview blank, which is expected; the tree's component toggle draws a stopgap CSS chevron that hides once an FA face loads (`.ug-tree__chevron`, `useKitIconFont`).
- Button props: only `aui` (`color`, `paint`, `scale`, `shape`), native `disabled`, and `Button.Icon` / `Button.Spinner` parts (`src/vendor/atomic-aui/lib/button/button.tsx`). There is no `loading` prop.
- All four panes share `PaneCard` (`src/usecase-gallery/ui/pane-card.tsx`, kit Card + Card.Content, no visible header; regions are named by `aria-label`, the tree keeps a visually hidden `h1`, and the Copy button lives in the code card content); typography is kit `Type` roles only, no font values in `gallery.scss`.
- Tree disclosure: `TreePane` controls each `Collapsible` (`open` state; choosing a use case reopens its component; closing never changes the hash). Arrow keys move over toggles and links. The selected link has no accent bar: filled `--theme-raised` plus bold `Type`. The docs header shows the id as plain bold `h4` text, styled like the title below it.
- Button use cases mirror the real hcs app (hcs commit `bb0f21f1`). Gallery id -> hcs id: 001->001, 002->002, 003->016, 004->003, 005->004, 006->005/007, 007->006, 008->008, 009->009, 010->010, 011->011/012/013, 012->014, 013->015, 014->017; each `where` cites its hcs id. Brand atomic naming trap: `secondary` is black, `surface-alt` is gray, `primary` is orange. Icon-button cases need `IconButton`, which `src/usecase-gallery/kit.ts` re-exports.
