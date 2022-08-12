import ApiClient from "../services/ApiClient";
import { createContext, useContext, useEffect, useState } from "react";
import { useAdminContext } from "./admin.jsx";

const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [latestPost, setLatestPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
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
  //Gets the sets array for selected filters, and send to backend to get posts for that match the filters
  useEffect(async () => {
    try {
      const iterator = selectedCategory?.values();
      let filterCategory = [];
      for (let filter of iterator) {
        filterCategory.push(filter);
      }
      if (filterCategory.length >= 2) {
        const data = await ApiClient.getFilteredPosts({
          category: filterCategory,
          time: selectedTimeFrame,
        });
        setFilteredPosts(data?.data?.data);
      } else {
        setFilteredPosts([]);
      }
    } catch (err) {
      console.error(err);
    }
  }, [selectedCategory, selectedTimeFrame]);

  //Gets most or least liked posts if only a column is selected in the sort filter
  useEffect(async () => {
    if (selectedCategory.size === 1 && selectedTimeFrame.size === 1) {
      try {
        //Make request to get filtered posts by time,
        const getFilteredLikes = await ApiClient.getFilteredLiked(
          selectedTimeFrame,
        );
        if (getFilteredLikes != undefined) {
          setPosts(getFilteredLikes?.data?.sortedPosts);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [selectedTimeFrame]);

  //Get posts for a single user
  const getUserPosts = async () => {
    try {
      const data = await ApiClient.getUserPosts();
      setUserPosts(data.data.allUserPosts);
    } catch(err) {
      setError(err);
      console.error(err);
    }
  };
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
  const updateLikes = async (id, likes, liked, postLikes) => {
    try {
      const obj = { id, likes, liked, postLikes};
      const sendUpdateLikes = await ApiClient.getLikes(obj);
      return sendUpdateLikes;
    } catch (err) {
      console.error(err);
    }
  };

  //Gets current likes for a post
  const getLikes = async (id) => {
    try{
      const likes = await ApiClient.getCurrentLikes(id);
      return likes;
    }
    catch(err){
      console.error(err);
    }
  }

  const postValue = {
    posts,
    isLoading,
    initialized,
    error,
    createPost,
    latestPost,
    setPosts,
    getMorePosts,
    getUserPosts,
    userPosts,
    setUserPosts,
    setRefresh,
    refresh,
    updateLikes,
    selectedCategory,
    setSelectedCategory,
    filteredPosts,
    selectedTimeFrame,
    setSelectedTimeFrame,
    getLikes
  };

  return (
    <PostContext.Provider value={postValue}>
      <>{children}</>
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
