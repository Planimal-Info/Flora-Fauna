import "./AdminOverview.css";
import { useAuthContext } from "../../contexts/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminOverview(props) {
  // const { user } = useAuthContext();
  const [togglePosts, setTogglePosts] = useState(true)
  const [toggleUsers, setToggleUsers] = useState(false)
  

  const adminPostsHandler = () => {
    setTogglePosts(true)
    setToggleUsers(false)
  }

  const adminUsersHandler = () => {
    setTogglePosts(false)
    setToggleUsers(true)
  }


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
                {togglePosts && <AdminFlaggedPosts />}
              </div>
              <div className="flagged-users">
                {toggleUsers && <AdminFlaggedUsers />}
              </div>
            </div>
          </div>
        </div>
        {/* <h4 className="admin-navbar-link">Flagged Posts</h4>
        <h4 className="admin-navbar-link">Flagged Users</h4> */}
    </div>
  )
}

//Implement when backend authentication is connected to frontend.

//use this to return all the flagged posts.
export function AdminFlaggedPosts() {


  return (
    <div className="flagged-posts">
      <h2 className="flagged-title">Flagged Posts</h2>

      {/* FLAGGED ITEM | POSTS */}
      <div className="flagged-item">
        <span class="material-symbols-outlined flagged-post-icon">error</span>
        <div className="post-content">
          <h3>Post_Title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum bibendum dictum. 
            Nullam dolor sapien, maximus in euismod eu, tempor sagittis nisl. 
            Aenean vitae nisi id nisl ultricies viverra.
          </p>
          <Link to="/">Go to Post</Link>
        </div>
      </div>
    
    </div>
  )
}

//use this to return all flagged users
export function AdminFlaggedUsers() {


  return (
    <div className="flagged-users">
      <h2 className="flagged-title">Flagged Users</h2>

      {/* FLAGGED ITEM | USERS */}
      <div className="flagged-item">
        <span class="material-symbols-outlined flagged-user-icon">gpp_maybe</span>
        <div className="user-content"></div>
      </div>
    </div>
  )
}
