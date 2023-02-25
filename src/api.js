import axios from "axios";

const BASE_API_URL = "http://localhost:3001";


class JoblyApi {


    // the token for interactive with the API will be stored here.\
  
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const token = localStorage.getItem('token') || ""
    const url = `${BASE_API_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getUser(username){
    let res = await this.request(`users/${username}`);
    return res.user
  }

  static async getCompanies(nameLike = null){
    let endpoint = "companies"
    if (nameLike){
      endpoint = `companies?name=${nameLike}`
    }
    let res = await this.request(endpoint)
    return res
  }

  static async getJobs(nameLike = null){
    
    let endpoint = 'jobs'
    if(nameLike){
      endpoint = `jobs?title=${nameLike}`
    }
    let res = await this.request(endpoint)
    return res
  }

  static async apply(username,jobId){
    let endpoint = `users/${username}/jobs/${jobId}`
    let res = await this.request(endpoint, {},"post")
    return res
  }

}

export default JoblyApi;
