import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Open field help button',
  look: 'Ghost, 20px',
  apps: ['hcs', 'pbs', 'rws'],
  cases: [
    { id: 'hcs-field-help', name: 'Field help', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
    { id: 'pbs-field-help', name: 'Field help', apps: ['pbs'], source: { pbs: 'src/InputFields.tsx' } },
    { id: 'rws-field-help', name: 'Field help', apps: ['rws'], source: { rws: 'src/rws/inputs.tsx' } },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', pbs: 'src/ResultsSection.tsx', rws: 'src/rws/ShellDialogs.tsx' },
  summary: 'A transparent icon-only IconButton with a circle-question, 20px square, opens the help of a field from beside its label.',
  where: 'After a field label in the input pane (HCS, PBS, RWS); it opens a popover that holds the long explanation, closed by Button-030. The apps whose field-help trigger is a 28px square are in Button-038.',
  when: 'Use it to explain one field without adding permanent text. Always set aria-label; the popover it opens holds the explanation.',
  how: 'HCS: an IconButton with aui scale "sm", profile "contained", color "secondary", paint "text" and shape "soft", with the circle-question glyph. '
    + 'In context it is the Load Properties section: Download Duration alone, the label row (label text, then the icon, a flex row) above its select; the other fields are left out. '
    + 'PBS: a Button with a ContainedIcon circle-question child at profile "square-compact" so the label row keeps its height, opening a 320px popover. '
    + 'RWS: a Button at profile "square" pinned to 20px by sx, opening a 320px popover. Each help scene keeps one labelled field and one sentence of help text.',
});
