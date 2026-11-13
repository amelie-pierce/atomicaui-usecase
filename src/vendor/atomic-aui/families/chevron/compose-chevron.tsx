// modules/design/atomic-aui/src/families/chevron/compose-chevron.tsx
//
// The GENERIC version of Accordion's composed-chevron resolution (accordion.tsx ~395-413). A
// component splits its trigger children (via `splitTriggerChildren`), then runs each composed chevron
// through this to decide what to actually render.
//
// A composed-but-CHILDLESS chevron IS the default chevron (composed only to tweak its `aui`), so it
// must behave EXACTLY like the auto chevron: size to the trigger's RESOLVED tier (not the standalone
// hardcoded fallback) AND auto-rotate on open. We inject the scale-matched default glyph and stamp
// `data-aui-rotate`. A composed chevron WITH custom content is a REPLACEMENT node — left untouched
// (static unless the consumer set their own `data-aui-rotate`).
import * as React from 'react';
import { defaultChevron } from './default-chevron';
import type { ContainedIconAui } from '../../lib/icon';
import type { AuiRecipeScale } from '../../core/vocabulary/recipe-vocab';

export interface ComposeChevronOptions {
  /** The trigger's resolved scale tier the injected default glyph sizes to. */
  scale: AuiRecipeScale;
  /** Glyph axes the chevron inherits from the trigger (shape/elevation…); the chevron's own `aui`
   *  still wins per-axis (spread after). Color flows via box `currentColor`, so it is not forced. */
  inheritAui?: ContainedIconAui;
  /** Whether a childless (default) chevron should auto-rotate on open. Defaults to `true`. */
  rotateOnOpen?: boolean;
}

/**
 * Resolve a composed chevron element into the element to render.
 *
 * @param composedChevron - The composed `<Component.Chevron>` element (or null when none composed).
 * @param options         - The resolved trigger `scale`, inherited glyph `inheritAui`, `rotateOnOpen`.
 * @returns The chevron element to render (childless → default glyph + `data-aui-rotate`; custom
 *   content → left as authored), or `null` when nothing was composed.
 */
export function composeChevron(
  composedChevron: React.ReactNode,
  { scale, inheritAui, rotateOnOpen = true }: ComposeChevronOptions,
): React.ReactElement | null {
  if (!React.isValidElement(composedChevron)) return null;

  const el = composedChevron as React.ReactElement<Record<string, unknown>>;
  const chProps = el.props as {
    children?: React.ReactNode;
    'data-aui-rotate'?: unknown;
    aui?: ContainedIconAui;
  };

  // A replacement node (custom content) is left exactly as the consumer authored it — no auto glyph,
  // no auto rotate marker. (a11y NOTE: we deliberately do NOT guard `tabIndex` on a custom-content
  // chevron here — a consumer who puts focusable custom content in a decorative chevron is misuse we
  // leave to them; the empty/default chevron span is guarded in `createChevronPart`.)
  if (chProps.children != null) return el;

  // Resolve the rotate marker: an explicit `data-aui-rotate` wins (but a FALSY value normalizes to
  // OMISSION so the CSS `[data-aui-rotate]` selector can't match a `"false"` string); otherwise
  // default to `rotateOnOpen`. The chevron's OWN `aui` forwards to the injected glyph (own scale wins).
  const explicit = chProps['data-aui-rotate'];
  const wantRotate = explicit !== undefined ? explicit !== false : rotateOnOpen;

  return React.cloneElement(
    el,
    { 'data-aui-rotate': wantRotate ? '' : undefined },
    defaultChevron(scale, { ...inheritAui, ...(chProps.aui ?? {}) }),
  );
}
