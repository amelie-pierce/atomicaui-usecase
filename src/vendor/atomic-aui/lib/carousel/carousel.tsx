// modules/design/atomic-aui/src/lib/carousel/carousel.tsx
//
// Carousel — a paged, responsive, single-select card rail, as a COMPOUND component:
//
//   <Carousel aria-label="…" defaultValue="a">
//     <Carousel.PrevTrigger />
//     <Carousel.NextTrigger />
//     <Carousel.Content>
//       <Carousel.Item value="a"><Card>…</Card></Carousel.Item>
//     </Carousel.Content>
//     <Carousel.IndicatorGroup>
//       <Carousel.Indicator />
//     </Carousel.IndicatorGroup>
//   </Carousel>
//
// A thin wrapper over the EMBLA carousel engine (`embla-carousel-react`, no Embla plugins): Embla owns
// ONLY scroll physics + touch/mouse drag. Paging, selection and every a11y contract are DS-owned and
// shared through CarouselContext (the wrapping-non-base-ui-headless-primitive pattern):
//   • paging — cards-per-view is resolved from the ROOT's container width (ResizeObserver +
//     `breakpoints`) and passed to Embla as `slidesToScroll` (one move = one page) while the slide
//     WIDTH is pure CSS (`--aui-carousel-per-view` + the token gap). Indicators = ceil(cards ÷ per
//     view); `containScroll: 'trimSnaps'` aligns the uneven last page to the end. `loop: false`.
//   • triggers — real IconButtons overlaid on the rail edges; `disabled` + `focusableWhenDisabled` at
//     the ends (faded via the standard disabled chroma flip); unmounted when everything fits.
//   • items — Base UI `Toggle` (native `<button aria-pressed>`) wrapping a library `Card` (+ `Type`);
//     the Item hands the per-state appearance to the Card through Card's own `aui`.
//   • a11y — `role="region"` + `aria-roledescription="carousel"`, slides `role="group"` +
//     `aria-roledescription="slide"`, off-page slides `inert` + `aria-hidden`, a polite live region
//     announcing "Page X of Y", Left/Right keys page the rail, `prefers-reduced-motion` → speed 0.
// Embla ships no stylesheet: the structural rules (viewport clip, flex container, slide basis) live in
// `_state-cascade.scss` (the ONE stylesheet, F5.27) under `.aui-carousel` (G3).
import * as React from 'react';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { Button } from '../button';
import { Card } from '../card';
import { IconButton, type IconButtonAui } from '../icon-button';
import type { Appearance } from '../../core/vocabulary/leaf-vocabulary';
import {
  CAROUSEL_DEFAULT_BREAKPOINTS,
  buildCarouselIndicatorClasses,
  pageCount,
  pageOfIndex,
  pageStart,
  resolveCarouselItemCardAui,
  resolvePerView,
  useCarouselIndicatorGroupRecipe,
  useCarouselRootRecipe,
  type CarouselIndicatorAui,
  type CarouselIndicatorGroupAui,
  type CarouselItemAui,
  type CarouselRootAui,
} from './use-recipe';

export {
  CAROUSEL_DEFAULT_BREAKPOINTS,
  CAROUSEL_DEFAULT_SCALE,
  CAROUSEL_INDICATOR_GROUP_VOCAB,
  CAROUSEL_INDICATOR_SX_AXES,
  CAROUSEL_INDICATOR_VOCAB,
  CAROUSEL_ITEM_SELECTED,
  CAROUSEL_ITEM_SX_AXES,
  CAROUSEL_ITEM_UNSELECTED,
  CAROUSEL_ROOT_VOCAB,
  CAROUSEL_SX_AXES,
  buildCarouselIndicatorClasses,
  resolveCarouselItemCardAui,
  pageCount,
  pageOfIndex,
  pageStart,
  resolvePerView,
  useCarouselRootRecipe,
} from './use-recipe';
export type {
  CarouselColor,
  CarouselElevation,
  CarouselIndicatorAui,
  CarouselIndicatorGroupAui,
  CarouselIndicatorStateKey,
  CarouselItemAui,
  CarouselItemStateKey,
  CarouselPaint,
  CarouselProfile,
  CarouselRootAui,
  CarouselScale,
  CarouselShape,
} from './use-recipe';

// Triggers: a bare glyph over the cards (the reference shows no plate) — `text` paint on the surface
// role, so the disabled flip fades it at the ends. `md` tier for a comfortable target.
const TRIGGER_AUI: IconButtonAui = { color: 'surface', paint: 'text', scale: 'md', shape: 'pill' };

// SSR-safe iso-layout-effect (the radio-group / card-group pattern) — the lib compiles without lib.dom.
const useIsoLayoutEffect =
  typeof globalThis !== 'undefined' &&
  typeof (globalThis as { document?: unknown }).document !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect;

// Structural DOM shapes (the build tsconfig has no `lib: dom`).
type ResizeObserverLike = { observe(target: unknown): void; disconnect(): void };
type ResizeObserverCtor = new (cb: () => void) => ResizeObserverLike;
type MeasurableEl = { getBoundingClientRect(): { width: number } };
type MediaQueryListLike = {
  matches: boolean;
  addEventListener?(type: 'change', cb: () => void): void;
  removeEventListener?(type: 'change', cb: () => void): void;
};
type FocusableEl = { focus(): void };
type QueryableEl = { querySelector(sel: string): FocusableEl | null };

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mm = (globalThis as { matchMedia?: (q: string) => MediaQueryListLike }).matchMedia;
    if (typeof mm !== 'function') return undefined;
    const mql = mm('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener?.('change', update);
    return () => mql.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

/** Measure the container width and keep it current (0 until measured / in jsdom). */
function useContainerWidth(ref: React.RefObject<MeasurableEl | null>): number {
  const [width, setWidth] = React.useState(0);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setWidth(Math.round(el.getBoundingClientRect().width));
    measure();
    const RO = (globalThis as { ResizeObserver?: ResizeObserverCtor }).ResizeObserver;
    if (typeof RO !== 'function') return undefined;
    const ro = new RO(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

// `data-*` attrs for components whose prop types don't declare them (spread, never an excess literal).
function dataAttr(name: `data-${string}`, value: string): Record<string, string> {
  return { [name]: value };
}

// ─── Labels ──────────────────────────────────────────────────────────────────────────────────────

export interface CarouselLabels {
  /** Default `'Previous page'`. */
  previous?: string;
  /** Default `'Next page'`. */
  next?: string;
  /** Default `(page, total) => \`Go to page ${page} of ${total}\``. */
  goToPage?: (page: number, total: number) => string;
  /** Live-region text. Default `(page, total) => \`Page ${page} of ${total}\``. */
  pageStatus?: (page: number, total: number) => string;
  /** Indicator group label. Default `'Pages'`. */
  pagination?: string;
  /** Slide label. Default `(index, total) => \`${index} of ${total}\``. */
  slide?: (index: number, total: number) => string;
}

const DEFAULT_LABELS: Required<CarouselLabels> = {
  previous: 'Previous page',
  next: 'Next page',
  goToPage: (page, total) => `Go to page ${page} of ${total}`,
  pageStatus: (page, total) => `Page ${page} of ${total}`,
  pagination: 'Pages',
  slide: (index, total) => `${index} of ${total}`,
};

// ─── Context ─────────────────────────────────────────────────────────────────────────────────────

interface CarouselContextValue {
  labels: Required<CarouselLabels>;
  perView: number;
  pages: number;
  page: number;
  /** Index of the first visible card on the current page. */
  start: number;
  total: number;
  paged: boolean;
  reducedMotion: boolean;
  value: string | null;
  select: (value: string) => void;
  goTo: (page: number) => void;
  setTotal: (n: number) => void;
  viewportRef: (node: HTMLElement | null) => void;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarouselContext(part: string): CarouselContextValue {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) {
    throw new Error(`AtomicAUI: <${part}> must be used inside <Carousel>.`);
  }
  return ctx;
}

// Per-slide index, seeded by Carousel.Content around each Item.
const CarouselSlideContext = React.createContext<number>(-1);

// ─── Root ────────────────────────────────────────────────────────────────────────────────────────

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'defaultValue' | 'onChange'> {
  /** Container min-width (px) → cards per view. Default `{ 0: 1, 600: 2, 1024: 3 }`. */
  breakpoints?: Readonly<Record<number, number>>;
  /** Controlled selected item value (`null` = none). */
  value?: string | null;
  /** Uncontrolled initial selected item value. */
  defaultValue?: string | null;
  /** Fires with the newly selected value (click / tap / Enter / Space — never a swipe). */
  onValueChange?: (value: string) => void;
  /** Override visible/announced strings (i18n). */
  labels?: CarouselLabels;
  /** Root appearance (the transparent region frame) incl. `sx`. */
  aui?: CarouselRootAui;
}

const _CarouselFrame = createAtomicComponent('div', { extensions: [useCarouselRootRecipe] });

const CarouselRoot = React.forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  {
    breakpoints = CAROUSEL_DEFAULT_BREAKPOINTS,
    value: valueProp,
    defaultValue = null,
    onValueChange,
    labels: labelsProp,
    aui,
    className,
    onKeyDown,
    children,
    ...rest
  },
  forwardedRef,
) {
  const labels = React.useMemo(() => ({ ...DEFAULT_LABELS, ...labelsProp }), [labelsProp]);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [forwardedRef],
  );

  // ── selection (controlled + uncontrolled) ──
  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState<string | null>(defaultValue);
  const value = isControlled ? valueProp : uncontrolled;
  const select = React.useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  // ── paging ──
  const [total, setTotal] = React.useState(0);
  const width = useContainerWidth(rootRef as React.RefObject<MeasurableEl | null>);
  const perView = resolvePerView(width, breakpoints);
  const pages = pageCount(total, perView);
  const paged = pages > 1;
  const [page, setPage] = React.useState(0);
  const pageRef = React.useRef(page);
  pageRef.current = page;
  const currentPage = Math.min(page, Math.max(0, pages - 1));
  const start = pageStart(currentPage, perView, total);
  const reducedMotion = usePrefersReducedMotion();

  // Embla: `slidesToScroll` = cards per view (one move = one page); `trimSnaps` aligns the uneven last
  // page to the end. Slide width is CSS, so a per-view change only re-inits the snap list.
  const emblaOptions = React.useMemo(
    () => ({
      axis: 'x' as const,
      align: 'start' as const,
      containScroll: 'trimSnaps' as const,
      slidesToScroll: perView,
      loop: false,
      dragFree: false,
      watchFocus: false,
    }),
    [perView],
  );
  const [viewportRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const emblaRef = React.useRef<EmblaCarouselType | undefined>(undefined);
  emblaRef.current = emblaApi;

  // Live-region text: empty on mount (no announcement on load), set on every page change.
  const [status, setStatus] = React.useState('');
  const announce = React.useCallback(
    (p: number) => setStatus(labels.pageStatus(p + 1, Math.max(1, pages))),
    [labels, pages],
  );

  // Keep the first visible card in view across a breakpoint change (US-2 "no blank or broken state").
  const prevPerView = React.useRef(perView);
  React.useEffect(() => {
    if (prevPerView.current === perView) return;
    const firstVisible = pageStart(page, prevPerView.current, total);
    prevPerView.current = perView;
    const next = pageOfIndex(firstVisible, perView, total);
    pageRef.current = next;
    setPage(next);
    emblaRef.current?.scrollTo(next, true);
  }, [perView, page, total]);

  // Embla re-inits when `slidesToScroll` changes and resets to snap 0: restore the chosen page.
  React.useEffect(() => {
    if (!emblaApi) return undefined;
    const restore = () => {
      if (emblaApi.selectedScrollSnap() !== pageRef.current) emblaApi.scrollTo(pageRef.current, true);
    };
    emblaApi.on('reInit', restore);
    return () => {
      emblaApi.off('reInit', restore);
    };
  }, [emblaApi]);

  const goTo = React.useCallback(
    (p: number) => {
      const clamped = Math.max(0, Math.min(p, pages - 1));
      // Snap index === page index (`slidesToScroll` = per view; the last snap is trimmed to the end).
      emblaRef.current?.scrollTo(clamped, reducedMotion);
      pageRef.current = clamped;
      setPage(clamped);
      announce(clamped);
    },
    [pages, reducedMotion, announce],
  );

  // Embla reports the snap after a drag (and echoes our own scrollTo). Announce only a REAL change; the
  // side effect stays OUT of the state updater (L23).
  React.useEffect(() => {
    if (!emblaApi) return undefined;
    const onSelect = () => {
      const p = emblaApi.selectedScrollSnap();
      if (pageRef.current === p) return;
      pageRef.current = p;
      setPage(p);
      announce(p);
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, announce]);

  // No click guard needed: Embla swallows the click that ends a drag itself (capture-phase
  // stopPropagation + preventDefault on the container), so a swipe never reaches the Item.

  // Left/Right page the rail while focus is inside it. If focus sat on a card that leaves the page,
  // move it to the first card of the new page (never strand focus on an inert slide).
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !paged) return;
    const dir = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    if (!dir) return;
    const target = currentPage + dir;
    if (target < 0 || target >= pages) return;
    event.preventDefault();
    const onCard = !!(event.target as unknown as { closest?(s: string): unknown }).closest?.(
      '.aui-carousel-item',
    );
    goTo(target);
    if (onCard) {
      const nextStart = pageStart(target, perView, total);
      const root = rootRef.current as unknown as QueryableEl | null;
      // Defer past the inert flip so the target card is focusable.
      globalThis.setTimeout(() => {
        root
          ?.querySelector(`[data-aui-carousel-slide-index="${nextStart}"] .aui-carousel-item`)
          ?.focus();
      }, 0);
    }
  };

  const ctx = React.useMemo<CarouselContextValue>(
    () => ({
      labels,
      perView,
      pages,
      page: currentPage,
      start,
      total,
      paged,
      reducedMotion,
      value,
      select,
      goTo,
      setTotal,
      viewportRef,
    }),
    [labels, perView, pages, currentPage, start, total, paged, reducedMotion, value, select, goTo, viewportRef],
  );

  return React.createElement(
    _CarouselFrame as React.ElementType,
    {
      ref: setRootRef,
      role: 'region',
      'aria-roledescription': 'carousel',
      ...rest,
      aui,
      className: mergeAuiClasses(['aui-carousel', typeof className === 'string' ? className : undefined]),
      onKeyDown: handleKeyDown,
      'data-aui-carousel-per-view': String(perView),
      'data-aui-carousel-pages': String(pages),
      'data-aui-carousel-page': String(currentPage),
      'data-aui-carousel-paged': paged ? '' : undefined,
    },
    React.createElement(CarouselContext.Provider, { value: ctx }, children),
    React.createElement(
      'div',
      { className: 'aui-carousel-status', 'aria-live': 'polite', 'aria-atomic': 'true' },
      status,
    ),
  );
});
CarouselRoot.displayName = 'Carousel';

// ─── Content — the Embla viewport + container ──────────────────────────────────────────────────────────────────

export interface CarouselContentProps {
  /** `Carousel.Item` elements; each is wrapped in a slide. */
  children?: React.ReactNode;
  className?: string;
}

function CarouselContent({ children, className }: CarouselContentProps) {
  const ctx = useCarouselContext('Carousel.Content');
  const slides = React.Children.toArray(children).filter(React.isValidElement);
  const count = slides.length;
  const { setTotal } = ctx;
  useIsoLayoutEffect(() => {
    setTotal(count);
  }, [count, setTotal]);

  const perViewStyle = { '--aui-carousel-per-view': String(ctx.perView) } as React.CSSProperties;
  return React.createElement(
    'div',
    { ref: ctx.viewportRef, className: mergeAuiClasses(['aui-carousel-viewport', className]) },
    React.createElement(
      'div',
      { className: 'aui-carousel-container', style: perViewStyle },
      slides.map((child, index) => {
        const visible = index >= ctx.start && index < ctx.start + ctx.perView;
        return React.createElement(
          'div',
          {
            key: child.key ?? index,
            className: 'aui-carousel-slide',
            role: 'group',
            'aria-roledescription': 'slide',
            'aria-label': ctx.labels.slide(index + 1, count),
            'aria-hidden': visible ? undefined : true,
            inert: visible ? undefined : true,
            ...dataAttr('data-aui-carousel-slide-index', String(index)),
          },
          React.createElement(CarouselSlideContext.Provider, { value: index }, child),
        );
      }),
    ),
  );
}
CarouselContent.displayName = 'Carousel.Content';

// ─── Item — the selectable slide ─────────────────────────────────────────────────────────────────
// The Item is the selection + a11y host (a Base UI Toggle → native `<button aria-pressed>`); the card
// is the library's own `Card` composed as its child. Card is stateless, so the Item hands the
// per-state appearance to its Card child through Card's own `aui` (resolveCarouselItemCardAui) —
// the selected look is painted by Card's recipe. Non-Card children render as-is.

export interface CarouselItemProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color' | 'value' | 'onClick'> {
  /** The item's selection value (required). */
  value: string;
  disabled?: boolean;
  /** Appearance applied to the composed Card, incl. `states.selected` / `states.unselected`
   *  (default selected = tonal primary + tinted fill, elevation 2). */
  aui?: CarouselItemAui;
  /** Fires on activation, before selection. Call `event.preventDefault()` to cancel the selection. */
  onClick?: (event: { preventDefault(): void; defaultPrevented: boolean }) => void;
  /** Usually one `<Card>`; it receives the per-state `aui` (and `disabled`). */
  children?: React.ReactNode;
}

const CarouselItem = React.forwardRef<HTMLButtonElement, CarouselItemProps>(function CarouselItem(
  { value, disabled, aui, onClick, className, children, ...rest },
  ref,
) {
  const ctx = useCarouselContext('Carousel.Item');
  const selected = ctx.value === value;
  const content = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || child.type !== Card) return child;
    const card = child as React.ReactElement<{ aui?: Appearance; disabled?: boolean }>;
    return React.cloneElement(card, {
      aui: resolveCarouselItemCardAui(card.props.aui, aui, selected),
      disabled: card.props.disabled ?? disabled,
    });
  });
  return React.createElement(
    TogglePrimitive as React.ElementType,
    {
      ref,
      ...rest,
      pressed: selected,
      disabled,
      'data-selected': selected ? '' : undefined,
      ...dataAttr('data-aui-carousel-item-value', value),
      // Selection is DS-owned: the Toggle's own pressed flip is ignored (single-select never
      // un-selects on a second click).
      onPressedChange: () => undefined,
      onClick: (event: { preventDefault(): void; defaultPrevented: boolean }) => {
        if (disabled) return;
        onClick?.(event);
        if (event.defaultPrevented) return;
        ctx.select(value);
      },
      className: mergeAuiClasses(['aui-carousel-item', typeof className === 'string' ? className : undefined]),
    },
    content,
  );
});
CarouselItem.displayName = 'Carousel.Item';

// ─── Prev / Next triggers ────────────────────────────────────────────────────────────────────────

export interface CarouselTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color' | 'children'> {
  /** Replaces the default arrow icon. */
  children?: React.ReactNode;
  /** Trigger appearance. Default: text paint on the surface role, `md`, pill. */
  aui?: IconButtonAui;
}

function makeTrigger(direction: 'prev' | 'next') {
  const part = direction === 'prev' ? 'Carousel.PrevTrigger' : 'Carousel.NextTrigger';
  const Trigger = React.forwardRef<HTMLButtonElement, CarouselTriggerProps>(function CarouselTrigger(
    { children, aui, className, onClick, ...rest },
    ref,
  ) {
    const ctx = useCarouselContext(part);
    if (!ctx.paged) return null;
    const atEnd = direction === 'prev' ? ctx.page === 0 : ctx.page >= ctx.pages - 1;
    const label = direction === 'prev' ? ctx.labels.previous : ctx.labels.next;
    const common = {
      ref,
      'aria-label': label,
      ...rest,
      className: mergeAuiClasses(['aui-carousel-arrow', `aui-carousel-arrow-${direction}`, className]),
      ...dataAttr('data-aui-carousel-arrow', direction),
      aui: { ...TRIGGER_AUI, ...aui },
      disabled: atEnd,
      focusableWhenDisabled: true,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        ctx.goTo(ctx.page + (direction === 'prev' ? -1 : 1));
      },
    };
    return children == null
      ? React.createElement(IconButton, {
          ...common,
          name: direction === 'prev' ? 'arrow-left' : 'arrow-right',
        } as React.ComponentProps<typeof IconButton>)
      : React.createElement(Button as React.ElementType, common, children);
  });
  Trigger.displayName = part;
  return Trigger;
}

const CarouselPrevTrigger = makeTrigger('prev');
const CarouselNextTrigger = makeTrigger('next');

// ─── Indicators ──────────────────────────────────────────────────────────────────────────────────

const _IndicatorGroupFrame = createAtomicComponent('div', { extensions: [useCarouselIndicatorGroupRecipe] });

export interface CarouselIndicatorGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** One `<Carousel.Indicator />` WITHOUT `index` = a template cloned per page; explicit
   *  `index` children render as given. Omitted → one default indicator per page. */
  children?: React.ReactNode;
  /** Row appearance (a transparent frame) incl. `sx` (e.g. `gap`). */
  aui?: CarouselIndicatorGroupAui;
}

const CarouselIndicatorGroup = React.forwardRef<HTMLDivElement, CarouselIndicatorGroupProps>(
  function CarouselIndicatorGroup({ children, className, aui, ...rest }, ref) {
    const ctx = useCarouselContext('Carousel.IndicatorGroup');
    if (!ctx.paged) return null;
    const list = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<
      CarouselIndicatorProps
    >[];
    const template = list.length === 1 && list[0].props.index === undefined ? list[0] : null;
    let content: React.ReactNode;
    if (template) {
      content = Array.from({ length: ctx.pages }, (_, i) => React.cloneElement(template, { key: i, index: i }));
    } else if (list.length === 0) {
      content = Array.from({ length: ctx.pages }, (_, i) => React.createElement(CarouselIndicator, { key: i, index: i }));
    } else {
      content = children;
    }
    return React.createElement(
      _IndicatorGroupFrame as React.ElementType,
      {
        ref,
        role: 'group',
        'aria-label': ctx.labels.pagination,
        ...rest,
        aui,
        className: mergeAuiClasses(['aui-carousel-pagination', typeof className === 'string' ? className : undefined]),
      },
      content,
    );
  },
);
CarouselIndicatorGroup.displayName = 'Carousel.IndicatorGroup';

export interface CarouselIndicatorProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> {
  /** Zero-based page index. Set automatically when used as the IndicatorGroup template. */
  index?: number;
  /** Dot appearance incl. `states.inactive` / `states.active` (default muted circle / primary pill). */
  aui?: CarouselIndicatorAui;
}

const CarouselIndicator = React.forwardRef<HTMLButtonElement, CarouselIndicatorProps>(function CarouselIndicator(
  { index = 0, className, onClick, aui, ...rest },
  ref,
) {
  const ctx = useCarouselContext('Carousel.Indicator');
  if (index >= ctx.pages) return null;
  const active = index === ctx.page;
  return React.createElement('button', {
    ref,
    type: 'button',
    'aria-label': ctx.labels.goToPage(index + 1, ctx.pages),
    ...rest,
    className: mergeAuiClasses([
      buildCarouselIndicatorClasses(aui, active),
      'aui-focus-color-info',
      'aui-focus-width-2',
      typeof className === 'string' ? className : undefined,
    ]),
    'aria-current': active ? 'true' : undefined,
    'data-active': active ? '' : undefined,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      ctx.goTo(index);
    },
  });
});
CarouselIndicator.displayName = 'Carousel.Indicator';

// ─── Namespace ───────────────────────────────────────────────────────────────────────────────────

interface CarouselComponent
  extends React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<HTMLDivElement>> {
  Content: typeof CarouselContent;
  Item: typeof CarouselItem;
  PrevTrigger: typeof CarouselPrevTrigger;
  NextTrigger: typeof CarouselNextTrigger;
  IndicatorGroup: typeof CarouselIndicatorGroup;
  Indicator: typeof CarouselIndicator;
}

export const Carousel = Object.assign(CarouselRoot, {
  Content: CarouselContent,
  Item: CarouselItem,
  PrevTrigger: CarouselPrevTrigger,
  NextTrigger: CarouselNextTrigger,
  IndicatorGroup: CarouselIndicatorGroup,
  Indicator: CarouselIndicator,
}) as CarouselComponent;

export default Carousel;
