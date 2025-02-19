import { useState } from 'react';

export default function FontSize({ value, onChange }) {
  const [fontSize, setFontSize] = useState(value || 16);

  const handleChange = (e) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    onChange(newSize);
  };

  return (
    <div className="font-size-selector">
      <div className="select-trigger">
        <div className="field-prefix">Size:</div>
        <input
          type="number"
          min="8"
          max="200"
          value={fontSize}
          onChange={handleChange}
        />
      </div>
      <style jsx="true">{`
        .font-size-selector {
          position: relative;
          width: 100%;
        }

        .select-trigger {
          display: flex;
          align-items: center;
          padding: 4.5px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background: white;
        }

        .field-prefix {
          color: #666;
          margin-right: 8px;
          font-size: 14px;
        }
        
        .select-trigger input {
          width: 38px;
          padding: 2px 4px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 14px;
        }

        .select-trigger input:focus {
          outline: none;
          border-color: #0066ff;
        }
      `}</style>
    </div>
  );
}
