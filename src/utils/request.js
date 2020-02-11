import Vue from "vue";
import axios from "axios";
import { VueAxios } from "./axios";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 15000
});

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN);
  if (token) {
    config.headers["Authorization"] = "Token " + token;
  }
  return config;
}, err);

const err = error => {
  if (error.response) {
    const data = error.response.data;
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (error.response.status === 403) {
      console.log(data.message);
    }
    if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      console.log("Unauthorised");
    }
  }
  return Promise.reject(error);
};

// response interceptor
service.interceptors.response.use(response => {
  return response.data;
}, err);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  }
};

export { installer as VueAxios, service as axios };
