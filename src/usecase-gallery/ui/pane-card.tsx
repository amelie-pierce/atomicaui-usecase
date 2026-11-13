import type { ReactNode } from 'react';
import { Card } from '../kit';

interface PaneCardProps {
  /** Names the card for assistive tech; there is no visible header. */
  label: string;
  className?: string;
  children: ReactNode;
}

/** The one card every pane is built from, so padding, radius, border and spacing are identical. */
export function PaneCard({ label, className, children }: PaneCardProps) {
  return (
    <Card
      aui={{ color: 'surface' }}
      className={className ? `ug-card ${className}` : 'ug-card'}
      role="region"
      aria-label={label}
    >
      <Card.Body className="ug-card__body">
        <Card.Content className="ug-card__content">{children}</Card.Content>
      </Card.Body>
    </Card>
  );
}
