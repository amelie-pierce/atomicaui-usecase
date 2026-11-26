// modules/design/atomic-aui/src/lib/chart/base/palettes.ts
//
// Named chart palettes. The colours live in CSS (`tokens/_chart-tokens.scss`, built from the
// `--theme-*` role tokens mixed with the theme text colour, so they follow brand and light / dark) and switch on the
// `data-aui-palette` attribute of the chart frame, so a palette is just a name here: any framework
// stamps the attribute, and a consumer can add their own palette with plain CSS.

/** Categorical cycles (distinct hues) and single-hue ramps (sequential shades, emphasis first). */
export const CHART_PALETTES = ['brand', 'cool', 'warm', 'vivid', 'orange', 'blue', 'emerald', 'rose', 'slate'] as const;
export type ChartPalette = (typeof CHART_PALETTES)[number];

/** The default palette: primary-led (series 0 follows `--theme-primary`, so a brand switch re-colours it). */
export const CHART_DEFAULT_PALETTE: ChartPalette = 'brand';

/** The attribute the palette CSS keys off. */
export const CHART_PALETTE_ATTRIBUTE = 'data-aui-palette';
