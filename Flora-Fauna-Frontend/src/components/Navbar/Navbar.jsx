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

export function NavLinks({ isLoading, user, logoutUser }) {
  console.log(user)
  return (
    <div className="nav-links">
                {!isLoading ? (
                  <>
                    <ul className="links">
                      <li><Link to='/'>about</Link></li>
                      <li><Link to='/'>search</Link></li>
                      <li><Link to='/'>resources</Link></li>
                      <li><Link to='/'>contact us</Link></li>
                      {/* <li><span>user's username or email</span></li> */}
                    </ul>
                    <div className="login-register">
                      <div className={user ? "hidden" : "login-btn"}><Link to='/login'>Login</Link></div>
                      <div className={user ? "hidden" : "btn"}><Link to='/register'>Sign Up</Link></div>
                      <Link to="/" onClick={logoutUser}><button className={user ? "logout-button btn" : "hidden"}>Log Out</button></Link>
                      <Link to="/admin"><button className={user?.is_admin ? "btn" : "hidden"}>Admin</button></Link>
                    </div>
                    </>
                ) : ( 
                  <ul className="links">
                      <li><Link to='/'>feed</Link></li>
                      <li><Link to='/'>contact us</Link></li>
                      <li><Link to='/'>resources</Link></li>
                      <li><Link to="/"><button className={user ? "logout-button btn" : "hidden"} onClick={logoutUser}>Log Out</button></Link></li>
                  </ul>
                )
                }
    </div>
  )
}
