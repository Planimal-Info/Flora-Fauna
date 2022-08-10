import "./AnimalCards.css"
import { useState } from "react";
import { useSearchContext } from "../../contexts/search.jsx";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";


export default function AnimalCards(props){
  const navigate = useNavigate(); 
  const { currentPlanimal, setCurrentPlanimal, getPictures, searchPictures, searchPictureResults } = useSearchContext(); 
  const [background, setBackground] = useState("");
  const [imageExist, setImageExist] = useState(false)
  //Sets current selected Planimal and gets pictures for that animal
  const handleOnSubmit = async () => {
    setCurrentPlanimal(props.currentPlanimal)
    await getPictures(props.common_name)

    navigate("/animaldetails")
  }
  let picture = "";
  if(props.picture?.length > 0){
    picture = props.picture
  }
  else{
    picture = props.picture?.source
  }
  //Displays information about the animal on a card.
  return(
    <div className="animal-card">
      {/* <h2 className="card-common-name">{props.common_name}</h2>
      <h2 classname="card-scientific-name">{props.scientific_name}</h2>
      <button className="animal-moreInfo" onClick={handleOnSubmit}>More Info</button> */}
  <Card>
      <div className="overlay" onClick={handleOnSubmit}></div>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          {props.scientific_name}
        </Text>
        <Text h4 color="white">
          {props.common_name}
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src={picture}
      objectFit="cover"
      width="100%"
      height={340}
      alt={props.currentPlanimal.common_name}
    />
  </Card>
    </div>
  )
}
