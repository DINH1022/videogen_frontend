// import axios from "axios";
// import { getAccessToken } from "../utils/localstorage";
// const backendUrl = "http://localhost:8080";
// const instance = axios.create({
//   baseURL: backendUrl,
//   timeout: 90000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// instance.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();

//     // Bỏ qua các URL không cần token
//     const publicEndpoints = ["/login", "/register"];

//     // Kiểm tra nếu URL không nằm trong danh sách public
//     const isPublic = publicEndpoints.some((endpoint) =>
//       config.url?.includes(endpoint)
//     );

//     if (!isPublic && token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   (response) => {
//     // You can modify the response data here if needed
//     return response;
//   },
//   (error) => {
//     // Handle response error
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       console.error(
//         "Response error:",
//         error.response.status,
//         error.response.data
//       );
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("No response received:", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("Error setting up request:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );
// export default instance;

import axios from "axios";
import { getAccessToken } from "../utils/localstorage";

const backendUrl = "http://localhost:8080";

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 90000,
  // Bỏ headers mặc định để let axios tự động set Content-Type
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
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Chỉ set Content-Type cho non-FormData requests
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    // Nếu là FormData, để browser tự động set Content-Type với boundary

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
