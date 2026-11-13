// modules/design/atomic-aui/src/families/chevron/split-trigger-children.ts
//
// The GENERIC version of Accordion's `splitTriggerChildren`: separate a trigger's composed chevron
// child(ren) from its label body by REFERENCE IDENTITY (`child.type === ChevronType`), recursively
// unwrapping fragments so `<><Chevron/></>` (and conditional `{cond && <Chevron/>}`) still match.
// Pure — no DOM, no React rendering. Parametrized by the chevron part type so each component passes
// its own `Dropdown.Chevron` / `Select.Chevron` / `Menubar.Chevron`.
import * as React from 'react';

/**
 * Split `children` into label `body` nodes and composed `chevrons` by part identity.
 *
 * @param children    - The trigger's children.
 * @param ChevronType - The chevron part component to match by reference (e.g. `Dropdown.Chevron`).
 * @returns `{ body, chevrons }` — non-chevron content stays in `body`; matched chevrons collect into
 *   `chevrons` (each a `ReactElement`).
 */
export function splitTriggerChildren(
  children: React.ReactNode,
  ChevronType: React.ElementType,
): { body: React.ReactNode[]; chevrons: React.ReactElement[] } {
  const body: React.ReactNode[] = [];
  const chevrons: React.ReactElement[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      body.push(child);
      return;
    }

    if (child.type === React.Fragment) {
      const split = splitTriggerChildren(
        (child.props as { children?: React.ReactNode }).children,
        ChevronType,
      );
      body.push(...split.body);
      chevrons.push(...split.chevrons);
      return;
    }

    if (child.type === ChevronType) {
      chevrons.push(child);
      return;
    }

    body.push(child);
  });

  return { body, chevrons };
}
