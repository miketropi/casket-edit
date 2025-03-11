import { useState, useEffect } from 'react';

const Loading = ({ isLoading = true, message = "Loading..." }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-message">
          {message}
          <span className="loading-dots">{dots}</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
