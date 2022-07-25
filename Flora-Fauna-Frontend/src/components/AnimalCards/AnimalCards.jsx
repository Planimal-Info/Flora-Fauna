import "./AnimalCards.css"
import { useSearchContext } from "../../contexts/search.jsx";
import { useNavigate } from "react-router-dom"


export default function AnimalCards(props){
  const navigate = useNavigate(); 
  const { currentPlanimal, setCurrentPlanimal, getPictures } = useSearchContext(); 

  //Sets current selected Planimal and gets pictures for that animal
  const handleOnSubmit = async () => {
    setCurrentPlanimal(props.currentPlanimal)
    await getPictures(props.currentPlanimal.common_name)

    navigate("/animaldetails")
  }
  //Displays information about the animal on a card.
  return(
    <div className="animal-card">
      <h2 className="card-common-name">{props.common_name}</h2>
      <h2 classname="card-scientific-name">{props.scientific_name}</h2>
      <button className="animal-moreInfo" onClick={handleOnSubmit}>More Info</button>
    </div>
  )
}
