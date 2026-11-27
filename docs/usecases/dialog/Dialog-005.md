# Dialog-005: Full-size dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-005/usecase.ts`

## What it is

The licence a user must accept before the app opens: a dialog that fills the screen, a Title with the close X, and a scrolling Body of legal text.

## When to choose it

Use it for long text that must be read to the end before an action; the Body scrolls inside the popup, so the text carries no scroll of its own. Do not use it for a short confirm (AlertDialog-003) or a single message (Button-007).

## Where it belongs

The first screen of all nine apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS), opened over the empty workspace until the user accepts or declines; ADC has no licence gate. Real site source: the licence gate of each app (the paths are in source).

## Usage guidance

Dialog.Popup at scale "sm" with sx width "fill" and height "fill" (the apps set --aui-width and --aui-height by CSS variable below 1024px; left out). Dialog.Title holds the name, the Spacer and the close X, which also declines (Button-031). Dialog.Body is the scroll owner (it wraps its content in its own scroll area), so the text goes straight in as Type p2 sections (In context shows them in a View, paint "text", column, gap 12 for HCS or 8 for the others); the example is the Dialog frame with a raised Title, the close X and one sample section. The apps write two UIs: HCS (a raised Title and a Description line that does not scroll, "Review and accept to start using the HCS prototype.") and the other apps (ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS: a plain Title; ACE adds the same Description line as body text, HS, ACE and FD put a Country field above the text (the ACE one is Select-004), and PBS hides the close X). The footer is Dialog-007; the scenes leave it, the Country field and the read-to-end gate out, and the example holds one sample section.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `raised`
- `paint`: `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Overlay** — The scrim behind the licence gate that the user must answer before the app opens. Selector: `[class~="aui-dialog-backdrop"]`. Layer step: **Overlay** — Scrim blocks the app until the licence question is answered.
2. **Popup** — The full-size licence window: scale "sm" with width and height set to "fill" so it fills the stage. Selector: `[class~="aui-dialog-popup"]`. Layer step: **Popup** — Small full-size licence window fills the stage width and height.
3. **Title bar** — The title bar naming the "Website Application License Agreement"; HCS and the example raise it, the other apps leave it plain. Selector: `[class~="aui-dialog-title"]`. Layer step: **Title bar** — Title names the Website Application License Agreement for all apps.
4. **Title text** — The agreement name at the start of the title bar. Selector: `[class~="aui-dialog-title"]`. Direct text is highlighted.
5. **Spacer** — The gap before the close X in the title bar. Selector: `[class~="aui-dialog-spacer"]`. Layer step: **Spacer** — The gap before the close X in the title bar.
6. **Close** — The close X, which also declines the licence (labelled "Do Not Accept" in the ADM scene); PBS hides it. Selector: `[class~="aui-dialog-close"]`. Layer step: **Close** — Close X declines the licence; PBS hides it, ADM labels rejection.
7. **Description** — The HCS-only line "Review and accept to start using the HCS prototype." that stays fixed under the title while the body scrolls. Selector: `[class~="aui-dialog-description"]`. Layer step: **Description** — HCS keeps its review prompt fixed while the body scrolls.
8. **Body** — The scroll owner of the window; it scrolls when the licence text is longer than the popup. Selector: `[class~="aui-dialog-body"]`. Layer step: **Body** — Window body scrolls when licence text exceeds popup height.
9. **Licence text** — The licence sections as Type p2 text: one sample clause in the example, and the full mock agreement in a gap-12 column View in the HCS and ADM scenes. Part marker: `data-ug-part="licence-text"`. Layer step: **Licence text** — Licence text appears as a sample clause or full mock agreement.

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

### 1. Raised licence title (`hcs-licence`)

Apps: HCS

In context source: HCS: `src/components/F01Experience.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-005/example.tsx`

```tsx
import { Dialog, Type } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Website Application License Agreement" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <Type data-ug-part="licence-text" role="p2" aui={{ sx: { flex: 'none' } }}>
                1. The licence text goes here; the Body scrolls when it is longer than the popup.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-005/options/hcs-licence/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';
import { MockLicenceText } from '../../../../../mock-data';

// HCS licence dialog (src/components/F01Experience.tsx): a popup that fills the stage (width and height fill), a raised Title with the close X (Button-031), a Description line under it that does not scroll, then the scrolling Body holding the licence text. The footer (Do Not Accept and Accept, Dialog-007) is left out.
export default function HcsLicenceScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Website Application License Agreement" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Review and accept to start using the HCS prototype.
            </Dialog.Description>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="licence-text" aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '12', minWidth: '0' } }}>
                <MockLicenceText />
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Plain licence title (`adm-licence`)

Apps: ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS

In context source: ACE: `src/features/eula/ui/EulaGate.tsx`; ADM: `src/features/eula/components/EulaGate.tsx`; PFD: `src/pfd/LicenseGate.tsx`; PBS: `src/LicenseGate.tsx`; HS: `src/hs/LicenseGate.tsx`; FD: `src/components/LicenseGate.jsx`; AGPD: `src/agpd/LicenseGate.tsx`; RWS: `src/rws/LicenseGate.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-005/options/adm-licence/example.tsx`

```tsx
import { Dialog, Type } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Website Application License Agreement" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <Type data-ug-part="licence-text" role="p2" aui={{ sx: { flex: 'none' } }}>
                Review the application licence agreement before continuing. Your acceptance is required to use this application.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-005/options/adm-licence/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';
import { MockLicenceText } from '../../../../../mock-data';

// ADM licence gate (src/features/eula/components/EulaGate.tsx; ACE, PFD, PBS, HS, FD, AGPD and RWS write the same frame): a popup that fills the stage, a plain Title (scale sm, not raised) with the close X that also declines, then the scrolling Body. ACE puts a Description line under the Title (here it is body text); HS, ACE and FD add a Country field above the text (the ACE one is Select-004), and PBS hides the close X. The footer (Dialog-007) is left out.
export default function AdmLicenceScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Do Not Accept" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="licence-text" aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '12', minWidth: '0' } }}>
                <MockLicenceText />
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
