import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './src/config/db.js';
import blogRoutes from './src/routes/blogRoutes.js';
import userRoutes from './src/routes/userRoutes.js';  // Import user routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/posts', blogRoutes);
app.use('/api/users', userRoutes);  // Add user routes

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Database Connection
const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

connectDB(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
