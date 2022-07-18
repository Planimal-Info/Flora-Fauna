import * as React from "react"
import { Link } from "react-router-dom"
import reactLogo from '../../assets/react.svg'
import "./Logo.css"

export default function Logo() {
  return (
    <div className="logo">
        <div className="content">
          <Link to="/">
            <img src={reactLogo} alt="logo" />
          </Link>
        </div>
    </div>
  )
}