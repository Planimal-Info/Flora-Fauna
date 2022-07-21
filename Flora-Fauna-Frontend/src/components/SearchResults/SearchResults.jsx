import "./SearchResults.css";
import { useState } from "react"

export default function SearchResults() {
  const [searchInput, setSearchInput] = useState("");

  //Changes the useState to reflect input inside search bar
  function handleOnChange(e) {
    setSearchInput(e.target.value);
  }

  //Sends input value to be requested
  function handleOnSubmit() {
    //Send search request
  }

  //Displays all the results from the search.
  return (
    <div className="search-results">
      <div className="search-wrapper">
        <h2>Search Results</h2>
      </div>
      <div className="search-result-content">
        <input
          className="landing-page-input"
          value={searchInput}
          type="text"
          placeholder="Search"
          onChange={(e) => handleOnChange(e)}
        >
        </input>
      </div>
      <button className="search-result-submit" onClick={handleOnSubmit}>Submit</button>
    </div>
  );
}
