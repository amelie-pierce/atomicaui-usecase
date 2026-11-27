---
name: usecase-builder
description: Load before adding or changing a use case, its option UI, documentation, Anatomy or apps, or adding an app to the registry. Covers the business-action taxonomy, option-based detail page, app-specific scenes and validation.
---

# usecase-builder

`src/usecase-gallery/README.md` is the folder how-to; this skill contains the procedure and rules for use-case work. Read `_vaults/atomicaui-usecase-prototype/wiki/index.md` first, then the README sections you need. Live code wins over both: `define.ts`, `types.ts`, `apps.ts`, `catalog/build-catalog.ts`, `ui/render-pane.tsx` and `ui/docs-pane.tsx`.

## Keep the structure

- One folder per use case: `src/usecase-gallery/usecases/<component>/<Component>-<NNN>/` with `usecase.ts`, `example.tsx`, and one or more `options/<option-id>/scene.tsx` files. Additional options also have `example.tsx`.
- Discovery is automatic (`import.meta.glob` in `catalog/catalog.ts`); a new use case, component or option needs no registry or shell edit.
- `src/usecase-gallery/kit.ts` is the only file that imports AtomicAUI. Use AtomicAUI tokens, fonts and icons only; never edit `src/vendor/atomic-aui`.
- Examples and scenes are read-only: fixed props, no state and no controls. Keep `return` the last statement of `Example`, because the document extracts code from these files.

## One use case = one business action

The single-page gallery keeps Components > UI type > use case in a collapsible left tree. If a component has exactly one UI type and its label matches the component name after case and whitespace are ignored, that redundant type level is omitted. The same rule treats `CardGroup` and `Card Group` as equal; when there are multiple UI types, every level stays. A use case is one business action: Submit, Download CSV, Back to top, Accept licence, Reset inputs or Delete template. A composite UI whose action is the whole modal belongs to Dialog or AlertDialog, not Button. The title names the action. The tree uses catalog order and UI-type grouping; the active component and UI type expand around the selected case. `#/Component` opens that component's first case, `#/Component/UseCaseId` selects a case, legacy `#UseCaseId` links still work, and unknown hashes fall back to the first catalog case.

- UI types distinguish structure (for example Button's Single button, Button group and Icon button), not the place where the UI appears.
- Apps with the same rendered UI may share one option. A visibly different state, structure, icon, close affordance, scale, label treatment or context is a separate option; a different business action is a separate use case.
- Compare rendered styles and behavior in a real browser, not source code alone. Read every visible element, including body content, footer actions, close affordances, overlays, icons and hover content.
- The example is the main-purpose component named by the use case. Supporting content belongs in the selected option's In context scene. A Dialog example includes its Popup, Title, close control and Body; Dialog body content is not omitted from the Anatomy or scene when it is rendered.

## Decide where the use case belongs

If the prompt explicitly names the placement, follow it exactly without asking (for example, add an option to `Button-007`, create a new component group `Slider`, or reuse `Dialog`). Otherwise, first inventory the existing component groups and use cases, then decide without asking:

- An existing business action with a different rendered UI becomes a new option on that use case.
- The same rendered UI used in another app adds that app to the existing option.
- A new business action becomes a new use case with the next unused number in its component group.
- A component that is not in the gallery becomes a new component group.

Record every placement decision and its reason in the PR description. Never renumber or merge existing use case ids unless the prompt explicitly asks for it. If the placement cannot be made without renumbering or merging, stop and report that constraint. Never invent a scene without a real source design; report when the source design is missing.

## Add or change a use case

1. Follow the placement decision above. For a new use case, create the folder with the next unused id in its component, appended after the existing use cases; never insert it mid-tree, since that would require renumbering.
2. Write `example.tsx` for the first option and `options/<option-id>/example.tsx` for every additional option. Each Component UI must be the exact control or component rendered for that option.
3. Write `usecase.ts` with `uiType`, `title`, `apps`, `summary`, `where`, `when`, `how`, a specific `anatomy` array and `options`. Each option names the UI, lists its apps, records its source path and has a `scene.tsx`.
4. Build each scene from the real app source, keeping it minimal but faithful. Do not replace app-specific visible structure with generic filler or a shared scene when the UI differs.
5. Re-audit Anatomy whenever the UI changes. Every visible part needs one shared part id and an exact selector or `data-ug-part` link. Include a specific description, usage notes, states and accessibility information for every part. Anatomy steps show only the step title and its description: no code sample, code block or component-token chip under a step. Hide only parts the selected option genuinely does not render. Component Anatomy stays on the use case; an option's `contextAnatomy` adds the parts its In context scene introduces, and an option whose scene adds no surrounding app UI sets `showContext: false`. Follow `src/usecase-gallery/README.md` for the contract.

## Detail page = one selection of options

Every use case uses the same selection model. Desktop has three resizable panels: the collapsible component tree and complete Document (prose, Anatomy, references, code) each default to 30%, while the preview takes the remaining 40%; the tree and Document have 240px minimums and the preview has a 280px minimum. The preview's header holds the `Component` / `In context` toggle on the left and the option select on the right; the chosen option's UI shows below them, one view at a time. The Document / Layer control stays in a sticky header above its content card. Use AtomicAUI `Panels` and its keyboard-accessible resize handles; tree collapse state is stored in session storage. The preview stays pinned within its panel while the document panel scrolls; at narrow widths (840px and below) the tree, preview and document stack into one scrolling column.

- List every distinct UI of the action, including enabled and disabled states. Option names describe the rendered UI in about 2 to 4 concise words, never the app; keep labels distinct within the use case and reject generic names such as `UI variant 2`, `Variant 3` or `Option 4`.
- Each option has `options/<id>/scene.tsx`; the first option uses the use case's `example.tsx`, and every later option has its own `example.tsx`.
- The union of option `apps` must equal the use case `apps`; the catalog validates this. The selected option's app badges and document must match.
- The document follows the selected view and shows only that view's code (`example.tsx` for Component, the composed scene snippet for In context). The document's Copy buttons copy the selected view's code.
- Anatomy highlight is one-way: hovering or keyboard-focusing a step highlights its element in the preview; hovering the preview never changes Anatomy, and a mouse click on a step leaves no sticky highlight.
- The highlight overlay is a sibling of the scrolling stage (`ug-render__viewport`), never a child: inside the stage it counts as scrollable overflow and toggles a scrollbar on and off in a loop (the `#Dialog-007` scrim flash). Nothing added by the gallery chrome may change the stage's scroll size.
- A preview never scrolls. `hooks/use-stage-fit.ts` zooms content that is larger than its stage down to fit, in one measurement and without hunting; it skips fixed backdrop/viewport frames. Never clip it with `overflow: hidden` or a per-use-case size hack.
- Switching option is a transition, so the old UI stays until the new example has loaded: the stage must never blank between options.
- Check every option in the browser: all visible parts are present and hoverable, the preview has no scrollbar (also while hovering each Anatomy step: watch `scrollWidth`/`clientWidth` per frame for a toggling bar), the zoom settles on the first frame, the page is not blank, deep links such as `#Dialog-002` work, and the console has no errors.

## In context rules

0. A scene shows the least that explains the container and the action, but it must retain every visible part of the actual selected UI. State deliberate omissions in `how`.
1. Each scene maps to a real source design. Record `source` paths for the apps listed on the option and name the source in the scene comment.
2. One scene belongs to one option. Group apps only when their rendered UI matches exactly; never merge a measured difference or invent a missing part.
3. Popover and Tooltip scenes are open and non-modal in the stage (`container={host}`, anchored positioner and room for the popup). Dialog scenes include the rendered shell parts and body content, with preview-only props stripped from copied code.
4. Use the kit exports and AtomicAUI tokens. Use mock data only for content; do not introduce app-specific raw colors, fonts, icons or arbitrary pixel values.

## Anatomy and document quality

Anatomy is authored data in each `usecase.ts`, not generic component boilerplate. Audit the mounted Component and In context UI together. For a dialog, for example, include only what the selected UI renders, such as overlay, container, header/title, close icon, body/content, footer and action buttons, each linked to the exact element. A selector must resolve to the part in the preview; nested parts use the shared id and the existing highlight logic. Descriptions, usage, state and accessibility must name the actual labels, controls, props and behavior of that option.

## Layer lessons

- Every use case must author a Component `layers` sequence beside its Anatomy in `usecase.ts`; every option must author `contextLayers` beside its `contextAnatomy`, including an explicit empty array when its scene adds no context-only parts. Each step has a stable `id`, meaningful `title`, `explanation`, `keyIdea` and exact stage `selector`. Order the array explicitly from outer to inner and split each visible structure as finely as the rendered UI permits: wrappers/overlays, containers, headers/titles, close controls, body parts and controls, footer containers and each action. Do not rely on Anatomy order or name-based ranking as the authored build order.
- Every `keyIdea` is a short, useful takeaway written for that exact layer. It must differ from its explanation, differ from every other key idea in the same use case (including its options), and appear no more than three times across the catalog. Derive it from the actual layer title and explanation; do not reuse generic templates, keyword-generated text, or “builds on” phrasing. The catalog requires every layer and key idea in every build; there is no Anatomy fallback, including in development. Missing authored data fails with the use case id.
- If a text node needs its own layer, wrap it in a marked element (for example `<span data-ug-part="title-text">About</span>`). Never mutate React-owned text or preview nodes to reveal a step. `hooks/use-layer-visibility.ts` returns CSS rules from the active lesson state; component selectors stay within the example root and its dedicated portal host, while context selectors can target scene content inside or outside the portal host.
- In context lessons list the selected option's outer scene layers first, then Component layers inside it. Keep lesson content with use-case and option data; the shared lesson UI only presents it.
- The preview hides every layer after the active step. A later part must not be visible, focusable or interactive until reached. Layer selection changes the preview and lesson together; changing use case, option, or Component / In context restarts at the first step.
- The Document / Layer control belongs to the right pane. Lessons provide numbered step navigation, Back and Next controls, a step title, explanation and key idea. Keep buttons keyboard accessible and the step list usable at narrow widths.
- Use AtomicAUI tokens, fonts, components and icons only. Keep Anatomy hover one-way and ensure hiding or revealing layers never introduces preview scrollbars or flicker.

## Renumber ids

Ids are `<Component>-<NNN>`, contiguous from 001 per component in tree order. Never renumber or merge existing ids unless the prompt explicitly asks. If an explicitly requested change requires renumbering, build one old-to-new map, rename folders in temporary phases to avoid collisions, update all source references and record the map in the PR description. The URL hash is the id and has no alias unless explicitly requested.

## Check the work

1. `npm run build` passes and the single-page tree renders every catalog component, UI type and use case.
2. Catalog validation finds no missing option, scene, example, anatomy link or app mismatch.
3. In a real browser, sweep every use case and every option, checking every layer step and navigation boundary in Component and In context views. Confirm Component UI, In context UI, Anatomy highlights, descriptions, the document's code and badges all change together; verify representative deep links including `#Dialog-001` and `#Dialog-002`, no blank pages, no flicker, no preview scrollbar and no console errors.
4. Update `_vaults/atomicaui-usecase-prototype/wiki/gallery/adding-use-cases.md` only for durable facts learned in the task.
