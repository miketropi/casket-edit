import { useState } from 'react';
import InputRange from './fields/InputRange';
import Modal from './Modal';
import Popover from './Popover';
import Button from './Button';
import { PaintbrushVertical, Wand, SquareMousePointer } from 'lucide-react'; 
import DesignImage from './DesignImage';
import { useAppStore } from '../context/AppContext';
import ColorPicker from './fields/ColorPicker';

export default function PlaneControl({ plane, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { editElement, designImageFn__Ref, setElementsToPlane, updatePlane, apiInstance, onSetDecalsImageDesign } = useAppStore();

  const onUseDesign = async () => {
    setLoading(true);
    const image = designImageFn__Ref.exportImage(); // export image base64
    const res = await apiInstance.uploadImageBase64(image); // Upload image to server
    if(res?.url) {
      let __decal_image = `${ import.meta.env.VITE_API_ENDPOINT }/?image_source=${ res.url }`;
      onSetDecalsImageDesign(plane.label, res?.url);
      updatePlane(plane.name, { ...plane, decalImage: __decal_image, elements: editElement });
      setIsModalOpen(false);
    } else {
      console.error(res);
      alert('Internal Server Error: Please try again later!!!');
    }
    setLoading(false);
    return; 

    // setElementsToPlane(plane.name, editElement);
    // updatePlane(plane.name, { ...plane, decalImage: image, elements: editElement });
    // setIsModalOpen(false);
  }

  return <div className="plane-control-container">
    <div className="control-item">
      <Button 
        fullWidth 
        icon={<PaintbrushVertical size={16} />} 
        onClick={() => setIsModalOpen(true)}>Design Your Image</Button>
    </div>
    
    <Modal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Design Your Image"
      actions={
        [
          <Button 
            loading={ loading }
            icon={<SquareMousePointer 
            size={16} />} 
            variant="secondary" 
            onClick={ onUseDesign }>Use Design</Button>
        ]
      }
    >
      <DesignImage plane={ plane } />
    </Modal>

    {/* { JSON.stringify(editElement) } */}
    {/* { JSON.stringify(plane) } */}

    <div className="control-item"> 
      <InputRange
        label="Scale"
        min={.1}
        max={5}
        step={0.01}
        value={plane.scale}
        onChange={(value) => onUpdate({ ...plane, scale: value })}
      />
    </div>

    {/* <div className="control-item">
      <ColorPicker
        label={ `Color of ${ plane.label }` }
        value={plane.color}
        onChange={(value) => onUpdate({ ...plane, color: value })}
      />
    </div> */}
  </div>
}