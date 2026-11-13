import { Type } from '../kit';

export function PaneHeading({ id, children }: { id: string; children: string }) {
  return (
    <Type role="h6" as="h2" family="display" id={id} className="ug-pane__heading">
      {children}
    </Type>
  );
}
