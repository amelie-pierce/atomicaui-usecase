# usecase-gallery

A read-only gallery of component use cases: a tree of components, the UI types of each (Button: Single button, Button group, Icon button), the use cases of a type, each one business action (`Download CSV button`), with its id (`Button-002`), its look, the rendered example, the code to copy, and where/when/how to use it, plus which apps use it. The pages live in the URL hash: `#/` the components grid (a card per component with a live render of its first use case), `#/Button` a component page (breadcrumb, a section per UI type, a grid of use case cards with id, name and live render), `#Button-002` a use case (Component and In context preview, Document and Code, the apps that use it, a Look select when it has several looks).

The folder is self-contained. It imports only `react`, `react-dom` and its own `kit.ts`.

## Structure

```
usecase-gallery/
  index.ts                 public API: <UsecaseGallery />, defineUsecase, defineComponent
  kit.ts                   the ONLY file that imports the AtomicAUI kit
  apps.ts                  the app registry: key, name, label, optional url
  types.ts, define.ts      shared types and the define helpers
  contexts/                one file per place of use: the real kit area that holds an example (body-text.tsx, form.tsx, ...)
  mock-data.tsx            the one place for the little sample content (a row, a field, a radio pair) the scenes show around an example
  catalog/                 discovery (import.meta.glob), validation, snippet extraction
  hooks/                   hash route (use-route.ts), copy-to-clipboard, media query
  layout/                  gallery shell and the resizable / stacked layouts
  ui/                      the pages (components-page, component-page, breadcrumb, thumb = the live render in a card) and the panes (render, detail)
  styles/gallery.scss      layout and chrome, tokens only
  usecases/
    <component>/
      <component>.meta.ts  defineComponent({ id: 'Button', title: 'Button', uiTypes: ['Single button', 'Button group', 'Icon button'] })
      <UseCaseId>/         e.g. Button-002
        example.tsx        the rendered example AND the source shown as code
        usecase.ts         defineUsecase({ uiType, title, area?, apps, summary, where, when, how, cases?, source? })
        scenes/<case>.tsx  optional: one In context scene per case (see below)
        looks/<look>.tsx   one example per look after the first, when the cases state two or more looks (`Dark solid` -> `dark-solid.tsx`)
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

The preview renders this component, and the Code view of the right pane shows the JSX it returns (the kit import and the wrapper are stripped), read from the same file with Vite `?raw`, so the two cannot drift. Keep the `return` the last statement of the component. Do not add controls or state: the page is read-only.

`usecase.ts`:

```ts
import { defineUsecase } from '../../../define';

export default defineUsecase({ uiType: 'Single button', title: 'Primary solid', area: 'Dialog', apps: ['hcs'], summary, where, when, how });
```

The tree is component > UI type > use case. **One use case is one business action** (Submit, Download CSV, Back to top, Reset inputs, Delete template): a single button with the action Submit is the Submit button use case, and a modal that resets the inputs is one use case of the dialog component, never a place inside Button. Button keeps only the actions a button performs itself; a composite UI whose action is the whole modal (Reset confirm, Accept licence, Send feedback, Delete confirm, Save template, Welcome dialog) is a use case of Dialog or AlertDialog, whichever the apps use. AlertDialog has no card of its own: its `alert-dialog.meta.ts` sets `parent: 'Dialog'`, so its use cases (`AlertDialog-001`..`004`, ids unchanged) are the `Alert / Confirm` UI type of the Dialog page and tree entry, their breadcrumb reads Components > Dialog > AlertDialog-00x, and the old `#/AlertDialog` opens the Dialog page. Any component can be folded into another the same way with `parent`. The title names the action (`Download CSV button`, `Reset confirm dialog`); the **look** of the control (`Secondary solid`, `Text with leading icon`, formerly the variant) is the `look` property of the use case, shown in the Document and above the preview, never a tree level. A **UI type** is a UI told apart by what it is made of, measured in the rendered gallery and read in the code, never by where it is used: Button has Single button, Button group (two or more Buttons shown together as one group, any mix of looks) and Icon button (the former IconButton component, folded in). The component's `<component>.meta.ts` lists its `uiTypes` in tree order; every use case names one in `uiType`, and the catalog throws for an unlisted type or a listed type without a use case. A component with one UI type (title equal to the component title) lists its use cases directly. The same action drawn with a different look (another app, another size) is not another use case: each case states its own `look`, and with two or more looks the preview shows a **Look select**. The first look is `example.tsx`, every other look has `looks/<look-slug>.tsx` (the catalog throws for a missing one); the chosen look decides the example, the Code, the apps of the Used-in row and the In context cases, so the apps follow the look. Differences of the same action and look between apps stay inside the use case as the app toggle (HCS 560px with X, ACE without X, ADM 480px with X). Components not yet converted still name a variant by its look in `title`; they move to this rule one at a time (Button is the first, 2026-11-20).

`area` is optional and is only the place of use of the single default In context: a use case with no `cases` sets `area` (`'Toolbar'`) and renders `contexts/<area-slug>.tsx`; a use case with `cases` lists its scenes there and sets no `area` (the catalog throws for both). It no longer groups the tree.

`apps` lists the keys of the apps that use the pattern; the Document view shows one primary-style badge (kit `Chip`, `color: 'primary'`, `paint: 'solid'`) per key, in an unlabelled row (the list carries an `aria-label` of "Used in"). When the cases give apps their own UI (see "The same use case in another app"), the badges are drawn from the same groups instead: one block per type with one row of badges per distinct UI, so the Document and the In context toggle cannot disagree.

No registry or shell edit is needed.

## Add an in-context view

The preview has a Component | In context toggle (default Component). In context renders the example inside the area that holds it, cut to the minimum and built only from kit parts, static and read-only; the Code view shows the context's JSX with the example inside it.

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

Use only components exported by `kit.ts` (add an export there if the kit has the part). Portaled parts (a Dialog or Popover popup) take `container={host}`, the preview stage, and skip the backdrop and viewport, so they render open inside the card rather than as an overlay. The Code view strips these preview-only props (`open`, `modal={false}`, `initialFocus={false}`, `container={host}`, `anchor={host}`) from the copyable snippet (`PREVIEW_ONLY_PROPS` in `catalog/snippet.ts`). One context serves every use case of its area, so the example goes where that area's controls most often sit.

When a use case sits elsewhere than the rest of its area (the Output header's scroll helpers, the options of the viewer), set `contextVariant` in its `usecase.ts` (for example `contextVariant: 'helpers'`) and add `contexts/<area-slug>-<variant>.tsx`. That use case then renders in the variant instead of the area's context; a missing variant file fails the catalog build.

### Several cases for one use case

When one use case has several In context scenes (its app groups, or states of the one action such as Print enabled or disabled), do not stack them. List them in `usecase.ts` and put each scene in the use case folder; touch nothing else:

```ts
cases: [
  { id: 'enabled', name: 'Enabled' },
  { id: 'disabled', name: 'Disabled (inputs invalid)' },
],
```

Each id is a file `scenes/<id>.tsx` with the same shape as a context (`{ children, host }`). In context lists the **places of the one action** (a state such as enabled or disabled, or a kind of row; never another action, which is another use case): with more than one case name the preview shows a kit `RadioGroup` of the names (not UI types: the UI type is the tree level) above the scene (default: the first; the choice survives the Component | In context toggle and resets on another use case), renders only the chosen scene and shows its code. A scene that places `{children}` gets the example spliced in; one that writes its own controls (a disabled or alternative state) is shown as written. A use case with one case, or none, shows no radio group and uses the area context. Cases with the same name are one scene type with several app variants (next section). A missing scene file fails the catalog build.

### The same use case in another app

Several apps often write the same pattern; the gallery shows one scene per **distinct UI** and a group of apps for each, never a scene per app. A case lists the apps that share its UI:

```ts
apps: ['hcs', 'ace', 'adm', 'hs', 'fd'],
cases: [
  { id: 'hcs-reset', name: 'Reset confirm', apps: ['hcs', 'ace', 'adm'], source: { hcs: 'src/components/HcsResetDialog.tsx', ace: '...', adm: '...' } },
  { id: 'hs-reset', name: 'Reset confirm', apps: ['hs', 'fd'], source: { hs: '...', fd: '...' } },
],
```

- Cases that share a `name` are the app groups of one scene type (Reset confirm, ...), one per group. The preview shows the radio group of the type names, and under it a `ToggleGroup` of the groups of the chosen type when it has two or more; with one group there is no toggle, and a use case whose every type has one group shows no app row.
- A group toggle value is the apps of the group, the app labels joined by a comma (`HS, FD`); never a property and never `Other apps`, and there is no `Covers` line. List the named apps first. A property of the UI (label above or beside, a unit weight) is the case's `note`, plain text shown below the scene. Switching type keeps the apps in view: it picks the group that covers an app of the group you were on.
- Within one type an app belongs to one group; an app a type does not have gets no case in it. A case without `apps` is the same in every app of the use case and cannot share its name with another case.
- `apps` of the use case must equal the union of the case groups. The catalog throws at startup for an app that no case shows, a case app that is not listed, an overlap inside a type, a `source` app outside the group, or the old `app: '<key>'` field. The Document badges are drawn from these groups (`ui/docs-pane.tsx`), so the badges and the toggle cover the same apps.
- Record the file each scene was built from per app: `source: { hcs: '<path>' }` on the use case, and `source` on a case for the apps of that group.
- Group apps by rendered appearance and behavior measured from computed styles in a browser. Merge size-only differences and app-side defects; keep other measured distinctions, including label weight, and record the evidence. See `.claude/skills/usecase-gallery/SKILL.md` for the grouping procedure.

A scene file is named `<first app of the group>-<type>.tsx` and is written from that app's own source, so the radio keeps the same names under every app. Examples of use cases built this way, from the apps' repos: `Button-023` (Walkthrough step navigation buttons, three groups) and `Button-024` (End walkthrough buttons, four groups), where a label's case and weight and the icon after End count as differences even when the app sets them by CSS (`.ug-tour__nav` in `gallery.scss` reproduces the bold capitals of ADM, PBS, PFD and FD); `Button-011` (Start tutorial topic button, four groups); `Button-029` to `Button-032` (the close X and field help trigger across popover, walkthrough and dialog); `AlertDialog-003` (Reset confirm dialog, five groups); and `Dialog-007` (Welcome dialog). A scene that places `{children}` shows the example as it is; the others write their own controls so the capitals, weights and icons are the app's. The agent procedure is in `.claude/skills/usecase-gallery/SKILL.md`.

### Sample content

Scenes are minimal: just enough of the container to show what it is and where the button lives (its frame, header or row, the example, a title), and nothing else. Cut extra columns, rows, fields, toolbars, helpers and sample text, even where the HCS design has them; this deliberately trades HCS 1:1 completeness for minimal code, and the container semantics and the recorded `source` path stay. Show a second row or element only when the example needs it (Button-023 has two rows because the button has two colors). What a scene leaves out is named in the use case's `how`. The few values and small `Mock...` scenery components live in `mock-data.tsx`, in hcs wording with placeholder values only. In the copied code each `<Mock... />` becomes a one-line `{/* sample ... */}` comment, so the snippet shows the component usage, not the rows. Text that is part of the pattern (a label, a count) is written inline.

### Where the app needs local CSS

The scenes follow the real hcs containers (pane header action group, table header cell `actions` slot, body toolbar, accordion field column, Dialog Popup + Title + Actions, popover View). Where the app uses local CSS (the header group's push to the end, a corner-pinned close X, the viewer overlay position, the rotated chevron) the scene uses `justifyContent` or a small inline style and the use case's `how` says so. The 3D canvas cannot be built from kit parts (the app draws it with three.js): it is a framed stand-in with a short note. The Walkthrough, viewer and split scenes use a few gallery rules for what the app does with measured or fixed CSS (`.ug-tour*`, `.ug-scene*`, `.ug-split*` in `gallery.scss`); the stage also carries the app's text reset (`@layer base`). Pixel sizes come from tokens and are unverified against the app. No scene is modal or covers the page: Dialog and Popover scenes use `modal={false}` and `container={host}` (the Dialog and AlertDialog use cases also keep their Backdrop and Viewport, which the stage frames with `contain: layout`), and the View options popup is open and floats like the Configure columns one. The Configure columns popover, the help popovers, the column menu and the field help popovers and tooltips are anchored for real: the scene builds the trigger (or anchors to the example's header cell), opens the Popover non-modal in the stage, and marks its positioner `className="ug-anchored"` so `gallery.scss` leaves it floating; a wrapper with an inline `min-block-size` gives it room in the stage.

Every area now has a context, a variant or scenes, so the dashed fallback frame only appears for a new area without one.

## Add an app

Add one entry to `apps.ts`: `{ name, label, url? }` under a short key. Its `url` is where the badge links (a new tab, `rel="noopener noreferrer"`); an app without a web link yet (HS, RWS) omits `url` and its badge renders without an anchor. The key becomes valid in `apps: [...]`. The registry holds ten apps, each named `<key>-design-prototype` (private repos under amelie-pierce): hcs, ace, adm, pfd, pbs, hs, fd, agpd, rws, adc; a use case lists the apps that have the pattern, grouped by distinct UI.

## Add a component

Create `usecases/<component>/<component>.meta.ts` with `defineComponent({ id, title, uiTypes })` (add `parent: '<ComponentId>'` to show it inside another component instead of as its own card), then add use cases as above. `id` is the PascalCase prefix of its use case ids.

## Layout and type

The use case detail page removes the component tree and uses one unframed two-column layout: the preview is on the left and the document or code is on the right. The preview column is sticky below the breadcrumb while the detail column scrolls with the page. `DetailLayout` in `layout/layouts.tsx` stacks the two columns below 840px. The preview and detail regions use native semantic sections rather than kit cards; the gallery still uses kit components for all controls, type and iconography. The right region (`ui/detail-pane.tsx`) has a Document | Code `ToggleGroup` above its content: Code (the default) is the copyable snippet with its Copy button top-right, Document is the docs. The choice is kept when another use case is selected. One size for all text: hcs body, `sm` = 16/20 (weight, not size, separates headings from body). All text is the kit's `Type` (role, family, weight) or a kit part at `scale: 'sm'`; the stylesheet sets only the root size and line height (`.ug`: 16px, 1.35), as hcs does. The sizes follow the hcs typography (Inter 16/20 unless noted):

| Element | Type |
| --- | --- |
| tree component and UI type titles | `l3` semi-bold 16/20 |
| tree use case rows (id and name) | `l3` regular 16/20, selected row bold, primary text on a light primary tint |
| doc id and name | `l3` bold 16/20 |
| doc summary | `l3` muted 16/20 |
| Where / When / How labels | `l3` semi-bold 16/20 |
| doc body | `l3` 16/20 |
| code | `l3` mono (JetBrains Mono) regular 16/20 |
| badges, toggle labels, Copy | kit part at `sm`, 16/20 |
| fallback frame note | `l3` muted |

The doc pane's use case id and name use `Type color="primary"`; the Where / When / How labels use the default text color; the active toggle segment is a primary solid `Button`, the inactive one a neutral secondary text `Button`. Theme primary is only about 3.2:1 on the light surface, so `.ug-docs` (id and name) and `.ug-render__toggle` and `.ug-detail__toggle` in `gallery.scss` resolve `--theme-primary` to `--p-palette-orange-600` (at least 4.7:1 as text, 5.2:1 under the white on-primary toggle text).

The docs content shows the use case id and title in one box, at the same size as the other doc text and set apart by bold weight (the id never wraps; a long title wraps below it), the summary, a row of app badges (no visible label), then Where / When / How as a definition list; those three fields are the whole doc format.

## Id rules

- A use case folder is named `<ComponentId>-<NNN>`: the `id` from the component's meta, a dash, and at least three digits (`Button-017`, `Dialog-004`).
- The prefix must match the `id` in the component's meta file, and ids are unique across the gallery. A violation throws at startup with the reason.
- Ids follow the tree: per component they run contiguously from `001` in tree order (UI types in the order of `<component>.meta.ts` `uiTypes`, then the use cases of a type in id order), and components are listed A-Z by title. Adding, merging or removing a use case shifts the ids after it, so renumber the component with one old-to-new map applied to the folders and to every reference (skill, README, wiki, `usecase.ts`, scenes) and put the table in the PR description. The URL hash is the id and the gallery has no alias for old ids, so a hash shared before the 2026-11-20 business-action split of Button, Dialog and AlertDialog falls back to the first use case (the wiki note holds the old-to-new table).

## Move it to another app

1. Copy this folder into the other app.
2. Install the peer dependencies: `react` and `react-dom` 19, and the AtomicAUI kit with its own dependencies (`@base-ui/react`, `react-resizable-panels` 4), plus `sass`. The build must be Vite (`import.meta.glob`, `?raw`).
3. Edit `apps.ts` for that app's registry. Edit `kit.ts` so its re-export points at that app's AtomicAUI package and provides the exports listed there.
4. Make sure the host renders `AuiIdentityProvider` with `typeface="engineering"` and `typography="body"` and loads the AtomicAUI token stylesheet; the gallery uses its CSS variables and does not load tokens itself. Also load the icon font (see below).
5. Render `<UsecaseGallery title="..." />` full screen: it fills the viewport.

## Host requirements: fonts

The host declares Inter and JetBrains Mono and overrides `--p-font-inter` and `--p-font-jetbrains-mono` with fallbacks, as hcs does. This app self-hosts the two variable woff2 files in `public/fonts` and declares them in `src/fonts.scss` (together with `html { font-size: 16px }` and the Inter body); hcs itself also lists a CDN copy.

## Host requirements: icon font

Kit icons are Font Awesome glyphs. With brand `atomic` they resolve to **Font Awesome 7 Pro Duotone** (`--icongraphy-typeface-family`, classes `fa-duotone fa-*`), a licensed font the host must load; this folder neither bundles nor loads it.

The host app loads the shared Pro Web Font kit with one script tag in `index.html` (`https://kit.fontawesome.com/159db568f7.js`); the deploy origin must be permitted in the kit's settings, otherwise icons render blank.

The Copy button is text-labelled (no icon), so it never depended on the font.
