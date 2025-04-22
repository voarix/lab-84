import { ITask } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { createTask, deleteTask, editTaskStatus, fetchAllTasks } from "./tasksThunks.ts";
import { RootState } from "../../app/store.ts";

interface TasksState {
  items: ITask[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  editLoading: boolean;
  error: boolean;
}

const initialState: TasksState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  editLoading: false,
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
      })

      .addCase(createTask.pending, (state) => {
        state.createLoading = true;
        state.error = false;
      })
      .addCase(createTask.fulfilled, (state, {payload: newTask}) => {
        state.createLoading = false;
        state.items.push(newTask);
      })
      .addCase(createTask.rejected, (state) => {
        state.createLoading = false;
        state.error = true;
      })

      .addCase(deleteTask.pending, (state) => {
        state.deleteLoading = false;
        state.error = false;
      })
      .addCase(deleteTask.fulfilled, (state, {meta}) => {
        state.items = state.items.filter(task => task._id !== meta.arg);
        state.deleteLoading = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.error = true;
        state.deleteLoading = false;
      })

      .addCase(editTaskStatus.pending, (state) => {
        state.editLoading = true;
        state.error = false;
      })
      .addCase(editTaskStatus.fulfilled, (state, { payload: editedTask }) => {
        state.editLoading = false;
        state.error = false;
        const index = state.items.findIndex(task => task._id === editedTask._id);
        if (index !== -1) {
          state.items[index] = editedTask;
        }
      })
      .addCase(editTaskStatus.rejected, (state) => {
        state.error = true;
        state.editLoading = false;
      })
  }
});

export const tasksReducer = tasksSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksLoading = (state: RootState) => state.tasks.fetchLoading;
export const selectTaskCreateLoading = (state: RootState) => state.tasks.createLoading;