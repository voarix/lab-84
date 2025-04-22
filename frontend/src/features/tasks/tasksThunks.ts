import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITask } from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAllTasks = createAsyncThunk<ITask[], void>(
  "news/fetchAllTasks",
  async () => {
    const token = localStorage.getItem('token');
    const response = await axiosApi.get("/tasks", {
      headers: {
        Authorization: token
      }
    });
    console.log(response.data);
    return response.data.tasks;
  },
);