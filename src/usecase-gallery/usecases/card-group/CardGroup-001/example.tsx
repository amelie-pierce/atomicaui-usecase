import { CardGroup } from '../../../kit';
import { MOCK_IMAGE_SRC } from '../../../mock-data';

export default function Example() {
  return (
    <CardGroup defaultValue="template-1">
      <CardGroup.Label aui={{ sx: { typographyStyle: 'semi-bold' } }}>User Templates</CardGroup.Label>
      <CardGroup.Toolbar>
        <CardGroup.Search placeholder="Search template" />
        <CardGroup.ViewToggle />
      </CardGroup.Toolbar>
      <CardGroup.Items columns={2} aui={{ scale: 'sm', profile: 'no-padding', sx: { gap: '0' } }}>
        {['Template 1', 'Template 2'].map((name, index) => (
          <CardGroup.Item
            key={name}
            value={`template-${index + 1}`}
            textValue={name}
            aui={{
              shape: 'none',
              states: {
                unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
                selected: { color: 'primary', paint: 'tonal', sx: { background: 'surface', foreground: 'on-surface' } },
              },
            }}
          >
            <CardGroup.ItemImage src={MOCK_IMAGE_SRC} alt="" ratio="4:3" />
            <CardGroup.ItemBody>
              <CardGroup.ItemTitle aui={{ sx: { textAlign: 'center' } }}>{name}</CardGroup.ItemTitle>
            </CardGroup.ItemBody>
          </CardGroup.Item>
        ))}
      </CardGroup.Items>
      <CardGroup.Empty>No templates match your search</CardGroup.Empty>
    </CardGroup>
  );
}
