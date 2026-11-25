import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Save template dialog',

  apps: ['ace', 'adm', 'hs', 'fd'],
  options: [
    { id: "ace-save", name: "Save template", apps: ["ace","adm","hs"], source: {"ace":"src/features/templates/ui/SaveAsTemplateDialog.tsx","adm":"src/features/templates/components/SaveAsTemplateDialog.tsx","hs":"src/hs/TemplateDialogs.tsx"}, showContext: false },
    { id: "fd-save", name: "Save template — UI variant 2", apps: ["fd"], source: {"fd":"src/App.jsx"}, showContext: false },
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
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the Save as Template form.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The default-width form window (ADM uses 480px, HS the same default).',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar reading "Save as Template" with the close X at its end.',
    },
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The words "Save as Template" in the title bar.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that cancels the form (labelled "Cancel" in ACE and "Close Save as Template" in FD).',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that holds the template name form; the FD body scrolls with overflow auto.',
    },
    {
      id: 'form-column',
      name: 'Form column',
      description: 'The no-padding column with gap 16 that stacks the form\'s single field.',
    },
    {
      id: 'name-field',
      name: 'Name field',
      selector: '[class~="aui-field"]',
      description: 'The Template name field; FD drops the visible label and relies on the placeholder and aria-label.',
    },
    {
      id: 'name-label',
      name: 'Name label',
      selector: '[class~="aui-field-label"]',
      description: 'The visible label "Template name" above the input.',
    },
    {
      id: 'name-input',
      name: 'Name input',
      selector: '[class~="aui-field"] input',
      description: 'The text input with the placeholder "Please enter a name".',
    },
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer that holds Cancel and Save at the end.',
    },
    {
      id: 'cancel',
      name: 'Cancel',
      description: 'The default Dialog.Button that closes the form without saving (FD renders a plain Button that looks the same).',
    },
    {
      id: 'save',
      name: 'Save',
      description: 'The secondary solid Save, disabled until the name is valid; FD swaps it for a primary-coloured Button.',
    },
  ],
});
