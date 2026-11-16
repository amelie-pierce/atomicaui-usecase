import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Error screen',
  title: 'Retry',
  apps: ['hcs'],
  cases: [
    { id: 'results', name: 'Results error strip' },
    { id: 'page', name: 'Error page' },
  ],
  summary: 'The default gray Button retries after an error.',
  where: 'Error screens: Try again (Retry). Real site source: HCS Button-005.',
  when: 'Use it for a plain recovery action that needs no emphasis. The real site uses it even when the Button is the only action on screen, so consider "secondary" there.',
  how: 'Set only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults. In context pick a case: the red results strip (message then button, default colours on the error surface) or the error page (heading, paragraph, the button left-aligned below).',
});
