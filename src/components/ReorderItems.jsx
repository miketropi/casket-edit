import { useState } from 'react';
import Button from './Button';
import { GripVertical, Image as ImageIcon, ALargeSmall, Type as TypeIcon } from 'lucide-react';

export default function ReorderItems({ items, onChange }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOverItem(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    if (draggedItem === null) return;

    const newItems = [...items];
    const itemToMove = newItems[draggedItem];
    
    // Remove item from old position
    newItems.splice(draggedItem, 1);
    // Insert at new position
    newItems.splice(index, 0, itemToMove);

    setDraggedItem(null);
    setDraggedOverItem(null);
    onChange(newItems);
  };

  return (
    <div className="reorder-items">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`reorder-item ${draggedOverItem === index ? 'drag-over' : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
        >
          <Button 
            size="small"
            variant="text" 
            icon={<GripVertical size={16} />}
            className="drag-handle"
          />
          <div className="item-content">
            {/* { console.log(item) } */}
            {
              item.type === 'image' && <ImageIcon size={14} strokeWidth={2} />
            }
            {
              item.type === 'text' && <TypeIcon size={14} strokeWidth={2} />
            }
            <span className="item-text" title={ item.text || item.filename || item.id } style={{
              marginLeft: `4px`
            }}>
              { item.text || item.filename || item.id }
            </span>
          </div>
        </div>
      ))}

      <style jsx="true">{`
        .reorder-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .reorder-item {
          display: flex;
          align-items: center;
          padding: 8px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: move;
        }

        .reorder-item.drag-over {
          border: 1px dashed #007bff;
          background: rgba(0, 123, 255, 0.05);
        }

        .drag-handle {
          cursor: move;
          margin-right: 8px;
        }

        .item-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-content .item-text {
          width: 120px;
          display: inline-block;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
