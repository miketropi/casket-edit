import Upload from './fields/Upload';
import Button from './Button';
import { Text as TextIcon } from 'lucide-react';

export default function DesignImageToolBar({ onUploadImage, onAddTextElement }) {
  return <div className="design-image-tool-bar-container">
    <div className="design-image-tool-bar-item">
      <Upload onUpload={ onUploadImage } />
    </div>
    <div className="design-image-tool-bar-item">
      <Button icon={<TextIcon size={16} />} onClick={ onAddTextElement }>Add Text</Button>
    </div>
  </div>;
}