import type { ContextProps } from '../../../../../types';
import { Chip, Type, View } from '../../../../../kit';

// Feedback attachments (ADM FeedbackDialog.tsx; PFD, PBS, HS, AGPD and RWS write the same Chip): every attached file is a default Chip with its name and a dismiss X, in a wrapping row with gap 8 above the upload area.
export default function AdmAttachmentsScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <Type as="span" role="l4">Attach Screenshot or Markups</Type>
      <View aui={{ paint: 'text', sx: { display: 'flex', flexWrap: 'wrap', gap: '8' } }}>
        {children}
        <Chip>
          <Chip.Label>markup.pdf</Chip.Label>
          <Chip.Dismiss aria-label="Remove markup.pdf" />
        </Chip>
      </View>
    </View>
  );
}
