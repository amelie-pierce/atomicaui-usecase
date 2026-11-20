import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Full-size dialog',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    { id: 'hcs-licence', name: 'Licence dialog', apps: ['hcs'], source: { hcs: 'src/components/F01Experience.tsx' } },
    {
      id: 'adm-licence',
      name: 'Licence dialog',
      apps: ['ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
      source: {
        ace: 'src/features/eula/ui/EulaGate.tsx',
        adm: 'src/features/eula/components/EulaGate.tsx',
        pfd: 'src/pfd/LicenseGate.tsx',
        pbs: 'src/LicenseGate.tsx',
        hs: 'src/hs/LicenseGate.tsx',
        fd: 'src/components/LicenseGate.jsx',
        agpd: 'src/agpd/LicenseGate.tsx',
        rws: 'src/rws/LicenseGate.tsx',
      },
    },
  ],
  source: {
    hcs: 'src/components/F01Experience.tsx',
    ace: 'src/features/eula/ui/EulaGate.tsx',
    adm: 'src/features/eula/components/EulaGate.tsx',
    pfd: 'src/pfd/LicenseGate.tsx',
    pbs: 'src/LicenseGate.tsx',
    hs: 'src/hs/LicenseGate.tsx',
    fd: 'src/components/LicenseGate.jsx',
    agpd: 'src/agpd/LicenseGate.tsx',
    rws: 'src/rws/LicenseGate.tsx',
  },
  summary: 'The licence a user must accept before the app opens: a dialog that fills the screen, a Title with the close X, and a scrolling Body of legal text.',
  where: 'The first screen of all nine apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS), opened over the empty workspace until the user accepts or declines; ADC has no licence gate. Real site source: the licence gate of each app (the paths are in source).',
  when: 'Use it for long text that must be read to the end before an action; the Body scrolls inside the popup, so the text carries no scroll of its own. Do not use it for a short confirm (Button-013) or a single message (Button-005).',
  how: 'Dialog.Popup at scale "sm" with sx width "fill" and height "fill" (the apps set --aui-width and --aui-height by CSS variable below 1024px; left out). Dialog.Title holds the name, the Spacer and the close X, which also declines (Button-020). Dialog.Body is the scroll owner (it wraps its content in its own scroll area), so the text goes straight in as Type p2 sections (In context shows them in a View, paint "text", column, gap 12 for HCS or 8 for the others); the example is the Dialog frame with a raised Title, the close X and one sample section. The apps write two UIs: HCS (a raised Title and a Description line that does not scroll, "Review and accept to start using the HCS prototype.") and the other apps (ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS: a plain Title; ACE adds the same Description line as body text, HS, ACE and FD put a Country field above the text (the ACE one is Select-003), and PBS hides the close X). The footer is Button-013 and Button-005; the scenes leave it, the Country field and the read-to-end gate out, and the example holds one sample section.',
});
