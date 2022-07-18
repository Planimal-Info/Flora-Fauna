import { useConetext, useState, createContext, useEffect } from "react";
import ApiClient from "../services/ApiClient.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState({});
   const [isLoading, setIsLoading]  = useState(false);
   const [initialized, setInitial] = useState(false);
   const [error, setError] = useState({});

   //Check if a token (ff_token) is in storage, 
   //if so, fetch user from that token.
   useEffect(async () => {
      if(localStorage.getItem("ff_token")){
         ApiClient.setToken(localStorage.getItem("ff_token"));
      }
   
   //sends request to get user and stores response.
   setIsLoading(true);
   setInital(false);
   try{
      const req = ApiClient.fetchUserFromToken();
      setUser(req.data);
      setError(null);
   }
   catch(err){
      setError(error);
   }

   setIsLoading(false);
   setInitial(true);
   },[]);


   //function to login user
   async loginUser(data){
      
   }

   //function to register user
   async registerUser(data){

   }

   //function to log out user, removes token from storage
   async logoutUser(){
      ApiClient.removeToken();
      return;
   }
   
   const authValue = {user, setUser, loading, IsLoading, initialized, setInitial, error, loginUser, registerUser, logoutUser };
   
   return(
      <AuthContext.Provider value={authValue}>
         <>{ children }</>
      </AuthContext.Provider>
   )
}

export const useAuthContext = () => useContext(useAuthContext);


