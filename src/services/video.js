import axiosInstance from "./axios";
export const uploadVideo = async (videoData) => {
  try {
    const response = await axiosInstance.post(
      "/utils/upload-video-to-cloudinary",
      videoData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};
