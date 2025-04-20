import express from "express";
import auth, { RequestWithUser } from "../middleware/auth";
import Task from "../models/Task";
import { TaskMutation } from "../types";
import { Error } from "mongoose";

const taskRouter = express.Router();

taskRouter.get("/", auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const tasks = await Task.find({user: user._id});
    res.send({tasks, user});
  } catch (e) {
    next(e);
  }
});

taskRouter.post("/", auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const newTask: TaskMutation = {
      user: String(user._id),
      title: req.body.title,
      description: req.body.description,
      status: req.body.status ? req.body.status : "new",
    };

    const task = new Task(newTask);
    await task.save();
    res.send(task);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }

    next(error);
  }
});

export default taskRouter;