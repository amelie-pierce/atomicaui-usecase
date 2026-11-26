import { defineUsecase } from '../../../define';

const ACE_CONTEXT_ANATOMY = [
  { id: 'radio-group', name: 'Template choice', selector: '[class~="aui-radio-group"]', description: 'The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.' },
  { id: 'accordion', name: 'Template sections', selector: '[class~="aui-accordion"]', description: 'Default Templates and My Templates as two Accordion sections, both open.' },
  { id: 'section-trigger', name: 'Section header', selector: '[class~="aui-accordion-trigger"]', description: 'A Type l4 section label ending in a chevron.' },
  { id: 'template-radio', name: 'Template row', selector: '[class~="aui-radio"]', description: 'A template row such as "Two-beam connection": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.' },
  { id: 'template-label', name: 'Template name', selector: '[class~="aui-control-row"] > [class~="aui-label"]', description: 'The template name inside the radio, such as "Three-beam connection".' },
  { id: 'row-action', name: 'Row actions', description: 'The Download, Delete (error colour) and Edit text buttons after a user-owned template row.' },
];

const ADM_CONTEXT_ANATOMY = [
  { id: 'radio-group', name: 'Template choice', selector: '[class~="aui-radio-group"]', description: 'The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.' },
  { id: 'section', name: 'Template section', description: 'A plain section that stacks a muted heading over its radio rows with a gap of 4 (no Accordion).' },
  { id: 'section-heading', name: 'Section heading', text: true, description: 'The muted "Default Templates" and "My Templates" labels.' },
  { id: 'template-radio', name: 'Template row', selector: '[class~="aui-radio"]', description: 'A template row such as "Two-beam connection": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.' },
  { id: 'template-label', name: 'Template name', selector: '[class~="aui-control-row"] > [class~="aui-label"]', description: 'The template name inside the radio, such as "Three-beam connection".' },
  { id: 'row-action', name: 'Row actions', description: 'The Download, Delete (error colour) and Edit text buttons after a user-owned template row.' },
];

const HS_CONTEXT_ANATOMY = [
  { id: 'radio-group', name: 'Template choice', selector: '[class~="aui-radio-group"]', description: 'The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.' },
  { id: 'accordion', name: 'Template sections', selector: '[class~="aui-accordion"]', description: 'Default Templates and My Templates as two Accordion sections, both open.' },
  { id: 'section-trigger', name: 'Section header', selector: '[class~="aui-accordion-trigger"]', description: 'A plain text section label ending in a chevron.' },
  { id: 'template-radio', name: 'Template row', selector: '[class~="aui-radio"]', description: 'A template row such as "Two-beam connection": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.' },
  { id: 'template-label', name: 'Template name', selector: '[class~="aui-control-row"] > [class~="aui-label"]', description: 'The template name inside the radio, such as "Three-beam connection".' },
  { id: 'row-action', name: 'Row actions', description: 'The download, trash and pen icon buttons after a user-owned template row, each with its own aria-label.' },
];

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Template picker dialog',
  apps: ['ace', 'adm', 'hs', 'fd'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"The scrim behind the New from Template picker.","keyIdea":"The overlay focuses attention on template selection while keeping the picker distinct from the workspace.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The narrow default-scale picker window, 480px wide (ADM widens it to 520px).","keyIdea":"A narrow window makes the template choice feel like a contained task.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"The raised title bar reading \"New from Template\"; the ACE and HS scenes title it \"Templates\" and ADM keeps \"New from Template\".","keyIdea":"The heading names the template source consistently across the app variants.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"spacer","partId":"spacer","title":"Spacer","explanation":"The gap between the picker name and the close X.","keyIdea":"Flexible spacing leaves the title and exit control easy to distinguish.","selector":"[class~=\"aui-dialog-spacer\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The close X that abandons the picker (labelled \"Cancel\" in the ACE scene and \"Close Templates\" in the HS scene).","keyIdea":"The close control abandons template selection without applying a template.","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The body that holds the radio list of templates; the HS and FD version also scrolls (overflow auto).","keyIdea":"The body owns the list so long template choices can scroll without moving the dialog shell.","selector":"[class~=\"aui-dialog-body\"]"},
      ],
options: [
    { id: "ace-templates", name: "Template picker", apps: ["ace"], source: {"ace":"src/features/templates/ui/NewFromTemplateDialog.tsx"}, contextAnatomy: ACE_CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-radio-group","partId":"radio-group","title":"Template choice","explanation":"The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.","keyIdea":"The ACE radio group ensures built-in and owned templates compete in one selection model.","selector":"[class~=\"aui-radio-group\"]","scope":"context"},
        {"id":"context-accordion","partId":"accordion","title":"Template sections","explanation":"Default Templates and My Templates as two Accordion sections, both open.","keyIdea":"The accordion lets ACE readers expand the two template categories independently.","selector":"[class~=\"aui-accordion\"]","scope":"context"},
        {"id":"context-section-trigger","partId":"section-trigger","title":"Section header","explanation":"A Type l4 section label ending in a chevron.","keyIdea":"A labeled header makes each ACE category understandable before its rows appear.","selector":"[class~=\"aui-accordion-trigger\"]","scope":"context"},
        {"id":"context-template-radio","partId":"template-radio","title":"Template row","explanation":"A template row such as \"Two-beam connection\": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.","keyIdea":"The radio row ties a visual selection state to the chosen template name.","selector":"[class~=\"aui-radio\"]","scope":"context"},
        {"id":"context-template-label","partId":"template-label","title":"Template name","explanation":"The template name inside the radio, such as \"Three-beam connection\".","keyIdea":"The name makes the template choice explicit inside the radio.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]","scope":"context"},
        {"id":"context-row-action","partId":"row-action","title":"Row actions","explanation":"The Download, Delete (error colour) and Edit text buttons after a user-owned template row.","keyIdea":"Row actions stay adjacent to user-owned templates so editing does not look like selection.","selector":"[data-ug-part=\"row-action\"]","scope":"context"},
      ],
    },
    { id: "adm-templates", name: "Radio template list", apps: ["adm"], source: {"adm":"src/features/templates/components/NewFromTemplateDialog.tsx"}, contextAnatomy: ADM_CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-radio-group","partId":"radio-group","title":"Template choice","explanation":"The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.","keyIdea":"ADM keeps both template categories in one choice group while avoiding collapsible sections.","selector":"[class~=\"aui-radio-group\"]","scope":"context"},
        {"id":"context-section","partId":"section","title":"Template section","explanation":"A plain section that stacks a muted heading over its radio rows with a gap of 4 (no Accordion).","keyIdea":"A plain section introduces each ADM template set without adding a disclosure control.","selector":"[data-ug-part=\"section\"]","scope":"context"},
        {"id":"context-template-radio","partId":"template-radio","title":"Template row","explanation":"A template row such as \"Two-beam connection\": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.","keyIdea":"The row fill shows which template choice is currently active in ADM.","selector":"[class~=\"aui-radio\"]","scope":"context"},
        {"id":"context-template-label","partId":"template-label","title":"Template name","explanation":"The template name inside the radio, such as \"Three-beam connection\".","keyIdea":"The template name identifies the radio choice without relying on its checked state.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]","scope":"context"},
        {"id":"context-row-action","partId":"row-action","title":"Row actions","explanation":"The Download, Delete (error colour) and Edit text buttons after a user-owned template row.","keyIdea":"Download, Delete, and Edit remain grouped with the owned template they act upon.","selector":"[data-ug-part=\"row-action\"]","scope":"context"},
      ],
    },
    { id: "hs-templates", name: "Grouped template list", apps: ["hs","fd"], source: {"hs":"src/hs/TemplateDialogs.tsx","fd":"src/components/TemplatesDialog.jsx"}, contextAnatomy: HS_CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-radio-group","partId":"radio-group","title":"Template choice","explanation":"The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.","keyIdea":"The HS radio group keeps the built-in and owned templates mutually exclusive.","selector":"[class~=\"aui-radio-group\"]","scope":"context"},
        {"id":"context-accordion","partId":"accordion","title":"Template sections","explanation":"Default Templates and My Templates as two Accordion sections, both open.","keyIdea":"The two open categories make the available HS template families visible together.","selector":"[class~=\"aui-accordion\"]","scope":"context"},
        {"id":"context-section-trigger","partId":"section-trigger","title":"Section header","explanation":"A plain text section label ending in a chevron.","keyIdea":"A text header gives the HS category a plain, compact label above its choices.","selector":"[class~=\"aui-accordion-trigger\"]","scope":"context"},
        {"id":"context-template-radio","partId":"template-radio","title":"Template row","explanation":"A template row such as \"Two-beam connection\": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.","keyIdea":"The radio row lets users select one template across the visible categories.","selector":"[class~=\"aui-radio\"]","scope":"context"},
        {"id":"context-template-label","partId":"template-label","title":"Template name","explanation":"The template name inside the radio, such as \"Three-beam connection\".","keyIdea":"The name spells out which template will be used when selected.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]","scope":"context"},
        {"id":"context-row-action","partId":"row-action","title":"Row actions","explanation":"The download, trash and pen icon buttons after a user-owned template row, each with its own aria-label.","keyIdea":"Each owned-template action remains next to the row it affects and has its own accessible name.","selector":"[data-ug-part=\"row-action\"]","scope":"context"},
      ],
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
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the New from Template picker.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The narrow default-scale picker window, 480px wide (ADM widens it to 520px).',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar reading "New from Template"; the ACE and HS scenes title it "Templates" and ADM keeps "New from Template".',
    },
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The picker name at the start of the title bar.',
    },
    {
      id: 'spacer',
      name: 'Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The gap between the picker name and the close X.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X that abandons the picker (labelled "Cancel" in the ACE scene and "Close Templates" in the HS scene).',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that holds the radio list of templates; the HS and FD version also scrolls (overflow auto).',
    },
    {
      id: 'template-text',
      name: 'Template text',
      text: true,
      description: 'The p3 placeholder line that stands in for the list of templates in the Dialog frame.',
    },
  ],
});
