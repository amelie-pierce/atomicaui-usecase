// modules/design/atomic-aui/src/core/types.ts
import type * as React from 'react';

export type AnyProps = Record<string, unknown>;

export type PropHook<P extends AnyProps = AnyProps, Out extends AnyProps = AnyProps> = {
  (props: P): Out;
  hookProps?: Set<string>;
};

/** A paint-time className selector: receives the host primitive's render `state`. */
export type StateClassNameFn = (state: unknown) => string | undefined;

export type AtomicComponentConfig<Ext extends readonly PropHook[] = readonly PropHook[]> = {
  extensions?: Ext;
};

export type ElementType = React.ElementType;
