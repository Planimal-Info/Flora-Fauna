import "./AnimalCards.css"
import { useState } from "react";
import { useSearchContext } from "../../contexts/search.jsx";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";


export default function AnimalCards(props){
  const navigate = useNavigate(); 
  const { currentPlanimal, setCurrentPlanimal, getPictures, searchPictures, searchPictureResults } = useSearchContext(); 
  const [background, setBackground] = useState("");
  //Sets current selected Planimal and gets pictures for that animal
  const handleOnSubmit = async () => {
    setCurrentPlanimal(props.currentPlanimal)
    await getPictures(props.common_name)

    navigate("/animaldetails")
  }
  //Displays information about the animal on a card.
  return(
    <div className="animal-card">
      {/* <h2 className="card-common-name">{props.common_name}</h2>
      <h2 classname="card-scientific-name">{props.scientific_name}</h2>
      <button className="animal-moreInfo" onClick={handleOnSubmit}>More Info</button> */}
      <Card css={{ w: "100%", h: "400px" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#000000AA">
          {props.scientific_name}
        </Text>
        <Text h3 color="black">
          {props.common_name}
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={props.picture?.source}
        width="100%"
        height="100%"
        objectFit="cover"
        alt=""
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#ffffff66",
        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Text color="#000" size={12}>
            Click button
          </Text>
          <Text color="#000" size={12}>
            to learn more.
          </Text>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button flat auto rounded color="secondary" onClick={handleOnSubmit}>
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                Learn More
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
    </div>
  )
}
