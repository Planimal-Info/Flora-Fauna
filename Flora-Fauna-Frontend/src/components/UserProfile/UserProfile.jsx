import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import { useAuthContext } from "../../contexts/auth.jsx";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

export default function UserProfile() {

  // Toggle profile section view when settings links are clicked
  const [toggleProfile, setToggleProfile] = useState(true);
  const [toggleLikedPosts, setToggleLikedPosts] = useState(false);
  const [toggleAccount, setToggleAccount] = useState(false);

  const userProfileHandler = () => {
    setToggleProfile(true)
    setToggleLikedPosts(false)
    setToggleAccount(false)
  }

  const userLikedPostsHandler = () => {
    setToggleLikedPosts(true)
    setToggleProfile(false)
    setToggleAccount(false)
  }

  const userAccountHandler = () => {
    setToggleAccount(true)
    setToggleProfile(false)
    setToggleLikedPosts(false)
  }

  //Extract user from context and used to populate data.
  const { user, initialized } = useAuthContext();
  //added conditional to combat null errors when rendering in this component
  //All conditionals in the html are to combat null errors
  if (initialized && user != null) {
    return (
      <div className="user-profile">
        <div className="content">
          <div className="column left">
            <div className="settings">
              <h2>Settings</h2>
              <UserSettings 
                userProfileHandler={userProfileHandler}
                userLikedPostsHandler={userLikedPostsHandler}
                userAccountHandler={userAccountHandler} 
              />
            </div>
          </div>

          <div className="column right">
            <div className="profile">
              <div className="profile-header"></div>
              <div className="profile-details">
                <div className="profile-image">{/* PROFILE IMAGE URL */}</div>
                <div className="profile-info">
                  {user.user
                    ? <h2>{user.user.username} / {user.user.email}</h2>
                    : <h2></h2>}
                  <p className="biography">Insert biography blurb</p>
                </div>
                <div className="profile-upload">
                  <button className="btn">Upload</button>
                </div>
              </div>
            </div>
            {/* Profile Posts Toggle */}
            <div className={toggleProfile ? "profile-content" : "hidden"}>
              <h2>Uploaded Content</h2>
              <div className="uploaded-content">
                <p className="black">Map/List user posts</p>
                {/* LIST USERS UPLOADED POSTS HERE */}
              </div>
            </div>

            {/* Liked Posts Toggle */}
            <div className={toggleLikedPosts ? "profile-content" : "hidden"}>
              <LikedPosts />
            </div>

            {/* Account Settings Toggle */}
            <div className={toggleAccount ? "profile-content" : "hidden"}>
              <Account />
            </div>
            
          </div>
        </div>
      </div>
    );
  } else {
    return(
      <div>
      <AccessForbidden />
      </div>
    )
  }
}

export function UserSettings({ userProfileHandler, userLikedPostsHandler, userAccountHandler }) {
  return (
    <div className="user-settings">
      <ul>
        <li>
          <p onClick={userProfileHandler}>Profile</p>
        </li>
        <li>
          <p onClick={userLikedPostsHandler}>Liked Posts</p>
        </li>
        <li>
          <p onClick={userAccountHandler}>Account</p>
        </li>
      </ul>
    </div>
  );
}

export function LikedPosts() {
  return (
    <div className="liked-posts">
      <h2>Liked Posts</h2>
    </div>
  );
}

export function Account() {

  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confPassword: "",
    showPassword: false,
  });

  // Handle input value changes
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle Show Password (future)
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <div className="account">
      <h2>Account Settings</h2>
      <div className="user-changes">
        <div className="form">

          {/* Old Password Field */}
          <div className="input-field">
            <label htmlFor="old-password">Old Password</label>
            <input 
              className="form-input"
              type="password"
              name="oldPassword"
              placeholder="Enter current password"
              value={values.oldPassword}
              onChange={handleChange}
              />
          </div>

          {/* New Password Field */}
          <div className="input-field">
            <label htmlFor="new-password">New Password</label>
            <input 
              className="form-input"
              type="password"
              name="newPassword"
              placeholder="Enter new password" 
              value={values.newPassword}
              onChange={handleChange}
              />
          </div>

          {/* Confirm New Password Field */}
          <div className="input-field">
            <label htmlFor="conf-password">Confirm New Password</label>
            <input 
              className="form-input"
              type="password"
              name="confPassword"
              placeholder="Confirm new password"
              value={values.confPassword}
              onChange={handleChange}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
