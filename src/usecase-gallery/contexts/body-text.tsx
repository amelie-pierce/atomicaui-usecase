import type { ContextProps } from '../types';
import { Button, Icon, Type, View } from '../kit';

// The "No Output Results" warning card: a tonal warning View, the triangle icon at the start and a text column.
// The inline buttons sit inside the sentences; profile no-padding is what makes them hug the text.
export default function BodyTextContext({ children }: ContextProps) {
  return (
    <View
      role="status"
      aui={{ scale: 'sm', color: 'warning', paint: 'tonal', shape: 'soft', profile: 'default', sx: { display: 'flex', alignItems: 'start', gap: '8' } }}
      style={{ inlineSize: 'min(100%, 480px)' }}
    >
      <Icon name="triangle-exclamation" aui={{ color: 'warning' }} />
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', flex: 'fill' } }}>
        <Type as="h3" role="l4" weight="bold">No Output Results</Type>
        <Type as="p" role="p3">No product passed all checks for the current inputs.</Type>
        <Type as="p" role="p3" weight="bold">You can try:</Type>
        {children}
        <Type as="p" role="p3" weight="bold">Need help?</Type>
        <Type as="p" role="p3">
          Call 800-000-0000 or submit a feedback{' '}
          <Button
            type="button"
            aui={{ scale: 'sm', profile: 'no-padding', color: 'warning', paint: 'text', sx: { display: 'inline-flex', textDecoration: 'underline' } }}
          >
            Form
          </Button>
          .
        </Type>
      </View>
    </View>
  );
}
