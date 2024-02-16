import axios from "axios";
import { configsApp } from "../../configs/configsApp.js";
import queryString from "query-string";

const publicClient = axios.create({
  baseURL: configsApp.baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});
publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});
publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
