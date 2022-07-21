import * as React from "react"
import { Link } from "react-router-dom"
import "./UserProfile.css"
import { useAuthContext } from "../../contexts/auth.jsx";

export default function UserProfile() {
  //Extract user from context and used to populate data.
  const { user } = useAuthContext();
  
  return (
    <div className="user-profile">
        <div className="content">
            <div className="column left">
                <div className="settings">
                    <h2>Settings</h2>
                    <UserSettings />
                </div>
            </div>

            <div className="column right">
                <div className="profile">
                    <div className="profile-header"></div>
                    <div className="profile-details">
                        <div className="profile-image">{/* PROFILE IMAGE URL */}</div>
                        <div className="profile-info">
                            <h2>{user?.username} / {user?.email}</h2>
                            <p className="biography">Insert biography blurb</p>
                        </div>
                        <div className="profile-upload">
                            <button className="btn">Upload</button>
                        </div>
                    </div>
                </div>
                <div className="profile-posts">
                    <h2>Uploaded Content</h2>
                    <div className="uploaded-content">
                        <p className="black">Map/List user posts</p>
                        {/* LIST USERS UPLOADED POSTS HERE */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export function UserSettings() {
    return(
        <div className="user-settings">
            <ul>
                <li><p>Profile</p></li>
                <li><p>Liked Posts</p></li>
                <li><p>Notifications</p></li>
                <li><p>Password</p></li>
            </ul>
        </div>
    )
}
