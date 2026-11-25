import type { ContextProps } from '../../../../../types';
import { IconButton, Type, View } from '../../../../../kit';

// AGPD dealer contact under the quote form (src/agpd/QuoteDialog.tsx, DealerContact formEnd): the text "Need help?" with the phone IconButton (primary solid pill, a link to the dealer phone) after it, at the end of the column.
export default function AgpdDealerContactScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '8' } }} style={{ inlineSize: 'min(100%, 288px)' }}>
      <Type as="span" role="p3">
        Need help? 1-800-000-0000
      </Type>
      <IconButton name="phone" aria-label="Call dealer" render={<a href="tel:18000000000" />} aui={{ color: 'primary', paint: 'solid', shape: 'pill' }} />
    </View>
  );
}
