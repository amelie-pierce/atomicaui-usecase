import type { ContextProps } from '../../../../../types';
import { Chip, Type, View } from '../../../../../kit';

// ADM FeedbackDialog (src/features/top-navigation/components/FeedbackDialog.tsx; PFD, PBS, HS, AGPD and RWS write the same attachment block): the attached files are Chips (Chip-005) above a multiple FileUpload, then the muted limits line. The dropzone is the example; the rest of the form is left out.
export default function AdmAttachmentsScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <View aui={{ paint: 'text', sx: { display: 'flex', flexWrap: 'wrap', gap: '8' } }}>
        <Chip>
          <Chip.Label>screenshot.png</Chip.Label>
          <Chip.Dismiss aria-label="Remove screenshot.png" />
        </Chip>
      </View>
      {children}
      <Type as="p" role="p3">Up to 5 files, 10 MB each.</Type>
    </View>
  );
}
