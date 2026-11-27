# Card-001: Product card

Component family: **Card**

UI type: **Card**

Source: `src/usecase-gallery/usecases/card/Card-001/usecase.ts`

## What it is

A fixed 128 by 160 card with a contained image above a centred, wrapping title.

## When to choose it

Use it to show an item the user can open, as image plus name. Use the image tile (Card-002) when the image says it all, and the preview card (Card-003) for a popup.

## Where it belongs

The related products row at the end of the ACE calculation output (src/features/calculation/ui/CalculationOutput.tsx).

## Usage guidance

`Card` with `paint: "text"`, `profile: "equal-padding"`, `scale: "sm"`, `shape: "soft"` and `sx` of a centred flex column, 128 wide and 160 high; `Card.ImageContainer` (96 by 96, no padding) holding `Card.Image` with `fit="contain"`, then `Card.Body` (no padding, centred) with `Card.Title` as a span at `role="p2"`, semi-bold. The image is a placeholder here.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Card`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `text`
- `profile`: `equal-padding`, `no-padding`
- `scale`: `sm`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Card** — Fixed 128 by 160 soft card on scale "sm" with equal padding; its content is a centred column. Selector: `[class~="aui-card"]`. Layer step: **Card** — Fixed 128-by-160 soft card centres product content with even padding.
2. **Image container** — 96 by 96 box that holds the product picture above the title. Selector: `[class~="aui-card-image-container"]`. Layer step: **Image container** — 96-by-96 frame holds the product picture above its name.
3. **Image** — The product image, decorative (alt empty) and shown whole with fit="contain". Selector: `[class~="aui-card-image"]`. Layer step: **Image** — Decorative product image fits whole inside its reserved frame.
4. **Body** — Full-width centred column under the image that carries the title. Selector: `[class~="aui-card-body"]`. Layer step: **Body** — Full-width centred column places the product title below image.
5. **Title** — Centred, wrapping semi-bold p2 label reading "Related product"; ACE places these cards under a Related products heading. Selector: `[class~="aui-card-title"]`. Layer step: **Title** — Wrapping semi-bold label names each related product inside its card.

## Apps

- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Related products (`ace-related-products`)

Apps: ACE

In context source: ACE: `src/features/calculation/ui/CalculationOutput.tsx`

In context view: Shown.

#### In context structure additions

1. **Related products heading** — The "Related products" h3 (Type l3 semi-bold) above the cards. Part marker: `data-ug-part="section-heading"`.
2. **Card row** — The wrapping flex row (8px gap) that lays the related-product cards out side by side. Part marker: `data-ug-part="card-row"`.

#### Component UI source — `src/usecase-gallery/usecases/card/Card-001/example.tsx`

```tsx
import { Card } from '../../../kit';
import { MOCK_IMAGE_SRC } from '../../../mock-data';

export default function Example() {
  return (
    <Card aui={{ paint: 'text', profile: 'equal-padding', scale: 'sm', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none', width: '128', height: '160' } }}>
      <Card.ImageContainer aui={{ paint: 'text', profile: 'no-padding', sx: { width: '96', height: '96', flex: 'none' } }}>
        <Card.Image src={MOCK_IMAGE_SRC} alt="" fit="contain" />
      </Card.ImageContainer>
      <Card.Body aui={{ profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fill', textAlign: 'center' } }}>
        <Card.Title as="span" role="p2" weight="semi-bold" aui={{ sx: { textAlign: 'center', whiteSpace: 'normal' } }}>
          Related product
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/card/Card-001/options/ace-related-products/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Type, View } from '../../../../../kit';

// ACE CalculationOutput related products (src/features/calculation/ui/CalculationOutput.tsx): the output ends with a wrapping row of 128 x 160 cards, each the image above its centred title; the card is the link's visual. One extra card shows the row.
export default function AceRelatedProductsScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Type data-ug-part="section-heading" as="h3" role="l3" weight="semi-bold">Related products</Type>
      <View data-ug-part="card-row" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexWrap: 'wrap', gap: '8' } }}>
        {children}
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
