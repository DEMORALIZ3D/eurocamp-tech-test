import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ParcResponse } from "./interfaces";

export interface IParcsState {
  api: {
    data: ParcResponse;
    loading: boolean;
    error: string | null;
  };
}

const parcIntitialState: IParcsState = {
  api: {
    data: [],
    loading: false,
    error: null,
  },
};

export const parcsSlice = createSlice({
  name: "parcs",
  initialState: parcIntitialState,
  reducers: {
    setParcData: (state, action: PayloadAction<ParcResponse>) => {
      state.api.data = action.payload;
    },
    setParcLoading: (state, action: PayloadAction<boolean>) => {
      state.api.loading = action.payload;
    },
    setParcError: (state, action: PayloadAction<string | null>) => {
      state.api.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setParcData, setParcError, setParcLoading } = parcsSlice.actions;

export default parcsSlice.reducer;
