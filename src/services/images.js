import instance from "./axios";

export const generateImages = async (script) => {
  try {
    const response = await instance.post("/images/generate-from-story", script);
    return response.data;
  } catch (error) {
    console.error("Error generating images:", error);
    throw error;
  }
};

export const generateImage = async (prompt) => {
  try {
    const response = await instance.post("/images/generate", { text: prompt });
    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
