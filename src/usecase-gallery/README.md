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
  contexts/                one file per area: the real kit area that holds an example (table.tsx, panel.tsx, ...)
  mock-data.tsx            the one place for sample content (rows, fields, viewer controls) the scenes show around an example
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
        usecase.ts         defineUsecase({ area, title, apps, summary, where, when, how, cases? })
        scenes/<case>.tsx  optional: one In context scene per case (see below)
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

When a use case sits elsewhere than the rest of its area (the Output header's scroll helpers, a close X in a popover's intro row), set `contextVariant` in its `usecase.ts` (for example `contextVariant: 'helpers'`) and add `contexts/<area-slug>-<variant>.tsx`. That use case then renders in the variant instead of the area's context; a missing variant file fails the catalog build.

### Several cases for one use case

When one use case has several In context scenes (the three dialogs of Button-001, the results strip and the error page of Button-016, Print enabled or disabled), do not stack them. List them in `usecase.ts` and put each scene in the use case folder; touch nothing else:

```ts
cases: [
  { id: 'reset', name: 'Reset confirm' },
  { id: 'accept', name: 'Accept licence' },
],
```

Each id is a file `scenes/<id>.tsx` with the same shape as a context (`{ children, host }`). With more than one case the preview shows a kit `RadioGroup` of the names above the scene (default: the first; the choice survives the Component | In context toggle and resets on another use case), renders only the chosen scene and shows its code. A scene that places `{children}` gets the example spliced in; one that writes its own controls (a disabled or alternative state) is shown as written. A use case with one case, or none, shows no radio group and uses the area context. A missing scene file fails the catalog build.

### Sample content

Scenes put sample content around the example (result rows, selects, viewer controls) so the button sits among realistic content. Values and the small `Mock...` scenery components live in `mock-data.tsx`, in hcs wording with placeholder values only. In the copied code each `<Mock... />` becomes a one-line `{/* sample ... */}` comment, so the snippet shows the component usage, not the rows. Text that is part of the pattern (a label, a count) is written inline.

### Where the app needs local CSS

The scenes follow the real hcs containers (pane header action group, table header cell `actions` slot, body toolbar, accordion field column, Dialog Popup + Title + Actions, popover View). Where the app uses local CSS (the header group's push to the end, a corner-pinned close X, the viewer overlay position, the rotated chevron) the scene uses `justifyContent` or a small inline style and the use case's `how` says so. The 3D canvas and the view cube cannot be built from kit parts: they are framed stand-ins with a short note. Pixel sizes come from tokens and are unverified against the app. No scene is modal or covers the page: Dialog and Popover scenes use `modal={false}` and `container={host}`, and the column menu and View options popups are static View cards.

Every area now has a context, a variant or scenes, so the dashed fallback frame only appears for a new area without one.

## Add an app

Add one entry to `apps.ts`: `{ name, label, url }` under a short key. Its `url` is where the badge links (a new tab, `rel="noopener noreferrer"`); the key becomes valid in `apps: [...]`.

## Add a component

Create `usecases/<component>/<component>.meta.ts` with `defineComponent({ id, title })`, then add use cases as above. `id` is the PascalCase prefix of its use case ids.

## Layout and type

Every pane (tree, preview, code, docs) is one `PaneCard` (`ui/pane-card.tsx`): a kit `Card` with no visible header, just a scrolling `Card.Content`, named for assistive tech by its `label` (`aria-label` on the region). Change card padding or border there and in the `.ug-card*` rules, never per pane. The centre column is two stacked cards, the preview (with its mode toggle, a kit `ToggleGroup`) above the code, whose Copy button sits top-right inside the code card, separated by a draggable `Panels` handle. One size for all text: hcs body, `sm` = 16/20 (weight, not size, separates headings from body). All text is the kit's `Type` (role, family, weight) or a kit part at `scale: 'sm'`; the stylesheet sets only the root size and line height (`.ug`: 16px, 1.35), as hcs does. The sizes follow the hcs typography (Inter 16/20 unless noted):

| Element | Type |
| --- | --- |
| tree component and area titles | `l3` semi-bold 16/20 |
| tree use case rows (id and name) | `l3` regular 16/20, selected row bold, primary text on a light primary tint |
| doc id and name | `l3` bold 16/20 |
| doc summary | `l3` muted 16/20 |
| Where / When / How labels | `l3` semi-bold 16/20 |
| doc body | `l3` 16/20 |
| code | `l3` mono (JetBrains Mono) regular 16/20 |
| badges, toggle labels, Copy | kit part at `sm`, 16/20 |
| fallback frame note | `l3` muted |

The doc pane's use case id and name use `Type color="primary"`; the Where / When / How labels use the default text color; the active toggle segment is a primary solid `Button`, the inactive one a neutral secondary text `Button`. Theme primary is only about 3.2:1 on the light surface, so `.ug-docs` (id and name) and `.ug-render__toggle` in `gallery.scss` resolve `--theme-primary` to `--p-palette-orange-600` (at least 4.7:1 as text, 5.2:1 under the white on-primary toggle text).

The docs card shows the use case id and title in one box, at the same size as the other doc text and set apart by bold weight (the id never wraps; a long title wraps below it), the summary, a row of app badges (no visible label), then Where / When / How as a definition list; those three fields are the whole doc format.

## Id rules

- A use case folder is named `<ComponentId>-<NNN>`: the `id` from the component's meta, a dash, and at least three digits (`Button-001`, `Button-012`).
- The prefix must match the `id` in the component's meta file, and ids are unique across the gallery. A violation throws at startup with the reason.
- Ids are never reused or renumbered once shared, because they appear in URLs. The one exception: the move to areas regrouped Button-001..014 into Button-001..016.

## Move it to another app

1. Copy this folder into the other app.
2. Install the peer dependencies: `react` and `react-dom` 19, and the AtomicAUI kit with its own dependencies (`@base-ui/react`, `react-resizable-panels` 4), plus `sass`. The build must be Vite (`import.meta.glob`, `?raw`).
3. Edit `apps.ts` for that app's registry. Edit `kit.ts` so its re-export points at that app's AtomicAUI package. It must provide `Button`, `Card`, `Chip`, `Collapsible`, `Dialog`, `IconButton`, `Panels`, `Popover`, `Table`, `ToggleGroup` and `Type`.
4. Make sure the host renders `AuiIdentityProvider` with `typeface="engineering"` and `typography="body"` and loads the AtomicAUI token stylesheet; the gallery uses its CSS variables and does not load tokens itself. Also load the icon font (see below).
5. Render `<UsecaseGallery title="..." />` full screen: it fills the viewport.

## Host requirements: fonts

The host declares Inter and JetBrains Mono and overrides `--p-font-inter` and `--p-font-jetbrains-mono` with fallbacks, as hcs does. This app self-hosts the two variable woff2 files in `public/fonts` and declares them in `src/fonts.scss` (together with `html { font-size: 16px }` and the Inter body); hcs itself also lists a CDN copy.

## Host requirements: icon font

Kit icons are Font Awesome glyphs. With brand `atomic` they resolve to **Font Awesome 7 Pro Duotone** (`--icongraphy-typeface-family`, classes `fa-duotone fa-*`), a licensed font the host must load; this folder neither bundles nor loads it.

The host app loads the shared Pro Web Font kit with one script tag in `index.html` (`https://kit.fontawesome.com/159db568f7.js`); the deploy origin must be permitted in the kit's settings, otherwise icons render blank.

The Copy button is text-labelled (no icon), so it never depended on the font.
