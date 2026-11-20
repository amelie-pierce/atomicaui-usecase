import { useSyncExternalStore } from 'react';

/** Where the URL hash points: the components grid, one component's page, or one use case. */
export type Route =
  | { page: 'components' }
  | { page: 'component'; componentId: string }
  | { page: 'usecase'; usecaseId: string };

/** The hashes: `#/` (or none) the components grid, `#/Button` the Button page, `#Button-013` that use case. */
export const COMPONENTS_HASH = '#/';
export const componentHash = (componentId: string) => `#/${encodeURIComponent(componentId)}`;
export const usecaseHash = (usecaseId: string) => `#${encodeURIComponent(usecaseId)}`;

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};
const readHash = () => window.location.hash;

/**
 * Reads the route from the URL hash, so every page survives reload and can be shared. An unknown component or use case
 * (and the old `#/components` hash of the grid) resolves to the components grid.
 */
export function useRoute(componentIds: readonly string[], usecaseIds: readonly string[]): Route {
  const hash = useSyncExternalStore(subscribe, readHash, () => '');
  const value = decodeURIComponent(hash.replace(/^#/, ''));
  if (value.startsWith('/')) {
    const componentId = value.slice(1);
    return componentIds.includes(componentId) ? { page: 'component', componentId } : { page: 'components' };
  }
  return usecaseIds.includes(value) ? { page: 'usecase', usecaseId: value } : { page: 'components' };
}
