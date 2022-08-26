import axios from "axios";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
});

// response interceptor
service.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    } else {
      return false;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
