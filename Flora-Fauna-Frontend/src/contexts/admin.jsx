import { createContext, useContext, useEffect, useState } from "react";
import ApiClient from "../services/ApiClient.js";

const AdminContext = createContext(null);

export const AdminContextProvider = ({ children }) => {
  const [flaggedPosts, setFlaggedPosts] = useState({});
  const [flaggedUsers, setFlaggedUsers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //Gets flagged posts and flagged users on each refresh
  useEffect(async () => {
    const getPosts = await ApiClient.getFlaggedPosts();
    setFlaggedPosts(getPosts.data.flaggedPosts);
    const getUsers = await ApiClient.getFlaggedUsers();
    setFlaggedUsers(getUsers.data.flaggedUsers);
  }, [refresh]);

  //Reports the post when prompted
  const reportPost = async (data) => {
    try {
      const getData = await ApiClient.flagPost(data);
      setFlaggedPosts(getData.data.allPosts);

      //Refreshes the component
      setRefresh(true);
      setRefresh(false);
    } catch (err) {
      setError(err);
    }
  };

  //Deletes the post when prompted
  const deletePost = async (post_id, user_id) => {
    try {
      const obj = { postId: post_id, userId: user_id };
      const req = await ApiClient.deletePost(obj);

      //Refreshes the component
      setRefresh(true);
      setRefresh(false);
    } catch (err) {
      setError(err);
    }
  };

  const authValue = {
    flaggedPosts,
    flaggedUsers,
    isLoading,
    initialized,
    reportPost,
    deletePost,
    refresh,
    setRefresh,
  };

  return (
    <AdminContext.Provider value={authValue}>
      <>{children}</>
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
