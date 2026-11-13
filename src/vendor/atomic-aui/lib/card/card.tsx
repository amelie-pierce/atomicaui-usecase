// modules/design/atomic-aui/src/lib/card/card.tsx
import * as React from 'react';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import {
  ContainedImage,
  type ContainedImageProps,
  type ContainedImageRatio,
} from '../contained-image';
import { ContainedIcon } from '../icon';
import { Type, type TypeProps } from '../type';
import {
  resolveCardAui,
  useCardRecipe,
  useCardBodyRecipe,
  useCardImageContainerRecipe,
  CARD_DEFAULT_SCALE,
  type CardAui,
  type CardBodyAui,
  type CardImageContainerAui,
  type CardColor,
  type CardPaint,
  type CardScale,
  type CardShape,
} from './use-recipe';

export {
  CARD_BODY_SX_AXES,
  CARD_BODY_VOCAB,
  CARD_IMAGE_CONTAINER_SX_AXES,
  CARD_IMAGE_CONTAINER_VOCAB,
  CARD_DEFAULT_COLOR,
  CARD_DEFAULT_ELEVATION,
  CARD_DEFAULT_PAINT,
  CARD_DEFAULT_PROFILE,
  CARD_DEFAULT_SCALE,
  CARD_DEFAULT_SHAPE,
  CARD_SX_AXES,
  CARD_VOCAB,
  resolveCardAui,
  useCardBodyRecipe,
  useCardImageContainerRecipe,
  useCardRecipe,
} from './use-recipe';
export type {
  CardAui,
  CardBodyAui,
  CardImageContainerAui,
  CardColor,
  CardElevation,
  CardPaint,
  CardProfile,
  CardScale,
  CardShape,
  CardSx,
} from './use-recipe';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Card appearance axes. Children compose explicit parts, so Card does not grow `image`/`label`
   *  props or state vocabulary. */
  aui?: CardAui;
  /** When `true`, the tile becomes a clickable surface: the state layer's hover/press tint + focus
   *  ring go LIVE and the root gains the `<button>` a11y contract (default `role="button"`,
   *  `tabIndex`, Enter/Space activation, `aria-disabled`/`data-disabled`, disabled-blocks-click).
   *  When `false` (DEFAULT) the Card is an INERT display-only tile — no hover/press affordance, no
   *  tab stop, and any consumer-supplied `role`/`tabIndex`/handlers pass through verbatim. Mirrors the
   *  shipped `View interactive` / `List.Item interactive` contract; Card is stateless so it has no
   *  `selected`/`indeterminate`/`aria-pressed`. */
  interactive?: boolean;
  /** Disabled — the STANDARD orthogonal chroma flip (component-engineer §4). It flips the card's
   *  chroma to the active paint's disabled cell (`aui-color-<paint>-disabled`, context-independent and
   *  derived by the recipe) and stamps `data-disabled` — this happens WHENEVER `disabled`, interactive
   *  or not. ADDITIONALLY, when `interactive`, it drops the interactivity affordances: `aria-disabled`,
   *  out of the tab order (`tabIndex=-1`), the not-allowed cursor, and a blocked click in both phases.
   *  A `<div>` has no native `disabled` attribute, so the flip rides the recipe + `aria-disabled`
   *  (never a native attr) — the same convention as `View`/`List.Item`. */
  disabled?: boolean;
}

const _CardRoot = createAtomicComponent('div', {
  extensions: [useCardRecipe],
});

// Card.Body reads the card's resolved scale from context so its default-profile padding TRACKS the
// card scale (the List.ItemContext pattern); a consumer `aui.scale` on the Body still wins.
interface CardContextValue {
  scale: CardScale;
}
const CardContext = React.createContext<CardContextValue>({ scale: CARD_DEFAULT_SCALE });

const _CardBody = createAtomicComponent('div', {
  extensions: [useCardBodyRecipe],
});

const _CardImageContainer = createAtomicComponent('div', {
  extensions: [useCardImageContainerRecipe],
});

function shapeClass(shape: CardShape): `aui-shape-${CardShape}` {
  return `aui-shape-${shape}`;
}

function colorClass(color: CardColor, paint: CardPaint): `aui-color-${CardPaint}-${CardColor}` {
  return `aui-color-${paint}-${color}`;
}

// Card.ImageContainer — the media WRAPPER layer (directive #12). A cascade-reader frame (Card.Body
// pattern) defaulting to the no-padding profile so it is FULL-BLEED out of the box; the natural
// clip/shape owner. Set `aui={{ profile: 'default' }}` to inset the image, `aui.paint`/`shape`/
// `elevation`/`sx` to style the wrapper. `scale` tracks the card via context. Card.Image works
// STANDALONE too (full-bleed) — the container is the OPTIONAL wrapper for insetting/styling.
export type CardImageContainerProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> & {
  aui?: CardImageContainerAui;
};

const CardImageContainer = React.forwardRef<HTMLDivElement, CardImageContainerProps>(
  function CardImageContainer({ aui, ...rest }, ref) {
    const ctx = React.useContext(CardContext);
    const resolvedAui = React.useMemo<CardImageContainerAui>(
      () => ({ ...aui, scale: aui?.scale ?? ctx.scale }),
      [aui, ctx.scale],
    );
    return React.createElement(_CardImageContainer as React.ElementType, { ref, ...rest, aui: resolvedAui });
  },
);
CardImageContainer.displayName = 'Card.ImageContainer';

const CARD_IMAGE_ASPECT_RATIO: Record<ContainedImageRatio, string> = {
  '1:1': '1 / 1',
  '4:3': '4 / 3',
  '16:9': '16 / 9',
};

export interface CardImageProps extends Omit<ContainedImageProps, 'src' | 'alt'> {
  /** Image URL. OPTIONAL (#9): when omitted — or when the image FAILS to load — Card.Image renders a
   *  PLACEHOLDER (a muted surface + an image glyph) instead of nothing / a broken img. */
  src?: string;
  /** Alt text for the real image (unused by the decorative placeholder). */
  alt?: string;
  /** Custom placeholder content, shown when there is no `src` (or the image errors). Default: an image
   *  glyph on a muted surface (the Avatar-fallback spirit — generated-class art, no hardcoded data-URI). */
  placeholder?: React.ReactNode;
  /** The image wrapper's `shape` — default `none` (0 radius; a rounded card clips the square image via
   *  the root's `overflow: hidden`). Consumer-overridable, e.g. `aui={{ shape: 'soft' }}`. */
  aui?: { shape?: CardShape };
}

const CardImage = React.forwardRef<HTMLSpanElement, CardImageProps>(function CardImage(
  {
    src,
    alt = '',
    ratio = '1:1',
    fit = 'cover',
    placeholder,
    aui,
    className,
    style,
    imageClassName,
    imageStyle,
    imageProps,
    ...rest
  },
  ref,
) {
  const ctx = React.useContext(CardContext);
  const [errored, setErrored] = React.useState(false);
  // Reset the load-error when the src changes so a new URL gets a fresh attempt.
  React.useEffect(() => setErrored(false), [src]);
  // 240-Shape default is `none` (square); the rounded root clips the corners. Consumer-overridable.
  const shape = aui?.shape ?? 'none';
  const showPlaceholder = !src || errored;

  if (!showPlaceholder) {
    return (
      <ContainedImage
        ref={ref}
        {...rest}
        src={src as string}
        alt={alt}
        ratio={ratio}
        fit={fit}
        className={mergeAuiClasses(['aui-card-image', shapeClass(shape), className])}
        style={style}
        imageClassName={imageClassName}
        imageStyle={imageStyle}
        imageProps={{ onError: () => setErrored(true), ...imageProps }}
      />
    );
  }

  const aspectRatio = CARD_IMAGE_ASPECT_RATIO[ratio];
  return (
    <span
      ref={ref}
      {...rest}
      className={mergeAuiClasses([
        'aui-contained-image',
        'aui-card-image',
        'aui-card-image-placeholder',
        shapeClass(shape),
        className,
      ])}
      data-aui-contained-image-ratio={ratio}
      data-aui-card-image-placeholder=""
      style={{ ...style, '--aui-contained-image-ratio': aspectRatio, aspectRatio } as React.CSSProperties}
    >
      {placeholder ?? (
        <ContainedIcon
          name="image"
          layer="monotone"
          aui={{ scale: ctx.scale }}
          aria-hidden
          className="aui-card-image-glyph"
        />
      )}
    </span>
  );
});
CardImage.displayName = 'Card.Image';

// Card.Content — the main body slot. A STYLEABLE frame part (Phase B upgrade, directive #7 audit A3):
// it carries the full frame-part `aui`/`aui.sx` surface so consumers can override its spacing/appearance,
// like every industry Body part (MUI CardContent, Chakra Card.Body, shadcn CardContent).
export type CardContentProps = React.ComponentPropsWithoutRef<'div'> & PartStyleProps;

const _CardContent = createAtomicPart<CardContentProps>('div', 'aui-card-content', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
  defaultProfile: 'default',
});

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  props,
  ref,
) {
  return React.createElement(_CardContent as React.ElementType, { ref, ...props });
});
CardContent.displayName = 'Card.Content';

// Card.Body — the PADDED section (directive #8). The card root is a no-padding wrapper (so Card.Image
// bleeds full-width); Card.Body supplies the padding + gap for the text region and holds Header/Content/
// Footer. A cascade-reader default-profile frame (Accordion.Panel pattern): transparent (no forced
// paint — #5), real profile padding from its scale cell, scale defaulting to the card's (via context).
export type CardBodyProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> & { aui?: CardBodyAui };

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { aui, ...rest },
  ref,
) {
  const ctx = React.useContext(CardContext);
  const resolvedAui = React.useMemo<CardBodyAui>(
    () => ({ ...aui, scale: aui?.scale ?? ctx.scale }),
    [aui, ctx.scale],
  );
  return React.createElement(_CardBody as React.ElementType, { ref, ...rest, aui: resolvedAui });
});
CardBody.displayName = 'Card.Body';

// Card.Header — the title/description/action container (MUI CardHeader, Chakra/shadcn/Fluent Header).
// A styleable frame layout part; its marker owns the grid that stacks Title/Description and floats an
// optional Card.Action to the top-right.
export type CardHeaderProps = React.ComponentPropsWithoutRef<'div'> & PartStyleProps;

const _CardHeader = createAtomicPart<CardHeaderProps>('div', 'aui-card-header', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
  defaultProfile: 'default',
});

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(props, ref) {
  return React.createElement(_CardHeader as React.ElementType, { ref, ...props });
});
CardHeader.displayName = 'Card.Header';

// Card.Title — the primary heading text. A thin `Type` wrapper with a pinned typescale role (mirrors
// List.ItemText); the consumer can override `role`/`as`/`color`. Type carries its own `aui.sx`.
export type CardTitleProps = TypeProps;

const CardTitle = React.forwardRef<HTMLElement, CardTitleProps>(function CardTitle(
  { role, className, ...rest },
  ref,
) {
  return (
    <Type
      ref={ref}
      role={role ?? 'l3'}
      {...rest}
      className={prependMarkerClassName('aui-card-title', className) as string | undefined}
    />
  );
});
CardTitle.displayName = 'Card.Title';

// Card.Description — the supporting text under the title. A thin `Type` wrapper with a muted-secondary
// typescale role; the marker CSS gives it a muted default foreground that a consumer `color` overrides.
export type CardDescriptionProps = TypeProps;

const CardDescription = React.forwardRef<HTMLElement, CardDescriptionProps>(function CardDescription(
  { role, className, ...rest },
  ref,
) {
  return (
    <Type
      ref={ref}
      role={role ?? 'p2'}
      {...rest}
      className={prependMarkerClassName('aui-card-description', className) as string | undefined}
    />
  );
});
CardDescription.displayName = 'Card.Description';

// Card.Action — the header's trailing top-right affordance slot (shadcn CardAction, Ant `extra`, MUI/
// Fluent header action). A styleable frame layout part; its marker positions it in the header grid's
// second column. Compose a Button/IconButton/Badge/Chip inside.
export type CardActionProps = React.ComponentPropsWithoutRef<'div'> & PartStyleProps;

const _CardAction = createAtomicPart<CardActionProps>('div', 'aui-card-action', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
  defaultProfile: 'default',
});

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(function CardAction(props, ref) {
  return React.createElement(_CardAction as React.ElementType, { ref, ...props });
});
CardAction.displayName = 'Card.Action';

// Card.Footer — the bottom slot for actions/secondary content (Chakra/shadcn/Fluent Footer, MUI
// CardActions). A styleable frame layout part; its marker is a gap'd flex row. Compose Buttons here for
// the action-row pattern (a separate Actions part is N/A — the Footer IS the actions area).
export type CardFooterProps = React.ComponentPropsWithoutRef<'div'> & PartStyleProps;

const _CardFooter = createAtomicPart<CardFooterProps>('div', 'aui-card-footer', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
  defaultProfile: 'default',
});

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(props, ref) {
  return React.createElement(_CardFooter as React.ElementType, { ref, ...props });
});
CardFooter.displayName = 'Card.Footer';

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    aui,
    interactive = false,
    disabled,
    children,
    className,
    role,
    tabIndex,
    onKeyDown,
    onClick,
    onClickCapture,
    ...rest
  },
  ref,
) {
  const resolved = resolveCardAui(aui);
  // Card follows the AtomicAUI PAINT CONTRACT for its painted result — borders included (user directive
  // 2026-07-12, superseding the Figma "border-width mode 1" pin). We do NOT force a stroke: the paint
  // cell decides (tonal/fixed emit the scale-aware `aui-frame--inset` border; solid/text are
  // borderless), exactly like every other frame (Button/View/Select.Trigger — none hardcode a width).
  // A consumer who wants a stroke uses the standard `aui.sx` border axes.
  const rootClassName = className;

  // Interaction a11y. The Card root is a `<div>`, so (like `View`/`List.Item`) it gets NONE of the
  // `<button>` contract natively; we synthesise it ONLY when interactive. Card is stateless, so there
  // is no selected/indeterminate/aria-pressed — just the action-button shell. `disabled` is handled in
  // TWO orthogonal places: the CHROMA FLIP rides the recipe (`disabled` threaded to `_CardRoot` below →
  // `aui-color-<paint>-disabled`) and applies WHENEVER disabled; the a11y affordance-drop
  // (aria-disabled / tab-order / blocked click) applies only when interactive. `data-disabled` reflects
  // the state UNCONDITIONALLY (mirrors `List.Item`). Component-owned attrs are spread AFTER `...rest`
  // (below) so they stay authoritative. Non-interactive: consumer role/tabIndex/handlers pass through.
  const interactionProps: React.HTMLAttributes<HTMLDivElement> & {
    'aria-disabled'?: boolean;
    'data-disabled'?: string;
    'data-aui-card-interactive'?: string;
  } = {};
  if (disabled) interactionProps['data-disabled'] = '';
  if (interactive) {
    interactionProps['data-aui-card-interactive'] = '';
    interactionProps.role = role ?? 'button';
    interactionProps.tabIndex = tabIndex ?? (disabled ? -1 : 0);
    if (disabled) {
      interactionProps['aria-disabled'] = true;
    }
    interactionProps.onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        (event.currentTarget as unknown as { click(): void }).click();
      }
    };
    interactionProps.onClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };
    interactionProps.onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClickCapture?.(event);
    };
  } else {
    if (role !== undefined) interactionProps.role = role;
    if (tabIndex !== undefined) interactionProps.tabIndex = tabIndex;
    if (onKeyDown !== undefined) interactionProps.onKeyDown = onKeyDown;
    if (onClick !== undefined) interactionProps.onClick = onClick;
    if (onClickCapture !== undefined) interactionProps.onClickCapture = onClickCapture;
  }
  const frameClassName = 'aui-card-frame';
  const surfaceClassName = mergeAuiClasses([
    'aui-card-surface',
    'aui-frame',
    shapeClass(resolved.shape),
  ]);
  const stateLayerClassName = mergeAuiClasses([
    'aui-card-state-layer',
    'aui-stateful',
    colorClass(resolved.color, resolved.paint),
    shapeClass(resolved.shape),
    'aui-focus-color-info',
    'aui-focus-width-2',
  ]);
  const onClickClassName = mergeAuiClasses([
    'aui-card-on-click',
    shapeClass(resolved.shape),
  ]);

  return (
    <_CardRoot
      ref={ref}
      {...rest}
      {...interactionProps}
      aui={aui}
      disabled={disabled}
      className={rootClassName}
      data-aui-card-color={resolved.color}
      data-aui-card-paint={resolved.paint}
      data-aui-card-shape={resolved.shape}
      data-aui-card-elevation={String(resolved.elevation)}
      data-aui-card-profile={resolved.profile}
      data-aui-card-scale={resolved.scale}
    >
      <div className={frameClassName} aria-hidden="true">
        <div className={surfaceClassName} aria-hidden="true" />
      </div>
      <CardContext.Provider value={{ scale: resolved.scale }}>{children}</CardContext.Provider>
      <div className={stateLayerClassName} aria-hidden="true" />
      <div className={onClickClassName} aria-hidden="true" tabIndex={-1} />
    </_CardRoot>
  );
});
CardRoot.displayName = 'Card';

interface CardComponent extends React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
> {
  ImageContainer: typeof CardImageContainer;
  Image: typeof CardImage;
  Body: typeof CardBody;
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Action: typeof CardAction;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
}

export const Card = Object.assign(CardRoot, {
  ImageContainer: CardImageContainer,
  Image: CardImage,
  Body: CardBody,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter,
}) as CardComponent;
export default Card;
