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
- The kit's `Icon` needs a Font Awesome web font; the kit resolves to FA 7 Pro Duotone (licensed, not installed). The shared Pro Web Font kit loads via one script tag in `index.html`; its deploy origin must be permitted. The tree chevron is the kit's own.
- Button props: only `aui` (`color`, `paint`, `scale`, `shape`), native `disabled`, and `Button.Icon` / `Button.Spinner` parts (`src/vendor/atomic-aui/lib/button/button.tsx`). There is no `loading` prop.
- All four panes share `PaneCard` (`src/usecase-gallery/ui/pane-card.tsx`, kit Card + Card.Content, no visible header; regions are named by `aria-label`, the tree keeps a visually hidden `h1`, and the Copy button lives in the code card content); typography is kit `Type` roles only, no font values in `gallery.scss`.
- Tree disclosure: `TreePane` controls each component and area `Collapsible` (`open` state; choosing a use case reopens its component and area; closing never changes the hash). Arrow keys move over toggles and links. The selected link has no accent bar: filled `--theme-raised` plus bold `Type`. The docs header is one `h2` with the id and title inline (see Area badges below).
- Button use cases mirror the real hcs app (hcs commit `bb0f21f1`) and were regrouped by area on 2026-11-15 (ids changed; 014 -> 016 use cases). Old -> new: 001+002->001 (Dialog footer), 003->002, 004->004 (Previous/Next) and 005 (End), 005 and 006's Reset filters->007, 006's Try again->016, 007->013, 008->014, 009->010, 010->008, 011->011/012/003, 012->009, 013->015, 014->006; each `where` cites its hcs ids. Brand atomic naming trap: `secondary` is black, `surface-alt` is gray, `primary` is orange. Icon-button cases need `IconButton`, which `src/usecase-gallery/kit.ts` re-exports.
- Button icons mirror hcs (updated 2026-11-14): glyph names only, no `layer`/`weight`/`family` props (the provider default is classic duotone) and no per-icon colour; the host button's profile sets the size unless the real site pins one (many cases keep `aui` scale `sm`). Text-only roles (001, 014, 016) get no glyph; 007 shows Print Output with `print` and View options without. 008 shows the closed `angle-right`; the app rotates it 90 degrees through CSS when `aria-expanded` is true.

- Area badges: `src/usecase-gallery/apps.ts` is the one app registry (key, name, label, url); a use case lists keys in `apps`. The `hcs` url is provisional (the repo, until the web app has an address). Badges are kit `Chip` inside a `target="_blank" rel="noopener noreferrer"` link. The docs header puts id and name in one inline-flowing `h2` (the id never wraps).
- Headless check: `chrome-devtools-axi` could not launch its own Chrome here; start puppeteer's Chrome with `--headless=new --no-sandbox --remote-debugging-port=<p>` (see `~/.cache/chrome-libs/axi-env.sh`) and point `CHROME_DEVTOOLS_AXI_BROWSER_URL` at it, with your own session and port.
