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
  when: 'Use it for long text that must be read to the end before an action; the Body scrolls inside the popup, so the text carries no scroll of its own. Do not use it for a short confirm (AlertDialog-003) or a single message (Button-007).',
  how: 'Dialog.Popup at scale "sm" with sx width "fill" and height "fill" (the apps set --aui-width and --aui-height by CSS variable below 1024px; left out). Dialog.Title holds the name, the Spacer and the close X, which also declines (Button-031). Dialog.Body is the scroll owner (it wraps its content in its own scroll area), so the text goes straight in as Type p2 sections (In context shows them in a View, paint "text", column, gap 12 for HCS or 8 for the others); the example is the Dialog frame with a raised Title, the close X and one sample section. The apps write two UIs: HCS (a raised Title and a Description line that does not scroll, "Review and accept to start using the HCS prototype.") and the other apps (ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS: a plain Title; ACE adds the same Description line as body text, HS, ACE and FD put a Country field above the text (the ACE one is Select-004), and PBS hides the close X). The footer is Dialog-007; the scenes leave it, the Country field and the read-to-end gate out, and the example holds one sample section.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the licence gate that the user must answer before the app opens.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The full-size licence window: scale "sm" with width and height set to "fill" so it fills the stage.',
      code: `<Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>`,
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The title bar naming the "Website Application License Agreement"; HCS and the example raise it, the other apps leave it plain.',
      code: `<Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
  Website Application License Agreement
  <Dialog.Spacer />
  <Dialog.Close aria-label="Close Website Application License Agreement" aui={{ scale: 'sm' }} />
</Dialog.Title>`,
    },
    {
      id: 'title-text',
      name: 'Title text',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The agreement name at the start of the title bar.',
      code: `<Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
  Website Application License Agreement`,
    },
    {
      id: 'spacer',
      name: 'Spacer',
      token: 'Dialog.Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The gap before the close X in the title bar.',
      code: `<Dialog.Spacer />`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X, which also declines the licence (labelled "Do Not Accept" in the ADM scene); PBS hides it.',
      code: `<Dialog.Close aria-label="Close Website Application License Agreement" aui={{ scale: 'sm' }} />`,
    },
    {
      id: 'description',
      name: 'Description',
      token: 'Dialog.Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The HCS-only line "Review and accept to start using the HCS prototype." that stays fixed under the title while the body scrolls.',
      code: `<Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
  Review and accept to start using the HCS prototype.
</Dialog.Description>`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Dialog.Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scroll owner of the window; it scrolls when the licence text is longer than the popup.',
      code: `<Dialog.Body aui={{ scale: 'sm' }}>`,
    },
    {
      id: 'licence-text',
      name: 'Licence text',
      token: 'Type',
      description: 'The licence sections as Type p2 text: one sample clause in the example, and the full mock agreement in a gap-12 column View in the HCS and ADM scenes.',
      code: `<Type data-ug-part="licence-text" role="p2" aui={{ sx: { flex: 'none' } }}>
  1. The licence text goes here; the Body scrolls when it is longer than the popup.
</Type>`,
    },
  ],
});
