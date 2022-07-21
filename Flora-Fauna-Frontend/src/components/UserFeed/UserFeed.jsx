import "./UserFeed.css";
import { useAuthContext } from "../../contexts/auth.jsx";
import { useState } from "react";
import Hero from "../Hero/Hero.jsx";

export default function UserFeed(props) {
  const { user } = useAuthContext();
  const [showCategories, setShowCategories] = useState(false);
  const [showTimeFrames, setShowTimeFrames] = useState(false);

  //hides and shows the time filters
  function handleTime() {
    if(showCategories === true){
      setShowCategories(false);
    }
    let time = showTimeFrames;
    setShowTimeFrames(!time);
  }
  //hides and shows the categories filters 
  function handleCategories() {
    if(showTimeFrames === true){
      setShowTimeFrames(false);
    }
    let categories = showCategories;
    setShowCategories(!categories);
  }


  //If there is no user, AKA a viewer. Show only the hero
  if (!user) {
    return (
      <div className="user-feed-overview">
        <h2>UserFeed</h2>
        <Hero />
      </div>
    )
  }
// the user feed for a user whos logged in
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
