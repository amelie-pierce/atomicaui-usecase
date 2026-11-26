// Pagination range model. Pure functions; no React.

export const PAGINATION_START_ELLIPSIS = 'start-ellipsis' as const;
export const PAGINATION_END_ELLIPSIS = 'end-ellipsis' as const;

export type PaginationEllipsisKey =
  | typeof PAGINATION_START_ELLIPSIS
  | typeof PAGINATION_END_ELLIPSIS;

/** A rendered page number, or the ellipsis that stands in for a collapsed run. */
export type PaginationRangeItem = number | PaginationEllipsisKey;

export interface PaginationRangeOptions {
  /** Current page, 1-based. Clamped into range before it is used. */
  page: number;
  totalPages: number;
  /** Pages shown either side of the current one. Default 1. */
  siblingCount?: number;
  /** Pages always shown at each end. Default 1. */
  boundaryCount?: number;
}

function toCount(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value as number)) : fallback;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);
}

/** Normalize a page total; a pagination always has at least one page. */
export function normalizePaginationTotal(totalPages: number | undefined): number {
  return Number.isFinite(totalPages) ? Math.max(1, Math.floor(totalPages as number)) : 1;
}

/** Clamp a 1-based page into `1…totalPages`. */
export function clampPaginationPage(page: number | undefined, totalPages: number): number {
  const total = normalizePaginationTotal(totalPages);
  const value = Number.isFinite(page) ? Math.floor(page as number) : 1;
  return Math.min(Math.max(value, 1), total);
}

/**
 * Visible window: ends, siblings, ellipses.
 */
export function paginationRange({
  page,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
}: PaginationRangeOptions): PaginationRangeItem[] {
  const total = normalizePaginationTotal(totalPages);
  const current = clampPaginationPage(page, total);
  const boundary = Math.min(toCount(boundaryCount, 1), total);
  const sibling = toCount(siblingCount, 1);

  // Only allocate the full set when it is what gets rendered.
  if (total <= boundary * 2 + sibling * 2 + 3) return range(1, total);

  const startPages = range(1, Math.min(boundary, total));
  const endPages = range(Math.max(total - boundary + 1, boundary + 1), total);
  const siblingsStart = Math.max(
    Math.min(current - sibling, total - boundary - sibling * 2 - 1),
    boundary + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(current + sibling, boundary + sibling * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : total - 1,
  );

  const items: PaginationRangeItem[] = [...startPages];

  if (siblingsStart > boundary + 2) {
    items.push(PAGINATION_START_ELLIPSIS);
  } else if (boundary + 1 < total - boundary) {
    items.push(boundary + 1);
  }

  items.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < total - boundary - 1) {
    items.push(PAGINATION_END_ELLIPSIS);
  } else if (total - boundary > boundary) {
    items.push(total - boundary);
  }

  items.push(...endPages);
  return items;
}
