import "./AnimalCards.css"

export default function AnimalCards(props){
  //Displays information about the animal on a card.
  return(
    <div className="animal-card">
      <h2 className="card-common-name">{props.common_name}</h2>
      <h2 classname="card-scientific-name">{props.scientific_name}</h2>
      <button className="animal-moreInfo">More Info</button>
    </div>
  )
}
