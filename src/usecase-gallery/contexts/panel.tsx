import type { ContextProps } from '../types';
import { Card, Type } from '../kit';

export default function PanelContext({ children }: ContextProps) {
  return (
    <Card aui={{ color: 'surface-alt' }} aria-label="Input panel">
      <Card.Body>
        <Card.Header>
          <Card.Title>Input</Card.Title>
          <Card.Action>
            {children}
          </Card.Action>
        </Card.Header>
        <Card.Content>
          <Type role="p3" as="p">Panel content.</Type>
        </Card.Content>
      </Card.Body>
    </Card>
  );
}
