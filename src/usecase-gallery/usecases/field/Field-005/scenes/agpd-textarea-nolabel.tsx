import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The notes box of the quote dialog of AGPD (src/agpd/QuoteDialog.tsx): a Field holding only a Field.Textarea, named by its aria-label and placeholder, with no Field.Label.
// Left out: the other fields of the quote form; the app shows the field enabled.
export default function AgpdScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm' }}>
        <Field.Textarea rows={4} placeholder="Add project notes" aria-label="Add project notes" />
      </Field>
    </View>
  );
}
