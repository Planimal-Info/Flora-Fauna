import "./UserFeed.css";
import { useAuthContext } from "../../contexts/auth.jsx";
import { usePostContext } from "../../contexts/posts.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../Hero/Hero.jsx";
import UserCards from "../UserCards/UserCards.jsx";
import SearchFilter from "../SearchFilter/SearchFilter"

export default function UserFeed(props) {
  const { user } = useAuthContext();
  const { posts, isLoading, latestPost, getMorePosts } = usePostContext();
  const [showCategories, setShowCategories] = useState(false);
  const [showTimeFrames, setShowTimeFrames] = useState(false);
  const [morePosts, setMorePosts] = useState([]);
 
  //Weird way of making sure the "No More Posts" sign dosent show up when first mounting/re-mounting
  //May refractor if a better way is found
  useEffect(() => {
    const arr = [1];
    setMorePosts(arr);
  },[]) 

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
  
  //Loads more images when prompted
  const loadMore = async () => {
    const length = posts.length;
    setMorePosts(await getMorePosts(length));
  }

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
     <div className="user-feed-wrapper">
       <SearchFilter />
        <div className="user-feed-body">
          {Object.keys(posts).length > 0
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
    <h2 className={morePosts?.length <= 0 ? "" : "hidden"}>No More Posts</h2>
    <button className={posts.length <= 0 ? "hidden" : "load-more-feed"} onClick={loadMore}>Load More</button>
    </div>
  );
}
