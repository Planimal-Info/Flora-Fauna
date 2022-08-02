import { useState } from "react";
import { Modal, Button, Text, Image } from "@nextui-org/react";
import { useAdminContext } from "../../contexts/admin.jsx";
import './ModalPopup.css'

export default function ModalPopup(props){
  const { reportPost } = useAdminContext();
  const { visible, closeHandler, id, handleUpdateLikes, post, postLikes } = props;
  const [liked, setIsLiked] = useState(false)
  const toggleLikes = () => {
    setIsLiked(!liked)
  }
  
  //Reports the post and sends it to admin panel
  const report = async () => {
    await reportPost(id)
  }

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
        <div className="likes">
        {liked ? (
            <span className="material-symbols-outlined liked" onClick={handleUpdateLikes}>thumb_up</span>
        ) : (
            <span className="material-symbols-outlined unliked" onClick={handleUpdateLikes}>thumb_up</span>
        )}
        </div>
        <div className="likes-counter">{post.likes + postLikes}</div><div class="material-symbols-outlined post-modal flagged-icon" onClick={report}>flag</div>
    </Modal.Footer>
  </Modal>
  )
}
