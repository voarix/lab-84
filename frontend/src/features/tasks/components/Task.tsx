import { Card, Typography } from "@mui/material";
import { ITask } from "../../../types";
import React from "react";

interface Props {
  task: ITask;
}

const Task: React.FC<Props> = ({task}) => {
  return (
    <Card
      sx={{
        padding: 2,
        marginBottom: 2,
        backgroundColor: "white",
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
    </Card>
  );
};

export default Task;