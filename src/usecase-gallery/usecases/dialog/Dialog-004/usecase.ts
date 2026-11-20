import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Template picker dialog',
  apps: ['ace', 'adm', 'hs', 'fd'],
  cases: [
    {
      id: 'ace-templates',
      name: 'Template picker',
      apps: ['ace'],
      source: { ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx' },
    },
    {
      id: 'adm-templates',
      name: 'Template picker',
      apps: ['adm'],
      source: { adm: 'src/features/templates/components/NewFromTemplateDialog.tsx' },
    },
    {
      id: 'hs-templates',
      name: 'Template picker',
      apps: ['hs', 'fd'],
      source: { hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/components/TemplatesDialog.jsx' },
    },
  ],
  source: {
    ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx',
    adm: 'src/features/templates/components/NewFromTemplateDialog.tsx',
    hs: 'src/hs/TemplateDialogs.tsx',
    fd: 'src/components/TemplatesDialog.jsx',
  },
  summary: 'A narrow dialog with a raised title bar and a close X over one radio list of templates with two owners (built in and the user\'s own).',
  where: 'The File menu item New from template in ACE, ADM, HS and FD (HCS, PFD, PBS, AGPD, RWS and ADC have no template picker). Real site source: the template dialog of each app (the paths are in source and in each case).',
  when: 'Use it to choose one saved starting point from a short list that has two owners (built in and the user\'s). Do not use it for a short message or a confirm (a plain Dialog, AlertDialog-003), to save a template (Dialog-008, Save template) or for a long searchable list.',
  how: 'The Dialog.Popup is the default scale and the default 480px (ADM sets 520px); the Title is raised and carries the name, the Spacer and the close X (Button-031). The Body holds one RadioGroup, each row a Radio at scale "sm" whose states are an outlined tonal surface when unselected and a solid primary when selected, with sx flex "fill" so it takes the row; only the user\'s own rows add row actions after the Radio, in a flex row with gap 8: three text Buttons Download, Delete (color error) and Edit in ACE and ADM, three icon buttons (download, trash, pen, each with an aria-label) in HS and FD. The example is the Dialog frame you copy (Popup, raised Title with the close X, Body); the radio list is a supporting part shown in In context. The apps write three UIs, one scene each: ACE (an Accordion of the two sections with a Type l4 trigger, Accordion-003), ADM (a 520px Popup, plain sections each headed by a muted Type, no Accordion) and HS and FD (the default-width shell dialog, an Accordion with plain-text triggers and icon-button rows; the Body also scrolls). The scenes leave out the no-match state, the keyboard handlers, the template footer (Cancel and Create, Dialog-008), the delete confirm, the empty state and further rows.',
});
