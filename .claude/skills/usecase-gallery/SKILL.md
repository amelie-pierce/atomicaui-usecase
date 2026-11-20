---
name: usecase-gallery
description: Load before adding a use case to the gallery, changing an existing one (its example, docs, In context scenes, cases or apps), or adding an app to the apps registry. Covers the tree (component > UI type > variant), the folder shape, the In context rules (minimal scenes, one per source design, the case radio group, the app-group toggle) and the checks to run.
---

# usecase-gallery

`src/usecase-gallery/README.md` is the how-to for the folder; this skill is the procedure and the rules for use case work.
Read `_vaults/atomicaui-usecase-prototype/wiki/index.md` first, then the README sections you need.
Live code wins over both: `define.ts`, `types.ts`, `apps.ts`, `catalog/build-catalog.ts`, `ui/render-pane.tsx`.

## Keep the structure

- One folder per use case: `src/usecase-gallery/usecases/<component>/<Component>-<NNN>/` with `usecase.ts` (`defineUsecase`) and `example.tsx`, plus `scenes/<case>.tsx` when it has In context cases. Ids are contiguous from 001 per component in tree order (UI type order, then variant order); adding, merging or removing a variant renumbers the component (see Renumber ids).
- Discovery is automatic (`import.meta.glob` in `catalog/catalog.ts`); a new use case, component or scene needs no registry or shell edit.
- `src/usecase-gallery/kit.ts` is the only file that imports the AtomicAUI kit. Every other file imports kit parts from it; add an export there when the kit has the part.
- Use AtomicAUI tokens only: no raw colors or pixel values; tokens come from the kit and `--p-*` variables, with the small inline styles the README allows.
- Examples are read-only: fixed props, no state, no controls. Keep `return` the last statement of `Example`, because the Code view of the right pane (its default mode, beside the Document toggle) is cut from that file.
- Never hand-edit `src/vendor/atomic-aui`.

## Tree: component > UI type > variant

- The gallery tree is component > **UI type** > **variant** (use case). A UI type is a UI told apart by what it is made of and how it renders, never by where it is used: Button has `Single button`, `Button group` (two, three, four or more Buttons shown together as one group, any mix of looks and kinds; main + secondary CTA is only one example) and `Icon button`; the variants inside a type are its looks (`Secondary solid`, `Primary solid`, `Text with leading icon`). The places that use a variant (dialog, walkthrough, popover, table toolbar...) are the In context scenes of that variant, never tree levels; the app toggle stays inside a place. One Button is `Single button`, several shown together are a `Button group` (a lone Download CSV is a Single button, the Back to top + Table Notes pair is a group), and each scene renders the controls of its own place.
- A component lists its UI types, in tree order, in `<component>.meta.ts` (`uiTypes`); each `usecase.ts` sets `uiType` (one of them) and `title` (the variant name, by look). `area` only exists for a variant without `cases` (its one default In context); a variant with `cases` sets no `area`. A component with one UI type named like the component lists its variants directly.
- IconButton is no longer a component: an icon-only control is a variant of Button's `Icon button` type.
- Decide types and variants from measured computed styles in the running gallery (`npm run dev`, a real browser; if chrome-devtools-axi reports BRIDGE_NOT_READY, drive Playwright's headless Chromium from `~/.cache/ms-playwright` with a driver script kept outside the repo): per example read each element's size, colour, border, radius, font, padding and glyph. Same measured look and same code instruction = one variant (places of use become scenes); a different measured look (colour, size, border, icon on or off, an extra part) = another variant; a different structure (one button vs a Button group, text vs icon-only) = another UI type. Record every merge and every kept split with the measured values in the PR description.
- A merged or removed variant closes its gap: renumber the component (Renumber ids) and give the old-to-new mapping in the PR description.

## Group by concept

One use case per concept. Compare use cases by UI (layout and appearance), never by content or data. Two use cases are one when they share the concept and the code instruction (the same parts, props and states a developer writes) and look the same; they differ only by app, type, or the content and data they show (the dialog types of Button-013, the File and Help Center menus of Menubar-001). Apps with the same UI but different content or data (HCS vs ADC) merge into one use case, and the scene shows the content and data differences with mock data, never an app's own labels or records. The variants then live in `cases` and are shown in In context: the type names are the radio group, the apps of a type the toggle (In context rules, below).

- Merge into the lower id, move the other use case's scenes and cases in, rewrite `title`, `summary`, `where`, `when` and `how` once for the whole concept, and delete the other folder (then renumber the component).
- Use cases that support different purposes of the same-looking control (Button-011: adding the chosen result vs appending an empty entry) are different places (cases) of one variant, shown in the In context radio group.
- The area name and the context never split a use case. The same control in a dialog, an input panel and above a table is one use case whose places of use are the In context radio group (Checkbox-001: Dialog option, Input panel option, Table filter), and a dialog footer that renders as the Cancel and Confirm pair is a place of Button-013 even when its area sounds different (the welcome dialog under Walkthrough). Before keeping a split, measure computed styles in the running gallery for each context and state the values: a split needs a measured difference in the control or a different code instruction. A visible group title against an aria-label, and a state such as `readOnly` or `disabled`, are differences of the place inside one variant, not a split (Checkbox-002: the viewer groups and the read-only Print summary are places of one variant); a label, a container or a spacing difference does not either. A split needs a measured difference in the control's rendered look or a different structure. A scene that shows a context writes its own control and label; it does not take the label from a shared example.
- An icon-only control (a close X, a kebab, a help trigger) is a variant of Button's `Icon button` type, and its Component tab shows the IconButton kit part. Controls with the same look but in different overlays merge as places of one variant (Button-020: the close X of a help popover, a walkthrough card and a dialog); a trigger or wrapper kit part (`Panels.Trigger`, `Dialog.Close`) is written in the In context scene, not the example.
- Do not merge when the code instruction differs (another part, a wrapper, a compound form; not a state such as `readOnly` or `disabled`, and not a visible title against an aria-label), when the trigger or control is a different kind, or when only the container sounds alike. Say the reason for each kept split in the PR description.
- Recheck this rule for the component's other use cases whenever you add or change one.

## Component tab shows the main-purpose component

The Component tab (`example.tsx`) is the code a user copies for the use case's main purpose: the component the use case is named for. A Dialog use case's example is the Dialog (Popup, Title, close X, Body), not the Accordion, RadioGroup or form inside it. A supporting component (an Accordion in an About dialog, the Radio list of a template picker) appears only in the In context scene, which writes it in place of the `{children}` slot, to clarify how it is used there. A Dialog example is forced open into the stage with `const host = useStageHost()` and `container={host}` (preview-only props the copied snippet strips). Recheck this for every use case of the component whenever you add or change one, and state each changed and each deliberately unchanged use case, with the reason, in the PR description.

## Add a use case

1. Find the UI type and variant by measurement (Tree section): if a measured-identical variant exists, add a place (scene and case) to it instead of a new use case. Otherwise create the folder at its tree position (UI type, then variant order) and renumber the later ids (Renumber ids); add a new UI type to `uiTypes` in `<component>.meta.ts` only when the structure differs.
2. Write `example.tsx` with the fixed-props example.
3. Write `usecase.ts` with `uiType`, `title` (the variant name), `apps`, `summary`, `where`, `when` and `how`, plus `area` (default In context) when it has no `cases`. `apps` lists keys from `apps.ts`; each `where` names the real app source it mirrors.
4. For a variant with `area`: if the area has no context in `contexts/`, add `contexts/<area-slug>.tsx`; if this use case sits elsewhere in its area, set `contextVariant` and add the variant file.
5. If the use case has In context scenes, follow the next section.

## Change a use case

Edit in place and keep its id. A change to `example.tsx` changes the Component preview and the Code view together; a change to a scene changes the In context preview and its code. Update `where`, `when` and `how` when the behavior they describe changes. The Document is what the AI reads for context, so keep it accurate to the example and the scene. A change keeps its id; renumbering happens only when a variant is added, merged or removed.

## In context rules

0. **Minimal scenes.** An In context scene shows the least that tells the user what the container is and where the button lives: no extra columns, rows, fields, toolbars, helpers or sample text (one data row, or two only when two button types must show). Keep the container semantics and record the HCS source path; this deliberately trades HCS 1:1 completeness for minimal code. State what the scene leaves out in the use case's `how`.
1. **One scene per source design.** Each In context scene maps 1:1 to a screen or container of the source design (the app's repo `amelie-pierce/<app>-design-prototype`, HCS first), and is built from the real source file, not from memory of how it looks, then cut down to the minimal container above. Components, props and placement follow that app's source; only mock data is cut. Record where it came from in `usecase.ts`: `source: { hcs: '<path in hcs-design-prototype>', ace: '<path in ace-design-prototype>', ... }` for the use case (one path per listed app), and `source: { <app>: '<path>' }` on a case for the apps of that group when the scene comes from other files. Do not merge two different source designs into one scene or split one into several; apps that write the same dialog share one scene (rule 3), named in its top comment and in `how`.
2. **Several places keep the radio group.** A variant with several places of use (the dialogs of Button-013) lists them in `cases` and shows the radio group of place names. The radio names are places, never UI types (the UI type is the tree level). One case, or none, shows no radio group.
3. **One scene per distinct UI; apps are grouped, never copied.** When apps write the same use case differently, each distinct UI is one case with `apps: [...]` (the group of apps that share it) and one scene file. Never copy a scene for an app whose UI is the same: list that app in the group.
   - **Group by what the UI looks like and does, not by source code.** One rule: merge apps whose rendered look and behaviour match, even when their source differs; split when the look or behaviour visibly differs. Compare text, button set and positions, icons, close affordance, tooltip, variant, scale, shape, icon weight and colour tokens. Merge when apps differ only in size (modal or popup width or height) or in an app-side defect (a close X the app lacks or hides, a missing control): the group's scene is the standard UI with the full parts, the size difference is noted in the scene comment and in `how`, and the defect stays out of the code and goes in the PR description (app, what is missing, which standard). Split when scale, shape, icon weight, variant, icons, tooltip or button set differ. Body fields and wording do not count (`Send` and `Submit` in the same footer are one UI). The PR description lists every merge and every kept split with its reason.
   - **Compare rendered styles, not source.** Decide a merge or a split from computed styles in the running gallery (`npm run dev`, a browser): per scene read each element's text, order, position, size, colour, radius, font, icon glyph and close affordance, and diff two groups element by element. An app's source can differ (scale props, a `Spacer`, local CSS) while the render is the same: HCS and ADM Reset confirm render the same elements and differ only in popup width (560 vs 480) and the close aria-label, so HCS, ACE and ADM are one group, and HCS is never a split by itself. Compare every element (rows, cells, titles), not only buttons, and open what hover reveals (a tooltip); a scene that shows a control disabled hides its enabled colour, so read the scene props too. The standard of a merged group is the HCS or ADM format; record each merged-away app's defect (app, what differs, which standard) in the PR description, never in the code.
   - **Verify every group** against the apps' source (`amelie-pierce/<app>-design-prototype`, the scan reports only navigate); never merge two apps from memory or from a prose note, and re-check an existing merge you rely on: an app's width or X can differ from the app it was assumed to copy.
   - **Types and groups.** Cases with the same `name` are the variants of one type (Reset confirm, Accept licence, ...). Within a type an app belongs to one group; an app that does not have the type is not in it (PBS, AGPD and RWS have no Reset confirm). A case without `apps` is the same in every app and cannot share its name with another case.
   - **In context toggles group by app, property notes are text below.** Every toggle value is the app or the apps of a group, labelled by the app names joined (`ACE, ADM`); never a property (label above or beside, a unit weight, an outline), never `Other apps`, and no `Covers ...` line or tooltip. A difference such as label above vs beside goes in the case's `note`, plain text shown below the scene. Type names (the radio group) name the situation, not a property. The case has no `label` field.
   - **The preview** shows the radio group of the type names, then, when the chosen type has two or more groups, a toggle of the groups under it, each value the apps of the group. One group in the type means no app row; a use case whose types all have one group shows none. Order the groups with the named apps first.
   - **The Document follows the same groups.** `apps` of the use case must equal the union of the case groups; the catalog throws for an app no case shows (a use case an app never has is not listed for it), a case app that is not listed, an app in two groups of one type, a case `source` app outside its group, or the removed `app` field. The Document's "Used in" is then drawn from the groups (a block per type, one row of badges per distinct UI), so it cannot disagree with the toggle. When you add or move an app, change the group, `apps` and the Document text in `how` together.
   - Name a scene file `<first app of the group>-<type>.tsx` (case id the same) with the same type name in every group. Record each app's source file in the case: `source: { hcs: '<path>', fd: '<path>' }` (one path per app of the group); the use case `source` keeps one path per app.
   - A Popover or Tooltip scene is built open and non-modal (`container={host}`, positioner `className="ug-anchored"`, an inline min-block-size on a wrapper for room); a trigger an app makes with `render` (a Button with a `ContainedIcon` child) is written the same way. Where two apps differ only in the trigger or the close, they are separate groups (Button-020, Button-020/022).
   - **Also a different UI:** a label's case or weight, even when the app sets it by CSS (ADM, PBS, PFD and FD do for the walkthrough Previous, Next and End), and an icon on or missing from a button. Read the app's CSS as well as its JSX. A type whose control is written the same in every app is one case with `apps` listing them all, so it shows no toggle (Button-020). Where an app styles a control with a class the kit can state as `aui` props (a border, a width), write the props and say so in the scene comment.
   - The kit has no modal-free AlertDialog, so an app's AlertDialog is drawn as a non-modal `Dialog` with the same parts (state it in the scene comment); a width the app caps by the viewport is capped by the stage instead (`min(640px, 100%)`).
   - The apps come from `apps.ts` only (ten today: hcs, ace, adm, pfd, pbs, hs, fd, agpd, rws, adc; `url` is optional, HS and RWS have none); add a new app there first (see the README), never a literal in a use case. Badges render in the primary Chip style.
   - The first group of a type is the default; the choice resets on another use case, and switching type keeps the apps in view.
   - `how` states, per type, which apps are in which group and what differs, in the same words as the group labels.

Shape of a variant with two places (ids and case names are examples):

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

Ids are `<Component>-<NNN>`, contiguous from 001 per component in tree order (components A-Z by title, UI types in `uiTypes` order, variants of a type in id order). When a variant is added, merged or removed:

1. Build one old-to-new map for the component from that order.
2. Rename the folders in two phases (old -> temporary suffix -> new) so ids never collide, and rewrite every reference with the same map in one pass (`usecase.ts` cross references, scenes, `how` and `when` texts, README, this skill, the wiki note; also shorthand such as `Button-020/022`).
3. Put the map table in the PR description. The URL hash is the id and the gallery keeps no alias for old ids; do not invent one unless asked.

## Check the work

1. `npm run build` passes; the catalog validation throws at startup for a bad id, a missing scene, or app groups that disagree with `apps` (rule 3). To run the validation without a browser, load `catalog/catalog.ts` through Vite's `ssrLoadModule` in a small node script and print each use case's types and groups.
2. Open the page (`npm run dev`) and check the use case in Component and In context modes, every type and every group, and the Document badges against the toggle chips (same apps, same rows). A use case with one group per type, or one app, shows no toggle row.
3. Update the vault note `_vaults/atomicaui-usecase-prototype/wiki/gallery/adding-use-cases.md` only for what the task taught, and register any new note in its folder index.
