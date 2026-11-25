import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'ToggleGroup',
  title: 'Hugging segments',
  apps: ['agpd'],
  options: [
    { id: "agpd-fastener", name: "Fastener switch", source: {"agpd":"src/agpd/inputs.tsx"} },
  ],
  source: { agpd: 'src/agpd/inputs.tsx' },
  summary: 'Two segments sized to their labels with no outline of their own, switching the field they sit above.',
  where: 'The fastener switch (STN22 or SDWB) over the Diameter / Style field of AGPD (src/agpd/inputs.tsx).',
  when: 'Use it to switch the mode of one field next to it. Use the labelled segments (ToggleGroup-001) for a setting with its own label.',
  how: '`ToggleGroup` with `aui={{ paint: "text" }}` (no rail border), `value={[value]}`, `multiple={false}` and an `aria-label`; each `ToggleGroup.Item` renders the same Button and pressed-state View as ToggleGroup-001, but the View takes `paddingInlineStart` and `paddingInlineEnd` "6" and no `flex: "fill"`, so each segment hugs its text.',
  anatomy: [
    {
      id: "group",
      name: "Group",
      selector: "[class~=\"aui-toggle-group\"]",
      description: "The fastener switch named \"Fastener\", with STN22 chosen, that sizes to its labels and draws no outline of its own.",
    },
    {
      id: "item",
      name: "Item",
      selector: "[class~=\"aui-toggle-group\"] > button",
      description: "One option, STN22 or SDWB, rendered through a text Button at scale \"xs\" with zero padding so only the segment shows.",
    },
    {
      id: "segment",
      name: "Segment",
      selector: "[class~=\"aui-toggle-group\"] > button [class~=\"aui-view\"]",
      description: "The span that paints the pressed option solid secondary with soft corners and 6px inline padding, so each segment hugs its label.",
    },
    {
      id: "text",
      name: "Option text",
      selector: "[class~=\"aui-toggle-group\"] > button [data-aui-typeface]",
      description: "The fastener name, STN22 or SDWB, in a Type role \"l5\" at medium weight.",
    },
    {
      id: "field",
      name: "Field below",
      selector: "[class~=\"aui-field-control\"]",
      description: "The Diameter / Style field that the switch sits above and drives in the AGPD scene.",
    },
  ],
});
