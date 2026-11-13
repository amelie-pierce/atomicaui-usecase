import * as React from 'react';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart } from '../../core/factory/create-atomic-part';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { identityToDataAttrs, useAuiIdentity } from '../identity';
import {
  useTooltipPopupRecipe,
  type TooltipPopupAui,
} from './use-recipe';

export type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
>;
export type TooltipRootProps<Payload = unknown> =
  TooltipPrimitive.Root.Props<Payload>;
export type TooltipTriggerProps<Payload = unknown> = Omit<
  TooltipPrimitive.Trigger.Props<Payload>,
  'ref'
> &
  React.RefAttributes<HTMLElement>;
export type TooltipPortalProps = React.ComponentProps<
  typeof TooltipPrimitive.Portal
>;
export type TooltipPositionerProps = React.ComponentProps<
  typeof TooltipPrimitive.Positioner
>;
export interface TooltipPopupProps
  extends Omit<
    React.ComponentProps<typeof TooltipPrimitive.Popup>,
    'color'
  > {
  aui?: TooltipPopupAui;
}
export type TooltipArrowProps = React.ComponentProps<
  typeof TooltipPrimitive.Arrow
>;
export type TooltipViewportProps = React.ComponentProps<
  typeof TooltipPrimitive.Viewport
>;

const TooltipProvider: React.FC<TooltipProviderProps> = function TooltipProvider(
  props
) {
  return React.createElement(TooltipPrimitive.Provider, props);
};
TooltipProvider.displayName = 'Tooltip.Provider';

interface TooltipRootComponent {
  <Payload = unknown>(props: TooltipRootProps<Payload>): React.JSX.Element;
  displayName?: string;
}

const TooltipRoot = (<Payload,>(props: TooltipRootProps<Payload>) =>
  React.createElement(
    TooltipPrimitive.Root as React.ElementType,
    props
  )) as TooltipRootComponent;
TooltipRoot.displayName = 'Tooltip';

interface TooltipTriggerComponent {
  <Payload = unknown>(
    props: TooltipTriggerProps<Payload>
  ): React.JSX.Element;
  displayName?: string;
}

const TooltipTrigger = React.forwardRef<
  HTMLElement,
  TooltipPrimitive.Trigger.Props<unknown>
>(function TooltipTrigger(props, ref) {
  return React.createElement(TooltipPrimitive.Trigger, { ...props, ref });
}) as TooltipTriggerComponent;
TooltipTrigger.displayName = 'Tooltip.Trigger';

const TooltipPortal = React.forwardRef<HTMLDivElement, TooltipPortalProps>(
  function TooltipPortal(props, ref) {
    return React.createElement(TooltipPrimitive.Portal, { ...props, ref });
  }
);
TooltipPortal.displayName = 'Tooltip.Portal';

const TooltipPositioner = React.forwardRef<
  HTMLDivElement,
  TooltipPositionerProps
>(function TooltipPositioner({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  return React.createElement(TooltipPrimitive.Positioner, {
    ref,
    ...rest,
    ...identityToDataAttrs(identity),
    className: prependMarkerClassName('aui-tooltip-positioner', className),
  });
});
TooltipPositioner.displayName = 'Tooltip.Positioner';

const _TooltipPopup = createAtomicComponent(TooltipPrimitive.Popup, {
  extensions: [useTooltipPopupRecipe],
});

const TooltipPopup = React.forwardRef<HTMLDivElement, TooltipPopupProps>(
  function TooltipPopup(props, ref) {
    return React.createElement(_TooltipPopup as React.ElementType, {
      // DS-wide popup motion (shared with Select/Dropdown/Datepicker popups): the
      // `[data-aui-popup-motion="anchored"]` scale+fade owned by the single _state-cascade.scss
      // motion block. Emitted BEFORE `...props` so a consumer override still wins.
      'data-aui-popup-motion': 'anchored',
      ...props,
      ref,
    });
  }
);
TooltipPopup.displayName = 'Tooltip.Popup';

const TooltipArrow = createAtomicPart<TooltipArrowProps>(
  TooltipPrimitive.Arrow,
  'aui-tooltip-arrow'
);
TooltipArrow.displayName = 'Tooltip.Arrow';

const TooltipViewport = createAtomicPart<TooltipViewportProps>(
  TooltipPrimitive.Viewport,
  'aui-tooltip-viewport'
);
TooltipViewport.displayName = 'Tooltip.Viewport';

interface TooltipComponent extends TooltipRootComponent {
  Provider: typeof TooltipProvider;
  Trigger: TooltipTriggerComponent;
  Portal: typeof TooltipPortal;
  Positioner: typeof TooltipPositioner;
  Popup: typeof TooltipPopup;
  Arrow: typeof TooltipArrow;
  Viewport: typeof TooltipViewport;
  createHandle: typeof TooltipPrimitive.createHandle;
}

export const Tooltip = Object.assign(TooltipRoot, {
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Positioner: TooltipPositioner,
  Popup: TooltipPopup,
  Arrow: TooltipArrow,
  Viewport: TooltipViewport,
  createHandle: TooltipPrimitive.createHandle,
}) as TooltipComponent;

// Type-only namespace merge preserves the upstream `Tooltip.Handle<Payload>` spelling without
// fabricating a runtime static alongside `createHandle`.
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Tooltip {
  export type Handle<Payload> = ReturnType<
    typeof TooltipPrimitive.createHandle<Payload>
  >;
}
