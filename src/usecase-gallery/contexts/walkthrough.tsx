import type { ContextProps } from '../types';
import { Card, Type } from '../kit';

export default function WalkthroughContext({ children }: ContextProps) {
  return (
    <Card aui={{ color: 'surface-alt', elevation: 2 }} aria-label="Walkthrough step">
      <Card.Body>
        <Card.Content>
          <Type role="l4" as="p" weight="bold">Step 2 of 3</Type>
          <Type role="p3" as="p">Use the filters to narrow the results.</Type>
        </Card.Content>
        <Card.Footer>
          {children}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
