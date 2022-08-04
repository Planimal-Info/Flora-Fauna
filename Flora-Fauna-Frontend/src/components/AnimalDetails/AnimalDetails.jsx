import "./AnimalDetails.css"
import { useNavigate } from "react-router-dom"
import Hero from "../Hero/Hero.jsx"

export default function AnimalDetails(){
  //function to navigate to search page.
  const navigate = useNavigate(); 
  const returnBtn = () => {
    navigate("/search")
  }


  //Returns the animal details page, renders in information set by the current selected planimal in search context
  return(
    <div className="animal-details">
      <h1 className="details-title">Animal Details</h1> 
      <Hero /> 
    <div className="return-wrapper">
      <button className="details-return btn" onClick={returnBtn}><span class="material-symbols-outlined prev-page">undo</span></button>
    </div>
    </div>
  )
}
