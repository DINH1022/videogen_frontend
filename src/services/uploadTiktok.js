import axiosInstance from "./axios";
export const uploadVideoToTiktok = async (videoUrl, title, description) => {
  try {
    const response = await axiosInstance.post(
      "/social-upload-video/tiktok-upload",
      {
        url: videoUrl,
        title,
        description,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
