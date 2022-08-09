import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchContext } from "../../contexts/search.jsx";
import "./Hero.css";

export default function Hero() {
  //Uses the current planimal set in the context to render in this info.
  const { currentPlanimal, searchPictures, getPictures, url, description } =
    useSearchContext();
  //Displays the current selected animals information on the Animal Details page.
  return (
    <div className="hero">
      <div className="bio-info">
        <h1 className="hero-title">{currentPlanimal?.data?.common_name}</h1>
        <h2 className="hero-title">{currentPlanimal?.data?.scientific_name}</h2>
        <h3 className="hero-title">{currentPlanimal?.data?.taxonomic_group}</h3>
        <p className="hero-desc">
          {description.extract}
        </p>
        {/* <a href={url[0]}> */}
        {/*   <h2 className="learn-more">Learn More</h2> */}
        {/* </a> */}
      </div>
      <div className="hero-image">
        <div className="overlay"></div>
        <img
          src={currentPlanimal?.picture?.photo?.source}
          alt={currentPlanimal?.common_name}
        />
      </div>
    </div>
  );
}
