import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ApiState = {
  data: any | null;
  loading: boolean;
  error: any | null;
};

const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState: initialState,
  reducers: {
    fetchDataStart: (state, action: PayloadAction<any>) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload.data;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = apiSlice.actions;
export default apiSlice.reducer;
