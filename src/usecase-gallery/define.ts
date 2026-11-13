import type { ComponentMeta, UsecaseDoc } from './types';

/** Type-checks a use case's `usecase.ts` default export. */
export const defineUsecase = (doc: UsecaseDoc): UsecaseDoc => doc;

/** Type-checks a component's `<component>.meta.ts` default export. */
export const defineComponent = (meta: ComponentMeta): ComponentMeta => meta;
