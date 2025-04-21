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
      res.status(400).send({error: error.message});
      return;
    }

    next(error);
  }
});

taskRouter.put("/:id", auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const task = await Task.findOne({_id: req.params.id, user: user._id});
    if (!task) {
      res.status(403).send({error: "Task not found"});
      return;
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.status) task.status = req.body.status;

    await task.save();
    res.send(task);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({error: error.message});
      return;
    }

    next(error);
  }
});

taskRouter.delete("/:id", auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const task = await Task.findOneAndDelete({_id: req.params.id, user: user._id});
    if (!task) {
      res.status(403).send({error: "Task not found"});
      return;
    }

    res.send({message: "Task deleted successfully"});
  } catch (error) {
    next(error);
  }
});

export default taskRouter;