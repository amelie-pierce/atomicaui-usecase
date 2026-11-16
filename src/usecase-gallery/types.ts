import type { ComponentType, ReactNode } from 'react';
import type { AppKey } from './apps';

/** Written once per component in `usecases/<component>/<component>.meta.ts`. */
export interface ComponentMeta {
  /** Id prefix shared by every use case of the component, e.g. `Button` for `Button-001`. */
  id: string;
  /** Name shown in the tree. */
  title: string;
}

/** Written once per use case in `usecases/<component>/<UseCaseId>/usecase.ts`. */
export interface UsecaseDoc {
  /** Where the component is used, e.g. `Dialog`, `Walkthrough`, `Table`. Use cases with the same area share a tree group. */
  area: string;
  title: string;
  /** One sentence: what this use case shows. */
  summary: string;
  /** Where in a product this pattern appears. */
  where: string;
  /** When to choose it, and when not to. */
  when: string;
  /** How to use it: the props and rules that matter. */
  how: string;
  /** Keys of the apps (see `apps.ts`) that use this pattern. */
  apps: AppKey[];
  /** Optional: the area's context places this example elsewhere (for example `close`, the card corner); uses `contexts/<area-slug>-<variant>.tsx`. */
  contextVariant?: string;
  /**
   * Optional: several In context cases of this use case (for example the three dialogs). Each id names a file
   * `scenes/<id>.tsx` in the use case folder; the preview shows a radio group and renders the chosen scene
   * instead of the area context. One entry (or none) shows no radio group.
   */
  cases?: { id: string; name: string }[];
}

/** The props of a context component: the example to place inside the real area. */
export interface ContextProps {
  children: ReactNode;
  /** The preview stage; portaled parts (a Dialog's popup) render here so they stay static inside the card. */
  host: HTMLElement;
}

/** What the centre preview shows: the lone component, or the component inside the area that holds it. */
export type PreviewMode = 'component' | 'context';

/** One resolved In context case: its scene and the snippet with the example placed inside it. */
export interface UsecaseCase {
  id: string;
  name: string;
  Scene: ComponentType<ContextProps>;
  loadCode: () => Promise<string>;
}

export interface Usecase extends Omit<UsecaseDoc, 'cases'> {
  /** `<ComponentId>-<NNN>`; also the URL hash. */
  id: string;
  componentId: string;
  /** The rendered example. Loaded on demand, so wrap it in `<Suspense>`. */
  Example: ComponentType;
  /** Resolves to the copyable snippet, derived from the same `example.tsx` that renders. */
  loadCode: () => Promise<string>;
  /** The real area that holds the example (`contexts/<area>.tsx`); absent when the kit cannot compose it. */
  Context?: ComponentType<ContextProps>;
  /** Resolves to the snippet with the example placed inside the context's JSX; present with `Context`. */
  loadContextCode?: () => Promise<string>;
  /** The In context cases from `scenes/`; they take the place of `Context` when present. */
  cases?: UsecaseCase[];
}

/** The use cases of one component that live in the same place in a product. */
export interface AreaGroup {
  title: string;
  usecases: Usecase[];
}

export interface ComponentGroup extends ComponentMeta {
  areas: AreaGroup[];
}
