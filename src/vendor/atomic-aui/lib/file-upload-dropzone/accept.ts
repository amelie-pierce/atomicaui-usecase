// modules/design/atomic-aui/src/lib/file-upload-dropzone/accept.ts
//
// Pure file-drag helpers for FileUploadDropzone (no React, no DOM globals — the lib compiles WITHOUT the
// `dom` lib, so the DataTransfer surface is a structural stand-in, the FileUpload technique).
//
// `accept` follows the NATIVE `<input accept>` grammar (the FileUpload `accept` passthrough is the
// same string): a comma-separated list of `.ext` extensions, exact MIME types (`application/pdf`),
// and `type/*` wildcards (`image/*`). A drop BYPASSES the native attribute, so the zone validates
// itself. FileUpload's own `supportedExtensions` gate is extension-only and private to that
// component, so this is the MIME-aware superset rather than a reuse.

/** A string in the native accept grammar, or the same tokens as a list. */
export type FileUploadDropzoneAccept = string | readonly string[];

/** Why a dropped file was not delivered to `onDrop`. */
export type FileUploadDropzoneRejectionReason = 'file-invalid-type' | 'too-many-files';

export interface FileUploadDropzoneRejection {
  file: File;
  reason: FileUploadDropzoneRejectionReason;
}

type FileCollection = ArrayLike<File> | Iterable<File>;

/** The subset of DataTransfer the zone reads (structural — no `dom` lib). */
export type FileDragTransfer = {
  types?: ArrayLike<string> | Iterable<string> | null;
  files?: FileCollection | null;
  dropEffect?: string;
};

/** Lowercased, trimmed, de-empty accept tokens. An empty result means "accept everything". */
export function normalizeAccept(accept: FileUploadDropzoneAccept | undefined): string[] {
  if (accept === undefined) return [];
  const raw = typeof accept === 'string' ? accept.split(',') : Array.from(accept);
  return raw.map((token) => token.trim().toLowerCase()).filter((token) => token.length > 0);
}

/** One file against the normalized accept tokens (native `accept` semantics, case-insensitive). */
export function isFileAccepted(file: File, tokens: readonly string[]): boolean {
  if (tokens.length === 0) return true;
  const name = (file.name ?? '').toLowerCase();
  const type = (file.type ?? '').toLowerCase();
  const baseType = type.split('/')[0];
  return tokens.some((token) => {
    if (token.startsWith('.')) return name.endsWith(token);
    if (token.endsWith('/*')) return type !== '' && baseType === token.slice(0, -2);
    return type === token;
  });
}

/**
 * True when the drag carries OS files. Text, links and in-page elements report other types
 * (`text/plain`, `text/html`, `text/uri-list`); an OS file drag always lists `Files`.
 */
export function dragHasFiles(transfer: FileDragTransfer | null | undefined): boolean {
  const types = transfer?.types;
  if (!types) return false;
  return Array.from(types as Iterable<string>).includes('Files');
}

export function filesFromTransfer(transfer: FileDragTransfer | null | undefined): File[] {
  const files = transfer?.files;
  if (!files) return [];
  return Array.from(files as Iterable<File>);
}

/**
 * Split dropped files into the ones to deliver and the ones to report.
 * - Every file failing `accept` → `file-invalid-type`.
 * - Without `multiple`, more than one ACCEPTED file rejects all of them as `too-many-files`
 *   (picking one silently would be a guess about which file the user meant).
 */
export function partitionDroppedFiles(
  files: readonly File[],
  tokens: readonly string[],
  multiple: boolean,
): { accepted: File[]; rejected: FileUploadDropzoneRejection[] } {
  const accepted: File[] = [];
  const rejected: FileUploadDropzoneRejection[] = [];
  for (const file of files) {
    if (isFileAccepted(file, tokens)) accepted.push(file);
    else rejected.push({ file, reason: 'file-invalid-type' });
  }
  if (!multiple && accepted.length > 1) {
    return {
      accepted: [],
      rejected: [...accepted.map((file) => ({ file, reason: 'too-many-files' as const })), ...rejected],
    };
  }
  return { accepted, rejected };
}
