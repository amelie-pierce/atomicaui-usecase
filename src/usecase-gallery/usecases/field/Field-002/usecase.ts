import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single-line field',
  title: 'Text field',
  apps: ['hcs', 'hs', 'pbs', 'pfd', 'fd', 'rws', 'agpd', 'adm', 'ace', 'adc'],
    layers: [
        {"id":"field","partId":"field","title":"Field","explanation":"Stacked text field with a 3 gap that ties the Connection ID label to its single-line control; ADC lays it out as a wrapping row with a 96px label.","keyIdea":"The wrapper connects the Connection ID prompt to the editable identifier.","selector":"[class~=\"aui-field\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The \"Connection ID\" label above the control; in ADC it is a 96px end-aligned label with a required asterisk in the error colour.","keyIdea":"A persistent label tells users what the single-line value represents.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"control","partId":"control","title":"Control","explanation":"The 28px surface-coloured outlined frame, 3/8 padding and a 4px radius, that wraps the text input.","keyIdea":"The outlined frame separates the text-entry area from surrounding form content.","selector":"[class~=\"aui-field-control\"]"},
        {"id":"input","partId":"input","title":"Input","explanation":"The editable line of text, prefilled with C-1042 and named by its aria-label.","keyIdea":"The editable value supplies the identifier that the labeled field is collecting.","selector":"[class~=\"aui-field-control\"] > [class~=\"aui-input\"]"},
      ],
options: [
    { id: "hs-text", name: "Text field", apps: ["hcs","hs","pbs","pfd","fd","rws","agpd","adm","ace"], note: "Label above.", source: {"hcs":"src/components/F01Experience.tsx","hs":"src/hs/InputFields.tsx","pbs":"src/InputFields.tsx","pfd":"src/pfd/ShellDialogs.tsx","fd":"src/components/Feedback.jsx","rws":"src/rws/ShellDialogs.tsx","agpd":"src/agpd/ShellDialogs.tsx","adm":"src/features/top-navigation/components/FeedbackDialog.tsx","ace":"src/features/top-navigation/ui/FeedbackDialog.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "adc-text-beside", name: "Side label text field", apps: ["adc"], note: "Label beside: a 96px end-aligned label, the control fills the rest of the row.", source: {"adc":"src/adc/Workspace.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', hs: 'src/hs/InputFields.tsx', pbs: 'src/InputFields.tsx', pfd: 'src/pfd/ShellDialogs.tsx', fd: 'src/components/Feedback.jsx', rws: 'src/rws/ShellDialogs.tsx', agpd: 'src/agpd/ShellDialogs.tsx', adm: 'src/features/top-navigation/components/FeedbackDialog.tsx', ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx', adc: 'src/adc/components/ProjectInfoField.tsx' },
  summary: 'A labelled field with one outlined control for a line of text.',
  where: 'All ten apps: the Send feedback form (name, email, subject), the save-as-template name, the HS and PBS connection ID of the input panel and the ADC project info of the project panel.',
  when: 'Use it for a single line of free text, such as a name, an email or an ID, where the label stays visible above the control. Use the label beside only in a form whose rows run label then control (the ADC project info). Use Field-005 for several lines of text and Field-001 for a number with a unit.',
  how: 'Label above (HCS, HS, PBS, PFD, FD, RWS, AGPD, ADM, ACE; ADC writes it beside, see the last group): a Field at scale "sm" with a 3 gap holds a Field.Label and a Field.Control (scale "sm", 28px high) with one Field.Input; the control frame is a surface-coloured outlined row, 3/8 padding and a 4px radius. PBS, RWS, AGPD, PFD, ACE, ADM, FD and ADC write exactly this; HCS writes a bare Input in the Field and renders the same 28px frame. The dialog forms (ACE, ADM, FD, HS, PFD, RWS, AGPD) leave the gap at the default 6px, a spacing difference only. Label beside (ADC): the Field is a row (gap 8, wrapping) with a Field.Label 96px wide, end-aligned, holding a required asterisk in the error colour, and a Field.Control with color "surface" filling the rest of the row. The apps show the field enabled. The scenes leave out the required asterisk of the label above, the help trigger, the placeholder, the error line (Field-003) and the form and dialog around the field.',
  anatomy: [
    {
      id: "field",
      name: "Field",
      selector: "[class~=\"aui-field\"]",
      description: "Stacked text field with a 3 gap that ties the Connection ID label to its single-line control; ADC lays it out as a wrapping row with a 96px label.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-field-label\"]",
      description: "The \"Connection ID\" label above the control; in ADC it is a 96px end-aligned label with a required asterisk in the error colour.",
    },
    {
      id: "control",
      name: "Control",
      selector: "[class~=\"aui-field-control\"]",
      description: "The 28px surface-coloured outlined frame, 3/8 padding and a 4px radius, that wraps the text input.",
    },
    {
      id: "input",
      name: "Input",
      selector: "[class~=\"aui-field-control\"] > [class~=\"aui-input\"]",
      description: "The editable line of text, prefilled with C-1042 and named by its aria-label.",
    },
  ],
});
