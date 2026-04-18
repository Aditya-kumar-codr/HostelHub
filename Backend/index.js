import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import profileRoutes from './src/routes/profileRoutes.js';
import mealRoutes from './src/routes/mealRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import announcementRoutes from './src/routes/announcementRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allow parsing JSON request bodies

// Initialize Database
initDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/announcements', announcementRoutes);

// Basic route to test the server
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the HostelHub API' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
