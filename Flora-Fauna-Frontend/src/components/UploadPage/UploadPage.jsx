import "./UploadPage.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../../contexts/posts.jsx";

export default function UploadPage() {
  const { createPost, posts, bufferToBase64 } = usePostContext();
  const navigate = useNavigate();

  //const [fileImage, setFilemage] = useState({})
  const [selectedImage, setSelectedImage] = useState();
  const [uploadValues, setUploadValues] = useState({
    title: "",
    category: "",
    animal_name: "",
    caption: "",
  });
  const [imageError, setImageError] = useState({});
  const [valueError, setValueError] = useState({
    title: "",
    category: "",
    animal_name: "",
    caption: "",
  });

  // Handle value changes for image url, title and caption
  const handleUploadChange = (e) => {
    setUploadValues({
      ...uploadValues,
      [e.target.name]: e.target.value,
    });
  };
  //////////////////////
  //Updates image when changes happen
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setImageError({});
    }
  };

  //Removes image preview if clicked on
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  // open file explorer/finder to select image
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  //Updates changes for file values
  const handleFileChange = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
  };
  //Submit function that is called when user submits form
  const handleOnSubmit = () => {
    //Validation before sending to backend
    if (selectedImage === undefined) {
      setImageError({ image: "Select an Image" });
      return;
    }
    for (const e in uploadValues) {
      if (uploadValues[e].length <= 1) {
        setValueError({});
        setValueError((prevState) => ({ ...prevState, [e]: `error for ${e}` }));
        return;
      }
    }

    //Making request and navigating to user feed
    const inputObj = { image: selectedImage, values: uploadValues };
    createPost(inputObj);
    navigate("/userfeed");
  };
  //e.target.value = null
  ////////////////////
  return (
    <div className="upload-page">
      <div className="upload-form">
        <form enctype="multipart/form-data">
          <div className="upload-header">Upload Post</div>
          {/* SELECT IMAGE FILE FROM COMPUER */}
          <input
            type="file"
            name="file"
            ref={inputRef}
            onChange={imageChange}
            hidden
          >
          </input>
        </form>
        <div className="file-upload" onClick={handleClick}>
          <div className="material-symbols-outlined add-file">note_add</div>
          <h2>Select an image file to upload</h2>
        </div>
        {selectedImage && (
          <div className="preview-image">
            <img
              className="uploaded-preview-image"
              src={URL.createObjectURL(selectedImage)}
            />
            <button className="remove-image" onClick={removeSelectedImage}>
              <span className="material-symbols-outlined cancel">cancel</span>
            </button>
          </div>
        )}
        <div className={imageError.image ? "error-message" : "hidden"}>
          Select and Image
        </div>
        {/* UPLOAD VIA IMAGE URL */}
        {/* <UploadImageUrl handleUploadChange={handleUploadChange} /> */}

        {/* INSERT TITLE */}
        <form enctype="multipart/form-data">
          <div className="user-post-title">
            <label htmlFor="post-title">Title:</label>
            <input
              type="text"
              name="title"
              onChange={handleUploadChange}
            />
          </div>
          <div
            className={valueError?.title?.length > 0
              ? "error-message"
              : "hidden"}
          >
            Invalid Input for Title
          </div>
          <div className="user-post-category">
            <label htmlFor="post-title">Category:</label>
            {
              /* <input
              type="text"
              name="category"
              onChange={handleUploadChange}
            /> */
            }
            {/* Category */}

            <select
              name="category"
              id="post-category"
              onChange={handleUploadChange}
            >
              <option value="Select">- Select category -</option>
              <option value="Insects">Insects</option>
              <option value="Mammals">Mammals</option>
              <option value="Plants">Plants</option>
              <option value="Reptiles">Reptiles</option>
              <option value="Birds">Birds</option>
            </select>
          </div>
          <div
            className={valueError?.category?.length > 0
              ? "error-message"
              : "hidden"}
          >
            Invalid Input for Category
          </div>

          {/* Animal Name */}

          <div className="user-post-title">
            <label htmlFor="post-title">Animal Name:</label>
            <input
              type="text"
              name="animal_name"
              onChange={handleUploadChange}
            />
          </div>
        </form>
        <div
          className={valueError?.animal_name?.length > 0
            ? "error-message"
            : "hidden"}
        >
          Invalid Input for Animal Name
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
          >
          </textarea>
        </div>
        <div
          className={valueError?.caption?.length > 0
            ? "error-message"
            : "hidden"}
        >
          Invalid Input for Caption
        </div>
        <button className="post-submit btn" onClick={handleOnSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

// Component to upload image via image url
export function UploadImageUrl(props) {
  const { handleUploadChange } = props;

  return (
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
  );
}
