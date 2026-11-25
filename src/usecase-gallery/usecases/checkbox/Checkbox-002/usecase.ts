import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single checkbox',
  title: 'Input panel option checkbox',
  apps: ['hcs', 'hs', 'fd', 'adc', 'ace', 'pbs', 'agpd', 'adm'],
    layers: [
        {"id":"checkbox","partId":"checkbox","title":"Checkbox","explanation":"The checkable control for one yes or no input of an input section, checked by default, with the primary solid selected style.","keyIdea":"The checkable control for one yes or no input of an input section, checked by default, with the primary solid selected style.","selector":"[class~=\"aui-checkbox\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"The box that shows the Galvanized state; HCS, HS, FD and ADC draw it with the same outlined, surface-tonal off style.","keyIdea":"The box that shows the Galvanized state; HCS, HS, FD and ADC draw it with the same outlined, surface-tonal off style.","selector":"[class~=\"aui-checkbox-indicator\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"The \"check\" mark rendered inside the box when Galvanized is on.","keyIdea":"The \"check\" mark rendered inside the box when Galvanized is on.","selector":"[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The caption \"Galvanized\" beside the box; the other apps use their own option text, such as Same inputs as Left Hip, and ADM instead puts a Field.Label (Center to joint) before a label-less checkbox.","keyIdea":"The caption \"Galvanized\" beside the box; the other apps use their own option text, such as Same inputs as Left Hip, and ADM instead puts a Field.Label (Center to joint) before a label-less checkbox.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]"},
        {"id":"group","partId":"group","title":"Fieldset","explanation":"ACE groups the checkbox under a titled group, with a Fieldset and a legend above the option.","keyIdea":"ACE groups the checkbox under a titled group, with a Fieldset and a legend above the option.","selector":"[class~=\"aui-fieldset\"]"},
        {"id":"legend","partId":"legend","title":"Legend","explanation":"The group title that sits above the checkbox in the ACE titled scene.","keyIdea":"The group title that sits above the checkbox in the ACE titled scene.","selector":"[class~=\"aui-fieldset-legend\"]"},
        {"id":"field-label","partId":"field-label","title":"Field label","explanation":"The label of a Field above a checkbox in a form row.","keyIdea":"The label of a Field above a checkbox in a form row.","selector":"[class~=\"aui-field-label\"]"},
      ],
options: [
    { id: "hcs-option", showContext: false, name: "Input panel option", apps: ["hcs","hs","fd","adc"], note: "A bare checkbox without a title.", source: {"hcs":"src/App.tsx","hs":"src/hs/InputFields.tsx","fd":"src/components/InputPane.jsx","adc":"src/adc/components/InputSections.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "ace-titled", showContext: false, name: "Input panel option — UI variant 2", apps: ["ace","pbs","agpd"], note: "A title sits above the checkbox; PBS and AGPD use a smaller gap than ACE.", source: {"ace":"src/features/estimator/ui/EstimatorInputPanel.tsx","pbs":"src/InputFields.tsx","agpd":"src/agpd/inputs.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adm-label-first", showContext: false, name: "Input panel option — UI variant 3", apps: ["adm"], note: "The label precedes the right-aligned checkbox.", source: {"adm":"src/features/design-inputs/components/GeometrySection/JointDistanceFields.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    hcs: 'src/App.tsx',
    hs: 'src/hs/InputFields.tsx',
    fd: 'src/components/InputPane.jsx',
    adc: 'src/adc/components/InputSections.tsx',
    ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx',
    pbs: 'src/InputFields.tsx',
    agpd: 'src/agpd/inputs.tsx',
    adm: 'src/features/design-inputs/components/GeometrySection/JointDistanceFields.tsx',
  },
  summary: 'A Checkbox with its label that answers one yes or no input of an input section: Galvanized, Predrill, Same inputs as Left Hip.',
  where: 'HCS src/App.tsx (Galvanized), HS src/hs/InputFields.tsx (Same inputs as Left Hip), FD src/components/InputPane.jsx (wood structural panel, Predrill), ADC src/adc/components/InputSections.tsx and EurocodeInputs.tsx (Equal Spacing and the option lists), ACE src/features/estimator/ui/EstimatorInputPanel.tsx (water filled holes, paste over both sides), PBS src/InputFields.tsx (Rotate Post Orientation, Rough Sawn), AGPD src/agpd/inputs.tsx (include plates) and ADM JointDistanceFields.tsx (centre the joint).',
  when: 'Use it for one on or off input of an input section that has no unit. Do not use it for an exclusive choice (a RadioGroup, or a Field.Select when there are many), an on and off setting that applies at once (a Switch) or a column filter (Dropdown-001). A set of Checkboxes under a title is Checkbox-004; a Checkbox that sits in a Field next to the other inputs is Field; the help icon beside a title is Button-032.',
  how: 'The Checkbox has aui scale "sm" (22px box, a 14px mark, radius 4px) and per-state appearance in states: unselected color "surface" paint "tonal" with sx borderColor "outlined" (a white box with a 1px border), selected color "primary" paint "solid" (no border). Checkbox.Icon name "check" is the mark and Checkbox.Label is the caption on its right with an 8px gap: 16px regular. The box sits in a column of the input section (View, flex column, gap 8). HCS, HS, FD and ADC: a bare Checkbox with Checkbox.Label, no title (HCS adds a muted note below and sets the label scale "sm", which renders the same 16px; ADC and FD omit scale, the same 22px box). ACE, PBS and AGPD: a Fieldset with a Fieldset.Legend (16px regular) over the Checkbox, 32px from the legend top to the box top (the Fieldset default gap); PBS and AGPD use a View group with a Label span as the title, the same 16px regular, with the box 23px below the title top (a 3px gap), a 9px spacing difference from ACE, so all three share one group. ADM: the Checkbox is a bare control of a Field row with a Field.Label before it, right-aligned (justifyContent "end", gap 8, 22px box at the end), an aria-label on the box and the duotone mark (Checkbox.Icon layer "duotone"). The scenes leave out the neighbouring fields, the help icons and locks of the label rows, and show the enabled state (HCS and ADC disable some options in the app).',
  anatomy: [
    {
      id: "checkbox",
      name: "Checkbox",
      selector: "[class~=\"aui-checkbox\"]",
      description: "The checkable control for one yes or no input of an input section, checked by default, with the primary solid selected style.",
    },
    {
      id: "indicator",
      name: "Indicator",
      selector: "[class~=\"aui-checkbox-indicator\"]",
      description: "The box that shows the Galvanized state; HCS, HS, FD and ADC draw it with the same outlined, surface-tonal off style.",
    },
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]",
      description: "The \"check\" mark rendered inside the box when Galvanized is on.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The caption \"Galvanized\" beside the box; the other apps use their own option text, such as Same inputs as Left Hip, and ADM instead puts a Field.Label (Center to joint) before a label-less checkbox.",
    },
    {
      id: "group",
      name: "Fieldset",
      selector: "[class~=\"aui-fieldset\"]",
      description: "ACE groups the checkbox under a titled group, with a Fieldset and a legend above the option.",
    },
    {
      id: "legend",
      name: "Legend",
      selector: "[class~=\"aui-fieldset-legend\"]",
      description: "The group title that sits above the checkbox in the ACE titled scene.",
    },
    {
      id: "field-label",
      name: "Field label",
      selector: "[class~=\"aui-field-label\"]",
      description: "The label of a Field above a checkbox in a form row.",
    },
  ],
});
