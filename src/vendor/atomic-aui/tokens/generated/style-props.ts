// AUTO-GENERATED — DO NOT EDIT
// Source: AtomicAUI Core 7.0 (Figma file 3ZvIabuROiLDIH3onwm3A4)
// Synced: 2026-10-13T08:50:04.580Z
//
// Typed layer-3 style-prop overrides (AuiStyleProps) — the enum-constrained
// replacement for raw `className`. A SET prop emits an `.aui-<axis>-<value>`
// class that overrides the `--aui-<axis>` hook the `.aui-frame` base map reads,
// winning unconditionally over the active paint. Derived from LAYER3_MAP +
// the Aui<Axis>Value unions in ./tokens, plus static keyword utilities (e.g.
// textAlign) from lib/emitters/static-utilities.ts. See the typed-layer3 spec.

/* eslint-disable */
import type {
  AuiBackgroundValue,
  AuiForegroundValue,
  AuiBorderColorValue,
  AuiBorderBlockStartWidthValue,
  AuiBorderBlockEndWidthValue,
  AuiBorderInlineStartWidthValue,
  AuiBorderInlineEndWidthValue,
  AuiRadiusStartStartValue,
  AuiRadiusStartEndValue,
  AuiRadiusEndStartValue,
  AuiRadiusEndEndValue,
  AuiPaddingInlineStartValue,
  AuiPaddingBlockStartValue,
  AuiPaddingInlineEndValue,
  AuiPaddingBlockEndValue,
  AuiGapValue,
  AuiWidthValue,
  AuiMinWidthValue,
  AuiMaxWidthValue,
  AuiHeightValue,
  AuiMinHeightValue,
  AuiMaxHeightValue,
  AuiFontSizeValue,
  AuiLineHeightValue,
  AuiLetterSpacingValue,
  AuiTypographyStyleValue,
  AuiIconSizeValue,
  AuiIconContainerValue,
  AuiDotSizeValue,
  AuiFocusColorValue,
  AuiFocusWidthValue,
  AuiTextAlignValue,
  AuiDisplayValue,
  AuiFlexDirectionValue,
  AuiFlexWrapValue,
  AuiAlignItemsValue,
  AuiJustifyContentValue,
  AuiAlignSelfValue,
  AuiFlexValue,
  AuiFlexBasisValue,
  AuiOverflowValue,
  AuiOverflowXValue,
  AuiOverflowYValue,
  AuiPositionValue,
  AuiGridTemplateColumnsValue,
  AuiGridColumnValue,
  AuiMarginValue,
  AuiWhiteSpaceValue,
  AuiTextOverflowValue,
  AuiTextDecorationValue,
  AuiBorderStyleValue,
} from './tokens';

export interface AuiStyleProps {
  background?: AuiBackgroundValue;
  foreground?: AuiForegroundValue;
  borderColor?: AuiBorderColorValue;
  borderBlockStartWidth?: AuiBorderBlockStartWidthValue;
  borderBlockEndWidth?: AuiBorderBlockEndWidthValue;
  borderInlineStartWidth?: AuiBorderInlineStartWidthValue;
  borderInlineEndWidth?: AuiBorderInlineEndWidthValue;
  radiusStartStart?: AuiRadiusStartStartValue;
  radiusStartEnd?: AuiRadiusStartEndValue;
  radiusEndStart?: AuiRadiusEndStartValue;
  radiusEndEnd?: AuiRadiusEndEndValue;
  paddingInlineStart?: AuiPaddingInlineStartValue;
  paddingBlockStart?: AuiPaddingBlockStartValue;
  paddingInlineEnd?: AuiPaddingInlineEndValue;
  paddingBlockEnd?: AuiPaddingBlockEndValue;
  gap?: AuiGapValue;
  rowGap?: AuiGapValue;
  columnGap?: AuiGapValue;
  width?: AuiWidthValue;
  minWidth?: AuiMinWidthValue;
  maxWidth?: AuiMaxWidthValue;
  height?: AuiHeightValue;
  minHeight?: AuiMinHeightValue;
  maxHeight?: AuiMaxHeightValue;
  fontSize?: AuiFontSizeValue;
  lineHeight?: AuiLineHeightValue;
  letterSpacing?: AuiLetterSpacingValue;
  typographyStyle?: AuiTypographyStyleValue;
  iconSize?: AuiIconSizeValue;
  iconContainer?: AuiIconContainerValue;
  dotSize?: AuiDotSizeValue;
  focusColor?: AuiFocusColorValue;
  focusWidth?: AuiFocusWidthValue;
  textAlign?: AuiTextAlignValue;
  display?: AuiDisplayValue;
  flexDirection?: AuiFlexDirectionValue;
  flexWrap?: AuiFlexWrapValue;
  alignItems?: AuiAlignItemsValue;
  justifyContent?: AuiJustifyContentValue;
  alignSelf?: AuiAlignSelfValue;
  flex?: AuiFlexValue;
  flexBasis?: AuiFlexBasisValue;
  overflow?: AuiOverflowValue;
  overflowX?: AuiOverflowXValue;
  overflowY?: AuiOverflowYValue;
  position?: AuiPositionValue;
  gridTemplateColumns?: AuiGridTemplateColumnsValue;
  gridColumn?: AuiGridColumnValue;
  margin?: AuiMarginValue;
  whiteSpace?: AuiWhiteSpaceValue;
  textOverflow?: AuiTextOverflowValue;
  textDecoration?: AuiTextDecorationValue;
  borderStyle?: AuiBorderStyleValue;
}

/**
 * Maps each `AuiStyleProps` key to its utility class prefix. A set value emits
 * `${prefix}-${value}`. Iterate this map in the core `buildStyleProps` builder.
 */
export const STYLE_PROP_MAP = {
  background: 'aui-bg',
  foreground: 'aui-fg',
  borderColor: 'aui-border-color',
  borderBlockStartWidth: 'aui-border-block-start-width',
  borderBlockEndWidth: 'aui-border-block-end-width',
  borderInlineStartWidth: 'aui-border-inline-start-width',
  borderInlineEndWidth: 'aui-border-inline-end-width',
  radiusStartStart: 'aui-radius-start-start',
  radiusStartEnd: 'aui-radius-start-end',
  radiusEndStart: 'aui-radius-end-start',
  radiusEndEnd: 'aui-radius-end-end',
  paddingInlineStart: 'aui-padding-inline-start',
  paddingBlockStart: 'aui-padding-block-start',
  paddingInlineEnd: 'aui-padding-inline-end',
  paddingBlockEnd: 'aui-padding-block-end',
  gap: 'aui-gap',
  rowGap: 'aui-row-gap',
  columnGap: 'aui-column-gap',
  width: 'aui-width',
  minWidth: 'aui-min-width',
  maxWidth: 'aui-max-width',
  height: 'aui-height',
  minHeight: 'aui-min-height',
  maxHeight: 'aui-max-height',
  fontSize: 'aui-font-size',
  lineHeight: 'aui-line-height',
  letterSpacing: 'aui-letter-spacing',
  typographyStyle: 'aui-typography-style',
  iconSize: 'aui-icon-size',
  iconContainer: 'aui-icon-container',
  dotSize: 'aui-dot-size',
  focusColor: 'aui-focus-color',
  focusWidth: 'aui-focus-width',
  textAlign: 'aui-text-align',
  display: 'aui-display',
  flexDirection: 'aui-flex-direction',
  flexWrap: 'aui-flex-wrap',
  alignItems: 'aui-align-items',
  justifyContent: 'aui-justify-content',
  alignSelf: 'aui-align-self',
  flex: 'aui-flex',
  flexBasis: 'aui-flex-basis',
  overflow: 'aui-overflow',
  overflowX: 'aui-overflow-x',
  overflowY: 'aui-overflow-y',
  position: 'aui-position',
  gridTemplateColumns: 'aui-grid-template-columns',
  gridColumn: 'aui-grid-column',
  margin: 'aui-margin',
  whiteSpace: 'aui-white-space',
  textOverflow: 'aui-text-overflow',
  textDecoration: 'aui-text-decoration',
  borderStyle: 'aui-border-style',
} as const;
