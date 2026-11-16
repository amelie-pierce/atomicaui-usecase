import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Output header',
  title: 'Print Output',
  apps: ['hcs'],
  cases: [
    { id: 'enabled', name: 'Enabled' },
    { id: 'disabled', name: 'Disabled (inputs invalid)' },
  ],
  summary: 'A quiet tonal Button with a print icon is the last item of a results pane header.',
  where: 'The action group at the right of the Output pane header, after Back to top, Table Notes and Configure columns (not in the table toolbar). Real site source: HCS Button-004 (Print Output). View options, the other tonal button, lives in the 3D viewer (Button-019).',
  when: 'Use the tonal surface Button for a tertiary action that should read as a button but stay quieter than a solid one. Add the native disabled attribute while an action is unavailable (the app disables Print while the inputs are invalid).',
  how: "Set aui scale \"sm\", color \"surface\" and paint \"tonal\", plus sx flex \"none\" to stop it shrinking in a flex row, with Button.Icon print before the label. In context the scene is the Output pane as the app composes it: pane frame, wrapping header with the action group at the end (the app pushes it with a local margin, here an inline one), Configure columns while the results are valid, Print Output last, then the toolbar, results table and Table Notes. The scroll helpers show only after scrolling (Button-010), so they are absent. In the Disabled case the inputs are invalid: Configure columns is not rendered, Print Output takes the native disabled attribute, the toolbar loses the count and the product filter is disabled, and the body is the placeholder line.",
});
