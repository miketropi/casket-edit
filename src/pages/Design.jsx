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
      {/* { JSON.stringify(planes) } */}
      <Accordion items={ AccordionItems } />
    </div>
  </div>
}