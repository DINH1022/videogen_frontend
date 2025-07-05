import axiosInstance from "./axios";

export const getAllVideosUploadToYoutube = async () => {
  try {
    const response = await axiosInstance.get("/video-stats/youtube");
    return response.data;
  } catch (error) {
    throw error;
  }
};
