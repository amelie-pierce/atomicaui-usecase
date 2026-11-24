import type { ContextProps } from '../../../../../types';
import { Icon, Type, View } from '../../../../../kit';

// HcsNoOutputResults cut to its heading and the "You can try:" list: a tonal warning View with the triangle icon at the start and a text
// column (the app's `.hcs-no-output-steps` restores the disc markers, here an inline listStyle). The inline button sits inside its list
// item. The app adds the one-line explanation and the "Need help?" paragraph with the phone link and the Form button.
export default function BodyTextContext({ children }: ContextProps) {
  return (
    <View
      role="status"
      aui={{ scale: 'sm', profile: 'default', color: 'warning', paint: 'tonal', shape: 'soft', sx: { display: 'flex', alignItems: 'center', textAlign: 'start' } }}
      style={{ inlineSize: 'min(100%, 400px)' }}
    >
      <Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
      <View aui={{ scale: 'sm', profile: 'no-padding', color: 'warning', paint: 'text', sx: { display: 'flex', flexDirection: 'column', minWidth: '0' } }}>
        <Type as="h3" role="l4" weight="semi-bold">No Output Results</Type>
        <Type role="l4" weight="semi-bold">You can try:</Type>
        <View as="ul" aui={{ scale: 'sm', profile: 'no-padding', color: 'warning', paint: 'text', sx: { paddingInlineStart: '24' } }} style={{ listStyle: 'disc' }}>
          <li>
            {children}
          </li>
        </View>
      </View>
    </View>
  );
}
