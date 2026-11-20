import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Dark solid',
  apps: ['hs', 'ace', 'fd'],
  source: {
    hs: 'src/hs/OutputPane.tsx',
    ace: 'src/features/calculation/ui/CalculationOutput.tsx',
    fd: 'src/App.jsx',
  },
  cases: [
    { id: 'hs-button', name: 'Add selected result', apps: ['hs'], source: { hs: 'src/hs/OutputPane.tsx' } },
    { id: 'ace-button', name: 'Add new entry', apps: ['ace'], source: { ace: 'src/features/calculation/ui/CalculationOutput.tsx' } },
    { id: 'ace-relaunch', name: 'Centred action', apps: ['ace', 'hs'], source: { ace: 'src/features/eula/ui/EulaGate.tsx', hs: 'src/hs/LicenseGate.tsx' } },
    { id: 'fd-close', name: 'Info Close', apps: ['fd'], source: { fd: 'src/App.jsx' } },
  ],
  summary: 'A solid secondary Button, black with white text, is the one strong action of a place: add the current result to a job list, accept the licence, or close an info dialog.',
  where: 'Next to the results table that feeds a list, and the footer of a dialog whose one button must stand out. Real site source: HS src/hs/OutputPane.tsx (Add to Job List, first item of the table toolbar through ResultsTable `actions`); ACE src/features/calculation/ui/CalculationOutput.tsx (Add job, under the Job tally table); ACE src/features/eula/ui/EulaGate.tsx and HS src/hs/LicenseGate.tsx (the centred button of the declined licence dialog); FD src/App.jsx (the Close of the Explore More Applications dialog). ADM, PFD, PBS, HCS, AGPD, RWS and ADC have no add-to-list Button.',
  when: 'Use the labelled Button when one result is chosen elsewhere (HS disables it until a result is selected or while a job is being edited), or to append an empty entry (ACE). In a dialog use it only where the user must act, such as relaunch to accept the licence, or where the app wants a black Close instead of the gray default of Button-016.',
  how: 'The example is the HS Button: aui color "secondary", paint "solid", scale "sm", text only. The preview shows the radio group of the places; each has one group of apps, so there is no app toggle except in Centred action. The two table Buttons are separate places because they serve different purposes: one adds the result the user chose, the other appends an empty entry. '
    + 'Add selected result: HS only (the example, first item of the wrapping toolbar row, before the search field; disabled until a result is selected or while a job is being edited). '
    + 'Add new entry: ACE only (the same secondary solid recipe with Button.Icon plus before "Add job", under the table in a column with the table title, stretching across it; it appends an empty job and needs no selection). '
    + 'Centred action: ACE and HS (EC mode: an AlertDialog with no close X, Dialog.Actions align "center", one Dialog.Button with color "secondary", paint "solid" and dismiss={false}). '
    + 'Info Close: FD only (the Explore More Applications Modal ends with a plain Button with color "secondary", a black fill, not the gray Dialog.Button the other apps use). '
    + 'Left out: the other columns and rows, the count, Reset filters and Download CSV (HS), and the dialog bodies beyond one paragraph.',
});
