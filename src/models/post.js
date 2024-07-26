import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }, // Added author field
    categories: { type: [String], default: [] },
    published: { type: Boolean, default: false }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
