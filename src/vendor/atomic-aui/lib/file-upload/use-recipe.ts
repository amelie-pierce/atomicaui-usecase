// modules/design/atomic-aui/src/lib/file-upload/use-recipe.ts
//
// FileUpload's AUTHORED leaf vocab + types + the styling recipe (no React, no DOM wiring).
//
// FileUpload is a HAND-CRAFTED interactive dropzone (no Base UI file-upload primitive exists —
// the View/Icon precedent): a full `.aui-frame` leaf whose four COMPONENT-LOCAL states map the
// Figma ADC Kit variants (file `k8FukCxNuhOr4SaKhTiDSC`, page `FileUpload` 3657:4794):
//
//   idle      → FileUpload/Default   (3898:1969)  tonal surface     + DASHED border
//   uploading → FileUpload/Uploading (3898:2239)  tonal surface-alt
//   error     → FileUpload/Failed    (3898:2373)  tonal error
//   done      → FileUpload/Success   (3926:230)   tonal success
//
// These keys are FileUpload-LOCAL — they never widen the shared toggle `AuiStateKey`/
// `EnabledStateKey` unions. Per the Figma dev spec: shape `soft` (radius 4), border-width
// `default` (1px all sides at the sm stroke rail), elevation 0, background/foreground/
// border-color `default` (the unset path — no phantom `aui-*-default` layer-3 classes).
//
// BORDER STYLE ENCODES INTERACTIVITY (user rule 2026-07-04): DASHED ⇔ the user can interact
// (drop/pick live) — `idle` AND `error` (the retry state) carry `sx.borderStyle: 'dashed'`;
// `uploading` (busy-inert) and `done` resolve solid. Figma evidence: the Default variant's
// Surface renders `border-dashed`, Uploading/Success render solid; the Failed variant renders
// solid in Figma but the user rule (dashed ⇔ interactable) overrides it for `error` — a
// deliberate, documented divergence. Expressed through the generated `borderStyle` sx axis
// (`aui-border-style-dashed` → `--aui-border-style`, which the frame base map reads via
// `border-style: var(--aui-border-style, solid)`) as per-state vocab sx defaults — NOT
// hand-rolled marker CSS. A consumer's top-level `aui.sx.borderStyle` or per-state
// `aui.states.<state>.sx.borderStyle` overrides it through the normal source cascade.
//
// BUSY = INERT (user rule 2026-07-04): the `uploading` state suppresses the interactive
// state-layer classes entirely (no hover tint, no focus ring vocabulary) — see
// `useFileUploadRecipe` below; the component gates the event handlers to match.
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { defineLeaf, type Appearance, type StateAppearance } from '../../core/vocabulary/leaf-vocabulary';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

export type FileUploadState = 'idle' | 'uploading' | 'error' | 'done';

export const FILE_UPLOAD_STATE_KEYS = ['idle', 'uploading', 'error', 'done'] as const satisfies readonly FileUploadState[];

// The Figma dev-spec "shared across ALL states" appearance block (consume-time defaults). The
// `default` color-role values are the UNSET path — the recipe must not emit phantom
// `aui-bg-default`/`aui-fg-default`/`aui-border-color-default` classes for them.
export const FILE_UPLOAD_DEFAULTS = {
  shape: 'soft',
  borderWidth: 'default',
  elevation: 0,
  background: 'default',
  foreground: 'default',
  borderColor: 'default',
  emphasis: 'default',
} as const;

export type FileUploadStateAppearance = Omit<StateAppearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

export type FileUploadAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<FileUploadState, FileUploadStateAppearance>>;
};

// FULL-surface sx (the no-missing-knobs STANDARD — G12/G13). Count-agnostic: derived from
// `STYLE_PROP_MAP` membership, never a hand-maintained literal list/count.
export const FILE_UPLOAD_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const FILE_UPLOAD_VOCAB = defineLeaf({
  marker: 'aui-file-upload',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FILE_UPLOAD_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface' as const,
    paint: 'tonal' as const,
    scale: 'sm' as const,
    shape: 'soft' as const,
    elevation: 0 as const,
  },
  states: {
    // dashed ⇔ interactable (drop/pick live): idle + error. uploading/done resolve solid.
    idle: { color: 'surface' as const, paint: 'tonal' as const, sx: { borderStyle: 'dashed' as const } },
    uploading: { color: 'surface-alt' as const, paint: 'tonal' as const },
    error: { color: 'error' as const, paint: 'tonal' as const, sx: { borderStyle: 'dashed' as const } },
    done: { color: 'success' as const, paint: 'tonal' as const },
  },
});

// The interactive dropzone surface: hover/press tint + the focus ring vocabulary — the exact
// class set `useStateLayer` emits for Button (button.spec.tsx pins the same trio).
const STATE_LAYER_CLASSES = 'aui-stateful aui-focus-color-info aui-focus-width-2';
// The Figma 220-Border-Width `default` mode: the generated layer-2 cell that BRIDGES the border
// thickness to the scale-driven stroke rail (`--aui-stroke-width-context`, 1px at sm) — the
// Menubar.Divider precedent. An `aui.sx.borderWidth` override still wins (layer-3 beats the cell).
const BORDER_WIDTH_DEFAULT_CLASS = 'aui-border-width-default';

export interface UseFileUploadRecipeProps {
  aui?: FileUploadAui;
  state?: FileUploadState;
  disabled?: boolean;
  className?: string;
}

export interface UseFileUploadRecipeResult {
  className: string;
  state: FileUploadState;
}

export function useFileUploadRecipe({
  aui,
  state = 'idle',
  disabled,
  className,
}: UseFileUploadRecipeProps): UseFileUploadRecipeResult {
  // DISABLED suppresses the dashed interact-affordance (dashed ⇔ interactable — the user rule):
  // inject a top-level `sx.borderStyle: 'solid'` UNDER the consumer's own sx keys, so it beats
  // the vocab per-state dashed default while an explicit consumer borderStyle still wins. The
  // chroma flip itself (the canonical context-independent `aui-color-<paint>-disabled` pair) is
  // buildLeafClasses' standard `disabled` path — the sibling (Button/Checkbox) mechanism, not a
  // FileUpload invention.
  const effectiveAui = disabled
    ? ({ ...aui, sx: { borderStyle: 'solid' as const, ...(aui?.sx ?? {}) } } as FileUploadAui)
    : aui;
  const recipe = buildLeafClasses(
    FILE_UPLOAD_VOCAB,
    effectiveAui as (Appearance & { states?: Record<string, StateAppearance> }) | undefined,
    state,
    !!disabled,
  );
  // BUSY / TERMINAL / DISABLED = INERT: `uploading` (busy), `done` (terminal, display-only — no
  // click-to-repick; user-directed 2026-07-05), and `disabled` all drop the interactive state-layer
  // classes — no hover/press tint, no focus vocabulary. The component gates the handlers to match, so
  // a click on any of them is a no-op at the EVENT level, not CSS masking. `error` STAYS interactive
  // (the retry affordance). `done` keeps its success chroma — this is only the interactivity gate,
  // NOT the disabled chroma flip.
  const interactive = state !== 'uploading' && state !== 'done' && !disabled;
  return {
    className: [
      recipe,
      BORDER_WIDTH_DEFAULT_CLASS,
      interactive ? STATE_LAYER_CLASSES : undefined,
      className,
    ]
      .filter(Boolean)
      .join(' '),
    state,
  };
}
