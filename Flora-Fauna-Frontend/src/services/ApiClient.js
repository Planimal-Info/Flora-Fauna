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
    formData.set("file", data);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
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
      data: data.image,
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
}

export default new ApiClient("http://localhost:3001");
