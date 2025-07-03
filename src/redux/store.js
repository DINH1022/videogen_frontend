import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import workspaceReducer from "./workspaceSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
  },
});
export default store;
