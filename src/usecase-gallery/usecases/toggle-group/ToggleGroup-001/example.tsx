import { Button, Field, ToggleGroup, Type, View } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
      <Field.Label id="units-label">Units</Field.Label>
      <ToggleGroup value={['metric']} multiple={false} aria-labelledby="units-label">
        {[['metric', 'Metric'], ['imperial', 'Imperial']].map(([option, content]) => (
          <ToggleGroup.Item
            key={option}
            value={option}
            render={(props, state) => (
              <Button
                {...props}
                aui={{ color: 'surface', paint: 'text', scale: 'xs', shape: 'none', sx: { flex: 'fill', minWidth: '0', paddingInlineStart: '0', paddingInlineEnd: '0', paddingBlockStart: '0', paddingBlockEnd: '0' } }}
              >
                <View
                  as="span"
                  aui={{
                    color: state.pressed ? 'secondary' : 'surface',
                    paint: state.pressed ? 'solid' : 'text',
                    scale: 'xs',
                    shape: state.pressed ? 'soft' : 'none',
                    sx: { flex: 'fill', minWidth: '0', lineHeight: '16', paddingBlockStart: '3', paddingBlockEnd: '3' },
                  }}
                >
                  <Type as="span" role="l5" weight="medium">
                    {content}
                  </Type>
                </View>
              </Button>
            )}
          />
        ))}
      </ToggleGroup>
    </Field>
  );
}
