import Post from '../models/post.js';
import { body, validationResult } from 'express-validator';

// Create a new post with validation
export const createPost = [
    // Validation rules
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author is required'),

    // Request handler
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const post = new Post(req.body);
            const savedPost = await post.save();
            res.status(201).json(savedPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
];

// Update an existing post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single post by ID
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts with optional filters
export const getAllPosts = async (req, res) => {
    const { username, category } = req.query;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (category) {
            posts = await Post.find({ categories: category });
        } else {
            posts = await Post.find({});
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
