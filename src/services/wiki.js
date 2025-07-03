import axiosInstance from "./axios";
export const searchLinkWiki = async (keySearch) => {
  try {
    const response = await axiosInstance.get(
      `/wiki/search?search-term=${keySearch}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
