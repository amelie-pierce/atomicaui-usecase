// modules/design/atomic-aui/src/core/merge-classes.ts
//
// Core 6.0 compound-matrix vocab: `aui-color-<paint>-<chroma>` and
// `aui-scale-<profile>-<tier>` each dedup to a single role (`aui-color` / `aui-scale`)
// via the longest-prefix match below, so a per-state override replaces the whole cell.
// Role-leaf override utilities (`aui-bg-<chroma>` / `aui-fg-<chroma>`) dedup to
// `aui-bg` / `aui-fg` — each sets one `--aui-bg`/`--aui-fg`, so last-wins is correct.
const AXIS_ROLES: readonly string[] = [
  'aui-radius-start-start', 'aui-radius-start-end', 'aui-radius-end-start', 'aui-radius-end-end',
  'aui-border-block-start-width', 'aui-border-block-end-width',
  'aui-border-inline-start-width', 'aui-border-inline-end-width',
  'aui-border-width',
  'aui-padding-inline-start', 'aui-padding-inline-end',
  'aui-padding-block-start', 'aui-padding-block-end',
  'aui-focus-color', 'aui-focus-width',
  'aui-typography-typescale', 'aui-typography-style',
  'aui-icon-container', 'aui-icon-size',
  'aui-min-width', 'aui-min-height',
  'aui-emphasis',
  'aui-line-height', 'aui-letter-spacing', 'aui-font-size',
  'aui-dot-size',
  // Static keyword utility — `aui-text-align-<value>` (one `text-align`). Deduped so a
  // later source (a cell's `aui.sx.textAlign`) wins over an earlier one (a column-default
  // `aui-text-align` from `columnDef.meta.align`) regardless of stylesheet source order.
  'aui-text-align',
  // Colour role-leaf override utilities (one `--aui-bg` / `--aui-fg` / border each).
  'aui-border-color', 'aui-fg', 'aui-bg',
  'aui-color', 'aui-scale', 'aui-shape',
  'aui-gap', 'aui-row-gap', 'aui-column-gap', 'aui-margin',
  'aui-width', 'aui-height', 'aui-elevation', 'aui-motion',
];

export function auiRole(cls: string): string {
  for (const axis of AXIS_ROLES) {
    if (cls === axis || cls.startsWith(`${axis}-`)) return axis;
  }
  return cls;
}

export function mergeAuiClasses(fragments: (string | false | null | undefined)[]): string {
  const order: string[] = [];
  const byRole = new Map<string, string>();
  for (const frag of fragments) {
    if (!frag) continue;
    for (const cls of frag.split(/\s+/).filter(Boolean)) {
      const role = auiRole(cls);
      if (!byRole.has(role)) order.push(role);
      byRole.set(role, cls);
    }
  }
  const out: string[] = [];
  for (const role of order) {
    const cls = byRole.get(role);
    if (cls !== undefined) out.push(cls);
  }
  return out.join(' ');
}
