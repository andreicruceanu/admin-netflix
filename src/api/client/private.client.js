import axios from "axios";
import queryString from "query-string";
import { configsApp } from "../../configs/configsApp.js";

const privateClient = axios.create({
  baseURL: configsApp.baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default privateClient;
