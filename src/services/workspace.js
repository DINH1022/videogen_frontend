import axiosInstance from "./axios";
export const createWorkspace = async (workspaceData) => {
  try {
    const response = await axiosInstance.post("/workspace", workspaceData);
    console.log("Create workspace response:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating workspace:", error);
    throw error;
  }
};
