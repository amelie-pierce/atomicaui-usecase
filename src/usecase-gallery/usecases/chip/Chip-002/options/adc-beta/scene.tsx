import type { ContextProps } from '../../../../../types';
import { Chip, Icon, Type, View } from '../../../../../kit';

// ADC Workspace beta notice (src/adc/Workspace.tsx): a warning solid banner whose first item is the compact soft Chip (secondary, solid, xs), then the triangle-exclamation Icon and the message.
export default function AdcBetaScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <View role="region" aria-label="Beta release notice" aui={{ color: 'warning', paint: 'solid', profile: 'default', scale: 'sm', sx: { display: 'flex', alignItems: 'center' } }}>
        {children}
        <Icon name="triangle-exclamation" aria-hidden="true" aui={{ scale: 'md' }} />
        <Type as="span" role="l3" weight="regular">
          <Type as="strong" role="l3" weight="bold">Beta Release:</Type> We are actively refining this application.
        </Type>
      </View>
    </View>
  );
}
