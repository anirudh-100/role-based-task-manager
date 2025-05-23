import express from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.use(verifyToken); // protect all routes

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTaskStatus);

export default router;
