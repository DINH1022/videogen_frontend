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

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
// import workspaceReducer from "./workspaceSlice";
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   blacklist: ["socketio"],
// };
// const rootReducer = combineReducers({
//   auth: authReducer,
//   workspace: workspaceReducer,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           FLUSH,
//           REHYDRATE,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REGISTER,
//           "socketio/setSocket",
//         ],
//         ignoredPaths: ["socketio.socket"],
//       },
//     }),
// });

// export default store;
