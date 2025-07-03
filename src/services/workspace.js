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

export const getWorkspaces = async () => {
  try {
    const response = await axiosInstance.get("/workspace");
    console.log("Get workspaces response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    throw error;
  }
};

export const getWorkspaceById = async (workspaceId) => {
  try {
    const response = await axiosInstance.get(`/workspace/${workspaceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
