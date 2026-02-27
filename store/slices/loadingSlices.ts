import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  globalLoading: boolean;
}

const initialState: LoadingState = {
  globalLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    startLoading: (state) => {
      state.globalLoading = true;
    },
    stopLoading: (state) => {
      state.globalLoading = false;
    },
  },
});

export const { setLoading, startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
