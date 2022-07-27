import "./UserFeed.css";
import { useAuthContext } from "../../contexts/auth.jsx";
import { usePostContext } from "../../contexts/posts.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../Hero/Hero.jsx";
import UserCards from "../UserCards/UserCards.jsx";

export default function UserFeed(props) {
  const { user } = useAuthContext();
  const { posts, isLoading } = usePostContext();
  const [showCategories, setShowCategories] = useState(false);
  const [showTimeFrames, setShowTimeFrames] = useState(false);

  //hides and shows the time filters
  function handleTime() {
    if (showCategories === true) {
      setShowCategories(false);
    }
    let time = showTimeFrames;
    setShowTimeFrames(!time);
  }
  //hides and shows the categories filters
  function handleCategories() {
    if (showTimeFrames === true) {
      setShowTimeFrames(false);
    }
    let categories = showCategories;
    setShowCategories(!categories);
  }

  //Changes array buffer in posts response to base64 to display
  function toBase64(arr) {
    //Changes ArrayBuffer to base 64
    const baseSource = btoa(
      arr?.reduce((data, byte) => data + String.fromCharCode(byte), ""),
    );
    //Takes base64 string and concats to get right source for image
    const source = `data:image/jpeg;base64,${baseSource}`;
    return source;
  }
  //Navigates to upload page
  const navigate = useNavigate();
  const sendToUpload = () => {
    navigate("/upload");
  };

  //If there is no user, AKA a viewer. Show only the hero
  if (!user) {
    return (
      <div className="user-feed-overview">
        <h2>UserFeed</h2>
        <Hero />
      </div>
    );
  }
  // the user feed for a user whos logged in
  return (
    <div className="user-feed-overview">
      <h2>User Feed</h2>
      <button className="user-upload-button" onClick={sendToUpload}>
        Upload
      </button>
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
          {Object.keys(posts).length > 1
            ? posts?.map((e, idx) => (
              <UserCards
                source={toBase64(e?.photo?.data)}
                title={e.user_post_title}
                desc={e.user_post_desc}
              />
            ))
            : ""}
        </div>
      </div>
    </div>
  );
}
