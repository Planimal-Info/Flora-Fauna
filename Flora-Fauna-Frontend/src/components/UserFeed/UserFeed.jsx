import "./UserFeed.css";
import { useAuthContext } from "../../contexts/auth.jsx";
import { useState } from "react";
import Hero from "../Hero/Hero.jsx";

export default function UserFeed(props) {
  const { user } = useAuthContext();
  const [showCategories, setShowCategories] = useState(false);
  const [showTimeFrames, setShowTimeFrames] = useState(false);


  function handleTime() {
    if(showCategories === true){
      setShowCategories(false);
    }
    let time = showTimeFrames;
    setShowTimeFrames(!time);
  }

  function handleCategories() {
    if(showTimeFrames === true){
      setShowTimeFrames(false);
    }
    let categories = showCategories;
    setShowCategories(!categories);
  }



  if (user) {
    return (
      <div className="user-feed-overview">
        <h2>UserFeed</h2>
        <div className="user-feed-wrapper">
          <Hero />
        </div>
      </div>
    )
  }

  return (
    <div className="user-feed-overview">
      <h2>User Feed</h2>
      <div className="user-feed-wrapper">
        <div className="user-feed-navbar">
          <div className="user-feed-filter">
            <h2 onClick={handleTime}>Time</h2>
            <h2 onClick={handleCategories}>Categories</h2>
          </div>
        <div className="timeframe-wrapper">
          <div className={showTimeFrames ? "user-feed-timeframe" : "hidden"}>
            <h3>Day</h3>
            <h3>Week</h3>
            <h3>Month</h3>
          </div>
        </div>
      <div className="categories-wrapper">
          <div className={showCategories ? "user-feed-categories" : "hidden"}>
            <h3>Plants</h3>
            <h3>Mammals</h3>
            <h3>Insects</h3>
            <h3>Reptiles</h3>
          </div>
      </div>
        </div>
        <div className="user-feed-body">

        </div>
      </div>
    </div>
  )
}
