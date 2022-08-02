import "./UserCards.css";
import { useEffect, useState } from "react";
import ModalPopup from "../ModalPopup/ModalPopup";
import { toBase64 } from "../UserFeed/UserFeed";
import { useAdminContext } from "../../contexts/admin.jsx";
import { usePostContext } from "../../contexts/posts";
import { Card, Col, Grid, Link, Text, Tooltip } from "@nextui-org/react";

export default function UserCards(props) {
  const { source, title, desc, post, id } = props;
  const { reportPost } = useAdminContext();
  const { updateLikes } = usePostContext();
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [postLikes, setPostLikes] = useState(0);
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
    await reportPost(id);
  };
  //Updates the likes for the post
  const handleUpdateLikes = async () => {
    const check = await updateLikes(id, post.likes);
    //To avoid users being able to like multiple times
    if (Object.keys(check.data.updatedLikes).length === 3) {
      if(postLikes != 1){
        setPostLikes(0);
      }
    } else {
      setPostLikes(1);
    }
  };
  return (
    <div className="user-card">
      {
        /* <img src={props.source} className="user-img" onClick={modalHandler}/>
    <h2 className="user-card-title">{props.title}</h2>
    <h4 className="user-card-desc">{props.desc}</h4> */
      }
      <Card className="single-post">
        <div className="overlay" onClick={modalHandler}></div>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
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

        {/* Likes */}
        <div className="likes-container">
          <div className="likes">
            {liked
              ? (
                <span
                  className="material-symbols-outlined liked"
                  onClick={handleUpdateLikes}
                >
                  thumb_up
                </span>
              )
              : (
                <span
                  className="material-symbols-outlined unliked"
                  onClick={handleUpdateLikes}
                >
                  thumb_up
                </span>
              )}
          </div>
          <div className="likes-counter">{post.likes + postLikes}</div>

          {/* Tooltip for when post is flagged */}
          <div className="flag-user">
            <Tooltip
              className="flagged-tooltip"
              content={"Post has been flagged"}
              trigger="click"
              color="error"
              placement="topEnd"
              leaveDelay={2000}
              hideArrow
            >
              <Link>
                <Text b color="primary">
                  <div
                    class="material-symbols-outlined uc flagged-icon"
                    onClick={report}
                  >
                    flag
                  </div>
                </Text>
              </Link>
            </Tooltip>
          </div>
        </div>
      </Card>
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
              post={post}
              postLikes={postLikes}
            />
          </div>
        )}
    </div>
  );
}
