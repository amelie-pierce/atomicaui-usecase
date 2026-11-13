// modules/design/atomic-aui/src/lib/file-upload-dropzone/index.ts
//
// Public surface for FileUploadDropzone (a drop-target wrapper + its drag-over overlay).
export { FileUploadDropzone, FILE_UPLOAD_DROPZONE_MESSAGES } from './file-upload-dropzone';
export {
  FILE_UPLOAD_DROPZONE_OVERLAY_SX_AXES,
  FILE_UPLOAD_DROPZONE_OVERLAY_VOCAB,
  useFileUploadDropzoneOverlayRecipe,
} from './use-recipe';
export type { FileUploadDropzoneProps, FileUploadDropzoneLanguage } from './file-upload-dropzone';
export type { FileUploadDropzoneOverlayAui, UseFileUploadDropzoneOverlayRecipeProps } from './use-recipe';
export type {
  FileUploadDropzoneAccept,
  FileUploadDropzoneRejection,
  FileUploadDropzoneRejectionReason,
} from './accept';
