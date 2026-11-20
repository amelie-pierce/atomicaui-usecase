import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Accept licence dialog',
  look: 'Do Not Accept and Accept',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    { id: 'hcs-accept', name: 'Accept licence', apps: ['hcs'], source: { hcs: 'src/components/F01Experience.tsx' } },
    { id: 'ace-accept', name: 'Accept licence', apps: ['ace', 'adm', 'pfd', 'hs', 'fd', 'agpd', 'rws', 'pbs'], source: { ace: 'src/features/eula/ui/EulaGate.tsx', adm: 'src/features/eula/components/EulaGate.tsx', pfd: 'src/pfd/LicenseGate.tsx', hs: 'src/hs/LicenseGate.tsx', fd: 'src/components/LicenseGate.jsx', agpd: 'src/agpd/LicenseGate.tsx', rws: 'src/rws/LicenseGate.tsx', pbs: 'src/LicenseGate.tsx' } },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', ace: 'src/features/eula/ui/EulaGate.tsx', adm: 'src/features/eula/components/EulaGate.tsx', pfd: 'src/pfd/LicenseGate.tsx', hs: 'src/hs/LicenseGate.tsx', fd: 'src/components/LicenseGate.jsx', agpd: 'src/agpd/LicenseGate.tsx', rws: 'src/rws/LicenseGate.tsx', pbs: 'src/LicenseGate.tsx' },
  summary: 'A gate that asks the user to accept the licence agreement before the app opens: a Do Not Accept and a solid Accept.',
  where: 'The first screen of the app. Real site source: HCS F01Experience.tsx and the LicenseGate or EulaGate of ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (the paths are in source). ADC has no licence gate. '
    + 'The declined state is AlertDialog-002.',
  when: 'Use it when the user must accept terms before continuing. HCS and ACE keep Accept disabled until the text is read to the end; the other apps never disable it.',
  how: 'Do Not Accept is the Dialog.Button default (color "surface-alt", paint "solid"); Accept is color "secondary", paint "solid"; both set scale "sm" and dismiss={false}. Two groups. '
    + 'HCS (a raised sm Title with a Description, Accept enabled after the end is reached). '
    + 'ACE, ADM, PFD, HS, FD, AGPD, RWS and PBS (a plain sm Title with the close X, the Do Not Accept / Accept pair at the same positions; the scene is the ACE gate with its Description line, which the other apps omit, as body text; the PBS app hides the X, an app gap, not another UI; HS and FD add a Country field, left out).',
});
