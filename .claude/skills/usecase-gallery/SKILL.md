---
name: usecase-gallery
description: Load before adding a use case to the gallery, changing an existing one (its example, docs, In context scenes, cases or apps), or adding an app to the apps registry. Covers the folder shape, the In context rules (minimal scenes, one per source design, the case radio group, the per-app toggle row) and the checks to run.
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
- Examples are read-only: fixed props, no state, no controls. Keep `return` the last statement of `Example`, because the Code view of the right pane (its default mode, beside the Document toggle) is cut from that file.
- Never hand-edit `src/vendor/atomic-aui`.

## Add a use case

1. Pick the component's next free id and create the folder.
2. Write `example.tsx` with the fixed-props example.
3. Write `usecase.ts` with `area`, `title`, `apps`, `summary`, `where`, `when` and `how`. `apps` lists keys from `apps.ts`; each `where` names the real app source it mirrors.
4. If the area has no context in `contexts/`, add `contexts/<area-slug>.tsx`; if this use case sits elsewhere in its area, set `contextVariant` and add the variant file.
5. If the use case has In context scenes, follow the next section.

## Change a use case

Edit in place and keep its id. A change to `example.tsx` changes the Component preview and the Code view together; a change to a scene changes the In context preview and its code. Update `where`, `when` and `how` when the behavior they describe changes. The Document is what the AI reads for context, so keep it accurate to the example and the scene. A rename or regroup of ids is never part of a change.

## In context rules

0. **Minimal scenes.** An In context scene shows the least that tells the user what the container is and where the button lives: no extra columns, rows, fields, toolbars, helpers or sample text (one data row, or two only when two button types must show). Keep the container semantics and record the HCS source path; this deliberately trades HCS 1:1 completeness for minimal code. State what the scene leaves out in the use case's `how`.
1. **One scene per source design.** Each In context scene maps 1:1 to a screen or container of the source design (the app's repo `amelie-pierce/<app>-design-prototype`, HCS first), and is built from the real source file, not from memory of how it looks, then cut down to the minimal container above. Components, props and placement follow that app's source; only mock data is cut. Record where it came from in `usecase.ts`: `source: { hcs: '<path in hcs-design-prototype>', ace: '<path in ace-design-prototype>', ... }` for the use case (one path per listed app), and `source` on a single case when that scene comes from another file. Do not merge two different source designs into one scene or split one into several; apps that write the same dialog (same footer buttons and props, same container parts) share one scene, named in its top comment and in `how`.
2. **Several types keep the radio group.** A use case with several types (the dialog types of Button-001) lists them in `cases` and shows the radio group of case names, exactly as today. One case, or none, shows no radio group.
3. **Another app's UI adds one toggle row.** When the same use case looks different in another app of `apps.ts`, add that app's scenes as cases with `app: '<key>'` and list the key in `apps`. The preview then shows one extra row, a toggle of app labels, above the radio group, and the radio group lists only the chosen app's cases. A case without `app` shows for every app.
   - The row appears only when two or more apps have cases of their own for the use case (`appsWithUi` in `catalog/app-views.ts`). An app whose UI is the same as another's gets no case and no toggle entry; it is still listed in `apps` for its badge.
   - Name a scene file `<app>-<type>.tsx` (case id `<app>-<type>`) with the same case name for the same type in every app (Reset confirm, Accept licence, Send feedback, ...), so the radio group reads alike under each app. A type an app does not have gets no case (PBS, AGPD and RWS have no Reset confirm). An app with one case of its own (`fd-close`) still gets its toggle entry.
   - The kit has no modal-free AlertDialog, so an app's AlertDialog is drawn as a non-modal `Dialog` with the same parts (state it in the scene comment); a width the app caps by the viewport is capped by the stage instead (`min(640px, 100%)`).
   - The apps come from `apps.ts` only (ten today: hcs, ace, adm, pfd, pbs, hs, fd, agpd, rws, adc; `url` is optional, HS and RWS have none); add a new app there first (see the README), never a literal in a use case. Badges render in the primary Chip style.
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
