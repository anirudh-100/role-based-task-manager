import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/auth.routes';
// import taskRoutes from './routes/task.routes'; // Optional if added

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/tasks", taskRoutes);
// app.use('/api/tasks', taskRoutes); // Optional if added

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
