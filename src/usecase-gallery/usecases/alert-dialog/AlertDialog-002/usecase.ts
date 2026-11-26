import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Alert / Confirm',
  title: 'Single centered action',
  apps: ['ace', 'hs'],
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"The scrim that blocks the app after the licence agreement was declined.","keyIdea":"The overlay stops attention from returning to the declined agreement beneath the notice.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The default-size blocking notice, with no close X so it cannot be dismissed.","keyIdea":"A non-dismissible surface makes the required next action unmistakable.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title","explanation":"The raised, text-only title \"Website Application License Agreement\" with no icon and no close X.","keyIdea":"The text-only heading gives the agreement notice a clear subject without a decorative warning.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"description","partId":"description","title":"Description","explanation":"The explanation that the app cannot continue without agreement and that the user must relaunch it and accept (ACE spells out the EULA).","keyIdea":"Explain both why work cannot continue and how the user can proceed again.","selector":"[class~=\"aui-dialog-description\"]"},
        {"id":"actions","partId":"actions","title":"Footer","explanation":"The footer with align=\"center\" that centres its single button.","keyIdea":"Center the lone next step so the blocking notice does not imply alternate choices.","selector":"[class~=\"aui-dialog-actions\"]"},
        {"id":"relaunch","partId":"relaunch","title":"Re-Launch","explanation":"The only way forward: a solid secondary Re-Launch button with dismiss={false} so the notice stays until the app reloads.","keyIdea":"A persistent relaunch action is the only route forward after declining the agreement.","selector":"[data-ug-part=\"relaunch\"]"},
      ],
options: [
    { id: "ace-relaunch", showContext: false, name: "Relaunch notice", apps: ["ace","hs"], source: {"ace":"src/features/eula/ui/EulaGate.tsx","hs":"src/hs/LicenseGate.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { ace: 'src/features/eula/ui/EulaGate.tsx', hs: 'src/hs/LicenseGate.tsx' },
  summary: 'A blocking notice with no close X and one solid button centred in the footer, the only way forward.',
  where: 'Declined licence agreement in EC mode (ACE EulaGate.tsx and HS LicenseGate.tsx): the notice asks the user to relaunch and accept the agreement.',
  when: 'Use it when the user cannot continue and has exactly one choice. Do not use it when the user can cancel (AlertDialog-001).',
  how: 'In the apps this is `AlertDialog` with `clickOutsideToClose={false}`: Title (`color: "raised"`, text only, no icon, no close), Description, and `AlertDialog.Actions align="center"` holding one `AlertDialog.Button` with `dismiss={false}` and `color: "secondary", paint: "solid"`. The gallery draws it as a non-modal Dialog with the same parts (the kit has no modal-free AlertDialog); copy the code with `AlertDialog` in place of `Dialog`. ACE and HS render the same elements, so they are one group. The scene leaves out the reload handler.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim that blocks the app after the licence agreement was declined.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The default-size blocking notice, with no close X so it cannot be dismissed.',
    },
    {
      id: 'title',
      name: 'Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised, text-only title "Website Application License Agreement" with no icon and no close X.',
    },
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-dialog-description"]',
      description: 'The explanation that the app cannot continue without agreement and that the user must relaunch it and accept (ACE spells out the EULA).',
    },
    {
      id: 'actions',
      name: 'Footer',
      selector: '[class~="aui-dialog-actions"]',
      description: 'The footer with align="center" that centres its single button.',
    },
    {
      id: 'relaunch',
      name: 'Re-Launch',
      description: 'The only way forward: a solid secondary Re-Launch button with dismiss={false} so the notice stays until the app reloads.',
    },
  ],
});
