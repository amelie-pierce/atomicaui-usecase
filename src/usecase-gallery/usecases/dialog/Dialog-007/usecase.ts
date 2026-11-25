import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Accept licence dialog',

  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"The scrim behind the licence gate, which the user cannot pass without answering.","keyIdea":"The license scrim keeps the required decision inside the foreground gate.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The full-size gate window: scale \"sm\" with width and height \"fill\".","keyIdea":"A fill-sized popup gives this license the whole available reading area."sm\" with width and height \"fill\".","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"The title bar naming the \"Website Application License Agreement\" (ACE prefixes the app name and leaves the bar plain instead of raised).","keyIdea":"The agreement title identifies the legal gate before its terms appear."Website Application License Agreement\" (ACE prefixes the app name and leaves the bar plain instead of raised).","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The close X, which counts as declining the licence (labelled \"Do Not Accept\" in the ACE scene).","keyIdea":"Closing this gate is treated as declining the agreement."Do Not Accept\" in the ACE scene).","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"description","partId":"description","title":"Description","explanation":"The fixed line \"Review and accept to start using the HCS prototype.\" between the title and the scrolling text (ACE says \"to start using ACE.\").","keyIdea":"A fixed instruction tells users why they must read the agreement."Review and accept to start using the HCS prototype.\" between the title and the scrolling text (ACE says \"to start using ACE.\").","selector":"[class~=\"aui-dialog-description\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The scrolling body that holds the licence text the user reads to the end before Accept becomes available.","keyIdea":"The scroll region makes reading the full terms a prerequisite to acceptance.","selector":"[class~=\"aui-dialog-body\"]"},
        {"id":"actions","partId":"actions","title":"Footer","explanation":"The footer at scale \"sm\" that holds the Do Not Accept and Accept pair at the end.","keyIdea":"The footer keeps decline and acceptance choices together after the terms."sm\" that holds the Do Not Accept and Accept pair at the end.","selector":"[class~=\"aui-dialog-actions\"]"},
        {"id":"decline","partId":"decline","title":"Do Not Accept","explanation":"The surface-alt solid soft button that declines the licence; dismiss={false} keeps the gate open until the app reacts.","keyIdea":"Decline leaves the gate open until the app handles the refusal.","selector":"[data-ug-part=\"decline\"]"},
        {"id":"accept","partId":"accept","title":"Accept","explanation":"The secondary solid soft button labelled \"Accept Application License Agreement\"; the scenes enable it once the text is read to the end.","keyIdea":"Acceptance becomes available only after the agreement has been read."Accept Application License Agreement\"; the scenes enable it once the text is read to the end.","selector":"[data-ug-part=\"accept\"]"},
      ],
options: [
    { id: "hcs-accept", name: "Accept licence", apps: ["hcs"], source: {"hcs":"src/components/F01Experience.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "ace-accept", name: "Accept licence — UI variant 2", apps: ["ace","adm","pfd","hs","fd","agpd","rws","pbs"], source: {"ace":"src/features/eula/ui/EulaGate.tsx","adm":"src/features/eula/components/EulaGate.tsx","pfd":"src/pfd/LicenseGate.tsx","hs":"src/hs/LicenseGate.tsx","fd":"src/components/LicenseGate.jsx","agpd":"src/agpd/LicenseGate.tsx","rws":"src/rws/LicenseGate.tsx","pbs":"src/LicenseGate.tsx"}, showContext: false ,
      contextLayers: [

      ],
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
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The full-size gate window: scale "sm" with width and height "fill".',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The title bar naming the "Website Application License Agreement" (ACE prefixes the app name and leaves the bar plain instead of raised).',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X, which counts as declining the licence (labelled "Do Not Accept" in the ACE scene).',
    },
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The fixed line "Review and accept to start using the HCS prototype." between the title and the scrolling text (ACE says "to start using ACE.").',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scrolling body that holds the licence text the user reads to the end before Accept becomes available.',
    },
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer at scale "sm" that holds the Do Not Accept and Accept pair at the end.',
    },
    {
      id: 'decline',
      name: 'Do Not Accept',
      description: 'The surface-alt solid soft button that declines the licence; dismiss={false} keeps the gate open until the app reacts.',
    },
    {
      id: 'accept',
      name: 'Accept',
      description: 'The secondary solid soft button labelled "Accept Application License Agreement"; the scenes enable it once the text is read to the end.',
    },
  ],
});
