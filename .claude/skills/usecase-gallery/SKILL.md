---
name: usecase-gallery
description: Load before adding a use case to the gallery, changing an existing one (its example, docs, In context scenes, cases or apps), or adding an app to the apps registry. Covers the folder shape, the In context rules (scenes mapped 1:1 to the source design, the case radio group, the per-app toggle row) and the checks to run.
---

# usecase-gallery

`src/usecase-gallery/README.md` is the how-to for the folder; this skill is the procedure and the rules for use case work.
Read `_vaults/atomicaui-usecase-prototype/wiki/index.md` first, then the README sections you need.
Live code wins over both: `define.ts`, `types.ts`, `apps.ts`, `catalog/build-catalog.ts`, `ui/render-pane.tsx`.

## Keep the structure

- One folder per use case: `src/usecase-gallery/usecases/<component>/<Component>-<NNN>/` with `usecase.ts` (`defineUsecase`) and `example.tsx`, plus `scenes/<case>.tsx` when it has In context cases. Ids are never reused or renumbered once shared.
- Discovery is automatic (`import.meta.glob` in `catalog/catalog.ts`); a new use case, component or scene needs no registry or shell edit.
- `src/usecase-gallery/kit.ts` is the only file that imports the AtomicAUI kit. Every other file imports kit parts from it; add an export there when the kit has the part.
- Use AtomicAUI tokens only: no raw colors or pixel values; tokens come from the kit and `--p-*` variables, with the small inline styles the README allows.
- Examples are read-only: fixed props, no state, no controls. Keep `return` the last statement of `Example`, because the Code view of the right pane is cut from that file.
- Never hand-edit `src/vendor/atomic-aui`.

## Add a use case

1. Pick the component's next free id and create the folder.
2. Write `example.tsx` with the fixed-props example.
3. Write `usecase.ts` with `area`, `title`, `apps`, `summary`, `where`, `when` and `how`. `apps` lists keys from `apps.ts`; each `where` names the real app source it mirrors.
4. If the area has no context in `contexts/`, add `contexts/<area-slug>.tsx`; if this use case sits elsewhere in its area, set `contextVariant` and add the variant file.
5. If the use case has In context scenes, follow the next section.

## Change a use case

Edit in place and keep its id. A change to `example.tsx` changes the Component preview and the Code view together; a change to a scene changes the In context preview and its code. Update `where`, `when` and `how` when the behavior they describe changes. A rename or regroup of ids is never part of a change.

## In context rules

1. **One scene per source design.** Each In context scene maps 1:1 to a screen or container of the source design, HCS first, and is built from the real source file, not from memory of how it looks. Record where it came from in `usecase.ts`: `source: { hcs: '<path in hcs-design-prototype>' }` for the use case, and `source` on a single case when that scene comes from another file. Do not merge two source designs into one scene or split one into several.
2. **Several types keep the radio group.** A use case with several types (the three dialogs of Button-001) lists them in `cases` and shows the radio group of case names, exactly as today. One case, or none, shows no radio group.
3. **Another app's UI adds one toggle row.** When the same use case looks different in another app of `apps.ts`, add that app's scenes as cases with `app: '<key>'` and list the key in `apps`. The preview then shows one extra row, a toggle of app labels, above the radio group, and the radio group lists only the chosen app's cases. A case without `app` shows for every app.
   - The row appears only when two or more apps have cases of their own for the use case (`appsWithUi` in `catalog/app-views.ts`). An app whose UI is the same as another's gets no case and no toggle entry; it is still listed in `apps` for its badge.
   - The apps come from `apps.ts` only; add a new app there first (see the README), never a literal in a use case.
   - The first app in registry order is the default, and the choice resets when another use case is selected.

Shape of a use case with two apps (ids and case names are examples):

```ts
export default defineUsecase({
  area: 'Table',
  title: '...',
  apps: ['hcs', 'ace'],
  source: { hcs: 'src/.../table-header.tsx', ace: 'src/.../grid-header.tsx' },
  cases: [
    { id: 'hcs-header', name: 'Header cell', app: 'hcs' },
    { id: 'ace-header', name: 'Header cell', app: 'ace' },
  ],
  // summary, where, when, how
});
```

## Check the work

1. `npm run build` passes; the catalog validation throws at startup for a bad id, a missing scene or a case app missing from `apps`.
2. Open the page (`npm run dev`) and check the use case in Component and In context modes, every case, and every app. A use case with one app must look exactly as before: no toggle row.
3. Update the vault note `_vaults/atomicaui-usecase-prototype/wiki/gallery/adding-use-cases.md` only for what the task taught, and register any new note in its folder index.
