import { Checkbox, Chip, Field, Radio, RadioGroup, Table, Type, View } from './kit';

// The only mock values the In context scenes use: simple placeholders in hcs wording, no real data.

export const MOCK_PRODUCTS = [
  { model: 'Model A-100', maker: 'Maker One', status: 'Pass', load: '2,450 lb', failed: false },
  { model: 'Model B-200', maker: 'Maker Two', status: 'Pass', load: '2,210 lb', failed: false },
  { model: 'Model C-300', maker: 'Maker Three', status: 'Fail', load: '1,180 lb', failed: true },
];

export const MOCK_WHY_NOT = 'Bearing length is below the minimum for this beam size.';

export const MOCK_BEAM = {
  supporting: 'Supporting Beam',
  supported: 'Supported Beam',
  species: 'Species A',
  type: 'Type A',
  specificGravity: '0.50',
  fcPerp: '565',
  width: '3.5 in',
};

export const MOCK_COLUMNS = [
  { name: 'Model', on: true },
  { name: 'Maker', on: true },
  { name: 'Capacity', on: true },
  { name: 'Status', on: false },
];


// The HCS Output columns (productCheck.ts `outputColumns`): Model is locked in the configurator, the rest can be hidden.
export const MOCK_OUTPUT_COLUMNS = [
  { id: 'model', header: 'Model', hideable: false },
  { id: 'status', header: 'Status', hideable: true },
  { id: 'load', header: 'Load (lb)', hideable: true },
  { id: 'lateral', header: 'Lateral (Tension) (lb)', hideable: true },
  { id: 'plateThickness', header: 'Plate Thickness (PT) (in.)', hideable: true },
  { id: 'plateDepth', header: 'Plate Depth (PD) (in.)', hideable: true },
  { id: 'rotationBolt', header: 'Rotation Bolt (Qty) (Total)', hideable: true },
  { id: 'lateralBolt', header: 'Lateral Bolt (Qty) (Total)', hideable: true },
  { id: 'machineBoltSize', header: 'Machine Bolt Size (Dia x Length) (in.)', hideable: true },
];

// Result rows after the Load column menu sorts A to Z (smallest to largest): the table follows the menu's choice.
export const MOCK_OUTPUT_ROWS_BY_LOAD = [
  { model: 'Model C-300', status: 'Failed', load: '1,180', lateral: '620' },
  { model: 'Model B-200', status: 'Passed', load: '2,210', lateral: '1,040' },
  { model: 'Model A-100', status: 'Passed', load: '2,450', lateral: '1,180' },
];

// The Download Duration notes the help popover lists (HcsDownloadDurationHelp.tsx `durationNotes`).
export const MOCK_DURATION_NOTES = [
  ['Dead 90', '90% of design load. (Permanent)'],
  ['Floor 100', 'no increase for duration of load'],
  ['Snow 115', '115% of design load for 2 month duration of load.'],
  ['Roof 125', '125% of design load for 7 day duration of load.'],
  ['Quake/Wind 160', '160% of design load for earthquake/wind loading.'],
];

// Scenery components: the snippet shows each `<Mock... />` as a one-line placeholder (see catalog/snippet.ts).

/** A few sample result rows under an Output header: model name, maker, a status chip. */
export function MockResultsBody() {
  return (
    <View aui={{ color: 'surface', paint: 'solid', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}>
      <Table aria-label="Sample results" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Capacity</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {MOCK_PRODUCTS.map((row) => (
            <Table.Row key={row.model}>
              <Table.Cell>{row.model}</Table.Cell>
              <Table.Cell>{row.load}</Table.Cell>
              <Table.Cell>
                <Chip aui={{ scale: 'sm', color: row.failed ? 'error' : 'success' }}>{row.status}</Chip>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </View>
  );
}

/** A labelled closed select, the shape of the Input pane's selects. */
export function MockSelectField({ label, value, disabled }: { label: string; value: string; disabled?: boolean }) {
  return (
    <Field aui={{ scale: 'sm' }} disabled={disabled}>
      <Field.Label>{label}</Field.Label>
      <Field.Select defaultValue={value} items={[{ value, label: value }]}>
        <Field.SelectTrigger />
      </Field.Select>
    </Field>
  );
}

/** The viewer's camera and visibility controls under Reset view: two radios, a heading, four checkboxes. */
export function MockViewerControls() {
  return (
    <>
      <RadioGroup aria-label="Projection" defaultValue="perspective" aui={{ scale: 'sm' }}>
        <Radio value="perspective"><Radio.Label>Perspective</Radio.Label></Radio>
        <Radio value="orthographic"><Radio.Label>Orthographic</Radio.Label></Radio>
      </RadioGroup>
      <Type as="h3" role="l3" weight="bold">Object Visibility</Type>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '2' } }}>
        {['Supporting Beam', 'Supported Beam', 'Connector', 'Connector Detail'].map((name) => (
          <Checkbox key={name} defaultChecked aui={{ scale: 'sm' }}>
            <Checkbox.Label>{name}</Checkbox.Label>
          </Checkbox>
        ))}
      </View>
    </>
  );
}

// The 24 numbered paragraphs of the hcs licence text (F01Experience.tsx); the real app enables Accept at the end.
export function MockLicenceText() {
  return (
    <>
      {Array.from({ length: 24 }, (_, i) => (
        <Type aui={{ sx: { flex: 'none' } }} key={i} role="p2">
          {i + 1}. This is demonstration license text for the HCS usability prototype. All product information and calculated capacities are mock values. Review the terms with your organization before using engineering software. By accepting, you agree to use this prototype for evaluation and QA walkthroughs only.
        </Type>
      ))}
    </>
  );
}
