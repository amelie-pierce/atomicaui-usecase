import * as React from 'react';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { Avatar, type AvatarProps } from '../avatar';
import { AvatarGroupScaleContext } from '../avatar/group-scale-context';
import { useAvatarGroupRecipe, type AvatarGroupAui } from './use-recipe';

export type { AvatarGroupAui } from './use-recipe';
export { AVATAR_GROUP_SX_AXES, AVATAR_GROUP_VOCAB, useAvatarGroupRecipe } from './use-recipe';

export interface AvatarGroupCountProps extends AvatarProps {
  count?: number;
}

const AvatarGroupCount = React.forwardRef<HTMLSpanElement, AvatarGroupCountProps>(
  function AvatarGroupCount({ count = 0, children, ...props }, ref) {
    return (
      <Avatar ref={ref} role="img" aria-label={`${count} more ${count === 1 ? 'person' : 'people'}`} {...props}>
        <Avatar.Fallback>{children ?? `+${count}`}</Avatar.Fallback>
      </Avatar>
    );
  },
);
AvatarGroupCount.displayName = 'AvatarGroup.Count';

export interface AvatarGroupProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'color'> {
  aui?: AvatarGroupAui;
  max?: number;
  total?: number;
}

const GroupFrame = createAtomicComponent('div', { extensions: [useAvatarGroupRecipe] });

function flatten(children: React.ReactNode, prefix = ''): React.ReactNode[] {
  return React.Children.toArray(children).flatMap((child, index) => {
    const key = `${prefix}${React.isValidElement(child) ? child.key ?? index : index}`;
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) return [child];
    return child.type === React.Fragment
      ? flatten(child.props.children, `${key}/`)
      : [React.cloneElement(child, { key })];
  });
}

const AvatarGroupRoot = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup({ aui, children, max = 5, total, ...props }, ref) {
    const nodes = flatten(children);
    const countPart = nodes.find(
      (node): node is React.ReactElement<AvatarGroupCountProps> =>
        React.isValidElement(node) && node.type === AvatarGroupCount,
    );
    const items = nodes.filter((node) => React.isValidElement(node) && node.type !== AvatarGroupCount);
    const limit = Number.isFinite(max) ? Math.max(1, Math.floor(max)) : 5;
    const size = typeof total === 'number' && Number.isFinite(total)
      ? Math.max(items.length, Math.floor(total)) : items.length;
    const hasOverflow = size > limit || size > items.length;
    const visible = hasOverflow ? items.slice(0, limit - 1) : items;
    const hidden = size - visible.length;
    const count = countPart
      ? React.cloneElement(countPart, { count: hidden })
      : <AvatarGroupCount count={hidden} />;
    const shown = hasOverflow ? [...visible, count] : visible;

    return (
      <GroupFrame ref={ref} role="group" {...props} aui={aui} data-aui-explicit-gap={aui?.sx?.gap !== undefined ? '' : undefined} data-aui-explicit-separator={aui?.sx?.borderColor !== undefined ? '' : undefined}>
        <AvatarGroupScaleContext.Provider value={aui?.scale}>{shown.map((item, index) => (
          <span className="aui-avatar-group-item" style={{ zIndex: shown.length - index }} key={React.isValidElement(item) ? item.key ?? index : index}>
            {item}
          </span>
        ))}</AvatarGroupScaleContext.Provider>
      </GroupFrame>
    );
  },
);
AvatarGroupRoot.displayName = 'AvatarGroup';

export const AvatarGroup = Object.assign(AvatarGroupRoot, {
  Item: Avatar,
  Count: AvatarGroupCount,
});
