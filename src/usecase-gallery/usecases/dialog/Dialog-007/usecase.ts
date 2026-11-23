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
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the licence gate, which the user cannot pass without answering.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The full-size gate window: scale "sm" with width and height "fill".',
      code: `<Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>`,
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The title bar naming the "Website Application License Agreement" (ACE prefixes the app name and leaves the bar plain instead of raised).',
      code: `<Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
  Website Application License Agreement
  <Dialog.Spacer />
  <Dialog.Close aria-label="Close Website Application License Agreement" aui={{ scale: 'sm' }} />
</Dialog.Title>`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X, which counts as declining the licence (labelled "Do Not Accept" in the ACE scene).',
      code: `<Dialog.Close aria-label="Close Website Application License Agreement" aui={{ scale: 'sm' }} />`,
    },
    {
      id: 'description',
      name: 'Description',
      token: 'Dialog.Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The fixed line "Review and accept to start using the HCS prototype." between the title and the scrolling text (ACE says "to start using ACE.").',
      code: `<Dialog.Description aui={{ scale: 'sm', sx: { flex: 'none' } }}>
  Review and accept to start using the HCS prototype.
</Dialog.Description>`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Dialog.Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scrolling body that holds the licence text the user reads to the end before Accept becomes available.',
      code: `<Dialog.Body aui={{ scale: 'sm' }}>
  <View aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '12', minWidth: '0' } }}>
    <MockLicenceText />
  </View>
</Dialog.Body>`,
    },
    {
      id: 'actions',
      name: 'Footer',
      token: 'Dialog.Actions',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer at scale "sm" that holds the Do Not Accept and Accept pair at the end.',
      code: `<Dialog.Actions aui={{ scale: 'sm' }}>`,
    },
    {
      id: 'decline',
      name: 'Do Not Accept',
      token: 'Dialog.Button',
      description: 'The surface-alt solid soft button that declines the licence; dismiss={false} keeps the gate open until the app reacts.',
      code: `<Dialog.Button data-ug-part="decline" dismiss={false} aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Do Not Accept</Dialog.Button>`,
    },
    {
      id: 'accept',
      name: 'Accept',
      token: 'Dialog.Button',
      description: 'The secondary solid soft button labelled "Accept Application License Agreement"; the scenes enable it once the text is read to the end.',
      code: `<Dialog.Button data-ug-part="accept" dismiss={false} aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Accept Application License Agreement</Dialog.Button>`,
    },
  ],
});
