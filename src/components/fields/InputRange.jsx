import { useState } from 'react';

export default function InputRange({ 
  min = 0,
  max = 1, 
  step = 0.01,
  value: initialValue = 0,
  onChange,
  label
}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="input-range-container">
      <label>{label}</label>
      <div className="input-range-handle">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
        />
        <div>
          <input
            type="number"
            className="input-range-value"
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
          />
        </div>
      </div>
    </div>
  );
}
