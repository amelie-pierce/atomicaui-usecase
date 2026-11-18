import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  title: 'Radio with a tooltip',
  apps: ['pbs'],
  cases: [{ id: 'pbs-projection', name: 'View mode', apps: ['pbs'], source: { pbs: 'src/Viewer.tsx' } }],
  source: { pbs: 'src/Viewer.tsx' },
  summary: 'A radio of a group that explains its choice in a tooltip on hover or focus.',
  where: 'The view mode radios (Perspective and Orthographic) over the 3D viewer of PBS. Real site source: src/Viewer.tsx.',
  when: 'Use it when the radio label alone does not say what the choice does and every option needs a line of help. Use RadioGroup-001 for the same two projection radios without a tooltip (HCS, FD, ADC).',
  how: 'Each Radio is wrapped in a Tooltip.Trigger rendered as a span with closeOnClick off (the trigger props would otherwise land on the inner dot, and the group checks a radio on arrow keys with a click that would block the tooltip on focus); the Radio sits in a RadioGroup at scale "sm" in a row with gap 8, unselected a tonal outlined surface and selected a solid primary. The Tooltip.Positioner is on top, 4px off, and each popup is one sentence. The scene shows the Perspective tooltip open and leaves out the Reset View button, the Object Visibility checkboxes; the viewer canvas is a stand-in; the app shows the group enabled.',
});
