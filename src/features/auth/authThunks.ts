import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosService from "../../api/axios";
import type { AxiosError } from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk<
  string, // Return type (token)
  LoginPayload, // Argument type
  { rejectValue: string }
>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AxiosService.post<{ token: string }>(
        "/api/login",
        payload
      );
      return response.data.token;
    } catch (error: unknown) {
      let errorMsg = "Login failed";
      if (isAxiosError(error) && error.response?.data && typeof error.response.data.error === "string") {
        errorMsg = error.response.data.error;
      }
      return rejectWithValue(errorMsg);
    }
  }
);

function isAxiosError(error: unknown): error is AxiosError<{ error: string }> {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true
  );
}
