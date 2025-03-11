import { CheckCircle } from 'lucide-react';

export default function ThankYou({ postId }) {
  return (
    <div className="thank-you-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <CheckCircle 
        size={64}
        color="#4CAF50"
        style={{ marginBottom: '1.5rem' }}
      />
      
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#2c3e50'
      }}>
        Thank You!
      </h2>

      <p style={{
        fontSize: '1.1rem',
        color: '#5f6c7b',
        lineHeight: '1.6',
        maxWidth: '400px'
      }}>
        We will contact you as soon as possible.
      </p>

      <div className="share-link-container" style={{
        backgroundColor: '#f0f7ff',
        padding: '1em',
        borderRadius: '6px',
        borderLeft: '3px solid #3498db',
        marginTop: '1.5rem',
        width: '100%',
        textAlign: 'left'
      }}>
        <span className="share-label" style={{
          display: 'block',
          marginBottom: '0.5em',
          fontWeight: '600',
          color: '#3498db'
        }}>
          Share this design:
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <input
            type="text"
            readOnly
            value={`${window.location.origin}/design/${postId}`}
            className="textarea-field"
            style={{
              flex: 1,
              fontSize: '0.9em',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/design/${postId}`);
              alert('Link copied to clipboard!');
            }}
            style={{
              padding: '0.5em 1em',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
