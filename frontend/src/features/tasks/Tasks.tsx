import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectTasks, selectTasksLoading } from "./tasksSlice.ts";
import { useEffect } from "react";
import { fetchAllTasks } from "./tasksThunks.ts";
import { Box, CircularProgress, Typography } from "@mui/material";
import Task from "./components/Task.tsx";
import NewTask from "./components/NewTask.tsx";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const loading = useAppSelector(selectTasksLoading);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 2 }}>
      <NewTask />

      {(!tasks || tasks.length === 0) ? (
        <Typography>No tasks found</Typography>
      ) : (
        tasks.map((task) => {
          if (!task || !task._id) {
            return null;
          }
          return <Task key={task._id} task={task} />;
        })
      )}
    </Box>
  );
};

export default Tasks;