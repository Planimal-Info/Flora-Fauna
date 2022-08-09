import "./AnimalDetails.css";
import { useNavigate } from "react-router-dom";
import Hero from "../Hero/Hero.jsx";
import UserCards from "../UserCards/UserCards.jsx";
import { useEffect, useState } from "react";
import { useSearchContext } from "../../contexts/search.jsx";

//Changes array buffer in posts response to base64 to display
export const toBase64 = function (arr) {
  //Changes ArrayBuffer to base 64
  const baseSource = btoa(
    arr?.reduce((data, byte) => data + String.fromCharCode(byte), ""),
  );
  //Takes base64 string and concats to get right source for image
  const source = `data:image/jpeg;base64,${baseSource}`;
  return source;
};

export default function AnimalDetails() {
  const [relatedPosts, setRelatedPosts] = useState([]);
  //Uses the current planimal set in the context to render in this info.
  const {
    currentPlanimal,
    searchPictures,
    getPictures,
    url,
    description,
    getRelatedPosts,
  } = useSearchContext();

  //function to navigate to search page.
  const navigate = useNavigate();
  const returnBtn = () => {
    navigate("/search");
  };

  //Gets related posts using the current selected planimal
  useEffect(async () => {
    try {
      const data = await getRelatedPosts();
      setRelatedPosts(data);
    } catch (err) {
      console.error(err);
    }
  }, [currentPlanimal]);

  //Returns the animal details page, renders in information set by the current selected planimal in search context
  return (
    <div className="animal-details">
      <h1 className="details-title">Animal Details</h1>
      <Hero />
      <div className="return-wrapper">
        <button className="details-return btn" onClick={returnBtn}>
          <span class="material-symbols-outlined prev-page">undo</span>
        </button>
      </div>
      <h1 className>Related Posts</h1>
      <div className="related-posts">
        {relatedPosts.map((e, idx) => (
          <UserCards
            key={idx}
            source={toBase64(e?.photo?.data)}
            title={e?.user_post_title}
            desc={e?.user_post_desc}
            post={e}
            id={e?.id}
            category={e?.category}
          />
        ))}
      </div>
      <div className="return-wrapper">
        <button className="see-more-btn" onClick={() => navigate("/userfeed")}>
          See More Posts
        </button>
      </div>
    </div>
  );
}
