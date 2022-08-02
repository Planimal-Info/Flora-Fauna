import ApiClient from "../services/ApiClient";
import { createContext, useContext, useEffect, useState } from "react";
import { useAdminContext } from "./admin.jsx";

const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState({});
  const [test, setTest] = useState(false);
  //Uses refresh from admin context to refresh both admin and post components
  const { refresh, setRefresh } = useAdminContext();

  //Grabs the posts when the component renders
  useEffect(async () => {
    try {
      const data = await ApiClient.getInitialPosts();
      setPosts(data.data.initialPosts);
    } catch (err) {
      console.error(err);
    }
  }, [refresh]);
  //Sends request to make a post
  const createPost = async (data) => {
    setIsLoading(true);
    setInitialized(false);
    try {
      const getData = await ApiClient.createPost(data);
      const arr = [];
      arr.push(getData.addImage);
      posts.forEach((e) => {
        arr.push(e);
      });
      setPosts(arr);
    } catch (err) {
      setError(err);
      console.error(err);
    }
    setIsLoading(false);
    setInitialized(true);
  };

  //Gets more posts to display when prompted
  const getMorePosts = async (post_id) => {
    try {
      const data = await ApiClient.getMorePosts(post_id);
      if (data.data.getMore.length > 0) {
        const arr = [];
        posts.forEach((e) => {
          arr.push(e);
        });
        data.data.getMore.forEach((e) => {
          arr.push(e);
        });
        setPosts(arr);
      }
      return data.data.getMore;
    } catch (err) {
      console.error(err);
    }
  };

  //Updates the likes when called on using id
  const updateLikes = async (id, likes) => {
    try {
      const obj = { id, likes };
      const sendUpdateLikes = await ApiClient.getLikes(obj);

      return sendUpdateLikes;
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
    setRefresh,
    refresh,
    updateLikes,
  };

  return (
    <PostContext.Provider value={postValue}>
      <>{children}</>
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
