# Tabs-003: Tabs with status icon

Component family: **Tabs**

UI type: **Segmented tabs**

Source: `src/usecase-gallery/usecases/tabs/Tabs-003/usecase.ts`

## What it is

Tabs that each lead with a pass or fail icon, so the tab strip is also the summary of which checks passed.

## When to choose it

Use it when each tab is one check or test with an outcome the user should read before opening it: the icon shows pass or fail and the panel shows the detail. Use plain Tabs (Tabs-001) when the tabs are views with no outcome.

## Where it belongs

Under the title of a result card: HCS lists one tab per check of a product in its Output results (Connection and each design check); FD lists one tab per check category in an expanded Output row. The Output pane tabs are Tabs-001.

## Usage guidance

The example is HCS: Tabs, Tabs.List and Tabs.Tab with aui scale "sm", a Tabs.Icon at the start of each Tab (check with color "success" when passed, xmark with color "error" when failed, scale "sm") and a Tabs.Panel per check, with sx gap "12" on the root. scale "sm" computes the same as the default (28px chips, 16px/400, 8px padding, measured), so the other apps leave it off. The In context scene is the strip only. HCS: Tabs.Icon glyphs check and xmark (17.5x14 glyphs, rgb(22, 163, 74) and rgb(231, 80, 76) measured). FD: a plain Icon child instead of Tabs.Icon with the circle-check and circle-exclamation glyphs (20x16, the same two colours once "error" is used), a List with gap "0" and no scale props; the glyph set differs, so it is its own group. FD colours the failed icon "danger", which is not a kit colour, so the app renders it in the text colour, rgb(18, 18, 18); that is an app-side defect against the red "error" of HCS and the scene uses "error". Left out of the scenes: the card title, the other checks, the panels and every selected-tab change.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Icon`, `Tabs`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `error`, `success`
- `paint`: `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Tabs** — Check tabs at scale "sm" with a 12px gap between the strip and the panel; Connection is selected first. Selector: `[class~="aui-tabs"]`.
2. **List** — Strip of check tabs; reading the icons down the row summarises which checks passed. Selector: `[class~="aui-tabs-list"]`.
3. **Tab** — One check, Connection or Weld, with its status icon before the label. Selector: `[class~="aui-tabs-tab"]`.
4. **Status icon** — Leading result icon: a success check for Connection and an error xmark for Weld; FD uses circle-check and circle-exclamation through a plain Icon. Selector: `[class~="aui-tabs-tab"] > [class~="aui-contained-icon"]`.
5. **Panel** — Body for the selected check, "Connection check" or "Weld check". Selector: `[class~="aui-tabs-panel"]`.

## Apps

- HCS (`hcs`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Check result tabs (`hcs-check-tabs`)

Apps: HCS

In context source: HCS: `src/components/F01Results.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tabs/Tabs-003/example.tsx`

```tsx
import { Tabs } from '../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="connection" aui={{ scale: 'sm', sx: { gap: '12' } }}>
      <Tabs.List aui={{ scale: 'sm' }}>
        <Tabs.Tab value="connection" aui={{ scale: 'sm' }}>
          <Tabs.Icon name="check" aui={{ scale: 'sm', color: 'success' }} />
          Connection
        </Tabs.Tab>
        <Tabs.Tab value="weld" aui={{ scale: 'sm' }}>
          <Tabs.Icon name="xmark" aui={{ scale: 'sm', color: 'error' }} />
          Weld
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="connection">Connection check</Tabs.Panel>
      <Tabs.Panel value="weld">Weld check</Tabs.Panel>
    </Tabs>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tabs/Tabs-003/options/hcs-check-tabs/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// HCS product result card (src/components/F01Results.tsx:114-138): under the model name, one Tabs.Tab per check, led by a Tabs.Icon that is a green check for a passed check and a red xmark for a failed one (scale "sm" throughout, 12px between the list and the panel).
// The scene keeps one passed and one failed tab; the card's title, the extra checks and the panels are left out.
export default function HcsCheckTabsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Tabs defaultValue="connection" aui={{ scale: 'sm', sx: { gap: '12' } }}>
        <Tabs.List aui={{ scale: 'sm' }}>
          <Tabs.Tab value="connection" aui={{ scale: 'sm' }}>
            <Tabs.Icon name="check" aui={{ scale: 'sm', color: 'success' }} />
            Connection
          </Tabs.Tab>
          <Tabs.Tab value="weld" aui={{ scale: 'sm' }}>
            <Tabs.Icon name="xmark" aui={{ scale: 'sm', color: 'error' }} />
            Weld
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </View>
  );
}
```

### 2. Check result tabs — UI variant 2 (`fd-check-tabs`)

Apps: FD

In context source: FD: `src/components/RowExpansion.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tabs/Tabs-003/options/fd-check-tabs/example.tsx`

```tsx
import { Tabs } from '../../../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="connection" aui={{ scale: 'sm', sx: { gap: '12' } }}>
      <Tabs.List aui={{ scale: 'sm' }}>
        <Tabs.Tab value="connection" aui={{ scale: 'sm' }}>
          <Tabs.Icon name="check" aui={{ scale: 'sm', color: 'success' }} />
          Connection
        </Tabs.Tab>
        <Tabs.Tab value="weld" aui={{ scale: 'sm' }}>
          <Tabs.Icon name="xmark" aui={{ scale: 'sm', color: 'error' }} />
          Weld
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="connection">Connection check</Tabs.Panel>
      <Tabs.Panel value="weld">Weld check</Tabs.Panel>
    </Tabs>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tabs/Tabs-003/options/fd-check-tabs/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Icon, Tabs, View } from '../../../../../kit';

// FD row expansion (src/components/RowExpansion.jsx:105-125): one Tabs.Tab per check category, led by a plain Icon, circle-check for a passed category and circle-exclamation for a failed one, with no gap on the List.
// The app colours the failed icon "danger", which is not a colour of the kit and renders in the text colour; the scene uses the standard "error". The scene keeps one passed and one failed tab; the panels are left out.
export default function FdCheckTabsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Tabs defaultValue="connection" aui={{ profile: 'no-padding' }}>
        <Tabs.List aui={{ sx: { gap: '0' } }}>
          <Tabs.Tab value="connection">
            <Icon name="circle-check" aui={{ color: 'success' }} />
            Connection
          </Tabs.Tab>
          <Tabs.Tab value="weld">
            <Icon name="circle-exclamation" aui={{ color: 'error' }} />
            Weld
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
