import type { ContextProps } from '../../../../types';
import { Card, ContainedImage, View } from '../../../../kit';
import { MOCK_IMAGE_SRC } from '../../../../mock-data';

// HCS HcsBeamTypeSelect (src/components/HcsBeamTypeSelect.tsx): the Type Combobox in the Input pane; while its list is open, the highlighted option previews in a Card (Card-003) in a Popover to the side of the list (side right, 8px offset). The scene sets the Card in a row beside the open list instead of a floating Popover.
export default function HcsBeamTypeScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'start', gap: '8' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 32))' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: '224', flex: 'none' } }}>
        {children}
      </View>
      <Card aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { width: '224', marginBlockStart: '64' } }}>
        <Card.Body aui={{ scale: 'sm' }}>
          <Card.Title>Glulam</Card.Title>
          <ContainedImage src={MOCK_IMAGE_SRC} alt="Generic illustration of Glulam" fit="contain" ratio="4:3" />
        </Card.Body>
      </Card>
    </View>
  );
}
