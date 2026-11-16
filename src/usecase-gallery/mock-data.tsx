import { Chip, Table, View } from './kit';

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
