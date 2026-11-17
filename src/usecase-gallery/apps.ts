// The apps whose use cases the gallery documents. A use case lists the keys of the apps that use it
// (`apps: ['hcs']` in its usecase.ts); the docs pane shows one primary-style badge per app; it links to the app's url when there is one
// (HS and RWS have no web link yet, so theirs is a plain badge).
// Adding an app is one entry here.
export const APPS = {
  hcs: {
    name: 'hcs-design-prototype',
    label: 'HCS',
    url: 'https://city-liver-03162968.figma.site',
  },
  ace: {
    name: 'ace-design-prototype',
    label: 'ACE',
    url: 'https://role-ribbon-82533405.figma.site',
  },
  adm: {
    name: 'adm-design-prototype',
    label: 'ADM',
    url: 'https://seven-tiger-87704966.figma.site',
  },
  pfd: {
    name: 'pfd-design-prototype',
    label: 'PFD',
    url: 'https://dazzle-fever-46604647.figma.site',
  },
  pbs: {
    name: 'pbs-design-prototype',
    label: 'PBS',
    url: 'https://bronze-upload-82579643.figma.site',
  },
  hs: {
    name: 'hs-design-prototype',
    label: 'HS',
  },
  fd: {
    name: 'fd-design-prototype',
    label: 'FD',
    url: 'https://both-guess-70050890.figma.site',
  },
  agpd: {
    name: 'agpd-design-prototype',
    label: 'AGPD',
    url: 'https://output-cotton-85740609.figma.site',
  },
  rws: {
    name: 'rws-design-prototype',
    label: 'RWS',
  },
  adc: {
    name: 'adc-design-prototype',
    label: 'ADC',
    url: 'https://july-driver-34402262.figma.site',
  },
} as const satisfies Record<string, { name: string; label: string; url?: string }>;

export type AppKey = keyof typeof APPS;
