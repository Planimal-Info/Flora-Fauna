import { createContext, useContext, useEffect, useState } from "react";
import ApiClient from "../services/ApiClient";

const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState({});
  const [searchPictureResults, setSearchPics] = useState([]);
  const [searchPictures, setSearchPictures] = useState({});
  const [url, setUrl] = useState({});
  const [description, setDescription] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitial] = useState(false);
  const [error, setError] = useState(false);

  //State for sending data for animal info. happens when viewer/user clicks more info button.
  const [currentPlanimal, setCurrentPlanimal] = useState({});

  //Searches the database and returns the results.
  const searchInput = async (data) => {
    setIsLoading(true);
    setInitial(false);
    setSearchPics([])
    try {
      //Gets the search results from the database
      const req = await ApiClient.searchResults({ data: data });
      setSearchResults(req);
      //Gets the picture results from the wikipedia API
      const picReq = await ApiClient.getSearchPictureResults({query: req.data.results})
      setSearchPics(picReq?.data?.pictureResults)
    } catch (err) {
      setError(err)
    }
    setIsLoading(false);
    setInitial(true);
  };

  //Gets the pictures from the current selected planimal, used for the animals details page
  const getPictures = async (data) => {
      setIsLoading(true);
      setInitial(false);
      try {
        const req = await ApiClient.searchPictures({query: data});
        setSearchPictures(req?.data?.results?.photo);
        setUrl(req?.data?.results?.url)
        const key = Object.keys(req?.data?.results?.description)[0];
        setDescription(req?.data?.results?.description[key])
      } catch (err) {
        setError(err)
      }
      setIsLoading(false);
      setInitial(true);
  };

  //Gets the related posts for the selected animal
  const getRelatedPosts = async () => {
    try {
      const data = await ApiClient.getRelatedPosts({name: currentPlanimal?.data?.common_name, group: currentPlanimal?.data?.taxonomic_group});
      return data?.data?.relatedPosts;
    }
    catch(err){
      console.error(err);
    }
  }
  const searchValue = {
    searchResults,
    isLoading,
    initialized,
    error,
    searchInput,
    currentPlanimal,
    setCurrentPlanimal,
    getPictures,
    searchPictures,
    setUrl,
    url,
    description,
    searchPictureResults,
    getRelatedPosts
  };

  return (
    <SearchContext.Provider value={searchValue}>
      <>{children}</>
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
