import { useState } from 'react';
import InputRange from './fields/InputRange';
import Modal from './Modal';
import Popover from './Popover';
import Button from './Button';
import { PaintbrushVertical, Wand, SquareMousePointer } from 'lucide-react'; 
import DesignImage from './DesignImage';
import { useAppStore } from '../context/AppContext';


export default function PlaneControl({ plane, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { editElement, designImageFn__Ref, setElementsToPlane } = useAppStore();

  const onUseDesign = () => {
    setElementsToPlane(plane.name, editElement);
    const image = designImageFn__Ref.exportImage();
  }

  return <div className="plane-control-container">
    <div className="control-item">
      <Button fullWidth icon={<PaintbrushVertical size={16} />} onClick={() => setIsModalOpen(true)}>Design Your Image</Button>
    </div>
    
    <Modal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Design Your Image"
      actions={
        [
          <Button icon={<SquareMousePointer size={16} />} variant="secondary" onClick={ onUseDesign }>Use Design</Button>
        ]
      }
    >
      <DesignImage plane={ plane } onUseDesign={ image => {
        console.log(image);
      } } />
    </Modal>

    { JSON.stringify(editElement) }

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
  </div>
}