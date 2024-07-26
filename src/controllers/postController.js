import Post from '../models/post.js';

// Create a new post
export const createPost = async (req, res) => {
    try {
        const post = new Post({
            ...req.body,
            author: req.user.username // Assign author from JWT token
        });
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post' });
    }
};

// Update a post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Optionally check if the user is the author of the post
        if (post.author !== req.user.username) return res.status(403).json({ message: 'Not authorized to update this post' });

        await Post.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Post updated successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error updating post' });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Optionally check if the user is the author of the post
        if (post.author !== req.user.username) return res.status(403).json({ message: 'Not authorized to delete this post' });

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json('Post deleted successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post' });
    }
};

// Get a single post
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving post' });
    }
};

// Get all posts
export const getAllPosts = async (req, res) => {
    let username = req.query.username;
    let category = req.query.category;
    let posts;
    try {
        if (username) 
            posts = await Post.find({ author: username }); // Adjust query to use author field
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts' });
    }
};
