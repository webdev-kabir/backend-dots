import Post from '../models/post.js';

const authorizePostAction = async (req, res, next) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Example: assuming each post has an 'author' field to match the user's ID
        if (post.author.toString() !== req.user.username) {
            return res.status(403).json({ message: 'Not authorized to perform this action' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error checking authorization' });
    }
};

export default authorizePostAction;
