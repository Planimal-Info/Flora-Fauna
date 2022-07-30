import { useEffect, useContext, createContext, useState } from "react";
import ApiClient from "../services/ApiClient.js";

const AdminContext = createContext(null);

export const AdminContextProvider = ({ children }) => {
  const[flaggedPosts, setFlaggedPosts] = useState({});
  const[flaggedUsers, setFlaggedUsers] = useState({});
  const[isLoading, setIsLoading] = useState(false);
  const[initialized, setInitialized] = useState(false);
  const[error, setError] = useState(false);
  const[refresh, setRefresh] = useState(false);

  const doRefresh = !refresh;
  
  useEffect(async () => {
    const getPosts = await ApiClient.getFlaggedPosts();
    setFlaggedPosts(getPosts.data.flaggedPosts);
    const getUsers = await ApiClient.getFlaggedUsers();
    setFlaggedUsers(getUsers.data.flaggedUsers);
  },[refresh])


  const reportPost = async(data) => {
    try{
      const getData = await ApiClient.flagPost(data);
      setFlaggedPosts(getData)
    }
    catch(err){
      console.error(err);
    }
  }

  const deleteItem = async() => {
    try{

    }
    catch(err){
      console.error(err)
    }
  }
  
  const authValue = {flaggedPosts, flaggedUsers, isLoading, initialized, reportPost };

  return(
    <AdminContext.Provider value={authValue}> 
        <>{ children }</>
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => useContext(AdminContext);
