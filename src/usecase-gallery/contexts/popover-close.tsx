import type { ContextProps } from '../types';
import { Card, Popover, Type } from '../kit';

export default function PopoverCloseContext({ children, host }: ContextProps) {
  return (
    <Popover open>
      <Popover.Portal container={host}>
        <Popover.Positioner anchor={host}>
          <Popover.Popup initialFocus={false}>
            <Card aui={{ color: 'surface-alt', elevation: 2 }} aria-label="Column configurator">
              <Card.Body>
                <Card.Header>
                  <Card.Title>Help</Card.Title>
                  <Card.Action>
                    {children}
                  </Card.Action>
                </Card.Header>
                <Card.Content>
                  <Type role="p3" as="p">Configure the columns shown in the table.</Type>
                </Card.Content>
              </Card.Body>
            </Card>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
  );
}
