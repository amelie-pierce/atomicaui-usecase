// AUTO-GENERATED — DO NOT EDIT
// Source: AtomicAUI Core 7.0 (Figma file 3ZvIabuROiLDIH3onwm3A4)
// Synced: 2026-10-13T08:50:04.574Z
//
// TypeScript union types for every Layer 1/2/3 collection's modes.
// Import from @sstvn-uiux/design-atomic-aui:
//   import type { AuiColor, AuiScale } from '@sstvn-uiux/design-atomic-aui/tokens';

/* eslint-disable */

// === Layer 1 — Identity ===
export type AuiTheme =
  | "light"
  | "light-hc"
  | "dark"
  | "dark-hc";
export type AuiTypography =
  | "display"
  | "body"
  | "mono";
export type AuiIcongraphy =
  | "monotone"
  | "duotone";

// === Layer 2 — Context Specifics ===
export type AuiScale =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl";
export type AuiScaleResolved = Exclude<AuiScale, 'inherit'>;
export type AuiShape =
  | "none"
  | "soft"
  | "smooth"
  | "pill";
export type AuiBorderWidth =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4";
/** Full set including state-only modes. Prefer `AuiColor` for author-facing props. */
export type AuiColorAll =
  | "surface"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "surface-alt"
  | "raised"
  | "overlay"
  | "disabled";
export type AuiColor = Exclude<AuiColorAll, 'disabled'>;
export type AuiEmphasis =
  | "default"
  | "reduced";

// === Layer 3 — Property Tokens ===
export type AuiBackgroundValue =
  | "default"
  | "primary"
  | "on-primary"
  | "secondary"
  | "on-secondary"
  | "surface"
  | "on-surface"
  | "surface-alt"
  | "on-surface-alt"
  | "raised"
  | "on-raised"
  | "overlay"
  | "on-overlay"
  | "info"
  | "on-info"
  | "success"
  | "on-success"
  | "warning"
  | "on-warning"
  | "error"
  | "on-error"
  | "disabled"
  | "on-disabled"
  | "text"
  | "muted"
  | "outlined"
  | "transparent";
export type AuiForegroundValue =
  | "default"
  | "surface"
  | "on-surface"
  | "surface-alt"
  | "on-surface-alt"
  | "raised"
  | "on-raised"
  | "overlay"
  | "on-overlay"
  | "primary"
  | "on-primary"
  | "secondary"
  | "on-secondary"
  | "info"
  | "on-info"
  | "success"
  | "on-success"
  | "warning"
  | "on-warning"
  | "error"
  | "on-error"
  | "disabled"
  | "on-disabled"
  | "text"
  | "muted"
  | "outlined"
  | "transparent";
export type AuiBorderColorValue =
  | "default"
  | "surface"
  | "on-surface"
  | "surface-alt"
  | "on-surface-alt"
  | "raised"
  | "on-raised"
  | "overlay"
  | "on-overlay"
  | "primary"
  | "on-primary"
  | "secondary"
  | "on-secondary"
  | "info"
  | "on-info"
  | "success"
  | "on-success"
  | "warning"
  | "on-warning"
  | "error"
  | "on-error"
  | "disabled"
  | "on-disabled"
  | "text"
  | "muted"
  | "outlined"
  | "transparent";
export type AuiBorderBlockStartWidthValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4";
export type AuiBorderBlockEndWidthValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4";
export type AuiBorderInlineStartWidthValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4";
export type AuiBorderInlineEndWidthValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4";
export type AuiRadiusStartStartValue =
  | "default"
  | "none"
  | "soft"
  | "smooth"
  | "pill";
export type AuiRadiusStartEndValue =
  | "default"
  | "none"
  | "soft"
  | "smooth"
  | "pill";
export type AuiRadiusEndStartValue =
  | "default"
  | "none"
  | "soft"
  | "smooth"
  | "pill";
export type AuiRadiusEndEndValue =
  | "default"
  | "none"
  | "soft"
  | "smooth"
  | "pill";
export type AuiPaddingInlineStartValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192";
export type AuiPaddingBlockStartValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192";
export type AuiPaddingInlineEndValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192";
export type AuiPaddingBlockEndValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192";
export type AuiGapValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192";
export type AuiWidthValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192"
  | "224"
  | "256"
  | "288"
  | "320"
  | "352"
  | "384"
  | "fill";
export type AuiMinWidthValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192"
  | "224"
  | "256"
  | "288"
  | "320"
  | "352"
  | "384";
export type AuiMaxWidthValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192"
  | "224"
  | "256"
  | "288"
  | "320"
  | "352"
  | "384";
export type AuiHeightValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192"
  | "224"
  | "256"
  | "288"
  | "320"
  | "352"
  | "384"
  | "fill";
export type AuiMinHeightValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192"
  | "224"
  | "256"
  | "288"
  | "320"
  | "352"
  | "384";
export type AuiMaxHeightValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "6"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "80"
  | "96"
  | "128"
  | "160"
  | "192"
  | "224"
  | "256"
  | "288"
  | "320"
  | "352"
  | "384";
export type AuiFontSizeValue =
  | "default"
  | "8"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "48"
  | "56"
  | "64";
export type AuiLineHeightValue =
  | "default"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "22"
  | "24"
  | "26"
  | "28"
  | "30"
  | "32"
  | "36"
  | "38"
  | "40"
  | "44"
  | "48"
  | "56";
export type AuiLetterSpacingValue =
  | "default"
  | "-1"
  | "-0-5"
  | "-0-25"
  | "0"
  | "0-25"
  | "0-5"
  | "1"
  | "2";
export type AuiTypographyStyleValue =
  | "default"
  | "thin"
  | "thin-italic"
  | "extra-light"
  | "extra-light-italic"
  | "light"
  | "light-italic"
  | "regular"
  | "italic"
  | "medium"
  | "medium-italic"
  | "semi-bold"
  | "semi-bold-italic"
  | "bold"
  | "bold-italic"
  | "extra-bold"
  | "extra-bold-italic"
  | "black"
  | "black-italic";
export type AuiIconSizeValue =
  | "default"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "48";
export type AuiIconContainerValue =
  | "default"
  | "i9"
  | "i10"
  | "i12"
  | "i14"
  | "i16"
  | "i18"
  | "i20"
  | "i24"
  | "i28"
  | "i32"
  | "i36"
  | "i40";
export type AuiIconStyleValue =
  | "default"
  | "thin"
  | "light"
  | "regular"
  | "solid";
export type AuiDotSizeValue =
  | "default"
  | "t4"
  | "t6"
  | "t8"
  | "t10"
  | "t12"
  | "t16"
  | "t20"
  | "t24"
  | "t32"
  | "t40"
  | "t48";
export type AuiElevationValue =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8";
export type AuiFocusColorValue =
  | "info"
  | "on-surface"
  | "primary"
  | "error"
  | "warning"
  | "success"
  | "on-surface-variant"
  | "secondary"
  | "black"
  | "white"
  | "outline"
  | "outline-variant";
export type AuiFocusWidthValue =
  | "default"
  | "0"
  | "1"
  | "2"
  | "3";
export type AuiMotionValue =
  | "default"
  | "instant"
  | "faster"
  | "fast"
  | "base"
  | "slow"
  | "slower"
  | "slowest";

// === Runtime enum value arrays (aui axes) ===
export const AUI_SCALE_TIERS = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
] as const;
export const AUI_SHAPES = [
  "none",
  "soft",
  "smooth",
  "pill",
] as const;
export const AUI_COLORS = [
  "surface",
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
  "surface-alt",
  "raised",
  "overlay",
] as const;

// === Layout ===
export type AuiLayoutToken =
  | "container-narrow"
  | "container-default"
  | "container-wide"
  | "gutter"
  | "rhythm-sm"
  | "rhythm-md"
  | "rhythm-lg"
  | "measure";


// === Leaf recipe vocab (Task 7.3) ===
/** 200-Scale profile (size archetype) suffixes — the `aui-scale-<profile>-<tier>` segment.
 * Imported by recipe-vocab.ts and re-exported as `AuiScaleProfile`. */
export type AuiScaleProfileGenerated =
  | "block-padding"
  | "checkable"
  | "chip"
  | "compact"
  | "contained"
  | "contained-padding-inline"
  | "default"
  | "equal-padding"
  | "no-padding"
  | "progress"
  | "spinner"
  | "square"
  | "square-compact"
  | "switch";
/** 670-Elevation level as a numeric union — `aui-elevation-<n>`. */
export type AuiElevationLevel =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8;
/** Paint axis — the 230-Color family suffixes (`aui-color-<paint>-<chroma>`). */
export type AuiPaint =
  | "fixed"
  | "solid"
  | "text"
  | "tonal";
export const AUI_SCALE_PROFILES = [
  "block-padding",
  "checkable",
  "chip",
  "compact",
  "contained",
  "contained-padding-inline",
  "default",
  "equal-padding",
  "no-padding",
  "progress",
  "spinner",
  "square",
  "square-compact",
  "switch",
] as const;
export const AUI_PAINTS = [
  "fixed",
  "solid",
  "text",
  "tonal",
] as const;
export const AUI_ELEVATIONS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
] as const;


// === Static keyword utilities (non-token sx) ===
/** text-align keyword utility (`aui-text-align-<value>`). */
export type AuiTextAlignValue = 'left' | 'center' | 'right' | 'start' | 'end' | 'justify';
/** display keyword utility (`aui-display-<value>`). */
export type AuiDisplayValue = 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'block' | 'inline-block' | 'inline' | 'none' | 'contents';
/** flex-direction keyword utility (`aui-flex-direction-<value>`). */
export type AuiFlexDirectionValue = 'row' | 'row-reverse' | 'column' | 'column-reverse';
/** flex-wrap keyword utility (`aui-flex-wrap-<value>`). */
export type AuiFlexWrapValue = 'nowrap' | 'wrap' | 'wrap-reverse';
/** align-items keyword utility (`aui-align-items-<value>`). */
export type AuiAlignItemsValue = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
/** justify-content keyword utility (`aui-justify-content-<value>`). */
export type AuiJustifyContentValue = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
/** align-self keyword utility (`aui-align-self-<value>`). */
export type AuiAlignSelfValue = 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
/** flex keyword utility (`aui-flex-<value>`). */
export type AuiFlexValue = 'none' | 'auto' | 'initial' | 'fill';
/** flex-basis keyword utility (`aui-flex-basis-<value>`). */
export type AuiFlexBasisValue = 'auto' | 'content' | '0' | 'quarter' | 'third' | 'half' | 'two-thirds' | 'three-quarter' | 'full';
/** overflow keyword utility (`aui-overflow-<value>`). */
export type AuiOverflowValue = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
/** overflow-x keyword utility (`aui-overflow-x-<value>`). */
export type AuiOverflowXValue = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
/** overflow-y keyword utility (`aui-overflow-y-<value>`). */
export type AuiOverflowYValue = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
/** position keyword utility (`aui-position-<value>`). */
export type AuiPositionValue = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
/** grid-template-columns keyword utility (`aui-grid-template-columns-<value>`). */
export type AuiGridTemplateColumnsValue = '2' | '3' | 'auto-fit';
/** grid-column keyword utility (`aui-grid-column-<value>`). */
export type AuiGridColumnValue = 'full' | 'auto';
/** margin keyword utility (`aui-margin-<value>`). */
export type AuiMarginValue = '0' | 'auto';
/** white-space keyword utility (`aui-white-space-<value>`). */
export type AuiWhiteSpaceValue = 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces';
/** text-overflow keyword utility (`aui-text-overflow-<value>`). */
export type AuiTextOverflowValue = 'clip' | 'ellipsis';
/** text-decoration keyword utility (`aui-text-decoration-<value>`). */
export type AuiTextDecorationValue = 'none' | 'underline' | 'overline' | 'line-through';
/** border-style keyword utility (`aui-border-style-<value>`). */
export type AuiBorderStyleValue = 'solid' | 'dashed' | 'dotted' | 'none';
