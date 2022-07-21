import { useContext, createContext, useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";
const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitial] = useState(false);
  const [error, setError] = useState(false);

  //Searches the database and returns the results.
  const search = async () => {
    
  }


  const searchValue = {searchResults, isLoading, initialized, error};

  return(
    <SearchContext.Provider value={searchValue}>
      <>{ children }</>
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext);
