import "./UploadPage.css";
import { useRef } from "react";
import { useState } from "react";

export default function UploadPage() {
  
  //const [fileImage, setFilemage] = useState({})
  const [selectedImage, setSelectedImage] = useState();
  const [uploadValues, setUploadValues] = useState({
    imageUrl: "",
    title: "",
    caption: ""
  })

  // Handle value changes for image url, title and caption
  const handleUploadChange = (e) => {
    setUploadValues({
      ...uploadValues,
      [e.target.name]: e.target.value,
    });
  }
  //////////////////////

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  // open file explorer/finder to select image
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.click();
  }

  const handleFileChange = e => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
  }
  //e.target.value = null
  ////////////////////

  return (
    <div className="upload-page">
      <div className="upload-form">
        <div className="upload-header">Upload Post</div>
        {/* SELECT IMAGE FILE FROM COMPUER */}
        <input 
          type="file"
          name="fileUpload"
          ref={inputRef}
          onChange={imageChange}
          hidden
          >
          </input>
        <div className="file-upload" onClick={handleClick}>
          <div className="material-symbols-outlined add-file">note_add</div>
          <h2>Select an image file to upload</h2>
        </div>
        {selectedImage && (
          <div className="preview-image">
            <img className="uploaded-preview-image" src={URL.createObjectURL(selectedImage)} />
            <button className="remove-image" onClick={removeSelectedImage}>
              <span class="material-symbols-outlined cancel">cancel</span>
            </button>
          </div>
        )}
        {/* UPLOAD VIA IMAGE URL */}
        <UploadImageUrl handleUploadChange={handleUploadChange} />

        {/* INSERT TITLE */}
        <div className="user-post-title">
          <label htmlFor="post-title">Title:</label>
          <input
            type="text"
            name="title"
            onChange={handleUploadChange} />
        </div>

        {/* INSERT CAPTION */}
        <div className="user-caption">
          <label htmlFor="caption">Insert Caption:</label>
          <textarea
            name="caption"
            id="upload-caption"
            cols="10"
            rows="10"
            placeholder="Enter text here..."
            maxLength="300"
            onChange={handleUploadChange}
            ></textarea>
        </div>
        <button className="post-submit btn">Submit</button>
      </div>
    </div>
  )
}

// Component to upload image via image url
export function UploadImageUrl(props) {

  const { handleUploadChange } = props

  return(
    <div className="upload-image-url">
      <div className="url-upload">
          <label className="image-url-upload">Or upload from URL</label>

          <div className="url-input">
            <input
              id="image-url"
              type="text"
              name="imageUrl"
              autoComplete="false"
              autofill="off"
              onChange={handleUploadChange}
              />
            <button id="image-submit" className="upload btn">Upload</button>
          </div>
        </div>
    </div>
  )
}
