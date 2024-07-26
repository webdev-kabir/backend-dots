import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

// Database Connection
import connectDB from './src/config/db.js';

// Routes
import blogRoutes from './src/routes/blogRoutes.js';  // Ensure this matches your actual routes file

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Handlers
app.use('/api/posts', blogRoutes);  // Update to your actual route

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging
    res.status(500).json({ message: 'Something went wrong!' });
});

// Database Connection
const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

connectDB(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
