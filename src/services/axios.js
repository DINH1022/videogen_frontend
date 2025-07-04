import axios from "axios";
import { getAccessToken } from "../utils/localstorage";

const backendUrl = "http://localhost:8080";

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 90000,
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    const publicEndpoints = ["/login", "/register"];

    const isPublic = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        "Response error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
