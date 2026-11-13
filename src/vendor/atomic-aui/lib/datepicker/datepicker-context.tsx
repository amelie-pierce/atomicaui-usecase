// modules/design/atomic-aui/src/lib/datepicker/datepicker-context.tsx
//
// The Datepicker VALUE context. Base UI's Popover owns open/close + the floating machinery, but it
// has NO date concept — so Datepicker.Root owns the value model and hands it to the Trigger (display)
// and the Calendar (grid + selection) through this context. React context crosses the Popover portal
// (the same way FieldAuiContext crosses the Select portal), so the portaled Calendar reads it.
import * as React from 'react';
import type { Weekday } from './date-grid';

/** The value + config the Trigger/Calendar/Day parts read. */
export interface DatepickerContextValue {
  /** The selected date (controlled by Root), or `null` when nothing is chosen. */
  value: Date | null;
  /** Select a day: updates the value, notifies `onValueChange`, and closes the popover. */
  selectDate: (date: Date) => void;
  /** Consume-once reopen guard for the INPUT mode: when the popover closes for ANY reason (day-pick,
   *  Escape, outside-press), Base UI returns focus to the input — its `onFocus` must NOT reopen the popup
   *  (else the field can never be closed while focused). The Root arms it on every close; this returns
   *  `true` for the single focus event that is that close's focus-return, then clears. A genuine later
   *  focus finds it clear and opens. */
  consumeSuppressReopen: () => boolean;
  /** Set the value (normalized to midnight-local; `null` clears it) WITHOUT closing the popover —
   *  the live-input path (typing a valid date updates the value + calendar view but stays open). */
  commitValue: (date: Date | null) => void;
  /** The popover open state + its setter (exposed for the INPUT mode: focusing the input opens it,
   *  the trailing button toggles it). Mirrors what Base UI's Popover.Trigger drives for the Trigger. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Register the INPUT-mode frame node as the popover anchor (an <input> can't be a Popover.Trigger,
   *  so the frame anchors the floating calendar). `null` unregisters. MUST be a stable identity — the
   *  Input keys its callback-ref + unmount cleanup on it, so a churning identity re-registers every
   *  render and nulls the anchor mid-life (the un-anchored-popup bug). */
  registerInputAnchor: (node: Element | null) => void;
  /** The registered input-frame anchor ELEMENT (read by Datepicker.Positioner as `anchor` when no
   *  explicit `anchor`). Held in STATE (not just a ref) so Base UI's positioner re-resolves the
   *  Floating UI reference when the element identity changes — a ref alone only re-reads on open. */
  inputAnchorEl: Element | null;
  /** The same node as a ref, for the outside-press `contains()` check in the Root's onOpenChange. */
  inputAnchorRef: React.RefObject<Element | null>;
  /** When the popup is opened FROM the input, the calendar must NOT steal focus (focus stays in the
   *  input); this stays `false` until the user presses ArrowDown to move into the grid. Default `true`
   *  (Trigger mode: the calendar auto-focuses the roving day on mount, unchanged). */
  gridAutoFocus: boolean;
  setGridAutoFocus: (value: boolean) => void;
  /** Inclusive lower/upper bounds — days outside are disabled. */
  min?: Date | null;
  max?: Date | null;
  /** Per-day disable predicate (subsumes disabled-lists). */
  isDateDisabled?: (date: Date) => boolean;
  /** BCP-47 locale for month/weekday names + formatting (default: the runtime locale). */
  locale?: string;
  /** The resolved first day of week (0 = Sun … 6 = Sat). */
  firstDayOfWeek: Weekday;
  /** `Intl` weekday-header width. */
  weekdayFormat: 'narrow' | 'short' | 'long';
  /** `Intl.DateTimeFormat` dateStyle for the trigger's formatted value. */
  dateStyle: 'full' | 'long' | 'medium' | 'short';
  /** Escape hatch: fully custom formatting of the trigger value. */
  formatValue?: (date: Date, locale?: string) => string;
  /** Whole-control disabled (from Root). */
  disabled?: boolean;
  /** The label the calendar grid points its `aria-label`/caption at (id or text). */
  captionId: string;
}

const DatepickerContext = React.createContext<DatepickerContextValue | null>(null);

export const DatepickerProvider = DatepickerContext.Provider;

/** Read the Datepicker context. Throws a clear error when a part is rendered outside `<Datepicker>`. */
export function useDatepickerContext(): DatepickerContextValue {
  const ctx = React.useContext(DatepickerContext);
  if (!ctx) {
    throw new Error(
      '[atomic-aui] a Datepicker part was rendered outside <Datepicker>. Wrap Trigger/Popup/Calendar ' +
        'in a <Datepicker> root.',
    );
  }
  return ctx;
}

/** Optional read (no throw) — for parts that MAY render standalone. */
export function useDatepickerContextOptional(): DatepickerContextValue | null {
  return React.useContext(DatepickerContext);
}

/**
 * A minimal controlled/uncontrolled state hook (the local analogue of Base UI's internal
 * `useControlled`). When `controlled` is provided the state is external (the setter only forwards to
 * `onChange`); otherwise it holds internal state seeded by `defaultValue`. Kept lib-local + tiny so
 * Datepicker.Root doesn't reach into Base UI internals for a two-line utility.
 */
export function useControllableState<T>(params: {
  controlled: T | undefined;
  default: T;
  onChange?: (value: T) => void;
}): [T, (next: T) => void] {
  const { controlled, default: defaultValue, onChange } = params;
  const isControlled = controlled !== undefined;
  const [internal, setInternal] = React.useState<T>(defaultValue);
  const value = isControlled ? (controlled as T) : internal;
  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );
  return [value, setValue];
}
