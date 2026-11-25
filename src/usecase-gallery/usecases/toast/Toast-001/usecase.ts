import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Toast',
  title: 'Status toast',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  options: [
    { id: "hcs-viewport", name: "App viewport", source: {"hcs":"src/App.tsx","ace":"src/app/providers/ProviderCore.tsx","adm":"src/app/providers/AppProviders.tsx","pfd":"src/App.tsx","pbs":"src/App.tsx","hs":"src/App.tsx","fd":"src/App.jsx","agpd":"src/App.tsx","rws":"src/rws/Shell.tsx","adc":"src/adc/components/ReportFlow.tsx"} },
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
      id: 'icon',
      name: 'Icon',
      selector: '[class~="aui-toast-icon"]',
      description: 'The success status icon that Toast draws itself from type: \'success\'.',
    },
    {
      id: 'content',
      name: 'Content',
      selector: '[class~="aui-toast-content"]',
      description: 'The copy block that Toast renders beside the icon, holding the title and the description.',
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
