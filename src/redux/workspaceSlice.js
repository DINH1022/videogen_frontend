import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    selectedWorkspace: null,
  },
  reducers: {
    setSelectedWorkspace: (state, action) => {
      state.selectedWorkspace = action.payload;
    },
  },
});
export default workspaceSlice.reducer;
export const { setSelectedWorkspace } = workspaceSlice.actions;
