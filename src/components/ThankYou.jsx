import { CheckCircle } from 'lucide-react';

export default function ThankYou() {
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
    </div>
  );
}
