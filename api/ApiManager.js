import axios from "axios";

const ApiManager = axios.create({
  baseURL:
    // 'https://barqaab.pk/hrms/public/api/',
    //"http://192.168.1.10/hrms/public/api/",
    "http://192.168.0.121/hrms/public/api/",
  //'http://192.168.1.8/hrms/public/api/',
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
