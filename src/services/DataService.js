import axios from "axios";

export default class DataService {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.baseURL = process.env.REACT_APP_API_ENDPOINT;
  }

  init = () => {
    // this.api_token = getCookie("ACCESS_TOKEN");
    let headers = {
      Accept: "application/json"
    };
    if (this.api_token) {
      headers.Authorization = `Bearer ${
        this.api_token
      }`;
    }
    this.client = axios.create({baseURL: this.baseURL, timeout: 31000, headers: headers});
    return this.client;
  };

  postlogin = (params) => {
    return this.init().post("/login", {params: params});
  }

  getPasswordsList = (params) => {
    return this.init().get("/passwords", {params: params});
  };

  addNewUser = (data) => {
    return this.init().post("/users", data);
  };

  postMe(subRoute,Obj) {
    let actualRoute = this.baseURL + subRoute; 
    this.init().post(actualRoute, Obj);
  }
  
  postlogin1(postObj,successCallback, errorCallback) {
    this.postMe("/login",postObj)
  }
}