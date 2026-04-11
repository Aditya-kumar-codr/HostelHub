import express from 'express';
import { saveOrFetchUser } from '../controllers/userController.js';

const router = express.Router();

// Maps to /api/users
router.post('/', saveOrFetchUser);

export default router;
