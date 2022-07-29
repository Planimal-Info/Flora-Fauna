import { useState } from "react";
import { Modal, Input, Row, Checkbox, Button, Text, Image } from "@nextui-org/react";

export default function ModalPopup(props){

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