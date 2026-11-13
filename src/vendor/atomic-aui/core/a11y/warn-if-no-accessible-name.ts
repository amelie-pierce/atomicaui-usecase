// modules/design/atomic-aui/src/core/a11y/warn-if-no-accessible-name.ts
//
// A DEV-ONLY guard that dev-warns when an interactive control (a Dropdown / Select / Menubar
// trigger) ships with NO accessible name — the WCAG 4.1.2 (Name, Role, Value) failure mode for an
// icon-only trigger whose only visible content is a DECORATIVE (`aria-hidden`) glyph (a `*.Icon` /
// `*.Chevron`) and which carries no `aria-label` / `aria-labelledby` / `title`. Such a control is an
// unlabeled button to assistive tech. The fix is a one-liner (`aria-label="…"`), so we surface it
// loudly at author time rather than failing silently in production.
//
// Stripped in production (`process.env.NODE_ENV === 'production'` early-returns) so it costs nothing
// at runtime there. Conservative — it only warns when it can POSITIVELY find no name source, so a
// child with its own `aria-label`, any visible (non-hidden) text/element, or a non-empty
// `aria-label`/`aria-labelledby`/`title` on the trigger all suppress it (no false positives).
import * as React from 'react';

/** A string/number with at least one non-whitespace char counts as a visible accessible name. */
function isMeaningfulText(v: unknown): boolean {
  return (
    (typeof v === 'string' && v.trim() !== '') ||
    (typeof v === 'number' && Number.isFinite(v))
  );
}

/** A non-empty (non-whitespace) string prop. */
function isNonEmptyString(v: unknown): boolean {
  return typeof v === 'string' && v.trim() !== '';
}

/** Does this element's OWN props provide an accessible name (`aria-label`/`-labelledby`/`title`)? */
function elementHasOwnName(props: Record<string, unknown> | null | undefined): boolean {
  if (!props) return false;
  return (
    isNonEmptyString(props['aria-label']) ||
    isNonEmptyString(props['aria-labelledby']) ||
    isNonEmptyString(props.title)
  );
}

/**
 * Walk `children` and decide whether ANY of them contributes a visible accessible name.
 *
 * - A plain string/number leaf with non-whitespace text → a name.
 * - An element that is `aria-hidden` (the decorative `*.Icon` / `*.Chevron`) is SKIPPED entirely
 *   (it and its subtree are removed from the a11y tree).
 * - A non-hidden element with its OWN `aria-label`/`-labelledby`/`title` → a name.
 * - Otherwise recurse into the element's `children` (a non-hidden wrapper around real text/an icon
 *   with a label still contributes a name).
 * - A non-hidden element with NO own name and NO children (e.g. a bare `<Icon name=… />` with no
 *   label) does NOT, on its own, contribute a name — recursion simply finds nothing.
 */
function childrenHaveVisibleName(children: React.ReactNode): boolean {
  let found = false;
  React.Children.forEach(children, (child) => {
    if (found) return;
    if (child == null || typeof child === 'boolean') return;
    if (isMeaningfulText(child)) {
      found = true;
      return;
    }
    if (React.isValidElement(child)) {
      const props = child.props as Record<string, unknown>;
      // Decorative (aria-hidden) subtree — invisible to AT, contributes no name. Skip it whole.
      if (props['aria-hidden'] === true || props['aria-hidden'] === 'true') return;
      // A labelled element (own aria-label/-labelledby/title) IS a name.
      if (elementHasOwnName(props)) {
        found = true;
        return;
      }
      // Otherwise recurse into its visible children.
      if (childrenHaveVisibleName(props.children as React.ReactNode)) {
        found = true;
      }
    }
  });
  return found;
}

/**
 * Dev-warn when a trigger has no accessible name. NO-OP in production.
 *
 * @param children      - The trigger's children (the visible content).
 * @param props         - The trigger's remaining props (read for `aria-label`/`-labelledby`/`title`).
 * @param componentName - The component displayName, used in the warning (e.g. `'Dropdown.Trigger'`).
 */
export function warnIfNoAccessibleName(
  children: React.ReactNode,
  props: Record<string, unknown> | null | undefined,
  componentName: string
): void {
  if (process.env.NODE_ENV === 'production') return;

  // A name on the trigger itself (aria-label / aria-labelledby / title) always suffices.
  if (elementHasOwnName(props)) return;

  // Otherwise the children must carry a visible (non-aria-hidden) accessible name.
  if (childrenHaveVisibleName(children)) return;

  console.warn(
    `[atomic-aui] <${componentName}> has no accessible name: its only content appears to be ` +
      'decorative (aria-hidden) and it has no `aria-label`, `aria-labelledby`, or `title`. ' +
      'Add an `aria-label` (e.g. `aria-label="More actions"`) so assistive tech can announce it ' +
      '(WCAG 4.1.2).'
  );
}
