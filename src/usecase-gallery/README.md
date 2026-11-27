# usecase-gallery

A read-only, single-page gallery of AtomicAUI component use cases. Desktop uses three resizable panels: the component tree and document default to 30% each, and the preview takes the remaining 40%. The tree can collapse from the page header; its state persists for the current tab. At narrow widths the tree, preview and document stack into one scrolling column. UI-type groups and use cases nest below each component. When a component has one same-named UI type, the redundant type level is omitted; components with multiple UI types keep every group. Selecting a use case keeps its preview and complete document open beside the tree. Hashes such as `#/Button` open that component's first use case and `#/Button/Button-002` select a specific case; legacy `#Button-002` links continue to work. Each selected case has one option selector, a Component UI preview, an In context UI preview and one complete document with prose, Anatomy, API and code.

## Structure

```text
src/usecase-gallery/
  apps.ts                 app registry
  define.ts, types.ts     shared types and define helpers
  kit.ts                  the only import boundary for AtomicAUI
  catalog/                glob discovery, validation and snippet extraction
  hooks/                  routing, stage hosting, stage fit and Anatomy highlighting
  ui/                     tree navigation and detail panes
  styles/gallery.scss     layout and token-based chrome
  usecases/
    <component>/
      <component>.meta.ts
      <Component>-<NNN>/
        example.tsx
        usecase.ts
        options/
          <option-id>/
            scene.tsx
            example.tsx       every option after the first
```

Everything under `usecases/` is discovered automatically. Never edit `src/vendor/atomic-aui`; use the existing kit exports, AtomicAUI tokens, fonts and icons.

## One use case = one business action

The tree is component > UI type > use case, rendered with the kit's `TreeView`. Components follow the catalog order; the active component and UI type expand for the selected use case. A use case is one business action such as Submit, Download CSV, Reset inputs or Delete template. The title names that action. UI types distinguish structure, not where the component is used. A composite UI whose action is the whole modal belongs to Dialog or AlertDialog, not Button.

## Options: the selection-based detail page

Every use case has `options` in `usecase.ts`. One option is one distinct rendered UI of the action, including an enabled/disabled state, icon treatment, app-specific structure or context. Option names describe the rendered UI in about 2 to 4 concise words, never the app, and are unique within the use case. Do not use generic labels such as `UI variant 2`, `Variant 3` or `Option 4`; the catalog rejects these and duplicate names. Apps with identical rendered UI can share an option; a measured difference gets a different option.

The detail page has exactly one option selector: the `Component` / `In context` toggle is on the left of the preview header and the select is on the right. Choosing a view updates the preview and the entire right-hand document together, including prose, Anatomy, app badges, references and code. The Component view always appears. Add the In context view only when its scene adds real surrounding app UI; when it has no surrounding context (for example, Tooltip-001's isolated gear trigger and tooltip), set `showContext: false` and show only Component. Author context-specific prose under the option's `contextDocument`; fields omitted there reuse use-case prose only when it accurately describes both views. Code shows just the selected view: the Component code is `example.tsx`; the In context code is generated from the selected option's `scene.tsx` plus its example and must reproduce the preview. Copy buttons inside the document copy the selected view's code.

The gallery toolbar places the collapsible tree control and AtomicAUI name at the left, with a live search field at the right. Search matches component names, use case ids, titles and summaries; matching component and use-case groups expand in the tree. Tree collapse is stored in `sessionStorage` for the current tab.

Example shape:

```tsx
// example.tsx — Component UI for the first option
import { Button } from '../../../kit';

export default function Example() {
  return <Button aui={{ color: 'primary', paint: 'solid' }}>Submit</Button>;
}
```

```tsx
// usecase.ts
import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Submit button',
  apps: ['hcs'],
  summary: '...',
  where: '...',
  when: '...',
  how: '...',
  anatomy: [
    {
      id: 'button',
      name: 'Button',
      selector: '[data-ug-part="button"]',
      description: 'The visible Submit action for this UI.',
    },
  ],
  options: [
    {
      id: 'primary-submit',
      name: 'Primary solid submit',
      apps: ['hcs'],
      source: { hcs: 'src/.../form.tsx' },
      contextDocument: {
        summary: 'The Submit button within the form footer.',
        where: 'The form footer in the edit pane.',
        when: 'Use when submitting the completed form.',
        how: 'The scene places the button next to the form fields.',
      },
    },
  ],
});
```

The catalog loads `Scene` and `Example` from `options/<id>/scene.tsx` and `example.tsx`. The first option's Component UI remains `example.tsx` at the use-case root; later options have their own example file.

## Anatomy and document quality

Component Anatomy stays authored on the use case and describes the component UI. Each option can author `contextAnatomy` for parts added by its In context scene; the context view combines those parts with the component Anatomy. An option whose control, Anatomy or explanation differs in the Component view overrides it with `componentAnatomy` (parts matched by `id`), `componentLayers` and `componentDocument`; Select-002 shows the pattern. Re-audit both against their mounted views whenever the option changes. Every visible part must have one shared part id linked to the exact element through a selector or `data-ug-part`. Include a specific description, usage notes, states and accessibility information for every part. Anatomy steps show only the part's name and its description: no code sample, code block, or component-token chip (`Button.Icon`) under a step. Hide only a part the selected UI genuinely does not render.

For a dialog, list the actual rendered shell and content: overlay when present, container/popup, header/title, close icon, body/content, footer and each action button. If a body contains a form, accordion or radio list, describe the actual visible controls and keep their code in the selected option's document. Hovering or keyboard-focusing a step highlights its element in the preview (a mouse click does not keep the highlight); the preview never changes Anatomy. The highlight is an out-of-flow overlay that sits beside the scrolling stage, never inside it, so it cannot change the stage's scroll size.

## Layer lessons

The right-hand pane can switch between the complete Document and a Layer lesson. Every use case must author a `layers` array for its Component view, and every option must author `contextLayers` for parts introduced by its scene (use an explicit empty array when the scene adds none). Keep each sequence in logical outer-to-inner order. Add one step for every visible part the selected UI allows users to understand separately: wrappers, overlays, containers, headers, titles, close controls, body groups and their visible controls, footers and each action. Dialog and dialog-like lessons must put every footer action after the body and footer container. A step contains a stable id, title, short explanation, key idea and selector for the exact preview element. Keep the user-facing explanation to one short line; key ideas remain authoring validation metadata and are not repeated in the lesson. If text itself is a separate layer, wrap it in a marked element such as `<span data-ug-part="title-text">`; do not rely on direct text-node mutation.

Every lesson and every layer key idea is required in all builds; the catalog has no Anatomy fallback. A step explanation is one distinct, plain-language line of 8 to 12 words. A key idea is specific to its layer, distinct from its explanation and all other key ideas in that use case, and reused at most three times across the catalog. Write each from the actual title and explanation; do not use generic templates, keyword-generated text, or “builds on” phrasing. Component and context selectors are applied by CSS rendered from React state in `hooks/use-layer-visibility.ts`; component selectors stay within the example root and its dedicated portal host, while context selectors can target scene content inside or outside the portal host. Never set attributes on example or scene DOM nodes or observe them to reveal layers; the only exception is the transient `data-ug-footprint` marker on measured-empty targets. Keep hidden future parts out of layout, focus and interaction, and verify each step against the mounted view.

In context lessons show that option's outer scene layers first, followed by the Component sequence inside it. Selecting a lesson step reveals its layer and all earlier layers in the preview; later layers are fully hidden. The active layer is called out with the same out-of-flow Anatomy overlay. Each active-target wrapper that measures zero-size in the mounted preview is marked with `data-ug-footprint` and gets a tinted, dashed footprint (a wide element with no children, such as a flex spacer, is never resized and shows only the overlay's thin strip), re-measured on every step (other matches and real content are never resized or recoloured); the overlay stays outside stage layout so it cannot add scrollbars. The lesson also shows the selected view's code and highlights the whole opening tag of each element the active step reveals: the exact JSX tags the selector writes (class component, `data-ug-part` marker, popover trigger or literal `aria-label`, narrowed by position, `:not(...)`, `:has(...)` and enclosing compounds; in In context code, component steps stay inside the inserted example), with new matches highlighted from the previous step. Only where the selector matches no tag, such as for elements a component renders itself, an authored `code` list of tags applies, kept inside the enclosing element where the code writes it; where no tag is written, nothing is highlighted. `npm run validate:layer-code` (part of `npm run build`) fails a `code` entry that names a tag no view writes, or that highlights a wrapper around a more specific tag. Back, Next and numbered step buttons share the same step index, and changing option or view restarts at the first layer. The reusable lesson presentation lives in `ui/docs-pane.tsx`; keep authored layer content beside each use case and option. Catalog validation can check authored fields and selector availability after mount, but cannot prove that two rendered steps look different: it does not execute each lazy scene and compare browser output. Use a real-browser step sweep for visibility, no-flash and no-scrollbar checks.

## In context scenes

`scene.tsx` is the selected option's real app context. It receives `{ children, host }`, places the Component UI where the source app places it and retains every visible part of that UI. `host` is the stage's content wrapper, which `hooks/use-stage-fit.ts` zooms down when the content is larger than the stage. The fit counts content only: a fixed backdrop or viewport frames the stage and is skipped, so a dialog that fits is not shrunk, and fully transparent content (a popup not yet placed) is skipped until it is shown. A preview never scrolls and never clips; a component that does not fit is scaled, and nothing in the stage (a highlight, outline, shadow or fixed frame) may add to its scroll size. Keep scenes minimal but faithful; use mock data only for content. Record source paths for the apps listed on the option and explain deliberate omissions in `how`.

Portaled Dialog, Popover and Tooltip parts use the stage host for the preview. In context code keeps the scene's mock content and strips the preview-only props: the gallery's host `container`/`anchor`, `anchor`/`ref` anchor refs, the `ug-anchored` class, `initialFocus={false}`, `modal={false}`, the bare `open` prop and `data-ug-part` markers. Popover and Tooltip scenes are open and non-modal so the visible popup can be inspected. The stage is the preview's frame; do not add a page-covering overlay outside it.

## Code and validation

`example.tsx` and each option scene are read with Vite `?raw`, so previews and code stay together. Keep `return` as the final statement of `Example`. The catalog validates ids, options, scenes, examples, Anatomy links and that the union of option `apps` equals the use case `apps`.

Run `npm run build`, then use a real browser to sweep every component, use case and option. Check deep links such as `#Dialog-001` and `#Dialog-002`, confirm no blank page, all parts hover/focus correctly, Anatomy follows the selected option, no preview scrolls, and the console has no errors.
