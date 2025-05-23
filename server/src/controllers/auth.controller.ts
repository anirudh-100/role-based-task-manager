import { Request, Response } from "express";
import { Task } from "../models/user.model";
// import { User } from "../models/user.model";
import { User } from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    let tasks;
    if (req.user?.role === "admin" || req.user?.role === "manager") {
      tasks = await Task.find().populate("assignedTo", "email role");
    } else {
      tasks = await Task.find({ assignedTo: req.user?.userId });
    }
    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch tasks", err });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, assignedTo } = req.body;
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) return res.status(404).json({ message: "User not found" });

    const task = await Task.create({ title, description, assignedTo });
    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({ message: "Failed to create task", err });
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.json(task);
  } catch (err) {
    return res.status(500).json({ message: "Failed to update status", err });
  }
};
