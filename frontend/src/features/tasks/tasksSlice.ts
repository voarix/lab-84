import { ITask } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTasks } from "./tasksThunks.ts";
import { RootState } from "../../app/store.ts";

interface TasksState {
  items: ITask[];
  fetchLoading: boolean;
  error: boolean;
}

const initialState: TasksState = {
  items: [],
  fetchLoading: false,
  error: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.fetchLoading = true;
        state.error = false;
      })
      .addCase(fetchAllTasks.fulfilled, (state, {payload: tasks}) => {
        state.items = tasks;
        state.fetchLoading = false;
      })
      .addCase(fetchAllTasks.rejected, (state) => {
        state.fetchLoading = false;
        state.error = true;
      });
  }
});

export const tasksReducer = tasksSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksLoading = (state: RootState) => state.tasks.fetchLoading;