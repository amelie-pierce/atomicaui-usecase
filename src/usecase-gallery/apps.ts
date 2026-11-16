// The apps whose use cases the gallery documents. A use case lists the keys of the apps that use it
// (`apps: ['hcs']` in its usecase.ts); the docs pane shows one badge per app that links to its url.
// Adding an app is one entry here.
export const APPS = {
  hcs: {
    name: 'hcs-design-prototype',
    label: 'HCS',
    url: 'https://city-liver-03162968.figma.site',
  },
} as const satisfies Record<string, { name: string; label: string; url: string }>;

export type AppKey = keyof typeof APPS;
