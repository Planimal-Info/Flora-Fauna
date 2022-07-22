import { useContext, createContext, useState, useEffect } from "react";
import ApiClient from "../services/ApiClient";

const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitial] = useState(false);
  const [error, setError] = useState(false);

  //Searches the database and returns the results.
  const searchInput = async (data) => {
    setIsLoading(true);
    setInitial(false);
    try{
      const req = await ApiClient.searchResults({data:data})
      setSearchResults(req);
    }
    catch(err){
      console.log(err)
    }
    setIsLoading(false);
    setInitial(true);
  }


  const searchValue = {searchResults, isLoading, initialized, error, searchInput}; 

  return(
    <SearchContext.Provider value={searchValue}>
      <>{ children }</>
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext);
