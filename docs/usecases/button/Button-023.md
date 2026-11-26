# Button-023: Walkthrough step navigation buttons

Component family: **Button**

UI type: **Button group**

Source: `src/usecase-gallery/usecases/button/Button-023/usecase.ts`

## What it is

Borderless text Buttons step back and forward through a guided tour: Previous with arrow-left before it, then Next with arrow-right after it.

## When to choose it

Use it for step navigation where no single step is the primary action, so neither Button is filled. Do not use it for form submission; to end the tour use Button-024, and to dismiss a tour early use the close icon (Button-030).

## Where it belongs

The navigation row in the footer of the card of a coach-mark walkthrough, on every step that is not the last. Real site source: the walkthrough card of each app (the paths are in source). ADC has no walkthrough.

## Usage guidance

The props are the same in every app: aui scale "sm", paint "text" and color "secondary" on every Button, Button.Icon arrow-left before the label of Previous (only when step > 0) and arrow-right after the label of Next. Three groups: HCS (mixed case Previous and Next, regular weight, counter pushed to the end by a CSS margin), ACE, HS, RWS and AGPD (PREVIOUS and NEXT typed in capitals, regular weight, counter at the end by justify between) and ADM, PBS, PFD and FD (capitals at the bold weight, which the apps set by CSS on the row's buttons, counter pushed by a CSS margin). The scenes keep the card, its close X, the title, one tip line, the navigation row and the counter, with the app's own step copy; the spotlight target is the gallery's shared stand-in, and the card and spotlight sit at fixed numbers where the app measures them. Icons need the Font Awesome font to show.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `IconButton`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `paint`: `solid`, `text`
- `color`: `secondary`, `surface`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Walkthrough card** — The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row. Selector: `[role="region"][aria-label="Walkthrough"]`.
2. **Close** — The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons. Selector: `[class~="aui-button"][aria-label="Close walkthrough"]`.
3. **Navigation row** — The footer row of the card that holds Previous and Next; ACE, HS, RWS and AGPD nest the two buttons in their own group and put the 2 / 4 counter at the far end, while ADM, PBS, PFD, FD and HCS push the counter right with an auto margin. Selector: `[data-ug-part="step-nav"]`.
4. **Previous** — Borderless secondary text button with arrow-left before the label; ACE, HS, RWS and AGPD type it as PREVIOUS, HCS keeps mixed case. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
5. **Arrow-left icon** — The arrow-left glyph before the label, pointing the way the tour goes back. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]`.
6. **Next** — Borderless secondary text button that advances to the next step; its arrow-right trails the label so the pair reads as back and forward. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
7. **Trailing icon** — The arrow-right glyph after Next, the mirror of the arrow-left before Previous. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]`.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Step navigation (`hcs-step-nav`)

Apps: HCS

In context source: HCS: `src/components/F01Walkthrough.tsx`

In context view: Shown.

#### In context structure additions

1. **Spotlight target** — The page element the tour is pointing at, here the Beam Properties section header that the card sits beside (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the step (Split-Pane Slider, Multi Design or Beam Properties) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row (for example 2 / 4) that tells where the user is in the tour. Selector: `[data-ug-part="step-counter"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-023/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
        Previous
      </Button>
      <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        Next
        <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
      </Button>
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-023/options/hcs-step-nav/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// HCS F01Walkthrough step 3 of 6 (Beam Properties): a spotlight around the target and the 328px card beside it (to its right, level with its top). In the app both are position: fixed at measured rectangles; here they sit at fixed numbers in the stage frame. Labels are mixed case (Previous, Next) at the regular weight, and the counter is pushed to the end by a CSS auto margin (inline here).
export default function HcsStepNavScene({ children }: ContextProps) {
  return (
    <div className="ug-tour">
      <MockTourTarget target="beams" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 228, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Beam Properties</Type>
        <Type role="p3">Choose beam materials and dimensions.</Type>
        <View data-ug-part="step-nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          {children}
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>3 / 6</Type>
        </View>
      </View>
    </div>
  );
}
```

### 2. Step navigation — UI variant 2 (`ace-step-nav`)

Apps: ACE, HS, RWS, AGPD

In context source: ACE: `src/features/top-navigation/ui/TutorialWalkthrough.tsx`; HS: `src/hs/Tutorials.tsx`; RWS: `src/rws/Tutorials.tsx`; AGPD: `src/agpd/Tutorials.tsx`

In context view: Shown.

#### In context structure additions

1. **Spotlight target** — The page element the tour is pointing at, here the Beam Properties section header that the card sits beside (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the step (Split-Pane Slider, Multi Design or Beam Properties) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row (for example 2 / 4) that tells where the user is in the tour. Selector: `[data-ug-part="step-counter"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-023/options/ace-step-nav/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
        PREVIOUS
      </Button>
      <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        NEXT
        <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
      </Button>
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-023/options/ace-step-nav/scene.tsx`

```tsx
import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// ACE TutorialWalkthrough step 2 of 4 (Split-Pane Slider). ACE, HS, RWS and AGPD write the same card: PREVIOUS and NEXT typed in capitals at the regular weight, the two buttons in their own View and the counter at the end of the row by justify between (HCS keeps mixed case and a CSS margin). The spotlight target is the gallery's shared stand-in, not the app's own page.
export default function AceStepNavScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="beams" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 228, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Split-Pane Slider</Type>
        <Type role="p3">Need more space on the input side or the output? Drag the slider.</Type>
        <View data-ug-part="step-nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
          <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
            <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
              <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
              PREVIOUS
            </Button>
            <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
              NEXT
              <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
            </Button>
          </View>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ whiteSpace: 'nowrap' }}>2 / 4</Type>
        </View>
      </View>
    </div>
  );
}
```

### 3. Step navigation — UI variant 3 (`adm-step-nav`)

Apps: ADM, PBS, PFD, FD

In context source: ADM: `src/features/top-navigation/components/TutorialWalkthrough.tsx`; PBS: `src/PbsWalkthrough.tsx`; PFD: `src/pfd/Walkthrough.tsx`; FD: `src/components/Walkthrough.jsx`

In context view: Shown.

#### In context structure additions

1. **Spotlight target** — The page element the tour is pointing at, here the Beam Properties section header that the card sits beside (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the step (Split-Pane Slider, Multi Design or Beam Properties) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row (for example 2 / 4) that tells where the user is in the tour. Selector: `[data-ug-part="step-counter"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-023/options/adm-step-nav/example.tsx`

```tsx
import { Button, View } from '../../../../../kit';

export default function Example() {
  return (
    <View className="ug-tour__nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
      <Button style={{ fontWeight: 700 }} aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
        PREVIOUS
      </Button>
      <Button style={{ fontWeight: 700 }} aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        NEXT
        <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
      </Button>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-023/options/adm-step-nav/scene.tsx`

```tsx
import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// ADM TutorialWalkthrough step 2 of 4 (Multi Design). ADM, PBS, PFD and FD write the same card: PREVIOUS and NEXT in capitals at the bold weight (by CSS on the row's buttons, `.adm-tour-navigation > button`; FD types the capitals), the counter pushed to the end by a CSS auto margin (inline here). The spotlight target is the gallery's shared stand-in, not the app's own page.
export default function AdmStepNavScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="beams" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 228, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Multi Design</Type>
        <Type role="p3">Explore which products meet design requirements.</Type>
        <View data-ug-part="step-nav" className="ug-tour__nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
            Previous
          </Button>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            Next
            <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
          </Button>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>2 / 4</Type>
        </View>
      </View>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
