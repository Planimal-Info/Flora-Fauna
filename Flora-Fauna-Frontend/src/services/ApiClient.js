import axios from "axios";
import * as constants from "../constants.js";

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "ff_token";
  }

  //sets the token
  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }

  //Removes the token from storage.
  removeToken() {
    this.token = null;
    localStorage.removeItem(this.tokenName);
    return;
  }

  //Issues axios requests
  async request({ endpoint, method = "GET", data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    try {
      const request = await axios({ url, method, data, headers });
      if (request) {
        return { data: request.data, error: null };
      }
    } catch (err) {
      return { data: null, error: err };
    }
  }

  //Send File Images Requests
  async imageRequest({ endpoint, method = "POST", data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    let formData = new FormData();
    formData.set("file", data.image);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    headers["PostId"] = data.post_id;
    try {
      const request = await axios.post(url, formData, { headers: headers });
      if (request) {
        return request.data.addImage;
      }
    } catch (err) {
      return { data: null, error: err };
    }
  }

  //Authentication Endpoints
  //Sends data to be register and returns the response.
  async register(data) {
    return await this.request({
      endpoint: "auth/register",
      method: "POST",
      data: data,
    });
  }
  //Sends data to log user and returns the response.
  async login(data) {
    return await this.request({
      endpoint: "auth/login",
      method: "POST",
      data: data,
    });
  }
  //Returns user from the token.
  async fetchUserFromToken() {
    return await this.request({ endpoint: "auth/me", method: "GET" });
  }
  //returns the users liked posts.
  async getLikedPosts(){
    return await this.request({ endpoint:"auth/liked", method: "GET" })
  }

  //----------------------------//
  //Search Endpoints
  //Search input requests.
  async searchResults(data) {
    return await this.request({
      endpoint: "planimal/search",
      method: "POST",
      data: data,
    });
  }
  //Get pictures from search results
  async searchPictures(data) {
    return await this.request({
      endpoint: "planimal/search/getPhotos",
      method: "POST",
      data: data,
    });
  }
  //Gets the pictures for all the search results
  async getSearchPictureResults(data){
    return await this.request({
      endpoint: "planimal/getPictures",
      method: "POST",
      data:data
    })
  }

  //---------------------------//
  //Admin Endpoints

  //Returns all flagged posts
  async getFlaggedPosts() {
    return await this.request({ endpoint: "admin/posts", method: "GET" });
  }
  //Returns all flagged users
  async getFlaggedUsers() {
    return await this.request({ endpoint: "admin/users", method: "GET" });
  }

  //Deletes post from site
  async deletePost(data) {
    return await this.request({
      endpoint: "admin/deletePost",
      method: "POST",
      data: { data: data },
    });
  }
  //Deletes user from site
  async deleteUser(user_id) {
    return await this.request({
      endpoint: "admin/deleteUser",
      method: "POST",
      data: {id: user_id},
    });
  }
  //Flags a post when called
  async flagPost(post_id) {
    return await this.request({
      endpoint: "admin/flagpost",
      method: "POST",
      data: { id: post_id },
    });
  }
  //Gets the post when an admin wants to know more about the post
  async getSelectedPost(post_id){
    return await this.request({
      endpoint: `post/${post_id}`,
      method: "GET",
    })
  }
  //Calls for a post to be unflagged, used when a admin deems a post appropriate.
  async unFlagPost(post_id, user_id){
    return await this.request({
      endpoint: `admin/unflag`,
      method: "POST",
      data: {post: post_id, user: user_id}
    })
  }
  //Gets posts in Descending order of likes.
  async getFilteredLiked(filter){
    const iterator = filter.values();
    if(iterator?.next()?.value != "Sort"){
      return await this.request({
        endpoint: "post/filterLikes",
        method: "POST",
        data: {filter: filter}
      })
    }
  }

  //Gets related posts for search results
  async getRelatedPosts(input){
    return await this.request({
      endpoint: "post/related",
      method: "POST",
      data: input
    })
  }
  //-----------------------//
  //Post Endpoints
  //Sends request to create post and sends another request to store image in that post
  //Cant send over image files using json content type, hence the reason for 2 requests.
  async createPost(data) {
    const post = await this.request({
      endpoint: "post/create",
      method: "POST",
      data: data,
    });
    const addImage = await this.imageRequest({
      endpoint: "post/upload",
      method: "POST",
      data: {image:data.image, post_id: post?.data?.post?.id},
    });
    return { post, addImage };
  }
  //Sends request to get all posts in database
  async getAllPosts() {
    return await this.request({ endpoint: "post/all", method: "GET" });
  }

  //Sends request to get initial posts to load in.
  async getInitialPosts() {
    return await this.request({ endpoint: "post/initial", method: "GET" });
  }
  //Sends request to get more posts
  async getMorePosts(post_id) {
    return await this.request({
      endpoint: "post/more",
      method: "POST",
      data: { id: post_id },
    });
  }

  //Sends request to update likes for a post
  async getLikes(data) {
    return await this.request({
        endpoint: "post/update",
        method: "POST",
        data: data,
      })
  }
  //Sends request to get current likes for a post.
  async getCurrentLikes(id){
    return await this.request({
      endpoint:"post/get",
      method: "POST",
      data: {data: id}
    })
  }
  //------------------//
  //Filter Endpoints
  //Gets the filtered Posts from the backend
  async getFilteredPosts(data) {
    return await this.request({
      endpoint: "filter",
      method: "POST",
      data: {data: data} 
    })
  }
}

export default new ApiClient("http://localhost:3001");
//("https://flora-and-fauna.herokuapp.com");
