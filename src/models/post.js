import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    username: { type: String, required: true }, // Ensure this field is required if needed
    description: { type: String, required: true }, // Ensure this field is required if needed
    categories: { type: [String], default: [] },
    published: { type: Boolean, default: false }
}, { timestamps: true });


const post = mongoose.model('post', postSchema);

export default post;