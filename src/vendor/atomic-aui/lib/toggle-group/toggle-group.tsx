// ToggleGroup — AtomicAUI's segmented-control frame over Base UI ToggleGroup/Toggle.
//
// Base UI owns the interaction contract and remains the source of truth here: values are always
// arrays (including single-select), pressing the active item clears the array, disabled is inherited,
// data attributes are emitted by the primitive, and keyboard focus roves through the items. AtomicAUI
// owns the shared full-frame rail geometry; consumers own each item's pressed/unpressed paint.
import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { useToggleGroupRecipe } from './use-recipe';
import type { ToggleGroupAui } from './use-recipe';
import type {
  ToggleGroupProps as BaseToggleGroupProps,
} from '@base-ui/react/toggle-group';
import type { ToggleProps as BaseToggleProps } from '@base-ui/react/toggle';

export {
  TOGGLE_GROUP_SX_AXES,
  TOGGLE_GROUP_VOCAB,
  useToggleGroupRecipe,
} from './use-recipe';
export type { ToggleGroupAui } from './use-recipe';

export type ToggleGroupRootProps<Value extends string = string> = BaseToggleGroupProps<Value> & {
  /** Full-frame appearance for the segmented-control rail. */
  aui?: ToggleGroupAui;
};

interface ToggleGroupRootComponent {
  <Value extends string = string>(
    props: ToggleGroupRootProps<Value> & React.RefAttributes<HTMLDivElement>,
  ): React.JSX.Element;
  displayName?: string;
}

const _ToggleGroupRoot = createAtomicComponent(ToggleGroupPrimitive, {
  extensions: [useToggleGroupRecipe],
});

const ToggleGroupRoot = React.forwardRef<HTMLDivElement, ToggleGroupRootProps<string>>(
  function ToggleGroupRoot(props, ref) {
    return React.createElement(_ToggleGroupRoot as React.ElementType, { ...props, ref });
  },
) as ToggleGroupRootComponent;
ToggleGroupRoot.displayName = 'ToggleGroup.Root';

export type ToggleGroupItemProps<Value extends string = string> = BaseToggleProps<Value>;

interface ToggleGroupItemComponent {
  <Value extends string = string>(
    props: ToggleGroupItemProps<Value> & React.RefAttributes<HTMLButtonElement>,
  ): React.JSX.Element;
  displayName?: string;
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps<string>>(
  function ToggleGroupItem(props, ref) {
    return React.createElement(TogglePrimitive, { ...props, ref });
  },
) as ToggleGroupItemComponent;
ToggleGroupItem.displayName = 'ToggleGroup.Item';

interface ToggleGroupComponent extends ToggleGroupRootComponent {
  Root: typeof ToggleGroupRoot;
  Item: typeof ToggleGroupItem;
}

/** Callable Root plus `.Root` and `.Item` statics. */
export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
}) as ToggleGroupComponent;

export default ToggleGroup;
