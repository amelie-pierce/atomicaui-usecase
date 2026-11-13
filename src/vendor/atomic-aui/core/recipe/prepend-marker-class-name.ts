// modules/design/atomic-aui/src/core/recipe/prepend-marker-class-name.ts
//
// Prepends a fixed marker/base class to Base UI's `className?: string | ((state) => string)`
// prop, handling BOTH forms correctly:
//   - string → merged immediately (role-dedup, marker FIRST so consumer className wins last).
//   - function → wrapped so the consumer's className is resolved with the part's render `state`
//     THEN merged. A raw `mergeAuiClasses([marker, fn])` would call `.split()` on a function
//     reference and crash + silently drop all state-aware classes.
//
// Pure + component-agnostic — depends only on `mergeAuiClasses`. Used by any part whose Base
// UI primitive accepts a function className (Positioner, and similar portal-cascade re-stamp
// patterns in Select / Dropdown and future Popover / Tooltip).
import { mergeAuiClasses } from './merge-classes';

export function prependMarkerClassName<S>(
  marker: string,
  className: string | ((state: S) => string | undefined) | undefined
): string | ((state: S) => string) {
  if (typeof className === 'function') {
    return (state: S) => mergeAuiClasses([marker, className(state)]);
  }
  return mergeAuiClasses([marker, className]);
}
