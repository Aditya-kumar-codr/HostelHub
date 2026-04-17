import express from 'express';
import { getReviews, saveReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', saveReview);

export default router;
