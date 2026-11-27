import { APPS } from '../apps';
import type { AppKey } from '../apps';
import type { Usecase, UsecaseOption } from '../types';

/** The app labels as one string: `ACE, PFD, PBS`. */
export const appLabels = (apps: AppKey[]): string => apps.map((key) => APPS[key].label).join(', ');

/** The selected option supplies the example, code and app badges for the complete document. */
export const withOption = (usecase: Usecase, optionId?: string): { usecase: Usecase; option?: UsecaseOption } => {
  const option = usecase.options.find((candidate) => candidate.id === optionId) ?? usecase.options[0];
  if (!option) throw new Error(`Use case ${usecase.id} has no options`);
  const anatomy = new Map((option.componentAnatomy ?? []).map((part) => [part.id, part]));
  return {
    usecase: {
      ...usecase,
      apps: option.apps,
      anatomy: usecase.anatomy.map((part) => ({ ...part, ...anatomy.get(part.id) })),
      Example: option.Example,
      loadCode: option.loadExampleCode,
    },
    option,
  };
};
