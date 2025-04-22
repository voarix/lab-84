import { Button, Card, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { ITask } from "../../../types";
import React from "react";
import { useAppDispatch } from "../../../app/hooks.ts";
import { deleteTask, editTaskStatus } from "../tasksThunks.ts";

interface Props {
  task: ITask;
}

type Status = "new" | "in progress" | "complete";

const Task: React.FC<Props> = ({task}) => {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (confirm) {
      dispatch(deleteTask(task._id));
    }
  };

  const onTaskStatusChange = (e: SelectChangeEvent<Status>) => {
    const newStatus = e.target.value as Status;
    dispatch(editTaskStatus({
      _id: task._id,
      taskData: {
        status: newStatus,
        title: task.title,
        description: task.description
      }
    }));
  };

  return (
    <Card
      sx={{
        padding: 2,
        marginBottom: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >

      <Typography variant="h6" gutterBottom>
        {task.title}
      </Typography>
      <Typography variant="body2" sx={{opacity: 0.7}}>
        {task.description}
      </Typography>

      <FormControl fullWidth sx={{mt: 2}}>
        <Select
          value={task.status}
          onChange={onTaskStatusChange}
          label="Status"
        >
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="complete">Complete</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="error"
        onClick={onDelete}
        sx={{mt: 2}}
      >
        Delete
      </Button>
    </Card>
  );
};

export default Task;