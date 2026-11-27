# Drawer-001: Mobile navigation drawer

Component family: **Drawer**

UI type: **Drawer**

Source: `src/usecase-gallery/usecases/drawer/Drawer-001/usecase.ts`

## What it is

A side panel that holds the top bar actions on a phone: a no-padding popup with a vertical menu, opened under the bar.

## When to choose it

Use it to hold the whole top bar menu when it does not fit on a phone. Do not use it on desktop, where the Menubar shows the menus inline.

## Where it belongs

The phone layout of the top bar in eight apps (HCS and ADC have no drawer). Real source: the top bar of each app (the paths are in source).

## Usage guidance

`Drawer` with `swipeDirection="right"`, `modal={false}` and `disablePointerDismissal`, so the bar toggle (a `Menubar.IconButton` bars or xmark) opens and closes it. Portal, `Drawer.Backdrop` and `Drawer.Viewport` start below the bar (`top` equal to the bar height: 36px in ACE, 40px in ADM and HS, a size), then `Drawer.Popup` with `profile: "no-padding"`, `shape: "none"` and `sx: { width: "288", height: "fill" }`, and `Drawer.Content` holding a vertical `Menubar` of `Menubar.Button`s. The apps render the same drawer, so there is one group; ADM adds an Applications view inside the drawer (left out). The scene shows four rows and leaves out the Settings dropdown row (Menubar-005).

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Drawer`, `Menubar`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `profile`: `no-padding`
- `shape`: `none`
- `scale`: `sm`
- `paint`: `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Overlay** — The scrim behind the drawer; in the ACE scene it starts 36px down so the top bar stays uncovered. Selector: `[class~="aui-drawer-backdrop"]`. Layer step: **Overlay** — Drawer scrim covers the workspace while ACE leaves its top bar exposed.
2. **Popup** — The 288px-wide, full-height, square no-padding panel labelled "Navigation" that slides in from the right edge on a phone. Selector: `[class~="aui-drawer-popup"]`. Layer step: **Popup** — 288px panel slides from phone right edge to show Navigation.
3. **Content** — The region that holds the vertical menubar of top bar actions. Selector: `[class~="aui-drawer-content"]`. Layer step: **Content** — Drawer content holds the vertical menu of top-bar actions.
4. **Vertical menubar** — The vertical Menubar at scale "sm" that stacks the actions full width. Selector: `[class~="aui-drawer-content"] [class~="aui-menubar"]`. Layer step: **Vertical menubar** — Small-scale vertical menubar stacks drawer actions at full width.
5. **Menu rows** — The Save to device, Open from device and About rows of the example; the ACE scene adds Print. Selector: `[class~="aui-drawer-content"] [class~="aui-button"]`. Layer step: **Menu rows** — Save, Open, About and ACE Print appear as drawer menu rows.

## Apps

- ACE (`ace`)
- ADM (`adm`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Mobile navigation (`ace-mobile-nav`)

Apps: ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS

In context source: ACE: `src/features/top-navigation/ui/AceNavBar.tsx`; ADM: `src/app/layout/NavBar/NavBar.tsx`; PFD: `src/pfd/TopBar.tsx`; PBS: `src/TopBar.tsx`; HS: `src/hs/TopBar.tsx`; FD: `src/App.jsx`; AGPD: `src/agpd/TopBar.tsx`; RWS: `src/rws/TopBar.tsx`

In context view: Shown.

#### In context structure additions

1. **Top bar** — The phone top bar Menubar labelled "Top bar" that stays visible above the drawer; the drawer opens flush under it. Selector: `[class~="aui-menubar"][aria-label="Top bar"]`.
2. **Navigation toggle** — The xmark icon button labelled "Close navigation" at the top bar; it toggles the drawer closed. Selector: `[class~="aui-menubar"][aria-label="Top bar"] [class~="aui-button"]`.

#### Component UI source — `src/usecase-gallery/usecases/drawer/Drawer-001/example.tsx`

```tsx
import { Drawer, Menubar } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Drawer open modal={false} swipeDirection="right" disablePointerDismissal>
      <Drawer.Portal container={host}>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup aria-label="Navigation" aui={{ profile: 'no-padding', shape: 'none', sx: { width: '288', height: 'fill' } }}>
            <Drawer.Content>
              <Menubar orientation="vertical" aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'fill' } }}>
                <Menubar.Button>Save to device</Menubar.Button>
                <Menubar.Button>Open from device</Menubar.Button>
                <Menubar.Button>About</Menubar.Button>
              </Menubar>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/drawer/Drawer-001/options/ace-mobile-nav/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Drawer, Menubar, View } from '../../../../../kit';

// ACE phone navigation (src/features/top-navigation/ui/AceNavBar.tsx; HS TopBar.tsx is the source of the pattern and ADM, PFD, PBS, FD, AGPD and RWS write the same drawer): the top bar keeps one Menubar.IconButton, and its drawer opens flush under it (ACE 36px, ADM and HS 40px, a size) as a 288px no-padding Popup with a vertical Menubar of Menubar.Buttons. The drawer is non-modal and keeps its backdrop, so the bar toggle closes it.
export default function AceMobileNavScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ blockSize: '100%', inlineSize: '100%', alignSelf: 'stretch' }}>
      <Menubar aria-label="Top bar">
        <Menubar.IconButton name="xmark" aria-label="Close navigation" />
      </Menubar>
      <Drawer open modal={false} swipeDirection="right" disablePointerDismissal>
        <Drawer.Portal container={host}>
          <Drawer.Backdrop style={{ top: 36 }} />
          <Drawer.Viewport style={{ top: 36 }}>
            <Drawer.Popup aria-label="Navigation" aui={{ profile: 'no-padding', shape: 'none', sx: { width: '288', height: 'fill' } }}>
              <Drawer.Content>
                <Menubar orientation="vertical" aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'fill' } }}>
                  <Menubar.Button>Save to device</Menubar.Button>
                  <Menubar.Button>Open from device</Menubar.Button>
                  <Menubar.Button>About</Menubar.Button>
                  <Menubar.Button>Print</Menubar.Button>
                </Menubar>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
