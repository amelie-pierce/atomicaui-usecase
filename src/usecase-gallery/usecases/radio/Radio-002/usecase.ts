import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Radio',
  title: 'Camera projection radio group',
  apps: ['hcs', 'fd', 'adc', 'pbs'],
  cases: [
    {
      id: 'hcs-projection',
      name: 'Projection',
      apps: ['hcs', 'fd'],
      source: { hcs: 'src/App.tsx', fd: 'src/components/Viewer.jsx' },
    },
    {
      id: 'adc-projection',
      name: 'Projection',
      apps: ['adc'],
      source: { adc: 'src/adc/components/ConnectionModel.tsx' },
    },
    {
      id: 'pbs-projection-tooltip',
      name: 'Projection',
      apps: ['pbs'],
      source: { pbs: 'src/Viewer.tsx' },
    },
  ],
  source: {
    hcs: 'src/App.tsx',
    fd: 'src/components/Viewer.jsx',
    adc: 'src/adc/components/ConnectionModel.tsx',
    pbs: 'src/Viewer.tsx',
  },
  summary: 'The camera projection radios of the 3D viewer, Perspective and Orthographic, with no label, next to the other view controls.',
  where: 'The viewer controls of HCS (the desktop controls and the View options popover), FD and ADC (the radios alone) and PBS (the view mode radios, each with a tooltip). Real site source: the viewer file of each app (the paths are in source).',
  when: 'Use it for the camera choice that sits next to the other view controls, where the group needs no label. Add a tooltip per radio when the label alone does not say what the choice does (PBS). Do not use it for an input of a form (Radio-001) or for the Object Visibility checkboxes (Checkbox-004).',
  how: 'One RadioGroup at scale "sm" with no padding. HCS and FD: an aria-label "Camera projection" on the group and a surface solid frame with a 1 outlined border unselected and a solid primary selected; the scene puts the group in the column the controls stack in (start-aligned, gap 4). ADC writes the group at scale "xs" with a 4 gap and the tonal outlined selection look; its measured labels are 14px/500 versus 16px/400 in HCS and FD (20px versus 22px dots), so it has its own app group. PBS (the tooltip group, written as another group of the same case): a row with gap 8 and aria-label "View mode"; each Radio sits in a Tooltip.Trigger rendered as a span with closeOnClick off (the trigger props would otherwise land on the inner dot, and the group checks a radio on arrow keys with a click that would block the tooltip on focus); the Tooltip.Positioner is on top, 4px off, and each popup is one sentence. The scenes leave out the lock hint of the label row, the per-radio disabled rule, the drawer around the settings popover, the Reset view button, the orientation cube and the Object Visibility checkboxes; the viewer canvas is a stand-in; the apps show the group enabled and the tooltip scene shows the Perspective tooltip open.',
  anatomy: [
    {
      id: "group",
      name: "Radio group",
      token: "RadioGroup",
      selector: "[class~=\"aui-radio-group\"]",
      description: "The projection group named by aria-label \"Camera projection\", Perspective selected by default; it sits among the 3D viewer controls.",
      code: [
        "<RadioGroup aria-label=\"Camera projection\" defaultValue=\"perspective\" aui={{ scale: 'sm', profile: 'no-padding' }}>",
        "  …",
        "</RadioGroup>",
      ].join("\n"),
    },
    {
      id: "radio",
      name: "Radio",
      token: "Radio",
      selector: "[class~=\"aui-radio\"]",
      description: "Perspective or Orthographic: a solid surface circle with a 1px outlined border when off and solid primary when chosen.",
      code: [
        "<Radio value=\"perspective\" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>",
        "  <Radio.Label>Perspective</Radio.Label>",
        "</Radio>",
      ].join("\n"),
    },
    {
      id: "indicator",
      name: "Indicator",
      selector: "[class~=\"aui-radio-indicator\"]",
      description: "The circle that marks the active camera projection.",
      code: [
        "<Radio value=\"perspective\" aui={{ … }}>",
        "  …",
        "</Radio>",
      ].join("\n"),
    },
    {
      id: "label",
      name: "Label",
      token: "Radio.Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The projection name, Perspective or Orthographic; PBS wraps each radio in a tooltip.",
      code: [
        "<Radio.Label>Perspective</Radio.Label>",
      ].join("\n"),
    },
  ],
});
