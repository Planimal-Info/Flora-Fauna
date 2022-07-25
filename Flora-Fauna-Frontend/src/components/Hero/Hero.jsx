import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchContext } from "../../contexts/search.jsx";
import "./Hero.css";

export default function Hero() {
  //Uses the current planimal set in the context to render in this info.
  const { currentPlanimal, searchPictures, getPictures } = useSearchContext();

  return (
    <div className="hero">
      <div className="bio-info">
        <h1 className="hero-title">{currentPlanimal.taxonomic_group}</h1>
        <h2 className="hero-title">{currentPlanimal.common_name}</h2>
        <h3 className="hero-title">{currentPlanimal.scientific_name}</h3>
        <p className="hero-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          auctor hendrerit mauris, nec sollicitudin ligula. Nullam porta leo in
          ante egestas cursus. Integer urna orci, rhoncus vitae fringilla
          cursus, egestas vel nunc. Vivamus mauris nunc, suscipit et imperdiet
          sit amet, molestie id dui. Quisque suscipit arcu et justo ullamcorper,
          eget posuere nibh fringilla.
        </p>
        <a href="https://en.wikipedia.org/wiki/Cat">
          <h2 className="learn-more">Learn More</h2>
        </a>
      </div>
      <div className="overlay"></div>
      <div className="hero-image">
        <img
          src={searchPictures[0]?.src?.original}
          alt={currentPlanimal.common_name}
        />
        <h6 className="credits">Taken By: {searchPictures[0]?.photographer}</h6>
      </div>
    </div>
  );
}
