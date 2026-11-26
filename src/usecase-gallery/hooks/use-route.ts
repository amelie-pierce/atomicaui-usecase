import { useSyncExternalStore } from 'react';
import type { ComponentGroup, Usecase } from '../types';

/** The single gallery page always resolves to a component and one use case. */
export interface Route {
  componentId: string;
  usecaseId: string;
}

/** A component/use-case pair opens the selected case; omitting the component keeps a legacy hash. */
export const usecaseHash = (usecaseId: string, componentId?: string) => componentId
  ? `#/${encodeURIComponent(componentId)}/${encodeURIComponent(usecaseId)}`
  : `#${encodeURIComponent(usecaseId)}`;

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};
const readHash = () => window.location.hash;

function decodeSegment(segment: string) {
  try { return decodeURIComponent(segment); } catch { return segment; }
}

/** Reads component, nested component/use-case and legacy use-case hashes for the single-page gallery. */
export function useRoute(groups: readonly ComponentGroup[], aliases: Readonly<Record<string, string>> = {}): Route {
  const hash = useSyncExternalStore(subscribe, readHash, () => '');
  const value = hash.replace(/^#/, '');
  const allUsecases = groups.flatMap((group) => group.uiTypeGroups.flatMap((type) => type.usecases));
  const first = groups[0]?.uiTypeGroups[0]?.usecases[0];
  const fallback: Route = first ? { componentId: first.componentId, usecaseId: first.id } : { componentId: '', usecaseId: '' };
  const usecaseRoute = (usecase?: Usecase): Route => usecase
    ? { componentId: usecase.componentId, usecaseId: usecase.id }
    : fallback;

  if (value.startsWith('/')) {
    const [rawComponentId, rawUsecaseId] = value.slice(1).split('/').map(decodeSegment);
    const requestedId = rawComponentId ? aliases[rawComponentId] ?? rawComponentId : undefined;
    const group = groups.find((candidate) => candidate.id === requestedId);
    if (!group) return fallback;
    if (rawUsecaseId) {
      const usecase = allUsecases.find((candidate) => candidate.id === rawUsecaseId && candidate.componentId === group.id);
      return usecaseRoute(usecase ?? group.uiTypeGroups[0]?.usecases[0]);
    }
    return usecaseRoute(group.uiTypeGroups[0]?.usecases[0]);
  }
  const usecaseId = decodeSegment(value);
  return usecaseRoute(allUsecases.find((candidate) => candidate.id === usecaseId));
}
