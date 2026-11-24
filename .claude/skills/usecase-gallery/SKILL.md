---
name: usecase-gallery
description: Load before adding a use case to the gallery, changing an existing one (its example, docs, In context scenes, cases or apps), or adding an app to the apps registry. Covers the rule one use case = one business action, the tree (component > UI type > use case), the folder shape, the In context rules (minimal scenes, one per source design, the options selection, and for use cases not yet converted the state radio group and the app-group toggle) and the checks to run.
---

# usecase-gallery

`src/usecase-gallery/README.md` is the how-to for the folder; this skill is the procedure and the rules for use case work.
Read `_vaults/atomicaui-usecase-prototype/wiki/index.md` first, then the README sections you need.
Live code wins over both: `define.ts`, `types.ts`, `apps.ts`, `catalog/build-catalog.ts`, `ui/render-pane.tsx`.

## Keep the structure

- One folder per use case: `src/usecase-gallery/usecases/<component>/<Component>-<NNN>/` with `usecase.ts` (`defineUsecase`) and `example.tsx`, plus `scenes/<case>.tsx` when it has In context cases. Ids are contiguous from 001 per component in tree order (UI type order, then use case order); adding, merging or removing a use case renumbers the component (see Renumber ids).
- Discovery is automatic (`import.meta.glob` in `catalog/catalog.ts`); a new use case, component or scene needs no registry or shell edit.
- `src/usecase-gallery/kit.ts` is the only file that imports the AtomicAUI kit. Every other file imports kit parts from it; add an export there when the kit has the part.
- Use AtomicAUI tokens only: no raw colors or pixel values; tokens come from the kit and `--p-*` variables, with the small inline styles the README allows.
- Examples are read-only: fixed props, no state, no controls. Keep `return` the last statement of `Example`, because the document's Code/API section is cut from that file.
- Never hand-edit `src/vendor/atomic-aui`.

## One use case = one business action

- The site is Components grid (`#/`) > component page (`#/Button`, a section per UI type) > use case (`#Button-007`). The tree is component > **UI type** > **use case**; the grids show a live render of each component's and use case's example, so an example must render without a kit-only context (Dialog examples use `useStageHost`). A use case is one business action: Submit, Download CSV, Back to top, Accept licence, Reset inputs, Delete template. A single button with the action Submit is the `Submit button` use case; a modal that resets the inputs is one use case of the dialog component (`Reset confirm dialog`) and is never a place inside Button. AlertDialog has no card of its own: its `alert-dialog.meta.ts` sets `parent: 'Dialog'`, so its use cases (`AlertDialog-001`..`004`, ids unchanged) are the `Alert / Confirm` UI type of the Dialog page and tree entry, their breadcrumb reads Components > Dialog > AlertDialog-00x, and the old `#/AlertDialog` opens the Dialog page. Any component can be folded into another the same way with `parent`. The title names the action (`Download CSV button`).
- **Button keeps only what a button performs itself.** A composite UI whose action is the whole modal (Reset confirm, Accept licence, Send feedback, Delete confirm, Save template, Welcome dialog) is one use case of Dialog or AlertDialog, whichever the apps use (AlertDialog for confirms the app writes as AlertDialog, Dialog otherwise); its example is the whole dialog and its footer buttons are not a Button use case.
- **The look is a property, not a tree level.** The former variant (`Secondary solid`, `Text with leading icon`) is the `look` field of `usecase.ts`, shown in the Document and above the preview. The same action drawn with another look (another app, another size) is not another use case: each case states its own `look` (`Close info dialog button`: Secondary solid for PBS, AGPD, RWS; Dark solid for FD) and the preview shows a **Look select** for the use case's two or more looks. The first look is `example.tsx` (the first case's look); every other look needs `looks/<look-slug>.tsx` (`Dark solid` -> `looks/dark-solid.tsx`, same shape and kit-only imports as `example.tsx`), and the catalog throws for a missing file. The chosen look decides the example, the Code, the apps in Used in and the In context cases, so the apps list follows the look. Omit the use case-level `look` when every case states one.
- App differences of the same action and look stay inside the use case as the app-group toggle (Reset confirm: HCS 560px with X, ACE without X, ADM 480px with X). Places of the one action that are not another action (a state such as enabled or disabled, a kind of row such as results row or group row) stay as the radio group of case names; a place that is another action is another use case.
- A UI type is a UI told apart by what it is made of and how it renders, never by where it is used: Button has `Single button`, `Button group` (two, three, four or more Buttons shown together as one group, any mix of looks and kinds; main + secondary CTA is only one example) and `Icon button`. One Button is a `Single button` (a lone Download CSV), several shown together are a `Button group` (the Back to top + Table Notes pair), an icon-only control is an `Icon button`, and each scene renders the controls of its own place. IconButton is not a component.
- A component lists its UI types, in tree order, in `<component>.meta.ts` (`uiTypes`); each `usecase.ts` sets `uiType`, `title` (the action), `look` and, for a use case without `cases`, `area` (its one default In context; a use case with `cases` sets no `area`). A component with one UI type named like the component lists its use cases directly.
- A component not yet converted still names a variant by its look in `title` and sets no `look`; convert one component at a time (Button, Dialog and AlertDialog are the first, 2026-11-20): split each variant by the action each of its places performs, move whole-modal actions to the dialog component, renumber, and put the old-to-new table in the PR.
- Decide types and looks from measured computed styles in the running gallery (`npm run dev`, a real browser; if chrome-devtools-axi reports BRIDGE_NOT_READY, drive Playwright's headless Chromium with a driver script kept outside the repo): per example read each element's size, colour, border, radius, font, padding and glyph. Same action = one use case (app and look differences become groups, each with its `look`); a different action = another use case; a different structure (one button vs a Button group, text vs icon-only) = another UI type.

## Group by action

One use case per business action and look. Compare use cases by UI (layout and appearance), never by content or data: apps with the same UI but different content or data (HCS vs ADC) merge into one use case, and the scene shows the content and data differences with mock data, never an app's own labels or records.

- Merge into the lower id, move the other use case's scenes and cases in, rewrite `title`, `summary`, `where`, `when` and `how` once, and delete the other folder (then renumber the component).
- The area name and the context never split a use case, and never merge two actions: the same Close X in a help popover, a walkthrough card and a dialog is the same measured control but three actions (Close popover, Close walkthrough, Close dialog) and so three use cases; a state such as `readOnly` or `disabled` is a place of the action, not another use case. A split needs a different action, a measured difference in the control's rendered look or a different structure; a label, container or spacing difference does not split.
- An icon-only control (a close X, a kebab, a help trigger) is a use case of Button's `Icon button` type, and its `example.tsx` is the IconButton kit part; a trigger or wrapper kit part (`Panels.Trigger`, `Dialog.Close`) is written in the In context scene, not the example.
- Do not merge when the code instruction differs (another part, a wrapper, a compound form; not a state such as `readOnly` or `disabled`), when the trigger or control is a different kind, or when only the container sounds alike. Say the reason for each kept split in the PR description.
- Recheck this rule for the component's other use cases whenever you add or change one.

## The example is the main-purpose component

The `example.tsx` (shown in the document's Code/API and Anatomy, not a separate tab) is the code a user copies for the use case's main purpose: the component the use case is named for. A Dialog use case's example is the Dialog (Popup, Title, close X, Body), not the Accordion, RadioGroup or form inside it. A supporting component (an Accordion in an About dialog, the Radio list of a template picker) appears only in the In context scene, which writes it in place of the `{children}` slot, to clarify how it is used there. A Dialog example is forced open into the stage with `const host = useStageHost()` and `container={host}` (preview-only props the copied snippet strips). Recheck this for every use case of the component whenever you add or change one, and state each changed and each deliberately unchanged use case, with the reason, in the PR description.

## Add a use case

1. Name the business action. If a use case for that action and look exists, add the app group (scene and case) to it. Otherwise create the folder at its tree position (UI type, then use case order) and renumber the later ids (Renumber ids); add a new UI type to `uiTypes` in `<component>.meta.ts` only when the structure differs. An action that is a whole modal goes to Dialog or AlertDialog, not Button.
2. Write `example.tsx` with the fixed-props example.
3. Write `usecase.ts` with `uiType`, `title` (the action), `look` (the look of the control), `apps`, `summary`, `where`, `when` and `how`, plus `area` (default In context) when it has no `cases`. `apps` lists keys from `apps.ts`; each `where` names the real app source it mirrors.
4. For a use case with `area`: if the area has no context in `contexts/`, add `contexts/<area-slug>.tsx`; if this use case sits elsewhere in its area, set `contextVariant` and add the variant file.
5. If the use case has In context scenes, follow the next section.

## Change a use case

Edit in place and keep its id. A change to `example.tsx` changes the document's Code/API and Anatomy code together; a change to a scene changes the In context preview and its code. Update `where`, `when` and `how` when the behavior they describe changes. The Document is what the AI reads for context, so keep it accurate to the example and the scene. A change keeps its id; renumbering happens only when a use case is added, merged or removed.

## Detail page = one selection of options

Every use case is built as options (`options` in `usecase.ts`; the README section "Options" has the shape). The detail page shows one selection control at the top; the chosen option decides the In context UI and the document (Anatomy, Code/API). `Button-001` is the reference.

- List every distinct UI of the one action as one option, enabled and disabled states in the same list (a look with an icon, a look without, a disabled button). Name the option for what the UI is, never the app; apps are the `apps` of the option and its Document badges.
- Each option has `options/<id>/scene.tsx` (In context UI, minimal, from the real source) and a Component UI: the first option is `example.tsx`, every other option has `options/<id>/example.tsx`. The Component UI is the control of that exact option (its look, its icon or lack of it, `disabled`).
- Do not add the radio > toggle split: no case radio group, no app-group toggle, no Component | In context tabs. A use case that still lists `cases` is not converted yet; convert it by turning each distinct UI, state and look into an option (derive them from its cases, do not invent UI), moving its scene to `options/<id>/scene.tsx`, and dropping `cases`, `area` and `look` (and `looks/`).
- The union of the options' `apps` must equal the use case `apps`; the catalog validates it.
- Check each option in the browser: the control, the In context UI and the document all change together, with no console errors.
- The In context rules below still apply to each option's scene; where they speak of cases, groups, the state radio group or the app-group toggle, read option for a converted use case.

## In context rules

0. **Minimal scenes.** An In context scene shows the least that tells the user what the container is and where the button lives: no extra columns, rows, fields, toolbars, helpers or sample text (one data row, or two only when two button types must show). Keep the container semantics and record the HCS source path; this deliberately trades HCS 1:1 completeness for minimal code. State what the scene leaves out in the use case's `how`.
1. **One scene per source design.** Each In context scene maps 1:1 to a screen or container of the source design (the app's repo `amelie-pierce/<app>-design-prototype`, HCS first), and is built from the real source file, not from memory of how it looks, then cut down to the minimal container above. Components, props and placement follow that app's source; only mock data is cut. Record where it came from in `usecase.ts`: `source: { hcs: '<path in hcs-design-prototype>', ace: '<path in ace-design-prototype>', ... }` for the use case (one path per listed app), and `source: { <app>: '<path>' }` on a case for the apps of that group when the scene comes from other files. Do not merge two different source designs into one scene or split one into several; apps that write the same dialog share one scene (rule 3), named in its top comment and in `how`.
2. **States of the one action keep the radio group.** A use case whose one action has several states or row kinds (Print enabled or disabled, an Expand row button in a results row or a group row) lists them in `cases` under different names and shows the radio group of those names. The radio names are never UI types (the UI type is the tree level) and never another action (that is another use case). A radio option that is a different business scene (About dialog, Report preview and Template picker in one dialog use case) is another use case: split it into its own use case at its tree position, keep the app toggle for the apps of its scene, and renumber (Renumber ids). One name, or no case, shows no radio group.
3. **One scene per distinct UI; apps are grouped, never copied.** When apps write the same use case differently, each distinct UI is one case with `apps: [...]` (the group of apps that share it) and one scene file. Never copy a scene for an app whose UI is the same: list that app in the group.
   - **Group by what the UI looks like and does, not by source code.** One rule: merge apps whose rendered look and behaviour match, even when their source differs; split when the look or behaviour visibly differs. Compare text, button set and positions, icons, close affordance, tooltip, variant, scale, shape, icon weight and colour tokens. Merge when apps differ only in size (modal or popup width or height) or in an app-side defect (a close X the app lacks or hides, a missing control): the group's scene is the standard UI with the full parts, the size difference is noted in the scene comment and in `how`, and the defect stays out of the code and goes in the PR description (app, what is missing, which standard). Split when scale, shape, icon weight, variant, icons, tooltip or button set differ. Body fields and wording do not count (`Send` and `Submit` in the same footer are one UI). The PR description lists every merge and every kept split with its reason.
   - **Compare rendered styles, not source.** Decide a merge or a split from computed styles in the running gallery (`npm run dev`, a browser): per scene read each element's text, order, position, size, colour, radius, font, icon glyph and close affordance, and diff two groups element by element. An app's source can differ (scale props, a `Spacer`, local CSS) while the render is the same: HCS and ADM Reset confirm render the same elements and differ only in popup width (560 vs 480) and the close aria-label. The Reset confirm dialog (AlertDialog-003) is nevertheless split into HCS, ADM and ACE (no close X) groups, one faithful scene each, because the author asked for visible width and close X differences to split; apply the size and defect merge above unless the author asks otherwise. Compare every element (rows, cells, titles), not only buttons, and open what hover reveals (a tooltip); a scene that shows a control disabled hides its enabled colour, so read the scene props too. The standard of a merged group is the HCS or ADM format; record each merged-away app's defect (app, what differs, which standard) in the PR description, never in the code.
   - **Verify every group** against the apps' source (`amelie-pierce/<app>-design-prototype`, the scan reports only navigate); never merge two apps from memory or from a prose note, and re-check an existing merge you rely on: an app's width or X can differ from the app it was assumed to copy.
   - **Types and groups.** Cases with the same `name` are the variants of one type (Reset confirm, ...). Within a type an app belongs to one group; an app that does not have the type is not in it (PBS, AGPD and RWS have no Reset confirm). A case without `apps` is the same in every app and cannot share its name with another case.
   - **In context toggles group by app, property notes are text below.** Every toggle value is the app or the apps of a group, labelled by the app names joined (`ACE, ADM`); never a property (label above or beside, a unit weight, an outline), never `Other apps`, and no `Covers ...` line or tooltip. A difference such as label above vs beside goes in the case's `note`, plain text shown below the scene. Type names (the radio group) name the situation, not a property. The case has no `label` field.
   - **The preview** shows the radio group of the type names, then, when the chosen type has two or more groups, a toggle of the groups under it, each value the apps of the group. One group in the type means no app row; a use case whose types all have one group shows none. Order the groups with the named apps first.
   - **The Document follows the same groups.** `apps` of the use case must equal the union of the case groups; the catalog throws for an app no case shows (a use case an app never has is not listed for it), a case app that is not listed, an app in two groups of one type, a case `source` app outside its group, or the removed `app` field. The Document's "Used in" is then drawn from the groups (a block per type, one row of badges per distinct UI), so it cannot disagree with the toggle. When you add or move an app, change the group, `apps` and the Document text in `how` together.
   - Name a scene file `<first app of the group>-<type>.tsx` (case id the same) with the same type name in every group. Record each app's source file in the case: `source: { hcs: '<path>', fd: '<path>' }` (one path per app of the group); the use case `source` keeps one path per app.
   - A Popover or Tooltip scene is built open and non-modal (`container={host}`, positioner `className="ug-anchored"`, an inline min-block-size on a wrapper for room); a trigger an app makes with `render` (a Button with a `ContainedIcon` child) is written the same way. Where two apps differ only in the trigger or the close, they are separate groups (Button-029, Button-032).
   - **Also a different UI:** a label's case or weight, even when the app sets it by CSS (ADM, PBS, PFD and FD do for the walkthrough Previous, Next and End), and an icon on or missing from a button. Read the app's CSS as well as its JSX. A type whose control is written the same in every app is one case with `apps` listing them all, so it shows no toggle (Button-030). Where an app styles a control with a class the kit can state as `aui` props (a border, a width), write the props and say so in the scene comment.
   - The kit has no modal-free AlertDialog, so an app's AlertDialog is drawn as a non-modal `Dialog` with the same parts (state it in the scene comment); a width the app caps by the viewport is capped by the stage instead (`min(640px, 100%)`).
   - The apps come from `apps.ts` only (ten today: hcs, ace, adm, pfd, pbs, hs, fd, agpd, rws, adc; `url` is optional, HS and RWS have none); add a new app there first (see the README), never a literal in a use case. Badges render in the primary Chip style.
   - The first group of a type is the default; the choice resets on another use case, and switching type keeps the apps in view.
   - `how` states, per type, which apps are in which group and what differs, in the same words as the group labels.

Shape of a use case with two scene names (ids and case names are examples):

```ts
export default defineUsecase({
  uiType: 'Data table',
  title: '...',
  apps: ['hcs', 'ace', 'adm'],
  source: { hcs: 'src/.../table-header.tsx', ace: 'src/.../grid-header.tsx', adm: 'src/.../grid-header.tsx' },
  cases: [
    { id: 'hcs-header', name: 'Header cell', apps: ['hcs'], source: { hcs: 'src/.../table-header.tsx' } },
    { id: 'ace-header', name: 'Header cell', apps: ['ace', 'adm'], note: 'Label beside.', source: { ace: '...', adm: '...' } },
    { id: 'hcs-row', name: 'Row actions', apps: ['hcs', 'ace', 'adm'] },
  ],
  // summary, where, when, how
});
```

## Renumber ids

Ids are `<Component>-<NNN>`, contiguous from 001 per component in tree order (components A-Z by title, UI types in `uiTypes` order, use cases of a type in id order). When a use case is added, merged, split or removed:

1. Build one old-to-new map for the component from that order.
2. Rename the folders in two phases (old -> temporary suffix -> new) so ids never collide, and rewrite every reference with the same map in one pass (`usecase.ts` cross references, scenes, `how` and `when` texts, README, this skill, the wiki note; also shorthand such as `Button-024/027`).
3. Put the map table in the PR description. The URL hash is the id and the gallery keeps no alias for old ids; do not invent one unless asked.

## Check the work

1. `npm run build` passes; the component page of the component renders a card for every use case; the catalog validation throws at startup for a bad id, a missing scene, or app groups that disagree with `apps` (rule 3). To run the validation without a browser, load `catalog/catalog.ts` through Vite's `ssrLoadModule` in a small node script and print each use case's types and groups.
2. Open the page (`npm run dev`) and check the use case in the In context preview, every type and every group, and the document badges against the toggle chips (same apps, same rows). A use case with one group per type, or one app, shows no toggle row.
3. Update the vault note `_vaults/atomicaui-usecase-prototype/wiki/gallery/adding-use-cases.md` only for what the task taught, and register any new note in its folder index.
