import { APPS } from '../apps';
import type { AppKey } from '../apps';
import type { Usecase, UsecaseCase } from '../types';

/** One type of case (Reset confirm, ...): its cases are the UI variants, one per group of apps, in the order written. */
export interface CaseType {
  name: string;
  cases: UsecaseCase[];
}

/** The app labels as one string: `ACE, PFD, PBS`. */
export const appLabels = (apps: AppKey[]): string => apps.map((key) => APPS[key].label).join(', ');

/** The types of a use case in the order they first appear; cases sharing a name are the variants of one type. */
export const caseTypes = ({ cases = [] }: Pick<Usecase, 'cases'>): CaseType[] => {
  const types = new Map<string, CaseType>();
  for (const candidate of cases) {
    const type = types.get(candidate.name) ?? { name: candidate.name, cases: [] };
    type.cases.push(candidate);
    types.set(candidate.name, type);
  }
  return [...types.values()];
};

/** Whether a case is the same in every app of the use case, so its group needs no toggle or caption. */
export const isShared = ({ apps }: UsecaseCase, usecase: Pick<Usecase, 'apps'>): boolean => apps.length === usecase.apps.length;

/**
 * The use case as one of its looks shows it: the example, the code, `apps` and the cases follow the chosen look (a case
 * that states no look stays). A use case with one look is returned as it is.
 */
export const withLook = (usecase: Usecase, lookName?: string): Usecase => {
  const look = usecase.looks?.find((candidate) => candidate.name === lookName) ?? usecase.looks?.[0];
  if (!look) return usecase;
  return {
    ...usecase,
    look: look.name,
    apps: look.apps,
    Example: look.Example,
    loadCode: look.loadCode,
    cases: usecase.cases?.filter((candidate) => !candidate.look || candidate.look === look.name),
  };
};
