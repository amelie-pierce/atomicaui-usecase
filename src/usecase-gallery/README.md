# usecase-gallery

A read-only gallery of component use cases: a tree of components, the areas where each is used (Dialog, Walkthrough, Table, ...) and use case ids (`Button-001`), the rendered example, the code to copy, and where/when/how to use it, plus which apps use it. Selection lives in the URL hash (`#Button-001`).

The folder is self-contained. It imports only `react`, `react-dom` and its own `kit.ts`.

## Structure

```
usecase-gallery/
  index.ts                 public API: <UsecaseGallery />, defineUsecase, defineComponent
  kit.ts                   the ONLY file that imports the AtomicAUI kit
  apps.ts                  the app registry: key, name, label, url
  types.ts, define.ts      shared types and the define helpers
  contexts/                one file per area: the real kit area that holds an example (dialog.tsx, table.tsx, ...)
  catalog/                 discovery (import.meta.glob), validation, snippet extraction
  hooks/                   hash selection, copy-to-clipboard, media query
  layout/                  gallery shell and the resizable / stacked layouts
  ui/                      pane-card (the shared Card) and the tree, render, code and docs panes
  styles/gallery.scss      layout and chrome, tokens only
  usecases/
    <component>/
      <component>.meta.ts  defineComponent({ id: 'Button', title: 'Button' })
      <UseCaseId>/         e.g. Button-001
        example.tsx        the rendered example AND the source shown as code
        usecase.ts         defineUsecase({ area, title, apps, summary, where, when, how })
```

Everything under `usecases/` is discovered automatically. The tree and the docs load up front; each example and its source load on demand, so the catalog scales to many components and use cases.

## Add a use case

Create `usecases/<component>/<Component>-<NNN>/` with two files and nothing else.

`example.tsx` has a default export that returns the example with fixed props:

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return <Button aui={{ color: 'primary', paint: 'solid' }}>Save changes</Button>;
}
```

The preview renders this component, and the code pane shows the JSX it returns (the kit import and the wrapper are stripped), read from the same file with Vite `?raw`, so the two cannot drift. Keep the `return` the last statement of the component. Do not add controls or state: the page is read-only.

`usecase.ts`:

```ts
import { defineUsecase } from '../../../define';

export default defineUsecase({ area, title, apps: ['hcs'], summary, where, when, how });
```

`area` is the place in a product where the component is used (`'Dialog'`, `'Walkthrough'`, `'Table'`). Use cases of one component with the same `area` share a tree group; a new area is just a new string, and areas are listed in the order of their lowest use case id. A use case is one real situation, so controls that appear together there belong in one example (the Cancel and Confirm of a dialog footer are one use case; Previous and Next of a walkthrough are one, End is another).

`apps` lists the keys of the apps that use the pattern; the docs pane shows one badge per key, in an unlabelled row (the list carries an `aria-label` of "Used in").

No registry or shell edit is needed.

## Add an in-context view

The preview has a Component | In context toggle (default Component). In context renders the example inside the real area that holds it, built only from kit parts, static and read-only; the code pane shows the context's JSX with the example inside it.

To add a context for an area, create one file, `contexts/<area-slug>.tsx`, and touch nothing else. The slug is the `area` lowercased with dashes (`Body text` -> `body-text.tsx`). It default-exports a component that places `{children}` (the example) on a line of its own inside the area's JSX:

```tsx
import type { ContextProps } from '../types';
import { Card } from '../kit';

export default function PanelContext({ children }: ContextProps) {
  return (
    <Card.Footer>
      {children}
    </Card.Footer>
  );
}
```

Use only components exported by `kit.ts` (add an export there if the kit has the part). Portaled parts (a Dialog or Popover popup) take `container={host}`, the preview stage, and skip the backdrop and viewport, so they render open inside the card rather than as an overlay. The code pane strips these preview-only props (`open`, `modal={false}`, `initialFocus={false}`, `container={host}`, `anchor={host}`) from the copyable snippet (`PREVIEW_ONLY_PROPS` in `catalog/snippet.ts`). One context serves every use case of its area, so the example goes where that area's controls most often sit.

An area with no context file shows its example in a plain dashed frame with a short note. Currently without a context: Toolbar, Form, Body text, Viewer, Error screen (no kit component stands for them).

## Add an app

Add one entry to `apps.ts`: `{ name, label, url }` under a short key. Its `url` is where the badge links (a new tab, `rel="noopener noreferrer"`); the key becomes valid in `apps: [...]`.

## Add a component

Create `usecases/<component>/<component>.meta.ts` with `defineComponent({ id, title })`, then add use cases as above. `id` is the PascalCase prefix of its use case ids.

## Layout and type

Every pane (tree, preview, code, docs) is one `PaneCard` (`ui/pane-card.tsx`): a kit `Card` with no visible header, just a scrolling `Card.Content`, named for assistive tech by its `label` (`aria-label` on the region). Change card padding or border there and in the `.ug-card*` rules, never per pane. The centre column is two stacked cards, the preview (with its mode toggle, a kit `ToggleGroup`) above the code, whose Copy button sits top-right inside the code card, separated by a draggable `Panels` handle. All text is the kit's `Type` (role, family, weight); the stylesheet sets no font values. The doc pane's use case id, name and Where / When / How headings use `Type color="primary"`; the active toggle segment is a primary solid `Button`, the inactive one a neutral secondary text `Button`. Theme primary is only about 3.2:1 on the light surface, so `.ug-docs` and `.ug-render__toggle` in `gallery.scss` resolve `--theme-primary` to `--p-palette-orange-600` (at least 4.7:1 as text, 5.2:1 under the white on-primary toggle text).

The docs card shows the use case id and title in one box, at the same size as the other doc text and set apart by bold weight (the id never wraps; a long title wraps below it), the summary, a row of app badges (no visible label), then Where / When / How as a definition list; those three fields are the whole doc format.

## Id rules

- A use case folder is named `<ComponentId>-<NNN>`: the `id` from the component's meta, a dash, and at least three digits (`Button-001`, `Button-012`).
- The prefix must match the `id` in the component's meta file, and ids are unique across the gallery. A violation throws at startup with the reason.
- Ids are never reused or renumbered once shared, because they appear in URLs. The one exception: the move to areas regrouped Button-001..014 into Button-001..016.

## Move it to another app

1. Copy this folder into the other app.
2. Install the peer dependencies: `react` and `react-dom` 19, and the AtomicAUI kit with its own dependencies (`@base-ui/react`, `react-resizable-panels` 4), plus `sass`. The build must be Vite (`import.meta.glob`, `?raw`).
3. Edit `apps.ts` for that app's registry. Edit `kit.ts` so its re-export points at that app's AtomicAUI package. It must provide `Button`, `Card`, `Chip`, `Collapsible`, `Dialog`, `IconButton`, `Panels`, `Popover`, `Table`, `ToggleGroup` and `Type`.
4. Make sure the host renders `AuiIdentityProvider` and loads the AtomicAUI token stylesheet; the gallery uses its CSS variables and does not load tokens itself. Also load the icon font (see below).
5. Render `<UsecaseGallery title="..." />` full screen: it fills the viewport.

## Host requirements: icon font

Kit icons are Font Awesome glyphs. With brand `atomic` they resolve to **Font Awesome 7 Pro Duotone** (`--icongraphy-typeface-family`, classes `fa-duotone fa-*`), a licensed font the host must load; this folder neither bundles nor loads it.

The host app loads the shared Pro Web Font kit with one script tag in `index.html` (`https://kit.fontawesome.com/159db568f7.js`); the deploy origin must be permitted in the kit's settings, otherwise icons render blank.

The Copy button is text-labelled (no icon), so it never depended on the font.
