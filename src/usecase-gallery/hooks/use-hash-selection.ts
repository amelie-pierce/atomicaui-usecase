import { useCallback, useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
};
const readHash = () => decodeURIComponent(window.location.hash.slice(1));

/**
 * The selected use case id lives in the URL hash (`#Button-013`), so it survives reload and can be shared.
 * An empty or unknown hash resolves to `fallback`.
 */
export function useHashSelection(ids: readonly string[], fallback: string) {
  const hash = useSyncExternalStore(subscribe, readHash, () => '');
  const select = useCallback((id: string) => {
    window.location.hash = encodeURIComponent(id);
  }, []);
  return { selectedId: ids.includes(hash) ? hash : fallback, select };
}
