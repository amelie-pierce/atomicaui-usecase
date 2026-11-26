import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single checkbox',
  title: 'Input panel option checkbox',
  apps: ['hcs', 'hs', 'fd', 'adc', 'ace', 'pbs', 'agpd', 'adm'],
    layers: [
        {"id":"checkbox","partId":"checkbox","title":"Checkbox","explanation":"One yes-or-no input starts checked with a solid primary selected style.","keyIdea":"The checkable field stores a single binary input for the current option group.","selector":"[class~=\"aui-checkbox\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"Box shows whether Galvanized is included; off uses an outlined tonal style.","keyIdea":"The indicator shows whether Galvanized is included without repeating the text label.","selector":"[class~=\"aui-checkbox-indicator\"]","code":["View","Fieldset"]},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"The \"check\" mark rendered inside the box when Galvanized is on.","keyIdea":"A check glyph makes the affirmative state recognizable in the selected box.","selector":"[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]","code":["View","Fieldset"],"unchanged":true},
        {"id":"label","partId":"label","title":"Label","explanation":"Galvanized caption identifies the property; ADM places its field label above.","keyIdea":"The adjacent caption identifies exactly which property the checked value controls.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]"},
        {"id":"group","partId":"group","title":"Fieldset","explanation":"ACE uses a titled fieldset to name this checkbox group.","keyIdea":"ACE groups the related option under a named fieldset so its scope is clear.","selector":"[class~=\"aui-fieldset\"]","code":["View"]},
        {"id":"legend","partId":"legend","title":"Legend","explanation":"ACE legend names the checkbox option before the control.","keyIdea":"The legend names the group before users encounter its individual setting.","selector":"[class~=\"aui-fieldset-legend\"]","code":["View"],"unchanged":true},
        {"id":"field-label","partId":"field-label","title":"Field label","explanation":"Form label introduces the checkbox when it has no caption.","keyIdea":"A field label can introduce the row when the checkbox itself has no caption.","selector":"[class~=\"aui-field-label\"]","code":["View","Fieldset"],"unchanged":true},
      ],
options: [
    { id: "hcs-option", showContext: false, name: "Input panel option", apps: ["hcs","hs","fd","adc"], note: "A bare checkbox without a title.", source: {"hcs":"src/App.tsx","hs":"src/hs/InputFields.tsx","fd":"src/components/InputPane.jsx","adc":"src/adc/components/InputSections.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "ace-titled", showContext: false, name: "Titled input checkbox", apps: ["ace","pbs","agpd"], note: "A title sits above the checkbox; PBS and AGPD use a smaller gap than ACE.", source: {"ace":"src/features/estimator/ui/EstimatorInputPanel.tsx","pbs":"src/InputFields.tsx","agpd":"src/agpd/inputs.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adm-label-first", showContext: false, name: "Leading label checkbox", apps: ["adm"], note: "The label precedes the right-aligned checkbox.", source: {"adm":"src/features/design-inputs/components/GeometrySection/JointDistanceFields.tsx"} ,
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
