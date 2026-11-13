// modules/design/atomic-aui/src/lib/datepicker/date-grid.ts
//
// The ZERO-DEP calendar engine — pure date math + Intl-driven localization. No Base UI (it ships no
// calendar), no date library (the workspace declares none; the evidence pack sanctioned Intl-only),
// no DOM. Everything here is a pure function over `Date` (comparisons key off local year/month/day —
// the calendar is a LOCAL wall-clock grid, never UTC), so it is fully unit-testable and SSR-safe.
//
// Localization comes from the platform `Intl`:
//   • weekday + month names        → Intl.DateTimeFormat
//   • the locale's first day-of-week → Intl.Locale#getWeekInfo() / #weekInfo (guarded: not every
//     engine exposes it → fall back to Sunday, overridable via the `firstDayOfWeek` prop)
//
// The grid is a FIXED 6×7 (42-cell) month view — the row count never changes as you page months, so
// the popup never reflows. Leading/trailing cells come from the adjacent months (flagged `outside`).

/** A day of week as a JS index: 0 = Sunday … 6 = Saturday (matches `Date#getDay`). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** One cell of the month grid. `date` is midnight-local of that day. */
export interface DayCell {
  date: Date;
  /** True when the cell belongs to the previous/next month (a leading/trailing filler). */
  outside: boolean;
}

// ─── Primitive date math (pure; no mutation of inputs) ───────────────────────────
/** Midnight-local of `d` (strips the time-of-day so comparisons are day-granular). */
export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** First day (midnight-local) of `d`'s month. */
export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/** `d` shifted by `n` days (n may be negative). */
export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

/** `d` shifted by `n` months, clamping the day into the target month (Jan 31 + 1mo → Feb 28/29). */
export function addMonths(d: Date, n: number): Date {
  const year = d.getFullYear();
  const month = d.getMonth() + n;
  const targetFirst = new Date(year, month, 1);
  const daysInTarget = new Date(targetFirst.getFullYear(), targetFirst.getMonth() + 1, 0).getDate();
  return new Date(targetFirst.getFullYear(), targetFirst.getMonth(), Math.min(d.getDate(), daysInTarget));
}

/** `d` shifted by `n` years, clamping the day (Feb 29 + 1yr → Feb 28). */
export function addYears(d: Date, n: number): Date {
  return addMonths(d, n * 12);
}

/** Same calendar day (ignores time-of-day). `null`s never match. */
export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Same calendar month (and year). */
export function isSameMonth(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** `a` strictly before `b` at DAY granularity. */
export function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

/** `a` strictly after `b` at DAY granularity. */
export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

/** Clamp `d` into the inclusive `[min, max]` range (day granularity). Either bound may be omitted. */
export function clampDate(d: Date, min?: Date | null, max?: Date | null): Date {
  if (min && isBeforeDay(d, min)) return startOfDay(min);
  if (max && isAfterDay(d, max)) return startOfDay(max);
  return d;
}

/** The disabled predicate: outside `[min, max]` OR flagged by the consumer's `isDateDisabled`. */
export function isDayDisabled(
  d: Date,
  opts: { min?: Date | null; max?: Date | null; isDateDisabled?: (d: Date) => boolean } = {},
): boolean {
  if (opts.min && isBeforeDay(d, opts.min)) return true;
  if (opts.max && isAfterDay(d, opts.max)) return true;
  return opts.isDateDisabled ? !!opts.isDateDisabled(d) : false;
}

// ─── Intl-driven localization (guarded) ──────────────────────────────────────────
/**
 * The locale's first day of week as a JS index (0 = Sun … 6 = Sat). Reads
 * `Intl.Locale#getWeekInfo()` (or the legacy `#weekInfo` accessor) whose `firstDay` is ISO
 * (1 = Monday … 7 = Sunday); we normalise ISO→JS via `iso % 7` (7→0, 1→1, … 6→6). Engines without
 * week-info support fall back to Sunday (0). A caller `firstDayOfWeek` prop overrides this entirely.
 */
export function getLocaleFirstDayOfWeek(locale?: string): Weekday {
  try {
    // Cast through `unknown` — `Intl.Locale` in this DOM-light lib config doesn't declare the
    // week-info accessors (they're a newer TC39 addition), so we probe them structurally.
    const L = new Intl.Locale(locale ?? getDefaultLocale()) as unknown as {
      getWeekInfo?: () => { firstDay?: number };
      weekInfo?: { firstDay?: number };
    };
    // getWeekInfo() is the standardised form; some engines still expose the `weekInfo` getter.
    const info =
      (typeof L.getWeekInfo === 'function' ? L.getWeekInfo() : L.weekInfo) ?? undefined;
    const iso = info?.firstDay;
    if (typeof iso === 'number' && iso >= 1 && iso <= 7) return (iso % 7) as Weekday;
  } catch {
    // Intl.Locale unsupported or a malformed tag — fall through to the Sunday default.
  }
  return 0;
}

/** The runtime's default BCP-47 locale (SSR-safe: falls back to `'en-US'`). */
export function getDefaultLocale(): string {
  try {
    return new Intl.DateTimeFormat().resolvedOptions().locale || 'en-US';
  } catch {
    return 'en-US';
  }
}

/**
 * The seven weekday header labels, ORDERED from `firstDayOfWeek`. `format` maps to
 * Intl `weekday` (`'narrow'` = "M", `'short'` = "Mon", `'long'` = "Monday").
 */
export function getWeekdayNames(
  firstDayOfWeek: Weekday,
  locale?: string,
  format: 'narrow' | 'short' | 'long' = 'narrow',
): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: format });
  // 2021-08-01 is a Sunday — a stable anchor to walk the seven weekdays from.
  const sundayAnchor = new Date(2021, 7, 1);
  const names: string[] = [];
  for (let i = 0; i < 7; i += 1) {
    names.push(fmt.format(addDays(sundayAnchor, (firstDayOfWeek + i) % 7)));
  }
  return names;
}

/** The month-caption label (e.g. "July 2026"). */
export function getMonthCaption(viewMonth: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewMonth);
}

/** The accessible/visible formatted value for a selected date. `dateStyle` maps to Intl `dateStyle`. */
export function formatDate(
  d: Date,
  locale?: string,
  dateStyle: 'full' | 'long' | 'medium' | 'short' = 'medium',
): string {
  return new Intl.DateTimeFormat(locale, { dateStyle }).format(d);
}

// ─── The typeable-input engine (parse/format for the INPUT-mode Datepicker) ────────
// The INPUT mode lets the user TYPE a date (industry standard — MUI/Ant). All three helpers derive
// the locale's field order + separator from `Intl.DateTimeFormat#formatToParts` (never hardcoded), so
// en-US reads month-first (mm/dd/yyyy) while en-GB reads day-first (dd/mm/yyyy) with zero locale tables.

/** The kinds of a date field (the three numeric parts we order per locale). */
export type DateInputPart = 'day' | 'month' | 'year';

/** The locale's typeable-date shape: the numeric field ORDER, the SEPARATOR literal, and the
 *  lower-case PLACEHOLDER pattern (`dd`/`mm`/`yyyy`) — all derived via `formatToParts`. */
export interface DateInputPattern {
  order: DateInputPart[];
  separator: string;
  placeholder: string;
}

const PART_PLACEHOLDER: Record<DateInputPart, string> = { day: 'dd', month: 'mm', year: 'yyyy' };

/**
 * Derive the locale's typeable-date pattern. `Intl.DateTimeFormat(locale, {day:'2-digit',
 * month:'2-digit', year:'numeric'}).formatToParts(...)` yields the localized part sequence + the
 * literal separator; we read the numeric parts in order and the first literal as the separator.
 * Falls back to `mm/dd/yyyy` if the engine yields an unexpected shape.
 */
export function getDateInputPattern(locale?: string): DateInputPattern {
  try {
    const parts = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).formatToParts(new Date(2026, 0, 2));
    const order: DateInputPart[] = [];
    let separator = '';
    for (const part of parts) {
      if (part.type === 'day' || part.type === 'month' || part.type === 'year') {
        order.push(part.type);
      } else if (part.type === 'literal' && separator === '' && part.value.trim() !== '') {
        separator = part.value;
      }
    }
    if (order.length === 3) {
      const sep = separator || '/';
      return { order, separator: sep, placeholder: order.map((p) => PART_PLACEHOLDER[p]).join(sep) };
    }
  } catch {
    // fall through to the default pattern
  }
  return { order: ['month', 'day', 'year'], separator: '/', placeholder: 'mm/dd/yyyy' };
}

/**
 * Format a date as the CANONICAL typeable text for the locale (zero-padded 2-digit day/month, numeric
 * year) — the same `Intl` shape `getDateInputPattern` reads, so it round-trips with `parseDateInput`.
 * This governs the INPUT mode's text; `formatValue`/`dateStyle` still govern the TRIGGER mode.
 */
export function formatDateInput(d: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/** The real number of days in a (1-based) month of a year — for explicit calendar validation. */
function daysInMonth(year: number, month1: number): number {
  return new Date(year, month1, 0).getDate();
}

/**
 * Parse typed text into a Date, or `null` when it is empty / incomplete / not a real calendar date.
 * LENIENT: trims, honors an ISO `yyyy-mm-dd` fast path, splits on non-digit runs, and maps the three
 * numeric groups per the locale's order; 1-2 digit day/month and a 2-digit year (→ `2000+yy`) are
 * accepted. It VALIDATES an actual calendar date (month 1-12, day ≤ real days-in-month) — it never
 * relies on JS `Date` rollover (`Feb 30` returns `null`, never `Mar 2`).
 */
export function parseDateInput(text: string, locale?: string): Date | null {
  const trimmed = text.trim();
  if (trimmed === '') return null;

  let year: number;
  let month1: number; // 1-based
  let day: number;

  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed);
  if (iso) {
    year = Number(iso[1]);
    month1 = Number(iso[2]);
    day = Number(iso[3]);
  } else {
    const groups = trimmed.split(/\D+/).filter((g) => g !== '');
    if (groups.length !== 3) return null;
    const { order } = getDateInputPattern(locale);
    const nums = groups.map(Number);
    const pick = (part: DateInputPart): number => nums[order.indexOf(part)];
    year = pick('year');
    month1 = pick('month');
    day = pick('day');
    if (year < 100) year += 2000;
  }

  if (!Number.isFinite(year) || !Number.isFinite(month1) || !Number.isFinite(day)) return null;
  if (month1 < 1 || month1 > 12) return null;
  if (day < 1 || day > daysInMonth(year, month1)) return null;
  return new Date(year, month1 - 1, day);
}

// ─── The 6×7 month grid ──────────────────────────────────────────────────────────
/**
 * Build the fixed 42-cell (6 rows × 7 days) grid for `viewMonth`, ordered from `firstDayOfWeek`.
 * Leading cells come from the previous month, trailing from the next — both flagged `outside`.
 */
export function buildMonthGrid(viewMonth: Date, firstDayOfWeek: Weekday): DayCell[][] {
  const first = startOfMonth(viewMonth);
  // How many leading cells before the 1st: the distance from `firstDayOfWeek` to the 1st's weekday.
  const leading = (first.getDay() - firstDayOfWeek + 7) % 7;
  const gridStart = addDays(first, -leading);
  const weeks: DayCell[][] = [];
  for (let w = 0; w < 6; w += 1) {
    const week: DayCell[] = [];
    for (let day = 0; day < 7; day += 1) {
      const date = addDays(gridStart, w * 7 + day);
      week.push({ date, outside: !isSameMonth(date, viewMonth) });
    }
    weeks.push(week);
  }
  return weeks;
}

/** Today at midnight-local. Isolated so callers/tests can reason about "today" explicitly. */
export function today(): Date {
  return startOfDay(new Date());
}
