import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

/**
 * Accordion Component
 * 
 * A collapsible accordion component that displays a list of items with expandable content.
 * 
 * @component
 * @param {Object[]} items - Array of accordion items
 * @param {string} items[].title - The header text for each accordion section
 * @param {ReactNode} items[].content - The content to be displayed when section is expanded
 * 
 * @example
 * const items = [
 *   {
 *     title: "Section 1",
 *     content: "Content for section 1"
 *   },
 *   {
 *     title: "Section 2", 
 *     content: <div>Custom content for section 2</div>
 *   }
 * ];
 * 
 * return (
 *   <Accordion items={items} />
 * );
 */

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items?.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            {item.title}
            <span className="accordion-icon">
              {activeIndex === index ? <Minus /> : <Plus />}
            </span>
          </div>
          
          {activeIndex === index && (
            <div className="accordion-content">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
