import type { ContextProps } from '../types';
import { Button, Icon, Type, View } from '../kit';

// HcsNoOutputResults: the guidance the Output table shows when no product passed. A tonal warning View with the triangle icon at the
// start and a text column: heading, one line, "You can try:" with a bulleted list (the app's `.hcs-no-output-steps` restores the disc
// markers, here an inline listStyle), then "Need help?" with the phone link and the inline Form button. The two inline buttons share one
// recipe (underlined, no-padding, warning) and sit inside their sentences. In the app the card is sticky inside the table's scroll area.
export default function BodyTextContext({ children }: ContextProps) {
  return (
    <View
      role="status"
      aui={{ scale: 'sm', profile: 'default', color: 'warning', paint: 'tonal', shape: 'soft', sx: { display: 'flex', alignItems: 'center', textAlign: 'start' } }}
      style={{ inlineSize: 'min(100%, 480px)' }}
    >
      <Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
      <View aui={{ scale: 'sm', profile: 'no-padding', color: 'warning', paint: 'text', sx: { display: 'flex', flexDirection: 'column', minWidth: '0' } }}>
        <Type as="h3" role="l4" weight="semi-bold">No Output Results</Type>
        <Type role="l4">There are no results based upon the input parameters.</Type>
        <Type role="l4" weight="semi-bold">You can try:</Type>
        <View as="ul" aui={{ scale: 'sm', profile: 'no-padding', color: 'warning', paint: 'text', sx: { paddingInlineStart: '24' } }} style={{ listStyle: 'disc' }}>
          <li>Adjusting one or more input values</li>
          <li>
            {children}
          </li>
        </View>
        <Type role="l4" weight="semi-bold">Need help?</Type>
        <Type role="l4">
          Call{' '}
          <Type as="a" href="tel:8009995099" aui={{ sx: { textDecoration: 'underline' } }}>800-999-5099</Type>{' '}
          and ask for Engineering for personal assistance. Alternatively, submit a feedback{' '}
          <Button type="button" aui={{ scale: 'sm', profile: 'no-padding', color: 'warning', paint: 'text', sx: { display: 'inline-flex', textDecoration: 'underline' } }}>
            Form
          </Button>
        </Type>
      </View>
    </View>
  );
}
