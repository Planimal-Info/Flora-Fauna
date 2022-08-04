import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/admin.jsx";
import "./AdminDetails.css";
import UserCards from "../UserCards/UserCards.jsx";
import ApiClient from "../../services/ApiClient.js";
import { toBase64 } from "../UserFeed/UserFeed.jsx";

export default function AdminDetails(props) {
  const { selectedPost, focusedPost, deletePost, setFocusedPost, unFlagPost  } = useAdminContext();
  const navigate = useNavigate();

  //Gets the url and grabs post id from it
  const url = window.location.href;
  const post_id = url.substring(url.lastIndexOf("/") + 1);

  //Gets the post for an admin when they want to know more
  useEffect(async () => {
    try {
      const data = await ApiClient.getSelectedPost(post_id);
      setFocusedPost(data.data.post);
    } catch (err) {
      console.error(err);
    }
  }, [selectedPost]);

  //wrapper function to unflag post and navigate to admin panel
  const unflag = async (post_id, user_id) => {
    await unFlagPost(post_id, user_id);
    navigate("/admin");
  }

  //Deletes the post and also navigates to admin panel again
  const wrapperDelete = async () => {
    const check = await deletePost(focusedPost?.id, focusedPost?.user_id);
    navigate("/admin");
  };

  if (focusedPost != undefined) {
    return (
      <div className="admin-details">
        <div className="admin-content">
          <UserCards
            source={toBase64(focusedPost?.photo?.data)}
            title={focusedPost?.user_post_title}
            desc={focusedPost?.user_post_desc}
            post={focusedPost}
            id={focusedPost?.id}
            category={focusedPost?.category}
          />
        </div>
      <div>
        <button className="admin-delete" onClick={wrapperDelete}>Delete Post</button>
        <button className="admin-delete" onClick={() => unflag(focusedPost.id, focusedPost.user_id)}>Unflag Post</button>
      </div>
      </div>
    );
  } else {
    return <div className="loading-admin">Loading</div>;
  }
}
