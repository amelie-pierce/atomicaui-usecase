import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  title: 'Search field',
  apps: ['hcs', 'hs', 'pfd', 'fd', 'pbs', 'rws'],
  cases: [
    {
      id: 'hs-search',
      name: 'Search field',
      apps: ['hcs', 'hs', 'pfd', 'fd'],
      note: 'The box ends with a clear button.',
      source: { hcs: 'src/App.tsx', hs: 'src/hs/ResultsTable.tsx', pfd: 'src/pfd/ResultsTable.tsx', fd: 'src/components/Results.jsx' },
    },
    {
      id: 'pbs-search',
      name: 'Search field',
      apps: ['pbs', 'rws'],
      note: 'Icon only: the box has no clear button.',
      source: { pbs: 'src/ResultsSection.tsx', rws: 'src/rws/output.tsx' },
    },
  ],
  source: { hcs: 'src/App.tsx', hs: 'src/hs/ResultsTable.tsx', pfd: 'src/pfd/ResultsTable.tsx', fd: 'src/components/Results.jsx', pbs: 'src/ResultsSection.tsx', rws: 'src/rws/output.tsx' },
  summary: 'A search box with a magnifying-glass icon at the start and, in some apps, a clear button at the end.',
  where: 'The table toolbar of HCS, HS, PFD, FD, PBS and RWS. The same icon-only box sits above the column list popovers (HS, HCS, FD) and the release notes of the About dialogs (HCS, HS, PBS, PFD, RWS).',
  when: 'Use it to filter a table or a list by text as the user types. Add the clear button where the box is a table toolbar and the user may want to reset in one click; leave it off a short list search.',
  how: 'Clear button (HCS, HS, PFD, FD): a Field at scale "sm" holds a Field.Control (28px outlined row) with a Field.Icon name "magnifying-glass", a Field.Input (placeholder "Search Table") and a Field.Button with aria-label "Clear search" holding a Field.ButtonIcon name "xmark" (20px, no fill). HS, HCS and PFD draw the button all the time; FD only once the box has text. The apps give the Field minWidth 112px and flex fill to share the toolbar row; the scene takes the host width. Icon only (PBS, RWS): the same field without the Field.Button; the input fills the row to its end. The apps show the field enabled. The scenes leave out the Reset filters button and the other toolbar controls (Button-007 and the table use cases cover them).',
});
