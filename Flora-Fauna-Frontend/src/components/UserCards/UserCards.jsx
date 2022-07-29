import "./UserCards.css";
import { useState } from "react";
import ModalPopup from "../ModalPopup/ModalPopup";
import { toBase64 } from "../UserFeed/UserFeed";

export default function UserCards(props){

  const { source, title, desc, post } = props

  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const modalHandler = () => setVisible(true);
  
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  // const changeContent = (e) => {
  //   setVisible(true)
  //   setModalContent([e]);

  // }

  return(
    <div className="user-card">
    <img src={props.source} className="user-img" onClick={modalHandler}/>
    <h2 className="user-card-title">{props.title}</h2>
    <h4 className="user-card-desc">{props.desc}</h4>

    {visible && 
    
    <div className="modal-popup">
              <ModalPopup
                source={toBase64(post?.photo?.data)}
                title={post.user_post_title}
                desc={post.user_post_desc}
                modalHandler={modalHandler}
                visible={visible}
                closeHandler={closeHandler}
              />
      </div>}
    </div>
  )
}
