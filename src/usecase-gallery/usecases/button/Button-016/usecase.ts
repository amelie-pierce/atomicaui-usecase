import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Error screen',
  title: 'Retry',
  apps: ['hcs'],
  source: { hcs: 'src/components/F01Results.tsx' },
  cases: [
    { id: 'results', name: 'Results error strip' },
    { id: 'page', name: 'Error page (illustrative, not in HCS)' },
  ],
  summary: 'The default gray Button retries after an error.',
  where: 'Error screens: Try again (Retry). Real site source: HCS Button-005.',
  when: 'Use it for a plain recovery action that needs no emphasis. The real site uses it even when the Button is the only action on screen, so consider "secondary" there.',
  how: 'Set only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults. In context pick a case. The results error strip is the Output error state of the app: a solid error View with the message, then the button, with no flex props on the View, so the button sits under the message. The error page is an illustrative case, labelled as such in the scene: HCS has no error page (its only retry is the strip), so its heading and copy are not taken from the app; it shows the button as the only action on a page.',
});
