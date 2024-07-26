import express from 'express';
import {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.get('/:id', getPost);
router.get('/', getAllPosts);

export default router;
