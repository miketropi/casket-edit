import React from 'react';
import { Layers, Type, ZoomIn, Maximize, Share } from 'lucide-react';

/**
 * UsefulTips component displays helpful information about the design module functionality
 * with a modern two-column layout and icons for each tip
 */
const UsefulTips = () => {
  const tips = [
    {
      title: "Layers Function",
      description: "<strong>Move the images forward and back on your design.</strong> Click and drag the image name in dropdown box and drag it up or down to bring image forward or move it back on the page.",
      icon: <Layers size={24} />
    },
    {
      title: "Edit Text Function",
      description: "<strong>Edit text font/size & colour on your design.</strong> Click the text box and text edit option will appear.",
      icon: <Type size={24} />
    },
    {
      title: "Zoom Function",
      description: "<strong>Zoom in or out on your design.</strong> Use the mouse wheel to zoom in or out on your design.",
      icon: <ZoomIn size={24} />
    },
    {
      title: "Scale Function",
      description: "<strong>Scale your design on the surface.</strong> Use the Scale Slider to enlarge or decrease the design on the surface.",
      icon: <Maximize size={24} />
    },
    {
      title: "Save & Share Function",
      description: "<strong>Save you design and Share the Design.</strong> Click the SAVE THIS DESIGN button, complete the form and Sumbit the design to save and share.",
      icon: <Share size={24} />
    }
  ];

  return (
    <div className="useful-tips">
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div key={index} className="tip-item">
            <div className="tip-icon">{tip.icon}</div>
            <div className="tip-content">
              <h3 className="tip-title">{tip.title}</h3>
              <p className="tip-description" dangerouslySetInnerHTML={{__html:tip.description}}></p>
            </div>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .useful-tips {
          padding: 0.5rem;
        }
        
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        
        @media (max-width: 768px) {
          .tips-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .tip-item {
          display: flex;
          background-color: #ffffff;
          border-radius: 6px;
          padding: 1.25rem;
          // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          height: 100%;
          box-sizing: border-box;
        }

        .tip-item strong {
          color: #333;
        }
        
        .tip-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }
        
        .tip-icon {
          color: #4a6cf7;
          margin-right: 1rem;
          display: flex;
          align-items: flex-start;
          padding-top: 0.25rem;
        }
        
        .tip-content {
          flex: 1;
        }
        
        .tip-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          color: #1e293b;
          font-weight: 600;
        }
        
        .tip-description {
          margin: 0;
          color: #64748b;
          line-height: 1.6;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default UsefulTips;
