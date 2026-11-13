import * as React from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { findPartChild } from '../../core/factory/create-atomic-part';
import { useStateLayer } from '../../core/state/use-state-layer';
import {
  ScrollArea as ViewScrollArea,
  ScrollAreaViewport as ViewScrollAreaViewport,
  ScrollAreaScrollbar as ViewScrollAreaScrollbar,
} from '../view';
import type { ScrollAreaThumbColor } from '../view';
import { useTextareaRecipe } from './use-recipe';
import type { TextareaAui } from './use-recipe';
import {
  useTextareaResize,
  RESIZE_HANDLES_BY_AXIS,
  type TextareaResizeAxis,
  type TextareaResizeController,
  type TextareaResizeDir,
} from './use-textarea-resize';
import { useFieldAui, type FieldResolvedAui } from '../field/field-context';

// ─── Field-axis forwarding (2026-07-11 USER DECISION — fleet-wide, PINNED, scope widened to
// EVERY Field control family) ──────────────────────────────────────────────────────────────────
// `Field.Textarea` is a REFERENCE-IDENTICAL re-export (`Field.Textarea === Textarea`, field.tsx) —
// unlike NumberField, it previously did NOT self-cascade the Field's color/scale/shape/elevation/sx
// AT ALL (documented at field.tsx's `Field.Textarea` comment as a known caveat: "set `aui`
// explicitly to match"). This closes that gap the SAME way Select/Dropdown/Combobox did: `Textarea`
// reads the ambient `FieldAuiContext` directly and merges color/shape/elevation/sx UNDER its own
// `aui` (own axis always wins), mirroring `useMergedAutocompletePartAui` (autocomplete.tsx:84-105).
//
// SCALE is included here too — UNLIKE Select/Dropdown/Combobox (whose `FieldMergeableAui` type
// deliberately excludes scale, because those components have a SEPARATE `AuiScaleProvider` rail
// that already delivers the ambient tier), Textarea has NO scale-cascade participation whatsoever
// (grepped: zero `useAuiScale`/`useScaleCascade`/`AuiScaleProvider` references in this file) — the
// ONLY ambient scale source available to it is the Field cascade's own `.scale`, exactly like
// `NumberField`'s `resolvePartAui` (`field-context.tsx`), which ALSO merges scale unconditionally
// (`own?.scale ?? inherited.scale ?? defaults.scale`) because NumberField has no separate rail
// either. So Textarea's merge widens `FieldMergeableAui` to include `scale`, mirroring NumberField's
// shape rather than Autocomplete's here — the axis set a part merges follows whether that part has
// an alternate delivery mechanism for that axis, not a fixed universal list.
//
// Outside any `<Field>`, `useFieldAui()` resolves to the empty default context, so this is a no-op
// for the (common) standalone `<Textarea>` usage.
type FieldMergeableAui = {
  color?: unknown;
  scale?: unknown;
  shape?: unknown;
  elevation?: unknown;
  sx?: unknown;
};

function mergeTextareaFieldAxes<A extends FieldMergeableAui>(
  inherited: FieldResolvedAui,
  own: A | undefined,
): A {
  const out: Record<string, unknown> = { ...(own ?? {}) };
  if (own?.color === undefined && inherited.color !== undefined) out.color = inherited.color;
  if (own?.scale === undefined && inherited.scale !== undefined) out.scale = inherited.scale;
  if (own?.shape === undefined && inherited.shape !== undefined) out.shape = inherited.shape;
  if (own?.elevation === undefined && inherited.elevation !== undefined) out.elevation = inherited.elevation;
  const ownSx = (own as { sx?: object } | undefined)?.sx;
  if (inherited.sx !== undefined || ownSx !== undefined) {
    out.sx = { ...(inherited.sx as object | undefined), ...ownSx };
  }
  return out as A;
}

function useTextareaFieldMergedAui<A extends FieldMergeableAui>(aui: A | undefined): A {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeTextareaFieldAxes(inherited, aui), [inherited, aui]);
}

// Textarea = Input's MULTI-LINE sibling. Base UI has NO textarea primitive, but Base UI's `Input` IS
// `Field.Control` (a tag-swappable wrapper), so pinning `render={<textarea/>}` gives a native
// <textarea> with all of Base UI's value / Field-data-attribute / dirty-filled machinery for free —
// and Field.Control's `onKeyDown` gates Enter-commit to `tagName === 'INPUT'`, so a textarea gets
// Enter=newline (NOT submit/commit) at no cost. (Evidence pack 2026-07-04.)
//
// Focus-origin machinery is COPIED from `lib/input/input.tsx` (NOT imported — a `lib → lib` import is
// forbidden; Input is the nearest shipped sibling per §0a). It stamps `data-aui-focus-origin` so the
// shared `.aui-stateful:focus-visible` ring shows ONLY on keyboard (Tab) focus — Chromium otherwise
// matches `:focus-visible` on a pointer-focused text control.
type BaseInputProps = React.ComponentPropsWithoutRef<typeof BaseInput>;
type FocusOriginHost = {
  getAttribute(name: string): string | null;
  removeAttribute(name: string): void;
  setAttribute(name: string, value: string): void;
};
type FocusOriginEvent = { key?: unknown };
type FocusOriginWindow = {
  addEventListener(type: string, listener: (event: unknown) => void, options?: boolean): void;
  removeEventListener(type: string, listener: (event: unknown) => void, options?: boolean): void;
};
type TextareaFocusOrigin = 'keyboard' | 'pointer';

let lastTextareaFocusOrigin: TextareaFocusOrigin = 'pointer';
let focusOriginListenerCount = 0;

function markKeyboardFocusOrigin(event: unknown): void {
  if ((event as FocusOriginEvent).key === 'Tab') {
    lastTextareaFocusOrigin = 'keyboard';
  }
}

function markPointerFocusOrigin(): void {
  lastTextareaFocusOrigin = 'pointer';
}

function focusOriginWindow(): FocusOriginWindow | undefined {
  return (globalThis as { window?: FocusOriginWindow }).window;
}

function installFocusOriginListeners(): (() => void) | undefined {
  const win = focusOriginWindow();
  if (!win) return undefined;

  if (focusOriginListenerCount === 0) {
    win.addEventListener('keydown', markKeyboardFocusOrigin, true);
    win.addEventListener('pointerdown', markPointerFocusOrigin, true);
    win.addEventListener('mousedown', markPointerFocusOrigin, true);
    win.addEventListener('touchstart', markPointerFocusOrigin, true);
  }
  focusOriginListenerCount += 1;

  return () => {
    focusOriginListenerCount -= 1;
    if (focusOriginListenerCount === 0) {
      win.removeEventListener('keydown', markKeyboardFocusOrigin, true);
      win.removeEventListener('pointerdown', markPointerFocusOrigin, true);
      win.removeEventListener('mousedown', markPointerFocusOrigin, true);
      win.removeEventListener('touchstart', markPointerFocusOrigin, true);
    }
  };
}

function focusOriginHost(currentTarget: unknown): FocusOriginHost {
  return currentTarget as FocusOriginHost;
}

/** The value type of the RETIRED native `resize` prop (kept for API back-compat; inert — see
 *  {@link TextareaProps.resize}). For live drag-to-resize use {@link TextareaResizeAxis}/`resizable`. */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export const TEXTAREA_DEFAULT_ROWS = 3;
export const TEXTAREA_DEFAULT_RESIZE: TextareaResize = 'vertical';

// The window-style pointer-resize axis (default `none`). Re-exported from the resize controller so the
// public type rides through `TextareaProps` and `Field.Textarea` untouched.
export type { TextareaResizeAxis } from './use-textarea-resize';
export const TEXTAREA_DEFAULT_RESIZABLE: TextareaResizeAxis = 'none';

// The default bound of the composed `Textarea.ScrollArea` mode when the part carries neither
// `maxHeight` nor `height` — a rail value (~8 lines) so the box is never unbounded (which would make
// the mode pointless). Overridable per-instance via the part's `maxHeight`/`height`.
export const TEXTAREA_SCROLL_DEFAULT_MAX_HEIGHT = 192;

// The default DS-thumb thickness of the auto-rendered View.ScrollArea wrapper — 8 (the `--p-px-8` rail),
// passed PROPS-FIRST through View.ScrollArea's own `scrollbarSize` prop (never a CSS hack), so the wrapped
// Textarea thumb reads the SAME 8px as every other AtomicAUI View.ScrollArea. PRECEDENT: ADC's InputsPanel
// passes `scrollbarSize={8}` to its `Panel.ScrollArea` (InputsPanel.tsx). A consumer `<Textarea.ScrollArea
// scrollbarSize/>` overrides it (number → `--p-px-<n>`; string → verbatim, matching View.ScrollArea).
export const TEXTAREA_SCROLL_DEFAULT_SCROLLBAR_SIZE = 8;

// The frame defaults the WRAPPING View.ScrollArea Root paints in the wrapped modes. Spread UNDER the
// consumer `aui` so a bare wrapper carries the resting frame; a consumer `aui` still overrides. The
// wrapper Root paints `fixed` + `surface` — byte-identical to the textarea ROOT (`TEXTAREA_VOCAB`), so a
// WRAPPED default `<Textarea>` looks EXACTLY like the UNWRAPPED (autoGrow/fill) one: the same visible
// input-outline (`--theme-outlined` border) + surface fill. USER-CONFIRMED 2026-07-06 (decision prompt):
// keep `fixed`/`surface` — ZERO visual change, full cross-mode parity. A `solid` + `surface` wrapper was
// evaluated and DECLINED (it makes the border == the fill → erases the outline); the borderless variant
// stays available per-instance via a consumer `aui={{ paint: 'solid' }}`. Do NOT flip this to `solid` on a
// future reconcile (same lock as the root paint). The inner textarea is CSS-stripped transparent in this
// mode, so ONLY this wrapper paint shows.
const TEXTAREA_FRAME_DEFAULTS = {
  color: 'surface',
  paint: 'fixed',
  scale: 'sm',
  profile: 'default',
  shape: 'soft',
  elevation: 0,
} as const;

export interface TextareaProps
  extends Omit<
    React.ComponentPropsWithoutRef<'textarea'>,
    'color' | 'children' | 'style'
  > {
  aui?: TextareaAui;
  /** Base UI controlled-value change callback (mirrors Input). */
  onValueChange?: BaseInputProps['onValueChange'];
  /** RETIRED / inert — kept only for API back-compat (accepted, but has NO effect; the component reads
   *  it nowhere). Every Textarea is wrapped in the DS View.ScrollArea (or, for unbounded/fill autoGrow,
   *  `field-sizing` owns the height), so the wrapper owns the box height and a native `resize` drag handle
   *  would fight it. For drag-to-resize use the live {@link TextareaProps.resizable} prop; to grow the box
   *  use `autoGrow`. */
  resize?: TextareaResize;
  /** Whether the box can be dragged larger from invisible hit zones on the wrapping View.ScrollArea Root —
   *  the SAME window-style pointer-resize the Dialog uses, but simpler (the wrapper sits in normal flow, so
   *  there is no centering-compensation translate). Axis → hit zones: `horizontal` → the RIGHT edge only;
   *  `vertical` → the BOTTOM edge only; `both` → right + bottom + the bottom-right CORNER; `none` → no
   *  handles. A VERTICAL drag releases the wrapper's height bound so the box owns its height thereafter;
   *  width caps at the parent content width (floor 96px), height is uncapped (floor 64px). Pointer-only —
   *  the hit zones are `aria-hidden`, take no tab stop. IGNORED (with a dev-warn) on an UNBOUNDED autoGrow
   *  textarea (the box grows forever — nothing to resize). Default `'none'`. Distinct from the retired
   *  native CSS `resize` prop. */
  resizable?: TextareaResizeAxis;
  /** Grow the box with its content instead of sitting at a fixed `rows` height (`field-sizing: content`).
   *  `rows` becomes the STARTING/minimum height and `resize` is ignored (the box owns its height). Three
   *  bound tiers:
   *   - `true` — UNBOUNDED: keeps growing with content; the surrounding page/container scrolls.
   *   - `true` + `aui.sx.maxHeight` — grows up to the px cap, then SCROLLS (native DS skin).
   *   - `'fill'` — grows to fill the PARENT's remaining space (`max-block-size: 100%`), then SCROLLS.
   *     REQUIRES the textarea's parent to be a definite-height flex/grid item with `min-block-size: 0`
   *     (e.g. a `flex: 1; min-height: 0` row in a fixed-height column) so the box caps at the row and
   *     never overflows the panel — the ADC comment-in-a-tab-panel case.
   *  Composing `<Textarea.ScrollArea/>` is autoGrow + the real `View.ScrollArea` DS thumb (implicit). */
  autoGrow?: boolean | 'fill';
  /** Inline styles merge onto the native <textarea>; the resize hook is layered on top. */
  style?: React.CSSProperties;
  /** The ONLY accepted child is a single `<Textarea.ScrollArea/>` — composing it opts the textarea
   *  into the DS-scrolled mode (auto-grow textarea wrapped by a bounded View.ScrollArea viewport that
   *  owns the scroll + the shared DS thumb). Any other child is ignored. */
  children?: React.ReactNode;
  color?: never;
  render?: never;
}

// ─── Textarea.ScrollArea — the composed DS-scroll opt-in (config-carrier part) ────────────────────
// A CONFIG SENTINEL: it renders NOTHING itself. Composing `<Textarea.ScrollArea maxHeight="…"/>` as
// the child of `<Textarea>` flips the textarea from the bare-native mode to the scroll-wrapped mode —
// the parent reads this part's props (`findPartChild`) and re-assembles the subtree as a View.ScrollArea
// wrapping an auto-growing native <textarea> (see TextareaRoot). The user's model: "the textarea will
// ALWAYS FILL, then wrapped by the scrollarea." (User decision 2026-07-05, superseding the 2026-07-04
// native-skin-only rejection — the consistency goal: the SAME View.ScrollArea thumb every scrollable uses.)
export interface TextareaScrollAreaProps {
  /** The height at which the auto-grown textarea stops growing and the viewport starts scrolling.
   *  A NUMBER maps to the `--p-px-<n>` token rail (on-system: `192` → `var(--p-px-192)`); `'fill'` → `100%`
   *  (grow to the parent's remaining space — the ScrollArea's parent must be a definite-height flex/grid
   *  item); any other STRING passes through verbatim (a CSS length or percentage — `'50%'`, `'12rem'`).
   *  Default `TEXTAREA_SCROLL_DEFAULT_MAX_HEIGHT` when neither `maxHeight` nor `height` is set. */
  maxHeight?: number | string;
  /** A FIXED viewport height (the box does not grow — it scrolls from the start once content exceeds
   *  it). Same number→rail / string→verbatim resolution as `maxHeight`. Mutually exclusive with
   *  `maxHeight` (if both are set, `height` wins as the harder bound). */
  height?: number | string;
  /** The DS scroll-thumb thickness of the wrapping View.ScrollArea — forwarded verbatim to its
   *  `scrollbarSize` prop (number → `--p-px-<n>` rail; string → verbatim). Defaults to
   *  `TEXTAREA_SCROLL_DEFAULT_SCROLLBAR_SIZE` (`8`) so a bare/auto-rendered wrapper matches every other
   *  AtomicAUI View.ScrollArea; set it to override per-instance. */
  scrollbarSize?: number | string;
  /** Thumb HOVER color — forwarded verbatim to the wrapping View.ScrollArea's `scrollbarThumbHover`
   *  prop (any CSS color; sets `--aui-scrollbar-thumb-hover`). Same name/semantics as View.ScrollArea. */
  scrollbarThumbHover?: string;
  /** Resting thumb COLOR — forwarded verbatim to the wrapping View.ScrollArea's `scrollbarColor` prop
   *  (a foreground color role; unset = mirror the ambient foreground). Same name/semantics as
   *  View.ScrollArea. So `<Textarea.ScrollArea/>` mirrors View.ScrollArea's scroll-thumb prop surface
   *  (scrollbarSize / scrollbarThumbHover / scrollbarColor) alongside its own maxHeight/height. */
  scrollbarColor?: ScrollAreaThumbColor;
}
/** Config-carrier — never rendered. The parent Textarea reads its props to build the scroll subtree. */
const TextareaScrollArea: React.FC<TextareaScrollAreaProps> = () => null;
TextareaScrollArea.displayName = 'Textarea.ScrollArea';

// The window-style resize hit zones for a resizable Textarea. Each is an invisible, `aria-hidden`,
// pointer-only strip (edges) or square (corner) absolutely positioned inside the wrapping ScrollArea Root
// edge; the cursor + geometry live in `_state-cascade.scss` on the `[data-aui-resize-handle]` marker
// (SCSS-cascade-first — no inline style). Divs take no tab stop; `onPointerDown` starts the directional
// resize. Only the `e`/`s`/`se` subset per the requested axis — the box only grows down/right in flow.
function TextareaResizeHandles({
  axis,
  resize,
}: {
  axis: Exclude<TextareaResizeAxis, 'none'>;
  resize: TextareaResizeController;
}): React.JSX.Element {
  return (
    <>
      {RESIZE_HANDLES_BY_AXIS[axis].map((dir: TextareaResizeDir) => (
        <div
          key={dir}
          data-aui-resize-handle={dir}
          aria-hidden="true"
          onPointerDown={(event) => resize.onHandlePointerDown(dir, event)}
        />
      ))}
    </>
  );
}

/** Resolve a bound value to a CSS length. `'fill'` → `100%` (grow to the parent's remaining space — the
 *  parent must be a definite-height flex/grid item; see `Textarea.ScrollArea` maxHeight). A NUMBER or a
 *  bare-integer STRING (`160`, `"160"`) maps to the `--p-px-<n>` token rail (on-system, matching the
 *  `aui.sx.maxHeight` convention + the number knob); any other STRING passes through verbatim (a unit
 *  length or percentage — `'50%'`, `'12rem'`, `var(--x)`). */
function resolveBound(value: number | string): string {
  if (typeof value === 'number') return `var(--p-px-${value})`;
  const trimmed = value.trim();
  if (trimmed === 'fill') return '100%';
  return /^\d+$/.test(trimmed) ? `var(--p-px-${trimmed})` : value;
}

/** Return a copy of `aui` with `sx.maxHeight` removed. In a wrapped Textarea the bound lives on the
 *  ScrollArea Viewport, not the textarea — a `max-height` on the inner textarea would cap IT and
 *  reintroduce native scroll. */
function stripSxMaxHeight(aui: TextareaAui | undefined): TextareaAui | undefined {
  const sx = aui?.sx as Record<string, unknown> | undefined;
  if (!sx || sx['maxHeight'] == null) return aui;
  const restSx: Record<string, unknown> = { ...sx };
  delete restSx['maxHeight'];
  const next: Record<string, unknown> = { ...(aui as Record<string, unknown>) };
  if (Object.keys(restSx).length > 0) next['sx'] = restSx;
  else delete next['sx'];
  return next as TextareaAui;
}

// The DS lib build excludes the DOM `lib` (mirrors the focus-origin machinery above, which types the
// host structurally rather than as an `HTMLElement`). So the caret-follow engine reaches the few DOM
// members it needs through these minimal STRUCTURAL shapes, casting the `HTMLTextAreaElement`/
// `HTMLElement` it is handed. Nothing DOM-lib-wide is pulled in.
interface CaretStyle {
  readonly [prop: string]: string;
}
interface CaretWindow {
  getComputedStyle(el: unknown): CaretStyle;
  requestAnimationFrame(cb: () => void): number;
  cancelAnimationFrame(id: number): void;
}
interface CaretNode {
  style: Record<string, string>;
  parentNode: unknown;
  ownerDocument: CaretDocument | null;
  textContent: string;
  offsetTop: number;
  setAttribute(name: string, value: string): void;
  appendChild(node: CaretNode): void;
}
interface CaretDocument {
  activeElement: unknown;
  defaultView: CaretWindow | null;
  body: { appendChild(node: CaretNode): void };
  createElement(tag: string): CaretNode;
  addEventListener(type: string, listener: () => void): void;
  removeEventListener(type: string, listener: () => void): void;
}
interface CaretTextarea {
  value: string;
  selectionStart: number;
  selectionEnd: number;
  clientWidth: number;
  ownerDocument: CaretDocument | null;
  addEventListener(type: string, listener: () => void): void;
  removeEventListener(type: string, listener: () => void): void;
}
interface CaretViewport {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

/** Scroll the ScrollArea `viewport` the minimum needed to keep the textarea caret line in view. Pure +
 *  geometry-driven so it is unit-testable with mocked element metrics (jsdom implements no layout).
 *  Fast path — caret at the very end (the append-while-typing case, the acceptance bar): reveal the
 *  bottom (`scrollTop = scrollHeight`). Otherwise measure the caret's Y with a mirror element and
 *  scroll just enough to bring `[caretTop, caretTop+lineHeight]` inside the viewport. */
export function scrollTextareaCaretIntoView(
  textarea: HTMLTextAreaElement,
  viewport: HTMLElement,
): void {
  const ta = textarea as unknown as CaretTextarea;
  const vp = viewport as unknown as CaretViewport;
  const { selectionStart, selectionEnd, value } = ta;
  // Append/end fast path: caret collapsed at the end → the newest line is the bottom of the content.
  if (selectionStart === selectionEnd && selectionEnd === value.length) {
    vp.scrollTop = vp.scrollHeight;
    return;
  }
  const caretTop = measureTextareaCaretTop(ta);
  if (caretTop == null) return;
  const lineHeight = readLineHeight(ta);
  const caretBottom = caretTop + lineHeight;
  const viewTop = vp.scrollTop;
  const viewBottom = viewTop + vp.clientHeight;
  if (caretBottom > viewBottom) {
    vp.scrollTop = caretBottom - vp.clientHeight;
  } else if (caretTop < viewTop) {
    vp.scrollTop = caretTop;
  }
}

function readLineHeight(ta: CaretTextarea): number {
  const view = ta.ownerDocument?.defaultView;
  if (!view) return 0;
  const cs = view.getComputedStyle(ta);
  const n = Number.parseFloat(cs.lineHeight);
  if (Number.isFinite(n)) return n;
  // `normal` line-height → approximate from font-size (the standard ~1.2 factor).
  const fs = Number.parseFloat(cs.fontSize);
  return Number.isFinite(fs) ? fs * 1.2 : 0;
}

// The mirror technique: a native <textarea> exposes no caret pixel position, so we clone the text up to
// the caret into an off-screen element that mirrors the textarea's text metrics (font/padding/width/
// wrapping) and read the marker's offsetTop. Returns null in a layout-less environment (jsdom) where
// offsetTop is 0 and the measurement is meaningless — callers no-op then (the end fast path still runs).
const MIRROR_PROPS = [
  'boxSizing', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
  'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing', 'lineHeight',
  'textTransform', 'wordSpacing', 'tabSize',
] as const;
let mirrorEl: CaretNode | undefined;
function measureTextareaCaretTop(ta: CaretTextarea): number | null {
  const doc = ta.ownerDocument;
  const view = doc?.defaultView;
  if (!doc || !view) return null;
  if (mirrorEl == null || mirrorEl.ownerDocument !== doc) mirrorEl = createMirror(doc);
  const mirror = mirrorEl;
  if (mirror.parentNode == null) doc.body.appendChild(mirror);

  const cs = view.getComputedStyle(ta);
  for (const p of MIRROR_PROPS) mirror.style[p] = cs[p];
  // The inner textarea is width:100% with no border/padding in scroll mode, so the mirror width tracks
  // the content box; force the wrapping behavior a textarea uses.
  mirror.style.width = `${ta.clientWidth}px`;
  mirror.style.whiteSpace = 'pre-wrap';
  mirror.style.overflowWrap = 'break-word';

  mirror.textContent = ta.value.substring(0, ta.selectionStart);
  const marker = doc.createElement('span');
  // A trailing non-empty node so the marker has layout even at a line start / end of value.
  marker.textContent = ta.value.substring(ta.selectionStart) || '.';
  mirror.appendChild(marker);
  const top = marker.offsetTop;
  mirror.textContent = '';
  return top;
}

function createMirror(doc: CaretDocument): CaretNode {
  const div = doc.createElement('div');
  div.setAttribute('aria-hidden', 'true');
  Object.assign(div.style, {
    position: 'absolute', top: '0', left: '0', visibility: 'hidden',
    height: 'auto', overflow: 'hidden', pointerEvents: 'none', zIndex: '-1',
  });
  return div;
}

/** Attach the caret-follow driver to the composed scroll mode. On `input` / `selectionchange` /
 *  `compositionend` (IME) / `keyup`, re-run `scrollTextareaCaretIntoView` on the next animation frame
 *  (after layout). Cheap: the append case is a single `scrollTop` write; the mirror path fires only for
 *  mid-document edits. No-op unless `enabled`. */
function useTextareaCaretFollow(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  viewportRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  React.useEffect(() => {
    if (!enabled) return;
    const textarea = textareaRef.current;
    const viewport = viewportRef.current;
    if (!textarea || !viewport) return;
    const ta = textarea as unknown as CaretTextarea;
    const doc = ta.ownerDocument;
    const view = doc?.defaultView;
    if (!doc || !view) return;

    let frame = 0;
    const schedule = () => {
      view.cancelAnimationFrame(frame);
      frame = view.requestAnimationFrame(() => scrollTextareaCaretIntoView(textarea, viewport));
    };
    const onSelectionChange = () => {
      if (doc.activeElement === textarea) schedule();
    };
    ta.addEventListener('input', schedule);
    ta.addEventListener('keyup', schedule);
    ta.addEventListener('compositionend', schedule);
    doc.addEventListener('selectionchange', onSelectionChange);
    return () => {
      view.cancelAnimationFrame(frame);
      ta.removeEventListener('input', schedule);
      ta.removeEventListener('keyup', schedule);
      ta.removeEventListener('compositionend', schedule);
      doc.removeEventListener('selectionchange', onSelectionChange);
    };
  }, [enabled, textareaRef, viewportRef]);
}

const _Textarea = createAtomicComponent(BaseInput, {
  extensions: [useStateLayer, useTextareaRecipe],
});

const TextareaRoot = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    aui,
    children,
    color,
    render,
    rows = TEXTAREA_DEFAULT_ROWS,
    resize = TEXTAREA_DEFAULT_RESIZE,
    resizable = TEXTAREA_DEFAULT_RESIZABLE,
    autoGrow = false,
    style,
    onBlurCapture,
    onFocusCapture,
    onMouseDownCapture,
    onPointerDownCapture,
    ...rest
  },
  ref,
) {
  void color;
  void render;

  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // textarea's own `aui` — own axis always wins. A no-op outside any `<Field>`.
  const mergedAui = useTextareaFieldMergedAui(aui as TextareaAui | undefined);

  // Composed DS-scroll mode fires when a `<Textarea.ScrollArea/>` is composed as a child; its props
  // carry the bound (maxHeight/height). Otherwise the textarea renders as the bare native control.
  const scrollPart = findPartChild(children, TextareaScrollArea);
  const scrollProps = scrollPart?.props as TextareaScrollAreaProps | undefined;
  const isScroll = scrollProps != null;

  // Merge the consumer ref with an internal ref to the native <textarea> — the caret-follow driver
  // needs the element in scroll mode, and the consumer still gets its HTMLTextAreaElement in both modes.
  const internalTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const viewportRef = React.useRef<HTMLElement | null>(null);
  const setTextareaRef = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      internalTextareaRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
    },
    [ref],
  );
  // Scroll-chrome contract: the DS View.ScrollArea is the Textarea's ALWAYS-ON 3-layer BASE (wrapper Root /
  // viewport / textarea) — a Textarea NEVER scrolls natively. This now INCLUDES `autoGrow="fill"` (design
  // law 2026-07-06): grow-into-fill composes INSIDE the 3-layer by putting the bound on the ROOT, not the
  // viewport — `.aui-textarea-scroll--fill` gives the wrapper Root `height:auto; max-block-size:100%` so it
  // HUGS content (rows floor when empty) and CAPS at the parent's remaining space; the viewport's
  // `block-size:100%` then resolves to `auto` while the Root hugs (no scroll) and to the definite capped
  // height once the Root maxes (scrolls with the SAME real View.ScrollArea thumb). Browser-proven timeline:
  // empty→rows floor, grows, caps at parent, scrolls inside, never overflows. (Supersedes the 2026-07-04
  // single-layer native-skin exception — that violated the 3-layer law; the `.aui-textarea-autogrow-fill`
  // native skin is retired.) A composed `<Textarea.ScrollArea/>` drives the bound; otherwise the wrapper
  // AUTO-RENDERS. The SOLE remaining unwrapped case is UNBOUNDED autoGrow (grows forever → nothing to
  // scroll, no chrome needed).
  const autoGrowFill = autoGrow === 'fill';
  const sxMaxHeight = mergedAui.sx?.maxHeight;
  const unboundedAutoGrow = autoGrow === true && sxMaxHeight == null;
  const nativeUnwrapped = unboundedAutoGrow;
  const wrapped = isScroll || !nativeUnwrapped;
  useTextareaCaretFollow(internalTextareaRef, viewportRef, wrapped);

  // Window-style pointer-resize (dialog-mechanism, in-flow). Only the WRAPPED modes have a Root to grab —
  // the sole unwrapped case (unbounded autoGrow) grows forever, so `resizable` is ignored + dev-warned.
  const resizeEnabled = resizable !== 'none' && wrapped;
  // On the FIRST vertical drag, drop the wrapper's inline viewport bound (max/height) so the Root's inline
  // height owns the box; the viewport then fills the Root. Horizontal resize never touches the bound.
  const [userSizedVertical, setUserSizedVertical] = React.useState(false);
  const releaseVerticalBound = React.useCallback(() => setUserSizedVertical(true), []);
  const resizeController = useTextareaResize(resizeEnabled, releaseVerticalBound);

  if (
    process.env.NODE_ENV !== 'production' &&
    resizable !== 'none' &&
    nativeUnwrapped &&
    !isScroll
  ) {
    console.warn(
      '[atomic-aui] <Textarea resizable> is ignored on an UNBOUNDED autoGrow textarea (the box grows ' +
        'with its content — there is nothing to resize). Set a bound (aui.sx.maxHeight, autoGrow="fill", ' +
        'or a <Textarea.ScrollArea/>) to make it resizable.',
    );
  }

  React.useEffect(() => installFocusOriginListeners(), []);

  const handlePointerDownCapture = React.useCallback<
    NonNullable<TextareaProps['onPointerDownCapture']>
  >(
    (event) => {
      lastTextareaFocusOrigin = 'pointer';
      focusOriginHost(event.currentTarget).setAttribute('data-aui-focus-origin', 'pointer');
      onPointerDownCapture?.(event);
    },
    [onPointerDownCapture],
  );

  const handleMouseDownCapture = React.useCallback<
    NonNullable<TextareaProps['onMouseDownCapture']>
  >(
    (event) => {
      lastTextareaFocusOrigin = 'pointer';
      focusOriginHost(event.currentTarget).setAttribute('data-aui-focus-origin', 'pointer');
      onMouseDownCapture?.(event);
    },
    [onMouseDownCapture],
  );

  const handleFocusCapture = React.useCallback<NonNullable<TextareaProps['onFocusCapture']>>(
    (event) => {
      // Chromium treats text controls as :focus-visible after pointer/programmatic focus, so only a
      // captured Tab navigation may opt into the visible ring (mirrors Input).
      const target = focusOriginHost(event.currentTarget);
      target.setAttribute('data-aui-focus-origin', lastTextareaFocusOrigin);
      lastTextareaFocusOrigin = 'pointer';
      onFocusCapture?.(event);
    },
    [onFocusCapture],
  );

  const handleBlurCapture = React.useCallback<NonNullable<TextareaProps['onBlurCapture']>>(
    (event) => {
      focusOriginHost(event.currentTarget).removeAttribute('data-aui-focus-origin');
      onBlurCapture?.(event);
    },
    [onBlurCapture],
  );

  // The render element swaps Base UI Input's host from <input> to <textarea>. `rows` rides it. We ALWAYS
  // publish `rows` as `--aui-textarea-rows` (both grow modes use `field-sizing:content`, which makes the
  // native `rows` attribute INERT in Chrome — the CSS derives a real `min-block-size` rows floor from it).
  // The native `resize` prop is retired: the box height is owned by the ScrollArea wrapper (or, in the one
  // unwrapped case, by unbounded autoGrow) in every mode, so a drag handle would fight it.
  void resize;
  const textareaElement = React.createElement('textarea', {
    rows,
    style: { ...style, ['--aui-textarea-rows']: rows } as React.CSSProperties,
  });

  // The SOLE unwrapped mode (unbounded autoGrow) gets the `.aui-textarea-autogrow` marker (field-sizing +
  // rows floor). Every WRAPPED mode — now INCLUDING `autoGrow="fill"` — scopes the inner reset through the
  // Root's `.aui-textarea-scroll` marker, so no per-inner marker there.
  const autogrowClass = wrapped ? '' : 'aui-textarea-autogrow';
  const { className: restClassName, ...restProps } = rest as { className?: string } & Record<string, unknown>;
  const innerClassName = [autogrowClass, restClassName].filter(Boolean).join(' ') || undefined;

  // In a wrapped mode the BOUND lives on the Viewport, not the textarea — so strip `aui.sx.maxHeight` off
  // the inner textarea (and the Root frame) and move it to the viewport, or it would cap the textarea and
  // reintroduce native scroll.
  const innerAui = wrapped ? stripSxMaxHeight(mergedAui) : mergedAui;

  const inner = React.createElement(_Textarea as React.ElementType, {
    ref: setTextareaRef,
    ...restProps,
    aui: innerAui,
    ...(innerClassName != null ? { className: innerClassName } : {}),
    render: textareaElement,
    onBlurCapture: handleBlurCapture,
    onFocusCapture: handleFocusCapture,
    onMouseDownCapture: handleMouseDownCapture,
    onPointerDownCapture: handlePointerDownCapture,
  });

  if (!wrapped) return inner;

  // ── DS-scroll mode (auto-rendered by default, or consumer-configured via <Textarea.ScrollArea/>) ──────
  // The native <textarea> AUTO-GROWS (field-sizing:content) and NEVER self-scrolls; it is wrapped by a
  // View.ScrollArea whose Viewport (bounded per mode) owns the scroll + renders the SAME DS thumb every
  // AtomicAUI scrollable uses. The visible frame is the ScrollArea Root (`.aui-textarea-scroll`, painted
  // from the Textarea's own frame axes); the inner textarea is CSS-stripped to a transparent fill.
  const frameAui = { ...TEXTAREA_FRAME_DEFAULTS, ...(stripSxMaxHeight(mergedAui) as object) } as TextareaAui;
  // Resolve the bound per mode:
  //  • composed part → its `height` (fixed box) or `maxHeight` (grow-then-scroll; default 192; `'fill'`→100%).
  //  • autoGrow="fill" → 100% (the parent's remaining space).
  //  • autoGrow + aui.sx.maxHeight → that px cap.
  //  • DEFAULT (fixed rows) → the rows box: `rows * --aui-line-height-context` (== the textarea's rows floor,
  //    so the box is exactly `rows` tall and scrolls past it). `--aui-line-height-context` inherits from the
  //    Root's scale cell (= the textarea's `1lh`).
  let boundValue: string;
  let isFixedHeight = false;
  if (isScroll) {
    if (scrollProps.height != null) {
      boundValue = resolveBound(scrollProps.height);
      isFixedHeight = true;
    } else {
      boundValue = resolveBound(scrollProps.maxHeight ?? TEXTAREA_SCROLL_DEFAULT_MAX_HEIGHT);
    }
  } else if (autoGrowFill) {
    boundValue = '100%';
  } else if (sxMaxHeight != null) {
    boundValue = resolveBound(sxMaxHeight);
  } else {
    boundValue = `calc(var(--aui-textarea-rows, ${rows}) * var(--aui-line-height-context, 1lh))`;
  }

  // A PARENT-FILL bound (`100%`) must cap the ROOT (a direct child of the consumer's definite-height block),
  // NOT the nested Viewport — `100%` of the Viewport is circular (the Root has no intrinsic height), so it
  // would never cap. `.aui-textarea-scroll--fill` gives the Root `max-block-size:100%`; the Viewport then
  // just fills the (capped) Root. Every other bound caps the Viewport directly.
  // Once a VERTICAL resize has happened, the Root's inline height (written by the resize controller) owns
  // the box: the viewport drops its inline bound and fills the Root (`height:100%`), and the `--fill`
  // modifier's `max-block-size:100%` cap is dropped so the inline height can exceed the parent (height is
  // uncapped by design). Horizontal-only resize never flips this — the viewport bound stays.
  const isFill = boundValue === '100%';
  const rootClassName =
    userSizedVertical
      ? 'aui-textarea-scroll'
      : isFill
        ? 'aui-textarea-scroll aui-textarea-scroll--fill'
        : 'aui-textarea-scroll';
  const viewportStyleObj: Record<string, unknown> = { overflowX: 'hidden', ['--aui-textarea-rows']: rows };
  if (userSizedVertical) viewportStyleObj['height'] = '100%';
  else if (!isFill) viewportStyleObj[isFixedHeight ? 'height' : 'maxHeight'] = boundValue;
  const viewportStyle = viewportStyleObj as React.CSSProperties;

  // The wrapping View.ScrollArea's scroll-thumb prop surface is MIRRORED PROPS-FIRST from the part
  // (scrollbarSize / scrollbarThumbHover / scrollbarColor — same names + value conventions as
  // View.ScrollArea). `scrollbarSize` defaults to 8 for a bare/auto-rendered wrapper (precedent: ADC
  // InputsPanel `scrollbarSize={8}`); the other two forward only when set. No CSS sizing on the thumb.
  // `scrollbarSize`/`scrollbarThumbHover` are inline `--aui-scrollbar-*` vars on the Root (they inherit
  // to the thumb — live even here in override mode); `scrollbarColor` must reach the AUTO thumb through
  // the composed Scrollbar's `thumbColor` (the Root's own `scrollbarColor` is ignored in override mode).
  const scrollbarSize = scrollProps?.scrollbarSize ?? TEXTAREA_SCROLL_DEFAULT_SCROLLBAR_SIZE;
  const rootThumbProps = {
    scrollbarSize,
    ...(scrollProps?.scrollbarThumbHover != null ? { scrollbarThumbHover: scrollProps.scrollbarThumbHover } : {}),
  };
  const scrollbarProps: Record<string, unknown> = { orientation: 'vertical' };
  if (scrollProps?.scrollbarColor != null) scrollbarProps['thumbColor'] = scrollProps.scrollbarColor;

  // Window-style resize: capture the Root node for the controller + arm the CSS handle geometry with
  // `data-aui-resizable`, and render the `aria-hidden` hit zones as extra Root children (after the
  // Scrollbar, so they z-stack above — pointer-only, they cover only their own edge strip). The Base UI
  // ScrollArea Root is `position:relative`, so the absolutely-positioned handles anchor to it (scroll-area.tsx:9).
  return React.createElement(
    ViewScrollArea as React.ElementType,
    {
      aui: frameAui,
      className: rootClassName,
      ...rootThumbProps,
      ...(resizeEnabled
        ? { ref: resizeController.setRootNode, 'data-aui-resizable': '' }
        : {}),
      // After a VERTICAL resize the Root owns an explicit inline height, so mark the user-sized state:
      // the inner textarea is then stretched to FILL the viewport (min-block-size:100% in _state-cascade)
      // so the whole visible box is the field (clicking the grown region focuses it), while `field-sizing`
      // still lets content taller than the box scroll the viewport.
      ...(userSizedVertical ? { 'data-aui-user-sized': '' } : {}),
    },
    React.createElement(
      ViewScrollAreaViewport as React.ElementType,
      { ref: viewportRef, style: viewportStyle },
      inner,
    ),
    React.createElement(ViewScrollAreaScrollbar as React.ElementType, scrollbarProps),
    resizeEnabled
      ? React.createElement(TextareaResizeHandles, {
          key: 'aui-textarea-resize-handles',
          axis: resizable as Exclude<TextareaResizeAxis, 'none'>,
          resize: resizeController,
        })
      : null,
  );
});
TextareaRoot.displayName = 'Textarea';

export interface TextareaComponent
  extends React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>> {
  /** The composed DS-scroll opt-in. Compose as the sole child of `<Textarea>` to wrap the auto-growing
   *  textarea in a bounded View.ScrollArea viewport (the shared DS thumb + caret-follow). */
  ScrollArea: typeof TextareaScrollArea;
}

export const Textarea = Object.assign(TextareaRoot, {
  ScrollArea: TextareaScrollArea,
}) as TextareaComponent;
export default Textarea;
