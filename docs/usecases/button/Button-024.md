# Button-024: End walkthrough buttons

Component family: **Button**

UI type: **Button group**

Source: `src/usecase-gallery/usecases/button/Button-024/usecase.ts`

## What it is

Borderless text Buttons close a guided tour on its last step: Previous with arrow-left before it, and End in place of Next.

## When to choose it

Use End to close a flow that has been walked through; do not use it to dismiss a tour early, for that use the close icon (Button-030). The steps before the last use Button-023.

## Where it belongs

The navigation row in the footer of the walkthrough card on the last step. Real site source: the walkthrough card of each app (the paths are in source). ADC has no walkthrough.

## Usage guidance

aui scale "sm", paint "text" and color "secondary" on every Button; Previous keeps Button.Icon arrow-left, End replaces Next. Four groups, told apart by the End icon and the label style: HCS (End with a check, mixed case, regular weight), ACE, HS, RWS and AGPD (END in capitals, regular weight, no icon), ADM and FD (END in capitals, bold, no icon) and PBS and PFD (END in capitals, bold, with the check). The bold capitals are CSS on the row's buttons in ADM, PBS and PFD. On the last step the target is the File menu at the right edge, so the card sits to the left of the spotlight, as the app places it when it does not fit on the right.

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
3. **Navigation row** — The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end. Selector: `[data-ug-part="step-nav"]`.
4. **Previous** — Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
5. **Arrow-left icon** — The arrow-left glyph before the label, pointing the way the tour goes back. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]`.
6. **End** — The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
7. **Check icon** — The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]`.

## Component layer steps

1. **Walkthrough card** — The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row. Selector: `[role="region"][aria-label="Walkthrough"]`.
2. **Close** — The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons. Selector: `[class~="aui-button"][aria-label="Close walkthrough"]`.
3. **Navigation row** — The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end. Selector: `[data-ug-part="step-nav"]`.
4. **Previous** — Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
5. **Arrow-left icon** — The arrow-left glyph before the label, pointing the way the tour goes back. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]`.
6. **End** — The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
7. **Check icon** — The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]`.

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

### 1. Last step (`hcs-last-step`)

Apps: HCS

In context source: HCS: `src/components/F01Walkthrough.tsx`

In context view: Shown.

#### In context structure additions

1. **Spotlight target** — The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row on the last step (for example 4 / 4). Selector: `[data-ug-part="step-counter"]`.

#### In context layer steps

1. **Spotlight target** — The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row on the last step (for example 4 / 4). Selector: `[data-ug-part="step-counter"]`.
4. **Walkthrough card** — The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row. Selector: `[role="region"][aria-label="Walkthrough"]`.
5. **Close** — The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons. Selector: `[class~="aui-button"][aria-label="Close walkthrough"]`.
6. **Navigation row** — The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end. Selector: `[data-ug-part="step-nav"]`.
7. **Previous** — Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
8. **Arrow-left icon** — The arrow-left glyph before the label, pointing the way the tour goes back. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]`.
9. **End** — The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
10. **Check icon** — The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-024/example.tsx`

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
        End
        <Button.Icon name="check" aui={{ scale: 'sm' }} />
      </Button>
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-024/options/hcs-last-step/scene.tsx`

```tsx
import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// HCS F01Walkthrough step 6 of 6 (File). The File menu is at the right edge, so the card does not fit to its right and the app puts it to the left of the spotlight, level with its top. The last step has Previous and End; End carries a check after the label, mixed case, regular weight.
export default function HcsLastStepScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="file" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 164, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>File</Type>
        <Type role="p3">Use File to open or save a project.</Type>
        <View data-ug-part="step-nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
            Previous
          </Button>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            End
            <Button.Icon name="check" aui={{ scale: 'sm' }} />
          </Button>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>6 / 6</Type>
        </View>
      </View>
    </div>
  );
}
```

### 2. Arrow End buttons (`ace-last-step`)

Apps: ACE, HS, RWS, AGPD

In context source: ACE: `src/features/top-navigation/ui/TutorialWalkthrough.tsx`; HS: `src/hs/Tutorials.tsx`; RWS: `src/rws/Tutorials.tsx`; AGPD: `src/agpd/Tutorials.tsx`

In context view: Shown.

#### In context structure additions

1. **Spotlight target** — The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row on the last step (for example 4 / 4). Selector: `[data-ug-part="step-counter"]`.

#### In context layer steps

1. **Spotlight target** — The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row on the last step (for example 4 / 4). Selector: `[data-ug-part="step-counter"]`.
4. **Walkthrough card** — The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row. Selector: `[role="region"][aria-label="Walkthrough"]`.
5. **Close** — The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons. Selector: `[class~="aui-button"][aria-label="Close walkthrough"]`.
6. **Navigation row** — The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end. Selector: `[data-ug-part="step-nav"]`.
7. **Previous** — Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
8. **Arrow-left icon** — The arrow-left glyph before the label, pointing the way the tour goes back. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]`.
9. **End** — The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
10. **Check icon** — The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-024/options/ace-last-step/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <>
      <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
        PREVIOUS
      </Button>
      <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>END</Button>
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-024/options/ace-last-step/scene.tsx`

```tsx
import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// ACE TutorialWalkthrough step 4 of 4 (Step #1). ACE, HS, RWS and AGPD write the same last step: END typed in capitals at the regular weight with no icon after it (HCS shows a check), the counter at the end of the row by justify between. The card sits left of the target as in the HCS scene; the target is the gallery's shared stand-in.
export default function AceLastStepScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="file" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 164, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Step #1</Type>
        <Type role="p3">Click here for application specific tutorials.</Type>
        <View data-ug-part="step-nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
          <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
            <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
              <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
              PREVIOUS
            </Button>
            <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>END</Button>
          </View>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ whiteSpace: 'nowrap' }}>4 / 4</Type>
        </View>
      </View>
    </div>
  );
}
```

### 3. Previous and End (`adm-last-step`)

Apps: ADM, FD

In context source: ADM: `src/features/top-navigation/components/TutorialWalkthrough.tsx`; FD: `src/components/Walkthrough.jsx`

In context view: Shown.

#### In context structure additions

1. **Spotlight target** — The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row on the last step (for example 4 / 4). Selector: `[data-ug-part="step-counter"]`.

#### In context layer steps

1. **Spotlight target** — The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row on the last step (for example 4 / 4). Selector: `[data-ug-part="step-counter"]`.
4. **Walkthrough card** — The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row. Selector: `[role="region"][aria-label="Walkthrough"]`.
5. **Close** — The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons. Selector: `[class~="aui-button"][aria-label="Close walkthrough"]`.
6. **Navigation row** — The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end. Selector: `[data-ug-part="step-nav"]`.
7. **Previous** — Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
8. **Arrow-left icon** — The arrow-left glyph before the label, pointing the way the tour goes back. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]`.
9. **End** — The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
10. **Check icon** — The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-024/options/adm-last-step/example.tsx`

```tsx
import { Button, View } from '../../../../../kit';

export default function Example() {
  return (
    <View className="ug-tour__nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
      <Button style={{ fontWeight: 700 }} aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
        PREVIOUS
      </Button>
      <Button style={{ fontWeight: 700 }} aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>END</Button>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-024/options/adm-last-step/scene.tsx`

```tsx
import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// ADM TutorialWalkthrough step 4 of 4 (3D Viewer). ADM and FD write the same last step: END in capitals at the bold weight with no icon after it (by CSS on the row's buttons in ADM; FD types the capitals), the counter pushed to the end by a CSS auto margin (inline here). The target is the gallery's shared stand-in.
export default function AdmLastStepScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="file" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 164, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>3D Viewer</Type>
        <Type role="p3">Use the 3D Viewer to explore the spatial layout.</Type>
        <View data-ug-part="step-nav" className="ug-tour__nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
            Previous
          </Button>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>End</Button>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>4 / 4</Type>
        </View>
      </View>
    </div>
  );
}
```

### 4. Compact End buttons (`pbs-last-step`)

Apps: PBS, PFD

In context source: PBS: `src/PbsWalkthrough.tsx`; PFD: `src/pfd/Walkthrough.tsx`

In context view: Shown.

#### In context structure additions

1. **Spotlight target** — The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row on the last step (for example 4 / 4). Selector: `[data-ug-part="step-counter"]`.

#### In context layer steps

1. **Spotlight target** — The File menu in the main navigation that the last step points at; the card sits to its left (a stand-in for the app page). Selector: `[class~="ug-tour__target"]`.
2. **Step title** — The medium-weight heading of the last step (File, Step #1, 3D Viewer or Product Notes) with room reserved at its end for the close X. Selector: `[data-ug-part="step-title"]`.
3. **Step counter** — The muted step count at the end of the navigation row on the last step (for example 4 / 4). Selector: `[data-ug-part="step-counter"]`.
4. **Walkthrough card** — The 328px coach-mark card (solid, sm, soft, elevation 4) with the step title, one line of copy and the footer navigation row. Selector: `[role="region"][aria-label="Walkthrough"]`.
5. **Close** — The corner xmark that dismisses the tour from the top end of the card; it is a separate action from the step buttons. Selector: `[class~="aui-button"][aria-label="Close walkthrough"]`.
6. **Navigation row** — The footer row of the last-step card that holds Previous and End; the step counter (4 / 4, 12 / 12 or 6 / 6) sits at its far end. Selector: `[data-ug-part="step-nav"]`.
7. **Previous** — Borderless secondary text button with arrow-left that steps back from the last step; the label is Previous or PREVIOUS depending on the app. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type`.
8. **Arrow-left icon** — The arrow-left glyph before the label, pointing the way the tour goes back. Selector: `[class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):first-of-type > [class~="aui-contained-icon"]`.
9. **End** — The closing button that replaces Next on the final step and ends the tour; it is typed END in ACE, HS, RWS, AGPD, ADM and FD. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type`.
10. **Check icon** — The check glyph after End that HCS, PBS and PFD add to mark completion; ACE, HS, RWS, AGPD, ADM and FD show no icon. Selector: `[class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-icon"], [class~="aui-button"]:not([aria-label]):last-of-type > [class~="aui-contained-icon"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-024/options/pbs-last-step/example.tsx`

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
        END
        <Button.Icon name="check" aui={{ scale: 'sm' }} />
      </Button>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-024/options/pbs-last-step/scene.tsx`

```tsx
import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// PBS Walkthrough step 12 of 12 (Product Notes). PBS and PFD write the same last step: END in capitals at the bold weight (by CSS on the row's buttons; PFD types the capitals) with the check after the label, as HCS, and the counter pushed to the end by a CSS auto margin (inline here). The target is the gallery's shared stand-in.
export default function PbsLastStepScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="file" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 164, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Product Notes</Type>
        <Type role="p3">The notes column contains additional information.</Type>
        <View data-ug-part="step-nav" className="ug-tour__nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
            Previous
          </Button>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            End
            <Button.Icon name="check" aui={{ scale: 'sm' }} />
          </Button>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>12 / 12</Type>
        </View>
      </View>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
