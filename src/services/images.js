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
