import type { ContextProps } from '../types';
import { Card, Type } from '../kit';

export default function WalkthroughCloseContext({ children }: ContextProps) {
  return (
    <Card aui={{ color: 'surface-alt', elevation: 2 }} aria-label="Walkthrough step">
      <Card.Body>
        <Card.Header>
          <Card.Title>Step 2 of 3</Card.Title>
          <Card.Action>
            {children}
          </Card.Action>
        </Card.Header>
        <Card.Content>
          <Type role="p3" as="p">Use the filters to narrow the results.</Type>
        </Card.Content>
      </Card.Body>
    </Card>
  );
}
