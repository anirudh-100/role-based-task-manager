import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
