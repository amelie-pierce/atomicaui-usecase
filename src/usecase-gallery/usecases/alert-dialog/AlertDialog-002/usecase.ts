import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Alert / Confirm',
  title: 'Single centered action',
  apps: ['ace', 'hs'],
  cases: [
    {
      id: 'ace-relaunch',
      name: 'Relaunch notice',
      apps: ['ace', 'hs'],
      source: { ace: 'src/features/eula/ui/EulaGate.tsx', hs: 'src/hs/LicenseGate.tsx' },
    },
  ],
  source: { ace: 'src/features/eula/ui/EulaGate.tsx', hs: 'src/hs/LicenseGate.tsx' },
  summary: 'A blocking notice with no close X and one solid button centred in the footer, the only way forward.',
  where: 'Declined licence agreement in EC mode (ACE EulaGate.tsx and HS LicenseGate.tsx): the notice asks the user to relaunch and accept the agreement.',
  when: 'Use it when the user cannot continue and has exactly one choice. Do not use it when the user can cancel (AlertDialog-001).',
  how: 'In the apps this is `AlertDialog` with `clickOutsideToClose={false}`: Title (`color: "raised"`, text only, no icon, no close), Description, and `AlertDialog.Actions align="center"` holding one `AlertDialog.Button` with `dismiss={false}` and `color: "secondary", paint: "solid"`. The gallery draws it as a non-modal Dialog with the same parts (the kit has no modal-free AlertDialog); copy the code with `AlertDialog` in place of `Dialog`. ACE and HS render the same elements, so they are one group. The scene leaves out the reload handler.',
});
