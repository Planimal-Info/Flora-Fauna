import { createContext, useContext, useEffect, useState } from "react";
import ApiClient from "../services/ApiClient.js";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitial] = useState(false);
  const [error, setError] = useState({});

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
      console.log(req);
      setUser(req.data);
      setError(null);
    } catch (err) {
      setError(error);
    }

    setIsLoading(false);
    setInitial(true);
  }, []);

  //function to login user
  const loginUser = (data) => {
    setIsLoading(true);
    setInitial(false);
    const req = async () => {
      try {
        const getData = await ApiClient.login({
          email: data.email,
          password: data.password,
        });
        console.log(getData);
        ApiClient.setToken(getData.data.token);
        setUser(getData.data.user);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    req();
    setIsLoading(false);
    setInitial(true);
  };

  //function to register user
  const registerUser = (data) => {
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
        ApiClient.setToken(getData.data.token);
        setUser(getData.data.user);
      } catch (err) {
        setError(err);
      }
    };
    req();
    setIsLoading(false);
    setInitial(true);
  };

  //function to log out user, removes token from storage
  const logoutUser = () => {
    ApiClient.removeToken();
    window.location.reload(); 
    return false;
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
  };

  return (
    <AuthContext.Provider value={authValue}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

//Allows children components to use the context
export const useAuthContext = () => useContext(AuthContext);
