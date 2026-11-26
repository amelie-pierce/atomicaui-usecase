# Dialog-001: About dialog

Component family: **Dialog**

UI type: **Dialog with title bar**

Source: `src/usecase-gallery/usecases/dialog/Dialog-001/usecase.ts`

## What it is

The About dialog of an app: a wide dialog with a raised title bar and a close X, a Release history column beside the notes of the chosen release.

## When to choose it

Use it to show what an app is and what changed in each release, with a list of versions to choose from. Do not use it for a short message or a confirm (a plain Dialog, AlertDialog-003), for a list of tutorials (Button-011) or for a long searchable list.

## Where it belongs

The About item of the top bar menu in nine apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS; ADC has no About dialog). Real site source: the About dialog of each app (the paths are in source and in each case).

## Usage guidance

The Dialog.Popup has a zero gap at scale "sm" and is min(860px, viewport minus 28px) wide (the stage width here; the apps also set a 740px height and, below 768px, turn the history into a strip above the notes, left out). The Title is raised and carries the name, the Spacer and the close X (Button-031). The body is one row: a 224px Release history column (a heading and a version count, a search Field with a magnifying-glass icon, a listbox List whose selected row is a solid surface with a 4px secondary start border, version in bold l3 and a tonal primary CURRENT Chip) and a notes column (an app header with an h5 name and a muted p3 summary, then the release notes, an Accordion: Accordion-002). The example is the Dialog frame you copy (Popup, raised Title with the close X, and the two columns); the Accordion of release notes is a supporting part shown in In context. The apps write two UIs: HCS, ACE, ADM, PBS, HS, FD, AGPD and RWS are one group (HCS, ACE, HS, FD, PBS, AGPD and RWS may also show the "Updates for your project" band and the "Updates for other regions" section, left out; the scene is the HCS one); PFD is the other group, with a Key Features list (muted label over an xs List) and a right-aligned xs text button that toggles every section (Collapse all or Expand all) above the notes. The scenes leave out the no-match state, the keyboard handlers and further rows.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Accordion`, `Button`, `Chip`, `Dialog`, `Field`, `List`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`, `xs`
- `color`: `primary`, `raised`, `secondary`, `surface`, `warning`
- `paint`: `solid`, `text`, `tonal`
- `profile`: `default`, `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim that dims the app behind the About dialog; the dialog is non-modal here so the stage stays visible. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The wide About window at scale "sm", min(860px, 100%) wide with a zero gap so the title bar and the two body columns sit flush. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar that names the window "About" and carries the spacer and the close X at its end. Selector: `[class~="aui-dialog-title"]`.
4. **Title text** — The word "About", the only text the title bar holds. Selector: `[data-ug-part="title-text"]`. Direct text is highlighted.
5. **Spacer** — The flexible gap that pushes the close X to the far end of the title bar. Selector: `[class~="aui-dialog-spacer"]`.
6. **Close** — The close X that dismisses the About dialog, labelled "Close About" for assistive technology. Selector: `[class~="aui-dialog-close"]`.
7. **Body row** — The one-row body under the title bar that splits the window into the Release history column and the release notes column; it hides overflow so each column manages its own height. Part marker: `data-ug-part="body"`.
8. **Release history column** — The 224px start column with an end border that holds the Release history heading; in the HCS and PFD scenes it also holds the version count, the search field and the version list. Part marker: `data-ug-part="history-column"`.
9. **Release history heading** — The bold l4 "Release history" label that names the version list. Part marker: `data-ug-part="history-heading"`. Direct text is highlighted.
10. **Notes column** — The flexible column that fills the rest of the width and shows the notes of the chosen release; the example holds only the "Release notes" placeholder. Part marker: `data-ug-part="notes-column"`.
11. **Notes text** — The p3 "Release notes" placeholder line that stands in for the notes in the Dialog frame. Part marker: `data-ug-part="notes-text"`. Direct text is highlighted.

## Component layer steps

1. **Overlay** — The scrim dims the app behind the About dialog while leaving the stage visible. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup container** — The wide popup defines the surface and zero-gap frame that contains the title and body. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The raised title bar sits at the start of the popup and carries the dialog label. Selector: `[class~="aui-dialog-title"]`.
4. **Title text** — The word “About” names the window. Selector: `[data-ug-part="title-text"]`.
5. **Flexible spacer** — The spacer pushes the close control to the far edge of the title bar. Selector: `[class~="aui-dialog-spacer"]`.
6. **Close control** — The labelled close X dismisses the About dialog. Selector: `[class~="aui-dialog-close"]`.
7. **Body row** — The body starts a two-column layout beneath the title bar. Selector: `[data-ug-part="body"]`.
8. **Release history column** — The 224px start column holds the release heading and version navigation. Selector: `[data-ug-part="history-column"]`.
9. **Release history heading** — The bold heading labels the version list. Selector: `[data-ug-part="history-heading"]`.
10. **Notes column** — The flexible column shows the selected release notes. Selector: `[data-ug-part="notes-column"]`.
11. **Notes content** — The placeholder line represents the notes for the selected release. Selector: `[data-ug-part="notes-text"]`.
12. **Footer actions** — The footer holds the Close action button beneath the body, so the way to finish the dialog sits last. Selector: `[data-ug-part="footer"]`.
13. **Close action** — The secondary Close button is the footer’s final action and dismisses the About dialog. Selector: `[data-ug-part="footer-close"]`.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)
- PFD (`pfd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. About dialog (`hcs-about`)

Apps: HCS, ACE, ADM, PBS, HS, FD, AGPD, RWS

In context source: HCS: `src/components/HcsAboutDialog.tsx`; ACE: `src/features/top-navigation/ui/AboutDialog.tsx`; ADM: `src/features/top-navigation/components/AboutDialog.tsx`; PBS: `src/AboutDialog.tsx`; HS: `src/hs/AboutDialog.tsx`; FD: `src/components/AboutDialog.jsx`; AGPD: `src/agpd/AboutDialog.tsx`; RWS: `src/rws/AboutDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **History header** — The bordered strip that puts the Release history heading and the muted "1 version" count on one line. Part marker: `data-ug-part="history-header"`.
2. **Search field** — The "Search releases" Field with a magnifying-glass icon that filters the version list. Selector: `[class~="aui-field"]`.
3. **Version list** — The "Release history" listbox with one selected row marked by a 4px secondary start border. Selector: `[class~="aui-list"][role="listbox"]`.
4. **Version number** — The bold version 1.0.0 of the selected release row. Part marker: `data-ug-part="version"`.
5. **CURRENT chip** — The tonal primary CURRENT chip that marks the installed release. Selector: `[data-ug-part="history-column"] [class~="aui-chip"]`.
6. **App header** — The bordered header above the notes: the app name as an h5 over a muted summary line. Part marker: `data-ug-part="notes-header"`.
7. **Release notes accordion** — The accordion of release sections, open on "Global changes (1 update)", whose panel pairs an IMPROVEMENT chip with the change text. Selector: `[class~="aui-accordion"]`.

#### In context layer steps

1. **History header** — Bordered header pairs Release history title with a muted version count. Selector: `[data-ug-part="history-header"]`.
2. **Search field** — Search releases field filters versions with a magnifier icon. Selector: `[class~="aui-field"]`.
3. **Version list** — Release history listbox selects one row with a 4px start border. Selector: `[class~="aui-list"][role="listbox"]`.
4. **Version number** — The bold version 1.0.0 of the selected release row. Selector: `[data-ug-part="version"]`.
5. **CURRENT chip** — The tonal primary CURRENT chip that marks the installed release. Selector: `[data-ug-part="history-column"] [class~="aui-chip"]`.
6. **App header** — Bordered notes header stacks the app name over its summary. Selector: `[data-ug-part="notes-header"]`.
7. **Release notes accordion** — Open Global changes accordion pairs IMPROVEMENT chip with change details. Selector: `[class~="aui-accordion"]`.
8. **Overlay** — The scrim dims the app behind the About dialog while leaving the stage visible. Selector: `[class~="aui-dialog-backdrop"]`.
9. **Popup container** — The wide popup defines the surface and zero-gap frame that contains the title and body. Selector: `[class~="aui-dialog-popup"]`.
10. **Title bar** — The raised title bar sits at the start of the popup and carries the dialog label. Selector: `[class~="aui-dialog-title"]`.
11. **Title text** — The word “About” names the window. Selector: `[data-ug-part="title-text"]`.
12. **Flexible spacer** — The spacer pushes the close control to the far edge of the title bar. Selector: `[class~="aui-dialog-spacer"]`.
13. **Close control** — The labelled close X dismisses the About dialog. Selector: `[class~="aui-dialog-close"]`.
14. **Body row** — The body starts a two-column layout beneath the title bar. Selector: `[data-ug-part="body"]`.
15. **Release history column** — The 224px start column holds the release heading and version navigation. Selector: `[data-ug-part="history-column"]`.
16. **Release history heading** — The bold heading labels the version list. Selector: `[data-ug-part="history-heading"]`.
17. **Notes column** — The flexible column shows the selected release notes. Selector: `[data-ug-part="notes-column"]`.
18. **Notes content** — The placeholder line represents the notes for the selected release. Selector: `[data-ug-part="notes-text"]`.
19. **Footer actions** — The footer holds the Close action button beneath the body, so the way to finish the dialog sits last. Selector: `[data-ug-part="footer"]`.
20. **Close action** — The secondary Close button is the footer’s final action and dismisses the About dialog. Selector: `[data-ug-part="footer-close"]`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-001/example.tsx`

```tsx
import { Dialog, Type, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(860px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <span data-ug-part="title-text">About</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="body" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>
              <View data-ug-part="history-column" aui={{ scale: 'sm', paint: 'text', sx: { width: '224', flex: 'none', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>
                <Type data-ug-part="history-heading" as="strong" role="l4" weight="bold">
                  Release history
                </Type>
              </View>
              <View data-ug-part="notes-column" aui={{ scale: 'sm', paint: 'text', sx: { flex: 'fill', minWidth: '0' } }}>
                <Type data-ug-part="notes-text" as="p" role="p3">
                  Release notes
                </Type>
              </View>
            </View>
            <Dialog.Actions data-ug-part="footer" aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="footer-close" aui={{ scale: 'sm', color: 'secondary' }}>Close</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-001/options/hcs-about/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Chip, Dialog, Field, List, Type, View } from '../../../../../kit';

// HCS About dialog (the shared dialog of ACE, ADM, PBS, HS, FD, AGPD and RWS; src/components/HcsAboutDialog.tsx): an 860 x 740 Popup (capped by the stage, height from the content) with a raised Title, a Release history column (heading, search Field, one selected release row with a CURRENT Chip) beside the app header and the release notes. The apps add or drop the "Updates for your project" band by release and region; the scene leaves it out.
export default function HcsAboutScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(860px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <span data-ug-part="title-text">About</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="body" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>
              <View data-ug-part="history-column" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', width: '224', flex: 'none', minHeight: '0', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>
                <View data-ug-part="history-header" aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
                  <Type data-ug-part="history-heading" as="strong" role="l4" weight="bold">
                    Release history
                  </Type>
                  <Type as="span" role="l6" color="muted">
                    1 version
                  </Type>
                </View>
                <View aui={{ scale: 'sm', paint: 'text', profile: 'default' }}>
                  <Field aui={{ scale: 'sm' }}>
                    <Field.Control>
                      <Field.Icon name="magnifying-glass" />
                      <Field.Input type="search" placeholder="Search releases" aria-label="Search releases" />
                    </Field.Control>
                  </Field>
                </View>
                <List role="listbox" aria-label="Release history" aui={{ scale: 'sm', paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column' } }}>
                  <List.Item
                    interactive
                    role="option"
                    selected
                    aria-selected
                    aui={{ scale: 'sm', color: 'surface', paint: 'solid', sx: { width: 'fill', alignItems: 'start', borderColor: 'secondary', borderInlineStartWidth: '4' } }}
                  >
                    <List.ItemIndicator aui={{ scale: 'sm', sx: { display: 'none' } }} />
                    <List.ItemText>
                      <View as="span" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
                        <View as="span" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', flexWrap: 'wrap', gap: '8' } }}>
                          <Type data-ug-part="version" as="strong" role="l3" weight="bold">
                            1.0.0
                          </Type>
                          <Chip aui={{ scale: 'sm', color: 'primary', paint: 'tonal' }}>
                            <Chip.Label>CURRENT</Chip.Label>
                          </Chip>
                        </View>
                      </View>
                    </List.ItemText>
                  </List.Item>
                </List>
              </View>
              <View data-ug-part="notes-column" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', flex: 'fill', minHeight: '0', minWidth: '0' } }}>
                <View data-ug-part="notes-header" as="header" aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8', flex: 'none', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
                  <Type as="h2" role="h5">
                    Hinge Connector Selector
                  </Type>
                  <Type as="p" role="p3" color="muted">
                    Explore timber hinge connector models for your project.
                  </Type>
                </View>
                <View aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }}>
                  <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
                    <Accordion.Item value="global">
                      <Accordion.Header>
                        <Accordion.Trigger>
                          <span>
                            <Type as="span" role="l3" weight="semi-bold">
                              Global changes
                            </Type>{' '}
                            <Type as="span" role="l5" color="muted">
                              (1 update)
                            </Type>
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
                </View>
              </View>
            </View>
            <span data-ug-component-root style={{ display: 'contents' }}>
              <Dialog.Actions data-ug-part="footer" aui={{ scale: 'sm' }}>
                <Dialog.Button data-ug-part="footer-close" aui={{ scale: 'sm', color: 'secondary' }}>Close</Dialog.Button>
              </Dialog.Actions>
            </span>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. About history pane (`pfd-about`)

Apps: PFD

In context source: PFD: `src/pfd/AboutDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **History header** — The bordered strip that puts the Release history heading and the muted "1 version" count on one line. Part marker: `data-ug-part="history-header"`.
2. **Search field** — The "Search releases" Field with a magnifying-glass icon that filters the version list. Selector: `[class~="aui-field"]`.
3. **Version list** — The "Release history" listbox with one selected row marked by a 4px secondary start border. Selector: `[class~="aui-list"][role="listbox"]`.
4. **Version number** — The bold version 1.0.0 of the selected release row. Part marker: `data-ug-part="version"`.
5. **CURRENT chip** — The tonal primary CURRENT chip that marks the installed release. Selector: `[data-ug-part="history-column"] [class~="aui-chip"]`.
6. **App header** — The bordered header above the notes: the app name as an h5 over a muted summary line. Part marker: `data-ug-part="notes-header"`.
7. **Key Features list** — The xs List under a muted "Key Features:" label that lists features such as Dynamic UI. Part marker: `data-ug-part="key-features"`.
8. **Collapse all button** — The right-aligned xs text button that expands or collapses every release section; shown as Collapse all. Part marker: `data-ug-part="toggle-all"`.
9. **Release notes accordion** — The accordion of release sections, open on "Global changes (1 update)", whose panel pairs an IMPROVEMENT chip with the change text. Selector: `[class~="aui-accordion"]`.

#### In context layer steps

1. **History header** — Bordered header pairs Release history title with a muted version count. Selector: `[data-ug-part="history-header"]`.
2. **Search field** — Search releases field filters versions with a magnifier icon. Selector: `[class~="aui-field"]`.
3. **Version list** — Release history listbox selects one row with a 4px start border. Selector: `[class~="aui-list"][role="listbox"]`.
4. **Version number** — The bold version 1.0.0 of the selected release row. Selector: `[data-ug-part="version"]`.
5. **CURRENT chip** — The tonal primary CURRENT chip that marks the installed release. Selector: `[data-ug-part="history-column"] [class~="aui-chip"]`.
6. **App header** — Bordered notes header stacks the app name over its summary. Selector: `[data-ug-part="notes-header"]`.
7. **Key Features list** — Extra-small list places features such as Dynamic UI under its label. Selector: `[data-ug-part="key-features"]`.
8. **Collapse all button** — Right-aligned Collapse all button expands or closes release sections. Selector: `[data-ug-part="toggle-all"]`.
9. **Release notes accordion** — Open Global changes accordion pairs IMPROVEMENT chip with change details. Selector: `[class~="aui-accordion"]`.
10. **Overlay** — The scrim dims the app behind the About dialog while leaving the stage visible. Selector: `[class~="aui-dialog-backdrop"]`.
11. **Popup container** — The wide popup defines the surface and zero-gap frame that contains the title and body. Selector: `[class~="aui-dialog-popup"]`.
12. **Title bar** — The raised title bar sits at the start of the popup and carries the dialog label. Selector: `[class~="aui-dialog-title"]`.
13. **Title text** — The word “About” names the window. Selector: `[data-ug-part="title-text"]`.
14. **Flexible spacer** — The spacer pushes the close control to the far edge of the title bar. Selector: `[class~="aui-dialog-spacer"]`.
15. **Close control** — The labelled close X dismisses the About dialog. Selector: `[class~="aui-dialog-close"]`.
16. **Body row** — The body starts a two-column layout beneath the title bar. Selector: `[data-ug-part="body"]`.
17. **Release history column** — The 224px start column holds the release heading and version navigation. Selector: `[data-ug-part="history-column"]`.
18. **Release history heading** — The bold heading labels the version list. Selector: `[data-ug-part="history-heading"]`.
19. **Notes column** — The flexible column shows the selected release notes. Selector: `[data-ug-part="notes-column"]`.
20. **Notes content** — The placeholder line represents the notes for the selected release. Selector: `[data-ug-part="notes-text"]`.
21. **Footer actions** — The footer holds the Close action button beneath the body, so the way to finish the dialog sits last. Selector: `[data-ug-part="footer"]`.
22. **Close action** — The secondary Close button is the footer’s final action and dismisses the About dialog. Selector: `[data-ug-part="footer-close"]`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-001/options/pfd-about/example.tsx`

```tsx
import { Accordion, Button, Dialog, List, Type, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(860px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <span data-ug-part="title-text">About</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="body" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>
              <View data-ug-part="history-column" aui={{ scale: 'sm', paint: 'text', sx: { width: '224', flex: 'none', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>
                <Type data-ug-part="history-heading" as="strong" role="l4" weight="bold">
                  Release history
                </Type>
              </View>
              <View data-ug-part="notes-column" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '16', flex: 'fill', minWidth: '0' } }}>
                <Type as="h2" role="h5">Post-to-Foundation Designer</Type>
                <Type as="p" role="p3" color="muted">PFD streamlines the design of anchorage and holdown solutions for specific uplift loads.</Type>
                <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
                  <Type as="p" role="p3" color="muted">Key Features:</Type>
                  <List data-ug-part="key-features" aui={{ paint: 'text', profile: 'no-padding', scale: 'xs' }}>
                    <List.Item aui={{ sx: { alignItems: 'start' } }}>
                      <List.ItemText>
                        <Type as="span" role="p3" color="muted"><Type as="strong" role="p3" weight="semi-bold">Dynamic UI:</Type>{' '}the inputs follow the selected design code.</Type>
                      </List.ItemText>
                    </List.Item>
                  </List>
                </View>
                <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', justifyContent: 'end' } }}>
                  <Button data-ug-part="toggle-all" aui={{ paint: 'text', scale: 'xs' }}>Collapse all</Button>
                </View>
                <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
                  <Accordion.Item value="global">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Type as="span" role="l3" weight="semi-bold">Global changes (1 update)</Type>
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Resize the Input, 3D Viewer, and Output panels to suit your workspace.</Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </View>
            </View>
            <Dialog.Actions data-ug-part="footer" aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="footer-close" aui={{ scale: 'sm', color: 'secondary' }}>Close</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-001/options/pfd-about/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Button, Chip, Dialog, Field, List, Type, View } from '../../../../../kit';

// PFD About dialog (src/pfd/AboutDialog.tsx): the same shell, Release history column and app header as the HCS dialog, but the notes column also carries a Key Features list (a muted label over a List at scale xs) and a right-aligned xs text button that expands or collapses every section. The button is shown in its Collapse all state.
export default function PfdAboutScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(860px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <span data-ug-part="title-text">About</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="body" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>
              <View data-ug-part="history-column" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', width: '224', flex: 'none', minHeight: '0', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>
                <View data-ug-part="history-header" aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
                  <Type data-ug-part="history-heading" as="strong" role="l4" weight="bold">
                    Release history
                  </Type>
                  <Type as="span" role="l6" color="muted">
                    1 version
                  </Type>
                </View>
                <View aui={{ scale: 'sm', paint: 'text', profile: 'default' }}>
                  <Field aui={{ scale: 'sm' }}>
                    <Field.Control>
                      <Field.Icon name="magnifying-glass" />
                      <Field.Input type="search" placeholder="Search releases" aria-label="Search releases" />
                    </Field.Control>
                  </Field>
                </View>
                <List role="listbox" aria-label="Release history" aui={{ scale: 'sm', paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column' } }}>
                  <List.Item
                    interactive
                    role="option"
                    selected
                    aria-selected
                    aui={{ scale: 'sm', color: 'surface', paint: 'solid', sx: { width: 'fill', alignItems: 'start', borderColor: 'secondary', borderInlineStartWidth: '4' } }}
                  >
                    <List.ItemIndicator aui={{ scale: 'sm', sx: { display: 'none' } }} />
                    <List.ItemText>
                      <View as="span" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
                        <View as="span" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', flexWrap: 'wrap', gap: '8' } }}>
                          <Type data-ug-part="version" as="strong" role="l3" weight="bold">
                            1.0.0
                          </Type>
                          <Chip aui={{ scale: 'sm', color: 'primary', paint: 'tonal' }}>
                            <Chip.Label>CURRENT</Chip.Label>
                          </Chip>
                        </View>
                      </View>
                    </List.ItemText>
                  </List.Item>
                </List>
              </View>
              <View data-ug-part="notes-column" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', flex: 'fill', minHeight: '0', minWidth: '0' } }}>
                <View data-ug-part="notes-header" as="header" aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8', flex: 'none', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
                  <Type as="h2" role="h5">
                    Post-to-Foundation Designer
                  </Type>
                  <Type as="p" role="p3" color="muted">
                    PFD streamlines the design of anchorage and holdown solutions for specific uplift loads.
                  </Type>
                </View>
                <View aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }}>
                  <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
                    <Type as="p" role="p3" color="muted">
                      Key Features:
                    </Type>
                    <List data-ug-part="key-features" aui={{ paint: 'text', profile: 'no-padding', scale: 'xs' }}>
                      <List.Item aui={{ sx: { alignItems: 'start' } }}>
                        <List.ItemText>
                          <Type as="span" role="p3" color="muted">
                            <Type as="strong" role="p3" weight="semi-bold">
                              Dynamic UI:
                            </Type>{' '}
                            the inputs follow the selected design code.
                          </Type>
                        </List.ItemText>
                      </List.Item>
                    </List>
                  </View>
                  <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', justifyContent: 'end' } }}>
                    <Button data-ug-part="toggle-all" aui={{ paint: 'text', scale: 'xs' }}>Collapse all</Button>
                  </View>
                  <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
                    <Accordion.Item value="global">
                      <Accordion.Header>
                        <Accordion.Trigger>
                          <span>
                            <Type as="span" role="l3" weight="semi-bold">
                              Global changes
                            </Type>{' '}
                            <Type as="span" role="l5" color="muted">
                              (1 update)
                            </Type>
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
                </View>
              </View>
            </View>
            <span data-ug-component-root style={{ display: 'contents' }}>
              <Dialog.Actions data-ug-part="footer" aui={{ scale: 'sm' }}>
                <Dialog.Button data-ug-part="footer-close" aui={{ scale: 'sm', color: 'secondary' }}>Close</Dialog.Button>
              </Dialog.Actions>
            </span>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
