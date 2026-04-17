import { getRecentReviews, createReview } from '../models/reviewModel.js';

export const getReviews = async (req, res) => {
  try {
    const reviews = await getRecentReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const saveReview = async (req, res) => {
  try {
    const { studentName, meal, foodItems, rating, comment } = req.body;

    if (!studentName || !meal || !rating || !comment) {
      return res.status(400).json({ error: 'studentName, meal, rating, and comment are required' });
    }

    const review = await createReview(studentName, meal, foodItems || '', rating, comment);
    res.status(200).json(review);
  } catch (error) {
    console.error("Error saving review:", error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
