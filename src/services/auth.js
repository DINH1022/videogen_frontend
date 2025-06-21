import axiosInstance from "./axios";
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    console.log("Register response2:", response);
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
