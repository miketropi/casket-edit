import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAppStore } from '../context/AppContext.jsx';
import CanvasPreview from '../components/CanvasPreview';
import Accordion from '../components/Accordion';
import PlaneControl from '../components/PlaneControl';
import Button from '../components/Button';
import Modal from '../components/Modal';
import UserInfoForm from '../components/UserInfoForm';
import ThankYou from '../components/ThankYou';
import Loading from '../components/Loading';

export default function Design() {
  const { id } = useParams();
  const [shareMode, setShareMode] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [savePostId, setSavePostId] = useState(null);

  const { version, planes, setPlanes, updatePlane, onSaveDesign, decalsImageDesign, apiInstance, imagesUsed, mainLoaded } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [saveDesign, setSaveDesign] = useState(false);
  const [saveModal, setSaveModal] = useState(false);

  const getCasketData = async () => {
    const response = await apiInstance.getDesignData(id);
    if(response?.casket_design_data) {
      setShareData(response);
      setShareMode(true);
      setPlanes(response.casket_design_data)
    }
  }

  useEffect(() => {
    if(id) {
      getCasketData()
    }
  }, [id]);

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
    // console.log('submitted', createResponse);
    setLoading(false); 
    // success
    if(createResponse.success) {
      setSaveDesign(true); 
      setSavePostId(createResponse.post_id)
    } else {
      alert('Error saving design, please try again!!!');
    }
  }

  return <div className="design-page">
    {
      mainLoaded == false && (
        <Loading />
      )
    }
    
    <div className="preview-area">
      <CanvasPreview />
    </div>
    <div className="control-area">
      <div className="control-area-inner">
        <div className="heading-container">
          {
            (() => {
              if(shareMode) {
                return (
                  <>
                    <div className="design-share-container">
                      <h2 className="design-title">Name: { shareData?.post_title }</h2>
                      <div className="design-description">{ shareData?.post_content }</div>
                      
                      <div className="design-metadata">
                        <div className="creator-info">
                          <span className="label">Designer:</span>
                          <span className="value">{ shareData?.casket_firstname } { shareData?.casket_lastname }</span>
                        </div>
                        <div className="contact-info">
                          <span className="label">Contact:</span>
                          <span className="value"><a href={ `mailto:${shareData?.casket_email}` }>{ shareData?.casket_email }</a></span>
                        </div>
                      </div>
                      
                      <div className="share-link-container">
                        <span className="share-label">Share this design:</span>
                        <a 
                          className="share-url" 
                          href={ `${window.location.origin}/design/${shareData?.post_id}` } 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          { `${window.location.origin}/design/${shareData?.post_id}` }
                        </a>
                      </div>

                      <div style={{ marginTop: '1.5em' }}>
                        <Button 
                          fullWidth 
                          size="large" 
                          onClick={() => window.location.href = '/design'}
                        >
                          Create New Design
                        </Button>
                      </div>
                    </div>
                  </>
                )
              } else {
                return (
                  <>
                    <h2>Design Coffin</h2>
                    <p>Create a personalized memorial by customizing each side of the coffin with your own images, text, and designs. Select a surface to begin editing.</p>
                  </>
                )
              }
            })()
          }
        </div>
        
        {
          shareMode == false && (
            <>
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
                    ? <ThankYou postId={ savePostId } /> 
                    : <UserInfoForm  
                      loading={ loading }
                      onSubmit={ __onSaveDesign }
                    />
                }
              </Modal>
            </>
          )
        }
      </div>
    </div>
  </div>
}