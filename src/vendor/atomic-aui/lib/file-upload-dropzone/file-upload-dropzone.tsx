// modules/design/atomic-aui/src/lib/file-upload-dropzone/file-upload-dropzone.tsx
//
// FileUploadDropzone — a WRAPPER that turns any content (its `children`) into a drop target for files
// dragged in from the computer. HAND-CRAFTED (no Base UI drop primitive exists — the FileUpload
// precedent). Two elements:
//
//   • Root (`aui-file-upload-dropzone`) — a plain, LAYOUT-NEUTRAL block: it renders the children as-is and
//     only adds `position: relative` so the overlay can cover it. Deliberately NOT a frame (a frame's
//     scale cell would pad/re-type the wrapped content).
//   • Overlay (`aui-file-upload-dropzone-overlay`) — a full `.aui-frame` that REPLICATES the FileUpload idle
//     dropzone's layout (dashed tonal surface + the drag-over state-layer tint, see use-recipe.ts): a
//     centered two-row column — row 1 the shipped ContainedIcon `file-arrow-up` (FileUpload.Icon's
//     upload identity), row 2 `.aui-file-upload-dropzone-body` holding the localized prompt. MOUNTED ONLY
//     while files are dragged over an enabled zone, so at rest it can neither shift layout nor
//     intercept a click.
//
// Drag tracking reuses FileUpload's DEPTH COUNTER (dragenter/dragleave fire for every descendant
// the pointer crosses — count enter−leave, clear at zero), hardened for a wrapper whose children
// are arbitrary: a dragleave whose relatedTarget is OUTSIDE the root clears at once, a dragover
// re-arms a counter that lost an event, and window-level `drop`/`dragend` always reset.
// Only an OS FILE drag activates the zone: the drag must list `Files` AND must not have started
// inside the document (an in-page `<img>`/link drag also lists `Files` in Chromium, but it always
// fires `dragstart` first — OS drags never do).
import * as React from 'react';
import { ContainedIcon } from '../icon';
import type { FileUploadLanguage } from '../file-upload';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import {
  dragHasFiles,
  filesFromTransfer,
  normalizeAccept,
  partitionDroppedFiles,
  type FileDragTransfer,
  type FileUploadDropzoneAccept,
  type FileUploadDropzoneRejection,
} from './accept';
import { useFileUploadDropzoneOverlayRecipe, type FileUploadDropzoneOverlayAui } from './use-recipe';

/** The built-in copy languages — the same set as FileUpload (the Figma Language modes). */
export type FileUploadDropzoneLanguage = FileUploadLanguage;

// The overlay prompt. VN is the product copy pinned for this component; EN/CN/PL translate it.
// `multiple` only changes languages with a grammatical plural (VN/CN share one string).
export const FILE_UPLOAD_DROPZONE_MESSAGES: Record<FileUploadDropzoneLanguage, { single: string; multiple: string }> = {
  vn: { single: 'Thả file vào đây để tải lên', multiple: 'Thả file vào đây để tải lên' },
  en: { single: 'Drop a file here to upload', multiple: 'Drop files here to upload' },
  cn: { single: '将文件拖放到此处上传', multiple: '将文件拖放到此处上传' },
  pl: { single: 'Upuść plik tutaj, aby przesłać', multiple: 'Upuść pliki tutaj, aby przesłać' },
};

export interface FileUploadDropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'onDrop' | 'onError'> {
  /** The wrapped content — rendered unchanged; the whole root area becomes the drop target. */
  children?: React.ReactNode;
  /** Receives the dropped files that passed `accept` / `multiple`. */
  onDrop: (files: File[]) => void;
  /** Receives every dropped file that was NOT delivered, with the reason. */
  onError?: (rejections: FileUploadDropzoneRejection[]) => void;
  /** Allowed formats in the native `accept` grammar: `.pdf`, `image/png`, `image/*` (string or list). */
  accept?: FileUploadDropzoneAccept;
  /** Allow more than one file per drop. Without it a multi-file drop is rejected as `too-many-files`. */
  multiple?: boolean;
  /** Turns drag-and-drop off: no overlay, nothing delivered (the browser still won't open the file). */
  disabled?: boolean;
  /** Extra class on the overlay frame (appended after its recipe classes). */
  overlayClassName?: string;
  /** Overlay appearance through the `aui` namespace (merged over the dashed tonal-primary default). */
  overlayAui?: FileUploadDropzoneOverlayAui;
  /** Replaces the default icon + prompt INSIDE the overlay frame. */
  overlayContent?: React.ReactNode;
  /** Built-in prompt language. */
  locale?: FileUploadDropzoneLanguage;
  /** Prompt text override (wins over the locale built-in). */
  message?: string;
}

type DragEvent = React.DragEvent<HTMLDivElement>;
type DropTargetNode = { contains(other: unknown): boolean };
type WindowLike = {
  addEventListener(type: string, listener: () => void, capture?: boolean): void;
  removeEventListener(type: string, listener: () => void, capture?: boolean): void;
};

// Nested zones: the innermost zone handles a drop; the native event is marked so an outer zone
// (which receives the same bubbling event) only resets instead of delivering the files twice.
const handledDrops = new WeakSet<object>();

const FileUploadDropzoneRoot = React.forwardRef<HTMLDivElement, FileUploadDropzoneProps>(function FileUploadDropzone(
  {
    children,
    onDrop,
    onError,
    accept,
    multiple = false,
    disabled = false,
    className,
    overlayClassName,
    overlayAui,
    overlayContent,
    locale = 'vn',
    message,
    onDragEnter,
    onDragOver,
    onDragLeave,
    ...rest
  },
  forwardedRef,
) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const [active, setActive] = React.useState(false);
  const depthRef = React.useRef(0);
  // True between an IN-DOCUMENT `dragstart` and its `dragend` — such a drag is never "files from
  // the computer", even when Chromium lists `Files` for a dragged <img>.
  const internalDragRef = React.useRef(false);

  const reset = React.useCallback(() => {
    depthRef.current = 0;
    setActive(false);
  }, []);

  React.useEffect(() => {
    const win = globalThis as unknown as Partial<WindowLike>;
    if (typeof win.addEventListener !== 'function' || typeof win.removeEventListener !== 'function') {
      return undefined;
    }
    const onDragStart = () => {
      internalDragRef.current = true;
    };
    const onDragEnd = () => {
      internalDragRef.current = false;
      reset();
    };
    // Bubble phase: runs AFTER the zone's own drop handler (and catches drops elsewhere on the page).
    const onWindowDrop = () => reset();
    win.addEventListener('dragstart', onDragStart, true);
    win.addEventListener('dragend', onDragEnd, true);
    win.addEventListener('drop', onWindowDrop);
    return () => {
      win.removeEventListener?.('dragstart', onDragStart, true);
      win.removeEventListener?.('dragend', onDragEnd, true);
      win.removeEventListener?.('drop', onWindowDrop);
    };
  }, [reset]);

  // Turning the zone off mid-drag hides the overlay at once.
  React.useEffect(() => {
    if (disabled) reset();
  }, [disabled, reset]);

  const transferOf = (event: DragEvent) => event.dataTransfer as unknown as FileDragTransfer | null;
  const isFileDrag = (event: DragEvent) => !internalDragRef.current && dragHasFiles(transferOf(event));
  const setDropEffect = (event: DragEvent, effect: 'copy' | 'none') => {
    const transfer = transferOf(event);
    if (transfer) transfer.dropEffect = effect;
  };

  const handleDragEnter = (event: DragEvent) => {
    onDragEnter?.(event);
    if (!isFileDrag(event)) return;
    event.preventDefault();
    if (disabled) {
      setDropEffect(event, 'none');
      return;
    }
    depthRef.current += 1;
    setActive(true);
  };

  const handleDragOver = (event: DragEvent) => {
    onDragOver?.(event);
    if (!isFileDrag(event)) return;
    // Cancelling dragover is what makes the area a drop target — and what stops the browser from
    // opening the file. A disabled zone still cancels it, but with `dropEffect: none` (no drop fires).
    event.preventDefault();
    setDropEffect(event, disabled ? 'none' : 'copy');
    if (disabled) return;
    // Self-heal: a dragover inside the root means the pointer IS inside, whatever the counter says.
    if (depthRef.current === 0) depthRef.current = 1;
    setActive(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    onDragLeave?.(event);
    if (disabled || !isFileDrag(event)) return;
    depthRef.current = Math.max(0, depthRef.current - 1);
    // Leaving straight to a node outside the root ends the drag-over regardless of the counter.
    // A null relatedTarget (Safari, leaving the window) defers to the counter.
    const related = event.relatedTarget as unknown;
    const root = rootRef.current as DropTargetNode | null;
    if (related && root && !root.contains(related)) depthRef.current = 0;
    if (depthRef.current === 0) setActive(false);
  };

  const tokens = React.useMemo(() => normalizeAccept(accept), [accept]);

  const handleDrop = (event: DragEvent) => {
    // A text/element drop is not ours — leave it to the children (e.g. a text drop into an input).
    if (!isFileDrag(event)) return;
    event.preventDefault();
    reset();
    const native = event.nativeEvent as unknown as object;
    if (disabled || handledDrops.has(native)) return;
    handledDrops.add(native);
    const { accepted, rejected } = partitionDroppedFiles(filesFromTransfer(transferOf(event)), tokens, multiple);
    if (accepted.length > 0) onDrop(accepted);
    if (rejected.length > 0) onError?.(rejected);
  };

  const overlayClasses = useFileUploadDropzoneOverlayRecipe({ aui: overlayAui, className: overlayClassName });
  const prompt = message ?? FILE_UPLOAD_DROPZONE_MESSAGES[locale][multiple ? 'multiple' : 'single'];
  const showOverlay = active && !disabled;

  return (
    <div
      ref={setRootRef}
      {...rest}
      className={prependMarkerClassName('aui-file-upload-dropzone', className) as string}
      data-aui-file-upload-dropzone-active={showOverlay ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      {showOverlay ? (
        <div className={overlayClasses} aria-hidden="true">
          {overlayContent ?? (
            <>
              <ContainedIcon name="file-arrow-up" className="aui-file-upload-dropzone-icon" />
              <div className="aui-file-upload-dropzone-body">
                <span className="aui-file-upload-dropzone-label">{prompt}</span>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
});
FileUploadDropzoneRoot.displayName = 'FileUploadDropzone';

export const FileUploadDropzone = FileUploadDropzoneRoot;
export default FileUploadDropzone;
