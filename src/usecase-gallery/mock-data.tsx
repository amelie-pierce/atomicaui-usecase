import { Accordion, Checkbox, Chip, Field, Menubar, Radio, RadioGroup, Table, Type, View } from './kit';

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

// Result rows of the Output table (F01Results.tsx): one value per Output column, in `MOCK_OUTPUT_COLUMNS` order.
// `checks` are the Width, Depth, Lateral and Download results the Why Not tabs report; a failed row has at least one false.
export const MOCK_RESULT_ROWS = [
  { id: 'a', model: 'Model A-100', passed: true, checks: [true, true, true, true], cells: ['2,450', '1,180', '0.25', '3.500', '4', '6', '0.50 x 4.0'] },
  { id: 'b', model: 'Model B-200', passed: true, checks: [true, true, true, true], cells: ['2,210', '1,040', '0.25', '4.750', '4', '4', '0.50 x 5.0'] },
  { id: 'c', model: 'Model C-300', passed: false, checks: [true, false, true, false], cells: ['1,180', '620', '0.19', '3.250', '2', '4', '0.38 x 3.5'] },
];

// The Why Not tab texts of the failed row (engine.ts `why`, productCheck.ts `checkDetail`): the Connection tab, then one tab
// per check. Lateral and Download add muted lines of the form `P<script> (<unit>): value`.
export const MOCK_WHY_NOT_TABS = [
  { name: 'Connection', passed: false, text: 'Fails: Depth, Download.', values: [] },
  { name: 'Width', passed: true, text: 'Connector fits 3 1/2 in. beams. Your beam is 3 1/2 in.', values: [] },
  { name: 'Depth', passed: false, text: "Required height 9.250 in. is outside this connector's range (3.000 \u2013 8.000 in.).", values: [] },
  { name: 'Lateral', passed: true, text: 'Maximum lateral capacity is 620 lb. Demand is 500 lb.', values: [{ script: 'lateral', unit: 'lb', value: '620' }] },
  {
    name: 'Download',
    passed: false,
    text: 'Maximum download capacity is 1,180 lb. Demand is 2,000 lb.',
    values: [
      { script: 'pear', unit: 'lb', value: '1,420' },
      { script: 'rot', unit: 'lb', value: '1,180' },
      { script: 'download', unit: 'lb', value: '1,180' },
    ],
  },
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

// The page under the tour: the target the step points at and the spotlight around it (4px outside the target, as
// F01Walkthrough measures it). Positions are fixed numbers in the `.ug-tour` frame (the app measures them at run time).
const TOUR_TARGETS = {
  connection: { left: 12, top: 12, width: 200, height: 44 },
  beams: { left: 12, top: 12, width: 200, height: 96 },
  file: { left: 484, top: 12, width: 56, height: 28 },
};

/** The page element a walkthrough step highlights, with its spotlight. */
export function MockTourTarget({ target }: { target: keyof typeof TOUR_TARGETS }) {
  const { left, top, width, height } = TOUR_TARGETS[target];
  return (
    <>
      <div className="ug-tour__target" style={{ left, top, width, height }}>
        {target === 'file' ? (
          <Menubar aria-label="Main navigation" aui={{ scale: 'sm' }}>
            <Menubar.Dropdown aui={{ scale: 'sm' }}>
              <Menubar.DropdownTrigger aui={{ scale: 'sm' }}>File</Menubar.DropdownTrigger>
            </Menubar.Dropdown>
          </Menubar>
        ) : (
          <Accordion defaultValue={target === 'beams' ? ['Beam Properties'] : []} aui={{ scale: 'sm' }}>
            <Accordion.Item value={target === 'beams' ? 'Beam Properties' : 'Connection Type'} aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
              <Accordion.Header>
                <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                  <Accordion.Icon name={target === 'beams' ? 'layer-group' : 'link'} weight="regular" aria-hidden />
                  <Type role="l4" weight="semi-bold">{target === 'beams' ? 'Beam Properties' : 'Connection Type'}</Type>
                  <Accordion.Chevron />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel aui={{ profile: 'default' }}>
                <Type as="h3" weight="semi-bold">Supporting Beam</Type>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
      <div className="ug-tour__spotlight" style={{ left: left - 4, top: top - 4, width: width + 8, height: height + 8 }} aria-hidden="true" />
    </>
  );
}
