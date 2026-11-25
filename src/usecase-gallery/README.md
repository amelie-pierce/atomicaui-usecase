# usecase-gallery

A read-only gallery of AtomicAUI component use cases. The URL hash routes to the components grid (`#/`), a component page (`#/Button`) or a use-case detail page (`#Button-002`). Each detail page has one option selector, a Component UI preview, an In context UI preview and one complete document with prose, Anatomy, API and code.

## Structure

```text
src/usecase-gallery/
  apps.ts                 app registry
  define.ts, types.ts     shared types and define helpers
  kit.ts                  the only import boundary for AtomicAUI
  catalog/                glob discovery, validation and snippet extraction
  hooks/                  routing, stage hosting and Anatomy highlighting
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

The detail page has exactly one option selector. Choosing it updates the Component UI, In context UI, Anatomy, app badges and complete Document together. There is no Component/In context tab or toggle and no Document/Code tab. The document contains both Component UI and In context code sections, plus complete API and Anatomy details. Save and Copy use the selected In context code.

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
      token: 'Button',
      selector: '[data-ug-part="button"]',
      description: 'The visible Submit action for this UI.',
      code: '<Button>Submit</Button>',
    },
  ],
  options: [
    {
      id: 'primary-submit',
      name: 'Primary solid submit',
      apps: ['hcs'],
      source: { hcs: 'src/.../form.tsx' },
    },
  ],
});
```

The catalog loads `Scene` and `Example` from `options/<id>/scene.tsx` and `example.tsx`. The first option's Component UI remains `example.tsx` at the use-case root; later options have their own example file.

## Anatomy and document quality

Anatomy is authored per use case and option, not generic boilerplate. Re-audit it against the mounted UI whenever the option changes. Every visible part must have one shared part id linked to the exact element through a selector or `data-ug-part`. Include a specific description, usage notes, states, accessibility information and a code sample for every part. Hide only a part the selected UI genuinely does not render.

For a dialog, list the actual rendered shell and content: overlay when present, container/popup, header/title, close icon, body/content, footer and each action button. If a body contains a form, accordion or radio list, describe the actual visible controls and keep their code in the selected option's document. The existing Anatomy hook and highlight overlay use these links for hover and keyboard focus.

## In context scenes

`scene.tsx` is the selected option's real app context. It receives `{ children, host }`, places the Component UI where the source app places it and retains every visible part of that UI. Keep scenes minimal but faithful; use mock data only for content. Record source paths for the apps listed on the option and explain deliberate omissions in `how`.

Portaled Dialog, Popover and Tooltip parts use the stage host and preview-only props (`open`, `modal={false}`, `container={host}`, `anchor={host}`) that `catalog/snippet.ts` strips from copied code. Popover and Tooltip scenes are open and non-modal so the visible popup can be inspected. The stage is the preview's frame; do not add a page-covering overlay outside it.

## Code and validation

`example.tsx` and each option scene are read with Vite `?raw`, so previews and code stay together. Keep `return` as the final statement of `Example`. The catalog validates ids, options, scenes, examples, Anatomy links and that the union of option `apps` equals the use case `apps`.

Run `npm run build`, then use a real browser to sweep every component, use case and option. Check deep links such as `#Dialog-001` and `#Dialog-002`, confirm no blank page, all parts hover/focus correctly, code and Anatomy follow the selected option, and the console has no errors.
