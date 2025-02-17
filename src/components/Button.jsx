import { forwardRef } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * A flexible button component that supports icons and various styles.
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Button content
 * @param {ReactNode} props.icon - Optional icon element to display
 * @param {string} props.variant - Button style variant ('primary', 'secondary', 'text')
 * @param {string} props.size - Button size ('small', 'medium', 'large') 
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {function} props.onClick - Click handler
 * @param {boolean|string} props.disclosure - Show disclosure icon ('up', 'down', 'left', 'right', or boolean)
 */
const Button = forwardRef(({
  children,
  icon,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  disclosure = false,
  onClick,
  ...props
}, ref) => {
  const getDisclosureIcon = () => {
    if (!disclosure) return null;
    const iconProps = { size: size === 'small' ? 14 : size === 'large' ? 20 : 16 };
    
    switch(disclosure) {
      case 'up': return <ChevronUp {...iconProps} />;
      case 'left': return <ChevronLeft {...iconProps} />;
      case 'right': return <ChevronRight {...iconProps} />;
      default: return <ChevronDown {...iconProps} />;
    }
  };

  return (
    <button
      ref={ref}
      className={`button ${variant} ${size} ${fullWidth ? 'full-width' : ''}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="icon">{icon}</span>}
      {children}
      {disclosure && <span className="disclosure-icon">{getDisclosureIcon()}</span>}

      <style jsx="true">{`
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5em;
          border: none;
          border-radius: 4px;
          font-family: "Josefin Sans", serif;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .button.full-width {
          width: 100%;
        }

        /* Variants */
        .button.primary {
          background: #007bff;
          color: white;
        }
        
        .button.primary:hover:not(:disabled) {
          background: #0056b3;
        }

        .button.secondary {
          background: #6c757d;
          color: white;
        }

        .button.secondary:hover:not(:disabled) {
          background: #545b62;
        }

        .button.text {
          background: transparent;
          color: #007bff;
        }

        .button.text:hover:not(:disabled) {
          background: rgba(0, 123, 255, 0.1);
        }

        /* Sizes */
        .button.small {
          padding: 0.25em 0.5em;
          font-size: 0.875rem;
        }

        .button.medium {
          padding: 0.5em 1em;
          font-size: 1rem;
        }

        .button.large {
          padding: 0.75em 1.5em;
          font-size: 1.125rem;
        }

        .icon {
          display: flex;
          align-items: center;
        }

        .disclosure-icon {
          display: flex;
          align-items: center;
        }
      `}</style>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
