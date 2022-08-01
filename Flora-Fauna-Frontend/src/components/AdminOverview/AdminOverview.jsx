import "./AdminOverview.css";
import { useAuthContext } from "../../contexts/auth";
import { useAdminContext } from "../../contexts/admin.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminOverview(props) {
  const [togglePosts, setTogglePosts] = useState(true);
  const [toggleUsers, setToggleUsers] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const { flaggedPosts, flaggedUsers, deletePost } = useAdminContext();

  const adminPostsHandler = () => {
    setTogglePosts(true);
    setToggleUsers(false);
  };

  const adminUsersHandler = () => {
    setTogglePosts(false);
    setToggleUsers(true);
  };

  const handleDeleteToggle = () => {
    setDeleteItem(!deleteItem);
  };

  //Makes the call to delete the post
  const handleDeletePost = async (post_id, user_id) => {
    await deletePost(post_id, user_id);
  };
  const handleDeleteUser = () => {
  };
  return (
    <div className="admin-overview">
      <div className="content">
        <div className="column left">
          <div className="admin-panel">
            <h2>Admin Panel</h2>
            <ul>
              <li>
                <p onClick={adminPostsHandler}>Flagged Posts</p>
                <p onClick={adminUsersHandler}>Flagged Users</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="column right">
          <div className="admin-header">
            <div className="admin-profile-image">{/* PROFILE IMAGE URL */}</div>
            <div className="admin-title">
              <h2>Admin Username</h2>
              <p>Admin</p>
            </div>
          </div>
          <div className="admin-body">
            <div className="flagged-posts">
              <h2 className={togglePosts ? "flagged-title" : "hidden"}>
                Flagged Posts
              </h2>
              {togglePosts && (
                Object.keys(flaggedPosts).length > 0
                  ? flaggedPosts?.map((e, idx) => (
                    <AdminFlaggedPosts
                      deleteItem={deleteItem}
                      setDeleteItem={setDeleteItem}
                      handleDeleteToggle={handleDeleteToggle}
                      post={e}
                      deletePost={handleDeletePost}
                    />
                  ))
                  : <h4>No Posts Reported</h4>
              )}
            </div>
            <div className="flagged-users">
              <h2 className={toggleUsers ? "flagged-title" : "hidden"}>
                Flagged Users
              </h2>
              {toggleUsers && (
               Object.keys(flaggedUsers).length > 0 ? flaggedUsers?.map((e, idx) => {
                  <AdminFlaggedUsers
                    deleteItem={deleteItem}
                    setDeleteItem={setDeleteItem}
                    handleDeleteToggle={handleDeleteToggle}
                    user={e}
                  />;
                }) : <h4>No Users Reported</h4>
              )}
            </div>
          </div>
        </div>
      </div>
      {
        /* <h4 className="admin-navbar-link">Flagged Posts</h4>
        <h4 className="admin-navbar-link">Flagged Users</h4> */
      }
    </div>
  );
}

//Implement when backend authentication is connected to frontend.
//use this to return all the flagged posts.
export function AdminFlaggedPosts(props) {
  const { deleteItem, setDeleteItem, handleDeleteToggle, post } = props;
  return (
    <div className="flagged-posts">
      {/* FLAGGED ITEM | POSTS */}
      <div className="flagged-item">
        <span className="material-symbols-outlined flagged-post-icon">
          error
        </span>
        <span className="material-symbols-outlined flagged-item-close">
          close
        </span>
        <div className="post-content">
          <h3>{post.user_post_title}</h3>
          <p>
            {post.user_post_desc}
          </p>
          <div className="number-flags">Flag marks: 0</div>
          <Link to="/">Go to Post</Link>
          <button
            className="btn delete-btn"
            onClick={() => props.deletePost(post.id, post.user_id)}
          >
            Delete Post &nbsp;{" "}
            <span className="material-symbols-outlined delete-close">
              close
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

//use this to return all flagged users
export function AdminFlaggedUsers(props) {
  const { deleteItem, setDeleteItem, handleDeleteToggle } = props;

  return (
    <div className="flagged-users">
      <h2 className="flagged-title">Flagged Users</h2>

      {/* FLAGGED ITEM | USERS */}
      <div className="flagged-item">
        <span className="material-symbols-outlined flagged-user-icon">
          gpp_maybe
        </span>
        <span className="material-symbols-outlined flagged-item-close">
          close
        </span>
        <div className="user-content">
          <div className="flagged-user-profile">
            {/* Flagged user's profile image */}
          </div>
          <div className="flagged-user-info">
            <h3>User_name</h3>
            <div className="number-flags">Flag marks: 0</div>
          </div>
          <button className="btn delete-btn" onClick={handleDeleteToggle}>
            Delete User &nbsp;{" "}
            <span className="material-symbols-outlined delete-close">
              close
            </span>
          </button>
          {/* Toggle active user status */}
          {
            /* <button className="btn delete-btn" onClick={handleDeleteToggle}>
            {!deleteItem ?
            <>Delete User &nbsp; <span className="material-symbols-outlined delete-close">close</span></>
          : <>Deleted User</>}
          </button> */
          }
        </div>
      </div>
    </div>
  );
}
