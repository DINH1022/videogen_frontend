import axiosInstance from "./axios";
export const createShortScript = async (scriptData) => {
  try {
    const response = await axiosInstance.post("/text/generate", scriptData);
    return response.data;
  } catch (error) {
    console.error("Error creating short script:", error);
    throw error;
  }
};

export const createLongScript = async (scriptData) => {
  try {
    const response = await axiosInstance.post("/text/generate", scriptData);
    return response.data;
  } catch (error) {
    console.error("Error creating long script:", error);
    throw error;
  }
};
