import React from "react";
import "./UserFeed.css";
import { useAuthContext } from "../../contexts/auth.jsx";
import { usePostContext } from "../../contexts/posts.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Input, Row, Checkbox, Button, Text, Image } from "@nextui-org/react";
import Hero from "../Hero/Hero.jsx";
import UserCards from "../UserCards/UserCards.jsx";
import SearchFilter from "../SearchFilter/SearchFilter"

export default function UserFeed(props) {
  const { user } = useAuthContext();
  const { posts, isLoading } = usePostContext();
  const [showCategories, setShowCategories] = useState(false);
  const [showTimeFrames, setShowTimeFrames] = useState(false);

  //hides and shows the time filters
  function handleTime() {
    if (showCategories === true) {
      setShowCategories(false);
    }
    let time = showTimeFrames;
    setShowTimeFrames(!time);
  }
  //hides and shows the categories filters
  function handleCategories() {
    if (showTimeFrames === true) {
      setShowTimeFrames(false);
    }
    let categories = showCategories;
    setShowCategories(!categories);
  }

  //Changes array buffer in posts response to base64 to display
  function toBase64(arr) {
    //Changes ArrayBuffer to base 64
    const baseSource = btoa(
      arr?.reduce((data, byte) => data + String.fromCharCode(byte), ""),
    );
    //Takes base64 string and concats to get right source for image
    const source = `data:image/jpeg;base64,${baseSource}`;
    return source;
  }
  //Navigates to upload page
  const navigate = useNavigate();
  const sendToUpload = () => {
    navigate("/upload");
  };

  //If there is no user, AKA a viewer. Show only the hero
  if (!user) {
    return (
      <div className="user-feed-overview">
        <h2>UserFeed</h2>
        <Hero />
      </div>
    );
  }

  const [visible, setVisible] = useState(false);
   const [modalContent, setModalContent] = useState([]);
  //  const [popupToggle, setPopupToggle] = useState(false);
  const modalHandler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const changeContent = (e) => {
    setVisible(true)
    setModalContent([e]);
    // setPopupToggle(!popupToggle);
  }
  
  // the user feed for a user whos logged in
  return (
    <div className="user-feed-overview">
      <h2>User Feed</h2>
     <div className="user-feed-wrapper">
        <SearchFilter />
        <div className="user-feed-body">
          {Object.keys(posts).length > 1
            ? posts?.map((e, idx) => (
              <UserCards
                key={idx}
                source={toBase64(e?.photo?.data)}
                title={e.user_post_title}
                desc={e.user_post_desc}
                modalHandler={modalHandler}
                changeContent={changeContent}
              />
            ))
            : ""}
        </div>
        {/* {visible && ()} */}
        <div className="modal-popup">
            {Object.keys(posts).length > 1
            ? posts?.map((x, idx) => (
              <ModalPopup
                key={idx}
                source={toBase64(x?.photo?.data)}
                title={x.user_post_title}
                desc={x.user_post_desc}
                modalHandler={modalHandler}
                visible={visible}
                closeHandler={closeHandler}
              />
            ))
            : null}
        </div>
      </div>
    </div>
  );
}

export function ModalPopup(props){

  const { visible, closeHandler } = props;

  return(
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
  
    <Modal.Body>
      <Image
      width={500}
      src={props.source}
      objectFit="cover"
      />
        <Text id="modal-title" b size={20}>
          {props.title}
        </Text>
        <Text id="modal-desc" size={15}>
          {props.desc}
        </Text>
    </Modal.Body>
    <Modal.Footer>
      <Button auto flat color="error" onClick={closeHandler}>
        Close
      </Button>
      <Button auto onClick={closeHandler}>
        Sign in
      </Button>
    </Modal.Footer>
  </Modal>
  )
}