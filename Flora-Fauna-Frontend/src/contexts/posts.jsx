import ApiClient from "../services/ApiClient";
import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState({});

  //Grabs the posts when the component renders
  useEffect(async () => {
    try {
      const data = await ApiClient.getInitialPosts();
      setPosts(data.data.initialPosts);
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
      setLatestPost(getData?.addImage);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    setInitialized(true);
  };

  //Gets more posts to display when prompted
  const getMorePosts = async (post_id) => {
    try {
      const data = await ApiClient.getMorePosts(post_id);
      console.log(data);
      if (data.data.getMore.length > 0) {
        const arr = [];
        posts.forEach(e => {
          arr.push(e);
        })
        data.data.getMore.forEach(e => {
          arr.push(e);
        })
        setPosts(arr);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const postValue = {
    posts,
    isLoading,
    initialized,
    error,
    createPost,
    latestPost,
    getMorePosts,
  };

  return (
    <PostContext.Provider value={postValue}>
      <>{children}</>
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
