import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlices";
import imageReducer from "./slices/imageProcessingSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    imageProcessing: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
