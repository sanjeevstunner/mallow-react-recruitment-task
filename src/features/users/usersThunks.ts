import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api/axios';
import type { User, UserListResponse } from './usersTypes';

// Fetch paginated users
export const fetchUsers = createAsyncThunk<
  UserListResponse,
  number,
  { rejectValue: string }
>('users/fetchUsers', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.get<UserListResponse>(`/api/users?page=${page}`);
    return response.data;
  } catch (error: any) {
    console.warn('error', error, "type", typeof error)
    return rejectWithValue(error?.response?.data?.error || 'Failed to fetch users');
  }
});

// Create user
export const createUser = createAsyncThunk<
  User,
  { last_name: string; first_name: string; email: string },
  { rejectValue: string }
>('users/createUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<User>('/api/users', data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.error || 'Failed to create user');
  }
});

// Update user
export const updateUser = createAsyncThunk<
  User,
  { id: string; data: { last_name: string; first_name: string; email: string } },
  { rejectValue: string }
>('users/updateUser', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.patch<User>(`/api/users/${id}`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.error || 'Failed to update user');
  }
});

// Delete user
export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('users/deleteUser', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/users/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.error || 'Failed to delete user');
  }
}); 