# usecase-gallery

A read-only gallery of AtomicAUI component use cases. The URL hash routes to the components grid (`#/`), a component page (`#/Button`) or a use-case detail page (`#Button-002`). Each detail page has one option selector, a Component UI preview, an In context UI preview and one complete document with prose, Anatomy, API and code.

## Structure

```text
src/usecase-gallery/
  apps.ts                 app registry
  define.ts, types.ts     shared types and define helpers
  kit.ts                  the only import boundary for AtomicAUI
  catalog/                glob discovery, validation and snippet extraction
  hooks/                  routing, stage hosting, stage fit and Anatomy highlighting
  ui/                     gallery pages and detail panes
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

The tree is component > UI type > use case. A use case is one business action such as Submit, Download CSV, Reset inputs or Delete template. The title names that action. UI types distinguish structure, not where the component is used. A composite UI whose action is the whole modal belongs to Dialog or AlertDialog, not Button.

## Options: the selection-based detail page

Every use case has `options` in `usecase.ts`. One option is one distinct rendered UI of the action, including an enabled/disabled state, icon treatment, app-specific structure or context. Option names describe the UI, never the app. Apps with identical rendered UI can share an option; a measured difference gets a different option.

The detail page has exactly one option selector: a select in the header of the left column, beside the view toggle. Choosing `Component` or `In context` updates the preview and the entire right-hand document together, including prose, Anatomy, app badges, references and code. The Component view always appears. Add the In context view only when its scene adds real surrounding app UI; when it has no surrounding context (for example, Tooltip-001's isolated gear trigger and tooltip), set `showContext: false` and show only Component. Author context-specific prose under the option's `contextDocument`; fields omitted there reuse use-case prose only when it accurately describes both views. Code shows just the selected view: the Component code is `example.tsx`; the In context code is generated from the selected option's `scene.tsx` plus its example and must reproduce the preview. Save and Copy use the selected view's code.

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

Component Anatomy stays authored on the use case and describes the component UI. Each option can author `contextAnatomy` for parts added by its In context scene; the context view combines those parts with the component Anatomy. Re-audit both against their mounted views whenever the option changes. Every visible part must have one shared part id linked to the exact element through a selector or `data-ug-part`. Include a specific description, usage notes, states and accessibility information for every part. Anatomy steps show only the part's name and its description: no code sample, code block, or component-token chip (`Button.Icon`) under a step. Hide only a part the selected UI genuinely does not render.

For a dialog, list the actual rendered shell and content: overlay when present, container/popup, header/title, close icon, body/content, footer and each action button. If a body contains a form, accordion or radio list, describe the actual visible controls and keep their code in the selected option's document. Hovering or keyboard-focusing a step highlights its element in the preview (a mouse click does not keep the highlight); the preview never changes Anatomy. The highlight is an out-of-flow overlay that sits beside the scrolling stage, never inside it, so it cannot change the stage's scroll size.

## Layer by layer lessons

The right-hand pane can switch between the complete Document and a Layer by layer lesson. Each use case's `layers` data describes its Component build order; each option may add `contextLayers` for parts introduced by that scene. A step contains a stable id, title, explanation, key idea and selector. The selector targets the exact preview element, normally through its Anatomy selector or `data-ug-part`. `defineUsecase` can derive starter steps from Anatomy; it orders them outer to inner (overlay, container, title, close, body, footer actions), and the preview reveals an ancestor no later than its earliest descendant. Refine broad parts into separate steps when the rendered example has finer pieces, and add a footer actions step for dialog-like use cases.

In context lessons show the Component sequence followed by that option's context-only sequence. Selecting a lesson step reveals its layer and all earlier layers in the preview; later layers are fully hidden. Back, Next, numbered step buttons, Replay and Autoplay / Pause all share the same step index, and changing option or view restarts at the first layer. Autoplay animation and transitions are disabled under `prefers-reduced-motion`. The reusable lesson and preview visibility logic live in `ui/docs-pane.tsx` and `hooks/use-layer-visibility.ts`; keep authored layer content in each use case's `usecase.ts`. Use AtomicAUI styling and verify the first, middle and last layer plus every navigation boundary in the browser.

## In context scenes

`scene.tsx` is the selected option's real app context. It receives `{ children, host }`, places the Component UI where the source app places it and retains every visible part of that UI. `host` is the stage's content wrapper, which `hooks/use-stage-fit.ts` zooms down when the content is larger than the stage. The fit counts content only: a fixed backdrop or viewport frames the stage and is skipped, so a dialog that fits is not shrunk, and fully transparent content (a popup not yet placed) is skipped until it is shown. A preview never scrolls and never clips; a component that does not fit is scaled, and nothing in the stage (a highlight, outline, shadow or fixed frame) may add to its scroll size. Keep scenes minimal but faithful; use mock data only for content. Record source paths for the apps listed on the option and explain deliberate omissions in `how`.

Portaled Dialog, Popover and Tooltip parts use the stage host for the preview. In context code keeps the scene's mock content and strips the preview-only props: the gallery's host `container`/`anchor`, `anchor`/`ref` anchor refs, the `ug-anchored` class, `initialFocus={false}`, `modal={false}`, the bare `open` prop and `data-ug-part` markers. Popover and Tooltip scenes are open and non-modal so the visible popup can be inspected. The stage is the preview's frame; do not add a page-covering overlay outside it.

## Code and validation

`example.tsx` and each option scene are read with Vite `?raw`, so previews and code stay together. Keep `return` as the final statement of `Example`. The catalog validates ids, options, scenes, examples, Anatomy links and that the union of option `apps` equals the use case `apps`.

Run `npm run build`, then use a real browser to sweep every component, use case and option. Check deep links such as `#Dialog-001` and `#Dialog-002`, confirm no blank page, all parts hover/focus correctly, Anatomy follows the selected option, no preview scrolls, and the console has no errors.
