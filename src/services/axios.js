import axios from "axios";
import { getAccessToken } from "../utils/localstorage";
const backendUrl = "http://localhost:8080";
const instance = axios.create({
  baseURL: backendUrl,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    // Bỏ qua các URL không cần token
    const publicEndpoints = ["/login", "/register"];

    // Kiểm tra nếu URL không nằm trong danh sách public
    const isPublic = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublic && token) {
      console.log("Token found:", token);
      console.log(1000);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    // You can modify the response data here if needed
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error(
        "Response error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);
export default instance;
