import * as React from "react"
import { Link } from "react-router-dom"
import "./AboutPage.css"

export default function AboutPage() {
  return (
    <div className="about-page">
          <div className="about-info">
              <h1 className="about-title">About Flora&Fauna</h1>
              <p className="about-desc">
                  Flora&Fauna's database is a search engine derived from the New York state database that enables users to easily find information on local plants and animals. Search results are presented in an image-focused list of cards that provide
                  a broad set of animal and plant entries, with scientific and common names, as well as a collection of images.<br></br><br></br>
                  Explore, share and learn about New York's local flora and fauna with our comprehensive catalog. Whether you're a K-12 or college student, an educator or simply a plant/animal enthusiast, you can get the most out of Flora&Fauna's search index and image sharing features.<br></br><br></br>
                  Have you come across beautiful flowering bushes in Central Park that you'd like to share? Have you gone whale watching at the Long Island Sound and snapped a nice pic?<br></br>
                  Make an account <Link className="about-register" to="/register">here</Link> and upload it for everyone to see!</p>
          </div>
    </div>
  )
}

{/* 

Explore and learn about New York's local animals and plants with our comprehensive database of images, and texts.
Plant and animal website. Enter the name, genus and species of a plant or animal to get a list of names for it.
New York City's public database of plant and animal species, including the insects, amphibians, fish and birds.

The best place to look for information about plants and animals. A searchable database of all the species and varieties of plants, animals and more.

A comprehensive set of animal and plant entries, with scientific and common names, as well as a collection of images.

Plant and animal database is a search engine that enables users to find information on plants and animals. Search results are presented in a pagerank-style list of websites that provide the information.

*/}