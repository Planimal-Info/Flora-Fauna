import axios from "axios";
import * as constants from "../constants.js"

class ApiClient {
   constructor(remoteHostUrl){
      this.remoteHostUrl = remoteHostUrl;
      this.token = null;
      this.tokenName = "ff_token"
   }


   //sets the token
   setToken(token){
      this.token = token;
      localStorage.setItem(this.tokenName, token);
   }
   
   //Removes the token from storage.
   removeToken(){
      this.token = null;
      localStorage.removeItem(this.tokenName);
   }

   //Issues axios requests
    async request({endpoint, method = "GET", data = {}}){
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }
        if(this.token){
            headers["Authorization"] = `Bearer ${this.token}`
        }
        try {
            const request = await axios({url, method, data, headers});
            if(request){ 
                return {data: request.data, error:null};
            }
        }
        catch(err){
            return {data:null, error:err};
        }
    }

   //Add methods for various endpoints

   //Sends data to be register and returns the response.
   async register(data){
      return await this.request({ endpoint: "auth/login", method: "POST", data: data});
   }
   //Sends data to log user and returns the response.
   async login(){
         return await this.request({ endpoint: "auth/register", method: "POST", data: data});
   }
   //Returns user from the token. 
   async fetchUserFromToken(){
      return await this.request({ endpoint: "auth/me", method: "GET" });
   }
}

return new ApiClient(constants.API_BASE_URL)
