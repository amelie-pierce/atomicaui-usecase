# usecase-gallery

A read-only gallery of component use cases: a tree of components and use case ids (`Button-001`), the rendered example, the code to copy, and where/when/how to use it. Selection lives in the URL hash (`#Button-001`).

The folder is self-contained. It imports only `react`, `react-dom` and its own `kit.ts`.

## Structure

```
usecase-gallery/
  index.ts                 public API: <UsecaseGallery />, defineUsecase, defineComponent
  kit.ts                   the ONLY file that imports the AtomicAUI kit
  types.ts, define.ts      shared types and the define helpers
  catalog/                 discovery (import.meta.glob), validation, snippet extraction
  hooks/                   hash selection, copy-to-clipboard, media query
  layout/                  gallery shell and the resizable / stacked layouts
  ui/                      tree, render, code and docs panes
  styles/gallery.scss      layout and chrome, tokens only
  usecases/
    <component>/
      <component>.meta.ts  defineComponent({ id: 'Button', title: 'Button' })
      <UseCaseId>/         e.g. Button-001
        example.tsx        the rendered example AND the source shown as code
        usecase.ts         defineUsecase({ title, summary, where, when, how })
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

export default defineUsecase({ title, summary, where, when, how });
```

No registry or shell edit is needed.

## Add a component

Create `usecases/<component>/<component>.meta.ts` with `defineComponent({ id, title })`, then add use cases as above. `id` is the PascalCase prefix of its use case ids.

## Id rules

- A use case folder is named `<ComponentId>-<NNN>`: the `id` from the component's meta, a dash, and at least three digits (`Button-001`, `Button-012`).
- The prefix must match the `id` in the component's meta file, and ids are unique across the gallery. A violation throws at startup with the reason.
- Ids are never reused or renumbered, because they appear in shared URLs.

## Move it to another app

1. Copy this folder into the other app.
2. Install the peer dependencies: `react` and `react-dom` 19, and the AtomicAUI kit with its own dependencies (`@base-ui/react`, `react-resizable-panels` 4), plus `sass`. The build must be Vite (`import.meta.glob`, `?raw`).
3. Edit `kit.ts` so its re-export points at that app's AtomicAUI package. It must provide `Button`, `Card`, `Collapsible`, `Panels` and `Type`. That is the only edit.
4. Make sure the host renders `AuiIdentityProvider` and loads the AtomicAUI token stylesheet; the gallery uses its CSS variables and does not load tokens itself. The icon font the kit needs for glyphs (such as the Collapsible chevron) must also be available.
5. Render `<UsecaseGallery title="..." />` full screen: it fills the viewport.
