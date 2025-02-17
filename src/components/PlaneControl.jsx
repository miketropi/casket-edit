import { useState } from 'react';
import InputRange from './fields/InputRange';
import Modal from './Modal';
import Popover from './Popover';
import Button from './Button';
import { PaintbrushVertical, Wand } from 'lucide-react'; 
import DesignImage from './DesignImage';
export default function PlaneControl({ plane, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return <div className="plane-control-container">
    {/* <div className="control-item">
      <Popover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        trigger={<Button icon={<Wand size={16} />} disclosure fullWidth onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Select Your Image</Button>}
      >
        <Button fullWidth icon={<PaintbrushVertical size={16} />} onClick={() => setIsModalOpen(true)}>Design Your Image</Button>
      </Popover>
    </div> */}

    <div className="control-item">
      <Button fullWidth icon={<PaintbrushVertical size={16} />} onClick={() => setIsModalOpen(true)}>Design Your Image</Button>
    </div>
    
    <Modal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Design Your Image"
    >
      <DesignImage plane={ plane } onUseDesign={ image => {
        console.log(image);
      } } />
    </Modal>

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