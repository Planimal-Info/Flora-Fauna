import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../services/ApiClient.js";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitial] = useState(false);
  const [error, setError] = useState({});
  const [reqError, setReqError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshLikes, setRefreshLikes] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  //Check if a token (ff_token) is in storage,
  //if so, fetch user from that token.
  useEffect(async () => {
    if (localStorage.getItem("ff_token")) {
      ApiClient.setToken(localStorage.getItem("ff_token"));
    }
    //sends request to get user and stores response.
    setIsLoading(true);
    setInitial(false);
    try {
      const req = await ApiClient.fetchUserFromToken();
      setUser(req.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    setInitial(true);
  }, [refresh]);
  
  //Gets all the users liked posts.
  useEffect(async () => {
    try{
      const data = await ApiClient.getLikedPosts();
      setLikedPosts(data?.data?.likedPosts)
    }
    catch(err){
      console.error(err)
    }
  }, [refreshLikes])

  //function to login user
  const loginUser = async (data) => {
    setIsLoading(true);
    setInitial(false);
    const req = async () => {
      try {
        const getData = await ApiClient.login({
          email: data.email,
          password: data.password,
        });
        ApiClient.setToken(getData?.data?.token);
        setUser(getData.data?.user);
        setError(getData?.error);
      } catch (err) {
        setError(getData?.error);
      }
    };
    await req();

    //Refreshes the data when a user logs in, used as a dependancy for the useEffect. Done this way to avoid indeterminate error
    setRefresh(true);
    setRefresh(false);

    setIsLoading(false);
    setInitial(true);
  };
  
  //function to register user
  const registerUser = async (data) => {
    setIsLoading(true);
    setInitial(false);
    const req = async () => {
      try {
        const getData = await ApiClient.register({
          username: data.username,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
        ApiClient.setToken(getData?.data?.token);
        setUser(getData?.data?.user);
        setError(getData?.error);
        //returned this to have data to evaluate and use to conditionally render registration component
        if (getData.error != null) {
          return false;
        }
        return true;
      } catch (err) {
        setError(err);
      }
    };
    await req();

    //Refreshes the component.
    setRefresh(true);
    setRefresh(false);

    setIsLoading(false);
    setInitial(true);
  };

  //function to log out user, removes token from storage and refreshes the page.
  const logoutUser = () => {
    ApiClient.removeToken();
  };

    //updates email of logged in user
    const updateUserEmail = async (data) => {
      setIsLoading(true);
      setInitial(false);
      const req = async () => {
        try {
          await ApiClient.updateEmail({
            email: data.newEmail,
          });
        } catch (err) {
          setError(err);
        }
      };
      await req();
    
      //setRefresh(true);
      //setRefresh(false);
    
      setIsLoading(false);
      setInitial(true);
    };
    //updates password of logged in user
    const updateUserPassword = async (data) => {
      setIsLoading(true);
      setInitial(false);
      const req = async () => {
        try {
          await ApiClient.updatePassword({
            password: data.newPassword
          });
        } catch (err) {
          setError(err);
        }
      };
      await req();
  
      setRefresh(true);
      setRefresh(false);
  
      setIsLoading(false);
      setInitial(true);
    };

  const authValue = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    initialized,
    setInitial,
    error,
    loginUser,
    registerUser,
    logoutUser,
    reqError,
    setRefresh,
    updateUserEmail,
    updateUserPassword,
    likedPosts,
    setRefreshLikes
  };

  return (
    <AuthContext.Provider value={authValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

//Allows children components to use the context
export const useAuthContext = () => useContext(AuthContext);
