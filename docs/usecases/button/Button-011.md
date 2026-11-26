# Button-011: Start tutorial topic button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-011/usecase.ts`

## What it is

A full-width text Button with an outlined border is one tutorial topic in the Help & Tutorials list; pressing it starts that guided tour.

## When to choose it

Use it to start one guided tour from a list of tours. Do not use it for a single-action footer; the tour itself steps with Previous and Next (Button-023).

## Where it belongs

The body of the Help & Tutorials dialog or dock, one row per topic in a vertical nav. Real site source: the tutorials list of each app (the paths are in source). HCS has no such Button: its Help Center lists the tutorial as a menu item. ADC has no tutorials.

## Usage guidance

Set aui scale "sm" and paint "text" with sx width "fill", justifyContent "between", textAlign "start", whiteSpace "normal" and a 1px solid outlined border on every side (the kit has no outlined text profile, so the border comes from sx). The apps write four UIs, one scene each, and the preview has a toggle of the four groups: HS, AGPD and RWS (a 384px Dialog; the label then an arrow-right), ACE (the same dialog, each row stacks the name in semi-bold over a muted description, no arrow), ADM and PFD (a non-modal Help & Tutorials dock, the label only) and PBS and FD (the dock, the label then an arrow-right). ADM and PBS style the row with a class (.adm-help-link, .pbs-help-link); the scenes write the same border and layout as sx, as PFD and FD do. The docks are pinned bottom-right (420px) with a centred title by local CSS in the apps; the scenes show the plain dock Popup. Each scene keeps the Title with its close X and one topic row; the real lists hold one to nine topics.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Dialog`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `paint`: `text`
- `shape`: `soft`
- `color`: `raised`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Container** — One tutorial topic row: a full-width small text Button, label at the start and arrow at the end (justifyContent "between"), outlined by a 1px border on all four sides from sx. Selector: `[data-ug-part="container"]`.
2. **Label** — The topic name, "HS: General Tutorial" in the example, wrapping onto several lines when long. Selector: `[data-ug-part="container"]`. Direct text is highlighted.
3. **Icon** — The right arrow at the end of the row that signals starting the tour, at scale "sm". Selector: `[data-ug-part="icon"]`.

## Apps

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

### 1. Topic row (`hs-topic-row`)

Apps: HS, AGPD, RWS

In context source: HS: `src/hs/Tutorials.tsx`; AGPD: `src/agpd/Tutorials.tsx`; RWS: `src/rws/Tutorials.tsx`

In context view: Shown.

#### In context structure additions

1. **Help & Tutorials dialog** — The open dialog that lists the tutorial topics. Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The title bar "Help & Tutorials" with the close X. Part marker: `data-ug-part="dialog-title"`.
3. **Close button** — The X in the title that closes the dialog. Part marker: `data-ug-part="dialog-close"`.
4. **Topic list** — The nav column that holds one outlined row per tutorial. Part marker: `data-ug-part="topic-list"`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-011/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button data-ug-part="container"
      aui={{
        scale: 'sm',
        paint: 'text',
        sx: {
          width: 'fill',
          justifyContent: 'between',
          textAlign: 'start',
          whiteSpace: 'normal',
          borderStyle: 'solid',
          borderColor: 'outlined',
          borderBlockStartWidth: '1',
          borderBlockEndWidth: '1',
          borderInlineStartWidth: '1',
          borderInlineEndWidth: '1',
        },
      }}
    >
      HS: General Tutorial
      <Button.Icon data-ug-part="icon" name="arrow-right" aui={{ scale: 'sm' }} />
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-011/options/hs-topic-row/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';

// HS Tutorials dialog (src/hs/Tutorials.tsx): a 384px Dialog with a Title and close X, then a nav column of one outlined topic row per tutorial (one shown). AGPD and RWS write the same dialog (their Help & Tutorials); the app closes the dialog and starts the tour on click.
export default function HsTopicRowScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false} aui={{ scale: 'sm', sx: { width: '384' } }}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ scale: 'sm' }}>
              Help &amp; Tutorials
              <Dialog.Spacer />
              <Dialog.Close data-ug-part="dialog-close" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="topic-list" as="nav" aria-label="Help & Tutorials" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}>
                <span data-ug-part="container" style={{ display: 'contents' }}>{children}</span>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Topic row — UI variant 2 (`ace-topic-row`)

Apps: ACE

In context source: ACE: `src/features/top-navigation/ui/TutorialsDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Help & Tutorials dialog** — The open dialog that lists the tutorial topics. Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The title bar "Help & Tutorials" with the close X. Part marker: `data-ug-part="dialog-title"`.
3. **Close button** — The X in the title that closes the dialog. Part marker: `data-ug-part="dialog-close"`.
4. **Topic list** — The nav column that holds one outlined row per tutorial. Part marker: `data-ug-part="topic-list"`.
5. **Topic name** — The semi-bold topic name ("ACE: General Tutorial") stacked above the description. Part marker: `data-ug-part="topic-name"`.
6. **Topic description** — The muted description under the topic name. Part marker: `data-ug-part="topic-description"`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-011/options/ace-topic-row/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button data-ug-part="container"
      aui={{
        scale: 'sm',
        paint: 'text',
        sx: {
          width: 'fill',
          justifyContent: 'between',
          textAlign: 'start',
          whiteSpace: 'normal',
          borderStyle: 'solid',
          borderColor: 'outlined',
          borderBlockStartWidth: '1',
          borderBlockEndWidth: '1',
          borderInlineStartWidth: '1',
          borderInlineEndWidth: '1',
        },
      }}
    >
      HS: General Tutorial
      <Button.Icon data-ug-part="icon" name="arrow-right" aui={{ scale: 'sm' }} />
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-011/options/ace-topic-row/scene.tsx`

```tsx
import { Button, Dialog, Type, View } from '../../../../../kit';
import type { ContextProps } from '../../../../../types';

// ACE TutorialsDialog (src/features/top-navigation/ui/TutorialsDialog.tsx): the same dialog as HS, but each topic row stacks the topic name (semi-bold) over its muted description, start-aligned in a column, with no arrow.
export default function AceTopicRowScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false} aui={{ scale: 'sm', sx: { maxHeight: '384' } }}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ scale: 'sm' }}>
              Help &amp; Tutorials
              <Dialog.Spacer />
              <Dialog.Close data-ug-part="dialog-close" aui={{ scale: 'sm' }} aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="topic-list" as="nav" aria-label="Help & Tutorials" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}>
                <Button data-ug-part="container"
                  aui={{
                    scale: 'sm',
                    paint: 'text',
                    sx: {
                      flexDirection: 'column',
                      alignItems: 'start',
                      justifyContent: 'between',
                      gap: '4',
                      width: 'fill',
                      textAlign: 'start',
                      whiteSpace: 'normal',
                      borderStyle: 'solid',
                      borderColor: 'outlined',
                      borderBlockStartWidth: '1',
                      borderBlockEndWidth: '1',
                      borderInlineStartWidth: '1',
                      borderInlineEndWidth: '1',
                    },
                  }}
                >
                  <Type data-ug-part="topic-name" as="span" role="p2" weight="semi-bold">ACE: General Tutorial</Type>
                  <Type data-ug-part="topic-description" as="span" role="p3" color="muted">Shows the general features common to all Blueprint-based applications.</Type>
                </Button>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 3. Topic row — UI variant 3 (`adm-topic-row`)

Apps: ADM, PFD

In context source: ADM: `src/features/top-navigation/components/Tutorials.tsx`; PFD: `src/pfd/ShellDialogs.tsx`

In context view: Shown.

#### In context structure additions

1. **Help & Tutorials dialog** — The open dialog that lists the tutorial topics. Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The title bar "Help & Tutorials" with the close X. Part marker: `data-ug-part="dialog-title"`.
3. **Close button** — The X in the title that closes the dialog. Part marker: `data-ug-part="dialog-close"`.
4. **Topic list** — The nav column that holds one outlined row per tutorial. Part marker: `data-ug-part="topic-list"`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-011/options/adm-topic-row/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button data-ug-part="container"
      aui={{
        scale: 'sm',
        paint: 'text',
        sx: {
          width: 'fill',
          justifyContent: 'between',
          textAlign: 'start',
          whiteSpace: 'normal',
          borderStyle: 'solid',
          borderColor: 'outlined',
          borderBlockStartWidth: '1',
          borderBlockEndWidth: '1',
          borderInlineStartWidth: '1',
          borderInlineEndWidth: '1',
        },
      }}
    >
      HS: General Tutorial
      <Button.Icon data-ug-part="icon" name="arrow-right" aui={{ scale: 'sm' }} />
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-011/options/adm-topic-row/scene.tsx`

```tsx
import { Button, Dialog, View } from '../../../../../kit';
import type { ContextProps } from '../../../../../types';

// ADM Tutorials panel (src/features/top-navigation/components/Tutorials.tsx): a non-modal Help & Tutorials dock (the app pins it to the bottom-right corner, 420px, and centres its title by local CSS; here it is the plain Popup) holding one outlined, full-width text row per topic with the label only, no arrow. PFD writes the same row. The app styles the row with a class (.adm-help-link); the scene writes the same border and layout as aui props, as PFD does.
export default function AdmTopicRowScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ scale: 'sm', color: 'raised' }}>
              Help &amp; Tutorials
              <Dialog.Close data-ug-part="dialog-close" aria-label="Close Help & Tutorials" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="topic-list" as="nav" aria-label="Help & Tutorials" aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '8', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}>
                <Button data-ug-part="container" aui={{ scale: 'sm', paint: 'text', sx: { width: 'fill', justifyContent: 'between', borderWidth: '1', borderColor: 'outlined' } }}>
                  ADM: General Walkthrough
                </Button>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 4. Topic row — UI variant 4 (`pbs-topic-row`)

Apps: PBS, FD

In context source: PBS: `src/PbsHelpTutorials.tsx`; FD: `src/components/HelpCenter.jsx`

In context view: Shown.

#### In context structure additions

1. **Help & Tutorials dialog** — The open dialog that lists the tutorial topics. Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The title bar "Help & Tutorials" with the close X. Part marker: `data-ug-part="dialog-title"`.
3. **Close button** — The X in the title that closes the dialog. Part marker: `data-ug-part="dialog-close"`.
4. **Topic list** — The nav column that holds one outlined row per tutorial. Part marker: `data-ug-part="topic-list"`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-011/options/pbs-topic-row/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button data-ug-part="container"
      aui={{
        scale: 'sm',
        paint: 'text',
        sx: {
          width: 'fill',
          justifyContent: 'between',
          textAlign: 'start',
          whiteSpace: 'normal',
          borderStyle: 'solid',
          borderColor: 'outlined',
          borderBlockStartWidth: '1',
          borderBlockEndWidth: '1',
          borderInlineStartWidth: '1',
          borderInlineEndWidth: '1',
        },
      }}
    >
      HS: General Tutorial
      <Button.Icon data-ug-part="icon" name="arrow-right" aui={{ scale: 'sm' }} />
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-011/options/pbs-topic-row/scene.tsx`

```tsx
import { Button, Dialog, View } from '../../../../../kit';
import type { ContextProps } from '../../../../../types';

// PBS PbsHelpTutorials (src/PbsHelpTutorials.tsx): the same non-modal Help & Tutorials dock as ADM, but the topic row ends with an arrow-right after the label. FD writes the same row (a HelpRow with the arrow). The app styles the row with a class (.pbs-help-link); the scene writes the same border and layout as aui props, as FD does.
export default function PbsTopicRowScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ scale: 'sm', color: 'raised' }}>
              Help &amp; Tutorials
              <Dialog.Close data-ug-part="dialog-close" aria-label="Close Help & Tutorials" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Body aui={{ scale: 'sm' }}>
              <View data-ug-part="topic-list" as="nav" aria-label="Help & Tutorials" aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '8', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}>
                <Button data-ug-part="container" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', justifyContent: 'between', gap: '8', width: 'fill', textAlign: 'start', whiteSpace: 'normal', borderColor: 'outlined', borderWidth: '1' } }}>
                  PBS: General Tutorial
                  <Button.Icon data-ug-part="icon" name="arrow-right" aui={{ scale: 'sm' }} />
                </Button>
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
