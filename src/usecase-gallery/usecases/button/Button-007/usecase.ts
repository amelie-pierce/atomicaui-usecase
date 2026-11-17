import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Output header',
  title: 'Print Output',
  apps: ['hcs'],
  source: { hcs: 'src/App.tsx' },
  cases: [
    { id: 'enabled', name: 'Enabled' },
    { id: 'disabled', name: 'Disabled (inputs invalid)' },
  ],
  summary: 'A quiet tonal Button with a print icon is the last item of a results pane header.',
  where: 'The action group at the right of the Output pane header, after Back to top, Table Notes and Configure columns (not in the table toolbar). Real site source: HCS Button-004 (Print Output). View options, the other tonal button, lives in the 3D viewer (Button-019). Built from the Output pane header in src/App.tsx.',
  when: 'Use the tonal surface Button for a tertiary action that should read as a button but stay quieter than a solid one. Add the native disabled attribute while an action is unavailable (the app disables Print while the inputs are invalid).',
  how: "Set aui scale \"sm\", color \"surface\" and paint \"tonal\", plus sx flex \"none\" to stop it shrinking in a flex row, with Button.Icon print before the label. In context the scene is the Output pane cut to its header: the pane frame and the wrapping header with the title and the action group at the end (the app pushes it with a local margin, here an inline one), holding Print Output. The Disabled case is the same header with the native disabled attribute (the app disables Print while the inputs are invalid). Configure columns, the scroll helpers, the toolbar, the results table and Table Notes are left out.",
});
