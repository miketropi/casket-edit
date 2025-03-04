import { useEffect, useState } from 'react';
import { useAppStore } from '../context/AppContext.jsx';
import CanvasPreview from '../components/CanvasPreview';
import Accordion from '../components/Accordion';
import PlaneControl from '../components/PlaneControl';
import Button from '../components/Button';
import Modal from '../components/Modal';
import UserInfoForm from '../components/UserInfoForm';
import ThankYou from '../components/ThankYou';

export default function Design() {
  const { version, planes, updatePlane, onSaveDesign, decalsImageDesign, apiInstance, imagesUsed } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [saveDesign, setSaveDesign] = useState(false);
  const [saveModal, setSaveModal] = useState(false);

  useEffect(() => {
    console.log(version);
  }, [version]);

   const AccordionItems = planes.map((plane) => ({
    title: plane.label,
    content: <PlaneControl plane={ plane } onUpdate={ (updatedPlane) => {
      updatePlane(plane.name, updatedPlane); 
    } } />
   }));

  const __onSaveDesign = async (formData) => {
    setLoading(true);
    let newPlacesData= [...planes].map((plane) => {
      let { elements, ...rest } = plane;
      return { ...rest }
    })
    // console.log(newPlacesData);
    const response = await apiInstance.saveDesignEditData(newPlacesData); 
    if(!response?.url) {
      // error
      console.log(response);
      alert('Error saving design');
      return;
    }

    let designEditUrl = response.url;
    let postData = {
      "post_title": formData?.designName,
      "post_content": formData?.description,
      "casket_firstname": formData?.firstName,
      "casket_lastname": formData?.lastName,
      "casket_email": formData.email,
      "casket_design_data": designEditUrl,
      "casket_lib": decalsImageDesign?.Lid,
      "casket_right": decalsImageDesign?.Right,
      "casket_left": decalsImageDesign?.Left,
      "casket_back": decalsImageDesign?.Back,
      "casket_top": decalsImageDesign?.Top,
      "casket_bottom": decalsImageDesign?.Bottom,
      "casket_images": imagesUsed,
    };

    const createResponse = await apiInstance.createDesign(postData);
    console.log('submitted', createResponse);
    setLoading(false); 
    // success
    if(createResponse.success) {
      setSaveDesign(true); 
    }
  }

  return <div className="design-page">
    <div className="preview-area">
      <CanvasPreview />
    </div>
    <div className="control-area">
      <div className="control-area-inner">
        <div className="heading-container">
          <h2>Design your Casket</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eius voluptatem quas atque cupiditate impedit sunt tempora debitis deleniti fugiat! Dolores architecto harum odio nam iusto sed dicta delectus accusamus!</p>
          {
            console.log(decalsImageDesign)
          }
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
        
        <div style={{ padding: '1rem', marginTop: '1rem' }}>
         <Button 
          loading={ loading } 
          fullWidth size="large" 
          onClick={ () => setSaveModal(true) }>Save This Design</Button>
        </div>

        <Modal 
          isOpen={ saveModal } 
          onClose={ () => setSaveModal(false) }
          title="Save Design"
          >
          {
            saveDesign 
              ? <ThankYou /> 
              : <UserInfoForm  
                loading={ loading }
                onSubmit={ __onSaveDesign }
              />
          }
        </Modal>
      </div>
    </div>
  </div>
}