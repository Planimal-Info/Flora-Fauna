import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/admin.jsx";
import "./AdminDetails.css";
import UserCards from "../UserCards/UserCards.jsx";
import { toBase64 } from "../UserFeed/UserFeed.jsx";

export default function AdminDetails(props) {
  const { selectedPost, focusedPost, deletePost } = useAdminContext();
  const navigate = useNavigate();
  const post = focusedPost?.data?.post;
 
  //Deletes the post and also navigates to admin panel again
  const wrapperDelete = async () => {
    await deletePost(post.id, post.user_id);
    navigate("/admin") 
  }

  return (
    <div className="admin-details">
    <div className="admin-content">
      <UserCards
        source={toBase64(post?.photo?.data)}
        title={post.user_post_title}
        desc={post.user_post_desc}
        post={post}
        id={post.id}
        category={post.category}
      />
    </div>
    <button className="admin-delete" onClick={wrapperDelete}>Delete</button>
    </div>
  );
}
