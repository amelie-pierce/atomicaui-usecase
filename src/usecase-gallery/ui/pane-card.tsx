import type { ReactNode } from 'react';
import { Card } from '../kit';

interface PaneCardProps {
  /** Heading text; also names the card for assistive tech. */
  title: string;
  /** Unique within the page; labels the card and anchors the heading. */
  id: string;
  /** Heading level of the title (the tree owns the page's h1). */
  as?: 'h1' | 'h2';
  /** Optional trailing control in the header, e.g. the copy button. */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** The one card every pane is built from, so padding, radius, border, header and spacing are identical. */
export function PaneCard({ title, id, as = 'h2', action, className, children }: PaneCardProps) {
  return (
    <Card
      aui={{ color: 'surface' }}
      className={className ? `ug-card ${className}` : 'ug-card'}
      role="region"
      aria-labelledby={id}
    >
      <Card.Body className="ug-card__body">
        <Card.Header className="ug-card__header">
          <Card.Title as={as} id={id}>
            {title}
          </Card.Title>
          {action && <Card.Action>{action}</Card.Action>}
        </Card.Header>
        <Card.Content className="ug-card__content">{children}</Card.Content>
      </Card.Body>
    </Card>
  );
}
