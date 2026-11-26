# Dialog-007: Accept licence dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-007/usecase.ts`

## What it is

A gate that asks the user to accept the licence agreement before the app opens: a Do Not Accept and a solid Accept.

## When to choose it

Use it when the user must accept terms before continuing. HCS and ACE keep Accept disabled until the text is read to the end; the other apps never disable it.

## Where it belongs

The first screen of the app. Real site source: HCS F01Experience.tsx and the LicenseGate or EulaGate of ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (the paths are in source). ADC has no licence gate. The declined state is AlertDialog-002.

## Usage guidance

Do Not Accept is the Dialog.Button default (color "surface-alt", paint "solid"); Accept is color "secondary", paint "solid"; both set scale "sm" and dismiss={false}. Two groups. HCS (a raised sm Title with a Description, Accept enabled after the end is reached). ACE, ADM, PFD, HS, FD, AGPD, RWS and PBS (a plain sm Title with the close X, the Do Not Accept / Accept pair at the same positions; the scene is the ACE gate with its Description line, which the other apps omit, as body text; the PBS app hides the X, an app gap, not another UI; HS and FD add a Country field, left out).

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `raised`, `secondary`, `surface-alt`
- `paint`: `solid`, `text`
- `shape`: `soft`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the licence gate, which the user cannot pass without answering. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The full-size gate window: scale "sm" with width and height "fill". Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The title bar naming the "Website Application License Agreement" (ACE prefixes the app name and leaves the bar plain instead of raised). Selector: `[class~="aui-dialog-title"]`.
4. **Close** — The close X, which counts as declining the licence (labelled "Do Not Accept" in the ACE scene). Selector: `[class~="aui-dialog-close"]`.
5. **Description** — The fixed line "Review and accept to start using the HCS prototype." between the title and the scrolling text (ACE says "to start using ACE."). Selector: `[class~="aui-dialog-description"]`.
6. **Body** — The scrolling body that holds the licence text the user reads to the end before Accept becomes available. Selector: `[class~="aui-dialog-body"]`.
7. **Footer** — The footer at scale "sm" that holds the Do Not Accept and Accept pair at the end. Selector: `[class~="aui-dialog-actions"]`.
8. **Do Not Accept** — The surface-alt solid soft button that declines the licence; dismiss={false} keeps the gate open until the app reacts. Part marker: `data-ug-part="decline"`.
9. **Accept** — The secondary solid soft button labelled "Accept Application License Agreement"; the scenes enable it once the text is read to the end. Part marker: `data-ug-part="accept"`.

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

### 1. Raised licence header (`hcs-accept`)

Apps: HCS

In context source: HCS: `src/components/F01Experience.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-007/example.tsx`

```tsx
import { Dialog, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';
import { MockLicenceText } from '../../../mock-data';

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
            <Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Review and accept to start using the HCS prototype.
            </Dialog.Description>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '12', minWidth: '0' } }}>
                <MockLicenceText />
              </View>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="decline" dismiss={false} aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Do Not Accept</Dialog.Button>
              <Dialog.Button data-ug-part="accept" dismiss={false} aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Accept Application License Agreement</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-007/options/hcs-accept/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';
import { MockLicenceText } from '../../../../../mock-data';

// The licence dialog after the body is read to the end: Accept is enabled (the app enables it on scroll).
export default function AcceptScene({ host }: ContextProps) {
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
              <View aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '12', minWidth: '0' } }}>
                <MockLicenceText />
              </View>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="decline" dismiss={false} aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Do Not Accept</Dialog.Button>
              <Dialog.Button data-ug-part="accept" dismiss={false} aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Accept Application License Agreement</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Plain licence header (`ace-accept`)

Apps: ACE, ADM, PFD, HS, FD, AGPD, RWS, PBS

In context source: ACE: `src/features/eula/ui/EulaGate.tsx`; ADM: `src/features/eula/components/EulaGate.tsx`; PFD: `src/pfd/LicenseGate.tsx`; HS: `src/hs/LicenseGate.tsx`; FD: `src/components/LicenseGate.jsx`; AGPD: `src/agpd/LicenseGate.tsx`; RWS: `src/rws/LicenseGate.tsx`; PBS: `src/LicenseGate.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-007/options/ace-accept/example.tsx`

```tsx
import { Dialog, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';
import { MockLicenceText } from '../../../../../mock-data';

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
            <Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Review and accept to start using the HCS prototype.
            </Dialog.Description>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '12', minWidth: '0' } }}>
                <MockLicenceText />
              </View>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="decline" dismiss={false} aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Do Not Accept</Dialog.Button>
              <Dialog.Button data-ug-part="accept" dismiss={false} aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Accept Application License Agreement</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-007/options/ace-accept/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';
import { MockLicenceText } from '../../../../../mock-data';

// ACE EulaGate (ADM, PFD, HS, FD, AGPD, RWS and PBS render the same dialog without the Description line, which is body text; HS and FD add a Country field, left out; PBS hides the close X): the licence dialog with a plain Title (scale sm, not raised), a Description, the close X that also declines, and the Do Not Accept / Accept pair. Accept is enabled once the text is read to the end.
export default function AceAcceptScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title aui={{ scale: 'sm' }}>
              Adhesive Cartridge Estimator: Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Do Not Accept" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Review and accept to start using ACE.
            </Dialog.Description>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <MockLicenceText />
              </View>
            </Dialog.Body>
            <Dialog.Actions aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="decline" dismiss={false} aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Do Not Accept</Dialog.Button>
              <Dialog.Button data-ug-part="accept" dismiss={false} aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Accept Application License Agreement</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
