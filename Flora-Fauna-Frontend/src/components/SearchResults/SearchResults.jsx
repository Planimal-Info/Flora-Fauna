import "./SearchResults.css";
import { useState } from "react";
import { useSearchContext } from "../../contexts/search";
import AnimalCards from "../AnimalCards/AnimalCards.jsx";

export default function SearchResults() {
  const [searchInputValue, setSearchInput] = useState("");
  const { searchInput, isLoading, searchResults, initialized } = useSearchContext();

  //Changes the useState to reflect input inside search bar
  function handleOnChange(e) {
    setSearchInput(e.target.value);
  }

  //Sends input value to be requested
  const handleOnSubmit = () => {
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
      </div>
      <button className="search-result-submit" onClick={handleOnSubmit}>
        Submit
      </button>
      <div className="animal-card-area">
        {searchResults?.data?.results?.map((e, inx) => (
          <AnimalCards common_name={e.common_name} scientific_name={e.scientific_name} key={inx} currentPlanimal={e}/>
      ))}
      <h2 className={searchResults?.data?.results?.length <= 0 && initialized === true ? "no-results-title" : "hidden"}>No Results, Try Something More Specific</h2>
      </div>
    </div>
  );
}
