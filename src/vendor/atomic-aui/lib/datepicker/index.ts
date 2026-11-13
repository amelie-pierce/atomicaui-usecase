// modules/design/atomic-aui/src/lib/datepicker/index.ts
export { Datepicker, default } from './datepicker';
export type {
  DatepickerRootProps,
  DatepickerTriggerProps,
  DatepickerInputProps,
  DatepickerInputButtonProps,
  DatepickerValueProps,
  DatepickerIconProps,
  DatepickerPortalProps,
  DatepickerBackdropProps,
  DatepickerPositionerProps,
  DatepickerPopupProps,
  DatepickerCalendarProps,
  DatepickerHeaderProps,
  DatepickerGridProps,
  DatepickerWeekProps,
  DatepickerDayProps,
} from './datepicker';
export type {
  DatepickerColor,
  DatepickerPaint,
  DatepickerScale,
  DatepickerShape,
  DatepickerTriggerAui,
  DatepickerPopupAui,
  DatepickerDayAui,
  DatepickerInputAui,
} from './use-recipe';
export {
  // The zero-dep Intl calendar engine (pure — exported for consumers/tests that need the math).
  buildMonthGrid,
  formatDate,
  getMonthCaption,
  getWeekdayNames,
  getLocaleFirstDayOfWeek,
  isSameDay,
  isSameMonth,
  isDayDisabled,
  addDays,
  addMonths,
  addYears,
  clampDate,
  startOfDay,
  startOfMonth,
} from './date-grid';
export type { Weekday, DayCell } from './date-grid';
