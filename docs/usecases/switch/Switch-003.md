# Switch-003: Switch with bordered off state

Component family: **Switch**

UI type: **Switch**

Source: `src/usecase-gallery/usecases/switch/Switch-003/usecase.ts`

## What it is

A switch at the end of a form row, with the row's name at the start, turns the setting on or off; its off state is a white track with a thin border.

## When to choose it

Use it for an on and off choice that applies at once in the rows of a form, where the row text is the label and the switches line up at one edge, and the off switch needs a visible outline on a white panel. For a pale off track, see Switch-001.

## Where it belongs

ADM load conditions in the input panel: three rows, each a Type l5 name with a help icon at the start and a Switch at the end.

## Usage guidance

A row View (flex, centred, space between, fill width, gap 8) holds the name in a Type role "l5" (bold, 12px) and a Switch with an aria-label equal to the name and no Switch.Label, with the shared toggle states (unselected tonal surface with an outlined border, selected primary solid). The gallery scene, measured in headless Chromium, shows off as an rgb(255,255,255) track with a 1px rgb(148,163,184) border and the thumb at x=5, on as the rgb(255,83,8) fill, 44 by 22px. The app was not run; its props and states are read from the app source. The name is a separate Type, so a click on it does not toggle. The scene shows the switch on and enabled and leaves out the help icon (the Field help trigger) and the server error line that one of the rows shows under it.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Accordion`, `List`, `Switch`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `primary`, `surface`, `surface-alt`
- `paint`: `fixed`, `solid`, `text`, `tonal`
- `shape`: `none`, `soft`
- `scale`: `sm`
- `profile`: `default`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **List** — The "Load conditions" list of the ADM input panel, three rows each with a name and a switch. Selector: `[class~="aui-list"]`. Layer step: **List** — Load conditions list pairs each load name with a switch.
2. **Row** — The Wind load row with the name at the start and its switch at the end. Selector: `[class~="aui-list-item"]`. Layer step: **Row** — Wind load row places its switch after the label.
3. **Row text** — The condition name "Wind load". Selector: `[class~="aui-list-item-text"]`. Layer step: **Row text** — Wind load label names this input switch row.
4. **Row actions** — The slot at the end of the row that holds the switch. Selector: `[class~="aui-list-item-actions"]`. Layer step: **Row actions** — The slot at the end of the row that holds the switch.
5. **Switch** — The off-by-default control whose unselected track is a surface-tonal white fill with a thin outlined border; selected it is solid primary. Selector: `[class~="aui-switch"]`. Layer step: **Switch** — Off track is white and outlined; on track is solid primary.
6. **Thumb** — The thumb at the start of the white track while the load is off. Selector: `[class~="aui-switch-thumb"]`. Layer step: **Thumb** — Thumb rests at the left edge while the load is off. Code target: `Switch`.

## Apps

- ADM (`adm`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Load conditions (`adm-loads`)

Apps: ADM

In context source: ADM: `src/features/design-inputs/components/LoadsSection/LoadConditionsFields.tsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The Input side pane (an aside, soft, surface-alt) that holds the form sections. Part marker: `data-ug-part="input-pane"`. Layer step: **Input pane** — Soft Input side pane holds the form sections.
2. **Load conditions section** — The Accordion item, open, that groups the load condition rows. Part marker: `data-ug-part="section"`. Layer step: **Load conditions section** — The Accordion item, open, that groups the load condition rows.
3. **Section header** — The Load conditions trigger, a semi-bold l4 label with a chevron, that collapses the section. Part marker: `data-ug-part="section-title"`. Layer step: **Section header** — Semi-bold Load conditions trigger expands or collapses the section.

#### Component UI source — `src/usecase-gallery/usecases/switch/Switch-003/example.tsx`

```tsx
import { List, Switch } from '../../../kit';

export default function Example() {
  return (
    <List aria-label="Load conditions">
      <List.Item id="wind">
        <List.ItemText>Wind load</List.ItemText>
        <List.ItemActions>
          <Switch aria-label="Wind load" aui={{ states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }} />
        </List.ItemActions>
      </List.Item>
    </List>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/switch/Switch-003/options/adm-loads/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

export default function AdmLoadsScene({ children }: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="aside" aria-label="Input" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 17.5))' }}>
      <Accordion defaultValue={['Load conditions']} aui={{ scale: 'sm' }}>
        <Accordion.Item data-ug-part="section" value="Load conditions" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
          <Accordion.Header>
            <Accordion.Trigger data-ug-part="section-title" aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type role="l4" weight="semi-bold">Load conditions</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            {children}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
