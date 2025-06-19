import axiosInstance from "./axios";
export const registerUser = async (userData) => {
  try {
    console.log("Registering user with data:", userData);
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
