# FileUpload-001: Upload file dialog dropzone

Component family: **FileUpload**

UI type: **FileUpload**

Source: `src/usecase-gallery/usecases/file-upload/FileUpload-001/usecase.ts`

## What it is

A dashed drop area with an icon, a prompt and a browse action in an upload dialog: drag a file in or pick one from the device.

## When to choose it

Use it to take one file from the user in a dialog. Use a plain Button that opens a file picker only when no drop target is wanted. PBS also wraps its input pane in `FileUploadDropzone`, an overlay shown only while a file is dragged over, which has no static state to catalogue.

## Where it belongs

The upload dialog: Open from device in ACE, Upload File in PFD, PBS, HS, FD, AGPD and RWS, New Project in ADC. HCS and ADM have no upload dialog. Real source: the paths in the case.

## Usage guidance

`FileUpload` with `multiple={false}`, `messages={{ idle: { text, action } }}` for the prompt, `onFilesChange` and, in ADC, `supportedExtensions={[".cap"]}`. One group: a Dialog with a raised Title and close X, the FileUpload in `Dialog.Body` and a Cancel in the Actions (apps differ in the prompt text and, in ADC, the accepted extension, which are content). The scene leaves out the file handlers and the size errors.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `FileUpload`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Upload area** — The dashed single-file drop surface (multiple={false}) with the idle message, shown in the body of the upload dialog. Selector: `[class~="aui-file-upload"]`.
2. **Icon** — The upload icon at the top of the drop area. Selector: `[class~="aui-file-upload-icon"]`.
3. **Body** — The row below the icon that holds the prompt and the browse action. Selector: `[class~="aui-file-upload-body"]`.
4. **Prompt** — The idle text "Drop your file here or" that invites a drag and drop. Selector: `[class~="aui-file-upload-label"]`. Direct text is highlighted.
5. **Browse action** — The "Browse" action that opens the device file picker as the alternative to dropping. Selector: `[class~="aui-file-upload-action"]`.

## Apps

- ACE (`ace`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Upload file dialog (`ace-open-device`)

Apps: ACE, PFD, PBS, HS, FD, AGPD, RWS, ADC

In context source: ACE: `src/features/file-persistence/ui/OpenFromDeviceDialog.tsx`; PFD: `src/pfd/ShellDialogs.tsx`; PBS: `src/WorkspaceTools.tsx`; HS: `src/hs/ShellExtras.tsx`; FD: `src/App.jsx`; AGPD: `src/agpd/ShellDialogs.tsx`; RWS: `src/rws/ShellDialogs.tsx`; ADC: `src/adc/components/NewProjectDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Upload dialog** — The Dialog that hosts the dropzone in its body, opened by the app's Open from device action. Part marker: `data-ug-part="dialog"`.
2. **Dialog title** — The raised title row reading "Upload JSON file", with the close X pushed to the end. Part marker: `data-ug-part="dialog-title"`.
3. **Close button** — The X at the end of the title row that dismisses the dialog (labelled "Cancel"). Part marker: `data-ug-part="dialog-close"`.
4. **Cancel button** — The Cancel button in the dialog actions that closes the dialog without uploading. Part marker: `data-ug-part="dialog-cancel"`.

#### Component UI source — `src/usecase-gallery/usecases/file-upload/FileUpload-001/example.tsx`

```tsx
import { FileUpload } from '../../../kit';

export default function Example() {
  return <FileUpload multiple={false} messages={{ idle: { text: 'Drop your file here or', action: 'Browse' } }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/file-upload/FileUpload-001/options/ace-open-device/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// ACE OpenFromDeviceDialog (src/features/file-persistence/ui/OpenFromDeviceDialog.tsx; PFD, PBS, HS, FD, AGPD and RWS write it through their ShellDialog, ADC in NewProjectDialog.tsx): a Dialog with a raised Title and close X, the FileUpload in the Body, and a Cancel in the Actions. The dropzone wording is app content.
export default function AceOpenDeviceScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup data-ug-part="dialog" initialFocus={false}>
            <Dialog.Title data-ug-part="dialog-title" aui={{ color: 'raised' }}>
              Upload JSON file
              <Dialog.Spacer />
              <Dialog.Close data-ug-part="dialog-close" aria-label="Cancel" />
            </Dialog.Title>
            <Dialog.Body>
              {children}
            </Dialog.Body>
            <Dialog.Actions>
              <Dialog.Button data-ug-part="dialog-cancel">Cancel</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
