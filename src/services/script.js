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

export const saveScript = async (scriptData, workspaceId) => {
  try {
    const response = await axiosInstance.put(
      `/workspace/${workspaceId}`,
      scriptData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const generateCaption = async (type, shortScript, language) => {
  try {
    const response = await axiosInstance.post("/text/generate", {
      type,
      shortScript,
      language,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting caption:", error);
    throw error;
  }
};
