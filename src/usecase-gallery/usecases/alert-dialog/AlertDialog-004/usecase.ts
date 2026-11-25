import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Alert / Confirm',
  title: 'Delete confirm dialog',

  apps: ['ace', 'adm', 'pbs', 'hs', 'fd'],
  options: [
    { id: "ace-delete", showContext: false, name: "Delete confirm", apps: ["ace","adm"], source: {"ace":"src/features/templates/ui/NewFromTemplateDialog.tsx","adm":"src/features/templates/components/NewFromTemplateDialog.tsx"} },
    { id: "pbs-delete", showContext: false, name: "Delete confirm — UI variant 2", apps: ["pbs"], source: {"pbs":"src/ResultsSection.tsx"} },
    { id: "hs-delete", showContext: false, name: "Delete confirm — UI variant 3", apps: ["hs","fd"], source: {"hs":"src/hs/TemplateDialogs.tsx","fd":"src/components/TemplatesDialog.jsx"} },
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
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the delete confirm.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The default-width confirm window used by ACE, HS and PBS.',
    },
    {
      id: 'title',
      name: 'Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title "Warning: Delete Template?" with a solid warning icon and no close X (HS leaves the bar plain, PBS has no title at all).',
    },
    {
      id: 'icon',
      name: 'Warning icon',
      selector: '[class~="aui-dialog-title"] [class~="aui-contained-icon"]',
      description: 'The solid triangle-exclamation glyph in the warning colour.',
    },
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The question "Warning: Delete Template?".',
    },
    {
      id: 'close-row',
      name: 'Close row',
      description: 'The PBS-only end-aligned row that holds a lone close X above the message instead of a title bar.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The PBS close X above the message; the other apps have none.',
    },
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The message that the deletion cannot be undone and must be confirmed (PBS asks "Are you sure you want to delete Connection 1").',
    },
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer with the back-out and delete buttons; PBS puts a spacer between them.',
    },
    {
      id: 'cancel',
      name: 'Cancel',
      description: 'The default Cancel (labelled Close in PBS) that keeps the template.',
    },
    {
      id: 'delete',
      name: 'Delete',
      description: 'The solid error Delete that removes the template.',
    },
  ],
});
