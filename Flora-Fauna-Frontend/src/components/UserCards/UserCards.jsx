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
  };

  const [liked, setIsLiked] = useState(false)
  const toggleLikes = () => {
    setIsLiked(!liked)
  }

  return(
    <div className="user-card">
    <img src={props.source} className="user-img" onClick={modalHandler}/>
    <h2 className="user-card-title">{props.title}</h2>
    <h4 className="user-card-desc">{props.desc}</h4>

    <div className="likes-container">
      <div className="likes">
          {liked ? (
              <span className="material-symbols-outlined liked" onClick={toggleLikes}>thumb_up</span>
          ) : (
              <span className="material-symbols-outlined unliked" onClick={toggleLikes}>thumb_up</span>
          )}
          </div>
      <div className="likes-counter">0</div>
    </div>

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
