import type { ComponentType } from 'react';
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
}

export interface Usecase extends UsecaseDoc {
  /** `<ComponentId>-<NNN>`; also the URL hash. */
  id: string;
  componentId: string;
  /** The rendered example. Loaded on demand, so wrap it in `<Suspense>`. */
  Example: ComponentType;
  /** Resolves to the copyable snippet, derived from the same `example.tsx` that renders. */
  loadCode: () => Promise<string>;
}

/** The use cases of one component that live in the same place in a product. */
export interface AreaGroup {
  title: string;
  usecases: Usecase[];
}

export interface ComponentGroup extends ComponentMeta {
  areas: AreaGroup[];
}
