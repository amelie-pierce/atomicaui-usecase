// modules/design/atomic-aui/src/lib/button/button.tsx
import * as React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { useStateLayer } from '../../core/state/use-state-layer';
import { ContainedIcon } from '../icon';
import { Spinner } from '../spinner';
import { BUTTON_DEFAULT_SCALE, BUTTON_DEFAULT_SHAPE, useButtonRecipe } from './use-recipe';
import type { ButtonAui, ButtonScale, ButtonShape } from './use-recipe';
import type { ContainedIconAui, ContainedIconProps } from '../icon';
import type { SpinnerAui, SpinnerProps } from '../spinner';

type BaseButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton>;

export interface ButtonProps
  extends Omit<BaseButtonProps, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + nested `sx`
   *  tier-2 atomic overrides. `sx` is the full-frame surface (all layer-3 axes). The
   *  recipe bundles `sx` and runs LAST — so `aui.sx` wins over the state-layer's focus
   *  defaults by axis role (role-dedup, last-wins). `disabled` stays native (not in aui). */
  aui?: ButtonAui;
}

interface ButtonAppearanceContextValue {
  scale: ButtonScale;
  shape: ButtonShape;
}

const ButtonAppearanceContext = React.createContext<ButtonAppearanceContextValue>({
  scale: BUTTON_DEFAULT_SCALE,
  shape: BUTTON_DEFAULT_SHAPE,
});

// useStateLayer runs FIRST (appends stateful + focus-ring defaults), then useButtonRecipe
// runs LAST (recipe classes + bundled aui.sx). Because the recipe is the last fragment
// fed to mergeAuiClasses, its `aui.sx` overrides (e.g. aui.sx.focusColor) win by
// axis role over the state-layer defaults — honouring the §5 "sx always wins" contract.
// `disabled` is passed through to Base UI Button which sets native disabled + data-disabled
// and clamps onClick internally.
const _Button = createAtomicComponent(BaseButton, {
  extensions: [useStateLayer, useButtonRecipe],
});

const ButtonRoot = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  { aui, children, ...rest },
  ref,
) {
  // This captures only Button-owned geometry for opt-in child parts. The visual defaults
  // changed from primary/md to surface-alt/sm, so every layerless Button.Icon must inherit
  // the same resolved geometry the Button recipe is using.
  const inheritedAppearance = React.useMemo<ButtonAppearanceContextValue>(
    () => ({
      scale: aui?.scale ?? BUTTON_DEFAULT_SCALE,
      shape: aui?.shape ?? BUTTON_DEFAULT_SHAPE,
    }),
    [aui?.scale, aui?.shape],
  );

  return React.createElement(
    _Button as React.ElementType,
    { ref, ...rest, aui },
    React.createElement(
      ButtonAppearanceContext.Provider,
      { value: inheritedAppearance },
      children,
    ),
  );
});
ButtonRoot.displayName = 'Button';

export interface ButtonIconProps
  extends Omit<ContainedIconProps, 'aui'> {
  aui?: ContainedIconAui;
}

const ButtonIcon = React.forwardRef<HTMLSpanElement, ButtonIconProps>(
  function ButtonIcon({ aui, ...rest }, ref) {
    const inherited = React.useContext(ButtonAppearanceContext);
    // Compose the shipped ContainedIcon, not a parallel Button-local recipe. Only scale
    // and shape flow through context; color must inherit via currentColor, otherwise a
    // solid Button would stamp chroma on the glyph instead of the resolved white content rail.
    // NO default profile: the icon box = the host text LINE-HEIGHT (2026-06-24 — Figma
    // `icon/container = font/line-height` for EVERY 200-Scale profile, so the box ALWAYS tracks the
    // host line-height and fits; the old "fixed px band inflates the button" concern is GONE). The
    // unprofiled box emits `aui-icon-lh-<tier>` (standalone-safe) and INHERITS the host's
    // `--aui-icon-container` when nested; the recipe's min-reset keeps it from inheriting the Button's
    // padding/min. A consumer's `aui.profile` still drives the box (square / square-compact / …) when set.
    const iconAui = React.useMemo<ContainedIconAui>(
      () => ({ scale: inherited.scale, shape: inherited.shape, ...aui }),
      [inherited.scale, inherited.shape, aui],
    );

    // Glyph size is PROFILE-DRIVEN: the Button/IconButton host frame's `aui-scale-<profile>-<tier>` cell
    // sets `--aui-icon-size` to the Figma-correct glyph size (square-sm=16, square-compact-xs=12,
    // default-sm=12 …), and the inner glyph INHERITS it (`.aui-icon` reads `var(--aui-icon-size, …)`) —
    // so the icon tracks the host profile with NO extra wiring. The glyph's forwarded `scale` only seeds
    // a fallback for the profile-less case; to resize JUST the glyph, use the layer-3 `aui.sx.iconSize`.
    // `rest` is the `name`-XOR-`children` union minus `aui` — forwarded verbatim to ContainedIcon
    // (Button.Icon supports BOTH an FA glyph and custom content). The cast re-asserts the union the
    // distributive `Omit` widens (the discriminant is preserved at the consumer's `<Button.Icon>` call).
    return React.createElement(ContainedIcon, {
      ref,
      ...rest,
      aui: iconAui,
    } as ContainedIconProps & React.RefAttributes<HTMLSpanElement>);
  },
);
ButtonIcon.displayName = 'Button.Icon';

// ─── Button.Spinner — a placeable loading indicator (the *.Icon convention, for Spinner) ──────────
// A thin wrapper over the shipped <Spinner> that resolves geometry from the Button context, exactly
// like Button.Icon. Two deliberate differences from a bare Spinner: (1) it defaults `profile:
// 'contained'` (user-pinned — NOT the Spinner's own `spinner` profile default; a button spinner sits
// in the button's contained padding), and (2) it inherits the Button's resolved `scale`. A consumer
// `aui` still overrides both. Compose-only (v1): the consumer renders it when the button is busy and
// owns the button's `aria-busy`; there is no Button `loading` prop yet.
export interface ButtonSpinnerProps extends Omit<SpinnerProps, 'aui'> {
  aui?: SpinnerAui;
}

const ButtonSpinner = React.forwardRef<HTMLSpanElement, ButtonSpinnerProps>(
  function ButtonSpinner({ aui, ...rest }, ref) {
    const inherited = React.useContext(ButtonAppearanceContext);
    // Default profile 'contained' + the inherited scale; the consumer's `aui` (incl. `profile`) wins.
    const spinnerAui = React.useMemo<SpinnerAui>(
      () => ({ profile: 'contained', scale: inherited.scale, ...aui }),
      [inherited.scale, aui],
    );
    return React.createElement(Spinner, { ref, ...rest, aui: spinnerAui });
  },
);
ButtonSpinner.displayName = 'Button.Spinner';

interface ButtonComponent extends React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLElement>
> {
  Icon: typeof ButtonIcon;
  Spinner: typeof ButtonSpinner;
}

// Intentional typing seam over the lean `AnyProps` factory and Object.assign namespace.
export const Button = Object.assign(ButtonRoot, {
  Icon: ButtonIcon,
  Spinner: ButtonSpinner,
}) as ButtonComponent;
export default Button;
