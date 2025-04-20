import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: String,
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: ["new", "in progress", "complete"],
    default: "new"
  },
});


const Task = mongoose.model("Task", TaskSchema);
export default Task;