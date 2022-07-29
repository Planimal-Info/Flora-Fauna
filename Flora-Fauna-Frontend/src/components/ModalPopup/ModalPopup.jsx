import { useState } from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Image } from "@nextui-org/react";
import './ModalPopup.css'

export default function ModalPopup(props){

  const { visible, closeHandler } = props;
  const [liked, setIsLiked] = useState(false)
  const toggleLikes = () => {
    setIsLiked(!liked)
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
            <span className="material-symbols-outlined liked" onClick={toggleLikes}>thumb_up</span>
        ) : (
            <span className="material-symbols-outlined unliked" onClick={toggleLikes}>thumb_up</span>
        )}
        </div>
        <div className="likes-counter">0</div>
    </Modal.Footer>
  </Modal>
  )
}