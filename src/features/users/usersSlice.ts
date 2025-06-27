import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UsersState, User, UserListResponse } from './usersTypes';
import { fetchUsers } from './usersThunks';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  page: 1,
  perPage: 6,
  total: 0,
  totalPages: 0,
  selectedUser: null,
  dialogMode: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setUsers(state, action: PayloadAction<UserListResponse>) {
      state.users = action.payload.data;
      state.page = action.payload.page;
      state.perPage = action.payload.per_page;
      state.total = action.payload.total;
      state.totalPages = action.payload.total_pages;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    },
    setDialogMode(state, action: PayloadAction<UsersState['dialogMode']>) {
      state.dialogMode = action.payload;
    },
    updateUserInList(state, action: PayloadAction<User>) {
      const idx = state.users.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.users[idx] = action.payload;
    },
    addUserToList(state, action: PayloadAction<User>) {
      state.users.unshift(action.payload);
    },
    removeUserFromList(state, action: PayloadAction<string>) {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.data;
        state.page = action.payload.page;
        state.perPage = action.payload.per_page;
        state.total = action.payload.total;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      });
  },
});

export const {
  setLoading,
  setError,
  setUsers,
  setPage,
  setSelectedUser,
  setDialogMode,
  updateUserInList,
  addUserToList,
  removeUserFromList,
} = usersSlice.actions;

export default usersSlice.reducer; 