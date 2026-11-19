import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Templates',
  title: 'Template picker dialog',
  apps: ['ace', 'adm', 'hs', 'fd'],
  cases: [
    { id: 'ace-templates', name: 'Template picker', apps: ['ace'], source: { ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx' } },
    { id: 'adm-templates', name: 'Template picker', apps: ['adm'], source: { adm: 'src/features/templates/components/NewFromTemplateDialog.tsx' } },
    { id: 'hs-templates', name: 'Template picker', apps: ['hs', 'fd'], source: { hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/components/TemplatesDialog.jsx' } },
  ],
  source: {
    ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx',
    adm: 'src/features/templates/components/NewFromTemplateDialog.tsx',
    hs: 'src/hs/TemplateDialogs.tsx',
    fd: 'src/components/TemplatesDialog.jsx',
  },
  summary: 'A dialog that lists the default and the user\'s own templates as one radio list, where picking one fills the inputs and the user\'s own rows can be downloaded, deleted or edited.',
  where: 'The File menu item New from template in ACE, ADM, HS and FD. HCS, PFD, PBS, AGPD, RWS and ADC have no template picker. Real site source: the template dialog of each app (the paths are in source).',
  when: 'Use it to choose one saved starting point from a short list that has two owners (built in and the user\'s). Do not use it to save a template (Button-001, Save template) or for a long searchable list.',
  how: 'The Body holds one RadioGroup, and each row is a Radio at scale "sm" whose states are an outlined tonal surface when unselected and a solid primary when selected, with sx flex "fill" so it takes the row; In context shows that list; the example is the Dialog frame (default-width Popup, raised Title with the close X, Body) the list sits in. Only the user\'s own rows add row actions after the Radio, in a flex row with gap 8: three text Buttons Download, Delete (color error) and Edit in ACE and ADM, three icon buttons (download, trash, pen, each with an aria-label) in HS and FD. The apps write three UIs, one scene each: ACE (the default-width Popup, an Accordion of the two sections with a Type l4 trigger), ADM (a 520px Popup, plain sections each headed by a muted Type, no Accordion) and HS and FD (the default-width shell dialog, an Accordion with plain-text triggers and icon-button rows; the Body also scrolls). Every Title is raised with the close X (Button-021); the footer (Cancel and Create, Button-001) and the delete confirm are left out, as are the empty state and further rows.',
});
