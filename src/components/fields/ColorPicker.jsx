import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ColorPicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    '#000000', '#FFFFFF', '#F44336', '#4CAF50', '#2196F3',
    '#FFC107', '#9C27B0', '#00BCD4', '#607D8B', '#E91E63',
    '#FF9800', '#8BC34A', '#673AB7', '#03A9F4', '#795548'
  ];

  return (
    <div className="color-picker">
      <div 
        className="picker-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="field-prefix">Color:</div>
        <div className="color-preview" style={{ backgroundColor: value || '#000000' }} />
        <ChevronDown size={16} />
      </div>

      {isOpen && (
        <div className="color-dropdown">
          <div className="color-grid">
            {colors.map(color => (
              <div
                key={color}
                className="color-option"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
          <input
            type="color"
            value={value}
            onChange={e => {
              onChange(e.target.value);
              // setIsOpen(false);
            }}
            className="custom-color-input"
          />
        </div>
      )}

      <style jsx="true">{`
        .color-picker {
          position: relative;
          width: 100%;
        }

        .picker-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4.5px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: pointer;
          background: white;
        }

        .field-prefix {
          color: #666;
          margin-right: 8px;
          font-size: 14px;
        }

        .color-preview {
          width: 20px;
          height: 20px;
          border-radius: 2px;
          border: 1px solid #e0e0e0;
          margin-right: 8px;
          border-radius: 20px;
        }

        .color-dropdown {
          position: absolute;
          width: 200px;
          top: 100%;
          left: 0;
          margin-top: 4px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 8px;
          z-index: 1000;
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
          margin-bottom: 8px;
        }

        .color-option {
          width: 100%;
          padding-bottom: 100%;
          border-radius: 2px;
          border: 1px solid #e0e0e0;
          cursor: pointer;
          transition: transform 0.1s;
        }

        .color-option:hover {
          transform: scale(1.1);
        }

        .custom-color-input {
          width: 100%;
          height: 30px;
          padding: 0;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ColorPicker;
