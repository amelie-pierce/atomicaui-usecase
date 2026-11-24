import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Alert / Confirm',
  title: 'Delete confirm dialog',

  apps: ['ace', 'adm', 'pbs', 'hs', 'fd'],
  options: [
    { id: "ace-delete", name: "Delete confirm", apps: ["ace","adm"], source: {"ace":"src/features/templates/ui/NewFromTemplateDialog.tsx","adm":"src/features/templates/components/NewFromTemplateDialog.tsx"} },
    { id: "pbs-delete", name: "Delete confirm — UI variant 2", apps: ["pbs"], source: {"pbs":"src/ResultsSection.tsx"} },
    { id: "hs-delete", name: "Delete confirm — UI variant 3", apps: ["hs","fd"], source: {"hs":"src/hs/TemplateDialogs.tsx","fd":"src/components/TemplatesDialog.jsx"} },
  ],
  source: { ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx', adm: 'src/features/templates/components/NewFromTemplateDialog.tsx', pbs: 'src/ResultsSection.tsx', hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/components/TemplatesDialog.jsx' },
  summary: 'A confirmation that asks before a template or a saved result is deleted: a Cancel next to a solid error Delete.',
  where: 'The confirmation opened from the Delete action of a template (ACE, ADM, HS, FD) or of a saved result (PBS). '
    + 'Real site source: ACE and ADM NewFromTemplateDialog.tsx, PBS ResultsSection.tsx, HS TemplateDialogs.tsx and FD TemplatesDialog.jsx. HCS, PFD, AGPD, RWS and ADC have no delete confirm.',
  when: 'Use it before an irreversible delete: color "error" marks the Delete. The Remove row button that opens it is Button-038.',
  how: 'In the apps this is AlertDialog; the gallery draws it as a non-modal Dialog because the vendored AlertDialog is forced modal. The footer is the default Cancel (Close in PBS) and a solid error Delete. Three groups. '
    + 'ACE and ADM (a raised warning Title, no close X; ACE at the default width, ADM capped at 480px). PBS (no Title: a header row with only the close X, then Close, a Spacer and a solid error Delete). '
    + 'HS and FD (a plain Title, no close X). Every scene is cut to the least that shows the footer.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the delete confirm.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The default-width confirm window used by ACE, HS and PBS.',
      code: `<Dialog.Popup initialFocus={false}>`,
    },
    {
      id: 'title',
      name: 'Title',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title "Warning: Delete Template?" with a solid warning icon and no close X (HS leaves the bar plain, PBS has no title at all).',
      code: `<Dialog.Title aui={{ color: 'raised' }}>
  <Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />
  Warning: Delete Template?
</Dialog.Title>`,
    },
    {
      id: 'icon',
      name: 'Warning icon',
      token: 'Dialog.Icon',
      selector: '[class~="aui-dialog-title"] [class~="aui-contained-icon"]',
      description: 'The solid triangle-exclamation glyph in the warning colour.',
      code: `<Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />`,
    },
    {
      id: 'title-text',
      name: 'Title text',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The question "Warning: Delete Template?".',
      code: `<Dialog.Title aui={{ color: 'raised' }}>
  <Dialog.Icon name="triangle-exclamation" weight="solid" aui={{ color: 'warning' }} />
  Warning: Delete Template?`,
    },
    {
      id: 'close-row',
      name: 'Close row',
      token: 'View',
      description: 'The PBS-only end-aligned row that holds a lone close X above the message instead of a title bar.',
      code: `<View data-ug-part="close-row" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }}>
  <Dialog.Close aria-label="Close" />
</View>`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The PBS close X above the message; the other apps have none.',
      code: `<Dialog.Close aria-label="Close" />`,
    },
    {
      id: 'description',
      name: 'Description',
      token: 'Dialog.Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The message that the deletion cannot be undone and must be confirmed (PBS asks "Are you sure you want to delete Connection 1").',
      code: `<Dialog.Description>
  You are about to delete a template and this action cannot be undone. Please confirm before proceeding.
</Dialog.Description>`,
    },
    {
      id: 'actions',
      name: 'Footer',
      token: 'Dialog.Actions',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer with the back-out and delete buttons; PBS puts a spacer between them.',
      code: `<Dialog.Actions>`,
    },
    {
      id: 'cancel',
      name: 'Cancel',
      token: 'Dialog.Button',
      description: 'The default Cancel (labelled Close in PBS) that keeps the template.',
      code: `<Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>`,
    },
    {
      id: 'delete',
      name: 'Delete',
      token: 'Dialog.Button',
      description: 'The solid error Delete that removes the template.',
      code: `<Dialog.Button data-ug-part="delete" aui={{ color: 'error', paint: 'solid' }}>Delete</Dialog.Button>`,
    },
  ],
});
