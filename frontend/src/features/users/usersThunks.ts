import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, UserMutation } from "../../types";
import axiosApi from "../../axiosApi.ts";

export const userCreate = createAsyncThunk<IUser, UserMutation>(
  'users/userCreate',
  async (userData) => {
    const response = await axiosApi.post('/users', userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const userLogin = createAsyncThunk<IUser, UserMutation>(
  'users/userLogin',
  async (userData) => {
    const response = await axiosApi.post('/users/sessions', userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);