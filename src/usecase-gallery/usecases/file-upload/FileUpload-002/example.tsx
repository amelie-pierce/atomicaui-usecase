import { FileUpload } from '../../../kit';

export default function Example() {
  return <FileUpload multiple messages={{ idle: { text: 'Drop your file here or', action: 'Browse' } }} />;
}
