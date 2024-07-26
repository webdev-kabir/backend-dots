import express from 'express';
import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controllers/postController.js';
import authenticateToken from '../middleware/auth.js';
import authorizePostAction from '../middleware/authorization.js';

const router = express.Router();

// Routes
router.post('/', authenticateToken, createPost); // Only authenticated users can create posts
router.put('/:id', authenticateToken, authorizePostAction, updatePost); // Only the post owner can update
router.delete('/:id', authenticateToken, authorizePostAction, deletePost); // Only the post owner can delete
router.get('/:id', getPost); // Any user can view a post
router.get('/', getAllPosts); // Any user can view all posts

export default router;
