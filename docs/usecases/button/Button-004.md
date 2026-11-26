# Button-004: Show all products button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-004/usecase.ts`

## What it is

A Button styled as an underlined warning-colored link inside body copy.

## When to choose it

Use it for an action, not navigation, that belongs inside a sentence. For real navigation use a link. The real site underlines a phone link in the default color, so the two differ.

## Where it belongs

Sentences of body text where an action reads as a link: All Products, Form. Real site source: HCS. Built from src/components/HcsNoOutputResults.tsx.

## Usage guidance

Set aui scale "sm", profile "no-padding", color "warning" and paint "text", plus sx display "inline-flex" and textDecoration "underline". Set type="button". In context the example is the end of the second bullet of "You can try:" in the No Output Results warning card (tonal warning View, triangle icon, heading, bulleted list with disc markers); the app adds a one-line explanation and a Need help paragraph with a second inline button (Form), left out here. In the app the card is sticky inside the table scroll area; here it stands alone.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Icon`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `default`, `no-padding`
- `color`: `warning`
- `paint`: `text`, `tonal`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Container** — The inline "All Products" Button inside a sentence: profile "no-padding" removes the box, inline-flex and an underline make it read as a warning-colored link; type="button" keeps it from submitting. Selector: `[class~="aui-button"]`.
2. **Label** — The underlined words "All Products" that sit in the middle of the sentence "Selecting … to review all solutions". Selector: `[class~="aui-button"]`. Direct text is highlighted.

## Component layer steps

1. **Container** — The inline "All Products" Button inside a sentence: profile "no-padding" removes the box, inline-flex and an underline make it read as a warning-colored link; type="button" keeps it from submitting. Selector: `[class~="aui-button"]`.

## Apps

- HCS (`hcs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Inline link (`default`)

Apps: HCS

In context source: HCS: `src/components/HcsNoOutputResults.tsx`

In context view: Shown.

#### In context structure additions

1. **No output results notice** — The tonal warning status with the triangle icon and the "No Output Results" heading. Part marker: `data-ug-part="notice"`.
2. **Suggestions list** — The "You can try:" bulleted list whose list item holds the inline All Products button. Part marker: `data-ug-part="try-list"`.

#### In context layer steps

1. **No output results notice** — The tonal warning status with the triangle icon and the "No Output Results" heading. Selector: `[data-ug-part="notice"]`.
2. **Suggestions list** — The "You can try:" bulleted list whose list item holds the inline All Products button. Selector: `[data-ug-part="try-list"]`.
3. **Container** — The inline "All Products" Button inside a sentence: profile "no-padding" removes the box, inline-flex and an underline make it read as a warning-colored link; type="button" keeps it from submitting. Selector: `[class~="aui-button"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-004/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <>
      Selecting{' '}
      <Button
        type="button"
        aui={{
          scale: 'sm',
          profile: 'no-padding',
          color: 'warning',
          paint: 'text',
          sx: { display: 'inline-flex', textDecoration: 'underline' },
        }}
      >
        All Products
      </Button>{' '}
      to review all solutions, including the reasons each one failed.
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-004/options/default/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Icon, Type, View } from '../../../../../kit';

// HcsNoOutputResults cut to its heading and the "You can try:" list: a tonal warning View with the triangle icon at the start and a text
// column (the app's `.hcs-no-output-steps` restores the disc markers, here an inline listStyle). The inline button sits inside its list
// item. The app adds the one-line explanation and the "Need help?" paragraph with the phone link and the Form button.
export default function BodyTextContext({ children }: ContextProps) {
  return (
    <View
      role="status"
      data-ug-part="notice"
      aui={{ scale: 'sm', profile: 'default', color: 'warning', paint: 'tonal', shape: 'soft', sx: { display: 'flex', alignItems: 'center', textAlign: 'start' } }}
      style={{ inlineSize: 'min(100%, 400px)' }}
    >
      <Icon name="triangle-exclamation" aui={{ scale: 'sm', color: 'warning' }} />
      <View aui={{ scale: 'sm', profile: 'no-padding', color: 'warning', paint: 'text', sx: { display: 'flex', flexDirection: 'column', minWidth: '0' } }}>
        <Type as="h3" role="l4" weight="semi-bold">No Output Results</Type>
        <Type role="l4" weight="semi-bold">You can try:</Type>
        <View data-ug-part="try-list" as="ul" aui={{ scale: 'sm', profile: 'no-padding', color: 'warning', paint: 'text', sx: { paddingInlineStart: '24' } }} style={{ listStyle: 'disc' }}>
          <li>
            {children}
          </li>
        </View>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
