import express from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/task.controller";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.use(verifyToken); // protect all routes

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTaskStatus);

export default router;
