import { pool } from '../config/db.js';

export const getRecentReviews = async () => {
  const result = await pool.query(
    'SELECT * FROM "Review" ORDER BY "createdAt" DESC LIMIT 50'
  );
  return result.rows;
};

export const createReview = async (studentName, meal, foodItems, rating, comment) => {
  const result = await pool.query(
    'INSERT INTO "Review" ("studentName", "meal", "foodItems", "rating", "comment") VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [studentName, meal, foodItems, rating, comment]
  );
  return result.rows[0];
};
