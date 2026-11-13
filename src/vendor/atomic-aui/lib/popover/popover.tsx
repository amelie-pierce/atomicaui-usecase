// Popover — an unstyled AtomicAUI seam over Base UI Popover.
//
// Base UI owns the complete interaction model: open state, trigger ARIA, dismissal, focus return,
// floating placement, and transition lifecycle. This surface deliberately adds no visual recipe.
// Its two DS responsibilities are (1) preserving the standard Root + part namespace and (2)
// re-stamping the ambient identity on portaled positioning/paint hosts so the token cascade survives
// the body portal. Popup motion uses the fleet-wide anchored motion hook already consumed by the
// shipped Select/Dropdown/Datepicker overlays.
import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import type {
  PopoverRootProps as BasePopoverRootProps,
  PopoverTriggerProps as BasePopoverTriggerProps,
  PopoverPortalProps as BasePopoverPortalProps,
  PopoverPositionerProps as BasePopoverPositionerProps,
  PopoverPopupProps as BasePopoverPopupProps,
} from '@base-ui/react/popover';
import { identityToDataAttrs, useAuiIdentity } from '../identity';

/**
 * The first seam deliberately ships only non-modal Popover behavior. Base UI's modal modes need a
 * Close escape path, which is not part of this approved AtomicAUI topology yet. Keep that boundary
 * visible to consumers instead of advertising a mode the namespace cannot complete accessibly.
 */
export type PopoverRootProps<Payload = unknown> = Omit<BasePopoverRootProps<Payload>, 'modal'> & {
  modal?: false;
};

/** The Root is intentionally DOM-neutral; Base UI owns its provider/context lifecycle. */
function PopoverRoot<Payload = unknown>({ modal = false, ...props }: PopoverRootProps<Payload>) {
  return React.createElement(PopoverPrimitive.Root as React.ElementType, { ...props, modal });
}
PopoverRoot.displayName = 'Popover.Root';

export type PopoverTriggerProps<Payload = unknown> = BasePopoverTriggerProps<Payload>;

interface PopoverTriggerComponent {
  <Payload = unknown>(
    props: PopoverTriggerProps<Payload> & React.RefAttributes<HTMLElement>,
  ): React.JSX.Element;
  displayName?: string;
}

const PopoverTrigger = React.forwardRef<HTMLElement, PopoverTriggerProps<unknown>>(
  function PopoverTrigger(props, ref) {
    return <PopoverPrimitive.Trigger {...props} ref={ref} />;
  },
) as PopoverTriggerComponent;
PopoverTrigger.displayName = 'Popover.Trigger';

export type PopoverPortalProps = BasePopoverPortalProps;

const PopoverPortal = React.forwardRef<HTMLDivElement, PopoverPortalProps>(
  function PopoverPortal(props, ref) {
    return React.createElement(PopoverPrimitive.Portal, { ...props, ref });
  },
);
PopoverPortal.displayName = 'Popover.Portal';

export type PopoverPositionerProps = BasePopoverPositionerProps;

const PopoverPositioner = React.forwardRef<HTMLDivElement, PopoverPositionerProps>(
  function PopoverPositioner(props, ref) {
    const identity = useAuiIdentity();
    return React.createElement(PopoverPrimitive.Positioner, {
      ...props,
      ...identityToDataAttrs(identity),
      ref,
    });
  },
);
PopoverPositioner.displayName = 'Popover.Positioner';

export type PopoverPopupProps = BasePopoverPopupProps;

const PopoverPopup = React.forwardRef<HTMLDivElement, PopoverPopupProps>(
  function PopoverPopup(props, ref) {
    const identity = useAuiIdentity();
    return React.createElement(PopoverPrimitive.Popup as React.ElementType, {
      'data-aui-popup-motion': 'anchored',
      ...props,
      ...identityToDataAttrs(identity),
      ref,
    });
  },
);
PopoverPopup.displayName = 'Popover.Popup';

interface PopoverComponent {
  <Payload = unknown>(props: PopoverRootProps<Payload>): React.JSX.Element;
  displayName?: string;
  Root: typeof PopoverRoot;
  Trigger: typeof PopoverTrigger;
  Portal: typeof PopoverPortal;
  Positioner: typeof PopoverPositioner;
  Popup: typeof PopoverPopup;
}

/** Callable Root plus the explicit `.Root` alias keeps both DS composition styles available. */
export const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Positioner: PopoverPositioner,
  Popup: PopoverPopup,
}) as PopoverComponent;

export default Popover;
