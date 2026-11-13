import * as React from 'react';
import { Button } from '../button';
import type {
  ButtonAui,
  ButtonColor,
  ButtonElevation,
  ButtonPaint,
  ButtonProfile,
  ButtonScale,
  ButtonShape,
} from '../button';
import type { IconFamily, IconLayer, IconWeight } from '../icon';

export type IconButtonColor = ButtonColor;
export type IconButtonPaint = ButtonPaint;
export type IconButtonScale = ButtonScale;
export type IconButtonProfile = ButtonProfile;
export type IconButtonShape = ButtonShape;
export type IconButtonElevation = ButtonElevation;

// IconButton appearance = Button's, verbatim — the SAME FULL 32-axis `aui.sx` surface (the
// no-missing-knobs STANDARD: every box exposes all 32, `min*` INCLUDED). Its SHAPE follows its PROFILE
// via the system-wide square-intent rule (NO IconButton-specific code): a square-intent profile
// (`square` default, `square-compact`/`checkable`/`spinner`/`contained`) carries a class the global
// `.aui-scale-<square>-<tier>` rule squares; a text-button profile (`profile="default"`/`compact`)
// carries no square class → the box sizes to CONTENT like a normal Button (a rectangle). To force a
// rectangle on a square profile, set BOTH `aui.sx.width`+`height` (a single axis stays square — the
// global rule pairs them).
export type IconButtonAui = ButtonAui;

export const ICON_BUTTON_DEFAULTS = {
  color: 'surface-alt',
  paint: 'solid',
  scale: 'sm',
  profile: 'square',
  shape: 'soft',
  elevation: 0,
} as const satisfies IconButtonAui;

type ButtonRootProps = React.ComponentPropsWithoutRef<typeof Button>;

type IconButtonBaseProps = Omit<
  ButtonRootProps,
  'aria-label' | 'aria-labelledby' | 'aui' | 'children' | 'nativeButton'
> & {
  aui?: IconButtonAui;
  name: string;
  family?: IconFamily;
  layer?: IconLayer;
  weight?: IconWeight;
  children?: never;
  /**
   * Base UI `render` escape hatch — forwarded straight to the inner `<Button>`, which replaces its
   * host element while MERGING the button behavior + the decorative glyph onto the target (e.g.
   * `render={<a href="…" />}` for an icon-only link-button). The `AccessibleName` contract STILL
   * applies: an icon-only control rendered as any element still needs `aria-label`/`aria-labelledby`,
   * and a `render` target that sets its own `aria-hidden`/`role` must not strip that name.
   */
  render?: ButtonRootProps['render'];
};

type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string }
  | { 'aria-label'?: string; 'aria-labelledby': string };

export type IconButtonProps = IconButtonBaseProps & AccessibleName;

const IconButtonRoot = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ aui, name, family, layer, weight, className, render, ...rest }, ref) {
    // When `render` swaps the host to a NON-`<button>` element (the common icon-only link case,
    // `render={<a/>}`), tell the inner Button so via `nativeButton={false}` — else Base UI dev-warns
    // about lost native button semantics. We can only inspect an ELEMENT render (the common form); a
    // function render is left to Base UI's default (the consumer composes a button there). IconButton
    // does not expose `nativeButton` itself — it derives it from `render`.
    const nativeButton =
      render !== undefined && React.isValidElement(render) && render.type !== 'button'
        ? false
        : undefined;
    const buttonAui = React.useMemo<IconButtonAui>(
      () => ({
        ...ICON_BUTTON_DEFAULTS,
        ...aui,
        color: aui?.color ?? ICON_BUTTON_DEFAULTS.color,
        paint: aui?.paint ?? ICON_BUTTON_DEFAULTS.paint,
        scale: aui?.scale ?? ICON_BUTTON_DEFAULTS.scale,
        profile: aui?.profile ?? ICON_BUTTON_DEFAULTS.profile,
        shape: aui?.shape ?? ICON_BUTTON_DEFAULTS.shape,
        elevation: aui?.elevation ?? ICON_BUTTON_DEFAULTS.elevation,
      }),
      [aui],
    );

    // No IconButton-specific sizing marker: the box geometry is the SYSTEM-WIDE square-intent-profile
    // rule (tokens/_state-cascade.scss). A square profile class (e.g. `aui-scale-square-sm`) squares the
    // box; a text profile (`aui-scale-default-sm`) leaves it content-width (a rectangle). Consumer
    // className passes straight through.
    return (
      <Button
        ref={ref}
        {...rest}
        render={render}
        nativeButton={nativeButton}
        className={className}
        aui={buttonAui}
      >
        <Button.Icon
          name={name}
          family={family}
          layer={layer}
          weight={weight}
          aria-hidden
        />
      </Button>
    );
  },
);
IconButtonRoot.displayName = 'IconButton';

export const IconButton = IconButtonRoot;
export default IconButton;
