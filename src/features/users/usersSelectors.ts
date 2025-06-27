import type { RootState } from '../store';

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectUsersPage = (state: RootState) => state.users.page;
export const selectUsersPerPage = (state: RootState) => state.users.perPage;
export const selectUsersTotal = (state: RootState) => state.users.total;
export const selectUsersTotalPages = (state: RootState) => state.users.totalPages;
export const selectSelectedUser = (state: RootState) => state.users.selectedUser;
export const selectDialogMode = (state: RootState) => state.users.dialogMode; 