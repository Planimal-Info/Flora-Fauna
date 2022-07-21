import * as React from "react"
import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"
import { useAuthContext } from "../../contexts/auth.jsx"
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
  return (
    <div className="nav-links">
                {!user ? (
                  <>
                    <ul className="links">
                      <li><Link to='/'>about</Link></li>
                      <li><Link to='/'>search</Link></li>
                      <li><Link to='/'>resources</Link></li>
                      <li><Link to='/'>contact us</Link></li>
                      {/* <li><span>Text</span></li> */}
                    </ul>
                    <div className="login-register">
                      <div className={user ? "hidden" : "login-btn"}><Link to='/login'>Login</Link></div>
                      <div className={user ? "hidden" : "btn"}><Link to='/register'>Sign Up</Link></div>
                      <Link to="/admin"><button className={user?.is_admin ? "btn" : "hidden"}>Admin</button></Link>
                      <a href="/" onClick={logoutUser}><button className={user ? "logout-button btn" : "hidden"}>Log Out</button></a>
                    </div>
                    </>
                ) : ( 
                  <ul className="links">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/">Planimals</Link></li>
                      <li><Link to='/userfeed'>Your Feed</Link></li>
                      <li><a href='/userprofile'>Profile</a></li>
                      <li><Link to="/admin" className={user?.is_admin ? "" : "hidden"}>Admin</Link></li>
                      <li><a href="/"><button className={user ? "logout-button btn" : "hidden"} onClick={logoutUser}>Log Out</button></a></li>
                  </ul>
                )
                }
    </div>
  )
}
