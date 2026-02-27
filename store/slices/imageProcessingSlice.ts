import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "imageProcessing",
  initialState: {
    progress: 0,
  },
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetProgress: (state) => {
      state.progress = 0;
    },
  },
});

export const { setProgress, resetProgress } = slice.actions;
export default slice.reducer;
