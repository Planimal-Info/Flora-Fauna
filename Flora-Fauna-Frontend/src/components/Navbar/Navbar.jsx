import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"
import { useAuthContext } from "../../contexts/auth.jsx"
import { usePostContext } from "../../contexts/posts.jsx";
import "./Navbar.css"

export default function Navbar({isLoading}) {
  const { user, logoutUser } = useAuthContext();
  return (
    <div className="navbar">
        <div className="content">
           <Logo />
           <NavLinks isLoading={isLoading} user={user} logoutUser={logoutUser} />
        </div>
    </div>
  )
}
//used a html tags to be able to go back to home and refresh the page after logout
//also used one to refresh page before navigating to user profile
export function NavLinks({ isLoading, user, logoutUser }) {
  const { setRefresh, refresh } = usePostContext();
  const [endpoint, setEndpoint] = useState("");

  //Fixes not being able to use about and contact us links on resources page
  useEffect(() => {
    const url = window.location.href;
    if(url.substring(url.length - 9, url.length) === "resources"){
      setEndpoint("/#about")
    }
    else{
      setEndpoint("#about")
    }
  },[endpoint])

  return (
    <div className="nav-links">
                {/*Will display Non User NavLinks if user is logged in*/}
                {/*Else it'll display user NavLinks*/}
                {!user ? (
                  <>
                    <ul className="links">
                      <li><a href={endpoint}>about</a></li>
                      <li><Link to='/resources' onClick={() => checkEndpoint()}>resources</Link></li>
                      <li><a href={endpoint}>contact us</a></li>
                    </ul>
                    <div className="login-register">
                      <div className={user ? "hidden" : "login-btn"}><Link to='/login'>login</Link></div>
                      <div className={user ? "hidden" : "btn"}><Link to='/register'>sign Up</Link></div>
                      <a href="/" onClick={logoutUser}><button className={user ? "logout-button btn" : "hidden"}>log Out</button></a>
                    </div>
                    </>
                ) : (
                  <ul className="links">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/search">Search</Link></li>
                      <li><Link to='/userfeed' onClick={() => setRefresh(!refresh)}>Your Feed</Link></li>
                      <li><Link to="/admin" className={user?.user?.is_admin ? "" : "hidden"}>Admin</Link></li>
                      <li className="user-options">
                        <Link to="/upload"><span className="material-symbols-outlined upload-button">add_circle</span></Link>
                        <Link to="/userprofile">
                        <div className="profile-img">
                          {/* USER PROFILE IMAGE */}
                          <img src="/" alt="" />
                        </div></Link>
                      </li>
                      <li><a href="/"><button className={user ? "logout-button btn" : "hidden"} onClick={logoutUser}>Log Out</button></a></li>
                  </ul>
                )
                }
    </div>
  )
}
