import axios from "axios";

const BASE_API_URL = "http://localhost:3001";


class JoblyApi {


      // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_API_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }




  static async getAllJobs() {
    const result = await axios.get(`${BASE_API_URL}/jobs`);
    console.log("get all jobs", result.data)
    return result.data;
  }

  static async getJob(id) {
    const result = await axios.get(`${BASE_API_URL}/jobs/${id}`)
    console.log("get one job", result.data)
    return result.data;
  }


  static async getAllCompanies(){
    const result = await axios.post(`${BASE_API_URL}/companies`)
    console.log("get all companies", result.data)
    return result
  }




}

export default JoblyApi;
