// modules/design/atomic-aui/src/lib/avatar/avatar.tsx
//
// Avatar — a passive full-frame leaf over the installed Base UI Avatar primitive.
//
//   • Avatar (`aui-avatar`)            — Base UI Root, rendered as a span, styled by the stateless
//                                        frame recipe. Root-only `aui`; no state layer.
//   • Avatar.Image (`aui-avatar-image`)       — marker-only Base UI Image part.
//   • Avatar.Fallback (`aui-avatar-fallback`) — marker-only Base UI Fallback part.
import * as React from 'react';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart } from '../../core/factory/create-atomic-part';
import { useAvatarRecipe } from './use-recipe';
import { AvatarGroupScaleContext } from './group-scale-context';
import type { AvatarAui } from './use-recipe';

export {
  AVATAR_DEFAULT_COLOR,
  AVATAR_DEFAULT_ELEVATION,
  AVATAR_DEFAULT_PAINT,
  AVATAR_DEFAULT_PROFILE,
  AVATAR_DEFAULT_SCALE,
  AVATAR_DEFAULT_SHAPE,
  AVATAR_SX_AXES,
  AVATAR_VOCAB,
  useAvatarRecipe,
} from './use-recipe';
export type {
  AvatarAui,
  AvatarColor,
  AvatarElevation,
  AvatarPaint,
  AvatarProfile,
  AvatarScale,
  AvatarShape,
} from './use-recipe';

// Avatar.Image - marker-only Base UI image part. No part `aui`: `createAtomicPart` strips and
// warns on accidental `aui`; Base UI owns load status, transition attrs, and mounted/null rendering.
type BaseAvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;
export type AvatarImageProps = BaseAvatarImageProps;

const _AvatarImage = createAtomicPart<AvatarImageProps>(
  AvatarPrimitive.Image,
  'aui-avatar-image',
);
const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(function AvatarImage(
  props,
  ref,
) {
  return React.createElement(_AvatarImage as React.ElementType, { ref, ...props });
});
AvatarImage.displayName = 'Avatar.Image';

// Avatar.Fallback - marker-only Base UI fallback part. Base UI enables it from root image status
// plus optional delay; AtomicAUI only stamps the marker class.
type BaseAvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;
export type AvatarFallbackProps = BaseAvatarFallbackProps;

const _AvatarFallback = createAtomicPart<AvatarFallbackProps>(
  AvatarPrimitive.Fallback,
  'aui-avatar-fallback',
);
const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(function AvatarFallback(
  props,
  ref,
) {
  return React.createElement(_AvatarFallback as React.ElementType, { ref, ...props });
});
AvatarFallback.displayName = 'Avatar.Fallback';

type BaseAvatarRootProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

export interface AvatarProps extends BaseAvatarRootProps {
  /** Root-only stateless frame surface. Defaults: surface-alt / solid / md / square / pill / 0. */
  aui?: AvatarAui;
}

const _AvatarRoot = createAtomicComponent(AvatarPrimitive.Root, {
  extensions: [useAvatarRecipe],
});

// Root uses the stateless recipe only. Base UI maps avatar image status to no public data attrs,
// so loading/fallback visibility must not become an AtomicAUI state layer.
const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  props,
  ref,
) {
  // Avatar is passive: ignore stray JS/cast `disabled` before the shared stateless recipe sees it.
  const avatarProps = { ...(props as AvatarProps & { disabled?: unknown }) };
  const groupScale = React.useContext(AvatarGroupScaleContext);
  if (groupScale !== undefined && avatarProps.aui?.scale === undefined) {
    avatarProps.aui = { ...avatarProps.aui, scale: groupScale };
  }
  delete avatarProps.disabled;
  return React.createElement(_AvatarRoot as React.ElementType, { ref, ...avatarProps });
});
AvatarRoot.displayName = 'Avatar';

export interface AvatarComponent
  extends React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>> {
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
}

// Flat namespace by contract: `Avatar` is the root; there is no `Avatar.Root` alias.
export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
}) as AvatarComponent;
export default Avatar;
