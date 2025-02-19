import { useRef, useEffect } from 'react';

/**
 * A reusable popover component that appears relative to a trigger element.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls whether the popover is visible
 * @param {function} props.onClose - Callback function to close the popover
 * @param {ReactNode} props.children - Content to be rendered inside the popover
 * @param {ReactNode} props.trigger - Element that triggers the popover
 * @param {string} props.position - Position of popover relative to trigger ('top', 'bottom', 'left', 'right', 'bottom-left', 'bottom-right')
 */
const Popover = ({ isOpen, onClose, children, trigger, position = 'bottom' }) => {
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && 
          !popoverRef.current.contains(e.target) &&
          !triggerRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="popover-container">
      <div ref={triggerRef}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`popover ${position}`} ref={popoverRef}>
          {children}
        </div>
      )}

      <style jsx="true">{`
        .popover-container {
          position: relative;
          display: inline-block;
        }

        .popover {
          position: absolute;
          background: white;
          border-radius: 4px;
          padding: 1em;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          min-width: 200px;
        }

        .popover.top {
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        }

        .popover.bottom {
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
        }

        .popover.bottom-left {
          top: calc(100% + 8px);
          left: 0;
        }

        .popover.bottom-right {
          top: calc(100% + 8px);
          right: 0;
        }

        .popover.left {
          right: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }

        .popover.right {
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

export default Popover;
