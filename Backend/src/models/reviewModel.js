import { pool } from '../config/db.js';

export const getRecentReviews = async () => {
  const result = await pool.query(
    'SELECT * FROM "Review" ORDER BY "createdAt" DESC LIMIT 50'
  );
  return result.rows;
};

export const createReview = async (studentName, meal, rating, comment) => {
  const result = await pool.query(
    'INSERT INTO "Review" ("studentName", "meal", "rating", "comment") VALUES ($1, $2, $3, $4) RETURNING *',
    [studentName, meal, rating, comment]
  );
  return result.rows[0];
};
