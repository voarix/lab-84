import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITask, TaskMutation, TaskResponse } from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAllTasks = createAsyncThunk<ITask[], void>(
  "tasks/fetchAllTasks",
  async () => {
    const token = localStorage.getItem('token');
    const response = await axiosApi.get<TaskResponse>("/tasks", {
      headers: {
        Authorization: token
      }
    });
    return response.data.tasks;
  },
);

export const createTask = createAsyncThunk<ITask, TaskMutation>(
  'tasks/createTask',
  async (taskData) => {
    const token = localStorage.getItem('token');
    const response = await axiosApi.post('/tasks', taskData, {
      headers: {
        Authorization: token
      }
    });
    return response.data.task;
  }
);

export const deleteTask = createAsyncThunk<void, string>(
  'tasks/deleteTask',
  async (taskId) => {
    const token = localStorage.getItem('token');
    await axiosApi.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: token
      }
    });
  }
);

export const editTaskStatus = createAsyncThunk<ITask, {
  _id: string;
  taskData: TaskMutation,
}>(
  'tasks/updateTask',
  async ({ _id, taskData }) => {
    const token = localStorage.getItem('token');
    const response = await axiosApi.put(`/tasks/${_id}`, taskData, {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  }
);