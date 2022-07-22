import * as React from "react"
import { Link } from "react-router-dom"
import "./AboutPage.css"

export default function AboutPage() {
  return (
    <div className="about-page">
        <div className="about-info">
            <h1 className="about-title">About Flora&Fauna</h1>
            <p className="about-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nunc magna, condimentum ut metus ut, tincidunt feugiat lectus.
                Nam et ligula vel velit porta vulputate non eu nisi. Fusce eget urna ac enim dapibus vehicula. Maecenas augue lectus, vehicula sit amet ante sit amet, maximus tristique felis. Morbi ac condimentum orci.<br></br><br></br>
                In tincidunt porta egestas. Nullam condimentum, libero quis hendrerit tristique, libero est condimentum lorem, id mattis diam enim sit amet leo.
                Nulla bibendum, ante a ultrices commodo, sapien urna laoreet nunc, ut accumsan leo purus quis tellus. Morbi sollicitudin vulputate diam vulputate ultrices.
                Sed convallis tortor eu libero efficitur dapibus.Sed dictum dui at mauris interdum, sit amet sollicitudin neque feugiat.<br></br><br></br>
                Donec elementum, massa quis sagittis pharetra, ipsum eros iaculis lorem, eget interdum sapien erat ac mauris. Sed sem leo, fringilla id pharetra vel, ultricies id ex.
                Sed pulvinar mi lacus, sit amet pharetra urna consequat nec.</p>
        </div>
    </div>
  )
}