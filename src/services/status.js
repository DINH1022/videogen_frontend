import axiosInstance from "./axios";

export const checkLoginSocialAccount = async () => {
  try {
    const response = await axiosInstance.get("/connect/status");
    return response.data;
  } catch (error) {
    throw error;
  }
};
