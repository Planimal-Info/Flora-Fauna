import "./SearchResults.css";
import { useState } from "react";
import { useSearchContext } from "../../contexts/search";
import AnimalCards from "../AnimalCards/AnimalCards.jsx";

export default function SearchResults() {
  const [searchInputValue, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const {
    searchInput,
    isLoading,
    searchResults,
    initialized,
    searchPictureResults,
    setSearchResults
  } = useSearchContext();

  //Changes the useState to reflect input inside search bar
  function handleOnChange(e) {
    setSearchInput(e.target.value);
  }

  //Sends input value to be requested
  const handleOnSubmit = () => {
    //Frontend error handling for valid searches
    setError("");
    if(searchInputValue.length <= 1){
      setError("Invalid Input, Try Again");
      setSearchResults({});
      return;
    } 
    //Send search request
    searchInput(searchInputValue);
  };

  //Displays all the results from the search.
  //Will display a no results message if nothing is returned from the request
  return (
    <div className="search-results">
      <div className="search-wrapper">
        <h2>Search Results</h2>
      </div>
      <div className="search-result-content">
        <input
          className="landing-page-input"
          value={searchInputValue}
          type="text"
          placeholder="Search"
          onChange={(e) => handleOnChange(e)}
        >
        </input>
        <button className="search-result-submit" onClick={handleOnSubmit}>
          <span class="material-symbols-outlined search-logo">search</span>
        </button>
      </div>
      <h2 className={searchResults.length <= 0 && initialized === false && error.length <= 0 ? "search-message" : "hidden"}>Search for Animals and Plants in New York</h2>
      <h2 className={isLoading ? "search-loading" : "hidden"}>Loading</h2>
      <div className="animal-card-area">
        {searchPictureResults?.length === 0 && searchResults.length > 0
          ? searchResults?.map((e, inx) => (
            <AnimalCards
              common_name={e.common_name}
              scientific_name={e.scientific_name}
              key={inx}
              currentPlanimal={e}
              picture={e.image_url}
            />
          ))
          : searchPictureResults?.map((e, idx) => (
            <AnimalCards
              common_name={e.data.common_name}
              scientific_name={e.data.scientific_name}
              currentPlaninal={e.data}
              picture={e.picture.photo}
              currentPlanimal={e}
            />
          ))}
        <h2
          className={searchResults?.length <= 0 &&
              initialized === true && error.length <= 0
            ? "no-results-title"
            : "hidden"}
        >
          No Results, Try Something More Specific
        </h2>
        <h2 className={error.length > 0 ? "search-error-msg" : "hidden"}>{error}</h2>
      </div>
    </div>
  );
}
