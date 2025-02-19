import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const GOOGLE_FONT_API_KEY = import.meta.env.VITE_GOOGLE_FONT_API_KEY;

const GoogleFontSelect = ({ value, onChange }) => {
  const [fonts, setFonts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Load Google Fonts
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONT_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setFonts(data.items);
      })
      .catch(error => console.error('Error loading fonts:', error));
  }, []);

  const filteredFonts = fonts.filter(font => 
    font.family.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="google-font-select">
      <div 
        className="select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="field-prefix">Font:</div>
        <span className="select-trigger-text" style={{ fontFamily: value }}>{value || 'Select a font'}</span>
        <ChevronDown size={16} />
      </div>

      {isOpen && (
        <div className="select-dropdown">
          <input
            type="text"
            placeholder="Search fonts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onClick={e => e.stopPropagation()}
          />
          <div className="font-list">
            {filteredFonts.map(font => (
              <div
                key={font.family}
                className="font-option"
                style={{ fontFamily: font.family }}
                onClick={() => {
                  onChange(font.family);
                  setIsOpen(false);
                }}
              >
                {font.family}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx="true">{`
        .google-font-select {
          position: relative;
          width: 100%;
        }

        .select-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4.5px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: pointer;
          background: white;
        }

        .select-trigger-text {
          max-width: 90px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .field-prefix {
          color: #666;
          margin-right: 8px;
          font-size: 14px;
        }

        .select-dropdown {
          position: absolute;
          width: 180px;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 4px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          z-index: 1000;
        }

        .select-dropdown input {
          width: 100%;
          padding: 8px 12px;
          border: none;
          border-bottom: 1px solid #e0e0e0;
          outline: none;
          box-sizing: border-box;
        }

        .font-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .font-option {
          padding: 8px 12px;
          cursor: pointer;
        }

        .font-option:hover {
          background: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default GoogleFontSelect;
