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
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"The scrim behind the New from Template picker.","keyIdea":"The scrim behind the New from Template picker.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The narrow default-scale picker window, 480px wide (ADM widens it to 520px).","keyIdea":"The narrow default-scale picker window, 480px wide (ADM widens it to 520px).","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"The raised title bar reading \"New from Template\"; the ACE and HS scenes title it \"Templates\" and ADM keeps \"New from Template\".","keyIdea":"The raised title bar reading \"New from Template\"; the ACE and HS scenes title it \"Templates\" and ADM keeps \"New from Template\".","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"spacer","partId":"spacer","title":"Spacer","explanation":"The gap between the picker name and the close X.","keyIdea":"The gap between the picker name and the close X.","selector":"[class~=\"aui-dialog-spacer\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The close X that abandons the picker (labelled \"Cancel\" in the ACE scene and \"Close Templates\" in the HS scene).","keyIdea":"The close X that abandons the picker (labelled \"Cancel\" in the ACE scene and \"Close Templates\" in the HS scene).","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The body that holds the radio list of templates; the HS and FD version also scrolls (overflow auto).","keyIdea":"The body that holds the radio list of templates; the HS and FD version also scrolls (overflow auto).","selector":"[class~=\"aui-dialog-body\"]"},
      ],
options: [
    { id: "ace-templates", name: "Template picker", apps: ["ace"], source: {"ace":"src/features/templates/ui/NewFromTemplateDialog.tsx"}, contextAnatomy: ACE_CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-radio-group","partId":"radio-group","title":"Template choice","explanation":"The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.","keyIdea":"The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.","selector":"[class~=\"aui-radio-group\"]","scope":"context"},
        {"id":"context-accordion","partId":"accordion","title":"Template sections","explanation":"Default Templates and My Templates as two Accordion sections, both open.","keyIdea":"Default Templates and My Templates as two Accordion sections, both open.","selector":"[class~=\"aui-accordion\"]","scope":"context"},
        {"id":"context-section-trigger","partId":"section-trigger","title":"Section header","explanation":"A Type l4 section label ending in a chevron.","keyIdea":"A Type l4 section label ending in a chevron.","selector":"[class~=\"aui-accordion-trigger\"]","scope":"context"},
        {"id":"context-template-radio","partId":"template-radio","title":"Template row","explanation":"A template row such as \"Two-beam connection\": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.","keyIdea":"A template row such as \"Two-beam connection\": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.","selector":"[class~=\"aui-radio\"]","scope":"context"},
        {"id":"context-template-label","partId":"template-label","title":"Template name","explanation":"The template name inside the radio, such as \"Three-beam connection\".","keyIdea":"The template name inside the radio, such as \"Three-beam connection\".","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]","scope":"context"},
        {"id":"context-row-action","partId":"row-action","title":"Row actions","explanation":"The Download, Delete (error colour) and Edit text buttons after a user-owned template row.","keyIdea":"The Download, Delete (error colour) and Edit text buttons after a user-owned template row.","selector":"[data-ug-part=\"row-action\"]","scope":"context"},
      ],
    },
    { id: "adm-templates", name: "Template picker — UI variant 2", apps: ["adm"], source: {"adm":"src/features/templates/components/NewFromTemplateDialog.tsx"}, contextAnatomy: ADM_CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-radio-group","partId":"radio-group","title":"Template choice","explanation":"The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.","keyIdea":"The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.","selector":"[class~=\"aui-radio-group\"]","scope":"context"},
        {"id":"context-section","partId":"section","title":"Template section","explanation":"A plain section that stacks a muted heading over its radio rows with a gap of 4 (no Accordion).","keyIdea":"A plain section that stacks a muted heading over its radio rows with a gap of 4 (no Accordion).","selector":"[data-ug-part=\"section\"]","scope":"context"},
        {"id":"context-template-radio","partId":"template-radio","title":"Template row","explanation":"A template row such as \"Two-beam connection\": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.","keyIdea":"A template row such as \"Two-beam connection\": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.","selector":"[class~=\"aui-radio\"]","scope":"context"},
        {"id":"context-template-label","partId":"template-label","title":"Template name","explanation":"The template name inside the radio, such as \"Three-beam connection\".","keyIdea":"The template name inside the radio, such as \"Three-beam connection\".","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]","scope":"context"},
        {"id":"context-row-action","partId":"row-action","title":"Row actions","explanation":"The Download, Delete (error colour) and Edit text buttons after a user-owned template row.","keyIdea":"The Download, Delete (error colour) and Edit text buttons after a user-owned template row.","selector":"[data-ug-part=\"row-action\"]","scope":"context"},
      ],
    },
    { id: "hs-templates", name: "Template picker — UI variant 3", apps: ["hs","fd"], source: {"hs":"src/hs/TemplateDialogs.tsx","fd":"src/components/TemplatesDialog.jsx"}, contextAnatomy: HS_CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-radio-group","partId":"radio-group","title":"Template choice","explanation":"The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.","keyIdea":"The one RadioGroup that makes the built-in and own templates a single choice, defaulting to Three-beam connection.","selector":"[class~=\"aui-radio-group\"]","scope":"context"},
        {"id":"context-accordion","partId":"accordion","title":"Template sections","explanation":"Default Templates and My Templates as two Accordion sections, both open.","keyIdea":"Default Templates and My Templates as two Accordion sections, both open.","selector":"[class~=\"aui-accordion\"]","scope":"context"},
        {"id":"context-section-trigger","partId":"section-trigger","title":"Section header","explanation":"A plain text section label ending in a chevron.","keyIdea":"A plain text section label ending in a chevron.","selector":"[class~=\"aui-accordion-trigger\"]","scope":"context"},
        {"id":"context-template-radio","partId":"template-radio","title":"Template row","explanation":"A template row such as \"Two-beam connection\": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.","keyIdea":"A template row such as \"Two-beam connection\": an outlined tonal Radio when unselected and a solid primary one when selected, filling the row.","selector":"[class~=\"aui-radio\"]","scope":"context"},
        {"id":"context-template-label","partId":"template-label","title":"Template name","explanation":"The template name inside the radio, such as \"Three-beam connection\".","keyIdea":"The template name inside the radio, such as \"Three-beam connection\".","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]","scope":"context"},
        {"id":"context-row-action","partId":"row-action","title":"Row actions","explanation":"The download, trash and pen icon buttons after a user-owned template row, each with its own aria-label.","keyIdea":"The download, trash and pen icon buttons after a user-owned template row, each with its own aria-label.","selector":"[data-ug-part=\"row-action\"]","scope":"context"},
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
