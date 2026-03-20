import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlices";
import imageReducer from "./slices/imageProcessingSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    imageProcessing: imageReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
