import { Card } from '../../../kit';
import { MOCK_IMAGE_SRC } from '../../../mock-data';

export default function Example() {
  return (
    <Card aui={{ paint: 'text', profile: 'no-padding', scale: 'sm', shape: 'soft', sx: { width: '96', height: '96' } }}>
      <Card.ImageContainer aui={{ profile: 'no-padding', sx: { width: 'fill', height: 'fill' } }}>
        <Card.Image src={MOCK_IMAGE_SRC} alt="Application" fit="contain" ratio="1:1" />
      </Card.ImageContainer>
    </Card>
  );
}
