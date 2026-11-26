import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Toast',
  title: 'Status toast',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
    layers: [
        {"id":"viewport","partId":"viewport","title":"Viewport","explanation":"Toast portal pins stacked notices at the pane top end with insets.","keyIdea":"The pinned viewport keeps new notifications visible without moving the pane content.","selector":"[class~=\"aui-toast-viewport\"]"},
        {"id":"toast","partId":"toast","title":"Toast","explanation":"Toast stack adds one success notice for each saved project.","keyIdea":"The success surface announces that the project save completed as one dismissible message.","selector":"[class~=\"aui-toast\"]"},
        {"id":"content","partId":"content","title":"Content","explanation":"Toast content places its title and detail beside the icon.","keyIdea":"A copy block keeps the status title and its supporting detail together.","selector":"[class~=\"aui-toast-content\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"Success icon marks completion before readers scan notification text.","keyIdea":"The success glyph communicates completion before the notification text is read.","selector":"[class~=\"aui-toast-icon\"]"},
        {"id":"description","partId":"description","title":"Description","explanation":"This detail says your project was saved to the device.","keyIdea":"The detail line tells users which save action finished.","selector":"[class~=\"aui-toast-description\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"Close button dismisses the notice before its timeout expires.","keyIdea":"A close target lets users clear the message before its timeout.","selector":"[class~=\"aui-toast-close\"]"},
      ],
options: [
    { id: "hcs-viewport", name: "App viewport", contextAnatomy: [{ id: 'pane', name: 'Work area pane', description: 'The relatively positioned pane at the app root over which the toast viewport floats at its top end.' }, { id: 'pane-title', name: 'Pane title', description: 'The semi-bold l3 Input heading of the pane the toast appears over.' }], source: {"hcs":"src/App.tsx","ace":"src/app/providers/ProviderCore.tsx","adm":"src/app/providers/AppProviders.tsx","pfd":"src/App.tsx","pbs":"src/App.tsx","hs":"src/App.tsx","fd":"src/App.jsx","agpd":"src/App.tsx","rws":"src/rws/Shell.tsx","adc":"src/adc/components/ReportFlow.tsx"} ,
      contextLayers: [
        {"id":"context-pane","partId":"pane","title":"Work area pane","explanation":"Positioned work pane anchors the floating toast viewport above content.","keyIdea":"The relatively positioned work pane gives the floating toast a stable anchor.","selector":"[data-ug-part=\"pane\"]","scope":"context"},
        {"id":"context-pane-title","partId":"pane-title","title":"Pane title","explanation":"Input heading names the work area beneath the toast.","keyIdea":"The pane heading identifies which work area the notification overlays.","selector":"[data-ug-part=\"pane-title\"]","scope":"context"},
      ],
    },
  ],
  source: {
    hcs: 'src/App.tsx',
    ace: 'src/app/providers/ProviderCore.tsx',
    adm: 'src/app/providers/AppProviders.tsx',
    pfd: 'src/App.tsx',
    pbs: 'src/App.tsx',
    hs: 'src/App.tsx',
    fd: 'src/App.jsx',
    agpd: 'src/App.tsx',
    rws: 'src/rws/Shell.tsx',
    adc: 'src/adc/components/ReportFlow.tsx',
  },
  summary: 'A short message that appears at the top end of the work area after an action and leaves by itself: a severity icon, a title, a description and a close X.',
  where: 'Every app mounts one Toast provider and viewport at its root (HCS App.tsx, ACE ProviderCore.tsx, ADM AppProviders.tsx, ADC ReportFlow.tsx). Toasts report a saved or opened file, a copied link or a failed upload.',
  when: 'Use it for feedback that needs no decision and may disappear. Use an AlertDialog for a choice the user must make (AlertDialog-001) and a banner for a state that stays.',
  how: 'Mount `Toast.Provider` at the app root (`timeout={6000}`, `limit={1}`). Raise a toast with `const manager = useToastManager()` and `manager.add({ title, description, type })` where `type` is `success`, `error`, `warning` or `info` (the severity icon and colour follow it). A viewport component renders `Toast.Portal` > `Toast.Viewport` (pinned to the top end with `position: "absolute"`, `insetBlockStart` and `insetInlineEnd` of 8px) and `manager.toasts.map((toast) => <Toast key={toast.id} toast={toast} />)`; the Toast renders the icon, copy and close X itself. The In context scene frames that viewport through a `ToastStack` helper that adds a success toast on mount, standing in for the app\'s action; the helper is the viewport above plus the `manager.add` call. ADC raises toasts outside React with `createToastManager()`. All ten apps write the same Toast, so there is one group. The scene frames the viewport in a pane.',
  anatomy: [
    {
      id: 'viewport',
      name: 'Viewport',
      selector: '[class~="aui-toast-viewport"]',
      description: 'The stack container pinned to the top end of the pane with 8px insets, rendered inside Toast.Portal.',
    },
    {
      id: 'toast',
      name: 'Toast',
      selector: '[class~="aui-toast"]',
      description: 'The success notification surface the ToastStack adds on mount, one per manager entry.',
    },
    {
      id: 'content',
      name: 'Content',
      selector: '[class~="aui-toast-content"]',
      description: 'The copy block that Toast renders beside the icon, holding the title and the description.',
    },
    {
      id: 'icon',
      name: 'Icon',
      selector: '[class~="aui-toast-icon"]',
      description: 'The success status icon that Toast draws itself from type: \'success\'.',
    },
    {
      id: 'title',
      name: 'Title',
      selector: '[class~="aui-toast-title"]',
      text: true,
      description: 'The heading "Success" taken from the title passed to manager.add.',
    },
    {
      id: 'description',
      name: 'Description',
      selector: '[class~="aui-toast-description"]',
      description: 'The detail line "Your project was saved to the device." taken from the description passed to manager.add.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-toast-close"]',
      description: 'The close X that Toast adds so the user can dismiss the message before it times out.',
    },
  ],
});
