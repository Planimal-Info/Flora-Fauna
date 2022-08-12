import * as React from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import { useAuthContext } from "../../contexts/auth.jsx";
import { usePostContext } from "../../contexts/posts.jsx";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import UserCards from "../UserCards/UserCards.jsx";

export const toBase64 = function (arr) {
  //Changes ArrayBuffer to base 64
  const baseSource = btoa(
    arr?.reduce((data, byte) => data + String.fromCharCode(byte), ""),
  );
  //Takes base64 string and concats to get right source for image
  const source = `data:image/jpeg;base64,${baseSource}`;
  return source;
};

export default function UserProfile() {

  const {
    getUserPosts,
    userPosts,
    setUserPosts
  } = usePostContext();

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

  useEffect(() => {
    getUserPosts();
  }, []);

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
                {userPosts?.map((e, idx) => (
              <UserCards
                key={idx}
                source={toBase64(e?.photo?.data)}
                title={e.user_post_title}
                desc={e.user_post_desc}
                post={e}
                id={e.id}
                category={e.category}
              />
            ))}
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
      <div className="liked-posts-container">
        {/* INSERT LIKED POSTS HERE */}
      </div>
    </div>
  );
}

export function Account() {

  const { user,updateUserEmail,updateUserPassword } = useAuthContext()

  const [values, setValues] = useState({
    newEmail: "",
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

  const handleEmailOnSubmit = () => {
    updateUserEmail(values);
  };
  //Commented out validation because it causes errors with the auth/me route,
  //Needs to be fixed.
  const changeEmailOnSubmit = () => {
    handleEmailOnSubmit();
  };

  const handlePasswordOnSubmit = () => {
    updateUserPassword(values);
  };
  //Commented out validation because it causes errors with the auth/me route,
  //Needs to be fixed.
  const changePasswordOnSubmit = () => {
    if(values.newPassword == values.confPassword)
    {
      handlePasswordOnSubmit();
    } else {
      console.error("New passwords must match");
    }
  };

  return (
    <div className="account">
      <h2>Account Settings</h2>
      <div className="user-changes">
        <div className="form">
          <h2>Change Email</h2>
          <div className="current-email"><h4>Current email:</h4><span>{user.user.email}</span></div>
          <div className="input-field input-email">
            <label htmlFor="new-email">New Email</label>
            <input 
              className="form-input"
              type="email"
              name="newEmail"
              placeholder="Enter new email"
              value={values.newEmail}
              onChange={handleChange}
              />
              <ibutton onClick={changeEmailOnSubmit} className="submit-new-email btn">
            Change Email
          </ibutton>
          </div>

          <h2 className="change-password">Change Password</h2>
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
              {values.newPassword != values.confPassword? <p>Passwords do not match</p> : ""}
              <ibutton onClick={changePasswordOnSubmit} className="submit-new-email btn">
              Change Password
          </ibutton>
          </div>
        </div>
      </div>
    </div>
  );
}
