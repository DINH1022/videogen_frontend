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

export const createAudio = async (script, voice) => {
  try {
    console.log("script >>: ", script);
    console.log("voice:>>", voice);
    const response = await axiosInstance.post("/audio/generate", {
      text: script,
      voice: voice,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
