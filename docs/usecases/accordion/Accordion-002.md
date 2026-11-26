# Accordion-002: Title with badge and count

Component family: **Accordion**

UI type: **Titled accordion**

Source: `src/usecase-gallery/usecases/accordion/Accordion-002/usecase.ts`

## What it is

The release notes of an About dialog as collapsible sections: each a title with a count, opening onto the list of changes with one coloured Chip each.

## When to choose it

Use it for a short list of grouped notes the reader opens one by one, in a dialog or panel. Do not use it for input sections (Accordion-001) or for a pick-one list in groups (Accordion-003).

## Where it belongs

The About dialog of all ten apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC): the notes of the chosen release sit in an Accordion whose first section is Global changes. ACE, HS and FD add Updates for other regions with a nested Accordion, one section per region. Real site source: the About dialog of each app (the paths are in source). The dialog shell and the release history column are Dialog-001.

## Usage guidance

An Accordion at scale "sm" (openMultiple, the Global changes section open by default) of plain Accordion.Items. Accordion.Trigger holds one span with the label as Type span role "l3" weight "semi-bold", a space, and the count in parentheses as Type span role "l5" color "muted", then Accordion.Chevron. Accordion.Panel holds the change rows: a flex row with gap 12 and 8px block padding, a 160px column with a solid Chip (success for a feature, warning for an improvement) and the text as Type p3. The example is that Accordion; In context sets it in the About dialog Body. The apps write two UIs, measured in the gallery: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS are one group (trigger 28px, label 16px weight 600 with a 14px muted count; PFD wraps the label in a View span and adds a Collapse all button above, FD writes one Accordion per section, neither changes the render); ADC is the other, with a surface item and trigger (shape "none"), the version line as one Type l4 semi-bold (14px) with no count, and a warning surface label beside the change text. The Other regions type (ACE, HS, FD) puts a second Accordion inside the panel of the Updates for other regions item, its items written like the outer ones. The scenes leave out the Release history column, the app header, the project updates band, further sections and releases, the Close footer and the narrow layout.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Accordion`, `Chip`, `Dialog`, `Icon`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `paint`: `solid`, `text`
- `color`: `inherit`, `raised`, `success`, `surface`, `warning`
- `profile`: `default`, `no-padding`
- `shape`: `none`, `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Accordion** — Release-notes list at scale "sm" with openMultiple and "global" open by default; the ACE scene nests a second Accordion (Europe) inside Updates for other regions, and ADC uses one 1.0 release item. Selector: `[class~="aui-accordion"]`.
2. **Item** — One group of changes, for example Global changes. Selector: `[class~="aui-accordion-item"]`.
3. **Trigger** — Title row that opens the group; it carries the name and a muted update count. Selector: `[class~="aui-accordion-trigger"]`.
4. **Title and count** — Semi-bold l3 "Global changes" followed by a muted l5 "(1 update)"; ADC uses the release line "1.0 Released on Jan 01, 2027 (TBD)". Selector: `[class~="aui-accordion-trigger-content"]`.
5. **Chevron** — Disclosure chevron at the end of the title row. Selector: `[class~="aui-accordion-trigger"] > [class~="aui-accordion-chevron"]`.
6. **Panel** — Holds the change entries: a 160px badge column beside the sentence describing the change. Selector: `[class~="aui-accordion-panel"]`.
7. **Change chip** — Coloured solid chip that tags the type of change: warning IMPROVEMENT here, success FEATURE in the Europe group. Selector: `[class~="aui-chip"]`.
8. **Chip label** — Upper-case change type, IMPROVEMENT or FEATURE. Selector: `[class~="aui-chip-label"]`. Direct text is highlighted.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Release notes (`hcs-release-notes`)

Apps: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS

In context source: HCS: `src/components/HcsAboutDialog.tsx`; ACE: `src/features/top-navigation/ui/AboutDialog.tsx`; ADM: `src/features/top-navigation/components/AboutDialog.tsx`; PFD: `src/pfd/AboutDialog.tsx`; PBS: `src/AboutDialog.tsx`; HS: `src/hs/AboutDialog.tsx`; FD: `src/components/AboutDialog.jsx`; AGPD: `src/agpd/AboutDialog.tsx`; RWS: `src/rws/AboutDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **About dialog** — The Dialog popup titled About that hosts the release notes. Selector: `[class~="aui-dialog-popup"]`.
2. **About title bar** — The raised Dialog.Title reading "About", with the Close About button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close (aria-label "Close About") that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Release notes body** — The padded View under the title bar that holds the release notes Accordion (the Release history column and app header are left out). Part marker: `data-ug-part="about-body"`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-002/example.tsx`

```tsx
import { Accordion, Chip, Type, View } from '../../../kit';

export default function Example() {
  return (
    <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
      <Accordion.Item value="global">
        <Accordion.Header>
          <Accordion.Trigger>
            <span>
              <Type as="span" role="l3" weight="semi-bold">Global changes</Type>{' '}
              <Type as="span" role="l5" color="muted">(1 update)</Type>
            </span>
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'start', gap: '12', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
            <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
              <Chip aui={{ scale: 'sm', color: 'warning', paint: 'solid' }}>
                <Chip.Label>IMPROVEMENT</Chip.Label>
              </Chip>
            </View>
            <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
              Resize the Input, 3D Viewer, and Output panels to suit your workspace.
            </Type>
          </View>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-002/options/hcs-release-notes/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Chip, Dialog, Type, View } from '../../../../../kit';

// HCS About dialog (src/components/HcsAboutDialog.tsx; ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS write the same Accordion, FD as one Accordion per section): the Popup (capped by the stage) with a raised Title and the close X, and a Body View holding the release notes Accordion with its one open Global changes section and one change row. Left out: the Release history column, the app header, the "Updates for your project" band, the other sections and PFD's Collapse all button.
export default function HcsReleaseNotesScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(640px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              About
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="about-body" aui={{ scale: 'sm', paint: 'text', profile: 'default' }}>
              <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
                <Accordion.Item value="global">
                  <Accordion.Header>
                    <Accordion.Trigger>
                      <span>
                        <Type as="span" role="l3" weight="semi-bold">Global changes</Type>{' '}
                        <Type as="span" role="l5" color="muted">(1 update)</Type>
                      </span>
                      <Accordion.Chevron />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'start', gap: '12', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
                      <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
                        <Chip aui={{ scale: 'sm', color: 'warning', paint: 'solid' }}>
                          <Chip.Label>IMPROVEMENT</Chip.Label>
                        </Chip>
                      </View>
                      <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
                        Resize the Input, 3D Viewer, and Output panels to suit your workspace.
                      </Type>
                    </View>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion></span>
            </View>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Dialog release notes (`adc-release-notes`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

In context view: Shown.

#### In context structure additions

1. **About dialog** — The Dialog popup titled About that hosts the release notes. Selector: `[class~="aui-dialog-popup"]`.
2. **About title bar** — The raised Dialog.Title reading "About", with the Close About button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close (aria-label "Close About") that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Dialog body** — The Dialog.Body under the title bar that holds the release Accordion (the app description and Close footer are left out). Selector: `[class~="aui-dialog-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-002/options/adc-release-notes/example.tsx`

```tsx
import { Accordion, Icon, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <Accordion defaultValue={['initial']}>
      <Accordion.Item value="initial" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
        <Accordion.Header>
          <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
            <Type as="span" role="l4" weight="semi-bold">1.0 Released on Jan 01, 2027 (TBD)</Type>
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel aui={{ profile: 'default' }}>
          <View aui={{ paint: 'text', profile: 'no-padding', scale: 'sm', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '8' } }}>
            <View aui={{ color: 'warning', paint: 'solid', shape: 'soft', scale: 'sm', profile: 'default', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
              <Icon name="wand-magic-sparkles" aria-hidden="true" style={{ color: 'inherit' }} />
              <Type role="l4">Initial</Type>
            </View>
            <Type role="l4">Initial release of the application</Type>
          </View>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-002/options/adc-release-notes/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Dialog, Icon, Type, View } from '../../../../../kit';

// ADC About dialog (src/adc/Workspace.tsx): the shell dialog Popup with a raised Title and the close X, and a Body holding one Accordion whose release item is written like an Input section: surface item and trigger (scale "sm", shape "none"), the version line as a Type l4 semi-bold with no count, and a panel row of a warning surface label with an icon beside the change text. Left out: the app description above the Accordion, the Close footer and further releases.
export default function AdcReleaseNotesScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              About
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <Dialog.Body>
              <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion defaultValue={['initial']}>
                <Accordion.Item value="initial" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
                  <Accordion.Header>
                    <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                      <Type as="span" role="l4" weight="semi-bold">1.0 Released on Jan 01, 2027 (TBD)</Type>
                      <Accordion.Chevron />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel aui={{ profile: 'default' }}>
                    <View aui={{ paint: 'text', profile: 'no-padding', scale: 'sm', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '8' } }}>
                      <View aui={{ color: 'warning', paint: 'solid', shape: 'soft', scale: 'sm', profile: 'default', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
                        <Icon name="wand-magic-sparkles" aria-hidden="true" style={{ color: 'inherit' }} />
                        <Type role="l4">Initial</Type>
                      </View>
                      <Type role="l4">Initial release of the application</Type>
                    </View>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion></span>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 3. Other regions (`ace-other-regions`)

Apps: ACE, HS, FD

In context source: ACE: `src/features/top-navigation/ui/AboutDialog.tsx`; HS: `src/hs/AboutDialog.tsx`; FD: `src/components/AboutDialog.jsx`

In context view: Shown.

#### In context structure additions

1. **About dialog** — The Dialog popup titled About that hosts the release notes. Selector: `[class~="aui-dialog-popup"]`.
2. **About title bar** — The raised Dialog.Title reading "About", with the Close About button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close (aria-label "Close About") that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Release notes body** — The padded View under the title bar that holds the release notes Accordion (the Release history column and app header are left out). Part marker: `data-ug-part="about-body"`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-002/options/ace-other-regions/example.tsx`

```tsx
import { Accordion, Chip, Type, View } from '../../../../../kit';

function Trigger({ label, count }: { label: string; count: string }) {
  return (
    <Accordion.Header>
      <Accordion.Trigger>
        <span>
          <Type as="span" role="l3" weight="semi-bold">{label}</Type>{' '}
          <Type as="span" role="l5" color="muted">({count})</Type>
        </span>
        <Accordion.Chevron />
      </Accordion.Trigger>
    </Accordion.Header>
  );
}

export default function Example() {
  return (
    <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['other']}>
      <Accordion.Item value="other">
        <Trigger label="Updates for other regions" count="1 update" />
        <Accordion.Panel>
          <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['eu']}>
            <Accordion.Item value="eu">
              <Trigger label="Europe" count="1 update" />
              <Accordion.Panel>
                <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'start', gap: '12', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
                  <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
                    <Chip aui={{ scale: 'sm', color: 'success', paint: 'solid' }}>
                      <Chip.Label>FEATURE</Chip.Label>
                    </Chip>
                  </View>
                  <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
                    Design to Eurocode 2.
                  </Type>
                </View>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-002/options/ace-other-regions/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Chip, Dialog, Type, View } from '../../../../../kit';

// ACE About dialog (src/features/top-navigation/ui/AboutDialog.tsx; HS src/hs/AboutDialog.tsx and FD src/components/AboutDialog.jsx write the same sections): the Popup with a raised Title and the close X, and the release notes Accordion whose second item, Updates for other regions, holds a second Accordion with one item per region (here one, open). Left out: the Release history column, the app header, the Global changes section above, the other regions and the "Updates for your project" band.
const trigger = (label: string, count: string) => (
  <Accordion.Header>
    <Accordion.Trigger>
      <span>
        <Type as="span" role="l3" weight="semi-bold">{label}</Type>{' '}
        <Type as="span" role="l5" color="muted">({count})</Type>
      </span>
      <Accordion.Chevron />
    </Accordion.Trigger>
  </Accordion.Header>
);

export default function AceOtherRegionsScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(640px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              About
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="about-body" aui={{ scale: 'sm', paint: 'text', profile: 'default' }}>
              <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['other']}>
                <Accordion.Item value="other">
                  {trigger('Updates for other regions', '1 update')}
                  <Accordion.Panel>
                    <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['eu']}>
                      <Accordion.Item value="eu">
                        {trigger('Europe', '1 update')}
                        <Accordion.Panel>
                          <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'start', gap: '12', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
                            <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
                              <Chip aui={{ scale: 'sm', color: 'success', paint: 'solid' }}>
                                <Chip.Label>FEATURE</Chip.Label>
                              </Chip>
                            </View>
                            <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
                              Design to Eurocode 2.
                            </Type>
                          </View>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion></span>
            </View>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
