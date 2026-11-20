import { FileUpload } from '../../../kit';

export default function Example() {
  return <FileUpload multiple={false} messages={{ idle: { text: 'Drop your file here or', action: 'Browse' } }} />;
}
