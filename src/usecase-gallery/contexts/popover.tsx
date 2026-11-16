import type { ContextProps } from '../types';
import { Card, Popover, Type } from '../kit';

export default function PopoverContext({ children, host }: ContextProps) {
  return (
    <Popover open>
      <Popover.Portal container={host}>
        <Popover.Positioner anchor={host}>
          <Popover.Popup initialFocus={false}>
            <Card aui={{ color: 'surface-alt', elevation: 2 }} aria-label="Column configurator">
              <Card.Body>
                <Card.Content>
                  <Type role="p3" as="p">Configure the columns shown in the table.</Type>
                </Card.Content>
                <Card.Footer>
                  {children}
                </Card.Footer>
              </Card.Body>
            </Card>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
  );
}
