import axiosInstance from "./axios";

export const getAllVideosUploadToYoutube = async () => {
  try {
    const response = await axiosInstance.get("/video-stats/youtube?size=1000");
    return response.data;
  } catch (error) {
    throw error;
  }
};
