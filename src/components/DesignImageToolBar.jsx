import Upload from './fields/Upload';
import Button from './Button';
import { Text as TextIcon, Layers } from 'lucide-react';
import Popover from './Popover';
import { useState } from 'react';
import ReorderItems from './ReorderItems';
import ColorPicker from './fields/ColorPicker';

export default function DesignImageToolBar({ elements, onUploadImage, onAddTextElement, children, onOrderingChange, backgroundColor, onChangeBackgroundColor }) {
  const [ isOpenOrdering, setIsOpenOrdering ] = useState(false);
  const trigger = (
    <Button 
      disabled={ elements.length === 0 } 
      variant="primary" 
      icon={ <Layers size={16} /> } 
      onClick={() => { setIsOpenOrdering(!isOpenOrdering) }}></Button>
  )

  return <div className="design-image-tool-bar-container">
    <div className="design-image-tool-bar-item">
      <Popover 
        isOpen={ isOpenOrdering }
        trigger={ trigger }
        position="bottom-left"
        onClose={ () => { setIsOpenOrdering(false) } }
      >
        <div className="design-image-tool-bar-ordering-container">
          <ReorderItems items={ elements } onChange={ onOrderingChange } />
        </div>
      </Popover>
    </div>
    <div className="design-image-tool-bar-item">
      <Upload onUpload={ onUploadImage } />
    </div>
    <div className="design-image-tool-bar-item">
      <Button icon={<TextIcon size={16} />} onClick={ onAddTextElement }>Add Text</Button>
    </div>
    {/* <div className="design-image-tool-bar-item">
      <ColorPicker label="Background Color" value={ backgroundColor } onChange={ onChangeBackgroundColor } />
    </div> */}
    {
      children && <div className="design-image-tool-bar-item custom-tool-bar">
        { children }
      </div>
    }
  </div>;
}