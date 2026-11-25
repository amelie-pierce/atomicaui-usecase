import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Full-size dialog',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"The scrim behind the licence gate that the user must answer before the app opens.","keyIdea":"The scrim behind the licence gate that the user must answer before the app opens.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The full-size licence window: scale \"sm\" with width and height set to \"fill\" so it fills the stage.","keyIdea":"The full-size licence window: scale \"sm\" with width and height set to \"fill\" so it fills the stage.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"The title bar naming the \"Website Application License Agreement\"; HCS and the example raise it, the other apps leave it plain.","keyIdea":"The title bar naming the \"Website Application License Agreement\"; HCS and the example raise it, the other apps leave it plain.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"spacer","partId":"spacer","title":"Spacer","explanation":"The gap before the close X in the title bar.","keyIdea":"The gap before the close X in the title bar.","selector":"[class~=\"aui-dialog-spacer\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The close X, which also declines the licence (labelled \"Do Not Accept\" in the ADM scene); PBS hides it.","keyIdea":"The close X, which also declines the licence (labelled \"Do Not Accept\" in the ADM scene); PBS hides it.","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"description","partId":"description","title":"Description","explanation":"The HCS-only line \"Review and accept to start using the HCS prototype.\" that stays fixed under the title while the body scrolls.","keyIdea":"The HCS-only line \"Review and accept to start using the HCS prototype.\" that stays fixed under the title while the body scrolls.","selector":"[class~=\"aui-dialog-description\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The scroll owner of the window; it scrolls when the licence text is longer than the popup.","keyIdea":"The scroll owner of the window; it scrolls when the licence text is longer than the popup.","selector":"[class~=\"aui-dialog-body\"]"},
        {"id":"licence-text","partId":"licence-text","title":"Licence text","explanation":"The licence sections as Type p2 text: one sample clause in the example, and the full mock agreement in a gap-12 column View in the HCS and ADM scenes.","keyIdea":"The licence sections as Type p2 text: one sample clause in the example, and the full mock agreement in a gap-12 column View in the HCS and ADM scenes.","selector":"[data-ug-part=\"licence-text\"]"},
      ],
options: [
    { id: "hcs-licence", name: "Licence dialog", apps: ["hcs"], source: {"hcs":"src/components/F01Experience.tsx"}, showContext: false ,
      contextLayers: [

      ],
    },
    { id: "adm-licence", name: "Licence dialog — UI variant 2", apps: ["ace","adm","pfd","pbs","hs","fd","agpd","rws"], source: {"ace":"src/features/eula/ui/EulaGate.tsx","adm":"src/features/eula/components/EulaGate.tsx","pfd":"src/pfd/LicenseGate.tsx","pbs":"src/LicenseGate.tsx","hs":"src/hs/LicenseGate.tsx","fd":"src/components/LicenseGate.jsx","agpd":"src/agpd/LicenseGate.tsx","rws":"src/rws/LicenseGate.tsx"}, showContext: false ,
      contextLayers: [

      ],
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
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the licence gate that the user must answer before the app opens.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The full-size licence window: scale "sm" with width and height set to "fill" so it fills the stage.',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The title bar naming the "Website Application License Agreement"; HCS and the example raise it, the other apps leave it plain.',
    },
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The agreement name at the start of the title bar.',
    },
    {
      id: 'spacer',
      name: 'Spacer',
      selector: '[class~="aui-dialog-spacer"]',
      description: 'The gap before the close X in the title bar.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X, which also declines the licence (labelled "Do Not Accept" in the ADM scene); PBS hides it.',
    },
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The HCS-only line "Review and accept to start using the HCS prototype." that stays fixed under the title while the body scrolls.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scroll owner of the window; it scrolls when the licence text is longer than the popup.',
    },
    {
      id: 'licence-text',
      name: 'Licence text',
      description: 'The licence sections as Type p2 text: one sample clause in the example, and the full mock agreement in a gap-12 column View in the HCS and ADM scenes.',
    },
  ],
});
