import axiosInstance from "./axios";
export const uploadAudio = async (audioData) => {
  try {
    const response = await axiosInstance.post(
      "/utils/upload-audio-to-cloudinary",
      audioData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
