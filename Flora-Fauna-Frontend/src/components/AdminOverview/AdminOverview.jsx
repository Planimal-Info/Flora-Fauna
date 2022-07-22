import "./AdminOverview.css";
import { useAuthContext } from "../../contexts/auth";
import { useState } from "react";

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
              
            </div>
            <div className="flagged-posts">
              {togglePosts && <AdminFlaggedPosts />}
            </div>
            <div className="flagged-users">
              {toggleUsers && <AdminFlaggedUsers />}
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
    <div>Flagged Posts</div>
  )
}

//use this to return all flagged users
export function AdminFlaggedUsers() {


  return (
    <div>Flagged Users</div>
  )
}
