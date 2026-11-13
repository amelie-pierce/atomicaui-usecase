// modules/design/atomic-aui/src/lib/icon/fa-mapping.ts
//
// Pure mapping module: FontAwesome identity axes → FA web class names + AtomicAUI data-attributes.
// No React, no CSS, no side-effects, no console output.
// Single source of truth that keeps FA classes and CSS-token data-attrs in lockstep.

export type IconFamily = 'classic' | 'sharp' | 'v6';
export type IconLayer  = 'monotone' | 'duotone';
export type IconWeight = 'thin' | 'light' | 'regular' | 'solid';

// Regex for valid icon names: lowercase kebab-case segments of [a-z0-9], no leading/trailing/double hyphens.
export const ICON_NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Returns true when `name` is a syntactically valid kebab-case icon name.
 *  Content filtering (rejecting 'fa-' prefixes, modifier class names, etc.) is the component's job. */
export function isValidIconName(name: string): boolean {
  return ICON_NAME_RE.test(name);
}

// ---

const FAMILY_DATA_ATTR: Record<IconFamily, string> = {
  classic: 'fa-7-pro',
  sharp:   'fa-7-pro-sharp',
  v6:      'fa-v6',
};

export interface FaRender {
  /** FA classes ONLY, in canonical order (e.g. ['fa-sharp','fa-solid','fa-house']). */
  classNames: string[];
  /** AtomicAUI CSS-selector data-attributes — BOTH are always present. */
  dataAttrs: {
    'data-aui-icon-family': string;
    'data-aui-icon-style': IconLayer;
  };
}

/**
 * Maps the three icon identity axes to FontAwesome web class names and the two
 * AtomicAUI CSS-selector data-attributes.
 *
 * Assumes `name` is already validated by the caller (component layer), but will
 * not throw on unvalidated input — it simply interpolates the name as-is.
 *
 * Both data-attributes are always present — the generated CSS `[data-aui-icon-family][data-aui-icon-style]`
 * compound selector requires both or the font fails to resolve.
 *
 * Class order:
 *   1. Family prefix  (sharp → 'fa-sharp'; classic/v6 → none)
 *   2. Layer/weight token (see rules below)
 *   3. Name           ('fa-{name}')
 *
 * Layer/weight rules (§6.1):
 *   monotone            → push 'fa-{weight}'
 *   duotone + classic   → push 'fa-duotone'  (NO weight class — duotone is its own family token)
 *   duotone + sharp     → push 'fa-sharp-duotone' and REPLACE the step-1 'fa-sharp' prefix
 *   duotone + v6        → CANONICAL DEGRADE: push 'fa-{weight}' (FA6 Free has no duotone);
 *                         data-aui-icon-style is still 'duotone' so the generated token row handles it
 */
export function faRender(input: {
  family: IconFamily;
  layer: IconLayer;
  weight: IconWeight;
  name: string;
}): FaRender {
  const { family, layer, weight, name } = input;
  const classNames: string[] = [];

  if (layer === 'monotone') {
    // Step 1: family prefix (sharp only)
    if (family === 'sharp') classNames.push('fa-sharp');

    // Step 2: weight class
    classNames.push(`fa-${weight}`);
  } else {
    // layer === 'duotone'
    if (family === 'classic') {
      // Step 2: duotone token (no prefix, no weight)
      classNames.push('fa-duotone');
    } else if (family === 'sharp') {
      // fa-sharp-duotone REPLACES fa-sharp + any weight — emit only one class here
      classNames.push('fa-sharp-duotone');
    } else if (family === 'v6') {
      // canonical degrade — no duotone support in FA6 Free
      // No family prefix for v6; push weight class as fallback
      classNames.push(`fa-${weight}`);
    } else {
      const _exhaustive: never = family;
      throw new Error(`unhandled icon family: ${String(_exhaustive)}`);
    }
  }

  // Step 3: icon name
  classNames.push(`fa-${name}`);

  return {
    classNames,
    dataAttrs: {
      'data-aui-icon-family': FAMILY_DATA_ATTR[family],
      'data-aui-icon-style':  layer,
    },
  };
}
