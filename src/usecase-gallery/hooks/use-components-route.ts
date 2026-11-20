import { useSyncExternalStore } from 'react';

/** The hash of the components grid page; every other hash selects a use case (`#Button-013`). */
export const COMPONENTS_HASH = '#/components';

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};

/** True while the URL hash points at the components grid page. */
export function useComponentsRoute() {
  return useSyncExternalStore(subscribe, () => window.location.hash === COMPONENTS_HASH, () => false);
}
