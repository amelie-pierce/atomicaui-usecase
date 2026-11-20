import { Card, ContainedImage } from '../../../kit';
import { MOCK_IMAGE_SRC } from '../../../mock-data';

export default function Example() {
  return (
    <Card aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { width: '224' } }}>
      <Card.Body aui={{ scale: 'sm' }}>
        <Card.Title>Glulam</Card.Title>
        <ContainedImage src={MOCK_IMAGE_SRC} alt="Generic illustration of Glulam" fit="contain" ratio="4:3" />
      </Card.Body>
    </Card>
  );
}
