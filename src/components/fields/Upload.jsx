import { useRef, useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';
import Button from '../Button';
import { useAppStore } from '../../context/AppContext';

export default function Upload({ onUpload, label = 'Add Image' }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);
  const api = useAppStore(state => state.api);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    // api.uploadImage(file).then(res => {
    //   console.log(res);
    //   if(res?.url) {
    //     let __url = `${ import.meta.env.VITE_API_ENDPOINT }/?image_source=${ res.url }`;
    //     onUpload(__url);
    //   } else {
    //     console.error('Error uploading image', res);
    //     alert('Error uploading image, please try again!!!'); 
    //   }
    // });
    // return;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className={`upload-container ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={ inputRef }
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <label htmlFor="file-upload">
        <Button 
          icon={<UploadIcon size={16} />}
          fullWidth
          onClick={() => inputRef.current.click()}
        >
          { label }
        </Button>
      </label>
      {/* <div className="upload-instructions">
        or drag and drop your image here
      </div> */}
    </div>
  );
}
