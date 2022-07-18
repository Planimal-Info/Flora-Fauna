import * as React from "react"
import { Link } from "react-router-dom"
import "./Hero.css"

export default function Hero() {
  return (
    <div className="hero">
        <div className="bio-info">
          <h1 className="hero-title">Plant/Animal</h1>
          <p className="hero-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor hendrerit mauris, nec sollicitudin ligula. Nullam porta leo in ante egestas cursus. 
            Integer urna orci, rhoncus vitae fringilla cursus, egestas vel nunc. Vivamus mauris nunc, suscipit et imperdiet sit amet, molestie id dui. Quisque suscipit arcu et justo ullamcorper, eget posuere nibh fringilla.
          </p>
          <a href="https://en.wikipedia.org/wiki/Cat">
          <h2 className="learn-more">Learn More</h2>
          </a>
        </div>
        <div className="overlay"></div>
        <div className="hero-image">
           <img src="https://images.unsplash.com/photo-1489543584529-7c50791855c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80" alt="bird" />
        </div>
    </div>
  )
}