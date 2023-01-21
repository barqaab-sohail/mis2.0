import axios from "axios";
import { BASE_URL } from "../src/config";
const Api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  // 'https://barqaab.pk/hrms/public/api/',
  //"http://192.168.1.10/hrms/public/api/",
  //"http://192.168.0.121/hrms/public/api/",
  //'http://192.168.1.8/hrms/public/api/',
  headers: { Accept: "application/json" },
});
// Api.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     Object.assign(config.headers.common, {
//       Authorization: "Bearer " + localStorage.getItem("auth_token"),
//     });
//     //console.log(config.headers.common.Authorization);
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );
export default Api;
