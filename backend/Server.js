import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // Ensure 'path' is imported
import { fileURLToPath } from 'url'; // Import 'fileURLToPath' from 'url'
import connectDB from './config/db.js';
import userRoutes from './routes/usersRoutes.js';
import eventRoutes from './routes/eventsRoutes.js'; // Import event routes
import paymentController from "./routes/paymentController.js";

dotenv.config();
connectDB();

const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Corrected static path using __dirname
app.use(cors());

// Use routes for users and events
app.use('/api/auth', userRoutes);
app.use('/api/events', eventRoutes); // Register the event routes
app.use('/api/payment', paymentController);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
