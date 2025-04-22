import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectTasks, selectTasksLoading } from "./tasksSlice.ts";
import { useEffect } from "react";
import { fetchAllTasks } from "./tasksThunks.ts";
import { Box, CircularProgress, Typography } from "@mui/material";
import Task from "./components/Task.tsx";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const loading = useAppSelector(selectTasksLoading);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={20}/>
      </Box>
    );
  } else if (tasks.length === 0) {
    return <Typography variant="h6">No tasks found</Typography>;
  }

  return (
    <Box sx={{p: 2}}>
      {tasks.map((task) => (
        <Task task={task} key={task._id}/>
      ))}
    </Box>
  );
};

export default Tasks;