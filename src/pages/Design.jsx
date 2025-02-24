import { useEffect } from 'react';
import { useAppStore } from '../context/AppContext.jsx';
import CanvasPreview from '../components/CanvasPreview';
import Accordion from '../components/Accordion';
import PlaneControl from '../components/PlaneControl';
import Button from '../components/Button';

export default function Design() {
  const { version, planes, updatePlane } = useAppStore();

  useEffect(() => {
    console.log(version);
  }, [version]);

   const AccordionItems = planes.map((plane) => ({
    title: plane.label,
    content: <PlaneControl plane={ plane } onUpdate={ (updatedPlane) => {
      updatePlane(plane.name, updatedPlane); 
    } } />
   }));

  return <div className="design-page">
    <div className="preview-area">
      <CanvasPreview />
    </div>
    <div className="control-area">
      <div className="control-area-inner">
        <div className="heading-container">
          <h2>Design your Casket</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eius voluptatem quas atque cupiditate impedit sunt tempora debitis deleniti fugiat! Dolores architecto harum odio nam iusto sed dicta delectus accusamus!</p>
          {/* <Button fullWidth onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(planes, null, 2))
              .then(() => {
                console.log('Planes data copied to clipboard');
              })
              .catch(err => {
                console.error('Failed to copy planes data:', err);
              });
          }}>
            Copy planes
          </Button> */}
        </div>
        <Accordion items={ AccordionItems } />
      </div>
    </div>
  </div>
}