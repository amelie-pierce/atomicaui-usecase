import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  title: 'Viewer control tooltip',
  apps: ['adm', 'fd', 'pbs', 'rws'],
  cases: [
    {
      id: 'pbs-viewer-radio',
      name: 'Viewer control',
      apps: ['adm', 'fd', 'pbs', 'rws'],
      source: { adm: 'src/features/viewer/components/ViewerChrome.tsx', fd: 'src/components/Viewer.jsx', pbs: 'src/Viewer.tsx', rws: 'src/rws/Viewer.tsx' },
    },
  ],
  source: { adm: 'src/features/viewer/components/ViewerChrome.tsx', fd: 'src/components/Viewer.jsx', pbs: 'src/Viewer.tsx', rws: 'src/rws/Viewer.tsx' },
  summary: 'A control on the 3D viewer names what it does in a tooltip beside it.',
  where: 'The floating controls over the 3D viewer: the Reset View button and visibility rows (ADM ViewerChrome, FD Viewer) and the view and member radios (PBS and RWS Viewer).',
  when: 'Use it for a viewer control whose effect is not obvious from its icon or short label. A plain header icon button is Tooltip-001.',
  how: 'A viewer control is the Tooltip.Trigger: PBS and RWS wrap a Radio with its Radio.Label, inside a RadioGroup, in a span (closeOnClick off, so the arrow-key check does not close it); ADM and FD put the tooltip on the Reset View IconButton. The apps are one group; no placement or popup surface was measured in a browser, so none splits it. From the tooltip source, RWS requests the bottom side with a 4px offset; collision handling may flip the requested side when space is limited. The scene shows one control with the tooltip open and leaves out the rest of the viewer controls and the canvas.',
});
