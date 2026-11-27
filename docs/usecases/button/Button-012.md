# Button-012: Launch general tutorial button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-012/usecase.ts`

## What it is

A borderless text Button on the last step of a topic tour starts the General Tutorial.

## When to choose it

Use it to send a reader who finished a focused tour to the general one. Do not use it as the tour exit; that is End (Button-024).

## Where it belongs

The coach-mark card of an HS tour, on the last step of every topic except the General Tutorial, between the step text and the Previous / End row. Real site source: HS Tutorials.tsx (launchGeneral). Only HS has it.

## Usage guidance

Set aui scale "sm", paint "text", color "secondary" and sx alignSelf "start", so the label sits at the start of the card instead of stretching. The label is typed in capitals (LAUNCH GENERAL TUTORIAL). The scene keeps the card, its close X and the one-line step text; the Previous / End row and counter are left out (Button-024 shows them), and the target is the gallery's shared stand-in.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `IconButton`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `paint`: `solid`, `text`
- `color`: `secondary`, `surface`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Container** — The Launch General Tutorial Button on the last step of an HS tour: small secondary text paint with alignSelf "start" so it hugs the start of the coach-mark card. Selector: `[class~="aui-button"]:not([aria-label="Close walkthrough"])`. Layer step: **Container** — Small secondary Launch General Tutorial link sits at the final step’s start.
2. **Label** — The capitalised text "LAUNCH GENERAL TUTORIAL" that starts the HS General Tutorial. Selector: `[class~="aui-button"]:not([aria-label="Close walkthrough"])`. Direct text is highlighted.

## Apps

- HS (`hs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Launch general tutorial (`hs-launch`)

Apps: HS

In context source: HS: `src/hs/Tutorials.tsx`

In context view: Shown.

#### In context structure additions

1. **Walkthrough card** — The elevated Walkthrough region over the tour target that holds the step text and the launch button. Part marker: `data-ug-part="walkthrough-card"`. Layer step: **Walkthrough card** — Elevated walkthrough card pairs step text with its launch action.
2. **Close button** — The X IconButton in the card corner (aria-label "Close walkthrough"). Part marker: `data-ug-part="walkthrough-close"`. Layer step: **Close button** — The X IconButton in the card corner (aria-label "Close walkthrough").
3. **Step text** — The body "Find a solution. See the General tutorial for more information on the Results Table." with 24px kept at its end for the close X. Part marker: `data-ug-part="step-text"`. Layer step: **Step text** — Find a solution note leaves 24px at its end for Close.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-012/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary', sx: { alignSelf: 'start' } }}>
      LAUNCH GENERAL TUTORIAL
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-012/options/hs-launch/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// HS TutorialWalkthrough (src/hs/Tutorials.tsx), the last step of a topic other than the General Tutorial (Joist step 11 of 11): the step has no heading, so the body keeps 24px at its end for the close X, and the launch Button sits between the body and the navigation row (not shown), start-aligned. The target is the gallery's shared stand-in.
export default function HsLaunchScene({ children }: ContextProps) {
  return (
    <div className="ug-tour">
      <MockTourTarget target="beams" />
      <View
        role="region"
      data-ug-part="walkthrough-card"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 228, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          data-ug-part="walkthrough-close"
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingInlineEnd: '24' } }}>
          <Type data-ug-part="step-text" as="p" role="p3">Find a solution. See the General tutorial for more information on the Results Table.</Type>
        </View>
        {children}
      </View>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
