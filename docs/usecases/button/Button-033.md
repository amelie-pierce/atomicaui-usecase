# Button-033: Collapse all sections button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-033/usecase.ts`

## What it is

A transparent icon-only IconButton collapses every section of the Input pane, and expands them again when all are closed.

## When to choose it

Use it for panel chrome that acts on every section at once; wrap it in a Tooltip with the same text as the aria-label.

## Where it belongs

The end of the HCS Input pane header, after the collapse chevron, the semi-bold title and a Panels.Spacer. Real site source: HCS src/App.tsx. No other app has this control.

## Usage guidance

An IconButton with aui color "secondary", paint "text", scale "sm", shape "soft" and profile "contained" inside a Tooltip with the same text as the aria-label, as the app does for every icon-only button. In context it sits above two accordion sections, both open and empty, so the label and glyph read Collapse all and arrows-to-line; with every section closed they read Expand all and arrows-from-line. The section contents and the Galvanized card are left out. One group, HCS only.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Accordion`, `IconButton`, `Panels`, `Tooltip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `secondary`, `surface`, `surface-alt`
- `paint`: `fixed`, `text`
- `scale`: `sm`
- `shape`: `none`, `soft`
- `profile`: `block-padding`, `contained`, `default`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Collapse all** — The transparent secondary arrows-to-line button (aria-label Collapse all) that folds every Input section; in HCS it is the angle-left Collapse Input button at the start of the header. Selector: `[class~="aui-button"][aria-label^="Collapse"]`.
2. **Icon** — The arrows-to-line glyph, which becomes expand when all sections are closed. Selector: `[class~="aui-button"][aria-label^="Collapse"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Tooltip** — The Collapse Input label shown below the button in the HCS panel header. Selector: `[class~="aui-tooltip-popup"]`.
4. **Section** — The Connection Type and Load Properties sections of the Input pane that the button collapses or expands together. Selector: `[class~="aui-accordion-item"]`.
5. **Section trigger** — The header row of each section with its icon, semi-bold name and chevron. Selector: `[class~="aui-accordion-trigger"]`.

## Component layer steps

1. **Collapse all** — The transparent secondary arrows-to-line button (aria-label Collapse all) that folds every Input section; in HCS it is the angle-left Collapse Input button at the start of the header. Selector: `[class~="aui-button"][aria-label^="Collapse"]`.
2. **Icon** — The arrows-to-line glyph, which becomes expand when all sections are closed. Selector: `[class~="aui-button"][aria-label^="Collapse"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Tooltip** — The Collapse Input label shown below the button in the HCS panel header. Selector: `[class~="aui-tooltip-popup"]`.
4. **Section** — The Connection Type and Load Properties sections of the Input pane that the button collapses or expands together. Selector: `[class~="aui-accordion-item"]`.
5. **Section trigger** — The header row of each section with its icon, semi-bold name and chevron. Selector: `[class~="aui-accordion-trigger"]`.

## Apps

- HCS (`hcs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Panel header (`hcs-panel-header`)

Apps: HCS

In context source: HCS: `src/App.tsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The surface-alt Input pane that frames the header and the section card. Selector: `[data-ug-part="input-pane"]`.
2. **Collapse Input** — The angle-left button at the start of the header that collapses the whole pane, with its Collapse Input tooltip. Selector: `[class~="aui-button"][aria-label="Collapse Input"]`.
3. **Pane title** — The semi-bold Input heading in the header, before the spacer and Collapse all. Selector: `[data-ug-part="pane-title"]`.

#### In context layer steps

1. **Input pane** — The surface-alt Input pane that frames the header and the section card. Selector: `[data-ug-part="input-pane"]`.
2. **Collapse Input** — The angle-left button at the start of the header that collapses the whole pane, with its Collapse Input tooltip. Selector: `[class~="aui-button"][aria-label="Collapse Input"]`.
3. **Pane title** — The semi-bold Input heading in the header, before the spacer and Collapse all. Selector: `[data-ug-part="pane-title"]`.
4. **Collapse all** — The transparent secondary arrows-to-line button (aria-label Collapse all) that folds every Input section; in HCS it is the angle-left Collapse Input button at the start of the header. Selector: `[class~="aui-button"][aria-label^="Collapse"]`.
5. **Icon** — The arrows-to-line glyph, which becomes expand when all sections are closed. Selector: `[class~="aui-button"][aria-label^="Collapse"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
6. **Tooltip** — The Collapse Input label shown below the button in the HCS panel header. Selector: `[class~="aui-tooltip-popup"]`.
7. **Section** — The Connection Type and Load Properties sections of the Input pane that the button collapses or expands together. Selector: `[class~="aui-accordion-item"]`.
8. **Section trigger** — The header row of each section with its icon, semi-bold name and chevron. Selector: `[class~="aui-accordion-trigger"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-033/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return <IconButton name="arrows-to-line" aria-label="Collapse all" aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-033/options/hcs-panel-header/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, IconButton, Panels, Tooltip, Type, View } from '../../../../../kit';

// The Input pane cut to its header and two sections, as App.tsx composes it when stacked: pane frame, the 28px header (collapse chevron with
// its tooltip, the semi-bold title, a Panels.Spacer, then Collapse all) and a surface card of flush accordion sections, both open and empty.
export default function HcsPanelHeaderScene({ children }: ContextProps) {
  return (
    <View
      data-ug-part="input-pane"
      as="aside"
      aria-label="Input"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }}
      style={{ inlineSize: 'min(100%, 360px)', blockSize: 200 }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', height: '28', flex: 'none' } }}>
        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger
              render={<IconButton name="angle-left" aria-label="Collapse Input" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />}
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side="bottom" sideOffset={4}>
                <Tooltip.Popup aui={{ scale: 'sm' }}>Collapse Input</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>
        </Tooltip.Provider>
        <Type data-ug-part="pane-title" as="h2" role="l3" weight="semi-bold">Input</Type>
        <Panels.Spacer />
        {children}
      </View>
      <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '0' } }}>
        <Accordion openMultiple aui={{ scale: 'sm' }}>
          {[['Connection Type', 'link'], ['Load Properties', 'arrow-down']].map(([name, icon], i) => (
            <Accordion.Item key={name} value={name} aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: i ? { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } : undefined }}>
              <Accordion.Header>
                <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                  <Accordion.Icon name={icon} weight="regular" aria-hidden />
                  <Type role="l4" weight="semi-bold">{name}</Type>
                  <Accordion.Chevron />
                </Accordion.Trigger>
              </Accordion.Header>
            </Accordion.Item>
          ))}
        </Accordion>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
