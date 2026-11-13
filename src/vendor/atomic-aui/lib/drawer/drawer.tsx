import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import type {
  DrawerRootProps as BaseDrawerRootProps,
  DrawerTriggerProps as BaseDrawerTriggerProps,
  DrawerPopupProps as BaseDrawerPopupProps,
  DrawerContentProps as BaseDrawerContentProps,
  DrawerTitleProps as BaseDrawerTitleProps,
  DrawerDescriptionProps as BaseDrawerDescriptionProps,
  DrawerCloseProps as BaseDrawerCloseProps,
  DrawerBackdropProps as BaseDrawerBackdropProps,
  DrawerViewportProps as BaseDrawerViewportProps,
  DrawerSwipeAreaProps as BaseDrawerSwipeAreaProps,
  DrawerPortalProps as BaseDrawerPortalProps,
  DrawerIndentProps as BaseDrawerIndentProps,
  DrawerIndentBackgroundProps as BaseDrawerIndentBackgroundProps,
  DrawerProviderProps as BaseDrawerProviderProps,
  DrawerVirtualKeyboardProviderProps as BaseDrawerVirtualKeyboardProviderProps,
} from '@base-ui/react/drawer';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, findPartChild } from '../../core/factory/create-atomic-part';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { identityToDataAttrs, useAuiIdentity } from '../identity';
import { Button, type ButtonAui } from '../button';
import {
  ScrollArea as ViewScrollArea,
  ScrollAreaViewport as ViewScrollAreaViewport,
  ScrollAreaScrollbar as ViewScrollAreaScrollbar,
} from '../view';
import type { ScrollAreaThumbColor } from '../view';
import {
  buildDrawerFramePartClasses,
  DRAWER_POPUP_VOCAB,
  useDrawerPopupRecipe,
} from './use-recipe';
import type {
  DrawerContentAui,
  DrawerDescriptionAui,
  DrawerPopupAui,
  DrawerScale,
  DrawerTitleAui,
} from './use-recipe';

export const DrawerHandle = DrawerPrimitive.Handle;
export const createDrawerHandle = DrawerPrimitive.createHandle;
export type DrawerHandle<Payload> = ReturnType<typeof DrawerPrimitive.createHandle<Payload>>;

export type {
  DrawerColor,
  DrawerPaint,
  DrawerProfile,
  DrawerScale,
  DrawerShape,
  DrawerPopupAui,
  DrawerContentAui,
  DrawerDescriptionAui,
  DrawerTitleAui,
} from './use-recipe';

const DEFAULT_POPUP_SCALE: DrawerScale = DRAWER_POPUP_VOCAB.defaults.scale;

interface DrawerPopupAppearanceContextValue {
  scale: DrawerScale;
}

const DrawerPopupAppearanceContext = React.createContext<DrawerPopupAppearanceContextValue>({
  scale: DEFAULT_POPUP_SCALE,
});

export type DrawerRootProps<Payload = unknown> = BaseDrawerRootProps<Payload>;

// Base UI's Root is context-only: it owns open state, event details, snap points, nested-drawer
// coordination, and the render-payload/imperative-action plumbing without adding a DOM element.
function DrawerRoot<Payload>(props: DrawerRootProps<Payload>): React.JSX.Element {
  return React.createElement(DrawerPrimitive.Root, props as object);
}
DrawerRoot.displayName = 'Drawer';

export interface DrawerTriggerProps<Payload = unknown>
  extends Omit<BaseDrawerTriggerProps<Payload>, 'color' | 'ref'> {
  aui?: ButtonAui;
}

interface DrawerTriggerComponent {
  <Payload = unknown>(
    props: DrawerTriggerProps<Payload> & React.RefAttributes<HTMLElement>
  ): React.JSX.Element;
  displayName?: string;
}

const DrawerTrigger = React.forwardRef<HTMLElement, DrawerTriggerProps>(
  function DrawerTrigger({ aui, className, children, type, render, ...rest }, ref) {
    const triggerAui: ButtonAui = {
      color: 'surface-alt',
      paint: 'solid',
      scale: 'sm',
      shape: 'soft',
      ...aui,
    };
    const triggerRender =
      render ?? React.createElement(Button, { aui: triggerAui, className: 'aui-drawer-trigger' });
    const triggerClassName =
      render === undefined ? className : prependMarkerClassName('aui-drawer-trigger', className);
    const triggerType = type ?? (render === undefined ? 'button' : undefined);

    // Base UI merges trigger behavior onto either the default AtomicAUI Button or the caller's
    // explicit render target. `render` is destructured, then set once after `rest`, so spread order
    // cannot silently replace the chosen composition.
    return React.createElement(
      DrawerPrimitive.Trigger,
      {
        ref,
        ...rest,
        ...(triggerType !== undefined ? { type: triggerType } : {}),
        className: triggerClassName,
        render: triggerRender,
      },
      children,
    );
  },
) as DrawerTriggerComponent;
DrawerTrigger.displayName = 'Drawer.Trigger';

export type DrawerPortalProps = BaseDrawerPortalProps;
const DrawerPortal = React.forwardRef<HTMLDivElement, DrawerPortalProps>(function DrawerPortal(
  props,
  ref,
) {
  return React.createElement(DrawerPrimitive.Portal, { ref, ...props });
});
DrawerPortal.displayName = 'Drawer.Portal';

// The portal is a structural passthrough. Its body-mounted descendants re-stamp the ambient AUI
// identity below because portal relocation otherwise breaks inherited theme data attributes.
export type DrawerBackdropProps = BaseDrawerBackdropProps;
// Backdrop and Viewport are marker-only structural parts; the Popup below is the recipe-bearing
// surface, while Base UI continues to place and transition this portaled stack.
const DrawerBackdrop = React.forwardRef<HTMLDivElement, DrawerBackdropProps>(
  function DrawerBackdrop({ className, ...rest }, ref) {
    const dataAttrs = identityToDataAttrs(useAuiIdentity());
    return React.createElement(DrawerPrimitive.Backdrop, {
      ref,
      ...rest,
      ...dataAttrs,
      className: prependMarkerClassName('aui-drawer-backdrop', className),
    });
  },
);
DrawerBackdrop.displayName = 'Drawer.Backdrop';

export type DrawerViewportProps = BaseDrawerViewportProps;
const DrawerViewport = React.forwardRef<HTMLDivElement, DrawerViewportProps>(
  function DrawerViewport({ className, ...rest }, ref) {
    const dataAttrs = identityToDataAttrs(useAuiIdentity());
    return React.createElement(DrawerPrimitive.Viewport, {
      ref,
      ...rest,
      ...dataAttrs,
      className: prependMarkerClassName('aui-drawer-viewport', className),
    });
  },
);
DrawerViewport.displayName = 'Drawer.Viewport';

const _DrawerPopup = createAtomicComponent(DrawerPrimitive.Popup, {
  extensions: [useDrawerPopupRecipe],
});

// Popup is the only Drawer surface with a recipe-bearing factory. Base UI still owns the dialog
// role, title/description links, modal focus manager, measured height, swipe state, and snap vars.

export interface DrawerPopupProps extends Omit<BaseDrawerPopupProps, 'color'> {
  aui?: DrawerPopupAui;
}

const DrawerPopup = React.forwardRef<HTMLDivElement, DrawerPopupProps>(
  function DrawerPopup({ aui, children, ...rest }, ref) {
    const dataAttrs = identityToDataAttrs(useAuiIdentity());
    const inheritedAppearance = React.useMemo<DrawerPopupAppearanceContextValue>(
      () => ({ scale: aui?.scale ?? DEFAULT_POPUP_SCALE }),
      [aui?.scale],
    );
    return React.createElement(_DrawerPopup as React.ElementType, {
      ref,
      ...rest,
      aui,
      ...dataAttrs,
    }, (
      <DrawerPopupAppearanceContext.Provider value={inheritedAppearance}>
        {children}
      </DrawerPopupAppearanceContext.Provider>
    ));
  },
);
DrawerPopup.displayName = 'Drawer.Popup';

export type DrawerSwipeAreaProps = BaseDrawerSwipeAreaProps;
const DrawerSwipeArea = React.forwardRef<HTMLDivElement, DrawerSwipeAreaProps>(
  function DrawerSwipeArea({ className, ...rest }, ref) {
    return React.createElement(DrawerPrimitive.SwipeArea, {
      ref,
      ...rest,
      className: prependMarkerClassName('aui-drawer-swipe-area', className),
    });
  },
);
DrawerSwipeArea.displayName = 'Drawer.SwipeArea';

// This public part is a null styling carrier, not a second scroll implementation. Content reads its
// exact three props and applies them to the one permanent View.ScrollArea it owns.
export interface DrawerScrollAreaProps {
  scrollbarSize?: number | string;
  scrollbarThumbHover?: string;
  scrollbarColor?: ScrollAreaThumbColor;
}
const DrawerScrollArea: React.FC<DrawerScrollAreaProps> = () => null;
DrawerScrollArea.displayName = 'Drawer.ScrollArea';

export interface DrawerContentProps extends Omit<BaseDrawerContentProps, 'color'> {
  aui?: DrawerContentAui;
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent({ aui, className, children, ...rest }, ref) {
    const inheritedAppearance = React.useContext(DrawerPopupAppearanceContext);
    // The carrier is found by identity and removed from the rendered subtree. Keeping one explicit
    // Viewport + Scrollbar makes short and overflowing drawers use the same upstream-safe wrapper.
    const scrollProps = findPartChild(children, DrawerScrollArea)?.props as
      | DrawerScrollAreaProps
      | undefined;
    const rootProps: Record<string, unknown> = {
      aui: {
        color: 'surface',
        paint: 'text',
        scale: inheritedAppearance.scale,
        profile: 'default',
        shape: 'none',
        elevation: 0,
      },
      scrollAxis: 'vertical',
      className: 'aui-drawer-content-scroll',
      ...(scrollProps?.scrollbarSize != null ? { scrollbarSize: scrollProps.scrollbarSize } : {}),
      ...(scrollProps?.scrollbarThumbHover != null
        ? { scrollbarThumbHover: scrollProps.scrollbarThumbHover }
        : {}),
      ...(scrollProps?.scrollbarColor != null ? { scrollbarColor: scrollProps.scrollbarColor } : {}),
    };

    return React.createElement(
      DrawerPrimitive.Content,
      {
        ref,
        ...rest,
        className: buildDrawerFramePartClasses({
          marker: 'aui-drawer-content',
          aui,
          className,
        }),
      },
      React.createElement(
        ViewScrollArea as React.ElementType,
        rootProps,
        // Override mode is intentional: an explicit Viewport/Scrollbar lets Drawer.Content keep
        // the thumb axis fixed and forwards the carrier's resting color to the auto-created thumb.
        React.createElement(ViewScrollAreaViewport as React.ElementType, null, children),
        React.createElement(ViewScrollAreaScrollbar as React.ElementType, {
          orientation: 'vertical',
          ...(scrollProps?.scrollbarColor != null ? { thumbColor: scrollProps.scrollbarColor } : {}),
        }),
      ),
    );
  },
);
DrawerContent.displayName = 'Drawer.Content';

export type DrawerTitleProps = Omit<BaseDrawerTitleProps, 'color'> & { aui?: DrawerTitleAui };
const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function DrawerTitle({ aui, className, ...rest }, ref) {
    return React.createElement(DrawerPrimitive.Title, {
      ref,
      ...rest,
      className: buildDrawerFramePartClasses({
        marker: 'aui-drawer-title',
        aui,
        className,
        defaultColor: 'surface-alt',
        defaultPaint: 'solid',
      }),
    });
  },
);
DrawerTitle.displayName = 'Drawer.Title';

export type DrawerDescriptionProps = Omit<BaseDrawerDescriptionProps, 'color'> & {
  aui?: DrawerDescriptionAui;
};
const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  function DrawerDescription({ aui, className, ...rest }, ref) {
    return React.createElement(DrawerPrimitive.Description, {
      ref,
      ...rest,
      className: buildDrawerFramePartClasses({
        marker: 'aui-drawer-description',
        aui,
        className,
      }),
    });
  },
);
DrawerDescription.displayName = 'Drawer.Description';

// Close remains a Base UI button so its dismissal reason and final-focus return path stay attached
// to the Root trigger; AtomicAUI contributes only the marker class.
export type DrawerCloseProps = Omit<BaseDrawerCloseProps, 'color'>;
const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  function DrawerClose({ className, ...rest }, ref) {
    return React.createElement(DrawerPrimitive.Close, {
      ref,
      ...rest,
      className: prependMarkerClassName('aui-drawer-close', className),
    });
  },
);
DrawerClose.displayName = 'Drawer.Close';

export type DrawerIndentProps = BaseDrawerIndentProps;
const DrawerIndent = createAtomicPart<DrawerIndentProps>(DrawerPrimitive.Indent, 'aui-drawer-indent');
DrawerIndent.displayName = 'Drawer.Indent';

export type DrawerIndentBackgroundProps = BaseDrawerIndentBackgroundProps;
const DrawerIndentBackground = createAtomicPart<DrawerIndentBackgroundProps>(
  DrawerPrimitive.IndentBackground,
  'aui-drawer-indent-background',
);
DrawerIndentBackground.displayName = 'Drawer.IndentBackground';

export type DrawerProviderProps = BaseDrawerProviderProps;
const DrawerProvider = (props: DrawerProviderProps): React.JSX.Element => {
  return React.createElement(DrawerPrimitive.Provider, props);
};
DrawerProvider.displayName = 'Drawer.Provider';

export type DrawerVirtualKeyboardProviderProps = BaseDrawerVirtualKeyboardProviderProps;
const DrawerVirtualKeyboardProvider = (
  props: DrawerVirtualKeyboardProviderProps,
): React.JSX.Element => React.createElement(DrawerPrimitive.VirtualKeyboardProvider, props);
DrawerVirtualKeyboardProvider.displayName = 'Drawer.VirtualKeyboardProvider';

interface DrawerComponent {
  <Payload = unknown>(props: DrawerRootProps<Payload>): React.JSX.Element;
  displayName?: string;
  Root: typeof DrawerRoot;
  Provider: typeof DrawerProvider;
  Indent: typeof DrawerIndent;
  IndentBackground: typeof DrawerIndentBackground;
  Trigger: typeof DrawerTrigger;
  Portal: typeof DrawerPortal;
  Popup: typeof DrawerPopup;
  SwipeArea: typeof DrawerSwipeArea;
  Content: typeof DrawerContent;
  Backdrop: typeof DrawerBackdrop;
  Viewport: typeof DrawerViewport;
  Title: typeof DrawerTitle;
  Description: typeof DrawerDescription;
  Close: typeof DrawerClose;
  VirtualKeyboardProvider: typeof DrawerVirtualKeyboardProvider;
  ScrollArea: typeof DrawerScrollArea;
  Handle: typeof DrawerHandle;
  createHandle: typeof createDrawerHandle;
}

export const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Provider: DrawerProvider,
  Indent: DrawerIndent,
  IndentBackground: DrawerIndentBackground,
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Popup: DrawerPopup,
  SwipeArea: DrawerSwipeArea,
  Content: DrawerContent,
  Backdrop: DrawerBackdrop,
  Viewport: DrawerViewport,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
  VirtualKeyboardProvider: DrawerVirtualKeyboardProvider,
  ScrollArea: DrawerScrollArea,
  Handle: DrawerHandle,
  createHandle: createDrawerHandle,
}) as DrawerComponent;

export default Drawer;
