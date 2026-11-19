import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Secondary solid',
  apps: ['hcs'],
  source: { hcs: 'src/components/F01Results.tsx' },
  cases: [
    { id: 'results', name: 'Results error strip' },
  ],
  summary: 'The default gray Button retries after an error.',
  where: 'The Results error strip: Try again (Retry). Real site source: HCS Button-005 (F01Results.tsx). No other app has a Retry Button in its source (checked in ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS and ADC), so this use case stays HCS only.',
  when: 'Use it for a plain recovery action that needs no emphasis.',
  how: 'Set only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults. In context it is the Output error state of the app: a solid error View with the message, then the button, with no flex props on the View, so the button sits under the message.',
});
