// modules/design/atomic-aui/src/lib/file-upload-dropzone/use-recipe.ts
//
// FileUploadDropzone's AUTHORED overlay vocab + the styling recipe (no React, no DOM wiring).
//
// FileUploadDropzone is a HAND-CRAFTED drag target (no Base UI drop primitive exists — the FileUpload/View
// precedent). Its ROOT is deliberately NOT a frame: it wraps arbitrary consumer content, and a frame's
// scale cell would inject padding/gap/typography into that content (the "must not change layout"
// contract). The only DS-painted surface is the OVERLAY — a full `.aui-frame` leaf shown while files
// are dragged over the zone. It REPLICATES the FileUpload idle dropzone's overlay UI exactly (same
// recipe cell + same layout markers, `file-upload/use-recipe.ts` + the `.aui-file-upload*` block):
//   - tonal `surface` at the `sm` scale, `soft` shape, elevation 0 — FileUpload's idle vocab cell, so
//     padding / gap / type / radius come from the identical generated scale rail.
//   - DASHED hairline = "you can drop" (the FileUpload dashed ⇔ interactable rule), expressed through
//     the generated `borderStyle` sx axis as a vocab default — NOT hand-rolled marker CSS.
//   - `aui-border-width-default` bridges the border to the scale stroke rail (the FileUpload /
//     Menubar.Divider mechanism) so a consumer `aui.sx.borderWidth` still wins.
//   - `aui-stateful`: the shipped state-layer host. The marker CSS raises its `::after` tint to 0.16
//     (FileUpload's drag-over affordance) — the overlay only exists while dragging, so it is always on.
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

export type FileUploadDropzoneOverlayAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

// FULL-surface sx (the no-missing-knobs STANDARD — G12/G13). Count-agnostic: derived from
// `STYLE_PROP_MAP` membership, never a hand-maintained literal list/count.
export const FILE_UPLOAD_DROPZONE_OVERLAY_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export const FILE_UPLOAD_DROPZONE_OVERLAY_VOCAB = defineLeaf({
  marker: 'aui-file-upload-dropzone-overlay',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: FILE_UPLOAD_DROPZONE_OVERLAY_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface' as const,
    paint: 'tonal' as const,
    scale: 'sm' as const,
    shape: 'soft' as const,
    elevation: 0 as const,
    sx: { borderStyle: 'dashed' as const },
  },
});

// The Figma 220-Border-Width `default` mode cell — see FileUpload's `BORDER_WIDTH_DEFAULT_CLASS`.
const BORDER_WIDTH_DEFAULT_CLASS = 'aui-border-width-default';
// The shipped state-layer host (FileUpload's `STATE_LAYER_CLASSES` minus the focus vocabulary — the
// overlay is aria-hidden and never focusable).
const STATE_LAYER_CLASS = 'aui-stateful';

export interface UseFileUploadDropzoneOverlayRecipeProps {
  aui?: FileUploadDropzoneOverlayAui;
  className?: string;
}

export function useFileUploadDropzoneOverlayRecipe({
  aui,
  className,
}: UseFileUploadDropzoneOverlayRecipeProps): string {
  const recipe = buildLeafClasses(FILE_UPLOAD_DROPZONE_OVERLAY_VOCAB, aui as Appearance | undefined);
  return [recipe, BORDER_WIDTH_DEFAULT_CLASS, STATE_LAYER_CLASS, className].filter(Boolean).join(' ');
}
