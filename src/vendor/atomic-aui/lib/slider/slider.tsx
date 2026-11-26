import * as React from 'react';
import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { useSliderRecipe, SLIDER_DEFAULT_COLOR } from './use-recipe';
import type { SliderAui } from './use-recipe';
import type { AuiRecipeColor } from '../../core/vocabulary/recipe-vocab';

export {
  SLIDER_VOCAB,
  SLIDER_SX_AXES,
  SLIDER_DEFAULT_SCALE,
  SLIDER_DEFAULT_COLOR,
  useSliderRecipe,
} from './use-recipe';
export type {
  SliderAui,
  SliderColor,
  SliderPaint,
  SliderScale,
  SliderProfile,
  SliderShape,
  SliderElevation,
} from './use-recipe';

export interface SliderRootContextValue {
  min: number;
  max: number;
  step: number;
  largeStep: number;
  orientation: 'horizontal' | 'vertical';
  /** Resolved root accent. */
  accent: AuiRecipeColor;
}

const SliderRootContext = React.createContext<SliderRootContextValue | null>(null);

function useSliderRootContext(): SliderRootContextValue {
  const ctx = React.useContext(SliderRootContext);
  if (!ctx) {
    throw new Error(
      '[atomic-aui] Slider parts must be rendered inside <Slider>. ' +
        'A Slider.Ticks outside the root cannot resolve its min/max/step range.',
    );
  }
  return ctx;
}

function mergePartAui(
  defaults: NonNullable<PartStyleProps['aui']>,
  aui: PartStyleProps['aui'] | undefined,
): NonNullable<PartStyleProps['aui']> {
  const merged: Record<string, unknown> = { ...defaults };
  for (const [key, value] of Object.entries(aui ?? {})) {
    if (value !== undefined) merged[key] = value;
  }
  return merged as NonNullable<PartStyleProps['aui']>;
}

export type SliderLabelProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Label>;
const SliderLabel = createAtomicPart<SliderLabelProps>(SliderPrimitive.Label, 'aui-slider-label');
SliderLabel.displayName = 'Slider.Label';

export type SliderValueProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Value>;
const SliderValue = createAtomicPart<SliderValueProps>(SliderPrimitive.Value, 'aui-slider-value');
SliderValue.displayName = 'Slider.Value';

export type SliderControlProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Control>;
const SliderControl = createAtomicPart<SliderControlProps>(
  SliderPrimitive.Control,
  'aui-slider-control',
);
SliderControl.displayName = 'Slider.Control';

const TRACK_DEFAULT_AUI: NonNullable<PartStyleProps['aui']> = {
  color: 'overlay',
  paint: 'solid',
};

const _SliderTrack = createAtomicPart<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track> & PartStyleProps
>(SliderPrimitive.Track, 'aui-slider-track', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
});

export type SliderTrackProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track> &
  PartStyleProps;

const SliderTrack = React.forwardRef<HTMLElement, SliderTrackProps>(function SliderTrack(
  { aui, ...rest },
  ref,
) {
  const resolvedAui = React.useMemo(() => mergePartAui(TRACK_DEFAULT_AUI, aui), [aui]);
  return React.createElement(_SliderTrack, { ref, ...rest, aui: resolvedAui });
});
SliderTrack.displayName = 'Slider.Track';

const _SliderIndicator = createAtomicPart<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Indicator> & PartStyleProps
>(SliderPrimitive.Indicator, 'aui-slider-indicator', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
});

export type SliderIndicatorProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Indicator
> &
  PartStyleProps;

const SliderIndicator = React.forwardRef<HTMLElement, SliderIndicatorProps>(
  function SliderIndicator({ aui, ...rest }, ref) {
    const ctx = React.useContext(SliderRootContext);
    const accent = ctx?.accent ?? SLIDER_DEFAULT_COLOR;
    const resolvedAui = React.useMemo(
      () => mergePartAui({ color: accent, paint: 'solid' }, aui),
      [accent, aui],
    );
    return React.createElement(_SliderIndicator, { ref, ...rest, aui: resolvedAui });
  },
);
SliderIndicator.displayName = 'Slider.Indicator';

const THUMB_DEFAULT_AUI: NonNullable<PartStyleProps['aui']> = {
  color: 'surface',
  paint: 'solid',
  elevation: 1,
};

const _SliderThumb = createAtomicPart<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> & PartStyleProps
>(SliderPrimitive.Thumb, 'aui-slider-thumb', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
});

export type SliderThumbProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> &
  PartStyleProps;

const SliderThumb = React.forwardRef<HTMLElement, SliderThumbProps>(function SliderThumb(
  { aui, ...rest },
  ref,
) {
  const resolvedAui = React.useMemo(() => mergePartAui(THUMB_DEFAULT_AUI, aui), [aui]);
  return React.createElement(_SliderThumb, { ref, ...rest, aui: resolvedAui });
});
SliderThumb.displayName = 'Slider.Thumb';

export interface SliderTicksProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Explicit tick values. */
  values?: readonly number[];
  /** Evenly spaced tick count. */
  count?: number;
  /** Optional label per tick. */
  renderLabel?: (value: number) => React.ReactNode;
}

const MAX_GENERATED_TICKS = 200;

function decimalPlaces(value: number): number {
  const [digits, exponent = '0'] = value.toString().split('e');
  return (digits.split('.')[1]?.length ?? 0) - Number(exponent);
}

function derivedTickValues(
  min: number,
  max: number,
  step: number,
  largeStep: number,
): number[] {
  const span = max - min;
  if (!(span > 0)) return [min];

  const stepN = Number.isFinite(step) && step > 0 ? step : 1;
  const largeN = Number.isFinite(largeStep) && largeStep > 0 ? largeStep : stepN;
  // Keep larger ticks on the step grid.
  const ratio = largeN / stepN;
  const largeTick = Math.max(1, Math.floor(ratio + Number.EPSILON * ratio)) * stepN;
  const delta = largeTick <= span ? largeTick : stepN;
  const stride = Math.max(1, Math.ceil(span / delta / (MAX_GENERATED_TICKS - 1)));
  const increment = delta * stride;
  if (!Number.isFinite(increment)) return [min, max];

  const count = Math.min(MAX_GENERATED_TICKS - 1, Math.ceil(span / increment));
  const precision = Math.max(0, decimalPlaces(min), decimalPlaces(stepN));
  const values = Array.from({ length: count }, (_, index) => {
    const tick = min + index * increment;
    return precision <= 100 ? Number(tick.toFixed(precision)) : tick;
  });
  return [...new Set([...values, max])];
}

function SliderTicks({
  values,
  count,
  renderLabel,
  className,
  'aria-hidden': ariaHidden,
  ...rest
}: SliderTicksProps) {
  const { min, max, step, largeStep } = useSliderRootContext();

  const tickValues = React.useMemo(() => {
    if (values) return values;
    if (count !== undefined && Number.isFinite(count) && count > 0) {
      const length = Math.min(MAX_GENERATED_TICKS, Math.max(1, Math.floor(count)));
      if (length === 1) return [min];
      const span = max - min;
      return Array.from({ length }, (_, index) =>
        index === length - 1 ? max : min + span * (index / (length - 1)),
      );
    }
    return derivedTickValues(min, max, step, largeStep);
  }, [values, count, min, max, step, largeStep]);

  const span = max - min;
  return (
    <div
      {...rest}
      aria-hidden={ariaHidden ?? true}
      className={mergeAuiClasses([
        'aui-slider-ticks',
        renderLabel ? 'aui-slider-ticks--labels' : undefined,
        className,
      ])}
    >
      {tickValues.map((value, index) => {
        const percent = span > 0 ? Math.min(100, Math.max(0, ((value - min) / span) * 100)) : 0;
        return (
          <span
            key={`${value}-${index}`}
            className="aui-slider-tick"
            data-value={value}
            style={{ '--aui-slider-tick-offset': `${percent}%` } as React.CSSProperties}
          >
            <span className="aui-slider-tick-mark" />
            {renderLabel ? (
              <span className="aui-slider-tick-label">{renderLabel(value)}</span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
SliderTicks.displayName = 'Slider.Ticks';

type SliderInputValue = number | readonly number[];

export interface SliderProps<Value extends SliderInputValue = SliderInputValue>
  extends SliderPrimitive.Root.Props<Value> {
  /** Full frame surface. */
  aui?: SliderAui;
}

const _SliderRoot = createAtomicComponent(SliderPrimitive.Root, {
  extensions: [useSliderRecipe],
});

const SliderRoot = React.forwardRef<HTMLDivElement, SliderProps>(function Slider(
  { aui, children, ...rest },
  ref,
) {
  const min = rest.min ?? 0;
  const max = rest.max ?? 100;
  const step = rest.step ?? 1;
  const largeStep = rest.largeStep ?? 10;
  const orientation = rest.orientation ?? 'horizontal';
  const accent = aui?.color ?? SLIDER_DEFAULT_COLOR;

  const context = React.useMemo<SliderRootContextValue>(
    () => ({ min, max, step, largeStep, orientation, accent }),
    [min, max, step, largeStep, orientation, accent],
  );

  const hasChildren = React.Children.toArray(children).length > 0;
  const label = (rest as Record<string, unknown>)['aria-label'];
  const labelledBy = (rest as Record<string, unknown>)['aria-labelledby'];

  const content = hasChildren ? (
    children
  ) : (
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        <SliderThumb
          aria-label={typeof label === 'string' ? label : undefined}
          aria-labelledby={typeof labelledBy === 'string' ? labelledBy : undefined}
        />
      </SliderTrack>
    </SliderControl>
  );

  return (
    <SliderRootContext.Provider value={context}>
      {React.createElement(_SliderRoot as React.ElementType, { ref, ...rest, aui }, content)}
    </SliderRootContext.Provider>
  );
});
SliderRoot.displayName = 'Slider';

interface SliderComponent {
  <Value extends SliderInputValue = number>(
    props: SliderProps<Value> & React.RefAttributes<HTMLDivElement>,
  ): React.ReactNode;
  displayName?: string;
  Label: typeof SliderLabel;
  Value: typeof SliderValue;
  Control: typeof SliderControl;
  Track: typeof SliderTrack;
  Indicator: typeof SliderIndicator;
  Thumb: typeof SliderThumb;
  Ticks: typeof SliderTicks;
}

export const Slider = Object.assign(SliderRoot, {
  Label: SliderLabel,
  Value: SliderValue,
  Control: SliderControl,
  Track: SliderTrack,
  Indicator: SliderIndicator,
  Thumb: SliderThumb,
  Ticks: SliderTicks,
}) as SliderComponent;
export default Slider;
