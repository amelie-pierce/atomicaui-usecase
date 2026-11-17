import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Walkthrough',
  title: 'Welcome dialog: Close and Start Walkthrough',
  apps: ['adm', 'fd'],
  cases: [
    { id: 'adm-welcome', name: 'Welcome dialog', apps: ['adm', 'fd'], source: { adm: 'src/features/top-navigation/components/Tutorials.tsx', fd: 'src/components/HelpCenter.jsx' } },
  ],
  source: {
    adm: 'src/features/top-navigation/components/Tutorials.tsx',
    fd: 'src/components/HelpCenter.jsx',
  },
  summary: 'A gray Close and a black Start Walkthrough end the welcome dialog, and the second one opens the guided tour.',
  where: 'The footer of the welcome dialog a first-time user sees (ADM Welcome to ADM, FD Getting Started). Real site source: ADM Tutorials.tsx and FD HelpCenter.jsx (WelcomeDialog). The other apps open the tour straight from their Help & Tutorials list (Button-025).',
  when: 'Use it where a welcome message offers the tour as an option, not a requirement; Close leaves it. Do not use it for confirm dialogs; Button-001 covers those.',
  how: "Two Dialog.Buttons with dismiss={false}, aui scale \"sm\", paint \"solid\" and shape \"soft\": Close with color \"surface-alt\" (gray), Start Walkthrough with color \"secondary\" (black); the app closes the dialog itself and starts the tour. ADM and FD write the same footer, so there is one UI, one group and no toggle. The scene keeps the 384px dialog, its Title with the close X, one line of text and the footer; the real ADM dialog adds an image and a Key Features list, and FD's has a description and four features.",
});
