// Pagination: numbered pages, steps, noninteractive ellipsis.
// Composes the shipped Button, IconButton and tokens.
import * as React from 'react';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { Button } from '../button';
import { IconButton, type IconButtonAui } from '../icon-button';
import {
  clampPaginationPage,
  normalizePaginationTotal,
  paginationRange,
  PAGINATION_END_ELLIPSIS,
  PAGINATION_START_ELLIPSIS,
  type PaginationRangeItem,
} from './pagination-model';
import {
  PAGINATION_LINK_DEFAULT_SCALE,
  resolvePaginationLinkAui,
  resolvePaginationStepAui,
  usePaginationRecipe,
  type PaginationAui,
  type PaginationLinkAui,
  type PaginationScale,
} from './use-recipe';

export {
  clampPaginationPage,
  normalizePaginationTotal,
  paginationRange,
  PAGINATION_END_ELLIPSIS,
  PAGINATION_START_ELLIPSIS,
} from './pagination-model';
export type {
  PaginationEllipsisKey,
  PaginationRangeItem,
  PaginationRangeOptions,
} from './pagination-model';
export {
  PAGINATION_LINK_DEFAULT_SCALE,
  PAGINATION_LINK_SX_AXES,
  PAGINATION_LINK_STATE_KEYS,
  PAGINATION_LINK_STATES,
  PAGINATION_ROOT_DEFAULT_SCALE,
  PAGINATION_ROOT_SX_AXES,
  PAGINATION_ROOT_VOCAB,
  resolvePaginationLinkAui,
  resolvePaginationStepAui,
  usePaginationRecipe,
} from './use-recipe';
export type {
  PaginationAui,
  PaginationColor,
  PaginationElevation,
  PaginationLinkAui,
  PaginationLinkStateAppearance,
  PaginationLinkStateKey,
  PaginationPaint,
  PaginationProfile,
  PaginationScale,
  PaginationShape,
} from './use-recipe';

export interface PaginationLabels {
  /** Landmark name for the `nav`. */
  nav: string;
  /** Previous-page step name. */
  previous: string;
  /** Next-page step name. */
  next: string;
  /** Accessible page-link name. */
  page: (page: number) => string;
  /** Screen-reader text inside the ellipsis. */
  more: string;
}

export const PAGINATION_DEFAULT_LABELS: PaginationLabels = {
  nav: 'Pagination',
  previous: 'Previous page',
  next: 'Next page',
  page: (page: number) => `Page ${page}`,
  more: 'More pages',
};

function useControllable<T>(
  value: T | undefined,
  defaultValue: T,
  onChange: ((next: T) => void) | undefined,
): [T, (next: T) => void] {
  const [inner, setInner] = React.useState<T>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? (value as T) : inner;
  const set = React.useCallback(
    (next: T) => {
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );
  return [current, set];
}

export type PaginationListAui = PartStyleProps['aui'];
export type PaginationItemAui = PartStyleProps['aui'];

interface PaginationContextValue {
  current: number;
  totalPages: number;
  scale: PaginationScale;
  labels: PaginationLabels;
  disabled: boolean;
  linkAui?: PaginationLinkAui;
  getPageHref?: (page: number) => string;
  select: (page: number) => void;
}

const PaginationContext = React.createContext<PaginationContextValue>({
  current: 1,
  totalPages: 1,
  scale: PAGINATION_LINK_DEFAULT_SCALE,
  labels: PAGINATION_DEFAULT_LABELS,
  disabled: false,
  select: () => undefined,
});

function usePaginationContext(): PaginationContextValue {
  return React.useContext(PaginationContext);
}

const _PaginationRoot = createAtomicComponent('nav', { extensions: [usePaginationRecipe] });

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color' | 'onChange'> {
  /** Root frame appearance; its `scale` also sizes the page controls. */
  aui?: PaginationAui;
  /** Controlled page, 1-based. */
  page?: number;
  /** Uncontrolled initial page, 1-based. Default 1. */
  defaultPage?: number;
  /** Called with the new page when the user picks one. */
  onPageChange?: (page: number) => void;
  /** Total page count. Ignored when composed `children` are supplied. */
  totalPages?: number;
  /** Pages shown either side of the current page. Default 1. */
  siblingCount?: number;
  /** Pages always shown at each end. Default 1. */
  boundaryCount?: number;
  /** Render the previous / next steps. Default true. */
  showPreviousNext?: boolean;
  /** Disable every control. */
  disabled?: boolean;
  /** Override the English screen-reader strings. */
  labels?: Partial<PaginationLabels>;
  /** Appearance shared by every page link and step. */
  linkAui?: PaginationLinkAui;
  /** Appearance for the generated `Pagination.List` in data-driven mode. */
  listAui?: PaginationListAui;
  /** Appearance for every generated `Pagination.Item`. */
  itemAui?: PaginationItemAui;
  /** Turn page controls into links, e.g. a router URL builder. */
  getPageHref?: (page: number) => string;
  /** Compose a `Pagination.List`; composed children render as-is. */
  children?: React.ReactNode;
}

const PaginationRoot = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    aui,
    page,
    defaultPage = 1,
    onPageChange,
    totalPages,
    siblingCount = 1,
    boundaryCount = 1,
    showPreviousNext = true,
    disabled = false,
    labels,
    linkAui,
    listAui,
    itemAui,
    getPageHref,
    children,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const resolvedLabels = React.useMemo<PaginationLabels>(
    () => ({ ...PAGINATION_DEFAULT_LABELS, ...labels }),
    [labels],
  );
  const total = normalizePaginationTotal(totalPages);
  const [rawPage, setPage] = useControllable<number>(page, defaultPage, onPageChange);
  const current = clampPaginationPage(rawPage, total);
  const scale = aui?.scale ?? PAGINATION_LINK_DEFAULT_SCALE;

  const select = React.useCallback(
    (next: number) => {
      const target = clampPaginationPage(next, total);
      if (disabled || target === current) return;
      setPage(target);
    },
    [current, disabled, setPage, total],
  );

  const context = React.useMemo<PaginationContextValue>(
    () => ({
      current,
      totalPages: total,
      scale,
      labels: resolvedLabels,
      disabled,
      linkAui,
      getPageHref,
      select,
    }),
    [current, disabled, getPageHref, linkAui, resolvedLabels, scale, select, total],
  );

  const items = paginationRange({ page: current, totalPages: total, siblingCount, boundaryCount });

  const generatedItems = (
    <>
      {showPreviousNext ? (
        <PaginationItem aui={itemAui}>
          <PaginationPrevious />
        </PaginationItem>
      ) : null}
      {items.map((item) => (
        <PaginationItem key={itemKey(item)} aui={itemAui}>
          {typeof item === 'number' ? (
            <PaginationLink page={item} active={item === current} />
          ) : (
            <PaginationEllipsis />
          )}
        </PaginationItem>
      ))}
      {showPreviousNext ? (
        <PaginationItem aui={itemAui}>
          <PaginationNext />
        </PaginationItem>
      ) : null}
    </>
  );

  // Composed children own the anatomy; generated mode wraps itself.
  const content =
    children === undefined || children === null
      ? <PaginationList aui={listAui}>{generatedItems}</PaginationList>
      : children;

  return (
    <PaginationContext.Provider value={context}>
      {React.createElement(
        _PaginationRoot as React.ElementType,
        { ref, ...rest, aui, 'aria-label': ariaLabel ?? resolvedLabels.nav },
        content,
      )}
    </PaginationContext.Provider>
  );
});
PaginationRoot.displayName = 'Pagination';

function itemKey(item: PaginationRangeItem): string {
  if (item === PAGINATION_START_ELLIPSIS) return 'start-ellipsis';
  if (item === PAGINATION_END_ELLIPSIS) return 'end-ellipsis';
  return `page-${item}`;
}

export type PaginationListProps = React.ComponentPropsWithoutRef<'ul'> & PartStyleProps;

const _PaginationList = createAtomicPart<PaginationListProps>('ul', 'aui-pagination-list', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
});

export const PaginationList = React.forwardRef<HTMLUListElement, PaginationListProps>(
  function PaginationList(props, ref) {
    return React.createElement(_PaginationList as React.ElementType, { ref, ...props });
  },
);
PaginationList.displayName = 'Pagination.List';

export type PaginationItemProps = React.ComponentPropsWithoutRef<'li'> & PartStyleProps;

const _PaginationItem = createAtomicPart<PaginationItemProps>('li', 'aui-pagination-item', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
});

export const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  function PaginationItem(props, ref) {
    return React.createElement(_PaginationItem as React.ElementType, { ref, ...props });
  },
);
PaginationItem.displayName = 'Pagination.Item';

type ButtonRootProps = React.ComponentPropsWithoutRef<typeof Button>;

type PaginationRender = ButtonRootProps['render'];

// Disabled anchors still navigate; remove their href.
function stripHref(node: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(node)) return node;
  const props = node.props as { href?: unknown };
  if (props.href === undefined) return node;
  return React.cloneElement(node as React.ReactElement<{ href?: unknown }>, { href: undefined });
}

// Apply the href strip only to disabled custom renders.
function disabledRender(render: PaginationRender, disabled: boolean): PaginationRender {
  if (!disabled || render === undefined) return render;
  if (typeof render === 'function') {
    return ((props, state) =>
      stripHref(render(props, state)) as React.ReactElement) as PaginationRender;
  }
  return stripHref(render) as React.ReactElement;
}

export interface PaginationLinkProps
  extends Omit<ButtonRootProps, 'aui' | 'children'> {
  /** The 1-based page this control selects. */
  page: number;
  /** Marks the current page (`aria-current="page"`) and the selected appearance. */
  active?: boolean;
  /** Render the control as a link. */
  href?: string;
  /** Page-link appearance, including `states.unselected` / `states.selected`. */
  aui?: PaginationLinkAui;
  children?: React.ReactNode;
}

export const PaginationLink = React.forwardRef<HTMLElement, PaginationLinkProps>(
  function PaginationLink(
    {
      page,
      active = false,
      href,
      aui,
      className,
      children,
      disabled,
      render,
      onClick,
      ...rest
    },
    ref,
  ) {
    const context = usePaginationContext();
    // Root disable always wins; a part cannot re-enable itself.
    const isDisabled = context.disabled || Boolean(disabled);
    const state = active ? 'selected' : 'unselected';
    const resolvedAui = resolvePaginationLinkAui(state, context.linkAui, aui, context.scale);
    const hrefValue = isDisabled ? undefined : href ?? context.getPageHref?.(page);
    const renderLink = disabledRender(
      render ?? (hrefValue ? <a href={hrefValue} /> : undefined),
      isDisabled,
    );

    const handleClick: NonNullable<ButtonRootProps['onClick']> = (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      context.select(page);
    };

    return (
      <Button
        ref={ref}
        {...rest}
        aui={resolvedAui}
        role={renderLink ? 'link' : undefined}
        aria-current={active ? 'page' : undefined}
        aria-label={rest['aria-label'] ?? context.labels.page(page)}
        disabled={isDisabled && !hrefValue ? true : undefined}
        nativeButton={renderLink ? false : undefined}
        render={renderLink}
        onClick={handleClick}
        className={prependMarkerClassName('aui-pagination-link', className)}
      >
        {children ?? page}
      </Button>
    );
  },
);
PaginationLink.displayName = 'Pagination.Link';

type IconButtonRootProps = React.ComponentPropsWithoutRef<typeof IconButton>;

export interface PaginationStepProps
  extends Omit<IconButtonRootProps, 'name' | 'aui' | 'aria-label' | 'aria-labelledby' | 'children'> {
  /** Step-button appearance; defaults to the idle page-link look. */
  aui?: IconButtonAui;
  /** Accessible step name. */
  label?: string;
  /** Render the step as a link. */
  href?: string;
}

type StepDirection = 'previous' | 'next';

interface PaginationStepInternalProps extends PaginationStepProps {
  direction: StepDirection;
}

const PaginationStep = React.forwardRef<HTMLButtonElement, PaginationStepInternalProps>(
  function PaginationStep(
    { direction, aui, label, href, className, disabled, render, onClick, ...rest },
    ref,
  ) {
    const context = usePaginationContext();
    const previous = direction === 'previous';
    const target = previous ? context.current - 1 : context.current + 1;
    const atBoundary = previous ? context.current <= 1 : context.current >= context.totalPages;
    // A step cannot re-enable a disabled root or step past its bound.
    const isDisabled = context.disabled || atBoundary || Boolean(disabled);
    const resolvedAui = resolvePaginationStepAui(context.linkAui, aui, context.scale);
    const hrefValue = isDisabled ? undefined : href ?? context.getPageHref?.(target);
    const renderLink = disabledRender(
      render ?? (hrefValue ? <a href={hrefValue} /> : undefined),
      isDisabled,
    );

    const handleClick: NonNullable<IconButtonRootProps['onClick']> = (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      context.select(target);
    };

    return (
      <IconButton
        ref={ref}
        {...rest}
        name={previous ? 'arrow-left' : 'arrow-right'}
        aria-label={label ?? (previous ? context.labels.previous : context.labels.next)}
        disabled={isDisabled && !hrefValue ? true : undefined}
        role={renderLink ? 'link' : undefined}
        aui={resolvedAui}
        render={renderLink}
        onClick={handleClick}
        className={prependMarkerClassName('aui-pagination-step', className)}
      />
    );
  },
);

export const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationStepProps>(
  function PaginationPrevious(props, ref) {
    return <PaginationStep ref={ref} direction="previous" {...props} />;
  },
);
PaginationPrevious.displayName = 'Pagination.Previous';

export const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationStepProps>(
  function PaginationNext(props, ref) {
    return <PaginationStep ref={ref} direction="next" {...props} />;
  },
);
PaginationNext.displayName = 'Pagination.Next';

export interface PaginationEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Screen-reader text for the collapsed run. */
  label?: string;
}

export const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  function PaginationEllipsis({ className, label, ...rest }, ref) {
    const context = usePaginationContext();
    return (
      <span
        ref={ref}
        {...rest}
        className={prependMarkerClassName('aui-pagination-ellipsis', className) as string}
      >
        <span aria-hidden="true">…</span>
        <span className="aui-pagination-label">{label ?? context.labels.more}</span>
      </span>
    );
  },
);
PaginationEllipsis.displayName = 'Pagination.Ellipsis';

export const Pagination = Object.assign(PaginationRoot, {
  List: PaginationList,
  Item: PaginationItem,
  Link: PaginationLink,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis,
});
