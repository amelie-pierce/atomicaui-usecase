import type { ComponentType } from 'react';

/** Written once per component in `usecases/<component>/<component>.meta.ts`. */
export interface ComponentMeta {
  /** Id prefix shared by every use case of the component, e.g. `Button` for `Button-001`. */
  id: string;
  /** Name shown in the tree. */
  title: string;
}

/** Written once per use case in `usecases/<component>/<UseCaseId>/usecase.ts`. */
export interface UsecaseDoc {
  title: string;
  /** One sentence: what this use case shows. */
  summary: string;
  /** Where in a product this pattern appears. */
  where: string;
  /** When to choose it, and when not to. */
  when: string;
  /** How to use it: the props and rules that matter. */
  how: string;
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

export interface ComponentGroup extends ComponentMeta {
  usecases: Usecase[];
}
