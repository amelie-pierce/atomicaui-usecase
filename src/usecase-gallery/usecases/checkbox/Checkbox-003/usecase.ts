import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  title: 'Object visibility toggles',
  apps: ['hcs', 'adc', 'adm', 'fd', 'hs', 'pbs', 'agpd', 'rws'],
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
  cases: [
    { id: 'hcs-visibility', name: 'Object visibility', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
    { id: 'adc-visibility', name: 'Object visibility', apps: ['adc'], source: { adc: 'src/adc/components/ConnectionModel.tsx' } },
    { id: 'adm-visibility', name: 'Object visibility', apps: ['adm'], source: { adm: 'src/features/viewer/components/ViewerChrome.tsx' } },
    { id: 'fd-visibility', name: 'Object visibility', apps: ['fd'], source: { fd: 'src/components/Viewer.jsx' } },
    {
      id: 'hs-visibility',
      name: 'Object visibility',
      apps: ['hs', 'pbs', 'agpd', 'rws'],
      label: 'Other apps',
      source: { hs: 'src/hs/ViewerPane.tsx', pbs: 'src/Viewer.tsx', agpd: 'src/agpd/Viewer.tsx', rws: 'src/rws/Viewer.tsx' },
    },
  ],
  summary: 'A titled set of Checkboxes under or beside the 3D view that show or hide the parts of the model (Wall, Roof, Base plate, Anchors).',
  where: 'The 3D viewer controls of eight apps: HCS src/App.tsx, ADC src/adc/components/ConnectionModel.tsx, ADM src/features/viewer/components/ViewerChrome.tsx, FD src/components/Viewer.jsx, and the wrapped control row of HS src/hs/ViewerPane.tsx, PBS src/Viewer.tsx, AGPD src/agpd/Viewer.tsx and RWS src/rws/Viewer.tsx.',
  when: 'Use it to toggle independent parts of one drawing; each toggle is a Checkbox because several can be on. Do not use it for the camera choice (Perspective and Orthographic are a RadioGroup) or the Reset view button (Button-019 and the viewer buttons).',
  how: 'Every box is the 22px Checkbox (scale "sm" or none), selected color "primary" paint "solid", unselected color "surface" paint "tonal" with borderColor "outlined", the label 16px regular, except where noted. Five groups, measured in headless Chromium. HCS: a column (gap 8) under a Type l3 semi-bold title (16px, weight 600) with Checkbox.Label at scale "sm". ADC: a column (gap 4) under a Type l5 bold title (12px, 700), the Checkboxes at scale "xs" and shape "soft": a 20px box, a 12px mark and a 14px weight 500 label, so it is the smallest. ADM: a compact column (gap 4) under a Type l5 semi-bold title (12px, 600), each row a Field (gap 6) with an icon-only Checkbox (aria-label, mark layer "duotone") and a Field.Label after it, 28px from the box start. FD: the same Field rows and title as ADM with the solid check (Checkbox.Icon name "check", Font Awesome 7 Pro instead of Duotone); FD disables a row and explains it in a hover tooltip. Other apps (HS, PBS, AGPD, RWS): one wrapped row (gap 8) of Checkbox.Label boxes under the 3D view; PBS, AGPD and RWS lead it with an Object Visibility Type l4 semi-bold title (14px, 600) and HS has no title, so HS is merged with them. The scenes leave out the Reset view button, the camera radios, the 3D canvas and the Connection toggles that PBS, RWS and HCS disable until a model is chosen (the scenes show every toggle enabled).',
});
