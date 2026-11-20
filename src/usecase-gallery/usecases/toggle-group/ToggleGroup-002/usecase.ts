import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'ToggleGroup',
  title: 'Hugging segments',
  apps: ['agpd'],
  cases: [{ id: 'agpd-fastener', name: 'Fastener switch', source: { agpd: 'src/agpd/inputs.tsx' } }],
  source: { agpd: 'src/agpd/inputs.tsx' },
  summary: 'Two segments sized to their labels with no outline of their own, switching the field they sit above.',
  where: 'The fastener switch (STN22 or SDWB) over the Diameter / Style field of AGPD (src/agpd/inputs.tsx).',
  when: 'Use it to switch the mode of one field next to it. Use the labelled segments (ToggleGroup-001) for a setting with its own label.',
  how: '`ToggleGroup` with `aui={{ paint: "text" }}` (no rail border), `value={[value]}`, `multiple={false}` and an `aria-label`; each `ToggleGroup.Item` renders the same Button and pressed-state View as ToggleGroup-001, but the View takes `paddingInlineStart` and `paddingInlineEnd` "6" and no `flex: "fill"`, so each segment hugs its text.',
});
