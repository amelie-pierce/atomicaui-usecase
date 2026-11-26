# Toast-001: Status toast

Component family: **Toast**

UI type: **Toast**

Source: `src/usecase-gallery/usecases/toast/Toast-001/usecase.ts`

## What it is

A short message that appears at the top end of the work area after an action and leaves by itself: a severity icon, a title, a description and a close X.

## When to choose it

Use it for feedback that needs no decision and may disappear. Use an AlertDialog for a choice the user must make (AlertDialog-001) and a banner for a state that stays.

## Where it belongs

Every app mounts one Toast provider and viewport at its root (HCS App.tsx, ACE ProviderCore.tsx, ADM AppProviders.tsx, ADC ReportFlow.tsx). Toasts report a saved or opened file, a copied link or a failed upload.

## Usage guidance

Mount `Toast.Provider` at the app root (`timeout={6000}`, `limit={1}`). Raise a toast with `const manager = useToastManager()` and `manager.add({ title, description, type })` where `type` is `success`, `error`, `warning` or `info` (the severity icon and colour follow it). A viewport component renders `Toast.Portal` > `Toast.Viewport` (pinned to the top end with `position: "absolute"`, `insetBlockStart` and `insetInlineEnd` of 8px) and `manager.toasts.map((toast) => <Toast key={toast.id} toast={toast} />)`; the Toast renders the icon, copy and close X itself. The In context scene frames that viewport through a `ToastStack` helper that adds a success toast on mount, standing in for the app's action; the helper is the viewport above plus the `manager.add` call. ADC raises toasts outside React with `createToastManager()`. All ten apps write the same Toast, so there is one group. The scene frames the viewport in a pane.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Toast`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Viewport** — The stack container pinned to the top end of the pane with 8px insets, rendered inside Toast.Portal. Selector: `[class~="aui-toast-viewport"]`.
2. **Toast** — The success notification surface the ToastStack adds on mount, one per manager entry. Selector: `[class~="aui-toast"]`.
3. **Content** — The copy block that Toast renders beside the icon, holding the title and the description. Selector: `[class~="aui-toast-content"]`.
4. **Icon** — The success status icon that Toast draws itself from type: 'success'. Selector: `[class~="aui-toast-icon"]`.
5. **Title** — The heading "Success" taken from the title passed to manager.add. Selector: `[class~="aui-toast-title"]`. Direct text is highlighted.
6. **Description** — The detail line "Your project was saved to the device." taken from the description passed to manager.add. Selector: `[class~="aui-toast-description"]`.
7. **Close** — The close X that Toast adds so the user can dismiss the message before it times out. Selector: `[class~="aui-toast-close"]`.

## Component layer steps

1. **Viewport** — The stack container pinned to the top end of the pane with 8px insets, rendered inside Toast.Portal. Selector: `[class~="aui-toast-viewport"]`.
2. **Toast** — The success notification surface the ToastStack adds on mount, one per manager entry. Selector: `[class~="aui-toast"]`.
3. **Content** — The copy block that Toast renders beside the icon, holding the title and the description. Selector: `[class~="aui-toast-content"]`.
4. **Icon** — The success status icon that Toast draws itself from type: 'success'. Selector: `[class~="aui-toast-icon"]`.
5. **Description** — The detail line "Your project was saved to the device." taken from the description passed to manager.add. Selector: `[class~="aui-toast-description"]`.
6. **Close** — The close X that Toast adds so the user can dismiss the message before it times out. Selector: `[class~="aui-toast-close"]`.

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
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. App viewport (`hcs-viewport`)

Apps: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC

In context source: HCS: `src/App.tsx`; ACE: `src/app/providers/ProviderCore.tsx`; ADM: `src/app/providers/AppProviders.tsx`; PFD: `src/App.tsx`; PBS: `src/App.tsx`; HS: `src/App.tsx`; FD: `src/App.jsx`; AGPD: `src/App.tsx`; RWS: `src/rws/Shell.tsx`; ADC: `src/adc/components/ReportFlow.tsx`

In context view: Shown.

#### In context structure additions

1. **Work area pane** — The relatively positioned pane at the app root over which the toast viewport floats at its top end. Part marker: `data-ug-part="pane"`.
2. **Pane title** — The semi-bold l3 Input heading of the pane the toast appears over. Part marker: `data-ug-part="pane-title"`.

#### In context layer steps

1. **Work area pane** — The relatively positioned pane at the app root over which the toast viewport floats at its top end. Selector: `[data-ug-part="pane"]`.
2. **Pane title** — The semi-bold l3 Input heading of the pane the toast appears over. Selector: `[data-ug-part="pane-title"]`.
3. **Viewport** — The stack container pinned to the top end of the pane with 8px insets, rendered inside Toast.Portal. Selector: `[class~="aui-toast-viewport"]`.
4. **Toast** — The success notification surface the ToastStack adds on mount, one per manager entry. Selector: `[class~="aui-toast"]`.
5. **Content** — The copy block that Toast renders beside the icon, holding the title and the description. Selector: `[class~="aui-toast-content"]`.
6. **Icon** — The success status icon that Toast draws itself from type: 'success'. Selector: `[class~="aui-toast-icon"]`.
7. **Description** — The detail line "Your project was saved to the device." taken from the description passed to manager.add. Selector: `[class~="aui-toast-description"]`.
8. **Close** — The close X that Toast adds so the user can dismiss the message before it times out. Selector: `[class~="aui-toast-close"]`.

#### Component UI source — `src/usecase-gallery/usecases/toast/Toast-001/example.tsx`

```tsx
import { Toast } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';
import ToastStack from './toast-stack';

export default function Example() {
  const host = useStageHost();
  return (
    <Toast.Provider timeout={0} limit={1}>
      <ToastStack container={host} />
    </Toast.Provider>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/toast/Toast-001/options/hcs-viewport/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Toast, Type, View } from '../../../../../kit';
import { useState } from 'react';
import ToastStack from '../../toast-stack';

// HCS App (src/App.tsx; the other nine apps mount the same Toast.Provider and a viewport of their own, ADC raises it through createToastManager): one `Toast.Provider` at the app root (timeout 6000, limit 1 in the app; held open and limited to 1 as in the app) and a viewport at the top end of the work area, over a pane.
export default function HcsViewportScene({ host }: ContextProps) {
  const [pane, setPane] = useState<HTMLElement | null>(null);
  return (
    <View data-ug-part="pane" ref={setPane} aui={{ paint: 'text', profile: 'no-padding' }} style={{ position: 'relative', minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 36))' }}>
      <Type data-ug-part="pane-title" as="h2" role="l3" weight="semi-bold">Input</Type>
      <Toast.Provider timeout={0} limit={1}>
        <ToastStack container={pane ?? host} />
      </Toast.Provider>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
