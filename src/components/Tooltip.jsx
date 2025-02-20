import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const Tooltip = ({ text, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const targetRef = useRef(null);
  const tooltipRef = useRef(null);

  const tooltipStyle = {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '3px 6px',
    borderRadius: '4px',
    lineHeight: 'normal',
    fontSize: '12px',
    zIndex: 1000,
    ...coords
  };

  useEffect(() => {
    if (isVisible && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const tooltipPosition = {
        top: position === 'bottom' ? rect.bottom + 8 + 'px' : 
             position === 'top' ? rect.top - (tooltipRef.current.offsetHeight) + 'px' : 
             rect.top + (rect.height / 2) + 'px',
        left: position === 'right' ? rect.right + 8 + 'px' :
              position === 'left' ? rect.left - (tooltipRef.current.offsetWidth / 2) + 'px' :
              rect.left + (rect.width / 2) + 'px'
      };
      
      setCoords(tooltipPosition);
    }
  }, [isVisible, position]);

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && createPortal(
        <div ref={tooltipRef} style={tooltipStyle}>
          {text}
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;
 