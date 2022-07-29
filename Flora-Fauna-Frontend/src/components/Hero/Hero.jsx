import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchContext } from "../../contexts/search.jsx";
import "./Hero.css";

export default function Hero() {
  //Uses the current planimal set in the context to render in this info.
  const { currentPlanimal, searchPictures, getPictures, url, description } = useSearchContext();
  return (
    <div className="hero">
      <div className="bio-info">
        <h1 className="hero-title">{currentPlanimal.taxonomic_group}</h1>
        <h2 className="hero-title">{currentPlanimal.common_name}</h2>
        <h3 className="hero-title">{currentPlanimal.scientific_name}</h3>
        <p className="hero-desc">
        {description.extract}
        </p>
        {/* <a href={url[0]}> */}
        {/*   <h2 className="learn-more">Learn More</h2> */}
        {/* </a> */}
      </div>
      <div className="overlay"></div>
      <div className="hero-image">
        <img
          src={searchPictures}
          alt={currentPlanimal.common_name}
        />
      </div>
    </div>
  );
}
