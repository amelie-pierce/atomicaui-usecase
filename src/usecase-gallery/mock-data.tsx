import type { ReactNode } from 'react';
import { Accordion, Field, Menubar, Radio, RadioGroup, Symbol, Type, View } from './kit';

// The only mock values the In context scenes use: the least sample content that shows the container, in hcs wording.

// The HCS Output columns (productCheck.ts `outputColumns`), cut to the three the Configure columns scene lists: Model is locked, the rest can be hidden.
export const MOCK_OUTPUT_COLUMNS = [
  { id: 'model', header: 'Model', hideable: false },
  { id: 'status', header: 'Status', hideable: true },
  { id: 'load', header: 'Load (lb)', hideable: true },
];

// Result rows after the Load column menu sorts A to Z (smallest to largest): the table follows the menu's choice.
export const MOCK_OUTPUT_ROWS_BY_LOAD = [
  { model: 'Model C-300', load: '1,180' },
  { model: 'Model B-200', load: '2,210' },
];

// The Download Duration notes the help popover lists (HcsDownloadDurationHelp.tsx `durationNotes`), cut to two.
export const MOCK_DURATION_NOTES = [
  ['Dead 90', '90% of design load. (Permanent)'],
  ['Snow 115', '115% of design load for 2 month duration of load.'],
];

// Scenery components: the snippet shows each `<Mock... />` as a one-line placeholder (see catalog/snippet.ts).

const viewerRadio = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;

/** The viewer's camera projection radios (App.tsx `f02-controls`, Perspective selected), shown in the View options popup. */
export function MockViewerControls() {
  return (
    <RadioGroup className="ug-scene__projections" aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
      <Radio value="perspective" aui={viewerRadio}><Radio.Label>Perspective</Radio.Label></Radio>
      <Radio value="orthographic" aui={viewerRadio}><Radio.Label>Orthographic</Radio.Label></Radio>
    </RadioGroup>
  );
}

/** The 3D canvas stand-in: the app draws the beams and connector with three.js, which the kit has no part for. */
export function MockViewerCanvas() {
  return (
    <View aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default', sx: { display: 'flex', alignItems: 'end', justifyContent: 'start', flex: 'fill' } }} style={{ borderStyle: 'dashed' }}>
      <Type role="l4" color="muted">3D canvas (drawn live in the app)</Type>
    </View>
  );
}

// Two of the 24 numbered paragraphs of the hcs licence text (F01Experience.tsx); the real app enables Accept at the end.
export function MockLicenceText() {
  return (
    <>
      {[1, 2].map((n) => (
        <Type aui={{ sx: { flex: 'none' } }} key={n} role="p2">
          {n}. This is demonstration license text for the HCS usability prototype. All product information and calculated capacities are mock values.
        </Type>
      ))}
    </>
  );
}

// The page under the tour: the collapsed target the step points at and the spotlight around it (4px outside the target, as
// F01Walkthrough measures it). Positions are fixed numbers in the `.ug-tour` frame (the app measures them at run time).
const TOUR_TARGETS = {
  connection: { left: 12, top: 12, width: 200, height: 44 },
  beams: { left: 12, top: 12, width: 200, height: 44 },
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
          <Accordion aui={{ scale: 'sm' }}>
            <Accordion.Item value={target === 'beams' ? 'Beam Properties' : 'Connection Type'} aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
              <Accordion.Header>
                <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                  <Accordion.Icon name={target === 'beams' ? 'layer-group' : 'link'} weight="regular" aria-hidden />
                  <Type role="l4" weight="semi-bold">{target === 'beams' ? 'Beam Properties' : 'Connection Type'}</Type>
                  <Accordion.Chevron />
                </Accordion.Trigger>
              </Accordion.Header>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
      <div className="ug-tour__spotlight" style={{ left: left - 4, top: top - 4, width: width + 8, height: height + 8 }} aria-hidden="true" />
    </>
  );
}

// The Input pane fields (App.tsx `NumberField` and HcsSelectbox.tsx): a Field with a 28px control; static, with the value shown.
const inputControl = { scale: 'sm', sx: { height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', paddingInlineStart: '8', paddingInlineEnd: '8', fontSize: '16', lineHeight: '20' } } as const;

/** A numeric Input field with its unit suffix. */
export function MockNumberField({ label, value, unit, disabled }: { label: ReactNode; value: string; unit: string; disabled?: boolean }) {
  return (
    <Field disabled={disabled} aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>{label}</Field.Label>
      <Field.Control aui={inputControl} aria-label={typeof label === 'string' ? label : undefined} defaultValue={value}>
        <Symbol>{unit}</Symbol>
      </Field.Control>
    </Field>
  );
}
