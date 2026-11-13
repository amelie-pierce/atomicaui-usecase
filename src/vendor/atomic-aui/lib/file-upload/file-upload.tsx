// modules/design/atomic-aui/src/lib/file-upload/file-upload.tsx
//
// FileUpload — the drag-and-drop / click-to-browse dropzone with live upload progress and
// failed-upload recovery. HAND-CRAFTED interactive component (no Base UI file-upload primitive
// exists — the View precedent), styled by `useFileUploadRecipe` (see use-recipe.ts for the
// Figma state contract; ADC Kit `k8FukCxNuhOr4SaKhTiDSC` page FileUpload 3657:4794).
//
// FileUpload COMPOSES sibling leaf components (the Toast precedent — a "part" that IS a shipped
// sibling renders the REAL component, never a bespoke lookalike):
//
//   • FileUpload (Root, marker `aui-file-upload`)  — the stateful dropzone frame + the hidden
//     native `input[type="file"]` + drag/drop + click-to-browse. Childless it AUTO-RENDERS the
//     per-state Figma anatomy below (the Progress/Toast childless convention); explicit children
//     replace the auto-anatomy wholesale (the hidden input always stays).
//   • FileUpload.Icon (`aui-file-upload-icon`)         — the shipped ContainedIcon, identity
//     `file-arrow-up` / monotone (Figma Icons variable), inheriting the state foreground.
//   • FileUpload.Row (`aui-file-upload-row`)           — a centered inline text row (marker part).
//   • FileUpload.Label (`aui-file-upload-label`)       — a text segment (a thin `Type` span — the
//     Chip.Label precedent). The auto-anatomy adds `aui-file-upload-percent` on the percent
//     segment (Figma renders it Inter Medium).
//   • FileUpload.Action (`aui-file-upload-action`)     — the link-styled browse/retry trigger: a
//     REAL Button (text-primary, the Figma Link sub-component: 230-Color text → primary) that
//     opens the picker through FileUpload context. Its inline-link metrics are all props: scale
//     `xs` IS the Figma typography (l4 14/18 + `--p-weight-medium` — the generated
//     `aui-scale-default-xs` cell), the paddings/mins zero out via `sx`.
//   • FileUpload.Progress (`aui-file-upload-progress`)  — the REAL shipped Progress bar with the
//     Figma FileUpload pins merged UNDER a consumer `aui`: shape `pill`, scale `md` (the Figma
//     bar: height 8 / min-width 80 = the generated `aui-scale-progress-md` cell; the Progress
//     root's own raised/solid default IS the Figma track), the Indicator recolored per state
//     (uploading → primary, error → error, done → success — the Figma dev-spec sub-overrides).
//
// Per-state auto-anatomy (copy = the Language variable EN values). TWO-ROW layout (user-directed
// 2026-07-05): row 1 = the ICON (EVERY state, tinted by the state foreground), row 2 = the content
// group; both rows hug and the pair clusters dead-center in the root's min-height-160 box. There is
// NO percent text line in any state — the bar conveys determinate progress:
//   idle      icon · "Drop your file here to import or" [Click to browse file]
//   uploading icon · "Uploading" / "fileName (size)" · progress bar
//              (INDETERMINATE — no numeric progress: the bar SWEEPS)
//   error     icon · "Failed to upload" / "fileName (size)" · partial bar · "Drop or" [Pick] "another file to retry."
//   done      icon · "Uploaded" / "fileName (size)" · full progress bar
// `fileName`/`sizeLabel` compose line 2 as `fileName (size)` — the size is a parenthesized postfix
// when supplied; the file line is omitted when both are absent. `sizeLabel` is an ADC consumer need,
// not in the Figma frame.
import * as React from 'react';
import { createAtomicPart, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { ContainedIcon, type ContainedIconProps, type ContainedIconAui, type IconFamily, type IconLayer, type IconWeight } from '../icon';
import { Progress, type ProgressProps, type ProgressIndicatorProps } from '../progress';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { useFileUploadRecipe } from './use-recipe';
import type { FileUploadAui, FileUploadState } from './use-recipe';

export type FileUploadLanguage = 'en' | 'vn' | 'cn' | 'pl';

/** One state's runtime copy. `text` is the leading status/prompt segment; `action` is the
 *  link-styled trigger label (idle: browse, error: the retry Pick); `retryPrefix`/`retrySuffix`
 *  flank the error-state retry action. Unused keys are ignored for states without that segment. */
export interface FileUploadMessage {
  text: string;
  action: string;
  retryPrefix: string;
  retrySuffix: string;
}

/** Per-state copy overrides, merged over the active locale's built-ins. */
export type FileUploadMessages = Partial<Record<FileUploadState, Partial<FileUploadMessage>>>;

// The built-in runtime copy. EN = the Figma Language variable values (verified against the ADC
// Kit dev spec + rendered variants). VN/CN/PL translate the same Figma copy — the Figma Language
// collection's non-EN modes were not resolvable through the probe (REST returns the active mode
// only), so these are best-effort translations, override via `messages` when product copy exists.
export const FILE_UPLOAD_MESSAGES: Record<FileUploadLanguage, Record<FileUploadState, FileUploadMessage>> = {
  en: {
    idle: { text: 'Drop your file here to import or', action: 'Click to browse file', retryPrefix: '', retrySuffix: '' },
    uploading: { text: 'Uploading', action: '', retryPrefix: '', retrySuffix: '' },
    error: { text: 'Failed to upload', action: 'Pick', retryPrefix: 'Drop or', retrySuffix: 'another file to retry.' },
    done: { text: 'Uploaded', action: '', retryPrefix: '', retrySuffix: '' },
  },
  vn: {
    idle: { text: 'Thả tệp vào đây để nhập hoặc', action: 'Bấm để chọn tệp', retryPrefix: '', retrySuffix: '' },
    uploading: { text: 'Đang tải lên', action: '', retryPrefix: '', retrySuffix: '' },
    error: { text: 'Tải lên thất bại', action: 'Chọn', retryPrefix: 'Thả hoặc', retrySuffix: 'tệp khác để thử lại.' },
    done: { text: 'Đã tải lên', action: '', retryPrefix: '', retrySuffix: '' },
  },
  cn: {
    idle: { text: '将文件拖放到此处导入，或', action: '点击浏览文件', retryPrefix: '', retrySuffix: '' },
    uploading: { text: '正在上传', action: '', retryPrefix: '', retrySuffix: '' },
    error: { text: '上传失败', action: '选择', retryPrefix: '拖放或', retrySuffix: '其他文件重试。' },
    done: { text: '已上传', action: '', retryPrefix: '', retrySuffix: '' },
  },
  pl: {
    idle: { text: 'Upuść plik tutaj, aby zaimportować, lub', action: 'Kliknij, aby wybrać plik', retryPrefix: '', retrySuffix: '' },
    uploading: { text: 'Przesyłanie', action: '', retryPrefix: '', retrySuffix: '' },
    error: { text: 'Nie udało się przesłać', action: 'Wybierz', retryPrefix: 'Upuść lub', retrySuffix: 'inny plik, aby spróbować ponownie.' },
    done: { text: 'Przesłano', action: '', retryPrefix: '', retrySuffix: '' },
  },
};

// PLURALIZED default copy under `multiple` (user-directed 2026-07-04): only the strings that
// reference the file NOUN vary — the idle prompt/browse action and the error retry suffix.
// Consumer `messages` overrides are untouched (they merge over whichever built-in resolves).
// CN has no grammatical plural — its copy is shared.
const FILE_UPLOAD_MESSAGES_MULTIPLE: Partial<Record<FileUploadLanguage, Partial<Record<FileUploadState, Partial<FileUploadMessage>>>>> = {
  en: {
    idle: { text: 'Drop your files here to import or', action: 'Click to browse files' },
    error: { retrySuffix: 'other files to retry.' },
  },
  vn: {
    idle: { text: 'Thả các tệp vào đây để nhập hoặc', action: 'Bấm để chọn tệp' },
    error: { retrySuffix: 'các tệp khác để thử lại.' },
  },
  pl: {
    idle: { text: 'Upuść pliki tutaj, aby zaimportować, lub', action: 'Kliknij, aby wybrać pliki' },
    error: { retrySuffix: 'inne pliki, aby spróbować ponownie.' },
  },
};

function resolveMessage(
  language: FileUploadLanguage,
  state: FileUploadState,
  multiple: boolean | undefined,
  overrides: FileUploadMessages | undefined,
): FileUploadMessage {
  return {
    ...FILE_UPLOAD_MESSAGES[language][state],
    ...(multiple ? FILE_UPLOAD_MESSAGES_MULTIPLE[language]?.[state] ?? {} : {}),
    ...(overrides?.[state] ?? {}),
  };
}

// ── supportedExtensions (user-directed 2026-07-04) ────────────────────────────────────────────────
// Normalize entries to lowercase dot-prefixed form ('.cap'); tolerate 'cap'.
function normalizeExtensions(extensions: readonly string[] | undefined): string[] {
  if (!extensions?.length) return [];
  return extensions.map((ext) => {
    const trimmed = ext.trim().toLowerCase();
    return trimmed.startsWith('.') ? trimmed : `.${trimmed}`;
  });
}

/** Split files into supported/rejected by extension (case-insensitive). No list = all supported. */
function splitByExtension(files: File[], extensions: readonly string[]): { supported: File[]; rejected: File[] } {
  if (extensions.length === 0) return { supported: files, rejected: [] };
  const supported: File[] = [];
  const rejected: File[] = [];
  for (const file of files) {
    const name = file.name.toLowerCase();
    (extensions.some((ext) => name.endsWith(ext)) ? supported : rejected).push(file);
  }
  return { supported, rejected };
}

function clampProgress(value: number | undefined, state: FileUploadState) {
  const fallback = state === 'done' ? 100 : 0;
  const numeric = Number.isFinite(value) ? Number(value) : fallback;
  return Math.min(100, Math.max(0, numeric));
}

/** The Figma dev-spec per-state progress fill color (Indicator sub-override). */
function progressColor(state: FileUploadState): 'primary' | 'error' | 'success' {
  if (state === 'error') return 'error';
  if (state === 'done') return 'success';
  return 'primary';
}

// ─── FileUpload context (root → parts) ────────────────────────────────────────────────────────────
interface FileUploadContextValue {
  state: FileUploadState;
  percent: number;
  /** No numeric `progress` was supplied for an in-flight (`uploading`) upload — the bar sweeps
   *  (Base UI `data-indeterminate`) and the percent line is suppressed. `done`/`error` are never
   *  indeterminate (done is complete; error freezes its last-known partial bar). */
  indeterminate: boolean;
  disabled: boolean;
  openPicker: () => void;
}
const FileUploadContext = React.createContext<FileUploadContextValue | null>(null);

/** Read the nearest FileUpload root's state/percent/picker (null outside a FileUpload). */
function useFileUploadContext(): FileUploadContextValue | null {
  return React.useContext(FileUploadContext);
}

// ─── FileUpload.Icon — the shipped ContainedIcon under FileUpload's namespace ─────────────────────
// Identity defaults to `file-arrow-up` with ContainedIcon's OWN layer default (`layer ?? ctx ??
// 'duotone'`, contained-icon.tsx — the boxed-duotone signature; user-directed 2026-07-04, a
// deliberate divergence from the Figma dev-spec's `monotone` note). We simply do NOT pin `layer`,
// so the shipped default mechanism resolves; a consumer overrides via the normal icon surface
// (`layer="monotone"` / an IconographyProvider). The glyph inherits the active state's foreground.
export interface FileUploadIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'color'> {
  name?: string;
  family?: IconFamily;
  layer?: IconLayer;
  weight?: IconWeight;
  aui?: ContainedIconAui;
}
const FileUploadIcon = React.forwardRef<HTMLSpanElement, FileUploadIconProps>(
  function FileUploadIcon({ name, layer, className, ...rest }, ref) {
    // Cast through the glyph branch of ContainedIcon's discriminated union (name XOR children) —
    // this part always renders the named-glyph form, never the custom-content slot. `layer` is
    // forwarded UNPINNED so ContainedIcon's own duotone default resolves.
    return React.createElement(ContainedIcon, {
      ref,
      'aria-hidden': true,
      ...rest,
      name: name ?? 'file-arrow-up',
      layer,
      className: prependMarkerClassName('aui-file-upload-icon', className) as string | undefined,
    } as ContainedIconProps & React.RefAttributes<HTMLSpanElement>);
  },
);
FileUploadIcon.displayName = 'FileUpload.Icon';

// ─── FileUpload.Row — a centered inline text row (marker part) ────────────────────────────────────
export type FileUploadRowProps = React.HTMLAttributes<HTMLDivElement>;
const FileUploadRow = React.forwardRef<HTMLDivElement, FileUploadRowProps>(
  function FileUploadRow({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        {...rest}
        className={prependMarkerClassName('aui-file-upload-row', className) as string | undefined}
      />
    );
  },
);
FileUploadRow.displayName = 'FileUpload.Row';

// ─── FileUpload.Hint — a NEUTRAL instruction row (user-directed 2026-07-04) ───────────────────────
// Hint/instruction copy renders in the normal on-surface TEXT role in EVERY state — the state
// chroma must NOT leak into it (the Failed-state screenshot: an error-red hint line beside the
// error-red title had no hierarchy). The part stamps its OWN `aui-fg-text` cell (`--aui-fg:
// var(--theme-text)`, `inherits:true`) so composed Labels inherit neutral while the Action keeps
// its own text-primary cell. Structure reuses the Row marker. Override the tint per-Label via
// Type's `color` prop, or per-hint via a foreground utility in `className`.
export type FileUploadHintProps = React.HTMLAttributes<HTMLDivElement>;
const FileUploadHint = React.forwardRef<HTMLDivElement, FileUploadHintProps>(
  function FileUploadHint({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        {...rest}
        className={prependMarkerClassName(
          'aui-file-upload-hint aui-file-upload-row aui-fg-text',
          className,
        ) as string | undefined}
      />
    );
  },
);
FileUploadHint.displayName = 'FileUpload.Hint';

// ─── FileUpload.Label — a text segment (a PLAIN span, cascade-inherited) ──────────────────────────
// Deliberately NOT a `Type` (which pins its own `no-padding-sm` typography cell): the label's
// font must ride the FileUpload root's `aui.scale` cascade — a root scale change moves every text
// segment together (user-directed 2026-07-04; the trigger inherits the same way). Color inherits
// the surrounding computed color (the root state cell, or the Hint's neutral cell).
export type FileUploadLabelProps = React.HTMLAttributes<HTMLSpanElement>;
const FileUploadLabel = React.forwardRef<HTMLSpanElement, FileUploadLabelProps>(
  function FileUploadLabel({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        {...rest}
        className={prependMarkerClassName('aui-file-upload-label', className) as string | undefined}
      />
    );
  },
);
FileUploadLabel.displayName = 'FileUpload.Label';

// ─── FileUpload.Action — the LINK-flavored inline text trigger (browse / retry) ───────────────────
// NOT a Button (user-directed 2026-07-04): an inline text action carries NO state-layer box — no
// hover tint/background/elevation; the ONLY hover treatment is underline (marker CSS), plus the
// standard keyboard focus ring (the `.aui-stateful:focus-visible` outline recipe, mirrored on the
// marker). Typography is fully INHERITED — the part emits NO scale cell and the marker sets
// `font: inherit`, so the trigger rides the FileUpload root's `aui.scale` cascade exactly like the
// sibling Labels (the `--aui-*-context` inheritance precedent). The primary tint is the part's
// foreground default (`colorMode: 'foreground'` → `aui-fg-primary`, the Figma Link
// 230-Color(text) → primary), merged UNDER a consumer `aui.color` per-axis.
const _FileUploadAction = createAtomicPart<
  React.ButtonHTMLAttributes<HTMLButtonElement> & PartStyleProps
>('button', 'aui-file-upload-action', {
  styleable: true,
  colorMode: 'foreground',
  baseProps: { type: 'button' },
});
export type FileUploadActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & PartStyleProps;
const ACTION_DEFAULT_AUI: NonNullable<PartStyleProps['aui']> = { color: 'primary' };
const FileUploadAction = React.forwardRef<HTMLButtonElement, FileUploadActionProps>(
  function FileUploadAction({ aui, onClick, disabled, ...rest }, ref) {
    const ctx = useFileUploadContext();
    const resolvedAui = React.useMemo<NonNullable<PartStyleProps['aui']>>(() => {
      const merged: Record<string, unknown> = { ...ACTION_DEFAULT_AUI };
      for (const [k, v] of Object.entries(aui ?? {})) if (v !== undefined) merged[k] = v;
      return merged as NonNullable<PartStyleProps['aui']>;
    }, [aui]);
    // The trigger disables with the root's disabled OR busy (uploading) state.
    const isDisabled = disabled ?? ctx?.disabled;
    return React.createElement(_FileUploadAction as React.ElementType, {
      ref,
      ...rest,
      disabled: isDisabled,
      aui: resolvedAui,
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        // The root's click handler ALSO opens the picker — stop the bubble so one activation
        // opens the chooser exactly once.
        event.stopPropagation();
        onClick?.(event);
        if (!event.defaultPrevented) ctx?.openPicker();
      },
    });
  },
);
FileUploadAction.displayName = 'FileUpload.Action';

// ─── FileUpload.Progress — the REAL shipped Progress with the Figma FileUpload pins ───────────────
export interface FileUploadProgressProps extends Omit<ProgressProps, 'value'> {
  /** The percent value. Defaults to the surrounding FileUpload's clamped `progress`. */
  value?: number | null;
  /** Recolor the fill bar. Defaults to the state mapping (uploading → primary, error → error,
   *  done → success). Merged over Progress.Indicator's own solid-primary default. */
  indicatorAui?: ProgressIndicatorProps['aui'];
}
const PROGRESS_DEFAULT_AUI: NonNullable<ProgressProps['aui']> = { shape: 'pill', scale: 'md' };
const FileUploadProgress = React.forwardRef<HTMLDivElement, FileUploadProgressProps>(
  function FileUploadProgress({ value, aui, indicatorAui, className, children, ...rest }, ref) {
    const ctx = useFileUploadContext();
    const resolvedAui = React.useMemo<NonNullable<ProgressProps['aui']>>(() => {
      const merged: Record<string, unknown> = { ...PROGRESS_DEFAULT_AUI };
      for (const [k, v] of Object.entries(aui ?? {})) if (v !== undefined) merged[k] = v;
      return merged as NonNullable<ProgressProps['aui']>;
    }, [aui]);
    // A composed consumer's explicit `value` wins; otherwise read the root — but an INDETERMINATE
    // upload (uploading, no numeric progress) resolves `null` so Base UI renders the sweep, never a
    // frozen 0% determinate bar.
    const resolvedValue =
      value !== undefined ? value : ctx?.indeterminate ? null : ctx?.percent ?? null;
    const stateColor = progressColor(ctx?.state ?? 'uploading');
    return (
      <Progress
        ref={ref}
        aria-label="Upload progress"
        {...rest}
        value={resolvedValue}
        aui={resolvedAui}
        className={prependMarkerClassName('aui-file-upload-progress', className) as string | undefined}
      >
        {React.Children.toArray(children).length === 0 ? (
          <Progress.Track>
            <Progress.Indicator aui={indicatorAui ?? { color: stateColor }} />
          </Progress.Track>
        ) : (
          children
        )}
      </Progress>
    );
  },
);
FileUploadProgress.displayName = 'FileUpload.Progress';

// ─── Root ─────────────────────────────────────────────────────────────────────────────────────────
export interface FileUploadProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'color' | 'name' | 'onChange' | 'onReset'
  > {
  aui?: FileUploadAui;
  /** Controlled visual state. */
  state?: FileUploadState;
  /** Uncontrolled initial state (the error-state retry action resets it to `idle`). */
  defaultState?: FileUploadState;
  /** Upload percent, clamped 0..100 (rendered through the composed Progress + ARIA — never a class). */
  progress?: number;
  /** Built-in copy language (the Figma Language collection modes). */
  locale?: FileUploadLanguage;
  /** Per-state copy overrides merged over the locale built-ins. */
  messages?: FileUploadMessages;
  /** The selected file's name — the second text segment in uploading/error/done. */
  fileName?: string;
  /** Optional size caption after the file name (consumer extension — not in the Figma frame). */
  sizeLabel?: string;
  /** Raw native accept string. When BOTH `accept` and `supportedExtensions` are set, `accept`
   *  wins for the hidden input's attribute (it is the explicit native passthrough);
   *  `supportedExtensions` still validates drops/changes. */
  accept?: string;
  /** Allowed file extensions (e.g. `['.cap', '.csv']`; entries tolerate a missing dot,
   *  case-insensitive). Derives the input `accept` when `accept` is omitted, AND validates
   *  dropped/picked files (drag-drop bypasses native `accept`) — unsupported files are routed to
   *  `onFilesRejected`, never `onFilesChange`. Rejection does NOT flip the visual state (the
   *  Figma Failed variant is an UPLOAD failure — no rejection state exists in the source). */
  supportedExtensions?: readonly string[];
  multiple?: boolean;
  name?: string;
  capture?: React.InputHTMLAttributes<HTMLInputElement>['capture'];
  disabled?: boolean;
  /** Extra props for the hidden native file input. */
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'accept' | 'children' | 'className' | 'disabled' | 'multiple' | 'onChange' | 'type'
  >;
  onFilesChange?: (
    files: File[],
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
  ) => void;
  /** Files that failed `supportedExtensions` validation (drop or picker). */
  onFilesRejected?: (
    files: File[],
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
  ) => void;
  /** Fires right before the native chooser opens (root click, keyboard, or the Action part). */
  onPick?: () => void;
  onStateChange?: (state: FileUploadState) => void;
  /** Fires when the error-state retry action resets the visual state to idle. */
  onReset?: (state: FileUploadState) => void;
}

// The lib compiles WITHOUT the `dom` lib — structural stand-ins for the native input/DataTransfer
// surfaces the component touches (the original FileUpload port's technique).
type FileCollection = ArrayLike<File> | Iterable<File>;
type FileUploadInputElement = {
  value: string;
  click(): void;
  files?: FileCollection | null;
};
type FileUploadDataTransfer = {
  files?: FileCollection | null;
};

function filesFrom(value: FileCollection | null | undefined): File[] {
  if (!value) return [];
  return Array.from(value as Iterable<File>);
}

const FileUploadRoot = React.forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload(
    {
      aui,
      state,
      defaultState = 'idle',
      progress,
      locale = 'en',
      messages,
      fileName,
      sizeLabel,
      accept,
      supportedExtensions,
      multiple,
      name,
      capture,
      disabled,
      inputProps,
      onFilesChange,
      onFilesRejected,
      onPick,
      onStateChange,
      onReset,
      className,
      children,
      role,
      onClick,
      onKeyDown,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
      ...rest
    },
    ref,
  ) {
    const inputRef = React.useRef<FileUploadInputElement | null>(null);
    const [dragging, setDragging] = React.useState(false);
    // Depth counter for the drag-over affordance: a dragenter/dragleave fires for EVERY descendant
    // the pointer crosses, so a naive setDragging(false) on any leave flickers as the drag moves over
    // child text/bar. Count enter−leave and only clear at zero (the standard fix).
    const dragDepthRef = React.useRef(0);
    const [uncontrolledState, setUncontrolledState] = React.useState<FileUploadState>(defaultState);
    const activeStateInput = state ?? uncontrolledState;
    const { className: composedClassName, state: activeState } = useFileUploadRecipe({
      aui,
      state: activeStateInput,
      disabled,
      className,
    });
    const percent = clampProgress(progress, activeState);
    // DETERMINATE ⇔ a numeric `progress` was supplied — drives ONLY the bar (there is NO percent
    // text line; the bar itself conveys progress — user-directed 2026-07-05). An `uploading` state
    // WITHOUT a numeric `progress` is INDETERMINATE: the composed Progress renders the DS sweep. `done`
    // is always complete (full bar); `error` freezes a partial bar — neither is ever indeterminate.
    const hasNumericProgress = Number.isFinite(progress as number);
    const indeterminate = activeState === 'uploading' && !hasNumericProgress;
    const message = resolveMessage(locale, activeState, multiple, messages);
    // BUSY (uploading) and TERMINAL (done — display-only, user-directed 2026-07-05) = fully INERT:
    // every picker path is gated at the EVENT level — the root click/keydown funnel, drag/drop, the
    // hidden input's own native `disabled` (a programmatic `.click()` on a disabled input is inert),
    // and the Action triggers (disabled through context). `done` is a success READOUT: no picker on
    // click, no keyboard activation, no drop, no hover — but it keeps its success chroma (NOT the
    // disabled flip, and no `aria-disabled`). `error` stays interactive (the retry affordance).
    const busy = activeState === 'uploading';
    const inert = !!disabled || busy || activeState === 'done';
    // DRAG/DROP is live ONLY in the DASHED interactable states (idle + error retry) — the
    // dashed⇔interactable law. `uploading` (busy), `done` (solid — re-pick is click-only), and
    // `disabled` reject drops AND show NO drag-over affordance (the visual must not invite a drop we
    // reject). user-directed 2026-07-05.
    const dragInteractive = !disabled && (activeState === 'idle' || activeState === 'error');
    const extensions = React.useMemo(() => normalizeExtensions(supportedExtensions), [supportedExtensions]);
    // `accept` (the explicit native passthrough) wins; `supportedExtensions` derives it otherwise.
    const resolvedAccept = accept ?? (extensions.length > 0 ? extensions.join(',') : undefined);

    const setFileUploadState = React.useCallback((next: FileUploadState) => {
      if (state === undefined) setUncontrolledState(next);
      onStateChange?.(next);
    }, [onStateChange, state]);

    const openPicker = React.useCallback(() => {
      if (inert) return;
      if (activeState === 'error') {
        setFileUploadState('idle');
        onReset?.('idle');
      }
      onPick?.();
      if (inputRef.current) inputRef.current.value = '';
      inputRef.current?.click();
    }, [activeState, inert, onPick, onReset, setFileUploadState]);

    const contextValue = React.useMemo<FileUploadContextValue>(
      () => ({ state: activeState, percent, indeterminate, disabled: inert, openPicker }),
      [activeState, percent, indeterminate, inert, openPicker],
    );

    // Route files through the supportedExtensions gate: supported → onFilesChange, rejected →
    // onFilesRejected. Applied to BOTH the picker change AND drops (drag-drop bypasses `accept`).
    const deliverFiles = (
      files: File[],
      event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    ) => {
      const { supported, rejected } = splitByExtension(files, extensions);
      if (supported.length > 0) onFilesChange?.(supported, event);
      if (rejected.length > 0) onFilesRejected?.(rejected, event);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.currentTarget as unknown as FileUploadInputElement;
      const files = filesFrom(target.files);
      if (files.length > 0) deliverFiles(files, event);
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as { tagName?: string; nodeName?: string } | null;
      if (target?.tagName === 'INPUT' || target?.nodeName === 'INPUT') return;
      if (inert) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
      if (!event.defaultPrevented) openPicker();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (inert) return;
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        openPicker();
      }
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
      if (!dragInteractive) return;
      event.preventDefault();
      dragDepthRef.current += 1;
      if (dragDepthRef.current === 1) setDragging(true);
      onDragEnter?.(event);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      if (!dragInteractive) return;
      dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
      if (dragDepthRef.current === 0) setDragging(false);
      onDragLeave?.(event);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      if (!dragInteractive) return;
      event.preventDefault();
      onDragOver?.(event);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      if (!dragInteractive) return;
      event.preventDefault();
      dragDepthRef.current = 0;
      setDragging(false);
      const transfer = event.dataTransfer as unknown as FileUploadDataTransfer;
      const files = filesFrom(transfer?.files);
      if (files.length > 0) deliverFiles(files, event);
      onDrop?.(event);
    };

    const showProgress = activeState !== 'idle';
    const hasFileLine = !!fileName || !!sizeLabel;
    // AUTO-RENDER: a CHILDLESS <FileUpload/> assembles the per-state anatomy from the REAL parts
    // (the Progress/Toast childless convention). ANY explicit children replace it wholesale (the
    // consumer owns composition through the same parts); the hidden input always renders. `toArray`
    // — not `Children.count` — so a false-resolving conditional child still auto-renders.
    //
    // TWO-ROW LAYOUT (user-directed 2026-07-05): row 1 = the ICON (present in EVERY state), row 2 =
    // the CONTENT group (`.aui-file-upload-body`). Both rows HUG their height; the root clusters them
    // centered on BOTH axes with the extra min-height space split ABOVE/BELOW the group (never
    // between the two rows). The content group holds:
    //   idle      — the NEUTRAL browse Hint ("Drop your file here to import or [browse]").
    //   uploading — STATUS ("Uploading") · `filename (size)` · the bar (sweeps if indeterminate).
    //   error     — STATUS ("Failed to upload") · `filename (size)` · the partial bar · the retry Hint.
    //   done      — STATUS ("Uploaded") · `filename (size)` · the full bar.
    // There is NO percent text line in any state — the bar conveys determinate progress (user-directed
    // 2026-07-05). The status row inherits the state chroma; Hint rows stay NEUTRAL (their own text
    // cell); the file line composes `filename (size)` with the size as a parenthesized postfix.
    const autoAnatomy = (
      <>
        <FileUploadIcon />
        <div className="aui-file-upload-body">
          {activeState === 'idle' ? (
            <FileUploadHint>
              <FileUploadLabel>{message.text}</FileUploadLabel>
              <FileUploadAction>{message.action}</FileUploadAction>
            </FileUploadHint>
          ) : (
            <>
              <FileUploadRow>
                <FileUploadLabel>{message.text}</FileUploadLabel>
              </FileUploadRow>
              {hasFileLine ? (
                <FileUploadRow>
                  {fileName ? <FileUploadLabel className="aui-file-upload-filename">{fileName}</FileUploadLabel> : null}
                  {sizeLabel ? <FileUploadLabel className="aui-file-upload-size">{`(${sizeLabel})`}</FileUploadLabel> : null}
                </FileUploadRow>
              ) : null}
              {showProgress ? (
                <FileUploadProgress aria-label={indeterminate ? message.text : `${message.text} ${percent}%`} />
              ) : null}
              {activeState === 'error' ? (
                <FileUploadHint>
                  <FileUploadLabel>{message.retryPrefix}</FileUploadLabel>
                  <FileUploadAction>{message.action}</FileUploadAction>
                  <FileUploadLabel>{message.retrySuffix}</FileUploadLabel>
                </FileUploadHint>
              ) : null}
            </>
          )}
        </div>
      </>
    );

    return (
      <FileUploadContext.Provider value={contextValue}>
        <div
          ref={ref}
          {...rest}
          className={composedClassName}
          role={role ?? 'group'}
          data-aui-file-upload-state={activeState}
          data-aui-file-upload-dragging={dragging ? '' : undefined}
          data-disabled={disabled ? '' : undefined}
          aria-disabled={disabled ? true : undefined}
          aria-busy={activeState === 'uploading' ? true : undefined}
          aria-invalid={activeState === 'error' ? true : undefined}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            {...inputProps}
            ref={inputRef as React.Ref<HTMLInputElement>}
            className="aui-file-upload-input"
            type="file"
            accept={resolvedAccept}
            multiple={multiple}
            name={name}
            capture={capture}
            disabled={inert}
            tabIndex={-1}
            aria-hidden="true"
            onChange={handleInputChange}
          />
          {React.Children.toArray(children).length === 0 ? autoAnatomy : children}
        </div>
      </FileUploadContext.Provider>
    );
  },
);
FileUploadRoot.displayName = 'FileUpload';

// ─── Assemble (flat 2-level dot-namespace) ────────────────────────────────────────────────────────
interface FileUploadComponent
  extends React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLDivElement>> {
  Icon: typeof FileUploadIcon;
  Row: typeof FileUploadRow;
  Hint: typeof FileUploadHint;
  Label: typeof FileUploadLabel;
  Action: typeof FileUploadAction;
  Progress: typeof FileUploadProgress;
}

export const FileUpload = Object.assign(FileUploadRoot, {
  Icon: FileUploadIcon,
  Row: FileUploadRow,
  Hint: FileUploadHint,
  Label: FileUploadLabel,
  Action: FileUploadAction,
  Progress: FileUploadProgress,
}) as FileUploadComponent;
export default FileUpload;
