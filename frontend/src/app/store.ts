import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../features/tasks/tasksSlice.ts";
import { usersReducer } from "../features/users/usersSlice.ts";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
