---
name: usecase-gallery
description: Load before adding or changing a use case, its option UI, documentation, Anatomy or apps, or adding an app to the registry. Covers the business-action taxonomy, option-based detail page, app-specific scenes and validation.
---

# usecase-gallery

`src/usecase-gallery/README.md` is the folder how-to; this skill contains the procedure and rules for use-case work. Read `_vaults/atomicaui-usecase-prototype/wiki/index.md` first, then the README sections you need. Live code wins over both: `define.ts`, `types.ts`, `apps.ts`, `catalog/build-catalog.ts`, `ui/render-pane.tsx` and `ui/docs-pane.tsx`.

## Keep the structure

- One folder per use case: `src/usecase-gallery/usecases/<component>/<Component>-<NNN>/` with `usecase.ts`, `example.tsx`, and one or more `options/<option-id>/scene.tsx` files. Additional options also have `example.tsx`.
- Discovery is automatic (`import.meta.glob` in `catalog/catalog.ts`); a new use case, component or option needs no registry or shell edit.
- `src/usecase-gallery/kit.ts` is the only file that imports AtomicAUI. Use AtomicAUI tokens, fonts and icons only; never edit `src/vendor/atomic-aui`.
- Examples and scenes are read-only: fixed props, no state and no controls. Keep `return` the last statement of `Example`, because the document extracts code from these files.

## One use case = one business action

The tree is Components grid (`#/`) > component page (`#/Button`) > use case (`#Button-007`). A use case is one business action: Submit, Download CSV, Back to top, Accept licence, Reset inputs or Delete template. A composite UI whose action is the whole modal belongs to Dialog or AlertDialog, not Button. The title names the action.

- UI types distinguish structure (for example Button's Single button, Button group and Icon button), not the place where the UI appears.
- Apps with the same rendered UI may share one option. A visibly different state, structure, icon, close affordance, scale, label treatment or context is a separate option; a different business action is a separate use case.
- Compare rendered styles and behavior in a real browser, not source code alone. Read every visible element, including body content, footer actions, close affordances, overlays, icons and hover content.
- The example is the main-purpose component named by the use case. Supporting content belongs in the selected option's In context scene. A Dialog example includes its Popup, Title, close control and Body; Dialog body content is not omitted from the Anatomy or scene when it is rendered.

## Add or change a use case

1. Name the business action. Add or update an option if the action already exists; otherwise create the folder at its tree position and renumber later ids when needed.
2. Write `example.tsx` for the first option and `options/<option-id>/example.tsx` for every additional option. Each Component UI must be the exact control or component rendered for that option.
3. Write `usecase.ts` with `uiType`, `title`, `apps`, `summary`, `where`, `when`, `how`, a specific `anatomy` array and `options`. Each option names the UI, lists its apps, records its source path and has a `scene.tsx`.
4. Build each scene from the real app source, keeping it minimal but faithful. Do not replace app-specific visible structure with generic filler or a shared scene when the UI differs.
5. Re-audit Anatomy whenever the UI changes. Every visible part needs one shared part id and an exact selector or `data-ug-part` link. Include a specific description, usage notes, states, accessibility information and a code sample for every part. Anatomy code samples render as plain inline text, never as a block code box (`pre`, Copy bar). Hide only parts the selected option genuinely does not render.

## Detail page = one selection of options

Every use case uses the same selection model. The option list is a vertical radio group on the LEFT, above the Document; it drives the Component UI, In context UI, app badges, Anatomy and one complete Document. The right column holds the preview with a `Component` / `In context` toggle (the only toggle; options never go there). There is no Document/Code tab.

- List every distinct UI of the action, including enabled and disabled states. Option names describe what the UI is, never the app.
- Each option has `options/<id>/scene.tsx`; the first option uses the use case's `example.tsx`, and every later option has its own `example.tsx`.
- The union of option `apps` must equal the use case `apps`; the catalog validates this. The selected option's app badges and document must match.
- The document includes complete prose, Anatomy and both Component UI and In context code sections. Save and Copy use the selected In context code.
- Check every option in the browser: all visible parts are present and hoverable, the page is not blank, deep links such as `#Dialog-002` work, and the console has no errors.

## In context rules

0. A scene shows the least that explains the container and the action, but it must retain every visible part of the actual selected UI. State deliberate omissions in `how`.
1. Each scene maps to a real source design. Record `source` paths for the apps listed on the option and name the source in the scene comment.
2. One scene belongs to one option. Group apps only when their rendered UI matches exactly; never merge a measured difference or invent a missing part.
3. Popover and Tooltip scenes are open and non-modal in the stage (`container={host}`, anchored positioner and room for the popup). Dialog scenes include the rendered shell parts and body content, with preview-only props stripped from copied code.
4. Use the kit exports and AtomicAUI tokens. Use mock data only for content; do not introduce app-specific raw colors, fonts, icons or arbitrary pixel values.

## Anatomy and document quality

Anatomy is authored data in each `usecase.ts`, not generic component boilerplate. Audit the mounted Component and In context UI together. For a dialog, for example, include only what the selected UI renders, such as overlay, container, header/title, close icon, body/content, footer and action buttons, each linked to the exact element. A selector must resolve to the part in the preview; nested parts use the shared id and the existing highlight logic. Descriptions, usage, state, accessibility and code must name the actual labels, controls, props and behavior of that option.

## Renumber ids

Ids are `<Component>-<NNN>`, contiguous from 001 per component in tree order. When adding, merging, splitting or removing a use case, build one old-to-new map, rename folders in temporary phases to avoid collisions, update all source references and record the map in the PR description. The URL hash is the id and has no alias unless explicitly requested.

## Check the work

1. `npm run build` passes and every component page renders all use-case cards.
2. Catalog validation finds no missing option, scene, example, anatomy link or app mismatch.
3. In a real browser, sweep every use case and every option. Confirm Component UI, In context UI, Anatomy hover highlights, descriptions, code samples and badges all change together; verify representative deep links including `#Dialog-001` and `#Dialog-002`, no blank pages and no console errors.
4. Update `_vaults/atomicaui-usecase-prototype/wiki/gallery/adding-use-cases.md` only for durable facts learned in the task.
