# Accordion-003: Plain title

Component family: **Accordion**

UI type: **Titled accordion**

Source: `src/usecase-gallery/usecases/accordion/Accordion-003/usecase.ts`

## What it is

A pick-one list split into two collapsible groups, Default Templates and My Templates, each a plain title with a chevron over its rows.

## When to choose it

Use it to fold a long pick-one list into a few named groups, both open at first. Do not use it for input sections (Accordion-001) or release notes (Accordion-002).

## Where it belongs

The New from template dialog in ACE, HS and FD: one Accordion over a RadioGroup, one item per owner (built-in and the user's own). ADM groups the same list with plain headings instead of an Accordion (Dialog-004). Real site source: the template dialog of each app (the paths are in source). The dialog shell and the radio rows are Dialog-004.

## Usage guidance

An Accordion with openMultiple and both items open by default (defaultValue the two item values), no aui props: plain Accordion.Items, each Accordion.Header holding an Accordion.Trigger with the group title and Accordion.Chevron, and an Accordion.Panel with the rows. The example is that Accordion with a line of text per panel; In context sets it over a RadioGroup in the Templates dialog Body, each row a Radio (an outlined tonal surface when unselected, a solid primary when selected) in place of the text. The apps write two UIs, measured in the gallery: ACE sets the title as Type role "l4" (trigger label 14px on an 18px line); HS and FD write the title as plain trigger text (16px bold on a 20px line). The scenes leave out the user row actions (download, delete, edit), the empty state, more rows, the Cancel and Create footer and the delete confirm.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Accordion`, `Dialog`, `Radio`, `RadioGroup`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `primary`, `raised`, `surface`
- `paint`: `solid`, `text`, `tonal`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Accordion** — Template picker that opens both groups by default (openMultiple, defaultValue default and mine); the ACE and HS scenes wrap it in a RadioGroup in a Templates dialog. Selector: `[class~="aui-accordion"]`.
2. **Item** — One template group, Default Templates or My Templates. Selector: `[class~="aui-accordion-item"]`.
3. **Trigger** — Plain title row with no icon; ACE sets the name as an l4 Type, HS as bare text. Selector: `[class~="aui-accordion-trigger"]`.
4. **Chevron** — Chevron on the right of each group title. Selector: `[class~="aui-accordion-trigger"] > [class~="aui-accordion-chevron"]`.
5. **Panel** — Rows of the group: Two-beam connection under Default Templates, and "Create your own template." (Header hanger in the dialogs) under My Templates. Selector: `[class~="aui-accordion-panel"]`.
6. **Template radio** — Dialog scenes only: each template row is a radio with its name as Radio.Label, with one selected through RadioGroup defaultValue="2". Selector: `[class~="aui-accordion-panel"] [class~="aui-radio"]`.

## Apps

- ACE (`ace`)
- HS (`hs`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Template groups (`ace-template-groups`)

Apps: ACE

In context source: ACE: `src/features/templates/ui/NewFromTemplateDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Templates dialog** — The Dialog popup titled Templates that lists the template groups. Selector: `[class~="aui-dialog-popup"]`.
2. **Templates title bar** — The raised Dialog.Title reading "Templates", with the Close Templates button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close (aria-label "Close Templates") that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Templates body** — The scrollable Dialog.Body holding the RadioGroup that wraps the Default Templates and My Templates groups (the Cancel and Create footer is left out). Selector: `[class~="aui-dialog-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-003/example.tsx`

```tsx
import { Accordion, Type } from '../../../kit';

export default function Example() {
  return (
    <Accordion openMultiple defaultValue={['default', 'mine']}>
      <Accordion.Item value="default">
        <Accordion.Header>
          <Accordion.Trigger>
            Default Templates
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <Type as="p" role="p3">Two-beam connection</Type>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="mine">
        <Accordion.Header>
          <Accordion.Trigger>
            My Templates
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <Type as="p" role="p3">Create your own template.</Type>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-003/options/ace-template-groups/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Dialog, Radio, RadioGroup, Type, View } from '../../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const ROW = { paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', width: 'fill' } } as const;

// ACE New from template (src/features/templates/ui/NewFromTemplateDialog.tsx): the Popup with a raised Title and the close X, and a Body holding a RadioGroup over an Accordion of two groups (Default Templates, My Templates; both open) whose trigger titles are Type l4. Left out: more rows, the empty state, the row actions, the Cancel and Create footer and the delete confirm.
export default function AceTemplateGroupsScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Templates
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Templates" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <RadioGroup defaultValue="2">
                <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['default', 'mine']}>
                  <Accordion.Item value="default">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Type role="l4">Default Templates</Type>
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={ROW}>
                        <Radio value="1" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                          <Radio.Label>Two-beam connection</Radio.Label>
                        </Radio>
                      </View>
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="mine">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Type role="l4">My Templates</Type>
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={ROW}>
                        <Radio value="2" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                          <Radio.Label>Header hanger</Radio.Label>
                        </Radio>
                      </View>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion></span>
              </RadioGroup>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### 2. Template groups — UI variant 2 (`hs-template-groups`)

Apps: HS, FD

In context source: HS: `src/hs/TemplateDialogs.tsx`; FD: `src/components/TemplatesDialog.jsx`

In context view: Shown.

#### In context structure additions

1. **Templates dialog** — The Dialog popup titled Templates that lists the template groups. Selector: `[class~="aui-dialog-popup"]`.
2. **Templates title bar** — The raised Dialog.Title reading "Templates", with the Close Templates button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close (aria-label "Close Templates") that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **Templates body** — The scrollable Dialog.Body holding the RadioGroup that wraps the Default Templates and My Templates groups (the Cancel and Create footer is left out). Selector: `[class~="aui-dialog-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-003/options/hs-template-groups/example.tsx`

```tsx
import { Accordion, Type } from '../../../../../kit';

export default function Example() {
  return (
    <Accordion openMultiple defaultValue={['default', 'mine']}>
      <Accordion.Item value="default">
        <Accordion.Header>
          <Accordion.Trigger>
            Default Templates
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <Type as="p" role="p3">Two-beam connection</Type>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="mine">
        <Accordion.Header>
          <Accordion.Trigger>
            My Templates
            <Accordion.Chevron />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <Type as="p" role="p3">Create your own template.</Type>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-003/options/hs-template-groups/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Dialog, Radio, RadioGroup, View } from '../../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;
const ROW = { paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', width: 'fill' } } as const;

// HS Templates dialog (src/hs/TemplateDialogs.tsx; FD src/components/TemplatesDialog.jsx writes the same dialog): the shell dialog Popup with a raised Title and the close X, and a Body holding a RadioGroup over an Accordion of two groups (Default Templates, My Templates; both open) whose triggers are plain text. Left out: more rows, the empty state, the row actions, the Cancel and Create footer and the delete confirm.
export default function HsTemplateGroupsScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Templates
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close Templates" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <RadioGroup defaultValue="2">
                <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['default', 'mine']}>
                  <Accordion.Item value="default">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        Default Templates
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={ROW}>
                        <Radio value="1" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                          <Radio.Label>Two-beam connection</Radio.Label>
                        </Radio>
                      </View>
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="mine">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        My Templates
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>
                      <View aui={ROW}>
                        <Radio value="2" aui={{ ...SELECTION, sx: { flex: 'fill' } }}>
                          <Radio.Label>Header hanger</Radio.Label>
                        </Radio>
                      </View>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion></span>
              </RadioGroup>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
