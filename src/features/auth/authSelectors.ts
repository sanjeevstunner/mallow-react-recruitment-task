import type { RootState } from '../store';

export const selectToken = (state: RootState) => state.auth.token;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error; 