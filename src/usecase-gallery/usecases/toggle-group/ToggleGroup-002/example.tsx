import { Button, ToggleGroup, Type, View } from '../../../kit';

export default function Example() {
  return (
    <ToggleGroup aria-label="Fastener" aui={{ paint: 'text' }} value={['2']} multiple={false}>
      {[['2', 'STN22'], ['11', 'SDWB']].map(([value, text]) => (
        <ToggleGroup.Item
          key={value}
          value={value}
          render={(props, state) => (
            <Button
              {...props}
              aui={{ color: 'surface', paint: 'text', scale: 'xs', shape: 'none', sx: { paddingInlineStart: '0', paddingInlineEnd: '0', paddingBlockStart: '0', paddingBlockEnd: '0' } }}
            >
              <View
                as="span"
                aui={{
                  color: state.pressed ? 'secondary' : 'surface',
                  paint: state.pressed ? 'solid' : 'text',
                  scale: 'xs',
                  shape: state.pressed ? 'soft' : 'none',
                  sx: { lineHeight: '16', paddingBlockStart: '3', paddingBlockEnd: '3', paddingInlineStart: '6', paddingInlineEnd: '6' },
                }}
              >
                <Type as="span" role="l5" weight="medium">
                  {text}
                </Type>
              </View>
            </Button>
          )}
        />
      ))}
    </ToggleGroup>
  );
}
