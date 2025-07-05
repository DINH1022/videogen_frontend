import axiosInstance from "./axios";

export const getAllVideosUploadToTiktok = async () => {
  try {
    const response = await axiosInstance.get("/video-stats/tiktok");
    return response.data;
  } catch (error) {
    throw error;
  }
};
