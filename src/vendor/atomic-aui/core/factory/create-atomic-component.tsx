// modules/design/atomic-aui/src/core/create-atomic-component.tsx
import { createElement, forwardRef } from 'react';
import type { ComponentType } from 'react';
import type { AnyProps, AtomicComponentConfig, ElementType, PropHook, StateClassNameFn } from '../types';
import { mergeAuiClasses } from '../recipe/merge-classes';

export function createAtomicComponent(
  as: ElementType,
  config: AtomicComponentConfig = {}
) {
  const extensions = config.extensions ?? [];

  const hookProps = new Set<string>();
  for (const hook of extensions) hook.hookProps?.forEach((p) => hookProps.add(p));

  const Component = forwardRef<unknown, AnyProps>((props, ref) => {
    // The consumer className may be a string, a function (Base UI resolves it with
    // render `state`), or undefined. `userClassName` is the string form used for the
    // sequential hook-probing picture; `userClassNameProp` preserves the raw value
    // (incl. function) so it can be folded in LAST and still override.
    const userClassNameProp = props.className;
    const userClassName = typeof userClassNameProp === 'string' ? userClassNameProp : undefined;
    // Seed `merged.className` with the STRING form so hooks that probe `props.className`
    // never see (and accidentally stringify) a function className. The raw function form
    // is preserved separately in `userClassNameProp` and folded in last below.
    let merged: AnyProps = { ...props, className: userClassName };
    const hookClassFragments: string[] = [];
    const stateClassFns: StateClassNameFn[] = [];

    for (const hook of extensions as PropHook[]) {
      const out = hook(merged) ?? {};   // tolerate hooks that return null/undefined
      for (const [key, value] of Object.entries(out)) {
        if (value === undefined) continue;
        if (key === 'classNameForState' && typeof value === 'function') {
          stateClassFns.push(value as StateClassNameFn);
          continue;
        }
        if (key === 'className' && typeof value === 'string') {
          hookClassFragments.push(value);
          // Reflect the cumulative className (hook fragments + user LAST) so a later
          // hook probing props.className sees the full, user-overridden picture.
          merged = { ...merged, className: mergeAuiClasses([...hookClassFragments, userClassName]) };
        } else {
          merged = { ...merged, [key]: value };
        }
      }
    }

    // KNOWN LIMITATION (deferred — YAGNI): Non-className hook outputs are merged as-is
    // and only `hookProps`-listed keys are stripped; hooks are responsible for emitting
    // DOM-safe keys. A general transient-key/precedence policy is deferred until a 2nd
    // consumer needs it.
    const domProps: AnyProps = {};
    for (const [key, value] of Object.entries(merged)) {
      if (key === 'className') continue;
      if (key === 'classNameForState') continue;
      if (hookProps.has(key)) continue;
      domProps[key] = value;
    }
    // User className LAST → it overrides recipe/hook axis classes of the same role.
    // The resolved className is a function whenever a state hook contributes OR the
    // consumer passed a function className (Base UI resolves it with render `state`).
    const userClassNameIsFn = typeof userClassNameProp === 'function';
    if (stateClassFns.length || userClassNameIsFn) {
      if (typeof as === 'string') {
        // A function className (from a state hook OR the consumer) can't reach a DOM
        // element — the host must resolve it with render `state`.
        throw new Error(
          `createAtomicComponent: a function className (classNameForState hook or a ` +
          `consumer function className) requires an \`as\` that accepts a function ` +
          `className (a Base UI primitive), not the intrinsic element "${as}".`
        );
      }
      // Order: static recipe fragments → per-state class → user className LAST. The
      // consumer's function className (if any) is resolved with the same render state.
      domProps.className = (state: unknown) =>
        mergeAuiClasses([
          ...hookClassFragments,
          ...stateClassFns.map((fn) => fn(state)),
          userClassNameIsFn
            ? (userClassNameProp as (s: unknown) => string | undefined)(state)
            : userClassName,
        ]);
    } else {
      domProps.className = mergeAuiClasses([...hookClassFragments, userClassName]);
    }

    return createElement(as as ComponentType<AnyProps>, { ...domProps, ref });
  });

  Component.displayName =
    typeof as === 'string'
      ? `Atomic(${as})`
      : `Atomic(${(as as { displayName?: string; name?: string }).displayName ?? (as as { name?: string }).name ?? 'Component'})`;
  return Component;
}
