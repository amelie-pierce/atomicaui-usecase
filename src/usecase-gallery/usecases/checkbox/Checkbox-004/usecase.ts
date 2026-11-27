import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Checkbox group',
  title: 'Object visibility checkbox group',
  apps: ['hcs', 'adc', 'adm', 'fd', 'hs', 'pbs', 'agpd', 'rws'],
    layers: [
        {"id":"title","partId":"title","title":"Group title","explanation":"Object Visibility heading groups the model display checkboxes.","keyIdea":"The group heading makes the visibility controls read as one model-display task.","selector":"[data-aui-typeface]","code":["Type"]},
        {"id":"checkbox","partId":"checkbox","title":"Checkbox","explanation":"Each checked box shows its named 3D model part.","keyIdea":"Each checkbox independently controls whether its named model part is shown.","selector":"[class~=\"aui-checkbox\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"The box that shows whether the model part is visible.","keyIdea":"The indicator gives every part a consistent visible-versus-hidden state.","selector":"[class~=\"aui-checkbox-indicator\"]","code":["Checkbox"]},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"Five scenes show a check mark; the compact example omits it.","keyIdea":"The check glyph confirms that this model element is currently included in the view.","selector":"[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]","code":["Checkbox.Icon"]},
        {"id":"label","partId":"label","title":"Label","explanation":"Part name beside each box identifies the model object it controls.","keyIdea":"Naming the part beside its box lets users change visibility without guessing which object it affects.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]"},
      ],
options: [
    { id: "hcs-visibility", showContext: false, name: "Object visibility", apps: ["hcs"], source: {"hcs":"src/App.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adc-visibility", showContext: false, name: "Part visibility", apps: ["adc"], source: {"adc":"src/adc/components/ConnectionModel.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adm-visibility", showContext: false, name: "Assembly visibility", apps: ["adm"], source: {"adm":"src/features/viewer/components/ViewerChrome.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "fd-visibility", showContext: false, name: "Model visibility", apps: ["fd"], source: {"fd":"src/components/Viewer.jsx"} ,
      contextLayers: [

      ],
    },
    { id: "hs-visibility", showContext: false, name: "Viewer visibility", apps: ["hs","pbs","agpd","rws"], source: {"hs":"src/hs/ViewerPane.tsx","pbs":"src/Viewer.tsx","agpd":"src/agpd/Viewer.tsx","rws":"src/rws/Viewer.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    hcs: 'src/App.tsx',
    adc: 'src/adc/components/ConnectionModel.tsx',
    adm: 'src/features/viewer/components/ViewerChrome.tsx',
    fd: 'src/components/Viewer.jsx',
    hs: 'src/hs/ViewerPane.tsx',
    pbs: 'src/Viewer.tsx',
    agpd: 'src/agpd/Viewer.tsx',
    rws: 'src/rws/Viewer.tsx',
  },
  summary: 'Checkboxes under a group title that show or hide the parts of the 3D model (Wall, Roof, Base plate, Anchors).',
  where: 'The 3D viewer controls of eight apps: HCS src/App.tsx, ADC src/adc/components/ConnectionModel.tsx, ADM src/features/viewer/components/ViewerChrome.tsx, FD src/components/Viewer.jsx, and the wrapped control row of HS src/hs/ViewerPane.tsx, PBS src/Viewer.tsx, AGPD src/agpd/Viewer.tsx and RWS src/rws/Viewer.tsx.',
  when: 'Use it to toggle independent parts of one drawing; each toggle is a Checkbox because several can be on. Do not use it for the camera choice (Perspective and Orthographic are a RadioGroup) or the Reset view button (Button-039 and the viewer buttons).',
  how: 'Every box is the 22px Checkbox (scale "sm" or none), selected color "primary" paint "solid", unselected color "surface" paint "tonal" with borderColor "outlined", the label 16px regular, except where noted. Five viewer groups, measured in headless Chromium. HCS: a column (gap 8) under a Type l3 semi-bold title (16px, weight 600) with Checkbox.Label at scale "sm". ADC: a column (gap 4) under a Type l5 bold title (12px, 700), the Checkboxes at scale "xs" and shape "soft": a 20px box, a 12px mark and a 14px weight 500 label, so it is the smallest. ADM: a compact column (gap 4) under a Type l5 semi-bold title (12px, 600), each row a Field (gap 6) with an icon-only Checkbox (aria-label, mark layer "duotone") and a Field.Label after it, 28px from the box start. FD: the same Field rows and title as ADM with the solid check (Checkbox.Icon name "check", Font Awesome 7 Pro instead of Duotone); FD disables Fasteners when the design does not pass and shows a "Select a Model to view Fasteners" tooltip, while the scene keeps it enabled without the tooltip. HS, PBS, AGPD, RWS: one wrapped row (gap 8) of Checkbox.Label boxes under the 3D view; PBS, AGPD and RWS lead it with an Object Visibility Type l4 semi-bold title (14px, 600) and HS has no title, so HS is merged with them. The group title is visible text here (a Type title or a Fieldset.Legend), where Checkbox-001 labels one option; a visible title against an aria-label, and `disabled`, are differences of the place inside this use case, not a split. The scenes leave out the results tables, the Reset view button, the camera radios, the 3D canvas and the Connection toggles that PBS, RWS and HCS disable until a model is chosen.',
  anatomy: [
    {
      id: "title",
      name: "Group title",
      selector: "[data-aui-typeface]",
      description: "The \"Object Visibility\" title, a Type role \"l4\" at semi-bold weight, that names the group of visibility checkboxes; some apps write it as a Field.Label.",
    },
    {
      id: "checkbox",
      name: "Checkbox",
      selector: "[class~=\"aui-checkbox\"]",
      description: "One of the visibility checkboxes (Wall, Roof, and Base plate or Anchors in the scenes) that shows or hides that part of the 3D model; checked by default.",
    },
    {
      id: "indicator",
      name: "Indicator",
      selector: "[class~=\"aui-checkbox-indicator\"]",
      description: "The box that shows whether the model part is visible.",
    },
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]",
      description: "The \"check\" mark used in the ADC, ADM, FD, HCS and HS scenes; the compact example draws the box without one.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The part name beside the box, such as Wall or Roof, in the wrapped row of the 3D viewer controls.",
    },
  ],
});
