import axios from "axios";

const BASE_API_URL = "http://localhost:3001";


class JoblyApi {


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

  static async getCompany(id) {
    const result = await axios.get(`${BASE_API_URL}/companies/${id}`)
    console.log("get one company", result.data)
    return result.data;
  }

  

}

export default JoblyApi;
