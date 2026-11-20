import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Toast',
  title: 'Status toast',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    {
      id: 'hcs-viewport',
      name: 'App viewport',
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
  how: 'Mount `Toast.Provider` at the app root (`timeout={6000}`, `limit={1}`). Raise a toast with `const manager = useToastManager()` and `manager.add({ title, description, type })` where `type` is `success`, `error`, `warning` or `info` (the severity icon and colour follow it). A viewport component renders `Toast.Portal` > `Toast.Viewport` (pinned to the top end with `position: "absolute"`, `insetBlockStart` and `insetInlineEnd` of 8px) and `manager.toasts.map((toast) => <Toast key={toast.id} toast={toast} />)`; the Toast renders the icon, copy and close X itself. The Component tab renders that viewport through a `ToastStack` helper that adds a success toast on mount, standing in for the app\'s action; the helper is the viewport above plus the `manager.add` call. ADC raises toasts outside React with `createToastManager()`. All ten apps write the same Toast, so there is one group. The scene frames the viewport in a pane.',
});
