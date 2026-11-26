# Button-006: Cancel upload button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-006/usecase.ts`

## What it is

The default gray Cancel is the lone button at the end of an upload dialog that waits for a file dropped in its body.

## When to choose it

Use one neutral button when closing is the only choice of the dialog (the close X in the Title does the same) and do not add a Confirm that does nothing.

## Where it belongs

The footer of the upload dialog (Open from device): a raised Title with the close X, a dropzone, then one Cancel. Real site source: the upload dialog of ACE, PFD, PBS, HS, FD, AGPD and RWS (the paths are in source).

## Usage guidance

The example sets only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults, and the Dialog.Button default is the same gray solid button that dismisses the dialog. One UI in all seven apps (FD spells the Cancel as a plain Button, which looks the same). The scene keeps the dropzone; the real body holds more.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Dialog`, `FileUpload`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `raised`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Container** — The lone Cancel Button in the upload dialog footer, small and in the default gray solid look, that dismisses the dialog while it waits for a dropped file. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`.
2. **Label** — The text "Cancel" that closes the Open from device dialog without uploading. Selector: `[class~="aui-button"]:not([class~="aui-dialog-close"])`. Direct text is highlighted.

## Apps

- ACE (`ace`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Upload Cancel (`ace-upload`)

Apps: ACE, PFD, PBS, HS, FD, AGPD, RWS

In context source: ACE: `src/features/file-persistence/ui/OpenFromDeviceDialog.tsx`; PFD: `src/pfd/ShellDialogs.tsx`; PBS: `src/WorkspaceTools.tsx`; HS: `src/hs/ShellExtras.tsx`; FD: `src/App.jsx`; AGPD: `src/agpd/ShellDialogs.tsx`; RWS: `src/rws/ShellDialogs.tsx`

In context view: Shown.

#### In context structure additions

1. **Dialog** — The open dialog titled "Upload JSON File". Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The raised title bar with "Upload JSON File" and the close X at the end. Part marker: `data-ug-part="dialog-title"`.
3. **Close button** — The X in the title that closes the dialog like Cancel (aria-label "Cancel"). Part marker: `data-ug-part="dialog-close"`.
4. **Upload area** — The dialog body that holds the file upload drop zone ("Drop files here" with a Browse action). Part marker: `data-ug-part="upload-body"`.
5. **Dialog footer** — The Actions row at the end that holds the single Cancel button. Part marker: `data-ug-part="dialog-footer"`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-006/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm' }}>Cancel</Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-006/options/ace-upload/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, FileUpload } from '../../../../../kit';

// ACE OpenFromDeviceDialog (PFD, PBS, HS, FD, AGPD and RWS write the same dialog; FD spells the Cancel as a plain Button, which looks the same): the footer holds one default Cancel, alone at the end, and the close X in the Title does the same.
export default function AceUploadScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>
              Upload JSON File
              <Dialog.Spacer />
              <Dialog.Close data-ug-part="dialog-close" aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body data-ug-part="upload-body">
              <FileUpload multiple={false} messages={{ idle: { text: 'Drop files here', action: 'Browse' } }} />
            </Dialog.Body>
            <Dialog.Actions data-ug-part="dialog-footer">
              <Dialog.Button>Cancel</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
