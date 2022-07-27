import ApiClient from "../services/ApiClient";
import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState({});

  //Grabs the posts when the component renders
  useEffect(async () => {
    try {
      const data = await ApiClient.getAllPosts();
      setPosts(data?.data?.allPosts);
    } catch (err) {
      console.error(err);
    }
  }, []);

  //Sends request to make a post
  const createPost = async (data) => {
    setIsLoading(true);
    setInitialized(false);
    try {
      const getData = await ApiClient.createPost(data);
      setPosts(getData?.addImage);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    setInitialized(true);
  };
  const postValue = {
    posts,
    isLoading,
    initialized,
    error,
    createPost,
  };

  return (
    <PostContext.Provider value={postValue}>
      <>{children}</>
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
