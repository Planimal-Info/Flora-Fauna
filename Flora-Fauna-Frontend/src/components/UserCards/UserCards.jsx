import "./UserCards.css";
import { useState } from "react";
import ModalPopup from "../ModalPopup/ModalPopup";
import { toBase64 } from "../UserFeed/UserFeed";
import { useAdminContext } from "../../contexts/admin.jsx";
import { Card, Col, Text } from "@nextui-org/react";

export default function UserCards(props) {
  const { source, title, desc, post, id } = props;
  const { reportPost } = useAdminContext(); 
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const modalHandler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const [liked, setIsLiked] = useState(false);
  const toggleLikes = () => {
    setIsLiked(!liked);
  };

  //Reports the post and sends it to admin panel
  const report = async () => {
    await reportPost(id)
  }
  return (
    <div className="user-card">
    {/* <img src={props.source} className="user-img" onClick={modalHandler}/>
    <h2 className="user-card-title">{props.title}</h2>
    <h4 className="user-card-desc">{props.desc}</h4> */}
    <Card className="single-post">
      <div className="overlay" onClick={modalHandler}></div>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          {/* INSERT CATEGORY */}
          Mammals
        </Text>
        <Text h4 color="white">
          {props.title}
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src={props.source}
      objectFit="cover"
      width="100%"
      height={340}
      alt="Card image background"
    />
    <div className="likes-container">
      <div className="likes">
          {liked ? (
              <span className="material-symbols-outlined liked" onClick={toggleLikes}>thumb_up</span>
          ) : (
              <span className="material-symbols-outlined unliked" onClick={toggleLikes}>thumb_up</span>
          )}
          </div>
      <div className="likes-counter">0</div><div class="material-symbols-outlined uc flagged-icon" onClick={report}>flag</div>
    </div>
  </Card>

    {/* <div className="likes-container">
      <div className="likes">
          {liked ? (
              <span className="material-symbols-outlined liked" onClick={toggleLikes}>thumb_up</span>
          ) : (
              <span className="material-symbols-outlined unliked" onClick={toggleLikes}>thumb_up</span>
          )}
          </div>
      <div className="likes-counter">0</div><div class="material-symbols-outlined uc flagged-icon" onClick={report}>flag</div>
    </div> */}
      {visible &&
        (
          <div className="modal-popup">
            <ModalPopup
              source={toBase64(post?.photo?.data)}
              title={post.user_post_title}
              desc={post.user_post_desc}
              modalHandler={modalHandler}
              visible={visible}
              closeHandler={closeHandler}
              id={id}
            />
          </div>
        )}
    </div>
  );
}
