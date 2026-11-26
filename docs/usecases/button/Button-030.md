# Button-030: Close walkthrough button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-030/usecase.ts`

## What it is

A transparent icon-only IconButton, 20px square, dismisses the coach-mark card of a walkthrough from its corner.

## When to choose it

Use it to dismiss a tour early; to finish a tour use End (Button-024). Always set aria-label.

## Where it belongs

The corner of the coach-mark card of a walkthrough. Real site source: the walkthrough card of the nine apps with a tour (the paths are in source); ADC has none.

## Usage guidance

All nine apps write the same IconButton with scale "sm", paint "text" and color "surface"; the glyph is xmark (the apps pass family classic and layer duotone, which is the provider default here). In context the X sits in the corner of the step 1 card (HCS Connection Type, so only Next in the footer), 4px in, through an inline style (the apps use a local class such as .hcs-tour-close because the kit sx has no inset axis); the title reserves 24px at its end so its text stops short of it. RWS hides the X on one step of its tour (a step with close set to false); that is a rule of its steps, not another UI. The footer of the scene is HCS's; the other apps' footers are in Button-023.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `IconButton`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`
- `profile`: `contained`
- `scale`: `sm`
- `color`: `secondary`, `surface`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Walkthrough card** — The 328px coach-mark card for the Connection Type step with its text and footer navigation. Selector: `[role="region"][aria-label="Walkthrough"]`.
2. **Close** — The 20px transparent xmark button pinned to the card corner (4px inset) that dismisses the HCS walkthrough; HCS wraps it in an absolute span. Selector: `[class~="aui-button"][aria-label^="Close"]`.
3. **Close icon** — The xmark glyph inside the close button. Selector: `[class~="aui-button"][aria-label^="Close"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
4. **Next** — The step button that is the only navigation on step 1 / 6 (Next with arrow-right); Close is the way out without finishing. Selector: `[class~="aui-button"]:not([aria-label])`.

## Component layer steps

1. **Walkthrough card** — 328px coach mark pairs Connection Type guidance with navigation. Selector: `[role="region"][aria-label="Walkthrough"]`.
2. **Close** — 20px transparent corner X dismisses the HCS walkthrough. Selector: `[class~="aui-button"][aria-label^="Close"]`.
3. **Close icon** — Xmark glyph appears inside the close button itself. Selector: `[class~="aui-button"][aria-label^="Close"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
4. **Next** — Step 1 shows Next with arrow-right as its only navigation. Selector: `[class~="aui-button"]:not([aria-label])`.

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

### 1. Walkthrough close (`hcs-walkthrough-close`)

Apps: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS

In context source: HCS: `src/components/F01Walkthrough.tsx`; ACE: `src/features/top-navigation/ui/TutorialWalkthrough.tsx`; ADM: `src/features/top-navigation/components/TutorialWalkthrough.tsx`; PFD: `src/pfd/Walkthrough.tsx`; PBS: `src/PbsWalkthrough.tsx`; HS: `src/hs/Tutorials.tsx`; FD: `src/components/Walkthrough.jsx`; AGPD: `src/agpd/Tutorials.tsx`; RWS: `src/rws/Tutorials.tsx`

In context view: Shown.

#### In context structure additions

1. **Spotlight target** — The Connection Type section header that the first step points at, beside the card (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight Connection Type heading with room reserved at its end so its text stops short of the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted 1 / 6 step count at the end of the footer row, beside Next. Selector: `[data-ug-part="step-counter"]`.

#### In context layer steps

1. **Spotlight target** — Connection Type heading is the target beside the coach mark. Selector: `[class~="ug-tour__target"]`.
2. **Step title** — Connection Type heading leaves room for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — Muted footer shows the first position, 1 / 6, beside Next. Selector: `[data-ug-part="step-counter"]`.
4. **Walkthrough card** — 328px coach mark pairs Connection Type guidance with navigation. Selector: `[role="region"][aria-label="Walkthrough"]`.
5. **Close** — 20px transparent corner X dismisses the HCS walkthrough. Selector: `[class~="aui-button"][aria-label^="Close"]`.
6. **Close icon** — Xmark glyph appears inside the close button itself. Selector: `[class~="aui-button"][aria-label^="Close"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
7. **Next** — Step 1 shows Next with arrow-right as its only navigation. Selector: `[class~="aui-button"]:not([aria-label])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-030/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return <IconButton name="xmark" aria-label="Close" aui={{ paint: 'text', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-030/options/hcs-walkthrough-close/scene.tsx`

```tsx
import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// Walkthrough step 1 of 6 (Connection Type), the first step, so the footer has only Next. The close X sits in the card's top end
// corner, 4px in, by the app's local CSS (`.hcs-tour-close`; the kit sx has no inset axis), here an inline style; the title
// reserves 24px at its end so its text stops short of the X.

export default function HcsWalkthroughCloseScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="connection" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 228, insetBlockStart: 8, inlineSize: 328 }}
      >
        <span style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}>
          <IconButton name="xmark" aria-label="Close walkthrough" aui={{ scale: 'sm', paint: 'text', color: 'surface' }} />
        </span>
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Connection Type</Type>
        <Type role="p3">Choose how the beams connect.</Type>
        <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            Next
            <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
          </Button>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>1 / 6</Type>
        </View>
      </View>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
