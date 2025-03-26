import apiConfig from "./apiConfig";
import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    queryString.stringify({
      ...params,
      api_key: apiConfig.apiKey,
      language: apiConfig.language,
    }),
});

export default axiosClient;
