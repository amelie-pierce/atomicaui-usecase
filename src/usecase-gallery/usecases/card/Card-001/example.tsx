import { Card } from '../../../kit';
import { MOCK_IMAGE_SRC } from '../../../mock-data';

export default function Example() {
  return (
    <Card aui={{ paint: 'text', profile: 'equal-padding', scale: 'sm', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none', width: '128', height: '160' } }}>
      <Card.ImageContainer aui={{ paint: 'text', profile: 'no-padding', sx: { width: '96', height: '96', flex: 'none' } }}>
        <Card.Image src={MOCK_IMAGE_SRC} alt="" fit="contain" />
      </Card.ImageContainer>
      <Card.Body aui={{ profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fill', textAlign: 'center' } }}>
        <Card.Title as="span" role="p2" weight="semi-bold" aui={{ sx: { textAlign: 'center', whiteSpace: 'normal' } }}>
          Related product
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
