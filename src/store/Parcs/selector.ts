import { RootState } from "..";

export const parcsSelector = (state: RootState) => state.parcs.api.data;
export const hasParcsError = (state: RootState) => state.parcs.api.error;
export const isParcsLoading = (state: RootState) => state.parcs.api.loading;
