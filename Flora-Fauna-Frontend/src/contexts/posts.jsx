import ApiClient from "../services/ApiClient";
import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState({});

  //Sends request to make a post
  const createPost = (data) => {
    //Complete once user post form is complete.
  };

  const postValue = {
    posts,
    isLoading,
    initialized,
    error,
  };

  return (
    <PostContext.Provider value={postValue}>
      <>{children}</>
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(searchContext);
