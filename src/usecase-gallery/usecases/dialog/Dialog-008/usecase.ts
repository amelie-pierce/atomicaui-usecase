import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Save template dialog',
  look: 'Cancel and secondary Save',
  apps: ['ace', 'adm', 'hs', 'fd'],
  cases: [
    { id: 'ace-save', name: 'Save template', apps: ['ace', 'adm', 'hs'], source: { ace: 'src/features/templates/ui/SaveAsTemplateDialog.tsx', adm: 'src/features/templates/components/SaveAsTemplateDialog.tsx', hs: 'src/hs/TemplateDialogs.tsx' } },
    { id: 'fd-save', name: 'Save template', apps: ['fd'], source: { fd: 'src/App.jsx' } },
  ],
  source: { ace: 'src/features/templates/ui/SaveAsTemplateDialog.tsx', adm: 'src/features/templates/components/SaveAsTemplateDialog.tsx', hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/App.jsx' },
  summary: 'A form dialog that names and saves the current inputs as a template: a Cancel and a Save that stays disabled until the name is valid.',
  where: 'The Save as template dialog. Real site source: ACE and ADM SaveAsTemplateDialog.tsx, HS TemplateDialogs.tsx and FD src/App.jsx. HCS, PFD, PBS, AGPD, RWS and ADC have no template dialog.',
  when: 'Use it when the user commits a name for new saved data; keep Save disabled until the name is valid.',
  how: 'Cancel is the Dialog.Button default; Save is color "secondary", paint "solid" (FD: a primary Save in place of the black one, its Cancel a plain Button that looks the same). Two groups. '
    + 'ACE, ADM and HS (a raised Title with the close X, Save disabled until the name is valid; ADM caps the popup at 480px). FD (a primary Save). Body fields beyond the name field are left out.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the Save as Template form.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The default-width form window (ADM uses 480px, HS the same default).',
      code: `<Dialog.Popup initialFocus={false}>`,
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar reading "Save as Template" with the close X at its end.',
      code: `<Dialog.Title aui={{ color: 'raised' }}>
  Save as Template
  <Dialog.Spacer />
  <Dialog.Close aria-label="Cancel" />
</Dialog.Title>`,
    },
    {
      id: 'title-text',
      name: 'Title text',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The words "Save as Template" in the title bar.',
      code: `<Dialog.Title aui={{ color: 'raised' }}>
  Save as Template`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that cancels the form (labelled "Cancel" in ACE and "Close Save as Template" in FD).',
      code: `<Dialog.Close aria-label="Cancel" />`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Dialog.Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that holds the template name form; the FD body scrolls with overflow auto.',
      code: `<Dialog.Body>
  <View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>`,
    },
    {
      id: 'form-column',
      name: 'Form column',
      token: 'View',
      description: 'The no-padding column with gap 16 that stacks the form\'s single field.',
      code: `<View data-ug-part="form-column" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>`,
    },
    {
      id: 'name-field',
      name: 'Name field',
      token: 'Field',
      selector: '[class~="aui-field"]',
      description: 'The Template name field; FD drops the visible label and relies on the placeholder and aria-label.',
      code: `<Field>
  <Field.Label>Template name</Field.Label>
  <Field.Control>
    <Field.Input type="text" placeholder="Please enter a name" />
  </Field.Control>
</Field>`,
    },
    {
      id: 'name-label',
      name: 'Name label',
      token: 'Field.Label',
      selector: '[class~="aui-field-label"]',
      description: 'The visible label "Template name" above the input.',
      code: `<Field.Label>Template name</Field.Label>`,
    },
    {
      id: 'name-input',
      name: 'Name input',
      token: 'Field.Input',
      selector: '[class~="aui-field"] input',
      description: 'The text input with the placeholder "Please enter a name".',
      code: `<Field.Input type="text" placeholder="Please enter a name" />`,
    },
    {
      id: 'actions',
      name: 'Footer',
      token: 'Dialog.Actions',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer that holds Cancel and Save at the end.',
      code: `<Dialog.Actions>`,
    },
    {
      id: 'cancel',
      name: 'Cancel',
      token: 'Dialog.Button',
      description: 'The default Dialog.Button that closes the form without saving (FD renders a plain Button that looks the same).',
      code: `<Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>`,
    },
    {
      id: 'save',
      name: 'Save',
      token: 'Dialog.Button',
      description: 'The secondary solid Save, disabled until the name is valid; FD swaps it for a primary-coloured Button.',
      code: `<Dialog.Button data-ug-part="save" dismiss={false} disabled aui={{ color: 'secondary', paint: 'solid' }}>Save</Dialog.Button>`,
    },
  ],
});
