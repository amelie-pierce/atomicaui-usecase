# Dialog-006: Centered-title dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-006/usecase.ts`

## What it is

A small raised-title dialog whose title is centred between side paddings, with the close X pinned to the end and a column of rows in the body.

## When to choose it

Use it for a small floating panel that lists a few navigation rows and stays beside the work, where a centred name suits the panel. A dialog that left-aligns its name is Dialog-001.

## Where it belongs

The Help Center panel of FD (src/components/HelpCenter.jsx): a popup pinned to the bottom end of the screen, listing help rows and the tutorials. The other apps open the Help Center as a menu (Menubar-003).

## Usage guidance

The same parts as Dialog-001 (Dialog.Popup at scale "sm", shape "soft", a raised Dialog.Title, Dialog.Close, Dialog.Body) with two differences measured in the gallery against the About dialog: the Title has justifyContent "center" and 40px start and end padding (the Title text is centred, the About one starts at 8px) and there is no Dialog.Spacer, so the close X is taken out of the flow and pinned with position absolute and an 8px inline-end offset (FD does it with its own CSS class; the scene writes the same two declarations inline). Title height (28px), fill and font match Dialog-001. FD also fixes the popup to the screen corner with its own viewport class and caps it at 420px; the scene is a plain 360px popup. The body is one navigation View of rows (no padding, gap 8); the row icons and the tutorials list are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `shape`: `soft`
- `color`: `raised`
- `paint`: `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the Help Center window. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The small 360px Help Center window at scale "sm" with a soft shape (FD caps its own copy at 420px and pins it to the screen corner). Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar whose "Help Center" text is centred between 40px start and end padding, with no Spacer. Selector: `[class~="aui-dialog-title"]`.
4. **Title text** — The centred words "Help Center" inside the title bar. Part marker: `data-ug-part="title-text"`.
5. **Close** — The close X taken out of the flow and pinned to the inline end with position absolute and an 8px offset. Selector: `[class~="aui-dialog-close"]`.
6. **Body** — The body that holds the navigation column of help rows. Selector: `[class~="aui-dialog-body"]`.
7. **Help rows** — The nav View labelled "Help Center": a no-padding column with gap 8 whose rows are Feedback and Tutorials in the FD scene. Part marker: `data-ug-part="help-rows"`.

## Apps

- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Help Center (`fd-help-center`)

Apps: FD

In context source: FD: `src/components/HelpCenter.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-006/example.tsx`

```tsx
import { Dialog, Type, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }} style={{ '--aui-width': 'min(360px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised', sx: { position: 'relative', justifyContent: 'center', paddingInlineStart: '40', paddingInlineEnd: '40' } }}>
              <span data-ug-part="title-text">Help Center</span>
              <Dialog.Close aria-label="Close Help Center" aui={{ scale: 'sm' }} style={{ position: 'absolute', insetInlineEnd: 'var(--p-px-8)', margin: 0 }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="help-rows" as="nav" aria-label="Help Center" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', width: 'fill' } }}>
                <Type as="p" role="p3">
                  Help rows go here.
                </Type>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-006/options/fd-help-center/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Type, View } from '../../../../../kit';

// FD Help Center (src/components/HelpCenter.jsx): a "sm" soft popup whose raised Title centres the name between 40px side paddings (justifyContent center) with the close X placed by the app's own CSS class at the end;
// the Body holds one column View of rows. The app pins the popup with position fixed and its own viewport class; here it is a plain 360px popup. Left out: the help rows' icons and the tutorials list.
export default function FdHelpCenterScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }} style={{ '--aui-width': 'min(360px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised', sx: { position: 'relative', justifyContent: 'center', paddingInlineStart: '40', paddingInlineEnd: '40' } }}>
              <span data-ug-part="title-text">Help Center</span>
              <Dialog.Close aria-label="Close" aui={{ scale: 'sm' }} style={{ position: 'absolute', insetInlineEnd: 'var(--p-px-8)', margin: 0 }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="help-rows" as="nav" aria-label="Help Center" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', width: 'fill' } }}>
                <Type as="p" role="p3">
                  Feedback
                </Type>
                <Type as="p" role="p3">
                  Tutorials
                </Type>
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
