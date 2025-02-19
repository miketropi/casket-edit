import { useEffect, useRef } from 'react';

/**
 * Modal Component
 * 
 * A reusable modal dialog component that can be opened/closed and contains customizable content.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls whether the modal is visible
 * @param {function} props.onClose - Callback function to close the modal
 * @param {ReactNode} props.children - Content to be rendered inside the modal
 * @param {string} props.title - Title text shown in the modal header
 * 
 * @example
 * // Basic usage
 * <Modal 
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Example Modal"
 * >
 *   <p>Modal content goes here</p>
 * </Modal>
 * 
 * Features:
 * - Closes on ESC key press
 * - Closes on clicking outside
 * - Prevents body scrolling when open
 * - Fully customizable content
 */

const Modal = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>

      <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          border-radius: 4px;
          max-width: 960px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1em;
          border-bottom: 1px solid #e6e6e6;
        }

        .modal-header h2 {
          margin: 0;
          font-weight: 600;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5em;
          cursor: pointer;
          padding: 0;
          color: #111;
          transition: color 0.2s ease;
        }

        .close-button:hover {
          color: #333;
        }

        .modal-content {
          padding: 1em;
        }
      `}</style>
    </div>
  );
};

export default Modal;
