import { useEffect } from 'react';
import { useAppStore } from '../context/AppContext.jsx';
import CanvasPreview from '../components/CanvasPreview';
import Accordion from '../components/Accordion';

export default function Design() {
  const { version, planes } = useAppStore();

  useEffect(() => {
    console.log(version);
  }, [version]);

   const AccordionItems = planes.map((plane) => ({
    title: plane.name,
    content: <div>
      { JSON.stringify(plane) }
    </div>
   }));

  return <div className="design-page">
    <div className="preview-area">
      <CanvasPreview />
    </div>
    <div className="control-area">
      <div className="heading-container">
        <h2>Design your Casket</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eius voluptatem quas atque cupiditate impedit sunt tempora debitis deleniti fugiat! Dolores architecto harum odio nam iusto sed dicta delectus accusamus!</p>
        <button onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(planes, null, 2))
            .then(() => {
              console.log('Planes data copied to clipboard');
            })
            .catch(err => {
              console.error('Failed to copy planes data:', err);
            });
        }}>
          Copy planes
        </button>
      </div>
      <Accordion items={ AccordionItems } />
    </div>
  </div>
}