import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  title: 'Viewer control tooltip',
  apps: ['adm', 'fd', 'pbs', 'rws'],
  cases: [
    {
      id: 'adm-viewer-reset',
      name: 'Viewer control',
      apps: ['adm', 'fd'],
      source: { adm: 'src/features/viewer/components/ViewerChrome.tsx', fd: 'src/components/Viewer.jsx' },
    },
    {
      id: 'pbs-viewer-radio',
      name: 'Viewer control',
      apps: ['pbs', 'rws'],
      source: { pbs: 'src/Viewer.tsx', rws: 'src/rws/Viewer.tsx' },
    },
  ],
  source: { adm: 'src/features/viewer/components/ViewerChrome.tsx', fd: 'src/components/Viewer.jsx', pbs: 'src/Viewer.tsx', rws: 'src/rws/Viewer.tsx' },
  summary: 'A control on the 3D viewer names what it does in a tooltip beside it.',
  where: 'The floating controls over the 3D viewer: the Reset View button and visibility rows (ADM ViewerChrome, FD Viewer) and the view and member radios (PBS and RWS Viewer).',
  when: 'Use it for a viewer control whose effect is not obvious from its icon or short label. A plain header icon button is Tooltip-001.',
  how: 'ADM and FD: the Reset View IconButton (crosshairs, paint text, color secondary, scale sm) is the Tooltip.Trigger; the popup is aui paint solid, color secondary, scale sm and opens to the left (side left, 8px offset) because the controls sit at the right edge; FD also gives its visibility checkbox rows the same left tooltip. PBS and RWS: a Radio with its Radio.Label, inside a RadioGroup, is wrapped in a span used as the trigger (closeOnClick off, so the arrow-key check does not close it); the popup is the kit default (surface) above the radio (side top, 4px offset). Placement is a note and the popup colour is the difference between the two groups. PBS also puts the same top tooltip on its Reset View labelled Button. The scenes show one control with the tooltip open and leave out the rest of the viewer controls and the canvas.',
});
