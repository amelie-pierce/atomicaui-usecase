// modules/design/atomic-aui/src/lib/view/scroll-area.tsx
//
// View.ScrollArea + its parts — a thin AtomicAUI wrapper over Base UI's ScrollArea (1.5.0). It is a
// HYBRID compound: by default it AUTO-COMPOSES (Viewport + the scrollbars/thumbs for the active
// `scrollAxis` + Corner); compose any explicit part among the children and it OVERRIDES (renders the
// children directly so the consumer drives the subtree).
//
// ── THE BASE UI CONTRACT (verified by reading node_modules/@base-ui/react/esm/scroll-area/**) ──
// Base UI OWNS the layout — we must NEVER fight it (the discard cause): the Root is `position:relative`
// (inline) with no intrinsic size; the Viewport is `overflow:scroll` (inline, un-overridable by a
// class) and hides the native bar itself; the Scrollbar is `position:absolute` pinned to the edge,
// writing the proportional `--scroll-area-thumb-height/-width` onto itself, rendering `null` unless
// that axis overflows; the Thumb is an in-flow block sized `height/width: var(--scroll-area-thumb-*)`
// (the proportional MAIN-AXIS length) and positioned by an imperative `transform`. Our ONLY safe CSS
// (in `_state-cascade.scss`) is the surface, the cross-axis THICKNESS, the thumb color/radius, and the
// auto-hide fade — NO `display:flex`/`flex`/`position`/`overflow`/main-axis-size on the bar or thumb.
//
// ── scrollAxis (single-axis clipping) ── The Viewport's `overflow:scroll` is inline, so a class can't
// clip one axis. Instead we pass an `overflow*` LONGHAND through `elementProps` to the auto-rendered
// Viewport: Base UI merges `props: [props, elementProps]`, so OUR longhand (elementProps) wins that
// axis. And the bar is gated by WHICH Scrollbar we mount (the table below), NOT a CSS gate on
// `data-has-overflow-*` — Base UI ignores `overflow:hidden` when computing the hidden state, so it may
// still stamp that attr on a clipped axis.
import * as React from 'react';
import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, hasPartChild, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { SCROLL_AREA_VOCAB, type ScrollAreaAui } from './use-recipe';

export {
  SCROLL_AREA_VOCAB,
  SCROLL_AREA_SX_AXES,
  SCROLL_AREA_SCROLLBAR_SX_AXES,
} from './use-recipe';
export type { ScrollAreaAui, ScrollAreaScrollbarSxKey } from './use-recipe';

/** The scroll behaviour of the auto-composed ScrollArea. Drives BOTH the Viewport overflow longhand
 *  (passed through `elementProps`, winning the clipped axis) AND which Scrollbar(s) are mounted. */
export type ScrollAxis = 'auto' | 'vertical' | 'horizontal' | 'both' | 'none';

// ─── View.ScrollAreaViewport — the scroll Viewport part ──────────────────────────────────────────
// Wraps Base UI's Viewport (the `overflow:scroll` clipping window). A marker-only part (the
// `.aui-view-scroll-area-viewport` marker just fills the Root: `block-size/inline-size:100%`; it never
// re-sets `overflow`). Styleable is NOT offered — the Viewport is structural, not a surface.
export type ScrollAreaViewportProps = React.ComponentProps<typeof BaseScrollArea.Viewport>;
export const ScrollAreaViewport = createAtomicPart<ScrollAreaViewportProps>(
  BaseScrollArea.Viewport,
  'aui-view-scroll-area-viewport',
);
ScrollAreaViewport.displayName = 'View.ScrollAreaViewport';

// ─── View.ScrollAreaThumb — the draggable thumb part ─────────────────────────────────────────────
// Wraps Base UI's Thumb. `colorMode: 'foreground'` + `colorOnly: true` (the strictest part surface):
// the thumb's visible surface IS its `background-color`, which the `.aui-view-scroll-area-thumb` marker
// paints as `var(--aui-scrollbar-thumb, var(--aui-fg, …))` — so the thumb MIRRORS the foreground by
// default and `aui.color` tints it via the `aui-fg-<c>` anchor.
//
// `colorOnly` is LOAD-BEARING (the discard-cause guard): Base UI OWNS the thumb's main-axis size (the
// proportional `--scroll-area-thumb-height/-width`). A scale/profile rail (`aui-scale-<profile>-<tier>`)
// POPULATES `--aui-min-width/-height`, and `.aui-frame` READS them — so a consumer `aui={{ scale, profile }}`
// on the thumb would stamp a main-axis min-size that overrides Base UI's transform → a full-length thumb
// shoved out of the track (the EXACT failure this lane exists to catch). `colorOnly` makes the thumb's
// `aui` emit ONLY `aui-fg-<c>` + the color-family `sx` — never `aui-frame`, never a scale/profile/box
// rail. So no `aui` path can set `--aui-min-*` on the thumb. The marker sets ONLY the cross-axis 100% +
// color + radius; it NEVER touches the main-axis size Base UI owns.
export type ScrollAreaThumbProps = React.ComponentProps<typeof BaseScrollArea.Thumb> & PartStyleProps;
export const ScrollAreaThumb = createAtomicPart<ScrollAreaThumbProps>(
  BaseScrollArea.Thumb,
  'aui-view-scroll-area-thumb',
  { styleable: true, colorMode: 'foreground', colorOnly: true },
);
ScrollAreaThumb.displayName = 'View.ScrollAreaThumb';

/** The resting-thumb COLOR value space — derived from the Thumb's own `aui.color` so it can't drift
 *  (= the foreground color set, the SAME list the `aui.sx.foreground` knob uses). */
export type ScrollAreaThumbColor = NonNullable<ScrollAreaThumbProps['aui']>['color'];

// ─── View.ScrollAreaScrollbar — the scrollbar track part ─────────────────────────────────────────
// Wraps Base UI's Scrollbar (the absolute-positioned track). A marker-only part — the
// `.aui-view-scroll-area-scrollbar` marker sets ONLY the cross-axis THICKNESS (`--aui-scrollbar-size`)
// + the auto-hide fade; it NEVER sets display/flex/position/length (the DON'T list). The thumb is
// auto-rendered inside UNLESS the consumer composes one in `children`.
//
// `orientation` ('vertical' | 'horizontal') + `keepMounted` pass through to Base UI natively. The
// thumb-size/hover knobs are set as inline `--aui-scrollbar-*` vars by the auto-composer (below) /
// the consumer's `style`.
export type ScrollAreaScrollbarProps = React.ComponentProps<typeof BaseScrollArea.Scrollbar> & {
  /** Resting color for the AUTO-rendered thumb (the foreground anchor). Threaded down from the Root's
   *  `scrollbarColor`. IGNORED when a Thumb is composed in `children` (the consumer's `aui.color`
   *  drives it then). Destructured out — never a DOM attr. */
  thumbColor?: ScrollAreaThumbColor;
};
const ScrollAreaScrollbarBase = createAtomicPart<React.ComponentProps<typeof BaseScrollArea.Scrollbar>>(
  BaseScrollArea.Scrollbar,
  'aui-view-scroll-area-scrollbar',
);
ScrollAreaScrollbarBase.displayName = 'View.ScrollAreaScrollbar';

// The scrollbar auto-renders a default Thumb unless the consumer composes one as a child.
export const ScrollAreaScrollbar = React.forwardRef<HTMLElement, ScrollAreaScrollbarProps>(
  function ScrollAreaScrollbar({ children, thumbColor, ...rest }, ref) {
    const composedThumb = hasPartChild(children, ScrollAreaThumb);
    // AUTO thumb takes the resting color via `aui.color` → `aui-fg-<c>` (sets `--aui-fg` on the thumb,
    // which its `background-color: var(--aui-scrollbar-thumb, var(--aui-fg, …))` resolves). A composed
    // thumb keeps the consumer's own `aui.color` (thumbColor is ignored).
    const content = composedThumb
      ? children
      : React.createElement(ScrollAreaThumb, thumbColor ? { aui: { color: thumbColor } } : null);
    return React.createElement(
      ScrollAreaScrollbarBase as React.ElementType,
      { ref, ...rest },
      content,
    );
  },
);
ScrollAreaScrollbar.displayName = 'View.ScrollAreaScrollbar';

// ─── View.ScrollAreaCorner — the corner where two bars meet ──────────────────────────────────────
// Wraps Base UI's Corner (the small square at the bottom-inline-end when both bars show). Marker-only.
export type ScrollAreaCornerProps = React.ComponentProps<typeof BaseScrollArea.Corner>;
export const ScrollAreaCorner = createAtomicPart<ScrollAreaCornerProps>(
  BaseScrollArea.Corner,
  'aui-view-scroll-area-corner',
);
ScrollAreaCorner.displayName = 'View.ScrollAreaCorner';

// ─── View.ScrollArea Root — the surface frame (main factory) ─────────────────────────────────────
// The Base UI `ScrollArea.Root` styled as our surface card. STATELESS recipe only (no useStateLayer —
// a surface has no hover/focus overlay). Defaults: surface / solid / sm / default / none / 0 (the
// `default` profile gives padding so the auto-hide bar doesn't overlap content).
const useScrollAreaRecipe = createVocabRecipe(SCROLL_AREA_VOCAB);
const _ScrollAreaRoot = createAtomicComponent(BaseScrollArea.Root, {
  extensions: [useScrollAreaRecipe],
});

export interface ScrollAreaProps
  extends Omit<React.ComponentProps<typeof BaseScrollArea.Root>, 'color'> {
  /** Unified customisation object: the FULL 7-axis frame appearance (color/paint/scale/profile/
   *  shape/elevation/sx) for the Root surface card. Default: surface / solid / sm / default / none / 0. */
  aui?: ScrollAreaAui;
  /** Which axes scroll. Default `'auto'`. Drives the Viewport overflow longhand (clipping the OTHER
   *  axis via `elementProps`) + which Scrollbar(s) auto-mount. IGNORED in override mode (when the
   *  consumer composes explicit parts — they drive the subtree then). */
  scrollAxis?: ScrollAxis;
  /** Cross-axis scrollbar thickness override (`--aui-scrollbar-size`). A NUMBER resolves to the
   *  matching `--p-px-<n>` token var (the workspace token rail — `8` → `var(--p-px-8)`), keeping the
   *  thickness on-system; a STRING is passed through verbatim (any CSS length / token var for an
   *  off-rail value). Applied as an inline custom-prop var (read by the scrollbar/thumb markers). Not
   *  an `aui` axis — destructured out, never a DOM attr; consumer `style` wins. */
  scrollbarSize?: number | string;
  /** Thumb hover color override (`--aui-scrollbar-thumb-hover`). Any CSS color. Inline custom-prop var.
   *  Not an `aui` axis. Consumer `style` wins. */
  scrollbarThumbHover?: string;
  /** Resting thumb COLOR — the foreground anchor; its value space is the SAME foreground color set the
   *  `aui.sx.foreground` knob uses. Threaded to the auto-rendered thumb as `aui={{ color }}` →
   *  `aui-fg-<color>` sets `--aui-fg` → the resting thumb `background-color: var(--aui-scrollbar-thumb,
   *  var(--aui-fg, …))` resolves to it. Unset = mirror the ambient foreground. IGNORED in override mode
   *  (compose `<View.ScrollAreaThumb aui={{ color }}/>` instead). Not an `aui` axis on the Root. */
  scrollbarColor?: ScrollAreaThumbColor;
}

// Map scrollAxis → the Viewport overflow longhand we pass via elementProps (wins the clipped axis) +
// which scrollbars to auto-mount. (Gate the bar by MOUNTING, never a CSS overflow gate — Base UI
// ignores overflow:hidden when computing hiddenState.)
function viewportOverflowStyle(axis: ScrollAxis): React.CSSProperties | undefined {
  switch (axis) {
    case 'vertical':
      return { overflowX: 'hidden' };
    case 'horizontal':
      return { overflowY: 'hidden' };
    case 'none':
      return { overflowX: 'hidden', overflowY: 'hidden' };
    case 'auto':
    case 'both':
    default:
      return undefined; // Base UI default — bars appear per real overflow.
  }
}

function autoScrollbars(axis: ScrollAxis): ('vertical' | 'horizontal')[] {
  switch (axis) {
    case 'vertical':
      return ['vertical'];
    case 'horizontal':
      return ['horizontal'];
    case 'none':
      return [];
    case 'auto':
    case 'both':
    default:
      return ['vertical', 'horizontal'];
  }
}

// The hybrid auto/override wrapper. Override mode fires when the consumer composes ANY explicit part
// among children (Viewport / Scrollbar / Thumb / Corner) — then we render `children` directly and let
// the consumer drive. Otherwise we auto-render <Viewport>{children}</Viewport> + the scrollbars + a
// Corner for the active `scrollAxis`.
const ScrollAreaRoot = React.forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { scrollAxis = 'auto', scrollbarSize, scrollbarThumbHover, scrollbarColor, style, children, ...rest },
  ref,
) {
  // Inline custom-prop knobs the scrollbar/thumb markers read. Spread consumer `style` LAST so it wins.
  // A NUMERIC `scrollbarSize` maps to the `--p-px-<n>` token var (on-system, no raw px); a STRING is
  // passed through (off-rail / token-var escape hatch).
  const hookStyle = {
    ...(scrollbarSize != null
      ? { '--aui-scrollbar-size': typeof scrollbarSize === 'number' ? `var(--p-px-${scrollbarSize})` : scrollbarSize }
      : {}),
    ...(scrollbarThumbHover != null ? { '--aui-scrollbar-thumb-hover': scrollbarThumbHover } : {}),
  } as React.CSSProperties;
  const hasHookStyle = scrollbarSize != null || scrollbarThumbHover != null;
  const mergedStyle =
    hasHookStyle || style ? ({ ...hookStyle, ...(style as React.CSSProperties) }) : undefined;

  const isOverride =
    hasPartChild(children, ScrollAreaViewport) ||
    hasPartChild(children, ScrollAreaScrollbar) ||
    hasPartChild(children, ScrollAreaThumb) ||
    hasPartChild(children, ScrollAreaCorner);

  let content: React.ReactNode;
  if (isOverride) {
    // OVERRIDE: the consumer composed parts — render them directly, ignore scrollAxis.
    content = children;
  } else {
    // AUTO: wrap children in a Viewport (clipping the OTHER axis via the overflow longhand) + mount a
    // Scrollbar (each with an auto-rendered Thumb) per the active axis + a Corner.
    const overflow = viewportOverflowStyle(scrollAxis);
    const bars = autoScrollbars(scrollAxis);
    content = (
      <>
        {/* Keyed by axis: switching axes (e.g. vertical -> auto) remounts the Viewport. Re-rendering the same
            element would make React REMOVE the dropped overflow longhand, and that removal also wipes Base UI's
            inline `overflow:scroll` shorthand, so the Viewport stopped clipping and the content spilled out. */}
        {React.createElement(
          ScrollAreaViewport,
          overflow ? { key: scrollAxis, style: overflow } : { key: scrollAxis },
          children,
        )}
        {bars.map((orientation) =>
          React.createElement(ScrollAreaScrollbar, {
            key: orientation,
            orientation,
            ...(scrollbarColor ? { thumbColor: scrollbarColor } : {}),
          }),
        )}
        {bars.length === 2 ? React.createElement(ScrollAreaCorner) : null}
      </>
    );
  }

  return React.createElement(
    _ScrollAreaRoot as React.ElementType,
    { ref, ...rest, ...(mergedStyle !== undefined ? { style: mergedStyle } : {}) },
    content,
  );
});
ScrollAreaRoot.displayName = 'View.ScrollArea';

export const ScrollArea = ScrollAreaRoot;
export default ScrollArea;
