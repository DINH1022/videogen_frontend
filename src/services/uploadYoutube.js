import axiosInstance from "./axios";
export const uploadVideoToYoutube = async (videoUrl, title, description) => {
  try {
    const response = await axiosInstance.post(
      "/social-upload-video/youtube-upload",
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
