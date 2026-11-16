import { APPS } from '../apps';
import type { AppKey } from '../apps';
import type { Usecase, UsecaseCase } from '../types';

/** Apps (in registry order) whose cases make a distinct In context UI; the app toggle row needs two or more. */
export const appsWithUi = ({ cases = [] }: Usecase): AppKey[] =>
  (Object.keys(APPS) as AppKey[]).filter((key) => cases.some((candidate) => candidate.app === key));

/** The cases to show for one app: its own plus those shared by every app. With no app, all cases. */
export const casesForApp = ({ cases = [] }: Usecase, app?: AppKey): UsecaseCase[] =>
  app ? cases.filter((candidate) => !candidate.app || candidate.app === app) : cases;
