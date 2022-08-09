import * as React from "react"
import Footer from "../Footer/Footer"
import "./ResourcesPage.css"


export default function ResourcesPage() {
    return (
        <div className="resources-page">
            <h1>Resources Used</h1>
            <br></br>
            <p>If you like all text and no pictures, check out the <a href="https://data.ny.gov/Energy-Environment/Biodiversity-by-County-Distribution-of-Animals-Pla/tk82-7km5">New York State Data website</a> which is what <br></br>we at Flora and Fauna use to populate our search results.</p>
            <Footer />
        </div>
    )
}