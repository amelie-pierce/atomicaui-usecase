import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Accept licence dialog',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
options: [
    { id: "hcs-accept", name: "Raised licence header", apps: ["hcs"], source: {"hcs":"src/components/F01Experience.tsx"}, showContext: false ,
    },
    { id: "ace-accept", name: "Plain licence header", apps: ["ace","adm","pfd","hs","fd","agpd","rws","pbs"], source: {"ace":"src/features/eula/ui/EulaGate.tsx","adm":"src/features/eula/components/EulaGate.tsx","pfd":"src/pfd/LicenseGate.tsx","hs":"src/hs/LicenseGate.tsx","fd":"src/components/LicenseGate.jsx","agpd":"src/agpd/LicenseGate.tsx","rws":"src/rws/LicenseGate.tsx","pbs":"src/LicenseGate.tsx"}, showContext: false ,
    },
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
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the licence gate, which the user cannot pass without answering.',
     lesson: {"explanation":"Scrim blocks the licence gate until the user responds."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The full-size gate window: scale "sm" with width and height "fill".',
     lesson: {"explanation":"The full-size gate window: scale \"sm\" with width and height \"fill\"."}},
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The title bar naming the "Website Application License Agreement" (ACE prefixes the app name and leaves the bar plain instead of raised).',
     lesson: {"explanation":"HCS raises the licence title; ACE adds its app name."}},
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X, which counts as declining the licence (labelled "Do Not Accept" in the ACE scene).',
     lesson: {"explanation":"Close X declines the licence; ACE labels it Do Not Accept."}},
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The fixed line "Review and accept to start using the HCS prototype." between the title and the scrolling text (ACE says "to start using ACE.").',
     lesson: {"explanation":"Fixed prompt stays between title and scrolling licence text."}},
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scrolling body that holds the licence text the user reads to the end before Accept becomes available.',
     lesson: {"explanation":"Scrollable body holds licence text until the user reads to the end."}},
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer at scale "sm" that holds the Do Not Accept and Accept pair at the end.',
     lesson: {"explanation":"Small footer groups Do Not Accept and Accept at the end."}},
    {
      id: 'decline',
      name: 'Do Not Accept',
      description: 'The surface-alt solid soft button that declines the licence; dismiss={false} keeps the gate open until the app reacts.',
     lesson: {"explanation":"Soft surface-alt decline stays open until the app responds.","selector":"[data-ug-part=\"decline\"]"}},
    {
      id: 'accept',
      name: 'Accept',
      description: 'The secondary solid soft button labelled "Accept Application License Agreement"; the scenes enable it once the text is read to the end.',
     lesson: {"explanation":"Secondary Accept unlocks after users read the full agreement.","selector":"[data-ug-part=\"accept\"]"}},
  ],
});
