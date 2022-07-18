import * as React from "react"
import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"
import "./Navbar.css"

export default function Navbar({isLoading}) {
  return (
    <div className="navbar">
        <div className="content">
           <Logo />
           <NavLinks isLoading={isLoading} />
        </div>
    </div>
  )
}

export function NavLinks({isLoading}) {

  return (
    <div className="nav-links">
                {!isLoading ? (
                  <>
                    <ul className="links">
                      <li><Link to='/'>about</Link></li>
                      <li><Link to='/'>search</Link></li>
                      <li><Link to='/'>resources</Link></li>
                      <li><Link to='/'>contact us</Link></li>
                      {/* <li><span>Text</span></li> */}
                    </ul>
                    <div className="login-register">
                      <div className="login-btn"><Link to='/login'>Login</Link></div>
                      <div className="btn"><Link to='/register'>Sign Up</Link></div>
                    </div>
                    </>
                ) : ( 
                  <ul className="links">
                      <li><Link to='/'>feed</Link></li>
                      <li><Link to='/'>contact us</Link></li>
                      <li><Link to='/'>resources</Link></li>
                      <li><Link to="/"><button className="logout-button btn">Log Out</button></Link></li>
                  </ul>
                )
                }
    </div>
  )
}