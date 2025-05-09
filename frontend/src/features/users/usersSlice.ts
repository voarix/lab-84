import { IUser } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { userCreate, userLogin } from "./usersThunks.ts";
import { RootState } from "../../app/store.ts";

interface UsersState {
  user: IUser | null;
  createLoading: boolean;
  loginLoading: boolean;
  error: boolean;
}

const initialState: UsersState = {
  user: null,
  createLoading: false,
  loginLoading: false,
  error: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userCreate.pending, (state) => {
        state.createLoading = true;
        state.error = false;
      })
      .addCase(userCreate.fulfilled, (state, { payload: user }) => {
        state.createLoading = false;
        state.error = false;
        state.user = user;
      })
      .addCase(userCreate.rejected, (state) => {
        state.createLoading = false;
        state.error = true;
      })

      .addCase(userLogin.pending, (state) => {
        state.loginLoading = true;
        state.error = false;
      })
      .addCase(userLogin.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.error = false;
        state.user = user;
      })
      .addCase(userLogin.rejected, (state) => {
        state.loginLoading = false;
        state.error = true;
      });
  }
});

export const usersReducer = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectUserCreateLoading = (state: RootState) => state.users.createLoading;
export const selectUserLoginLoading = (state: RootState) => state.users.loginLoading;
